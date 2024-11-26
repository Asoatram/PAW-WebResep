import connectDB from "@/lib/mongoose";
import { NextResponse } from "next/server";
import Comment from "@/models/Comment";

export async function GET(req: Request) {
    await connectDB(); // Connect to the database
    const { searchParams } = new URL(req.url);
    const param = searchParams.get('recipe_id');

    if (param) {
            try {
                const comments = await Comment.aggregate([
                    {
                        $match: { recipe_id: Number(param) } // Match comments for the specific recipe
                    },
                    {
                        $lookup: {
                            from: 'Users', // Ensure this matches your Users collection name
                            localField: 'user_id',
                            foreignField: 'user_id',
                            as: 'user_info'
                        }
                    },
                    {
                        $unwind: '$user_info'
                    },
                    {
                        $project: {
                            comment_text: 1,
                            username: '$user_info.username',
                            rating: 1,
                            created_at: 1
                        }
                    }
                ]);

                return NextResponse.json(comments, {status: 200}); // Return the aggregated comments
            } catch (error  ) {
                console.error('Error fetching comments:', error);
                return NextResponse.json(error.message);
            }
    } else {
        try {
            const comments = await Comment.find({});
            return NextResponse.json(comments, { status: 200 });
        } catch (error) {
            return NextResponse.json({ error: 'Failed to fetch comments', details: error }, { status: 500 });
        }
    }
}

export async function POST(req: Request){
    await connectDB();
    try{
        const body = await req.json();
        console.log(body)

        const newComment = new Comment(body);
        await newComment.save();
        return NextResponse.json({message: "Comment successfully created"}, {status: 200});
    } catch (e){
        console.error(e);
        return NextResponse.json({"error": e.message}, {status: 500});
    }

}