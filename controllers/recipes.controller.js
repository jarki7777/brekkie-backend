import Comment from '../models/comment.model.js';
import Favorite from '../models/favorite.model.js';
import FoodLog from '../models/foodLog.model.js';
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

            const tokenPayload = getTokenPayload(req.headers['authorization']);
            const userInventory = await Inventory.findOne({ user: tokenPayload.id }).lean();
            let inventory = userInventory.ingredients;
            let inventoryStr = inventory.join("|");

            // Using query $expr aggregation operator to find all recipes which inventory array intersects with the recipe ingredient array
            const recipes = await Recipe.paginate(
                {
                    $expr: {
                        $eq: [
                            {
                                $size: {
                                    $filter: {
                                        input: "$ingredients",
                                        cond: {
                                            $regexMatch: {
                                                input: "$$this",
                                                regex: inventoryStr,
                                                options: "i"
                                            }
                                        }
                                    }
                                }
                            },
                            { $size: "$ingredients" }
                        ]
                    }
                },
                { page: page, limit: limit }
            )

            res.status(200).send(recipes);
        } catch (e) {
            res.status(400).send({ 'Error': e.message });
        }
    },
    update: async (req, res) => {
        try {
            const id = req.params.id;

            const payload = {
                title: req.body.title,
                img: req.body.img,
                prepTime: req.body.prepTime,
                cookTime: req.body.cookTime,
                totalTime: req.body.totalTime,
                category: req.body.category,
                method: req.body.method,
                cuisine: req.body.cuisine,
                description: req.body.description,
                ingredients: req.body.ingredients,
                instructions: req.body.instructions,
                notes: req.body.notes,
                serves: req.body.serves,
                caloriesPerServe: req.body.caloriesPerServe,
                nutritionalInfo: req.body.nutritionalInfo,
                timesFavorite: req.body.timesFavorite,
                oneStarVotes: req.body.oneStarVotes,
                twoStarVotes: req.body.twoStarVotes,
                threeStarVotes: req.body.threeStarVotes,
                fourStarVotes: req.body.fourStarVotes,
                fiveStarVotes: req.body.fiveStarVotes,
                totalVotes: req.body.totalVotes,
                calification: req.body.calification,
                comments: req.body.comments
            }

            // Updates multiple fields, only update the fields for which query parameter isn't undefined
            Object.keys(payload).forEach(key => payload[key] === undefined ? delete payload[key] : {});

            await Recipe.updateOne({ _id: id }, { $set: payload });
            res.sendStatus(202);
        } catch (e) {
            res.status(400).send({ 'Error': e.message });
        }
    },
    delete: async (req, res) => {
        try {
            // Pull all elements from all documents arrays which contain the recipe ObjectId and delete all recipe comments
            const id = req.params.id;
            await Favorite.updateMany({ recipes: id }, { $pull: { recipes: id } });
            await FoodLog.updateMany({ recipes: id }, { $pull: { recipes: id } });
            await Comment.deleteMany({ recipe: id });
            await Recipe.findByIdAndDelete({ _id: id });
            res.sendStatus(204);
        } catch (e) {
            res.status(400).send({ 'Error': e.message });
        }
    }
}