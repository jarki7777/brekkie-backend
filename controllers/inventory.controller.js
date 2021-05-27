import Inventory from '../models/inventory.model.js';
import jwt from 'jsonwebtoken';
import { getTokenPayload } from '../util/getTokenPayload.js';

export const inventoryController = {
    // make: async (req, res) => {
    //     try {
    //         const bearerToken = getTokenPayload(req.headers['authorization']);
    //     } catch (e) {

    //     }
    // },
    show: async (req, res) => {
        try {
            const payload = getTokenPayload(req.headers['authorization']);
            const inventory = await Inventory.findOne({ user: payload.id }).populate('user', 'username email');
            res.status(200).send(inventory);
        } catch (e) {
            res.status(400).send({ 'Error': e.message });
        }
    }

}