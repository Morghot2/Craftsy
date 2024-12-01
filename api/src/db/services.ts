import { pgTable, serial, text, integer } from 'drizzle-orm/pg-core';
import { eq, and } from 'drizzle-orm/expressions';
import { InferSelectModel, InferInsertModel } from 'drizzle-orm';
import { db } from './users';
import { categories } from './categories';
import { users } from './users';

export const services = pgTable('services', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  description: text('description').notNull(),
  price: integer('price').notNull(),
  photo_url: text('photo_url').notNull(),
  category_id: integer('category_id')
    .notNull()
    .references(() => categories.id),
  seller_id: integer('seller_id')
    .notNull()
    .references(() => users.id),
});

export type Service = InferSelectModel<typeof services>;
export type NewService = InferInsertModel<typeof services>;

export const getServices = async (filter?: { userId?: number; categoryId?: number }) => {
  const query = db.select().from(services);
  if (filter?.userId) {
    query.where(eq(services.seller_id, filter.userId));
  }
  if (filter?.categoryId) {
    query.where(eq(services.category_id, filter.categoryId));
  }
  return await query;
};
export const getServicesByUserId = async (userId: number) => {
  return await db
    .select({
      id: services.id,
      name: services.name,
      description: services.description,
      price: services.price,
      categoryId: services.category_id,
      photo_url: services.photo_url,
    })
    .from(services)
    .where(eq(services.seller_id, userId));
};

export const getServicesByCategoryName = async (categoryName: string) => {
  return await db
    .select({
      id: services.id,
      name: services.name,
      description: services.description,
      price: services.price,
      photo_url: services.photo_url,
    })
    .from(services)
    .innerJoin(categories, eq(services.category_id, categories.id))
    .where(eq(categories.name, categoryName));
};

export const createService = async (newService: NewService) => {
  return await db.insert(services).values(newService).returning();
};

export const getServiceByIdFromDB = async (serviceId: number) => {
  const service = await db
    .select({
      id: services.id,
      name: services.name,
      description: services.description,
      price: services.price,
      photo_url: services.photo_url,
      seller_id: users.id,
      seller_name: users.name,
      seller_country: users.country,
    })
    .from(services)
    .innerJoin(users, eq(services.seller_id, users.id))
    .where(eq(services.id, serviceId))
    .limit(1);

  return service[0] || null;
};

export const deleteServiceById = async (serviceId: number, userId: number) => {
  const result = await db
    .delete(services)
    .where(and(eq(services.id, serviceId), eq(services.seller_id, userId)))
    .returning();

  return result.length > 0;
};
