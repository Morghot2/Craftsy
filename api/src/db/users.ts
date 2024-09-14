import { drizzle } from 'drizzle-orm/node-postgres';
import { InferSelectModel, InferInsertModel, eq } from 'drizzle-orm';
import { pgTable, serial, text } from 'drizzle-orm/pg-core';
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
});

export type User = InferSelectModel<typeof users>;
export type NewUser = InferInsertModel<typeof users>;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const db = drizzle(pool);

export const getUsers = async () => await db.select({ id: users.id, username: users.username, email: users.email }).from(users);
export const getUserByEmail = async (email: string) => await db.select().from(users).where(eq(users.email, email));
export const getUserBySessionToken = async (sessionToken: string) => await db.select().from(users).where(eq(users.sessiontoken, sessionToken));
export const createUser = async (newUser: NewUser) =>
  await db.insert(users).values(newUser).returning({ id: users.id, username: users.username, email: users.email });
export const updateUserById = async (id: number, updatedUser: User) =>
  await db.update(users).set(updatedUser).where(eq(users.id, id)).returning({ id: users.id, username: users.username, email: users.email });
