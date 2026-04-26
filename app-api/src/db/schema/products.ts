import { sql } from 'drizzle-orm';
import {
  boolean,
  check,
  index,
  integer,
  pgTable,
  text,
  timestamp,
  uniqueIndex,
  uuid,
} from 'drizzle-orm/pg-core';

export const products = pgTable(
  'products',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    slug: text('slug').notNull(),
    name: text('name').notNull(),
    description: text('description').notNull().default(''),
    priceCents: integer('price_cents').notNull(),
    category: text('category').notNull(),
    material: text('material').notNull().default(''),
    sizeLabel: text('size_label').notNull().default('Dime'),
    imageUrl: text('image_url').notNull(),
    stock: integer('stock').notNull().default(0),
    isPopular: boolean('is_popular').notNull().default(false),
    isNew: boolean('is_new').notNull().default(false),
    isActive: boolean('is_active').notNull().default(true),
    createdAt: timestamp('created_at', { withTimezone: true })
      .notNull()
      .defaultNow(),
    updatedAt: timestamp('updated_at', { withTimezone: true })
      .notNull()
      .defaultNow(),
  },
  (t) => [
    uniqueIndex('products_slug_idx').on(t.slug),
    index('products_category_idx').on(t.category),
    index('products_active_idx')
      .on(t.isActive)
      .where(sql`${t.isActive}`),
    check('products_price_cents_check', sql`${t.priceCents} >= 0`),
    check('products_stock_check', sql`${t.stock} >= 0`),
    check(
      'products_category_check',
      sql`${t.category} in ('classics','new','limited')`,
    ),
  ],
);
