import Recipe from '../models/recipe.model.js';

export const recipeController = {
    new: async (req, res) => {
        try {
            const newRecipe = req.body
            await Recipe.create(newRecipe);
            res.status(201).send({ 'message': 'Recipe created' });
        } catch (e) {
            res.status(400).send({ 'Error': e.message });
        }
    },
    index: async (req, res) => {
        try {
            const skip = parseInt(req.query.skip);
            const limit = parseInt(req.query.limit);
            const recipeList = await Recipe.find().select().skip(skip).limit(limit);
            const count = Math.ceil(await Recipe.estimatedDocumentCount(recipeList) / 10);
            res.status(200).send({ pages: count, recipes: recipeList });
        } catch (e) {
            res.status(400).send({ 'Error': e.message });
        }
    }
}