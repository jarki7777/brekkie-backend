import FoodLog from '../models/foodLog.model.js';
import User from '../models/user.model.js'
import { getTokenPayload } from "../util/getTokenPayload.js";
import { formatDate } from '../util/formatDate.js';

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
            );

            // Push the new food log into user
            await User.updateOne({ _id: tokenPayload.id }, { $addToSet: { foodLogs: newFoodLog._id } });

            res.sendStatus(202);
        } catch (e) {
            res.status(400).send({ 'Error': e.message });
        }
    },
}