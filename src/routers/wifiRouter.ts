import { Router } from 'express';
import {
    createWifi,
    deleteWifi,
    getAllWifis,
    getWifi,
} from '../controllers/wifiController.js';
import { validateToken } from '../middlewares/authenticationMiddleware.js';
import { validateSchema } from '../middlewares/validateSchema.js';
import { wifiSchema } from '../schemas/wifiSchema.js';

const wifiRouter = Router();

wifiRouter.use(validateToken);

wifiRouter.post('/wifi', validateSchema(wifiSchema), createWifi);
wifiRouter.get('/wifis', getAllWifis);
wifiRouter.get('/wifi/:id', getWifi);
wifiRouter.delete('/wifi/:id', deleteWifi);

export default wifiRouter;
