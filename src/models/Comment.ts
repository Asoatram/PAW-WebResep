import mongoose from "mongoose";

const CommentSchema = new mongoose.Schema({
    comment_id: { type: Number, required: true }, // Unique identifier for the comment
    recipe_id: { type: Number, required: true }, // Recipe ID the comment belongs to
    user_id: { type: Number, required: true }, // User ID who created the comment
    comment_text: { type: String, required: true }, // Text of the comment
    rating: { type: Number, default: 0 }, // Rating (optional, default to 0)
    created_at: { type: Date, default: Date.now }, // Timestamp
});

const Comment = mongoose.models.Comment || mongoose.model("Comment", CommentSchema);

export default Comment;
