import Comment from "../models/comment.model.js";
import { getTokenPayload } from "../util/getTokenPayload.js";

export const commentsController = {
    new: async (req, res) => {
        try {
            const tokenPayload = getTokenPayload(req.headers['authorization']);
            const newComment = {
                user: tokenPayload.id,
                recipe: req.params.id,
                comment: req.body.comment
            }

            await Comment.create(newComment);
            res.status(201).send({ 'message': 'Comment created' });
        } catch (e) {
            res.status(400).send({ 'Error': e.message });
        }
    },
    showByRecipe: async (req, res) => {
        try {
            const page = parseInt(req.query.page);
            const limit = parseInt(req.query.limit);

            const recipeComments = await Comment.paginate(
                { recipe: req.params.id },
                { page: page, limit: limit }
            );

            res.status(200).send(recipeComments);
        } catch (e) {
            res.status(400).send({ 'Error': e.message });
        }
    }
}