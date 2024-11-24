'use client';
import React, { useEffect, useState } from 'react';
import Spinner from "@/components/Spinner";
import CommentBox from "@/components/CommentBox";

import dotenv from 'dotenv';


import {jwtVerify} from "jose";

dotenv.config();
export default function Recipe({ params }) {
    const { id } = React.use(params); // Unwrap params directly
    const [recipe, setRecipe] = useState(null); // State to hold recipe data
    const [error, setError] = useState(null); // State to hold error messages
    const [comments, setComments] = useState([]); // State to hold comments
    const [newComment, setNewComment] = useState(''); // State for new comment input
    const secret = new TextEncoder().encode(process.env.NEXT_PUBLIC_ACCESS_TOKEN_SECRET); // Use NEXT_PUBLIC_ prefix

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
    }, [id]); // Dependency array to run effect when id changes

    // Handle loading and error states
    if (error) {
        return <div className="text-red-500">{error}</div>;
    }

    if (!recipe) {
        return <Spinner />; // Show loading state
    }

    // Function to decode the JWT and extract user_id
    const getUserIdFromToken = async (token) => {
        try {
            const decoded = await jwtVerify(token, secret);
            return decoded.payload.id; // Ensure your token has an 'id' field
        } catch (error) {
            console.error('Invalid token:', error);
            return null; // Return null if token is invalid
        }
    };

    const getTokenFromCookies = () => {
        const tokenRow = document.cookie.split('; ').find(row => row.startsWith('token='));
        return tokenRow ? tokenRow.split('=')[1] : null; // Return the token or null if not found
    };

    // Handle comment submission
    const handleCommentSubmit = async (newComment) => {
        const token = getTokenFromCookies();
        const user_id = await getUserIdFromToken(token); // Extract user_id from the token
        console.log(user_id);

        if (!user_id) {
            console.error('User not authenticated');
            return; // Exit if user is not authenticated
        }

        // Post new comment to the API
        fetch(`http://localhost:3000/api/comments`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },

            body: JSON.stringify({ recipe_id: recipe.recipe_id, comment: newComment, user_id }), // Include userId in the request body
        })
            .then(res => {
                if (!res.ok) {
                    throw new Error('Failed to post comment');
                }
                return res.json();
            })
            .then(data => {
                setComments([...comments, data]); // Assuming the API returns the new comment
                setNewComment(''); // Clear the input after submission
            })
            .catch(err => {
                console.error('Error posting comment:', err);
            });
    };

    return (
        <div className="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-lg">
            <h1 className="text-3xl font-bold mb-4">{recipe.title}</h1>
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
