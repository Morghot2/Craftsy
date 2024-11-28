import { Request, Response } from 'express';
import { createService, getServices, getServicesByCategory, getServicesBySeller } from '@/db/services';

export const getAllServices = async (req: Request, res: Response) => {
  try {
    const services = await getServices();
    return res.status(200).json(services);
  } catch (e) {
    console.error(e);
    return res.sendStatus(400);
  }
};

export const getServicesForCategory = async (req: Request, res: Response) => {
  try {
    const { categoryId } = req.params;
    const services = await getServicesByCategory(Number(categoryId));
    return res.status(200).json(services);
  } catch (e) {
    console.error(e);
    return res.sendStatus(400);
  }
};

export const getSellerServices = async (req: Request, res: Response) => {
  try {
    const { sellerId } = req.params;
    const services = await getServicesBySeller(Number(sellerId));
    return res.status(200).json(services);
  } catch (e) {
    console.error(e);
    return res.sendStatus(400);
  }
};

export const addService = async (req: Request, res: Response) => {
  try {
    const newService = req.body;
    const createdService = await createService(newService);
    return res.status(201).json(createdService);
  } catch (e) {
    console.error(e);
    return res.sendStatus(400);
  }
};
