import { prisma } from '../config/database.js';
import { CreateCredentialData } from '../services/credentialService.js';

export async function insert(createCredentialData: CreateCredentialData) {
    await prisma.credential.create({
        data: createCredentialData,
    });
}

export async function findCredentials(id: number) {
    return await prisma.credential.findMany({
        where: {
            userId: id,
        },
    });
}

export async function findCredentialById(id: number) {
    const credential = await prisma.credential.findMany({
        where: {
            id: id,
        },
    });
    return credential[0];
}

export async function findCredentialTitleUnique(title: string, userId: number) {
    return await prisma.credential.findUnique({
        where: {
            userId_title: {
                title,
                userId,
            },
        },
    });
}

export async function deleteCredential(id: number) {
    await prisma.credential.deleteMany({
        where: {
            id: id,
        },
    });
}

const credentialRepository = {
    insert,
    findCredentials,
    findCredentialById,
    findCredentialTitleUnique,
    deleteCredential,
};

export default credentialRepository;
