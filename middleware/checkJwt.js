import jwt from 'jsonwebtoken';

export const checkJwt = (req, res, next) => {
    try {
        const bearerHeader = req.headers['authorization'];
        const bearer = bearerHeader.split(' ');
        const bearerToken = bearer[1];
        jwt.verify(bearerToken, process.env.SECRET);
        next();
    } catch (e) {
        res.sendStatus(401);
    }
};