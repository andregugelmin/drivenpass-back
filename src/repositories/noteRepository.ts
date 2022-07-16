import { prisma } from '../config/database.js';
import { CreateSecreteNoteData } from '../services/noteService.js';

export async function insert(createSecreteNoteData: CreateSecreteNoteData) {
    await prisma.secreteNote.create({
        data: createSecreteNoteData,
    });
}

export async function findSecreteNoteTitleUnique(
    title: string,
    userId: number
) {
    return await prisma.secreteNote.findUnique({
        where: {
            userId_title: {
                title,
                userId,
            },
        },
    });
}

export async function findSecreteNotes(id: number) {
    return await prisma.secreteNote.findMany({
        where: {
            userId: id,
        },
    });
}

export async function findSecreteNoteById(id: number) {
    const secreteNote = await prisma.secreteNote.findMany({
        where: {
            id: id,
        },
    });
    return secreteNote[0];
}

export async function deleteSecreteNote(id: number) {
    await prisma.secreteNote.deleteMany({
        where: {
            id: id,
        },
    });
}

const noteRepository = {
    insert,
    findSecreteNoteTitleUnique,
    findSecreteNotes,
    findSecreteNoteById,
    deleteSecreteNote,
};

export default noteRepository;
