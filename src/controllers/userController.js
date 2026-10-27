import createHttpError from 'http-errors';
import { User } from '../models/user.js';
import { saveFileToCloudinary } from '../utils/saveFileToCloudinary.js';

export const updateAvatarController = async (req, res) => {
  if (!req.file) {
    throw createHttpError(400, 'Avatar file is required');
  }

  const avatarUrl = await saveFileToCloudinary(req.file.buffer, req.user._id);

  const updatedUser = await User.findByIdAndUpdate(
    req.user._id,
    { avatar: avatarUrl },
    { returnDocument: 'after' },
  );

  if (!updatedUser) {
    throw createHttpError(404, 'User not found');
  }

  res.json({
    status: 200,
    message: 'Successfully updated avatar!',
    data: updatedUser,
  });
};
