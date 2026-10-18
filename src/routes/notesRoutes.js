import { Router } from 'express';
import {
  getAllNotes,
  getNoteById,
  createNote,
  updateNote,
  deleteNote,
} from '../controllers/notesController.js';
import {
  validateBody,
  validateQuery,
  isValidId,
} from '../middlewares/validation.js';
import {
  createNoteSchema,
  updateNoteSchema,
  getAllNotesSchema,
} from '../validations/notesValidation.js';

const router = Router();

router.get('/', validateQuery(getAllNotesSchema), getAllNotes);

router.get('/:noteId', isValidId, getNoteById);

router.post('/', validateBody(createNoteSchema), createNote);

router.patch('/:noteId', isValidId, validateBody(updateNoteSchema), updateNote);

router.delete('/:noteId', isValidId, deleteNote);

export default router;
