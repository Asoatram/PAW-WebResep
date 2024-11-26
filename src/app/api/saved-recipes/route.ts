import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongoose';
import User from '@/models/User';
import Recipe from '@/models/Recipe';

export async function GET(req) {
    await connectDB();

    try {
        const { searchParams } = new URL(req.url);
        const user_id = searchParams.get('user_id');

        if (!user_id) {
            return NextResponse.json({ message: 'User ID is required' }, { status: 400 });
        }

        // Cari user berdasarkan user_id
        const user = await User.findOne({ user_id });
        if (!user) {
            return NextResponse.json({ message: 'User not found' }, { status: 404 });
        }

        // Ambil resep berdasarkan array savedRecipes
        const recipes = await Recipe.find({ recipe_id: { $in: user.savedRecipes } });
        return NextResponse.json(recipes, { status: 200 });
    } catch (error) {
        console.error('Error fetching saved recipes:', error);
        return NextResponse.json({ message: 'Failed to fetch saved recipes', error: error.message }, { status: 500 });
    }
}
