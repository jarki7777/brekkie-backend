import Favorite from '../models/favorite.model.js';
import Recipe from '../models/recipe.model.js';
import { getTokenPayload } from "../util/getTokenPayload.js";

export const favoritesController = {
    add: async (req, res) => {
        try {
            const tokenPayload = getTokenPayload(req.headers['authorization']);
            const id = tokenPayload.id;
            const recipe = req.params.id

            // Increase the timesFavorite recipe field
            await Recipe.updateOne({ _id: recipe }, { $inc: { timesFavorite: 1 } });

            // Push recipe into user favorite document
            await Favorite.updateOne({ user: id }, { $addToSet: { recipes: recipe } });

            res.sendStatus(202);
        } catch (e) {
            res.status(400).send({ 'Error': e.message });
        }
    },
    show: async (req, res) => {
        try {
            const tokenPayload = getTokenPayload(req.headers['authorization']);

            const favorites = await Favorite.findOne({ user: tokenPayload.id }).populate('recipes', 'title img');

            res.status(200).send(favorites);
        } catch (e) {
            res.status(400).send({ 'Error': e.message });
        }
    },
    remove: async (req, res) => {
        try {
            const tokenPayload = getTokenPayload(req.headers['authorization']);
            const recipe = req.params.id

            await Favorite.updateOne({ user: tokenPayload.id }, { $pull: { recipes: recipe } });

            res.sendStatus(202);
        } catch (e) {
            res.status(400).send({ 'Error': e.message });
        }
    }
}