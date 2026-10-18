import {
  getAllNotesFromDb,
  getNoteByIdFromDb,
  createNoteInDb,
  deleteNoteFromDb,
  updateNoteInDb,
} from '../services/notesService.js';

export async function getNotesController(req, res, next) {
  try {
    const result = await getAllNotesFromDb(req.query);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
}

export async function getNoteByIdController(req, res, next) {
  try {
    const { noteId } = req.params;
    const note = await getNoteByIdFromDb(noteId);

    if (!note) {
      return res.status(404).json({ message: 'Note not found' });
    }

    res.status(200).json(note);
  } catch (error) {
    next(error);
  }
}

export async function createNoteController(req, res, next) {
  try {
    const note = await createNoteInDb(req.body);
    res.status(201).json(note);
  } catch (error) {
    next(error);
  }
}

export async function deleteNoteController(req, res, next) {
  try {
    const { noteId } = req.params;
    const note = await deleteNoteFromDb(noteId);

    if (!note) {
      return res.status(404).json({ message: 'Note not found' });
    }

    res.status(204).send();
  } catch (error) {
    next(error);
  }
}

export async function patchNoteController(req, res, next) {
  try {
    const { noteId } = req.params;
    const note = await updateNoteInDb(noteId, req.body);

    if (!note) {
      return res.status(404).json({ message: 'Note not found' });
    }

    res.status(200).json(note);
  } catch (error) {
    next(error);
  }
}
