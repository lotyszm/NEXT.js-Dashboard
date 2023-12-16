import type { Config } from 'drizzle-kit';
import { loadEnvConfig } from '@next/env';
loadEnvConfig('.');

if (!process.env.DATABASE_URL) throw new Error('DATABASE_URL not set');

export default {
  schema: './src/db/schema/*',
  out: './src/db/migrations',
  driver: 'pg',
  dbCredentials: {
    connectionString: process.env.DATABASE_URL,
  },
} satisfies Config;
