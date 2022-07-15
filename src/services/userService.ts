import { User } from '@prisma/client';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import userRepository from '../repositories/userRepository.js';
import { encryptPassword } from '../utils/encryptUtils.js';

export type CreateUserData = Omit<User, 'id'>;

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
    console.log(user);
    return user[0];
}

async function insertUser(user: CreateUserData) {
    const passwordEncrypted = encryptPassword(user.password);
    const userEncrypted: CreateUserData = {
        email: user.email,
        password: passwordEncrypted,
    };
    await userRepository.insertUserDb(userEncrypted);
}

async function login(user: CreateUserData) {
    const userDb = await userService.findUserByEmail(user.email);

    if (!bcrypt.compareSync(user.password, userDb.password)) {
        throw {
            status: 401,
            message: `Wrong password`,
        };
    }

    const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET, {
        expiresIn: 900,
    });

    return token;
}

const userService = { findUserById, findUserByEmail, insertUser, login };

export default userService;
