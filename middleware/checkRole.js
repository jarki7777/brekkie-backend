import Users from '../models/user.model.js';
import jwt from 'jsonwebtoken';

export const checkRole = async (req, res, next) => {
    try {
        const bearerHeader = req.headers['authorization'];
        const bearer = bearerHeader.split(' ');
        const bearerToken = bearer[1];
        const token = jwt.decode(bearerToken);
        const user = await Users.findById({ _id: token.id });

        if (user.role === 'admin') next();
        else throw new Exception('Not admin');
    } catch (e) {
        res.status(403).send({ 'message': 'User does not have the admin privileges' });
    }
}