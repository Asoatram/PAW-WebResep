import mongoose from "mongoose";

const CommentSchema = new mongoose.Schema({
    comment_id: {type: Number, required: true},
    recipe_id: {type: Number, required: true},
    user_id: {type: Number, required: true},
    comment_text : {type: String, required: true},
    rating: {type: Number, required: true},
    created_at: {type: Date, default: Date.now},
    updated_at: {type: Date, default: Date.now},
}, { collection: 'Comment' });

const Comment = mongoose.models.Comment || mongoose.model('Comment', CommentSchema);

export default Comment;