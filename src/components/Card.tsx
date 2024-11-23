'use client';


import React from 'react';

interface FoodCardProps {
  title: string;
  description: string;
  imageSrc: string;
  author: string;
  rating: number;
}

function FoodCard({title, description, imageSrc, author, rating }: FoodCardProps) {
  return (
      <button>
    <div className="w-[250px] h-[350px] mx-auto bg-white border rounded-lg shadow-md overflow-hidden">
      <div className="flex justify-center p-4">
        <div className="w-[180px] h-[180px] bg-gray-300 rounded-lg flex items-center justify-center">
          <img
            src={imageSrc} 
            alt={title}
            className="w-[150px] h-[150px] object-cover rounded border rounded-2xl"
          />
        </div>
      </div>
      <div className="px-4 pb-4">
        <h3 className="text-xl font-bold text-gray-800">{title}</h3>
        <p className="mt-2 text-gray-600 text-sm">{description}</p>
        <div className="mt-4 flex justify-between items-center">
          <span className="text-sm font-medium text-gray-800">{author}</span>
          <div className="flex items-center">
            <span className="text-sm text-gray-600 mr-1">{rating}</span>
            <img
              src={"/star_rate.svg"}
              className="h-5 w-5 text-yellow-500"
            />
          </div>
        </div>
      </div>
    </div>
      </button>
  );
}

export default FoodCard;
