'use client';
import React, { useEffect, useState } from 'react';
import FoodCard from '@/components/Card';

export default function SavedPage() {
    const [recipes, setRecipes] = useState([]); // State untuk menyimpan resep
    const [loading, setLoading] = useState(true); // State untuk loading
    const [error, setError] = useState(null); // State untuk error

    useEffect(() => {
        const fetchSavedRecipes = async () => {
            try {
                // Fetch user data untuk mendapatkan savedRecipes
                const userResponse = await fetch('/api/users'); // Sesuaikan endpoint API
                const userData = await userResponse.json();

                if (!userData.savedRecipes || userData.savedRecipes.length === 0) {
                    setRecipes([]); // Jika tidak ada resep tersimpan
                    setLoading(false);
                    return;
                }

                // Fetch detail resep berdasarkan savedRecipes
                const recipesResponse = await fetch(
                    `/api/recipes?ids=${userData.savedRecipes.join(',')}` // Mengirimkan array `savedRecipes` sebagai query parameter
                );
                const recipesData = await recipesResponse.json();

                setRecipes(recipesData); // Simpan data resep
                setLoading(false);
            } catch (err) {
                console.error('Error fetching saved recipes:', err);
                setError('Failed to fetch saved recipes.');
                setLoading(false);
            }
        };

        fetchSavedRecipes();
    }, []);

    if (loading) {
        return <p>Loading...</p>; // Tampilan saat loading
    }

    if (error) {
        return <p className="text-red-500">{error}</p>; // Tampilan saat error
    }

    if (recipes.length === 0) {
        return <p>No saved recipes found.</p>; // Tampilan jika tidak ada resep
    }

    return (
        <div>
            <div>
                <p>Hello Everyone! Browse your saved recipes</p>
                <hr />
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
        </div>
    );
}
