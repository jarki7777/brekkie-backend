import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import Users from '../models/user.model.js';

export const authController = {
    login: async (req, res) => {
        try {
            const { email, password } = req.body;
            const getUser = await Users.findOne({ email: email });
            const checkPw = bcrypt.compareSync(password, getUser.password);

            if (!getUser || !checkPw) res.status(400).send({ 'message': 'wrong credentials' });
            
            const getRole = getUser.role;
            const jwtPayload = { id: getUser._id, getRole };
            const token = jwt.sign(jwtPayload, process.env.JWT_SECRET);

            res.status(200).json({ token });
        } catch (e) {
            res.status(401).send({ 'message': 'wrong credentials' });
        }
    }
}