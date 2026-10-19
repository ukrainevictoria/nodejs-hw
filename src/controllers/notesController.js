import createHttpError from 'http-errors';
import { Note } from '../models/note.js'; // переконайтеся, що шлях до моделі правильний

// ... інші ваші контролери ...

export const deleteNote = async (req, res) => {
  const { id } = req.params;
  const userId = req.user._id;

  const deletedNote = await Note.findOneAndDelete({ _id: id, userId });

  if (!deletedNote) {
    throw createHttpError(404, 'Note not found');
  }

  res.status(200).json({
    status: 200,
    message: 'Successfully deleted a note!',
    data: deletedNote,
  });
};
