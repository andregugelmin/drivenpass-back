import { prisma } from '../config/database.js';
import { CreateUserData } from '../services/userService.js';

export async function insertUserDb(createUserData: CreateUserData) {
    await prisma.user.create({
        data: createUserData,
    });
}

export async function findUserById(id: number) {
    return await prisma.user.findMany({
        where: {
            id: id,
        },
    });
}

export async function findUserByEmail(email: string) {
    const user = await prisma.user.findMany({
        where: {
            email: email,
        },
    });
    return user[0];
}

export default {
    insertUserDb,
    findUserById,
    findUserByEmail,
};
