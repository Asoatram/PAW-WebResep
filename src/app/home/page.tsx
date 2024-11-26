'use client';
import { useEffect, useState } from "react";
import FoodCard from "@/components/Card";
import Carousel from "@/components/Carousel";

interface Recipe {
    _id: string;
    title: string;
    description: string;
    image_url: string;
    author: string;
    rating: string;
    difficulty: string;
    prep_time: number; // Added prep_time attribute
    cook_time: number; // Added cook_time attribute
}

export default function Main() {
    const [recipes, setRecipes] = useState<Array<Recipe>>([]);
    const [sortOption, setSortOption] = useState<string>("id"); // State for sorting option

    useEffect(() => {
        const fetchRecipes = async () => {
            try {
                const res = await fetch('http://localhost:3000/api/recipes');
                if (!res.ok) {
                    throw new Error(`Error: ${res.status}`);
                }
                const data = await res.json();
                setRecipes(data);
            } catch (error) {
                console.error("Failed to fetch recipes:", error);
            }
        };

        fetchRecipes();
    }, []);

    // Sorting logic based on selected sort option
    const sortedRecipes = [...recipes].sort((a, b) => {
        if (sortOption === "prep_time") {
            return a.prep_time - b.prep_time;
        } else if (sortOption === "cook_time") {
            return a.cook_time - b.cook_time;
        } else {
            return a._id.localeCompare(b._id); // Default: Sort by ID
        }
    });

    return (
        <div>
            <Carousel />
            <hr />
            
            {/* Sorting Dropdown */}
            <div className="flex items-center space-x-4 m-4">
                <label htmlFor="sort" className="font-medium text-gray-700">
                    Sort By:
                </label>
                <select
                    id="sort"
                    value={sortOption}
                    onChange={(e) => setSortOption(e.target.value)}
                    className="border rounded-lg p-2 focus:ring focus:ring-blue-300"
                >
                    <option value="id">ID</option>
                    <option value="prep_time">Preparation Time</option>
                    <option value="cook_time">Cooking Time</option>
                </select>
            </div>

            {/* Render sorted recipes */}
            <div className="grid grid-cols-4 gap-4 m-2 z-3">
                {sortedRecipes.map((recipe) => (
                    <FoodCard
                        id={recipe._id}
                        key={recipe._id} // Unique key for each recipe
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
