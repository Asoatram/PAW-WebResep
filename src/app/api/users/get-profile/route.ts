import User from "@/models/User";
import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongoose";

export async function GET(request: Request) {
  await connectToDatabase();

  const { searchParams } = new URL(request.url);
  const id = searchParams.get("user_id");

  if (!id) {
    return NextResponse.json({ error: "Missing user ID" }, { status: 400 });
  }

  const user = await User.findOne({ user_id: id });
  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  return NextResponse.json({
    username: user.username,
    description: user.description,
    profilePicture: user.profilePicture,
  });
}
