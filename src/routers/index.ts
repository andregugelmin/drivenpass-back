import { Router } from 'express';
import cardsRouter from './cardRouter.js';
import credentialsRouter from './credentialsRouter.js';
import notesRouter from './noteRouter.js';
import userRouter from './userRouter.js';
import wifiRouter from './wifiRouter.js';

const router = Router();
router.use(userRouter);
router.use(credentialsRouter);
router.use(notesRouter);
router.use(wifiRouter);
router.use(cardsRouter);

export default router;
