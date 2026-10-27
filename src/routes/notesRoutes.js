import { Router } from 'express';
import { celebrate } from 'celebrate';
import {
  getAllNotes,
  getNoteById,
  createNote,
  updateNote,
  deleteNote,
} from '../controllers/notesController.js';
import {
  getAllNotesSchema,
  createNoteSchema,
  updateNoteSchema,
  noteIdSchema,
} from '../validations/notesValidation.js';
import { authenticate } from '../middleware/authenticate.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';

const router = Router();

router.use(authenticate);

router.get(
  '/',
  celebrate({ query: getAllNotesSchema }),
  ctrlWrapper(getAllNotes),
);

router.get(
  '/:noteId',
  celebrate({ params: noteIdSchema }),
  ctrlWrapper(getNoteById),
);

router.post(
  '/',
  celebrate({ body: createNoteSchema }),
  ctrlWrapper(createNote),
);

router.patch(
  '/:noteId',
  celebrate({ params: noteIdSchema }),
  celebrate({ body: updateNoteSchema }),
  ctrlWrapper(updateNote),
);

router.delete(
  '/:noteId',
  celebrate({ params: noteIdSchema }),
  ctrlWrapper(deleteNote),
);

export default router;
