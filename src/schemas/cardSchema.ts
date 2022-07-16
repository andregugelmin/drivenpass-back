import Joi from 'joi';
import { CreateCardData } from '../services/cardService.js';

export const cardSchema = Joi.object<CreateCardData>({
    title: Joi.string().required(),
    number: Joi.number().required(),
    name: Joi.string().required(),
    securityCode: Joi.string().required(),
    expirationDate: Joi.date().required(),
    password: Joi.string().required(),
    isVirtual: Joi.boolean().required(),
    type: Joi.string().required().valid('credit', 'debit', 'credit_debit'),
});
