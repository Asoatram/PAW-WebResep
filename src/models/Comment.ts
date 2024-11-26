import mongoose from "mongoose";

const CommentSchema = new mongoose.Schema({
    comment_id: {type: Number, required: true},
    recipe_id: {type: Number, required: true},
    user_id: {type: Number, required: true},
    comment_text : {type: String, required: true},
    rating: {type: Number, required: true, default: 5},
    created_at: {type: Date, default: Date.now},
    updated_at: {type: Date, default: Date.now},
}, { collection: 'Comment' });

CommentSchema.pre('save', async function(next) {
    if (this.isNew) { // Only assign comment_id for new comments
        try {
            const maxComment = await this.constructor.findOne().sort({ comment_id: -1 });
            this.comment_id = maxComment ? maxComment.comment_id + 1 : 1; // Start from 1 if no comments exist
        } catch (error: Error) {
            return next(error.message); // Pass the error to the next middleware
        }
    }
    next();
});

const Comment = mongoose.models.Comment || mongoose.model('Comment', CommentSchema);

export default Comment;