import { Note } from '../models/note.js';

export async function getAllNotesFromDb({
  page = 1,
  perPage = 10,
  tag,
  search,
}) {
  const parsedPage = parseInt(page, 10);
  const parsedPerPage = parseInt(perPage, 10);
  const skip = (parsedPage - 1) * parsedPerPage;

  const filter = {};

  if (tag) {
    filter.tag = tag;
  }

  if (search) {
    filter.$or = [
      { title: { $regex: search, $options: 'i' } },
      { content: { $regex: search, $options: 'i' } },
    ];
  }

  const totalNotes = await Note.countDocuments(filter);
  const notes = await Note.find(filter).skip(skip).limit(parsedPerPage);
  const totalPages = Math.ceil(totalNotes / parsedPerPage);

  return {
    page: parsedPage,
    perPage: parsedPerPage,
    totalNotes,
    totalPages,
    notes,
  };
}

export async function getNoteByIdFromDb(noteId) {
  return await Note.findById(noteId);
}

export async function createNoteInDb(payload) {
  return await Note.create(payload);
}

export async function deleteNoteFromDb(noteId) {
  return await Note.findByIdAndDelete(noteId);
}

export async function updateNoteInDb(noteId, payload) {
  return await Note.findByIdAndUpdate(noteId, payload, {
    new: true,
    runValidators: true,
  });
}
