import FoodLog from '../models/foodLog.model.js';
import User from '../models/user.model.js';
import Recipe from '../models/recipe.model.js';
import { getTokenPayload } from "../util/getTokenPayload.js";
import { formatDate } from '../util/formatDate.js';
import { calculateTotalCalories } from '../util/calculateTotalCalories.js';
import { calculateTotalNutrients } from '../util/calculateTotalNutrients.js';
import { getRecipeNutrientValues } from '../util/getRecipeNutrientValues.js';

export const foodLogsController = {
    add: async (req, res) => {
        try {
            const tokenPayload = getTokenPayload(req.headers['authorization']);

            let day = new Date();
            day = formatDate(day);

            // Create daily Food log or update if exist
            const newFoodLog = await FoodLog.findOneAndUpdate(
                {
                    $and: [
                        { user: tokenPayload.id },
                        { day: day }
                    ]
                },
                { user: tokenPayload.id, day: day, $addToSet: { recipes: req.params.id } },
                { upsert: true, new: true }
            ).populate('recipes', 'nutritionalInfo caloriesPerServe').lean();

            const totalCalories = calculateTotalCalories(newFoodLog.recipes);
            const totalNutrients = calculateTotalNutrients(newFoodLog.recipes);

            // Update daily total calories and nutrients ingest
            await FoodLog.findByIdAndUpdate(
                { _id: newFoodLog._id },
                { totalCalories: totalCalories, totalNutrients: totalNutrients }
            );

            // Push the new food log into user
            await User.updateOne({ _id: tokenPayload.id }, { $addToSet: { foodLogs: newFoodLog._id } });

            res.sendStatus(202);
        } catch (e) {
            res.status(400).send({ 'Error': e.message });
        }
    },
    index: async (req, res) => {
        try {
            const tokenPayload = getTokenPayload(req.headers['authorization']);
            const page = parseInt(req.query.page);
            const limit = parseInt(req.query.limit);

            const userFoodLogs = await FoodLog.paginate(
                { user: tokenPayload.id },
                {
                    page: page, limit: limit, populate: {
                        'path': 'user recipes',
                        select: 'title img timesFavorite calification totalVotes caloriesPerServe'
                    }
                }
            );

            res.status(200).send(userFoodLogs);
        } catch (e) {
            res.status(400).send({ 'Error': e.message });
        }
    },
    showByDay: async (req, res) => {
        try {
            const tokenPayload = getTokenPayload(req.headers['authorization']);
            
            const userFoodLog = await FoodLog.findOne(
                {
                    user: tokenPayload.id,
                    day:
                        {
                            $gte: new Date(new Date(req.query.date).setHours(0, 0, 0)),
                            $lt: new Date(new Date(req.query.date).setHours(23, 59, 59))
                        }
                }
            ).populate('recipes', 'title img timesFavorite calification totalVotes caloriesPerServe').lean();

            console.log("userFoodLog: " + userFoodLog);
            res.status(200).send(userFoodLog);
        } catch (e) {
            res.status(400).send({ 'Error': e.message }); 

        }
    },
    addServing: async (req, res) => {
        try {
            const tokenPayload = getTokenPayload(req.headers['authorization']);
            const recipeId = req.params.id;
            let day = req.params.day;
            day = formatDate(day);

            const recipe = await Recipe.findById({ _id: recipeId }).lean();
            const recipeCaloriesPerServe = recipe.caloriesPerServe;
            const recipeNutritionalInfo = recipe.nutritionalInfo;
            getRecipeNutrientValues(recipeNutritionalInfo);

            console.log(recipeNutritionalInfo);

            await FoodLog.updateOne(
                {
                    $and: [
                        { user: tokenPayload.id },
                        { day: day }
                    ]
                },
                {
                    $inc: {
                        totalCalories: recipeCaloriesPerServe,
                        "totalNutrients.totalFat": recipeNutritionalInfo.fat,
                        "totalNutrients.totalSaturatedFat": recipeNutritionalInfo.saturatedFat,
                        "totalNutrients.totalSodium": recipeNutritionalInfo.sodium,
                        "totalNutrients.totalCarbs": recipeNutritionalInfo.carbs,
                        "totalNutrients.totalFiber": recipeNutritionalInfo.fiber,
                        "totalNutrients.totalSugar": recipeNutritionalInfo.sugar,
                        "totalNutrients.totalProteins": recipeNutritionalInfo.protein,
                    }
                }
            );

            res.sendStatus(202);
        } catch (e) {
            res.status(400).send({ 'Error': e.message });
        }
    },
    showByDateRange: async (req, res) => {
        try {
            const tokenPayload = getTokenPayload(req.headers['authorization']);
            const userFoodLog = await FoodLog.find({
                $and:
                    [
                        { user: tokenPayload.id },
                        {
                            day:
                            {
                                $gte: new Date(new Date(req.query.from).setHours(0, 0, 0)),
                                $lt: new Date(new Date(req.query.to).setHours(23, 59, 59))
                            }
                        }

                    ]
            });

            res.status(200).send(userFoodLog);
        } catch (e) {
            res.status(400).send({ 'Error': e.message });
        }
    }
}