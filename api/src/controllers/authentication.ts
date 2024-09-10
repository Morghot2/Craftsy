import { Request, Response } from 'express';
import { getUserByEmail, createUser } from '@/db/users';
import { random, authentication } from '@/helpers';

export const register = async (req: Request, res: Response) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      return res.sendStatus(400);
    }
    const result = await getUserByEmail(email);
    if (!result || result.length > 0) {
      return res.sendStatus(400);
    }
    const salt = random();
    const user = await createUser({ username, email, salt: salt ?? '', password: authentication(salt, password) });
    return res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.sendStatus(400);
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.sendStatus(400);
    }
    const result = await getUserByEmail(email);
    if (!result || result.length === 0) {
      return res.sendStatus(400);
    }
    const user = result[0];
    const expectedSecret = authentication(user.salt, password);
    if (user.password !== expectedSecret) {
      return res.sendStatus(403);
    }
    user.sessiontoken = authentication(random(), user.email);
    return res.sendStatus(200);
  } catch (error) {
    console.error(error);
    res.sendStatus(400);
  }
};
