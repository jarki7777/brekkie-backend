import FoodLog from '../models/foodLog.model.js';
import User from '../models/user.model.js'
import { getTokenPayload } from "../util/getTokenPayload.js";
import { formatDate } from '../util/formatDate.js';
import { calculateTotalCalories } from '../util/calculateTotalCalories.js';
import { calculateTotalNutrients } from '../util/calculateTotalNutrients.js';

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
                        select: 'username title img'
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
                    $and: [
                        { user: tokenPayload.id },
                        { day: req.query.date }
                    ]
                }
            ).populate('recipes', 'title img');

            res.status(200).send(userFoodLog);
        } catch (e) {
            res.status(400).send({ 'Error': e.message });
        }
    },
    addServing: async (req, res) => {
        try {
            const tokenPayload = getTokenPayload(req.headers['authorization']);
            let day = new Date();
            day = formatDate(day);

            await FoodLog.updateOne(
                {
                    $and: [
                        { user: tokenPayload.id },
                        { day: day }
                    ]
                },
                { $inc: { totalCalories: req.query.calories } }
            );

            res.sendStatus(202);
        } catch (e) {
            res.status(400).send({ 'Error': e.message });
        }
    }
}