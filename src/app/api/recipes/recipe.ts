// src/pages/api/recipes.js
import connectDB from '../../../lib/mongoose';
import Recipe from '../../../models/Recipe';
import type { NextApiRequest, NextApiResponse } from 'next';

// Make the handler async to use await
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    // Ensure the database connection is established
    await connectDB();

    if (req.method === 'POST') {
        const recipe = new Recipe(req.body);
        try {
            await recipe.save();
            res.status(201).json(recipe);
        } catch (error) {
            res.status(400).json({ error: 'Failed to create recipe', details: error });
        }
    } else if (req.method === 'GET') {
        try {
            const recipes = await Recipe.find({});
            return Response.json(recipes);
        } catch (error) {
            return Response.json({ error: 'Failed to fetch recipes', details: error });
        }
    } else {
        res.setHeader('Allow', ['GET', 'POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}