import { Request, Response } from 'express';
import noteService, { CreateSecreteNoteData } from '../services/noteService.js';

export async function createSecreteNote(req: Request, res: Response) {
    const secretenote: CreateSecreteNoteData = req.body;
    const { id } = res.locals.user;

    await noteService.createSecreteNote({ ...secretenote, userId: id });
    return res.sendStatus(201);
}

export async function getAllSecreteNotes(req: Request, res: Response) {
    const { id } = res.locals.user;
    const secreteNotes = await noteService.getSecreteNotes(parseInt(id));
    return res.status(200).send(secreteNotes);
}

export async function getSecreteNote(req: Request, res: Response) {
    const secreteNoteId = req.params.id;
    const { id } = res.locals.user;
    const secreteNote = await noteService.getSecreteNote(
        parseInt(id),
        parseInt(secreteNoteId)
    );
    return res.status(200).send(secreteNote);
}

export async function deleteSecreteNote(req: Request, res: Response) {
    const secreteNoteId = req.params.id;
    const { id } = res.locals.user;
    await noteService.deleteSecreteNote(parseInt(id), parseInt(secreteNoteId));
    return res.sendStatus(200);
}
