import Users from '../models/user.model.js';
import { getTokenPayload } from '../util/getTokenPayload.js';

export const checkAdmin = async (req, res, next) => {
    try {
        const tokenPayload = getTokenPayload(req.headers['authorization']);
        const user = await Users.findById({ _id: tokenPayload.id });

        if (user.role === 'admin') next();
        else throw new Exception('Not admin');
    } catch (e) {
        res.status(403).send({ 'message': 'User does not have the admin privileges' });
    }
}

export const checkMod = async (req, res, next) => {
    try {
        const tokenPayload = getTokenPayload(req.headers['authorization']);
        const user = await Users.findById({ _id: tokenPayload.id });

        if (user.role === 'mod' || user.role === 'admin') next();
        else throw new Exception('Not mod');
    } catch (e) {
        res.status(403).send({ 'message': 'User does not have enough privileges' });
    }
}