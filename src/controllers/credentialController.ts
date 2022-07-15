import { Request, Response } from 'express';
import credentialService, {
    CreateCredentialData,
} from '../services/credentialService.js';

export async function createCredential(req: Request, res: Response) {
    const credential: CreateCredentialData = req.body;
    const { id } = res.locals.user;

    await credentialService.createCredential({ ...credential, userId: id });
    return res.sendStatus(201);
}

export async function getAllCredentials(req: Request, res: Response) {
    const { id } = res.locals.user;
    const credentials = await credentialService.getCredentials(parseInt(id));
    return res.status(200).send(credentials);
}

export async function getCredential(req: Request, res: Response) {
    const credentialId = req.params.id;
    const { id } = res.locals.user;
    const credential = await credentialService.getCredential(
        parseInt(id),
        parseInt(credentialId)
    );
    return res.status(200).send(credential);
}

export async function deleteCredential(req: Request, res: Response) {
    const credentialId = req.params.id;
    const { id } = res.locals.user;
    await credentialService.deleteCredential(
        parseInt(id),
        parseInt(credentialId)
    );
    return res.sendStatus(200);
}
