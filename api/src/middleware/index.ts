import { Request, Response, NextFunction } from 'express';
import { SESSION_TOKEN } from '@/constants';
import { getUserBySessionToken } from '@/db/users';

export const isAuthenticated = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const sessionToken = req.cookies[SESSION_TOKEN];

    if (!sessionToken) {
      return res.sendStatus(403);
    }

    const result = await getUserBySessionToken(sessionToken);

    if (!result || result.length === 0) {
      return res.sendStatus(403);
    }

    return next();
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};
