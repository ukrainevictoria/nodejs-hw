import { Router } from 'express';
import {
  getAllNotesSchema,
  noteIdSchema,
  createNoteSchema,
  updateNoteSchema,
} from '../validations/notesValidation.js';
import {
  getNotesController,
  getNoteByIdController,
  createNoteController,
  patchNoteController,
  deleteNoteController,
} from '../controllers/notesController.js';

// 1. Створюємо роутер
const router = Router();

// 2. Прописуємо маршрути із валідацією
router.get('/notes', getAllNotesSchema, getNotesController);
router.get('/notes/:noteId', noteIdSchema, getNoteByIdController);
router.post('/notes', createNoteSchema, createNoteController);
router.patch('/notes/:noteId', updateNoteSchema, patchNoteController);
router.delete('/notes/:noteId', noteIdSchema, deleteNoteController);

// 3. Експортуємо роутер в самому кінці файлу
export default router;
