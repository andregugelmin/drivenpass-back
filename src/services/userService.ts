import { User } from '@prisma/client';
import jwt from 'jsonwebtoken';
import userRepository from '../repositories/userRepository.js';
import { encryptPassword, verifyPassword } from '../utils/encryptUtils.js';

export type CreateUserData = User;

async function findUserById(id: number) {
    const user = await userRepository.findUserById(id);
    if (!user) {
        throw {
            status: 404,
            message: `User not found`,
        };
    }
    return user[0];
}

async function findUserByEmail(email: string) {
    const user = await userRepository.findUserByEmail(email);
    if (!user) {
        throw {
            status: 404,
            message: `User not found`,
        };
    }
    return user;
}

async function insertUser(user: CreateUserData) {
    const passwordEncrypted = encryptPassword(user.password);
    const userEncrypted: CreateUserData = {
        email: user.email,
        password: passwordEncrypted,
        id: user.id,
    };
    await userRepository.insertUserDb(userEncrypted);
}

async function login(user: CreateUserData) {
    const userDb = await userService.findUserByEmail(user.email);

    verifyPassword(user.password, userDb.password);

    const token = jwt.sign(
        { email: userDb.email, id: userDb.id },
        process.env.JWT_SECRET,
        {
            expiresIn: 900,
        }
    );

    return token;
}

const userService = { findUserById, findUserByEmail, insertUser, login };

export default userService;
