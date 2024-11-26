'use client'; // Client-side component

import React, { useEffect, useState } from 'react';
import UserProfile from '@/components/UserProfile'; // Pastikan komponen ini sesuai
import FoodCard from '@/components/Card';           // Pastikan komponen ini sesuai
import Link from 'next/link';
import {jwtVerify} from "jose";

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
  const [recipes, setRecipes] = useState([]);

  const secret = new TextEncoder().encode(process.env.NEXT_PUBLIC_ACCESS_TOKEN_SECRET as string);


  const getTokenFromCookies = ():string => {
    const tokenRow = document.cookie.split('; ').find(row => row.startsWith('token='));
    return tokenRow ? tokenRow.split('=')[1] : "Not Found";
  };

  const getUserIdFromToken = async (token: string):number => {
    try {
      const decoded = await jwtVerify(token, secret);
      return decoded.payload.id;
    } catch (error) {
      console.error('Invalid token:', error);
      return null;
    }
  };

  const fetchRecipes = async () => {
    const token:string = getTokenFromCookies();
    const userId:number = await getUserIdFromToken(token);

    const response = await fetch(`/api/recipes?profile=${userId}`);
    const data = await response.json();
    setRecipes(data);
  };





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
        fetchRecipes();

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
        <hr/>
        <div className="grid grid-cols-4 gap-4 m-2">
          {recipes.map((recipe, index) => (
              <FoodCard
                  id={recipe._id}
                  key={index}
                  title={recipe.title}
                  description={recipe.description}
                  imageSrc={recipe.image_url}
                  author={recipe.author}
                  rating={recipe.difficulty}
              />
          ))}
        </div>

      </div>

    </div>
  );
}
