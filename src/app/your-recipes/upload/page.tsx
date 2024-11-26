'use client'

import React, { useState } from "react";
import { jwtVerify } from "jose"; // Import useState from React
import { parseIngredients } from "@/app/api/utils/recipe.utils";

const UploadRecipe = () => {
    const [formValues, setFormValues] = useState({
        title: '',
        description: '',
        difficulty: '',
        cook_time: '',
        prep_time: '',
        ingredients: '',
        instructions: '',
        upload: null,
    });

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

    const handleDifficultyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setFormValues((prevValues) => ({
            ...prevValues,
            difficulty: value,
        }));
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormValues((prevValues) => ({
            ...prevValues,
            [name]: value,
        }));
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files ? e.target.files[0] : null;
        setFormValues((prevValues) => ({
            ...prevValues,
            upload: file,
        }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = { ...formValues };

        // Parse ingredients into JSON structure
        if (formData.ingredients) {
            formData.ingredients = parseIngredients(formData.ingredients);
        }

        const splitLines = (instructions: string): string[] => {
            return instructions.split('\n').map(line => line.trim()).filter(line => line.length > 0);
        };

        if (formData.instructions) {
            formData.instructions = splitLines(formData.instructions);
        }

        // Parse cook time and prep time as numbers
        formData.cook_time = parseInt(formData.cook_time) || 10;
        formData.prep_time = parseInt(formData.prep_time) || 10;

        const token = getTokenFromCookies();
        const userId = await getUserIdFromToken(token);

        if (userId) {
            formData.user_id = userId;
        } else {
            console.error("User ID could not be retrieved from token");
        }

        try {
            const response = await fetch("/api/recipes", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
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
            <form className="flex flex-col w-4/5 max-w-3xl" onSubmit={handleSubmit}>
                <label className="text-xl mb-2" htmlFor="title">
                    Title
                </label>
                <input
                    className="w-full p-3 text-lg mb-5 border border-gray-300 rounded"
                    type="text"
                    id="title"
                    name="title"
                    value={formValues.title}
                    onChange={handleChange}
                    placeholder="Enter recipe title"
                />

                <label className="text-xl mb-2" htmlFor="description">
                    Description
                </label>
                <textarea
                    className="w-full p-3 text-lg mb-5 border border-gray-300 rounded resize-none h-24"
                    id="description"
                    name="description"
                    value={formValues.description}
                    onChange={handleChange}
                    placeholder="Enter recipe description"
                />

                <label className="text-xl mb-2">Difficulty</label>
                <div className="inline justify-start gap-20 mt-2">
                    <label className="flex items-center gap-2 mt-3">
                        <input
                            type="radio"
                            name="difficulty"
                            value="easy"
                            checked={formValues.difficulty === "easy"}
                            onChange={handleDifficultyChange}
                            className="w-5 h-5 rounded-full mr-3"
                        />
                        Easy
                    </label>
                    <label className="flex items-center gap-2 mt-3">
                        <input
                            type="radio"
                            name="difficulty"
                            value="medium"
                            checked={formValues.difficulty === "medium"}
                            onChange={handleDifficultyChange}
                            className="w-5 h-5 rounded-full mr-3"
                        />
                        Medium
                    </label>
                    <label className="flex items-center gap-2 mt-3">
                        <input
                            type="radio"
                            name="difficulty"
                            value="hard"
                            checked={formValues.difficulty === "hard"}
                            onChange={handleDifficultyChange}
                            className="w-5 h-5 rounded-full mr-3"
                        />
                        Hard
                    </label>
                </div>

                <label className="text-xl mb-2 mt-2" htmlFor="cook-time">
                    Cook Time
                </label>
                <input
                    className="w-full p-3 text-lg mb-5 border border-gray-300 rounded"
                    type="text"
                    id="cook-time"
                    name="cook_time"
                    value={formValues.cook_time}
                    onChange={handleChange}
                    placeholder="Enter cook time"
                />

                <label className="text-xl mb-2" htmlFor="prep-time">
                    Preparation Time
                </label>
                <input
                    className="w-full p-3 text-lg mb-5 border border-gray-300 rounded"
                    type="text"
                    id="prep-time"
                    name="prep_time"
                    value={formValues.prep_time}
                    onChange={handleChange}
                    placeholder="Enter preparation time"
                />

                <label className="text-xl mb-2" htmlFor="ingredients">
                    Ingredients
                </label>
                <textarea
                    className="w-full p-3 text-lg mb-5 border border-gray-300 rounded resize-none h-24"
                    id="ingredients"
                    name="ingredients"
                    value={formValues.ingredients}
                    onChange={handleChange}
                    placeholder="Enter ingredients"
                />

                <label className="text-xl mb-2" htmlFor="instructions">
                    Instructions
                </label>
                <textarea
                    className="w-full p-3 text-lg mb-5 border border-gray-300 rounded resize-none h-24"
                    id="instructions"
                    name="instructions"
                    value={formValues.instructions}
                    onChange={handleChange}
                    placeholder="Enter instructions"
                />

                <label className="text-xl mb-2" htmlFor="upload">
                    Upload Videos/Images
                </label>
                <input
                    className="w-full p-3 text-lg mb-5 border border-gray-300 rounded"
                    type="file"
                    id="upload"
                    name="upload"
                    onChange={handleFileChange}
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
