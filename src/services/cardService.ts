import { Card } from '@prisma/client';
import cardRepository from '../repositories/cardRepository.js';
import { decrypt, encrypt } from '../utils/encryptUtils.js';

export type CreateCardData = Omit<Card, 'id'>;

async function createCard(card: CreateCardData) {
    const checkTitle = await cardRepository.findCardTitleUnique(
        card.title,
        card.userId
    );

    if (checkTitle) {
        throw {
            status: 409,
            message: `Title already registered`,
        };
    }

    const passwordEncrypted = encrypt(card.password);
    card.password = passwordEncrypted;

    await cardRepository.insert(card);
}

async function getCards(id: number) {
    const cards = await cardRepository.findCards(id);
    cards.map((elem) => {
        elem.password = decrypt(elem.password);
    });
    return cards;
}

async function getCard(id: number, cardId: number) {
    const card = await cardRepository.findCardById(cardId);
    if (!card) {
        throw {
            status: 404,
            message: `Card not found`,
        };
    }
    if (card.userId != id) {
        throw {
            status: 401,
            message: `Card does not belong to the user `,
        };
    }

    card.password = decrypt(card.password);
    return card;
}

async function deleteCard(id: number, cardId: number) {
    const card = await getCard(id, cardId);
    await cardRepository.deleteCard(card.id);
}

const cardService = {
    createCard,
    getCards,
    getCard,
    deleteCard,
};

export default cardService;
