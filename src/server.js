import 'dotenv/config';
import express from 'express';
import pino from 'pino-http';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { errors } from 'celebrate';

import initMongoDB from './db/connectMongoDB.js';
import { notFoundHandler } from './middleware/notFoundHandler.js';
import { errorHandler } from './middleware/errorHandler.js';

import authRoutes from './routes/authRoutes.js';
import notesRoutes from './routes/notesRoutes.js';

const PORT = process.env.PORT || 3000;

export const setupServer = () => {
  const app = express();

  app.use(express.json());
  app.use(cors());
  app.use(cookieParser());

  app.use(
    pino({
      transport: {
        target: 'pino-pretty',
      },
    }),
  );

  // Маршрути (без префіксів для auth, якщо так вимагається, або стандартно)
  app.use('/auth', authRoutes);
  app.use('/notes', notesRoutes);

  // Обробники помилок
  app.use(notFoundHandler);

  app.use(errors()); // Celebrate error handler
  app.use(errorHandler);

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};

initMongoDB().then(() => {
  setupServer();
});
