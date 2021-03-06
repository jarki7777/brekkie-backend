import Inventory from '../models/inventory.model.js';
import { getTokenPayload } from '../util/getTokenPayload.js';

export const inventoryController = {
    show: async (req, res) => {
        try {
            const tokenPayload = getTokenPayload(req.headers['authorization']);
            const inventory = await Inventory.findOne({ user: tokenPayload.id }).populate('user', 'username email');
            res.status(200).send(inventory);
        } catch (e) {
            res.status(400).send({ 'Error': e.message });
        }
    },
    add: async (req, res) => {
        try {
            const tokenPayload = getTokenPayload(req.headers['authorization']);
            const ingredients = req.body.ingredients;
            await Inventory.updateOne({ user: tokenPayload.id }, { $addToSet: { ingredients: ingredients } });
            res.sendStatus(202);
        } catch (e) {
            res.status(400).send({ 'Error': e.message });
        }
    },
    remove: async (req, res) => {
        try {
            const tokenPayload = getTokenPayload(req.headers['authorization']);
            const ingredients = req.body.ingredients;
            await Inventory.updateOne({ user: tokenPayload.id }, { $pullAll: { ingredients: ingredients } });
            res.sendStatus(202);
        } catch (e) {
            res.status(400).send({ 'Error': e.message });
        }
    },
    empty: async (req, res) => {
        try {
            const tokenPayload = getTokenPayload(req.headers['authorization']);
            await Inventory.updateOne({ user: tokenPayload.id }, { $set: { ingredients: [] } });
            res.sendStatus(202);
        } catch (e) {
            res.status(400).send({ 'Error': e.message });
        }
    }
}