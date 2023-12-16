import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import { cwd } from 'node:process';
import { loadEnvConfig } from '@next/env';

loadEnvConfig(cwd());

if (!process.env.DATABASE_URL) throw new Error('DATABASE_URL not set');

const client = postgres(process.env.DATABASE_URL);
const db = drizzle(client);

export { db };
