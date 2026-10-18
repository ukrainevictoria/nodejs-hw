import { celebrate, Joi } from 'celebrate';
import { isValidObjectId } from 'mongoose';
import { TAGS } from '../constants/tags.js';

const validateId = (value, helpers) => {
  if (!isValidObjectId(value)) {
    return helpers.error('any.invalid');
  }
  return value;
};

export const getAllNotesSchema = celebrate({
  query: Joi.object({
    page: Joi.number().integer().min(1).default(1),
    perPage: Joi.number().integer().min(5).max(20).default(10),
    tag: Joi.string().valid(...TAGS),
    search: Joi.string().allow('').optional(),
  }),
});

export const noteIdSchema = celebrate({
  params: Joi.object({
    noteId: Joi.string()
      .custom(validateId, 'MongoDB ObjectId validation')
      .required(),
  }),
});

// 3. Схема для POST /notes
export const createNoteSchema = celebrate({
  body: Joi.object({
    title: Joi.string().min(1).required(),
    content: Joi.string().allow('').optional(),
    tag: Joi.string()
      .valid(...TAGS)
      .optional(),
  }),
});

// 4. Схема для PATCH /notes/:noteId (параметри + тіло запиту)
export const updateNoteSchema = celebrate({
  params: Joi.object({
    noteId: Joi.string()
      .custom(validateId, 'MongoDB ObjectId validation')
      .required(),
  }),
  body: Joi.object({
    title: Joi.string().min(1),
    content: Joi.string().allow(''),
    tag: Joi.string().valid(...TAGS),
  }).min(1), // Тіло не повинно бути порожнім (хоча б одне поле)
});
