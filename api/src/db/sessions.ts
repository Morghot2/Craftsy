import { pgTable, serial, text, integer } from 'drizzle-orm/pg-core';

export const sessions = pgTable('sessions', {
  id: serial('id').primaryKey(),
  sessiontoken: text('sessiontoken').notNull(),
  user_id: integer('user_id').notNull(),
});
