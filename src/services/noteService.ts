import { SecreteNote } from '@prisma/client';
import noteRepository from '../repositories/noteRepository.js';

export type CreateSecreteNoteData = Omit<SecreteNote, 'id'>;

async function createSecreteNote(secreteNote: CreateSecreteNoteData) {
    const checkSecreteNote = await noteRepository.findSecreteNoteTitleUnique(
        secreteNote.title,
        secreteNote.userId
    );
    if (checkSecreteNote) {
        throw {
            status: 409,
            message: `Title already registered`,
        };
    }

    await noteRepository.insert(secreteNote);
}

async function getSecreteNotes(id: number) {
    const secreteNote = await noteRepository.findSecreteNotes(id);
    return secreteNote;
}

async function getSecreteNote(id: number, secreteNoteId: number) {
    const secreteNote = await noteRepository.findSecreteNoteById(secreteNoteId);
    if (!secreteNote) {
        throw {
            status: 404,
            message: `Secrete note not found`,
        };
    }
    if (secreteNote.userId != id) {
        throw {
            status: 401,
            message: `Secrete note does not belong to the user `,
        };
    }

    return secreteNote;
}

async function deleteSecreteNote(id: number, secreteNoteId: number) {
    const secreteNote = await getSecreteNote(id, secreteNoteId);
    await noteRepository.deleteSecreteNote(secreteNote.id);
}

const noteService = {
    createSecreteNote,
    getSecreteNotes,
    getSecreteNote,
    deleteSecreteNote,
};

export default noteService;
