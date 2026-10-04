import { Note } from '../models/note.js';

export const getAllNotesFromDb = async () => {
  return await Note.find();
};

export const getNoteByIdFromDb = async (noteId) => {
  return await Note.findById(noteId);
};

export const createNoteInDb = async (payload) => {
  return await Note.create(payload);
};

export const deleteNoteFromDb = async (noteId) => {
  return await Note.findByIdAndDelete(noteId);
};

export const updateNoteInDb = async (noteId, payload) => {
  return await Note.findByIdAndUpdate(noteId, payload, {
    new: true,
    runValidators: true,
  });
};
