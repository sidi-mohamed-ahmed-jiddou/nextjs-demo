import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as dotenv from 'dotenv';

dotenv.config({ path: '.env' });

const password = encodeURIComponent(process.env.DB_PASSWORD!);

const DATABASE_URL = `postgres://${process.env.DB_USER}:${password}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}?sslmode=require`;

const client = postgres(DATABASE_URL, {
  ssl: { rejectUnauthorized: false },
  max: 10,
});

export const db = drizzle(client);