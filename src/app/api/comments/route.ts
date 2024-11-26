import connectDB from "@/lib/mongoose";
import { NextResponse } from "next/server";
import Comment from "@/models/Comment";

// Connect to the database


// GET handler: Fetch comments
export async function GET(req: Request) {
    await connectDB();

    const { searchParams } = new URL(req.url);
    const recipeIdParam = searchParams.get("recipe_id");

    try {
        if (recipeIdParam) {
            const recipeId = Number(recipeIdParam);
            if (isNaN(recipeId)) {
                return NextResponse.json(
                    { error: "Invalid recipe_id" },
                    { status: 400 }
                );
            }

            // Fetch comments for a specific recipe
            const comments = await Comment.aggregate([
                {
                    $match: { recipe_id: recipeId },
                },
                {
                    $lookup: {
                        from: "Users",
                        localField: "user_id",
                        foreignField: "user_id",
                        as: "user_info",
                    },
                },
                {
                    $unwind: "$user_info",
                },
                {
                    $project: {
                        comment_text: 1,
                        username: "$user_info.username",
                        rating: 1,
                        created_at: 1,
                    },
                },
            ]);

            return NextResponse.json(comments, { status: 200 });
        }
    } catch (error) {
        if(error instanceof Error) {
            console.error("Error fetching comments:", error.message, error.stack);
            return NextResponse.json(
                {error: "Failed to fetch comments", details: error.message},
                {status: 500}
            );
        } else {
            return NextResponse.json(
                {error: "Unknown Error"},
                { status: 500 }
            )
        }
    }
}

// POST handler: Create a new comment
export async function POST(req: Request) {
    await connectDB();

    try {
        const body = await req.json();
        console.log("Received request body:", body);

        const {recipe_id, user_id, comment_text, rating} = body;

        // Validate required fields
        if (!recipe_id || !user_id || !comment_text) {
            console.error("Missing required fields:", {recipe_id, user_id, comment_text});
            return NextResponse.json(
                {
                    error: "recipe_id, user_id, and comment_text are required",
                },
                {status: 400}
            );
        }

        // Create a new comment
        const newComment = new Comment({
            comment_id: Date.now(), // Generate a unique ID for the comment
            recipe_id,
            user_id,
            comment_text,
            rating: rating || 0, // Default rating to 0 if not provided
            created_at: new Date(),
        });

        console.log("Saving comment:", newComment);

        await newComment.save();

        return NextResponse.json({message: "Comment successfully created"}, {status: 200});
    } catch (e) {
        if (e instanceof Error) {
            console.error(e);
            return NextResponse.json({"error": e.message}, {status: 500});
        } else {
            console.error("Unknown Error occured")
            return NextResponse.json({"error": "Failed to fetch recipes"}, {status: 500});
        }
    }
}
