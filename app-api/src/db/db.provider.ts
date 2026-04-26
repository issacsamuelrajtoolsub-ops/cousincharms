import { Logger } from '@nestjs/common';
import { neon } from '@neondatabase/serverless';
import { drizzle, NeonHttpDatabase } from 'drizzle-orm/neon-http';
import * as schema from './schema';

export const DATABASE = Symbol('DATABASE');

export type Database = NeonHttpDatabase<typeof schema>;

export const databaseProvider = {
  provide: DATABASE,
  useFactory: async (): Promise<Database> => {
    const logger = new Logger('DbModule');
    const url = process.env.DATABASE_URL;
    if (!url) {
      throw new Error('DATABASE_URL is not set');
    }
    const sql = neon(url);
    const db = drizzle(sql, { schema });
    await sql`select 1`;
    logger.log('Database connection successful');
    return db;
  },
};
