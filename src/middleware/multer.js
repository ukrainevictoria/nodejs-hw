import multer from 'multer';
import createHttpError from 'http-errors';

const storage = multer.memoryStorage();

const limits = {
  fileSize: 1024 * 1024 * 5, // 5 MB
};

const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(createHttpError(400, 'Upload only images!'), false);
  }
};

export const upload = multer({
  storage,
  limits,
  fileFilter,
});
