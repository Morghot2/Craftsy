import { pgTable, serial, text, integer } from 'drizzle-orm/pg-core';
import { eq } from 'drizzle-orm/expressions';
import { InferSelectModel, InferInsertModel } from 'drizzle-orm';
import { db } from './users';
import { categories } from './categories';
import { users } from './users';

export const services = pgTable('services', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  description: text('description').notNull(),
  price: integer('price').notNull(),
  category_id: integer('category_id')
    .notNull()
    .references(() => categories.id),
  seller_id: integer('seller_id')
    .notNull()
    .references(() => users.id),
});

export type Service = InferSelectModel<typeof services>;
export type NewService = InferInsertModel<typeof services>;

export const getServices = async () => {
  return await db.select().from(services);
};

export const getServicesByCategory = async (categoryId: number) => {
  return await db.select().from(services).where(eq(services.category_id, categoryId));
};

export const createService = async (newService: NewService) => {
  return await db.insert(services).values(newService).returning();
};

export const getServicesBySeller = async (sellerId: number) => {
  return await db.select().from(services).where(eq(services.seller_id, sellerId));
};

export const getServicesByUserId = async (userId: number) => {
  return await db
    .select({
      id: services.id,
      name: services.name,
      description: services.description,
      price: services.price,
      categoryId: services.category_id,
    })
    .from(services)
    .where(eq(services.seller_id, userId));
};
