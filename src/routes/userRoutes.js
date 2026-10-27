import { Router } from 'express';
import { authenticate } from '../middleware/authenticate.js';
import { upload } from '../middleware/multer.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { updateAvatarController } from '../controllers/userController.js'; // 👈 Змініть тут

const router = Router();

router.patch(
  '/me/avatar',
  authenticate,
  upload.single('avatar'),
  ctrlWrapper(updateAvatarController),
);

export default router;
