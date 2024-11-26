"use client";

import React, { useState } from "react";
import EditProfile from "@/components/EditProfile";

export default function EditProfilePage() {
  const [user, setUser] = useState({
    name: "John Doe",
    description: "I love cooking and sharing recipes with others.",
    profileImage: "",
  });

  const handleSave = (updatedData: { userName: string; description: string; profileImage?: string }) => {
    // Simpan data ke server atau state
    setUser({
      name: updatedData.userName,
      description: updatedData.description,
      profileImage: updatedData.profileImage || "",
    });
    alert("Profile updated successfully!");
  };

  return (
    <div className="container mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-5">Edit Profile</h1>
      <EditProfile
        userName={user.name}
        description={user.description}
        profileImage={user.profileImage}
        onSave={handleSave}
      />
    </div>
  );
}
