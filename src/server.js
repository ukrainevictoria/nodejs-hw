import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import { connectMongoDB } from './db/connectMongoDB.js';
import { logger } from './middleware/logger.js';
import { notFoundHandler } from './middleware/notFoundHandler.js';
import { errorHandler } from './middleware/errorHandler.js';
import notesRouter from './routes/notesRoutes.js';

dotenv.config();

export const setupServer = async () => {
  const PORT = Number(process.env.PORT) || 3000;

  // 1. Підключення до БД перед запуском сервера
  await connectMongoDB();

  const app = express();

  // 2. Стандартні middleware
  app.use(logger);
  app.use(express.json());
  app.use(cors());

  // 3. Маршрути нотаток
  app.use(notesRouter);

  // 4. Обробка неіснуючих маршрутів
  app.use(notFoundHandler);

  // 5. Глобальна обробка помилок
  app.use(errorHandler);

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};

// Запуск сервера
setupServer().catch((error) => {
  console.error('Failed to start server:', error);
});
