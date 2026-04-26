import { sql } from 'drizzle-orm';
import {
  check,
  index,
  integer,
  pgTable,
  text,
  uuid,
} from 'drizzle-orm/pg-core';
import { orders } from './orders';
import { products } from './products';

export const orderItems = pgTable(
  'order_items',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    orderId: uuid('order_id')
      .notNull()
      .references(() => orders.id, { onDelete: 'cascade' }),
    productId: uuid('product_id').references(() => products.id, {
      onDelete: 'set null',
    }),
    nameSnapshot: text('name_snapshot').notNull(),
    priceCentsSnapshot: integer('price_cents_snapshot').notNull(),
    imageUrlSnapshot: text('image_url_snapshot').notNull(),
    qty: integer('qty').notNull(),
    lineTotalCents: integer('line_total_cents').notNull(),
  },
  (t) => [
    index('order_items_order_id_idx').on(t.orderId),
    check('order_items_qty_check', sql`${t.qty} > 0`),
  ],
);
