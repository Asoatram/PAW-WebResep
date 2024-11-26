import { NextResponse } from 'next/server';
import connectDB from '../../../lib/mongoose';
import User from '../../../models/User';

export async function POST(req) {
    await connectDB();

    try {
        const body = await req.json();
        const { user_id, recipe_id } = body;

        const user = await User.findOne({ user_id });
        if (!user) {
            return NextResponse.json({ message: 'User not found' }, { status: 404 });
        }
        console.log(user)

        if (!Array.isArray(user.savedRecipes)) {

            user.savedRecipes = [];
        }

        if (!user.savedRecipes.includes(parseInt(recipe_id))) {
            console.log('Adding recipe to savedRecipes:', recipe_id);
            await user.savedRecipes.push(parseInt(recipe_id));
            await user.save();
            console.log('User after saving recipe:', user);
            console.log(user_id , recipe_id)

        }

        return NextResponse.json(
            { message: 'Recipe saved successfully', savedRecipes: user.savedRecipes },
            { status: 200 }
        );
    } catch (error) {
        console.error('Error saving recipe:', error);
        return NextResponse.json(
            { message: 'Failed to save recipe', error: error.message },
            { status: 500 }
        );
    }
}


export async function DELETE(req) {
    await connectDB();

    try {
        const body = await req.json();
        const { user_id, recipe_id } = body;

        const user = await User.findOne({ user_id });
        if (!user) {
            return NextResponse.json({ message: 'User not found' }, { status: 404 });
        }

        console.log(user)
        // Validasi dan inisialisasi savedRecipes jika belum ada
        if (!Array.isArray(user.savedRecipes)) {
            user.savedRecipes = [];
        }
        console.log('Removing recipe from savedRecipes:', recipe_id);
        user.savedRecipes = user.savedRecipes.filter(id => id !== recipe_id);
        await user.save();
        console.log('User after removing recipe:', user);
        console.log("user_id ${user_id}, recipe_id ${recipe_id}")

        return NextResponse.json(
            { message: 'Recipe unsaved successfully', savedRecipes: user.savedRecipes },
            { status: 200 }
        );
    } catch (error) {
        console.error('Error unsaving recipe:', error);
        return NextResponse.json(
            { message: 'Failed to unsave recipe', error: error.message },
            { status: 500 }
        );
    }
}

