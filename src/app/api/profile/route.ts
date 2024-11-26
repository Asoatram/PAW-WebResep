import { NextRequest, NextResponse } from 'next/server';
import { jwtVerify } from 'jose';
import User from '@/models/User';
import connectDB from '@/lib/mongoose';

export async function GET(req: NextRequest) {
  await connectDB(); // Connect to the database

  try {
    // Ambil token dari cookies
    const token = req.cookies.get('token')?.value;

    console.log('Token diterima:', token); // Debug log token

    if (!token || typeof token !== 'string') {
      return NextResponse.json({ error: 'Token autentikasi tidak ditemukan atau format tidak valid' }, { status: 401 });
    }

    // Verifikasi token JWT
    const secret = new TextEncoder().encode(process.env.ACCESS_TOKEN_SECRET);
    let payload;

    try {
      const { payload: verifiedPayload } = await jwtVerify(token, secret);
      payload = verifiedPayload;
    } catch (err) {
      console.error('Token gagal diverifikasi:', err.message);
      return NextResponse.json({ error: 'Token tidak valid' }, { status: 401 });
    }

    console.log('Payload token:', payload);

    // Validasi payload
    const { id, email } = payload as { id: number; email: string };

    if (!id || !email) {
      return NextResponse.json({ error: 'Payload token tidak lengkap' }, { status: 401 });
    }

    // Cari user di database
    const user = await User.findOne({ user_id: id, email });
    if (!user) {
      console.error('User tidak ditemukan di database');
      return NextResponse.json({ error: 'User tidak ditemukan' }, { status: 404 });
    }

    console.log('User ditemukan:', user);

    // Return user profile
    return NextResponse.json({
      name: user.username,
      email: user.email,
      recipesPosted: user.recipesPosted || 0, // Misalnya, tambahkan ini jika ada
      description: user.description || 'I love cooking and sharing recipes with others.',   // Misalnya, tambahkan ini jika ada
      profileImage: user.profilePicture || '', // Misalnya, tambahkan ini jika ada
    });
  } catch (e: any) {
    console.error('Error saat mengambil profil:', e.message);
    return NextResponse.json({ error: 'Terjadi kesalahan internal', details: e.message }, { status: 500 });
  }
}
