import { Request, Response } from 'express';
import cardService, { CreateCardData } from '../services/cardService.js';

export async function createCard(req: Request, res: Response) {
    const card: CreateCardData = req.body;
    const { id } = res.locals.user;
    await cardService.createCard({ ...card, userId: id });
    return res.sendStatus(201);
}

export async function getAllCards(req: Request, res: Response) {
    const { id } = res.locals.user;
    const cards = await cardService.getCards(parseInt(id));
    return res.status(200).send(cards);
}

export async function getCard(req: Request, res: Response) {
    const cardId = req.params.id;
    const { id } = res.locals.user;
    const card = await cardService.getCard(parseInt(id), parseInt(cardId));
    return res.status(200).send(card);
}

export async function deleteCard(req: Request, res: Response) {
    const cardId = req.params.id;
    const { id } = res.locals.user;
    await cardService.deleteCard(parseInt(id), parseInt(cardId));
    return res.sendStatus(200);
}
