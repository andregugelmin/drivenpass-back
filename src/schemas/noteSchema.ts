import Joi from 'joi';
import { CreateSecreteNoteData } from '../services/noteService.js';

export const secreteNoteSchema = Joi.object<CreateSecreteNoteData>({
    title: Joi.string().required().max(50),
    note: Joi.string().required().max(1000),
});
