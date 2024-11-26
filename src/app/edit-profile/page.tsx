"use client";

import React, { useState, useEffect } from "react";
import EditProfile from "@/components/EditProfile";
import { jwtVerify } from "jose";

export default function EditProfilePage() {
  const [user, setUser] = useState({
    id: null, // ID pengguna akan diambil dari JWT token
    name: "",
    description: "",
    profileImage: "",
  });

  const secret = new TextEncoder().encode(process.env.NEXT_PUBLIC_ACCESS_TOKEN_SECRET); // Secret untuk JWT

  // Ambil token dari cookies
  const getTokenFromCookies = () => {
    const tokenRow = document.cookie.split("; ").find((row) => row.startsWith("token="));
    return tokenRow ? tokenRow.split("=")[1] : null; // Ambil token atau null jika tidak ada
  };

  // Decode JWT untuk mendapatkan user_id
  const getUserIdFromToken = async (token: string) => {
    try {
      const decoded = await jwtVerify(token, secret); // Decode token dengan secret
      return decoded.payload.id; // Pastikan token memiliki field `id` di payload
    } catch (error) {
      console.error("Invalid token:", error);
      return null; // Kembalikan null jika token tidak valid
    }
  };

  // Fungsi untuk mengambil data pengguna yang sedang login
  const fetchUserData = async () => {
    const token = getTokenFromCookies(); // Ambil token dari cookies
    if (!token) {
      console.error("Token not found");
      return;
    }

    const userId = await getUserIdFromToken(token); // Decode token untuk mendapatkan user_id
    if (!userId) {
      console.error("User ID not found in token");
      return;
    }

    try {
      // Pastikan user_id dikirim di query string
      const response = await fetch(`/api/users/get-profile?user_id=${userId}`);
      if (response.ok) {
        const userData = await response.json();
        setUser({
          id: userId,
          name: userData.username,
          description: userData.description,
          profileImage: userData.profilePicture,
        });
      } else {
        console.error("Failed to fetch user data");
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  // Gunakan useEffect untuk memuat data pengguna saat halaman dimuat
  useEffect(() => {
    fetchUserData();
  }, []);

  // Fungsi untuk menyimpan data ke database
  const handleSave = async (updatedData: { userName: string; description: string; profileImage?: string }) => {
    try {
      // Upload gambar ke Cloudinary jika ada gambar baru
      let profileImageUrl = user.profileImage;
      if (updatedData.profileImage && updatedData.profileImage !== user.profileImage) {
        const uploadResponse = await fetch("/api/sign-image", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            file: updatedData.profileImage, // Base64 atau URL file
          }),
        });

        if (uploadResponse.ok) {
          const uploadData = await uploadResponse.json();
          profileImageUrl = uploadData.secure_url; // URL gambar dari Cloudinary
        } else {
          const error = await uploadResponse.json();
          alert(`Failed to upload image: ${error.error}`);
          return;
        }
      }

      // Payload untuk update profile
      const payload = {
        user_id: user.id, // Gunakan ID pengguna yang didapatkan dari token
        userName: updatedData.userName,
        description: updatedData.description,
        profileImage: profileImageUrl,
      };

      const response = await fetch("/api/users/update-profile", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        const result = await response.json();
        setUser({
          id: user.id,
          name: result.user.username,
          description: result.user.description,
          profileImage: result.user.profilePicture,
        });
        alert("Profile updated successfully!");
      } else {
        const error = await response.json();
        alert(`Failed to update profile: ${error.error}`);
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("An error occurred while updating the profile.");
    }
  };

  return (
    <div className="container mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-5">Edit Profile</h1>
      {user.id ? ( // Render hanya jika user.id tersedia
        <EditProfile
          userName={user.name}
          description={user.description}
          profileImage={user.profileImage}
          onSave={handleSave} // Fungsi untuk menyimpan ke database
        />
      ) : (
        <p>Loading...</p> // Tampilkan loading saat data pengguna belum tersedia
      )}
    </div>
  );
}
