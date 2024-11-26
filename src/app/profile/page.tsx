'use client'

import UserProfile from "@/components/UserProfile";
import FoodCard from "@/components/Card";
import {jwtVerify} from "jose";
import React, {useEffect, useState} from "react"; // Pastikan path benar

interface foodCardProps{
    _id : string,
  title : string,
  description : string,
  image_url : string,
  author : string,
  rating : string,
  difficulty : string,
}

export default function ProfilePage() {

  const [recipes, setRecipes] = useState<Array<foodCardProps> | never>([]); // State to store user data
  const secret = new TextEncoder().encode(process.env.NEXT_PUBLIC_ACCESS_TOKEN_SECRET); // Replace with your actual secret key

  const getUserIdFromToken = async (token:string) => {
    try {
      const { payload } = await jwtVerify(token, secret);
      console.log(payload);
      return payload.id; // Ensure your JWT token includes 'id' in its payload
    } catch (error) {
      console.error("Invalid token:", error);
      return null;
    }
  };

  const getTokenFromCookies = () => {
    const tokenRow = document.cookie.split("; ").find((row) => row.startsWith("token="));
    return tokenRow ? tokenRow.split("=")[1] : null; // Extract the token from cookies
  };

  useEffect(() => {
    const fetchUserData = async () => {
      const token = getTokenFromCookies();
      if (!token) {
        console.error("No token found");
        return;
      }
      const userId = await getUserIdFromToken(token);
      if (!userId) {
        console.error("Failed to retrieve user ID from token");
        return;
      }

      // Fetch user data from your backend using the userId
      try {
        console.log(userId)
        const response = await fetch(`/api/recipes?profile=${userId}`);
        if (!response.ok) {
          throw new Error("Failed to fetch user data");
        }
        const recipes = await response.json();
        setRecipes(recipes);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);
    return (
    <>
      <div>
        <UserProfile
          userName={"John Doe"}
          recipesPosted={1}
          description={"user.description"}
          profileImage={"user.profileImage"}
        />
      </div>

      <div className={"mt-8"}>
        <h1 className={"font-medium mr-10"}>Your Recipes</h1>
        <hr/>
        <div className="grid grid-cols-4 gap-4 m-2">
          {recipes.map((recipe:foodCardProps, index:number) => (
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
    </>
    );
}
