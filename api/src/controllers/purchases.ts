import { Request, Response } from 'express';
import { getPurchasesByBuyerId } from '@/db/purchases';
import { getServiceByIdFromDB } from '@/db/services';

export const getPurchasesForUser = async (req: Request, res: Response) => {
  try {
    const userId = res.locals.user.id;
    const purchases = await getPurchasesByBuyerId(userId);

    const detailedPurchases = await Promise.all(
      purchases.map(async (purchase) => {
        const service = await getServiceByIdFromDB(purchase.service_id);
        return {
          id: purchase.id,
          serviceName: service.name,
          serviceDescription: service.description,
          servicePrice: service.price,
          purchasedAt: purchase.purchase_time,
        };
      }),
    );

    res.status(200).json(detailedPurchases);
  } catch (error) {
    console.error('Error fetching purchases for user:', error);
    res.status(500).json({ error: 'Failed to fetch purchases' });
  }
};
