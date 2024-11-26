// src/pages/api/recipes.js
import connectDB from '../../../lib/mongoose';
import Recipe from '../../../models/Recipe';
import User from '../../../models/User';
import type { NextApiRequest, NextApiResponse } from 'next';
import {parseIngredients} from "@/app/api/utils/recipe.utils";

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
    } else if (req.method === 'DELETE') {
        const { user_id, recipe_id } = req.body;

        try {
            const user = await User.findOne({ user_id });
            if (!user) return res.status(404).json({ message: 'User not found' });

            user.savedRecipes = user.savedRecipes.filter(id => id !== recipe_id);
            await user.save();

            res.status(200).json({ message: 'Recipe unsaved successfully', savedRecipes: user.savedRecipes });
        } catch (error) {
            console.error('Error unsaving recipe:', error);
            res.status(500).json({ message: 'Failed to unsave recipe' });
        }
    } else {
        res.setHeader('Allow', ['GET', 'POST', 'DELETE']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}