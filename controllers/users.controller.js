import Inventory from '../models/inventory.model.js';
import ShoppingList from '../models/shoppinglist.model.js';
import Favorite from '../models/favorite.model.js'
import FoodLog from '../models/foodLog.model.js';
import Comment from '../models/comment.model.js';
import User from '../models/user.model.js';
import { getTokenPayload } from '../util/getTokenPayload.js';
import bcrypt from 'bcrypt';

export const userController = {
    index: async (req, res) => {
        try {
            const email = req.query.email
            const page = parseInt(req.query.page);
            const limit = parseInt(req.query.limit);
            const userList = await User.paginate({
                $or: [
                    { email: { $regex: email, $options: 'm' } },
                    { email: { $regex: email, $options: 'i' } },
                    { email: { $regex: email, $options: 'x' } },
                    { email: { $regex: email, $options: 's' } }
                ]
            }, { page: page, limit: limit });
            res.status(200).send(userList);
        } catch (e) {
            res.status(400).send({ 'Error': e.message });
        }
    },
    show: async (req, res) => {
        try {
            const id = req.params.id;
            const user = await User.findById({ _id: id });
            res.status(200).send({ user });
        } catch (e) {
            res.status(400).send({ 'Error': e.message });
        }
    },
    profile: async (req, res) => {
        try {
            const tokenPayload = getTokenPayload(req.headers['authorization']);
            const user = await User.findById({ _id: tokenPayload.id })
            .populate('favorites inventory shoppingList', 'recipes');
            res.status(200).send(user);
        } catch (e) {
            res.status(400).send({ 'Error': e.message });
        }
    },
    update: async (req, res) => {
        try {
            const tokenPayload = getTokenPayload(req.headers['authorization']);

            const payload = {
                username: req.body.username,
                email: req.body.email,
                password: bcrypt.hashSync(req.body.password, 10),
                role: req.body.role,
                caloriesGoal: req.body.caloriesGoal,
                inventory: req.body.inventory,
                shoppingList: req.body.shoppingList,
                favorites: req.body.favorites
            }

            // Updates multiple fields, only update the fields for which query parameter isn't undefined
            Object.keys(payload).forEach(key => payload[key] === undefined ? delete payload[key] : {});

            await User.updateOne({ _id: tokenPayload.id }, { $set: payload });
            res.sendStatus(202);
        } catch (e) {
            res.status(400).send({ 'Error': e.message });
        }
    },
    delete: async (req, res) => {
        try {
            // Delete all documents which contain the user ObjectId
            const id = req.params.id;
            await Inventory.findOneAndDelete({ user: id });
            await ShoppingList.findOneAndDelete({ user: id });
            await Favorite.findOneAndDelete({ user: id });
            await FoodLog.deleteMany({ user: id });
            await Comment.deleteMany({ user: id });
            await User.findByIdAndDelete({ _id: id });
            res.sendStatus(204);
        } catch (e) {
            res.status(400).send({ 'Error': e.message });
        }
    }
}