import { drizzle } from 'drizzle-orm/node-postgres';
import { InferSelectModel, InferInsertModel, eq } from 'drizzle-orm';
import { pgTable, serial, text, boolean } from 'drizzle-orm/pg-core';
import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  username: text('username').notNull(),
  email: text('email').notNull(),
  password: text('password').notNull(),
  salt: text('salt').notNull(),
  sessiontoken: text('sessiontoken'),
  is_seller: boolean('is_seller').default(false),
  bio: text('bio'),
  profilePhoto: text('profile_photo'),
});

export type User = InferSelectModel<typeof users>;

export type NewUser = InferInsertModel<typeof users>;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export const db = drizzle(pool);

export const getUsers = async () => await db.select({ id: users.id, username: users.username, email: users.email }).from(users);
export const getUserByEmail = async (email: string) => await db.select().from(users).where(eq(users.email, email));
export const getUserBySessionToken = async (sessionToken: string) => await db.select().from(users).where(eq(users.sessiontoken, sessionToken));
export const createUser = async (newUser: NewUser) =>
  await db.insert(users).values(newUser).returning({ id: users.id, username: users.username, email: users.email });
export const updateUserById = async (userId: number, data: Partial<User>) => {
  return db.update(users).set(data).where(eq(users.id, userId)).returning();
};
export const becomeSeller = async (id: number, bio: string) => {
  return await db
    .update(users)
    .set({ is_seller: true, bio } as Partial<User>)
    .where(eq(users.id, id))
    .returning({ id: users.id, username: users.username, is_seller: users.is_seller, bio: users.bio });
};
