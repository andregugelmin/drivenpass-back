import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { findUserByEmail } from '../repositories/userRepository.js';

export function validateToken(req: Request, res: Response, next: NextFunction) {
    const authorization = req.headers['authorization'];
    const token = authorization?.replace('Bearer ', '');

    const errStats = {
        status: 401,
        message: `invalid access token`,
    };
    if (!token) {
        throw errStats;
    }

    const userDecoded = jwt.verify(
        token,
        process.env.JWT_SECRET,
        (err, decoded) => {
            if (err) {
                throw errStats;
            }
            return decoded;
        }
    );

    res.locals.user = userDecoded;

    next();
}

export async function checkEmailIsRegistered(
    req: Request,
    res: Response,
    next: NextFunction
) {
    const { email } = req.body;
    const user = await findUserByEmail(email);
    if (user) {
        throw {
            status: 409,
            message: `Email already registered`,
        };
    }

    next();
}
