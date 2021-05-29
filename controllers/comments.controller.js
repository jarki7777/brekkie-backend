import Comment from "../models/comment.model.js";
import Recipe from '../models/recipe.model.js';
import { getTokenPayload } from "../util/getTokenPayload.js";

export const commentsController = {
    new: async (req, res) => {
        try {
            const tokenPayload = getTokenPayload(req.headers['authorization']);
            const comment = {
                user: tokenPayload.id,
                recipe: req.params.id,
                comment: req.body.comment
            }

            const newComment = await Comment.create(comment);

            // Push the comment into recipe
            await Recipe.updateOne({ _id: req.params.id }, { $push: { comments: newComment._id } })

            res.sendStatus(201);
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
                { page: page, limit: limit, populate: { 'path': 'user recipe', select: 'username title' } }
            );

            res.status(200).send(recipeComments);
        } catch (e) {
            res.status(400).send({ 'Error': e.message });
        }
    },
    delete: async (req, res) => {
        try {
            const id = req.params.id;
            await Comment.findByIdAndDelete({ _id: id });
            res.sendStatus(204);
        } catch (e) {
            res.status(400).send({ 'Error': e.message });
        }
    }
}