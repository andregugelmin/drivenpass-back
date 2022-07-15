import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { findUserByEmail } from '../repositories/userRepository.js';

export function verifyJWT(req: Request, res: Response, next: NextFunction) {
    const token = req.header('x-access-token');
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            throw {
                status: 401,
                message: `Invalid access token`,
            };
        }

        console.log(decoded);
        next();
    });
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
