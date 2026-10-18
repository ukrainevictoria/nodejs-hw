import { Router } from 'express';
import { celebrate, Segments } from 'celebrate';
import {
  registerUser,
  loginUser,
  refreshUserSession,
  logoutUser,
} from '../controllers/authController.js';
import { registerSchema, loginSchema } from '../validations/authValidation.js';

const router = Router();

router.post(
  '/register',
  celebrate({
    [Segments.BODY]: registerSchema,
  }),
  registerUser,
);

router.post(
  '/login',
  celebrate({
    [Segments.BODY]: loginSchema,
  }),
  loginUser,
);

router.post('/refresh', refreshUserSession);

router.post('/logout', logoutUser);

export default router;
