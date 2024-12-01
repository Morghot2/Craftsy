import { pgTable, serial, integer, timestamp } from 'drizzle-orm/pg-core';
import { InferSelectModel, InferInsertModel, eq } from 'drizzle-orm';
import { users } from './users';
import { services } from './services';
import { db } from './users';

export const purchases = pgTable('purchases', {
  id: serial('id').primaryKey(),
  buyer_id: integer('buyer_id')
    .notNull()
    .references(() => users.id),
  service_id: integer('service_id')
    .notNull()
    .references(() => services.id),
  purchase_time: timestamp('purchase_time').defaultNow(),
});

export type Purchase = InferSelectModel<typeof purchases>;
export type NewPurchase = InferInsertModel<typeof purchases>;

export const createPurchase = async (buyerId: number, serviceId: number) => {
  return await db
    .insert(purchases)
    .values({
      buyer_id: buyerId,
      service_id: serviceId,
    })
    .returning();
};

export const getPurchasesByBuyerId = async (buyerId: number) => {
  return await db
    .select({
      id: purchases.id,
      service_id: purchases.service_id,
      purchase_time: purchases.purchase_time,
    })
    .from(purchases)
    .where(eq(purchases.buyer_id, buyerId));
};
