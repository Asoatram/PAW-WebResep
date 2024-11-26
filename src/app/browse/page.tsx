'use client'


import React, {useEffect, useState} from "react";
import FoodCard from "@/components/Card";
import { useSearchParams } from 'next/navigation';
import recipe from "@/models/Recipe"; // Import useSearchParams

interface FoodCard{
    id: string;
    title: string;
    description: string;
    imageSrc: string;
    author: string;
    rating: string;
  }

export default function BrowsePage() {
    const searchParams = useSearchParams(); // Get search parameters
    const search = searchParams.get('recipe'); // Get the 'recipe' parameter from the URL
    const [recipes, setRecipes] = useState([]); // Store fetched recipes

    useEffect(() => {
        // Fetch recipes based on the search query from the URL
        const fetchSearchRecipes = async () => {
            try {
                let url = '/api/recipes'; // Default to fetching all recipes

                if (search && search.trim() !== '') {
                    url = `/api/recipes?search=${search}`; // Fetch recipes based on search query
                }

                const response = await fetch(url);
                const data = await response.json();
                if (data.length === 0) {
                    setRecipes([]);
                } else {
                    setRecipes(data);
                }
                setRecipes(data); // Set the fetched data in state
            } catch (error) {
                console.error('Error fetching recipes:', error);
            }
        };

        fetchSearchRecipes(); // Call the fetch function when the component mounts or search changes
    }, [search]); // Re-run this effect whenever the `search` value changes

    return (
        <div>
            <h1>Results for "{search}"</h1>
            <hr/>
            {/* Conditional rendering: If no recipes, show a "No data found" message */}
            {recipes.length === 0 ? (
                <div className="text-center text-lg text-gray-600 mt-10">
                <img
                    src="/cry-emoji-emoticon-svgrepo-com.svg"  // Replace with the path to your image
                    alt="No Results"
                    className="mx-auto mb-4"  // Center the image
                    style={{ width: '150px', height: '150px' }} // Adjust size as needed
                />
                <p><span className="font-bold text-2xl">No results found for "{search}".</span></p>
                <p>Perhaps try a broader search term, or a different keyword.</p>
            </div>
            ) : (
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
            )}
        </div>
    );
}
