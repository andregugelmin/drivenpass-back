import Joi from 'joi';
import { CreateWifiData } from '../services/wifiService.js';

export const wifiSchema = Joi.object<CreateWifiData>({
    title: Joi.string().required(),
    name: Joi.string().required(),
    password: Joi.string().required(),
});
