import Inventory from '../models/inventory.model.js';
import Recipe from '../models/recipe.model.js';
import { getTokenPayload } from '../util/getTokenPayload.js';

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
            const page = parseInt(req.query.page);
            const limit = parseInt(req.query.limit);
            const recipeList = await Recipe.paginate({}, { page: page, limit: limit });
            res.status(200).send(recipeList);
        } catch (e) {
            res.status(400).send({ 'Error': e.message });
        }
    },
    find: async (req, res) => {
        try {
            const page = parseInt(req.query.page);
            const limit = parseInt(req.query.limit);
            const keyword = req.query.keyword;

            // Find all recipes which contain the keyword in multiple fields 
            const recipes = await Recipe.paginate(
                {
                    $or: [
                        { title: { $regex: keyword, $options: 'i' } },
                        { category: { $regex: keyword, $options: 'i' } },
                        { method: { $regex: keyword, $options: 'i' } },
                        { cuisine: { $regex: keyword, $options: 'i' } },
                        { description: { $regex: keyword, $options: 'i' } }
                    ]
                },
                { page: page, limit: limit }
            );

            res.status(200).send(recipes);
        } catch (e) {
            res.status(400).send({ 'Error': e.message });
        }
    },
    findWithUserIngredients: async (req, res) => {
        try {
            const page = parseInt(req.query.page);
            const limit = parseInt(req.query.limit);
            const category = req.query.category;
            const method = req.query.method;

            const tokenPayload = getTokenPayload(req.headers['authorization']);
            const userInventory = await Inventory.findOne({ user: tokenPayload.id }).lean();
            let inventory = userInventory.ingredients;
            inventory = inventory.map((i) => new RegExp(i, "i"));

            const recipes = await Recipe.paginate(
                {
                    $and: [
                        { category: category },
                        { method: method },
                        { ingredients: { $all: inventory } }
                    ]
                },
                { page: page, limit: limit }
            );

            res.status(200).send(recipes);
        } catch (e) {
            res.status(400).send({ 'Error': e.message });
        }
    }
}
