'use client';

import { CldUploadWidget } from "next-cloudinary";
import React, { useState } from "react"; // Import useState from React

const UploadRecipe = () => {
  const [difficulty, setDifficulty] = useState<string>('easy'); // default value as a string (easy, medium, hard)
  const [imageUrl, setImageUrl] = useState<string | null>(null); // State untuk menyimpan URL gambar
  const [title, setTitle] = useState<string>(''); // State untuk judul resep
  const [description, setDescription] = useState<string>(''); // State untuk deskripsi resep
  const [cookTime, setCookTime] = useState<string>(''); // State untuk waktu memasak
  const [prepTime, setPrepTime] = useState<string>(''); // State untuk waktu persiapan
  const [ingredients, setIngredients] = useState<string>(''); // State untuk bahan-bahan
  const [instructions, setInstructions] = useState<string>(''); // State untuk instruksi

  const handleDifficultyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDifficulty(e.target.value); // Menyimpan nilai difficulty
  };

  const handleUploadSuccess = (result: any) => {
    setImageUrl(result?.info?.secure_url); // Ambil URL gambar yang telah di-upload
    console.log('Upload successful:', result);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Mengambil data formulir
    const newRecipe = {
      title,
      description,
      difficulty,
      cookTime,
      prepTime,
      ingredients,
      instructions,
      imageUrl, // Menambahkan URL gambar
    };

    // Kirim data resep ke server melalui API
    const response = await fetch('/api/save-recipe', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newRecipe), // Mengirimkan seluruh data ke server
    });

    if (response.ok) {
      console.log('Recipe uploaded successfully');
    } else {
      console.error('Failed to upload recipe');
    }
  };

  return (
    <div className="flex flex-col items-center p-5">
      <form onSubmit={handleSubmit} className="flex flex-col w-4/5 max-w-3xl">
        <label className="text-xl mb-2" htmlFor="title">
          Title
        </label>
        <input
          className="w-full p-3 text-lg mb-5 border border-gray-300 rounded"
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)} // Menyimpan nilai input
          placeholder="Enter recipe title"
        />

        <label className="text-xl mb-2" htmlFor="description">
          Description
        </label>
        <textarea
          className="w-full p-3 text-lg mb-5 border border-gray-300 rounded resize-none h-24"
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)} // Menyimpan nilai input
          placeholder="Enter recipe description"
        />

        <label className="text-xl mb-2">Difficulty</label>
        <div className="inline justify-start gap-20 mt-2">
          <label className="flex items-center gap-2 mt-3">
            <input
              type="radio"
              name="difficulty"
              value="easy"
              onChange={handleDifficultyChange}
              checked={difficulty === 'easy'} // Menandai radio yang terpilih
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
              checked={difficulty === 'medium'} // Menandai radio yang terpilih
              className="w-5 h-5 rounded-full mr-3 mt-3"
            />
            Medium
          </label>
          <label className="flex items-center gap-2 mt-3">
            <input
              type="radio"
              name="difficulty"
              value="hard"
              onChange={handleDifficultyChange}
              checked={difficulty === 'hard'} // Menandai radio yang terpilih
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
          value={cookTime}
          onChange={(e) => setCookTime(e.target.value)} // Menyimpan nilai input
          placeholder="Enter cook time"
        />

        <label className="text-xl mb-2" htmlFor="prep-time">
          Preparation Time
        </label>
        <input
          className="w-full p-3 text-lg mb-5 border border-gray-300 rounded"
          type="text"
          id="prep-time"
          value={prepTime}
          onChange={(e) => setPrepTime(e.target.value)} // Menyimpan nilai input
          placeholder="Enter preparation time"
        />

        <label className="text-xl mb-2" htmlFor="ingredients">
          Ingredients
        </label>
        <textarea
          className="w-full p-3 text-lg mb-5 border border-gray-300 rounded resize-none h-24"
          id="ingredients"
          value={ingredients}
          onChange={(e) => setIngredients(e.target.value)} // Menyimpan nilai input
          placeholder="Enter ingredients"
        />

        <label className="text-xl mb-2" htmlFor="instructions">
          Instructions
        </label>
        <textarea
          className="w-full p-3 text-lg mb-5 border border-gray-300 rounded resize-none h-24"
          id="instructions"
          value={instructions}
          onChange={(e) => setInstructions(e.target.value)} // Menyimpan nilai input
          placeholder="Enter instructions"
        />

        <CldUploadWidget signatureEndpoint="/api/sign-image" onUpload={handleUploadSuccess}>
          {({ open }) => (
            <div>
              <label className="text-xl mb-2" htmlFor="upload">
                Upload +Images
              </label>
              <button
                type="button"
                onClick={() => open()}
                className="w-full p-3 text-lg mb-5 border border-gray-300 rounded"
              >
                Upload Image
              </button>
            </div>
          )}
        </CldUploadWidget>

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