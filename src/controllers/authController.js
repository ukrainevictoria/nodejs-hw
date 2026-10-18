import bcrypt from 'bcrypt';
import createHttpError from 'http-errors';
import { UserCollection } from '../models/user.js';
import { SessionCollection } from '../models/session.js';
import { createSession, setSessionCookies } from '../services/auth.js';

// 1. Реєстрація користувача
export const registerUser = async (req, res, next) => {
  try {
    const { email, password, username } = req.body;

    const existingUser = await UserCollection.findOne({ email });
    if (existingUser) {
      throw createHttpError(400, 'Email in use');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await UserCollection.create({
      email,
      password: hashedPassword,
      username: username || email.split('@')[0], // якщо username не передано, беремо частину email
    });

    const session = await createSession(user._id);
    setSessionCookies(res, session);

    res.status(201).json({
      status: 201,
      message: 'Successfully registered a user!',
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

// 2. Логін користувача
export const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await UserCollection.findOne({ email });
    if (!user) {
      throw createHttpError(401, 'Invalid credentials');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw createHttpError(401, 'Invalid credentials');
    }

    const session = await createSession(user._id);
    setSessionCookies(res, session);

    res.status(200).json({
      status: 200,
      message: 'Successfully logged in an user!',
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

// 3. Оновлення сесії (Refresh)
export const refreshUserSession = async (req, res, next) => {
  try {
    const { sessionId, refreshToken } = req.cookies;

    if (!sessionId || !refreshToken) {
      throw createHttpError(401, 'Session not found');
    }

    const session = await SessionCollection.findOne({
      _id: sessionId,
      refreshToken,
    });

    if (!session) {
      throw createHttpError(401, 'Session not found');
    }

    const isRefreshTokenExpired =
      new Date() > new Date(session.refreshTokenValidUntil);

    if (isRefreshTokenExpired) {
      throw createHttpError(401, 'Session token expired');
    }

    await SessionCollection.deleteOne({ _id: sessionId });
    const newSession = await createSession(session.userId);
    setSessionCookies(res, newSession);

    res.status(200).json({
      status: 200,
      message: 'Successfully refreshed a session!',
    });
  } catch (error) {
    next(error);
  }
};

// 4. Логаут користувача
export const logoutUser = async (req, res, next) => {
  try {
    const { sessionId } = req.cookies;

    if (sessionId) {
      await SessionCollection.deleteOne({ _id: sessionId });
    }

    res.clearCookie('sessionId');
    res.clearCookie('accessToken');
    res.clearCookie('refreshToken');

    res.status(204).send();
  } catch (error) {
    next(error);
  }
};
