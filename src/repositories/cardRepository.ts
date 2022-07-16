import { prisma } from '../config/database.js';
import { CreateCardData } from '../services/cardService.js';

export async function insert(createCardData: CreateCardData) {
    try {
        await prisma.card.create({
            data: createCardData,
        });
    } catch (e) {
        console.log(e);
    }
}

export async function findCards(id: number) {
    return await prisma.card.findMany({
        where: {
            userId: id,
        },
    });
}

export async function findCardById(id: number) {
    const card = await prisma.card.findMany({
        where: {
            id: id,
        },
    });
    return card[0];
}

export async function findCardTitleUnique(title: string, userId: number) {
    return await prisma.card.findUnique({
        where: {
            userId_title: {
                title,
                userId,
            },
        },
    });
}

export async function deleteCard(id: number) {
    await prisma.card.deleteMany({
        where: {
            id: id,
        },
    });
}

const cardRepository = {
    insert,
    findCards,
    findCardById,
    findCardTitleUnique,
    deleteCard,
};

export default cardRepository;
