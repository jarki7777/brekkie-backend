import ShoppingList from '../models/shoppinglist.model.js';
import { getTokenPayload } from '../util/getTokenPayload.js';

export const shoppingListController = {
    show: async (req, res) => {
        try {
            const payload = getTokenPayload(req.headers['authorization']);
            const inventory = await ShoppingList.findOne({ user: payload.id }).populate('user', 'username email');
            res.status(200).send(inventory);
        } catch (e) {
            res.status(400).send({ 'Error': e.message });
        }
    },
    add: async (req, res) => {
        try {
            const payload = getTokenPayload(req.headers['authorization']);
            const ingredients = req.body.ingredients;
            await ShoppingList.updateOne({ user: payload.id }, { $addToSet: { ingredients: ingredients } });
            res.sendStatus(202);
        } catch (e) {
            res.status(400).send({ 'Error': e.message });
        }
    },
    remove: async (req, res) => {
        try {
            const payload = getTokenPayload(req.headers['authorization']);
            const ingredients = req.body.ingredients;
            await ShoppingList.updateOne({ user: payload.id }, { $pullAll: { ingredients: ingredients } });
            res.sendStatus(202);
        } catch (e) {
            res.status(400).send({ 'Error': e.message });
        }
    },
    empty: async (req, res) => {
        try {
            const payload = getTokenPayload(req.headers['authorization']);
            await ShoppingList.updateOne({ user: payload.id }, { $set: { ingredients: [] } });
            res.sendStatus(202);
        } catch (e) {
            res.status(400).send({ 'Error': e.message });
        }
    }
}