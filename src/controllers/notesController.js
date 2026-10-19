import createHttpError from 'http-errors';
import { Note } from '../models/note.js';

export const deleteNote = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userId = req.user._id;

    const deletedNote = await Note.findOneAndDelete({ _id: id, userId });

    if (!deletedNote) {
      throw createHttpError(404, 'Note not found');
    }

    res.status(200).json(deletedNote);
  } catch (error) {
    next(error);
  }
};
