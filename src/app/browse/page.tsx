'use client';

import React, { useEffect, useState } from "react";
import FoodCard from "@/components/Card";
import { useSearchParams } from 'next/navigation';

interface Recipe {
    _id: string;
    title: string;
    description: string;
    image_url: string;
    author: string;
    rating: string;
    difficulty: string;
    prep_time: number; // Updated to match the attribute name
    cook_time: number; // Updated to match the attribute name
}

export default function BrowsePage() {
    const searchParams = useSearchParams();
    const search = searchParams.get('recipe');
    const [recipes, setRecipes] = useState<Recipe[]>([]);
    const [sortOption, setSortOption] = useState<string>("id"); // State for sorting option

    useEffect(() => {
        const fetchSearchRecipes = async () => {
            try {
                let url = '/api/recipes';

                if (search && search.trim() !== '') {
                    url = `/api/recipes?search=${encodeURIComponent(search)}`;
                }

                const response = await fetch(url);
                const data = await response.json();

                setRecipes(data);
            } catch (error) {
                console.error('Error fetching recipes:', error);
            }
        };

        fetchSearchRecipes();
    }, [search]);

    // Sorting logic based on the selected option
    const sortedRecipes = [...recipes].sort((a, b) => {
        if (sortOption === "prep_time") {
            return a.prep_time - b.prep_time;
        } else if (sortOption === "cook_time") {
            return a.cook_time - b.cook_time;
        } else {
            return a._id.localeCompare(b._id); // Default: Sort by ID (assumed string)
        }
    });

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold text-gray-700 mb-4">
                Results for "{search}"
            </h1>
            <hr className="mb-6" />

            {/* Sorting Dropdown */}
            <div className="mb-6 flex items-center space-x-4">
                <label htmlFor="sort" className="text-gray-700 font-medium">
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

            {/* Conditional rendering for no results */}
            {sortedRecipes.length === 0 ? (
                <div className="text-center text-gray-600 mt-10">
                    <img
                        src="/cry-emoji-emoticon-svgrepo-com.svg"
                        alt="No Results"
                        className="mx-auto mb-4"
                        style={{ width: '150px', height: '150px' }}
                    />
                    <p className="font-bold text-xl">No results found for "{search}".</p>
                    <p>Try a broader search term or a different keyword.</p>
                </div>
            ) : (
                <div className="grid grid-cols-4 gap-4 m-2">
                    {sortedRecipes.map((recipe) => (
                        <FoodCard
                            id={recipe._id}
                            key={recipe._id} // Unique key
                            title={recipe.title}
                            description={recipe.description}
                            imageSrc={recipe.image_url}
                            author={recipe.author}
                            rating={recipe.rating}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}
