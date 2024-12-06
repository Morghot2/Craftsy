import { pgTable, serial, text } from 'drizzle-orm/pg-core';
import { InferSelectModel, InferInsertModel } from 'drizzle-orm';
import { db } from './connection';

export const categories = pgTable('categories', {
  id: serial('id').primaryKey(),
  name: text('name').notNull().unique(),
  description: text('description').notNull(),
});

export type Category = InferSelectModel<typeof categories>;
export type NewCategory = InferInsertModel<typeof categories>;

const initialCategories: Category[] = [
  { id: 1, name: 'Forgery', description: 'Art of forging metals' },
  { id: 2, name: 'Blacksmithing', description: 'Crafting metal tools and objects' },
  { id: 3, name: 'Crafting', description: 'Creating handmade crafts' },
  { id: 4, name: 'Pottery', description: 'Handmade pottery items' },
  { id: 5, name: 'Woodworking', description: 'Crafting with wood' },
  { id: 6, name: 'Weaving', description: 'Art of weaving textiles' },
  { id: 7, name: 'Jewelry', description: 'Handcrafted jewelry' },
  { id: 8, name: 'Glassblowing', description: 'Creating glass art and items' },
];

export const getCategories = async () => {
  return await db.select().from(categories);
};

export const createCategory = async (newCategory: NewCategory) => {
  return await db.insert(categories).values(newCategory).returning();
};

export const seedCategories = async () => {
  const existingCategories = await getCategories();
  if (existingCategories.length === 0) {
    for (const category of initialCategories) {
      await createCategory(category);
    }
  }
};
