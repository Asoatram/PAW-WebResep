import React, { useState } from 'react';

const CommentBox = ({ comments, onCommentSubmit }) => {
    const [newComment, setNewComment] = useState(''); // State for new comment input



    const handleCommentSubmit = (e) => {
        e.preventDefault();
        if (newComment.trim()) {
            onCommentSubmit(newComment); // Call the parent function to submit the comment
            setNewComment(''); // Clear the input field
        }
    };

    return (
        <div className="mt-6">
            <h3 className="text-xl font-semibold">Comments</h3>
            <form onSubmit={handleCommentSubmit} className="mb-4">
                <textarea
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Add a comment..."
                    className="w-full h-24 p-2 border border-gray-300 rounded mb-2"
                />
                <button type="submit" className="bg-green-400 hover:bg-green-600 text-white px-4 py-2 rounded">
                    Submit
                </button>
            </form>
            <div className="space-y-4">
                {comments.length > 0 ? (
                    comments.map((comment, index) => (
                        <div key={index} className="flex items-start p-4 border border-gray-300 rounded-lg">
                            <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center mr-4">
                                {/* Placeholder for user avatar */}
                                <span className="text-gray-600">U</span>
                            </div>
                            <div>
                                <div className="font-bold">{comment.username}</div>
                                <div>{comment.comment_text}</div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div>No comments yet.</div>
                )}
            </div>
        </div>
    );
};

export default CommentBox;
