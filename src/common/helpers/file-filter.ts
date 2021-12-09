import { parse } from 'path';
import { FileFilterResponse } from '../interfaces';

const allowedExtensions = ['.png', '.jpg', '.jpeg'];

export const fileFilter = (file: Express.Multer.File): FileFilterResponse => {
  const ext = parse(file.originalname).ext.toLowerCase();
  if (allowedExtensions.includes(ext)) {
    return { ok: true };
  }
  return { ok: false, fileExtAllowed: allowedExtensions.join(', ') };
};
