import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongoose"; // Pastikan Anda memiliki fungsi untuk menghubungkan MongoDB
import User from "@/models/User";

export async function PATCH(request: Request) {
  try {
    await connectToDatabase();

    const body = await request.json();
    const { user_id, userName, description, profileImage } = body;

    // Validasi input
    if (!user_id || !userName || !description) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Cari pengguna berdasarkan user_id
    const user = await User.findOne({ user_id });
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Perbarui data pengguna
    user.username = userName;
    user.description = description;
    if (profileImage) {
      user.profilePicture = profileImage;
    }

    // Simpan perubahan ke database
    await user.save();

    return NextResponse.json(
      { message: "Profile updated successfully", user },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating profile:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
