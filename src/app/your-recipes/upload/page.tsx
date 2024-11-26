'use client';

import React from 'react';
import {parseIngredients} from "@/app/api/utils/recipe.utils";
import {jwtVerify} from "jose";

const UploadRecipe = () => {
    const splitLines = (input: string): string[] => {
        return input.split('\n').map(line => line.trim()).filter(line => line.length > 0);
    };
    const secret = new TextEncoder().encode(process.env.NEXT_PUBLIC_ACCESS_TOKEN_SECRET); // Secret untuk verifikasi JWT

    const getTokenFromCookies = () => {
        const tokenRow = document.cookie.split('; ').find(row => row.startsWith('token='));
        return tokenRow ? tokenRow.split('=')[1] : null; // Ambil token atau null jika tidak ada
    };

    // ** Decode JWT untuk mendapatkan user_id **
    const getUserIdFromToken = async (token) => {
        try {
            const decoded = await jwtVerify(token, secret);
            console.log(decoded.id)
            return decoded.payload.id; // Pastikan JWT memiliki field `id`
        } catch (error) {
            console.error('Invalid token:', error);
            return null; // Kembalikan null jika token tidak valid
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);

        // Create a new object with the form data values
        const formValues: { [key: string]: any } = {};

        // Populate the formValues object manually
        formData.forEach((value, key) => {
            formValues[key] = value;
        });

        // Parse ingredients into JSON structure
        if (formValues.ingredients) {
            formValues.ingredients = parseIngredients(formValues.ingredients as string);
        }

        // Parse instructions into an array of strings
        if (formValues.instructions) {
            formValues.instructions = splitLines(formValues.instructions as string);
        }

        // Parse cook time and prep time as numbers
        if (formValues.cook_time) {
            formValues.cook_time = parseInt(formValues.cook_time as string) || 10;
        }

        if (formValues.prep_time) {
            formValues.prep_time = parseInt(formValues.prep_time as string) || 10;
        }

        // Get the token and decode it to get user_id
        const token = getTokenFromCookies();
        const userId = await getUserIdFromToken(token);
        console.log(userId)

        if (userId) {
            formValues.user_id = userId;  // Add user_id to formValues
        } else {
            console.error("User ID could not be retrieved from token");
        }

        // Send the data to the server
        try {
            const response = await fetch("/api/recipes", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formValues),
            });

            if (response.ok) {
                console.log("Recipe uploaded successfully");
            } else {
                console.error("Error uploading recipe:", response.statusText);
            }
        } catch (error) {
            console.error("Error uploading recipe:", error);
        }
    };


    return (
        <div className="flex flex-col items-center p-5">
            <form
                className="flex flex-col w-4/5 max-w-3xl"
                onSubmit={handleSubmit}
                noValidate
            >
                <label className="text-xl mb-2" htmlFor="title">Title</label>
                <input
                    className="w-full p-3 text-lg mb-5 border border-gray-300 rounded"
                    type="text"
                    name="title"
                    placeholder="Enter recipe title"
                />

                <label className="text-xl mb-2" htmlFor="description">Description</label>
                <textarea
                    className="w-full p-3 text-lg mb-5 border border-gray-300 rounded resize-none"
                    name="description"
                    placeholder="Enter recipe description"
                />

                <label className="text-xl mb-2">Difficulty</label>
                <div className="inline justify-start gap-20 mt-2">
                    {['easy', 'medium', 'hard'].map((level) => (
                        <label key={level} className="flex items-center gap-2 mt-3">
                            <input
                                type="radio"
                                name="difficulty"
                                value={level}
                                className="w-5 h-5 rounded-full mr-3"
                            />
                            {level.charAt(0).toUpperCase() + level.slice(1)}
                        </label>
                    ))}
                </div>

                <label className="text-xl mb-2" htmlFor="cook_time">Cook Time</label>
                <input
                    className="w-full p-3 text-lg mb-5 border border-gray-300 rounded"
                    type="text"
                    name="cook_time"
                    placeholder="Enter cook time"
                />

                <label className="text-xl mb-2" htmlFor="prep_time">Preparation Time</label>
                <input
                    className="w-full p-3 text-lg mb-5 border border-gray-300 rounded"
                    type="text"
                    name="prep_time"
                    placeholder="Enter preparation time"
                />

                <label className="text-xl mb-2" htmlFor="ingredients">Ingredients</label>
                <textarea
                    className="w-full p-3 text-lg mb-5 border border-gray-300 rounded resize-none"
                    name="ingredients"
                    placeholder="Enter ingredients"
                />

                <label className="text-xl mb-2" htmlFor="instructions">Instructions</label>
                <textarea
                    className="w-full p-3 text-lg mb-5 border border-gray-300 rounded resize-none"
                    name="instructions"
                    placeholder="Enter instructions"
                />

                <label className="text-xl mb-2" htmlFor="image_url">Image URL</label>
                <input
                    className="w-full p-3 text-lg mb-5 border border-gray-300 rounded"
                    type="text"
                    name="image_url"
                />

                <button
                    type="submit"
                    className="p-4 px-8 bg-teal-600 text-white rounded-lg text-xl cursor-pointer self-end w-48 hover:bg-teal-700"
                >
                    Upload
                </button>
            </form>
        </div>
    );
};

export default UploadRecipe;
