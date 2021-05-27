import Inventory from '../models/inventory.model.js';
import jwt from 'jsonwebtoken';

export const inventoryController = {
    show: async (req, res) => {
        try {
            const bearerHeader = req.headers['authorization'];
            const bearer = bearerHeader.split(' ');
            const bearerToken = bearer[1];
            const userData = jwt.decode(bearerToken, process.env.JWT_SECRET);
            const userId = userData.id;
            const inventory = await Inventory.findOne({ user: userId }).populate('user', 'username email');
            res.status(200).send(inventory);
        } catch (e) {
            res.status(400).send({ 'Error': e.message });
        }
    }
}