import { v2 as cloudinary } from "cloudinary";
import { NextResponse } from "next/server";

// Konfigurasi Cloudinary
cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(request: Request) {
  try {
    // Ambil file dari body request (jika menggunakan base64 atau form-data, Anda dapat menyesuaikan logika ini)
    const body = await request.json();
    const file = body.file; // Pastikan file yang dikirim berupa Base64 atau URL

    if (!file) {
      return NextResponse.json({ error: "File is missing" }, { status: 400 });
    }

    // Upload ke Cloudinary
    const result = await cloudinary.uploader.upload(file, {
      folder: "your_folder_name", // Ganti dengan folder tujuan di Cloudinary
    });

    // Return secure_url sebagai response
    return NextResponse.json({
      secure_url: result.secure_url, // URL yang dapat diakses secara publik
      public_id: result.public_id,  // ID file di Cloudinary
    });
  } catch (error) {
    console.error("Error uploading to Cloudinary:", error);
    return NextResponse.json(
      { error: "Failed to upload file to Cloudinary" },
      { status: 500 }
    );
  }
}
