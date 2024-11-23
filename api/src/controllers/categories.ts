import { Request, Response } from 'express';
import { getCategories, createCategory, seedCategories } from '../db/categories';

export const getAllCategories = async (req: Request, res: Response) => {
  try {
    const categories = await getCategories();
    return res.status(200).json(categories);
  } catch (e) {
    console.error(e);
    return res.sendStatus(400);
  }
};

export const addCategory = async (req: Request, res: Response) => {
  try {
    const newCategory = req.body;
    const createdCategory = await createCategory(newCategory);
    return res.status(201).json(createdCategory);
  } catch (e) {
    console.error(e);
    return res.sendStatus(400);
  }
};

export const seedAllCategories = async (req: Request, res: Response) => {
  try {
    await seedCategories();
    return res.status(200).json({ message: 'Categories seeded successfully' });
  } catch (e) {
    console.error(e);
    return res.sendStatus(400);
  }
};
