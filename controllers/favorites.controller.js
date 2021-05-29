import Favorite from '../models/favorite.model.js';
import Recipe from '../models/recipe.model.js';
import { getTokenPayload } from "../util/getTokenPayload.js";

export const favoritesController = {
    new: async (req, res) => {
        try {
            const tokenPayload = getTokenPayload(req.headers['authorization']);
            const id = tokenPayload.id;
            const recipe = req.params.id

            // Increase the timesFavorite recipe field
            // await Recipe.updateOne({ _id: recipe }, { $inc: { timesFavorite: 1 } });
            
            await Favorite.updateOne({ user: id }, { $push: { recipes: recipe } });
            
            // res.status(201).send({ 'message': 'Favorite created' });
        } catch (e) {
            res.status(400).send({ 'Error': e.message });
        }
    },
}