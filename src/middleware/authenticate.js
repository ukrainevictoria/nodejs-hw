import createHttpError from 'http-errors';
import { Session } from '../models/session.js';
import { User } from '../models/user.js';

export const authenticate = async (req, res, next) => {
  const authHeader = req.get('Authorization');

  let accessToken = req.cookies.accessToken;
  let sessionId = req.cookies.sessionId;

  if (authHeader) {
    const [bearer, token] = authHeader.split(' ');
    if (bearer === 'Bearer' && token) {
      accessToken = token;
    }
  }

  if (!accessToken && !sessionId) {
    return next(
      createHttpError(401, 'Provide authorization token and session id'),
    );
  }

  const session = await Session.findOne({ _id: sessionId, accessToken });

  if (!session) {
    return next(createHttpError(401, 'Session not found'));
  }

  const isAccessTokenExpired =
    new Date() > new Date(session.accessTokenValidUntil);

  if (isAccessTokenExpired) {
    return next(createHttpError(401, 'Access token expired'));
  }

  const user = await User.findById(session.userId);

  if (!user) {
    return next(createHttpError(401, 'User not found'));
  }

  req.user = user;
  req.session = session;

  next();
};
