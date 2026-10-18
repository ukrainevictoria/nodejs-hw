import createHttpError from 'http-errors';
import { SessionCollection } from '../models/session.js';
import { UserCollection } from '../models/user.js';

export const authenticate = async (req, res, next) => {
  const { accessToken } = req.cookies;

  // 1. Перевірка наявності кукі accessToken
  if (!accessToken) {
    return next(createHttpError(401, 'Missing access token'));
  }

  // 2. Пошук сесії за accessToken
  const session = await SessionCollection.findOne({ accessToken });
  if (!session) {
    return next(createHttpError(401, 'Session not found'));
  }

  // 3. Перевірка, чи не прострочений access-токен
  const isAccessTokenExpired =
    new Date() > new Date(session.accessTokenValidUntil);
  if (isAccessTokenExpired) {
    return next(createHttpError(401, 'Access token expired'));
  }

  // 4. Пошук користувача, пов’язаного з цією сесією
  const user = await UserCollection.findById(session.userId);
  if (!user) {
    return next(createHttpError(401));
  }

  // 5. Успіх: додаємо користувача в req.user та передаємо управління далі
  req.user = user;
  next();
};
