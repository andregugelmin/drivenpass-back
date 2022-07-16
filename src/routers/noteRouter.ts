import { Router } from 'express';
import {
    createSecreteNote,
    deleteSecreteNote,
    getAllSecreteNotes,
    getSecreteNote,
} from '../controllers/noteController.js';
import { validateToken } from '../middlewares/authenticationMiddleware.js';
import { validateSchema } from '../middlewares/validateSchema.js';
import { secreteNoteSchema } from '../schemas/noteSchema.js';

const notesRouter = Router();

notesRouter.use(validateToken);

notesRouter.post(
    '/secretenote',
    validateSchema(secreteNoteSchema),
    createSecreteNote
);
notesRouter.get('/secretenotes', getAllSecreteNotes);
notesRouter.get('/secretenote/:id', getSecreteNote);
notesRouter.delete('/secretenote/:id', deleteSecreteNote);

export default notesRouter;
