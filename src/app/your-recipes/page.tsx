'use client';

import { useState, useEffect } from "react";
import Link from "next/link";
import FoodCard from "@/components/Card";
import { jwtVerify } from "jose";

interface Recipe {
  id: string;
  title: string;
  description: string;
  imageSrc: string;
  author: string;
  rating: string;
}

export default function YourRecipes() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);

  const secret = new TextEncoder().encode(process.env.NEXT_PUBLIC_ACCESS_TOKEN_SECRET as string);

  const getTokenFromCookies = () => {
    const tokenRow = document.cookie.split('; ').find(row => row.startsWith('token='));
    return tokenRow ? tokenRow.split('=')[1] : null;
  };

  const getUserIdFromToken = async (token) => {
    try {
      const decoded = await jwtVerify(token, secret);
      return decoded.payload.id;
    } catch (error) {
      console.error('Invalid token:', error);
      return null;
    }
  };

  useEffect(() => {
    const fetchRecipes = async () => {
      const token = getTokenFromCookies();
      const userId = await getUserIdFromToken(token);

      const response = await fetch(`/api/recipes?profile=${userId}`);
      const data = await response.json();
      setRecipes(data);
    };
    fetchRecipes();
  }, []);

  return (
    <div style={{ display: "flex" }}>
      <div style={{ flex: 1, padding: "20px" }}>
        {/* Header yang disesuaikan */}
        <div>
          <h1 className="text-3xl font-bold text-gray-800 mb-4">Your Recipes</h1>
          <hr className="bg-black" />
        </div>

        <div className="grid grid-cols-4 gap-4 m-2">
          {recipes.map((recipe) => (
            <FoodCard
              key={recipe.id}
              id={recipe._id}
              title={recipe.title}
              description={recipe.description}
              imageSrc={recipe.image_url}
              author={recipe.author}
              rating={recipe.difficulty}
            />
          ))}
        </div>

        <Link href="/your-recipes/upload">
          <div
            className="fixed bottom-10 right-10 bg-teal-500 rounded-full w-16 h-16 flex items-center justify-center shadow-lg cursor-pointer hover:bg-teal-700"
            title="Add Recipe"
          >
            <span className="text-white text-3xl">+</span>
          </div>
        </Link>
      </div>
    </div>
  );
}
