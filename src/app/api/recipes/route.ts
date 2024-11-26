// app/api/recipes/route.ts
import Recipe from "@/models/Recipe";
import connectDB from "@/lib/mongoose";
import { NextResponse } from "next/server";

// GET method
export async function GET(req: Request) {
    await connectDB(); // Connect to the database
    const { searchParams } = new URL(req.url);
    const param = searchParams.get('id')
    const tag = searchParams.get('tag')
    const search = searchParams.get('search')
    const profile = searchParams.get('profile')

    if(profile){
        console.log(profile)
        const recipes = await Recipe.find({user_id : parseInt(profile)})
        return NextResponse.json(recipes, {status: 200})
    }

    if (search) {
        const recipes = await Recipe.find({
            title: { $regex: new RegExp(search, 'i') } // 'i' for case-insensitive search
        });
        return NextResponse.json(recipes, { status: 200 });
    }

    if(tag){
        const recipes = await Recipe.find({tags: tag})
        return NextResponse.json(recipes, {status: 200})
    }

    if(param){
     const recipes = await Recipe.find({_id : param})
     return NextResponse.json(recipes, {status: 200});
    }else {
        try {
            const recipes = await Recipe.find({});
            return NextResponse.json(recipes, {status: 200});
        } catch (error) {
            return NextResponse.json({error: 'Failed to fetch recipes', details: error}, {status: 500});
        }
    }
}

// POST method
export async function POST(req: Request) {
    await connectDB(); // Ensure you connect to the database on POST as well
    const userData = await req.json(); // Read the JSON from the request

    // Ensure the user data has all the required fields or default them
    const {
        user_id,
        title,
        description,
        prep_time,
        cook_time,
        difficulty,
        image_url = "https://www.foodiesfeed.com/wp-content/uploads/2023/06/burger-with-melted-cheese.jpg", // default image if not provided
        ingredients,
        instructions,
        tags = ["Food"], // default tags
        nutrition = { calories: 0, protein: 0, carbohydrates: 0, fat: 0 }, // default nutrition if not provided
        servings = 1, // default servings if not provided
    } = userData;

    try {
        // Ensure recipe_id is not included in the user data (let the schema handle it)
        const newRecipe = new Recipe({
            user_id,
            title,
            description,
            prep_time,
            cook_time,
            difficulty,
            image_url,
            ingredients,
            instructions,
            tags,
            nutrition,
            servings,
        });

        await newRecipe.save();
        return NextResponse.json({ message: "Recipe created successfully!" }, { status: 201 });

    } catch (error) {
        console.error(error); // Add error logging to help diagnose any further issues
        return NextResponse.json({ error: 'Failed to create recipe', details: error }, { status: 500 });
    }
}
