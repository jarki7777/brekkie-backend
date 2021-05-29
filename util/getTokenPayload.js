import jwt from 'jsonwebtoken';

export const getTokenPayload = (bearerHeader) => {
    const bearer = bearerHeader.split(' ');
    const bearerToken = bearer[1];
    return jwt.decode(bearerToken, process.env.JWT_SECRET);
}