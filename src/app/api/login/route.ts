import { SignJWT } from 'jose';
import { NextResponse, NextRequest } from "next/server";
import User from "@/models/User";
import bcrypt from "bcrypt";
import connectDB from "@/lib/mongoose";


export async function POST(req: NextRequest) {
    await connectDB(); // Connect to the database

    try {
        const { email, password } = await req.json(); // Parse the request body

        // Find the user by email
        const user = await User.findOne({ email });
        if (!user) {
            return NextResponse.json({ status: 404, error: 'User Not Found' }, { status: 404 });
        }

        // Compare the provided password with the stored hashed password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return NextResponse.json({ status: 401, error: 'Invalid password' }, { status: 401 });
        }

        // Generate the access token
        const secret = new TextEncoder().encode(process.env.ACCESS_TOKEN_SECRET);
        const accessToken = await new SignJWT({id: user.user_id, email: user.email}).setProtectedHeader({ alg: 'HS256' })
            .setIssuedAt()
            .setExpirationTime('1h')
            .sign(secret);

        // Set the token in cookies
        const response = NextResponse.json({ user, accessToken, status: 200 });
        response.cookies.set('token', accessToken, {
            httpOnly: false, // Set to true for security
            secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
            sameSite: 'strict',
            path: '/',
            maxAge: 60 * 60, // 1 hour
        });

        return response; // Return the response with the access token
    } catch (e: any) {
        console.error('Authentication error:', e); // Log the error for debugging
        return NextResponse.json({ error: 'Failed to authenticate user', details: e.message }, { status: 400 });
    }
}
