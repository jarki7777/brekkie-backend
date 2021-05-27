import mongoose from 'mongoose';

const CommentSchema = new mongoose.Schema({
    user: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true
    },
    recipe: {
        type: mongoose.Types.ObjectId,
        ref: 'Recipe',
        required: true,
    },
    comment: {
        type: String,
        required: true,
        validate: {
            validator: function (v) {
                return /^.{1,255}$/.test(v);
            },
            message: 'comment must be between 1 and 255 chars'
        }
    }
});

const Comment = mongoose.model('Comment', CommentSchema, 'comments');

export default Comment;