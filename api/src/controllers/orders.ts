import { Request, Response } from 'express';
import { createOrder, getOrdersByBuyer, getOrdersBySeller } from '@/db/orders';

export const placeOrder = async (req: Request, res: Response) => {
  try {
    const { service_id, buyer_id, custom_details } = req.body;
    if (!service_id || !buyer_id) return res.sendStatus(400);
    const newOrder = await createOrder({ service_id, buyer_id, custom_details });
    return res.status(201).json(newOrder);
  } catch (e) {
    console.error(e);
    return res.sendStatus(400);
  }
};

export const getBuyerOrders = async (req: Request, res: Response) => {
  try {
    const { buyerId } = req.params;
    const orders = await getOrdersByBuyer(Number(buyerId));
    return res.status(200).json(orders);
  } catch (e) {
    console.error(e);
    return res.sendStatus(400);
  }
};

export const getSellerOrders = async (req: Request, res: Response) => {
  try {
    const { sellerId } = req.params;
    const orders = await getOrdersBySeller(Number(sellerId));
    return res.status(200).json(orders);
  } catch (e) {
    console.error(e);
    return res.sendStatus(400);
  }
};
