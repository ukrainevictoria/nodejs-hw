// import { Router } from 'express';
// import { celebrate } from 'celebrate';
// import {
//   getAllNotes,
//   getNoteById,
//   createNote,
//   updateNote,
//   deleteNote,
// } from '../controllers/notesController.js';
// import {
//   getAllNotesSchema,
//   createNoteSchema,
//   updateNoteSchema,
//   noteIdSchema,
// } from '../validations/notesValidation.js';

// const router = Router();

// router.get('/', celebrate(getAllNotesSchema), getAllNotes);

// router.get('/:noteId', celebrate(noteIdSchema), getNoteById);

// router.post('/', celebrate(createNoteSchema), createNote);

// router.patch(
//   '/:noteId',
//   celebrate(noteIdSchema),
//   celebrate(updateNoteSchema),
//   updateNote,
// );

// router.delete('/:noteId', celebrate(noteIdSchema), deleteNote);

// export default router;
import { Router } from 'express';
import { celebrate, Segments } from 'celebrate';
import {
  getAllNotes,
  getNoteById,
  createNote,
  updateNote,
  deleteNote,
} from '../controllers/notesController.js';
import {
  createNoteSchema,
  updateNoteSchema,
} from '../validations/notesValidation.js';

const router = Router();

router.get('/', getAllNotes);

router.get('/:noteId', getNoteById);

router.post(
  '/',
  celebrate({
    [Segments.BODY]: createNoteSchema,
  }),
  createNote,
);

router.patch(
  '/:noteId',
  celebrate({
    [Segments.BODY]: updateNoteSchema,
  }),
  updateNote,
);

router.delete('/:noteId', deleteNote);

export default router;
