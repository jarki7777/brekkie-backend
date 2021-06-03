import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { validatePw } from '../util/validatePw.js';
import User from '../models/user.model.js';
import Inventory from '../models/inventory.model.js';
import ShoppingList from '../models/shoppinglist.model.js';
import Favorite from '../models/favorite.model.js';

export const authController = {
    signUp: async (req, res) => {
        try {
            const { username, email, password } = req.body;
            const emailNotAvailable = await User.findOne({ email });
            const usernameNotAvailable = await User.findOne({ username });
            const checkPw = validatePw(password);

            if (usernameNotAvailable) res.status(409).send({ 'message': 'Username already exist' });
            else if (emailNotAvailable) res.status(409).send({ 'message': 'Email already exist' });
            else if (!checkPw) res.status(409).send({ 'message': 'Password does not meet the criteria' });

            const userData = {
                email: email,
                username: username,
                password: bcrypt.hashSync(password, 10)
            }

            if (!emailNotAvailable, !usernameNotAvailable, checkPw) {
                const newUser = await User.create(userData);
                const inventory = await Inventory.create({ user: newUser._id, ingredients: [] });
                const shoppingList = await ShoppingList.create({ user: newUser._id, ingredients: [] });
                const favorites = await Favorite.create({ user: newUser._id, recipes: [] });

                const payload = { inventory, shoppingList, favorites }
                await User.updateOne({ _id: newUser._id }, { $set: payload })
                res.sendStatus(201);
            }
        } catch (e) {
            res.status(400).send({ 'Error': e.message });
        }
    },
    login: async (req, res) => {
        try {
            const { email, password } = req.body;

            const getUser = await User.findOne({ email: email });
            let checkPw;

            if (!getUser) {
                res.status(404).send({ 'message': 'wrong credentials' });
                return
            } else {
                checkPw = bcrypt.compareSync(password, getUser.password);
            }
            if (!checkPw) {
                res.status(404).send({ 'message': 'wrong credentials' });
                return
            } else {
                const getRole = getUser.role;
                const jwtPayload = { id: getUser._id, getRole };
                const token = jwt.sign(jwtPayload, process.env.JWT_SECRET, { expiresIn: '7d' });
                res.status(200).json({ token, role: getUser.role  });
            }
        } catch (e) {
            res.status(400).send({ 'Error': e.message, 'message': 'All fields are required' });
        }
    }
}