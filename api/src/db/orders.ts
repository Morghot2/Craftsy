import { pgTable, serial, integer, text, timestamp } from 'drizzle-orm/pg-core';
import { eq } from 'drizzle-orm/expressions';
import { InferSelectModel, InferInsertModel } from 'drizzle-orm';
import { db } from './users';
import { users } from './users';
import { services } from './services';

export const orders = pgTable('orders', {
  id: serial('id').primaryKey(),
  service_id: integer('service_id')
    .references(() => services.id)
    .notNull(),
  buyer_id: integer('buyer_id')
    .references(() => users.id)
    .notNull(),
  status: text('status').default('Pending'),
  custom_details: text('custom_details'),
  created_at: timestamp('created_at').defaultNow(),
});

export type Order = InferSelectModel<typeof orders>;
export type NewOrder = InferInsertModel<typeof orders>;

export const createOrder = async (newOrder: NewOrder) => {
  return await db.insert(orders).values(newOrder).returning();
};

export const getOrdersByBuyer = async (buyerId: number) => {
  return await db.select().from(orders).where(eq(orders.buyer_id, buyerId));
};

export const getOrdersBySeller = async (sellerId: number) => {
  return await db.select().from(orders).innerJoin(services, eq(orders.service_id, services.id)).where(eq(services.seller_id, sellerId));
};
