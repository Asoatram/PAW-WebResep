'use client';
import React, { useEffect, useState } from 'react';
import Spinner from "@/components/Spinner";
import CommentBox from "@/components/CommentBox";

import dotenv from 'dotenv';
import { jwtVerify } from "jose";

dotenv.config();

export default function Recipe({ params, isSavedProp}) {
    const { id } = React.use(params); // Mengambil parameter langsung dari props
    const [recipe, setRecipe] = useState(null); // State untuk data resep
    const [error, setError] = useState(null); // State untuk pesan error
    const [comments, setComments] = useState([]); // State untuk komentar
    const [newComment, setNewComment] = useState(''); // State untuk input komentar baru
    // const [isSaved, setIsSaved] = useState(false); // State untuk status saved
    const [isSaved, setIsSaved] = useState(isSavedProp || false);

    const secret = new TextEncoder().encode(process.env.NEXT_PUBLIC_ACCESS_TOKEN_SECRET); // Secret untuk verifikasi JWT

    // ** Ambil token dari cookies **
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

    // ** Ambil data recipe dan komentar **
    useEffect(() => {
        if (id) {
            // Fetch recipe data
            fetch(`http://localhost:3000/api/recipes?id=${id}`)
                .then(res => {
                    if (!res.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return res.json(); // Return the promise
                })
                .then(data => {
                    if (data.length > 0) {
                        setRecipe(data[0]); // Set the recipe data
                        // Fetch comments for the recipe
                        return fetch(`http://localhost:3000/api/comments?recipe_id=${data[0].recipe_id}`);
                    } else {
                        setError('Recipe not found');
                    }
                })
                .then(res => {
                    if (res && res.ok) {
                        return res.json(); // Return the promise
                    } else {
                        throw new Error('Failed to fetch comments');
                    }
                })
                .then(data => {
                    if (data) {
                        setComments(data); // Set the comments data
                    }
                })
                .catch(err => {
                    console.error('Fetch error:', err);
                    setError('Failed to fetch recipe or comments');
                });
        }
    }, [id]);

    const checkSavedStatus = async (recipeId) => {
        const token = getTokenFromCookies();
        const userId = await getUserIdFromToken(token);
    
        if (!userId) return;
    
        try {
            const res = await fetch(`http://localhost:3000/api/save-status?user_id=${userId}&recipe_id=${recipeId}`);
            const { isSaved } = await res.json();
            console.log(`Initial isSaved: ${isSaved}`); // Debugging
            setIsSaved(isSaved);
        } catch (error) {
            console.error('Error checking saved status:', error);
        }
    };
    
    
    

    // ** Handle toggle save/unsave **
    const handleSaveToggle = async () => {
        try {
            const token = getTokenFromCookies();
            if (!token) {
                console.error('Token not found');
                return;
            }
    
            const userId = await getUserIdFromToken(token);
            if (!userId) {
                console.error('User ID not found');
                return;
            }
    
            console.log('Current recipe ID:', recipe.recipe_id);
            console.log('Current isSaved state:', isSaved);
    
            const url = `http://localhost:3000/api/saved`;
            const method = isSaved ? 'DELETE' : 'POST';
    
            console.log('Making API call with method:', method);
    
            const res = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ recipe_id: recipe.recipe_id, user_id: userId }),
            });
    
            if (!res.ok) {
                const errorData = await res.json();
                console.error('API error:', errorData);
                throw new Error('Failed to update saved status');
            }

            setIsSaved(prev => !prev); // Toggle state isSaved
            console.log('Saved state toggled successfully');
        } catch (error) {
            console.error('Error in handleSaveToggle:', error);
        }
    };
    
    
    
    
    

    // ** Handle komentar baru **
    const handleCommentSubmit = async (newComment) => {
        const token = getTokenFromCookies();
        const userId = await getUserIdFromToken(token);

        if (!userId) {
            console.error('User not authenticated');
            return;
        }

        try {
            const res = await fetch(`http://localhost:3000/api/comments`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ recipe_id: recipe.recipe_id, comment: newComment, user_id: userId }),
            });
            if (!res.ok) throw new Error('Failed to post comment');

            const data = await res.json();
            setComments([...comments, data]); // Tambahkan komentar baru
            setNewComment(''); // Reset input komentar
        } catch (error) {
            console.error('Error posting comment:', error);
        }
    };

    // ** Handle loading atau error state **
    if (error) return <div className="text-red-500">{error}</div>;
    if (!recipe) return <Spinner />;

    return (
        <div className="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-lg">
            <div className="flex items-center justify-between mb-4">
                <h1 className="text-3xl font-bold">{recipe.title}</h1>
                <button
                    onClick={handleSaveToggle}
                    className="ml-4"
                    aria-label="Save Recipe"
                >
                    {isSaved ? (
                        <img src="/saved_icon.svg" alt="Saved Icon" className="w-6 h-6 text-red-500" />
                    ) : (
                        <img src="/save_icon.svg" alt="Save Icon" className="w-6 h-6 text-gray-500" />
                    )}
                </button>
            </div>
            <div className="w-full h-64 bg-gray-300 flex items-center justify-center text-2xl text-gray-600 mb-4">
                <img src={recipe.image_url} alt={recipe.title} className="w-full h-full object-cover" />
            </div>
            <p className="italic mb-4">{recipe.cook_time} cook, {recipe.prep_time} prep</p>
            <h3 className="text-xl font-semibold mt-4">Description</h3>
            <p className="mb-4">{recipe.description}</p>
            <h3 className="text-xl font-semibold mt-4">Ingredients</h3>
            <ul className="list-disc list-inside mb-4">
                {recipe.ingredients && recipe.ingredients.length > 0 ? (
                    recipe.ingredients.map((ingredient) => (
                        <li key={ingredient._id}>
                            {ingredient.quantity} {ingredient.name}
                        </li>
                    ))
                ) : (
                    <li>No ingredients available.</li>
                )}
            </ul>
            <h3 className="text-xl font-semibold mt-4">Instructions</h3>
            <ol className="list-decimal list-inside mb-4">
                {recipe.instructions && recipe.instructions.length > 0 ? (
                    recipe.instructions.map((step, index) => (
                        <li key={index}>{step}</li>
                    ))
                ) : (
                    <li>No instructions available.</li>
                )}
            </ol>

            {/* Comment Box */}
            <CommentBox comments={comments} onCommentSubmit={handleCommentSubmit} />
        </div>
    );
}
