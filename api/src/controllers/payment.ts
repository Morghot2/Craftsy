import { Request, Response } from 'express';
import Stripe from 'stripe';
import { getServiceByIdFromDB } from '@/db/services';
import { createPurchase } from '@/db/purchases';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-11-20.acacia',
});

export const createCheckoutSession = async (req: Request, res: Response) => {
  try {
    const { serviceId } = req.body;
    const userId = res.locals.user.id;

    const service = await getServiceByIdFromDB(serviceId);
    if (!service) {
      return res.status(404).json({ error: 'Service not found' });
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: service.name,
              description: service.description,
            },
            unit_amount: service.price * 100,
          },
          quantity: 1,
        },
      ],
      metadata: {
        serviceId: String(serviceId),
        buyerId: String(userId),
      },
      success_url: `${process.env.FRONTEND_URL}/purchases`,
      cancel_url: `${process.env.FRONTEND_URL}/cancel`,
    });

    return res.json({ url: session.url });
  } catch (error) {
    console.error('Stripe session creation failed:', error);
    return res.status(500).json({ error: 'Payment initiation failed' });
  }
};

export const handleWebhook = async (req: Request, res: Response) => {
  try {
    const sig = req.headers['stripe-signature'];
    const event = stripe.webhooks.constructEvent(req.body, sig!, process.env.STRIPE_WEBHOOK_SECRET!);

    if (event.type === 'checkout.session.completed') {
      const session = event.data.object as Stripe.Checkout.Session;

      const serviceId = session.metadata?.serviceId;
      const buyerId = session.metadata?.buyerId;

      if (!serviceId || !buyerId) {
        console.error('Missing metadata in Stripe session');
        return res.status(400).json({ error: 'Invalid webhook data' });
      }

      await createPurchase(parseInt(buyerId, 10), parseInt(serviceId, 10));
    }

    res.status(200).send('Webhook received');
  } catch (err) {
    console.error('Webhook error:', err);
    res.status(400).send(`Webhook Error: ${err.message}`);
  }
};
