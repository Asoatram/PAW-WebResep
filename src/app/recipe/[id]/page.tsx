'use client'
import React, { useEffect, useState } from 'react';

export default function Recipe({ params }) {
    const { id } = React.use(params); // Unwrap params using React.use()
    const [recipe, setRecipe] = useState(null); // State to hold recipe data
    const [error, setError] = useState(null); // State to hold error messages
    const [comments, setComments] = useState([]); // State to hold comments
    const [newComment, setNewComment] = useState(''); // State for new comment input

    useEffect(() => {
        if (id) {
            // Correctly format the URL with the protocol
            fetch(`http://localhost:3000/api/recipes?id=${id}`)
                .then(res => {
                    if (!res.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return res.json();
                })
                .then(data => {
                    if (data.length > 0) {
                        setRecipe(data[0]); // Set the recipe data
                    } else {
                        setError('Recipe not found');
                    }
                })
                .catch(err => {
                    console.error('Fetch error:', err);
                    setError('Failed to fetch recipe');
                });
        }
    }, [id]); // Dependency array to run effect when id changes

    // Handle loading and error states
    if (error) {
        return <div className="text-red-500">{error}</div>;
    }

    if (!recipe) {
        return <div>Loading...</div>; // Show loading state
    }

    // Handle comment submission
    const handleCommentSubmit = (e) => {
        e.preventDefault();
        if (newComment.trim()) {
            setComments([...comments, newComment]);
            setNewComment(''); // Clear the input field
        }
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
            <h3 className="text-xl font-semibold mt-4">Comments</h3>
            <form onSubmit={handleCommentSubmit} className="mb-4">
                <textarea
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Add a comment..."
                    className="w-full h-24 p-2 border border-gray-300 rounded mb-2"
                />
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
                    Submit
                </button>
            </form>
            <ul className="list-disc list-inside">
                {comments.length > 0 ? (
                    comments.map((comment, index) => (
                        <li key={index} className="mb-2">{comment}</li>
                    ))
                ) : (
                    <li>No comments yet.</li>
                )}
            </ul>
        </div>
    );
}
