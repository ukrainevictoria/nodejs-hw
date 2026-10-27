import Joi from 'joi';
import { isValidObjectId } from 'mongoose';

// Якщо для отримання списку не потрібні параметри запиту, схема може бути порожньою обгорткою Joi.object({})
export const getAllNotesSchema = Joi.object({});

export const createNoteSchema = Joi.object({
  title: Joi.string().min(1).max(50).required(),
  content: Joi.string().min(1).max(500).required(),
});

export const updateNoteSchema = Joi.object({
  title: Joi.string().min(1).max(50),
  content: Joi.string().min(1).max(500),
});

export const noteIdSchema = Joi.object({
  noteId: Joi.string()
    .custom((value, helper) => {
      if (!isValidObjectId(value)) {
        return helper.message('Invalid id format');
      }
      return value;
    })
    .required(),
});
