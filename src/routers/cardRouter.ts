import { Router } from 'express';
import {
    createCard,
    deleteCard,
    getAllCards,
    getCard,
} from '../controllers/cardController.js';
import { validateToken } from '../middlewares/authenticationMiddleware.js';
import { validateSchema } from '../middlewares/validateSchema.js';
import { cardSchema } from '../schemas/cardSchema.js';

const cardsRouter = Router();

cardsRouter.use(validateToken);

cardsRouter.post('/card', validateSchema(cardSchema), createCard);
cardsRouter.get('/cards', getAllCards);
cardsRouter.get('/card/:id', getCard);
cardsRouter.delete('/card/:id', deleteCard);

export default cardsRouter;
