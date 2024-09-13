import { Request, Response } from 'express';
import { getUsers } from '../db/users';

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await getUsers();

    return res.status(200).json(users);
  } catch (e) {
    console.log(e);
    return res.sendStatus(400);
  }
};
