'use client';
import { useEffect, useState } from "react";
import FoodCard from "@/components/Card";
import Carousel from "@/components/Carousel";

interface recipe{
    title: string;
    description: string;
    image_url: string;
    author: string;
    rating: number;
    difficulty: string;
}

export default function Main() {
    const [recipes, setRecipes] = useState([]); // State to store fetched data

    useEffect(() => {
        // Define an async function for fetching data
        const fetchRecipes = async () => {
            try {
                const res = await fetch('http://localhost:3000/api/recipes'); // Use HTTP for localhost
                if (!res.ok) {
                    throw new Error(`Error: ${res.status}`); // Handle errors
                }
                const data = await res.json(); // Parse JSON data
                setRecipes(data); // Store the data in state
            } catch (error) {
                console.error("Failed to fetch recipes:", error); // Log fetch error
            }
        };

        fetchRecipes(); // Call the async function
    }, []); // Add an empty dependency array to run only on mount

    return (
        <div>
            <p>Hello Everyone!</p>
            <hr/>
            {/* Render fetched recipes */}
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
    );
}