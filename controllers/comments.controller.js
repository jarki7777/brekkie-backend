import Comment from "../models/comment.model.js";
import { getTokenPayload } from "../util/getTokenPayload.js";

export const commentsController = {
    new: async (req, res) => {
        try {
            const tokenPayload = getTokenPayload(req.headers['authorization']);
            const newComment = {
                user: tokenPayload.id,
                recipe: req.body.recipe,
                comment: req.body.comment
            }

            await Comment.create(newComment);
            res.status(201).send({ 'message': 'Comment created' });
        } catch (e) {
            res.status(400).send({ 'Error': e.message });
        }
    }
} 