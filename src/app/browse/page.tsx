'use client';

import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import FoodCard from "@/components/Card";

interface FoodCardProps {
    _id: string;
    title: string;
    description: string;
    image_url: string;
    author: string;
    difficulty: string;
}

const BrowsePage = () => {
    const searchParams = useSearchParams();
    const search = searchParams.get("recipe");
    const [recipes, setRecipes] = useState<FoodCardProps[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchRecipes = async () => {
            setLoading(true);
            let url = "/api/recipes"; // Default to fetching all recipes

            if (search && search.trim() !== "") {
                url = `/api/recipes?search=${search}`;
            }

            try {
                const response = await fetch(url);
                const data = await response.json();
                setRecipes(data);
            } catch (error) {
                console.error("Error fetching recipes:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchRecipes(); // Call the function to fetch recipes

    }, [search]); // Re-run the effect when the search changes

    return (
        <div>
            <h1>Results for "{search}"</h1>
            <hr />
            {loading ? (
                <div>Loading...</div>
            ) : recipes.length === 0 ? (
                <div className="text-center text-lg text-gray-600 mt-10">
                    <img
                        src="/cry-emoji-emoticon-svgrepo-com.svg"
                        alt="No Results"
                        className="mx-auto mb-4"
                        style={{ width: "150px", height: "150px" }}
                    />
                    <p>
                        <span className="font-bold text-2xl">No results found for "{search}".</span>
                    </p>
                    <p>Perhaps try a broader search term, or a different keyword.</p>
                </div>
            ) : (
                <div className="grid grid-cols-4 gap-4 m-2">
                    {recipes.map((recipe) => (
                        <FoodCard
                            key={recipe._id}
                            id={recipe._id}
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
};

export default BrowsePage;
