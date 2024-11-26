'use client'

import React, { useState } from "react"; // Import useState from React

const UploadRecipe = () => {
  const [difficulty, setDifficulty] = useState<number>(0); // default value is a number

  const handleDifficultyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setDifficulty(Number(value)); // Convert string to number
  };

  return (
    <div className="flex flex-col items-center p-5">
      <form className="flex flex-col w-4/5 max-w-3xl">
        <label className="text-xl mb-2" htmlFor="title">
          Title
        </label>
        <input
          className="w-full p-3 text-lg mb-5 border border-gray-300 rounded"
          type="text"
          id="title"
          placeholder="Enter recipe title"
        />

        <label className="text-xl mb-2" htmlFor="description">
          Description
        </label>
        <textarea
          className="w-full p-3 text-lg mb-5 border border-gray-300 rounded resize-none h-24"
          id="description"
          placeholder="Enter recipe description"
        />

        <label className="text-xl mb-2">Difficulty</label>
        <div className="inline justify-start gap-20">
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="difficulty"
              value="easy"
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
          placeholder="Enter cook time"
        />

        <label className="text-xl mb-2" htmlFor="prep-time">
          Preparation Time
        </label>
        <input
          className="w-full p-3 text-lg mb-5 border border-gray-300 rounded"
          type="text"
          id="prep-time"
          placeholder="Enter preparation time"
        />

        <label className="text-xl mb-2" htmlFor="ingredients">
          Ingredients
        </label>
        <textarea
          className="w-full p-3 text-lg mb-5 border border-gray-300 rounded resize-none h-24"
          id="ingredients"
          placeholder="Enter ingredients"
        />

        <label className="text-xl mb-2" htmlFor="instructions">
          Instructions
        </label>
        <textarea
          className="w-full p-3 text-lg mb-5 border border-gray-300 rounded resize-none h-24"
          id="instructions"
          placeholder="Enter instructions"
        />

        <label className="text-xl mb-2" htmlFor="upload">
          Upload Videos/Images
        </label>
        <input
          className="w-full p-3 text-lg mb-5 border border-gray-300 rounded"
          type="file"
          id="upload"
        />

        <button
          type="submit"
          className="p-2 px-8 bg-teal-600 text-white rounded-lg text-xl cursor-pointer self-end w-48 hover:bg-teal-700"
        >
          Upload
        </button>
      </form>
    </div>
  );
};

export default UploadRecipe;
