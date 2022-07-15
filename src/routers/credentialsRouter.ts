import { Router } from 'express';
import {
    createCredential,
    deleteCredential,
    getAllCredentials,
    getCredential,
} from '../controllers/credentialController.js';
import { validateToken } from '../middlewares/authenticationMiddleware.js';
import { validateSchema } from '../middlewares/validateSchema.js';
import { credentialSchema } from '../schemas/credentialSchema.js';

const credentialsRouter = Router();

credentialsRouter.use(validateToken);

credentialsRouter.post(
    '/credential',
    validateSchema(credentialSchema),
    createCredential
);
credentialsRouter.get('/credentials', getAllCredentials);
credentialsRouter.get('/credential/:id', getCredential);
credentialsRouter.delete('/credential/:id', deleteCredential);

export default credentialsRouter;
