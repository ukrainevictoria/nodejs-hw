import createHttpError from 'http-errors';
import { NoteCollection } from '../models/note.js';

// Отримати всі нотки поточного користувача
export const getAllNotes = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const notes = await NoteCollection.find({ userId });
    res.status(200).json(notes);
  } catch (error) {
    next(error);
  }
};

// Отримати нотатку за ID (тільки якщо вона належить користувачу)
export const getNoteById = async (req, res, next) => {
  try {
    const { noteId } = req.params;
    const userId = req.user._id;

    const note = await NoteCollection.findOne({ _id: noteId, userId });
    if (!note) {
      throw createHttpError(404, 'Note not found');
    }

    res.status(200).json(note);
  } catch (error) {
    next(error);
  }
};

// Створити нотатку з прив'язкою до поточного користувача
export const createNote = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const note = await NoteCollection.create({
      ...req.body,
      userId,
    });

    res.status(201).json(note);
  } catch (error) {
    next(error);
  }
};

// Оновити нотатку (тільки якщо вона належить користувачу)
export const updateNote = async (req, res, next) => {
  try {
    const { noteId } = req.params;
    const userId = req.user._id;

    const note = await NoteCollection.findOneAndUpdate(
      { _id: noteId, userId },
      req.body,
      { new: true },
    );

    if (!note) {
      throw createHttpError(404, 'Note not found');
    }

    res.status(200).json(note);
  } catch (error) {
    next(error);
  }
};

// Видалити нотатку (тільки якщо вона належить користувачу)
export const deleteNote = async (req, res, next) => {
  try {
    const { noteId } = req.params;
    const userId = req.user._id;

    const note = await NoteCollection.findOneAndDelete({ _id: noteId, userId });
    if (!note) {
      throw createHttpError(404, 'Note not found');
    }

    res.status(200).json({
      message: 'Successfully deleted a note!',
      data: note,
    });
  } catch (error) {
    next(error);
  }
};
