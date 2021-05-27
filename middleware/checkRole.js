import Users from '../models/user.model.js';
import jwt from 'jsonwebtoken';

export const checkAdmin = async (req, res, next) => {
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

export const checkMod = async (req, res, next) => {
    try {
        const bearerHeader = req.headers['authorization'];
        const bearer = bearerHeader.split(' ');
        const bearerToken = bearer[1];
        const token = jwt.decode(bearerToken);
        const user = await Users.findById({ _id: token.id });

        if (user.role === 'mod' || user.role === 'admin') next();
        else throw new Exception('Not mod');
    } catch (e) {
        res.status(403).send({ 'message': 'User does not have the enough privileges' });
    }
}