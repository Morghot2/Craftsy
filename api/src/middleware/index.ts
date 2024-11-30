import { Request, Response, NextFunction } from 'express';
import { SESSION_TOKEN } from '@/constants';
import { getUserBySessionToken } from '@/db/users';
import multer from 'multer';

// Middleware to authenticate users
export const isAuthenticated = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const sessionToken = req.cookies[SESSION_TOKEN];

    if (!sessionToken) {
      return res.sendStatus(403); // Forbidden
    }

    const result = await getUserBySessionToken(sessionToken);

    if (!result || result.length === 0) {
      return res.sendStatus(403); // Forbidden
    }

    // Assign the user to res.locals for downstream middleware/controllers
    res.locals.user = result[0];
    return next();
  } catch (error) {
    console.error('Authentication error:', error);
    return res.sendStatus(400); // Bad Request
  }
};

// Middleware to check seller status
export const isSeller = (req: Request, res: Response, next: NextFunction) => {
  const user = res.locals.user;

  if (!user.is_seller) {
    return res.status(403).json({ message: 'Only sellers can perform this action.' });
  }

  next();
};

// Multer configuration for file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage });

export default upload;
