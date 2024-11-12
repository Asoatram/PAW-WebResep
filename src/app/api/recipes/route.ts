// app/api/recipes/route.ts
import Recipe from "@/models/Recipe";
import connectDB from "@/lib/mongoose";
import { NextResponse } from "next/server";

// GET method
export async function GET() {
    await connectDB(); // Connect to the database

    try {
        const recipes = await Recipe.find({});
        return NextResponse.json(recipes, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch recipes', details: error }, { status: 500 });
    }
}

// POST method
export async function POST(req: Request) {
    await connectDB(); // Ensure you connect to the database on POST as well
    const userData = await req.json(); // Read the JSON from the request

    try {
        const newRecipe = new Recipe(userData);
        await newRecipe.save();
        return NextResponse.json({ userData, message: "Recipe created successfully!" }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to create recipe', details: error }, { status: 500 });
    }
}
