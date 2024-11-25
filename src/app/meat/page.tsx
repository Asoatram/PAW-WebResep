// src/app/meat/page.tsx
'use client'

import React, {useEffect, useState} from "react";
import FoodCard from "@/components/Card";

export default function MeatPage() {
    const [recipes, setRecipes] = useState([]);

    useEffect(() => {
        // Fetch vegan recipes from your API
        const fetchMeatRecipes = async () => {
            try {
                const response = await fetch('/api/recipes?tag=Meat'); // Replace with your API endpoint
                const data = await response.json();
                setRecipes(data);
            } catch (error) {
                console.error('Error fetching vegan recipes:', error);
            }
        };

        fetchMeatRecipes();
    }, []);

    return (
        <div>
            <h1>Meat Recipes</h1>
            <hr className={"bg-black"}/>
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
  