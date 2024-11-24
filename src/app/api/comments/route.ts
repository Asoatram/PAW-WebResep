import connectDB from "@/lib/mongoose";
import {NextResponse} from "next/server";
import Comment from "@/models/Comment";

export async function GET(req: Request) {
    await connectDB(); // Connect to the database
    const { searchParams } = new URL(req.url);
    const param = searchParams.get('recipe_id')

    if(param){
        const comment = await Comment.find({recipe_id : param})
        return NextResponse.json(comment, {status: 200});
    }else {
        try {
            const comment = await Comment.find({});
            return NextResponse.json(comment, {status: 200});
        } catch (error) {
            return NextResponse.json({error: 'Failed to fetch Comment', details: error}, {status: 500});
        }
    }
}
