import { sql } from 'drizzle-orm';
import {
  check,
  index,
  pgTable,
  text,
  timestamp,
  uniqueIndex,
  uuid,
} from 'drizzle-orm/pg-core';
import { users } from './users';

export const carts = pgTable(
  'carts',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    userId: uuid('user_id').references(() => users.id, {
      onDelete: 'cascade',
    }),
    sessionId: text('session_id'),
    status: text('status').notNull().default('active'),
    createdAt: timestamp('created_at', { withTimezone: true })
      .notNull()
      .defaultNow(),
    updatedAt: timestamp('updated_at', { withTimezone: true })
      .notNull()
      .defaultNow(),
  },
  (t) => [
    uniqueIndex('carts_user_id_active_idx')
      .on(t.userId)
      .where(sql`${t.status} = 'active' AND ${t.userId} IS NOT NULL`),
    index('carts_session_id_idx').on(t.sessionId),
    check(
      'carts_status_check',
      sql`${t.status} in ('active','converted','abandoned')`,
    ),
  ],
);
