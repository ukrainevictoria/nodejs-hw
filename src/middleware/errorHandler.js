import { HttpError } from 'http-errors';

export const errorHandler = (err, req, res) => {
  // Выводим полную ошибку в терминал для отладки!
  console.error('SERVER ERROR CAUGHT:', err);

  if (err instanceof HttpError) {
    return res.status(err.status).json({
      status: err.status,
      message: err.name,
      data: err.message,
    });
  }

  // Если это ошибка дубликата уникального ключа MongoDB (например, такой email уже есть)
  if (err.code === 11000) {
    return res.status(400).json({
      status: 400,
      message: 'Email already in use',
      data: { message: 'Email is already registered' },
    });
  }

  res.status(500).json({
    status: 500,
    message: 'Something went wrong',
    data: err.message,
  });
};
