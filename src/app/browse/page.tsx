'use client'


import React, {useEffect, useState} from "react";
import FoodCard from "@/components/Card";
import { useSearchParams } from 'next/navigation';
import recipe from "@/models/Recipe"; // Import useSearchParams

export default function BrowsePage(req: Request) {
    const searchParams = useSearchParams(); // Get search parameters
    const search = searchParams.get('recipe'); // Get the 'recipe' parameter
    const [recipes, setRecipes] = useState([]);

    useEffect(() => {
        // Fetch vegan recipes from your API
        const fetchSearchRecipes = async () => {
            try {
                const response = await fetch(`/api/recipes?search=${search}`); // Replace with your API endpoint
                const data = await response.json();
                setRecipes(data);
            } catch (error) {
                console.error('Error fetching vegan recipes:', error);
            }
        };

        fetchSearchRecipes();
    }, []);

    return (
        <div>
            <h1>Results for {search}</h1>
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
    );
}
