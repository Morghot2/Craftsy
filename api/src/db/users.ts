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
  is_seller: boolean('is_seller').default(false).notNull(),
  bio: text('bio'),
  country: text('country'),
  phone: text('phone'),
  name: text('name'),
  surname: text('surname'),
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
export const getUserBySessionToken = async (sessionToken: string) => {
  return await db
    .select({
      id: users.id,
      username: users.username,
      email: users.email,
      profilePhoto: users.profilePhoto,
      bio: users.bio,
      country: users.country,
      phone: users.phone,
      name: users.name,
      surname: users.surname,
      is_seller: users.is_seller,
      sessiontoken: users.sessiontoken,
    })
    .from(users)
    .where(eq(users.sessiontoken, sessionToken));
};

export const createUser = async (newUser: NewUser) =>
  await db.insert(users).values(newUser).returning({ id: users.id, username: users.username, email: users.email });
export const updateUserById = async (userId: number, data: Partial<User>) => {
  return db.update(users).set(data).where(eq(users.id, userId)).returning();
};
export const becomeSeller = async (id: number, data: { bio: string; country: string; phone: string; name: string; surname: string }) => {
  const updateData: Partial<User> = {
    ...data,
    is_seller: true,
  };

  console.log('Prepared update data:', updateData);

  return await db.update(users).set(updateData).where(eq(users.id, id)).returning({
    id: users.id,
    username: users.username,
    is_seller: users.is_seller,
    bio: users.bio,
    country: users.country,
    phone: users.phone,
    name: users.name,
    surname: users.surname,
  });
};
