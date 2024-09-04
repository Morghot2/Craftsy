import { Pool } from 'pg';
import { drizzle } from 'drizzle-orm/node-postgres';
import { migrate } from 'drizzle-orm/node-postgres/migrator';
import dotenv from 'dotenv';

dotenv.config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const db = drizzle(pool);

const main = async () => {
  await migrate(db, { migrationsFolder: './drizzle/migrations' });
};

main().catch((err) => {
  console.error(err);
});
