import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import User from '../models/user.model.js';
import { validatePw } from '../util/validatePw.js';

export const authController = {
    signUp: async (req, res) => {
        try {
            const { username, email, password } = req.body;
            const checkEmailAvailable = await User.findOne({ email });
            const checkUsernameAvailable = await User.findOne({ username });
            const checkPassword = validatePw(password);

            const userData = {
                email: email,
                username: username,
                password: bcrypt.hashSync(password, 10)
            }

            if (checkEmailAvailable) res.status(409).send({ 'message': 'Email already exist' });
            else if (checkUsernameAvailable) res.status(409).send({ 'message': 'Username already exist' });
            else if (!checkPassword) res.status(400).send({ 'message': 'Password does not meet the criteria' });
            else {
                await User.create(userData);
                res.status(201).send({ 'message': 'User created' });
            }
        } catch (e) {
            console.log(e);
            res.status(500).send({ 'Error': e, 'message': 'Service temporarily unavailable' });
        }
    },

    login: async (req, res) => {
        try {
            const { email, password } = req.body;
            const getUser = await User.findOne({ email: email });
            const checkPw = bcrypt.compareSync(password, getUser.password);

            if (!getUser || !checkPw) res.status(404).send({ 'message': 'wrong credentials' });

            const getRole = getUser.role;
            const jwtPayload = { id: getUser._id, getRole };
            const token = jwt.sign(jwtPayload, process.env.JWT_SECRET);

            res.status(200).json({ token });
        } catch (e) {
            res.status(500).send({ 'Error': e, 'message': 'Service temporarily unavailable' });
        }
    }
}