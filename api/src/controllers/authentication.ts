import { Request, Response } from 'express';
import { getUserByEmail, createUser, updateUserById } from '@/db/users';
import { random, authentication } from '@/helpers';
import { SESSION_TOKEN, DOMAIN } from '@/constants';

export const register = async (req: Request, res: Response) => {
  try {
    const { username, email, password, confirmPassword } = req.body;
    if (!username || !email || !password) {
      return res.sendStatus(400);
    }
    if (password !== confirmPassword) {
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
    const updatedUser = await updateUserById(user.id, { sessiontoken: user.sessiontoken });

    res.cookie(SESSION_TOKEN, user.sessiontoken, {
      domain: DOMAIN,
      path: '/',
      expires: new Date(Date.now() + 900000),
    });

    return res.status(200).json(updatedUser[0]);
  } catch (error) {
    console.error(error);
    res.sendStatus(400);
  }
};

export const logout = (req: Request, res: Response) => {
  try {
    res.clearCookie(SESSION_TOKEN, { domain: DOMAIN, path: '/' });
    return res.sendStatus(200);
  } catch (error) {
    console.error(error);
    return res.sendStatus(400);
  }
};
