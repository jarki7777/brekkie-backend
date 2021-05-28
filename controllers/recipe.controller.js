import Recipe from '../models/recipe.model.js';

export const recipeController = {
    new: async (req, res) => {
        try {
            const newRecipe = req.body
            await Recipe.create(newRecipe);
            res.status(201).send({ 'message': 'Recipe created' });
        } catch (e) {
            console.log(e);
            res.status(400).send({ 'Error': e.message });
        }
    }
}