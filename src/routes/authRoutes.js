import { Router } from 'express';
import { celebrate } from 'celebrate';
import {
  registerUser,
  loginUser,
  logoutUser,
  refreshUserSession,
  requestResetEmail,
  resetPassword,
} from '../controllers/authController.js';
import {
  registerUserSchema,
  loginUserSchema,
  requestResetEmailSchema,
  resetPasswordSchema,
} from '../validations/authValidation.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';

const router = Router();

router.post(
  '/register',
  celebrate({ body: registerUserSchema }),
  ctrlWrapper(registerUser),
);

router.post(
  '/login',
  celebrate({ body: loginUserSchema }),
  ctrlWrapper(loginUser),
);

router.post('/logout', ctrlWrapper(logoutUser));

router.post('/refresh', ctrlWrapper(refreshUserSession));

router.post(
  '/request-reset-email',
  celebrate({ body: requestResetEmailSchema }),
  ctrlWrapper(requestResetEmail),
);

router.post(
  '/reset-password',
  celebrate({ body: resetPasswordSchema }),
  ctrlWrapper(resetPassword),
);

export default router;
