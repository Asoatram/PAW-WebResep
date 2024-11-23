'use client';
import { useEffect, useState } from "react";
import FoodCard from "@/components/Card";

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
                console.log(data); // Log fetched data
                setRecipes(data); // Store the data in state
            } catch (error) {
                console.error("Failed to fetch recipes:", error); // Log fetch error
            }
        };

        fetchRecipes(); // Call the async function
    }, []); // Add an empty dependency array to run only on mount

    return (
        <div>
            <p>Hello Everyone</p>
            <hr />
            {/* Render fetched recipes */}
            <div className="flex flex-wrap m-2">
                {recipes.reduce((rows, recipe, index) => {
                    // Create a new row every 4 items
                    if (index % 4 === 0) {
                        rows.push([]);
                    }
                    rows[rows.length - 1].push(recipe);
                    return rows;
                }, []).map((row, rowIndex) => (
                    <div className="flex justify-between w-full mb-4" key={rowIndex}>
                        {row.map((recipe, colIndex) => (
                            <FoodCard
                                key={colIndex}
                                title={recipe.title}
                                description="test"
                                imageSrc="alt"
                                author={recipe.author}
                                rating={recipe.difficulty}
                            />
                        ))}
                    </div>
                ))}
            </div>

        </div>
    );
}