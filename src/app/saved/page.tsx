'use client';

import React, { useEffect, useState } from 'react';
import FoodCard from '@/components/Card';
import { jwtVerify } from 'jose';

export default function SavedRecipesPage() {
    const [recipes, setRecipes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const secret = new TextEncoder().encode(process.env.NEXT_PUBLIC_ACCESS_TOKEN_SECRET); // Secret untuk verifikasi JWT

    const getTokenFromCookies = () => {
        const tokenRow = document.cookie.split('; ').find(row => row.startsWith('token='));
        return tokenRow ? tokenRow.split('=')[1] : null; // Ambil token atau null jika tidak ada
    };

    // ** Decode JWT untuk mendapatkan user_id **
    const getUserIdFromToken = async (token) => {
        try {
            const decoded = await jwtVerify(token, secret);
            return decoded.payload.id; // Pastikan JWT memiliki field `id`
        } catch (error) {
            console.error('Invalid token:', error);
            return null; // Kembalikan null jika token tidak valid
        }
    };

    useEffect(() => {
        const fetchSavedRecipes = async () => {
            try {
                const token = getTokenFromCookies();
                if (!token) {
                    throw new Error('User not authenticated');
                }

                const user_id = await getUserIdFromToken(token);
                if (!user_id) {
                    throw new Error('Invalid user ID');
                }

                const response = await fetch(`/api/saved-recipes?user_id=${user_id}`);
                if (!response.ok) {
                    throw new Error(`Failed to fetch saved recipes: ${response.statusText}`);
                }

                const data = await response.json();
                setRecipes(data);
                setLoading(false);
            } catch (err) {
                console.error('Error fetching saved recipes:', err);
                setError(err.message);
                setLoading(false);
            }
        };

        fetchSavedRecipes();
    }, []); // Tidak ada dependensi tambahan

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p className="text-red-500">{error}</p>;
    }

    if (recipes.length === 0) {
        return <p>No saved recipes found.</p>;
    }

    return (
        <div>
            <h1>Your Saved Recipes</h1>
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
