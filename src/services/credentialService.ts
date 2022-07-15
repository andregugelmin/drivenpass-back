import { Credential } from '@prisma/client';
import credentialRepository from '../repositories/credentialRepository.js';
import { decrypt, encrypt } from '../utils/encryptUtils.js';

export type CreateCredentialData = Omit<Credential, 'id'>;

async function createCredential(credential: CreateCredentialData) {
    const checkTitle = await credentialRepository.findCredentialTitleUnique(
        credential.title,
        credential.userId
    );

    if (checkTitle) {
        throw {
            status: 409,
            message: `Title already registered`,
        };
    }

    const passwordEncrypted = encrypt(credential.password);
    credential.password = passwordEncrypted;

    await credentialRepository.insert(credential);
}

async function getCredentials(id: number) {
    const credentials = await credentialRepository.findCredentials(id);
    credentials.map((elem) => {
        elem.password = decrypt(elem.password);
    });
    return credentials;
}

async function getCredential(id: number, credentialId: number) {
    const credential = await credentialRepository.findCredentialById(
        credentialId
    );
    if (!credential) {
        throw {
            status: 404,
            message: `Credential not found`,
        };
    }
    if (credential.userId != id) {
        throw {
            status: 401,
            message: `Credential does not belong to the user `,
        };
    }

    credential.password = decrypt(credential.password);
    return credential;
}

async function deleteCredential(id: number, credentialId: number) {
    const credential = await getCredential(id, credentialId);
    await credentialRepository.deleteCredential(credential.id);
}

const credentialService = {
    createCredential,
    getCredentials,
    getCredential,
    deleteCredential,
};

export default credentialService;
