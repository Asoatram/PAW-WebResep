'use client'; // Client-side component

import { useEffect, useState } from 'react';
import UserProfile from '@/components/UserProfile'; // Pastikan komponen ini sesuai
import FoodCard from '@/components/Card';           // Pastikan komponen ini sesuai
import Link from 'next/link';

interface UserProfileData {
  name: string;
  email: string;
  recipesPosted: number;
  description: string;
  profileImage: string;
}

export default function ProfilePage() {
  const [user, setUser] = useState<UserProfileData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const res = await fetch('/api/profile', {
          method: 'GET',
          credentials: 'include', // Pastikan cookies dikirim
        });

        if (!res.ok) {
          throw new Error(`Failed to fetch profile: ${res.statusText}`);
        }

        const data = await res.json();
        setUser(data); // Update state dengan data user
        console.log(data)
      } catch (err: any) {
        setError(err.message); // Tangani error
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!user) {
    return <div>No user profile found.</div>;
  }

  return (
    <div>
      <UserProfile
        userName={user.name}
        recipesPosted={user.recipesPosted}
        description={user.description}
        profileImage={user.profileImage}
      />

      <div className="mt-8">
        <h1 className="font-medium mr-10">Your Recipes</h1>
        <hr />
      </div>

      {/* Tampilkan tombol edit profil */}
      <Link href="/edit-profile">
        <button className="bg-blue-500 text-white px-4 py-2 rounded">Edit Profile</button>
      </Link>
    </div>
  );
}
