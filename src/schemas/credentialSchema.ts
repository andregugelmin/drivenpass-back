import Joi from 'joi';
import { CreateCredentialData } from '../services/credentialService.js';

export const credentialSchema = Joi.object<CreateCredentialData>({
    title: Joi.string().required(),
    site: Joi.string().required(),
    username: Joi.string().required(),
    password: Joi.string().required(),
});
