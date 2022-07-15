import Joi from 'joi';
import { CreateUserData } from '../services/userService.js';

export const userSchema = Joi.object<CreateUserData>({
    email: Joi.string().required(),
    password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{10,}$')).required(),
});
