import { sql } from 'drizzle-orm';
import {
  check,
  index,
  integer,
  pgTable,
  text,
  timestamp,
  uuid,
} from 'drizzle-orm/pg-core';
import { users } from './users';

export const orders = pgTable(
  'orders',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    orderNumber: text('order_number').notNull().unique(),
    userId: uuid('user_id').references(() => users.id, {
      onDelete: 'set null',
    }),
    email: text('email').notNull(),
    fullName: text('full_name').notNull(),
    street: text('street').notNull(),
    city: text('city').notNull(),
    state: text('state').notNull(),
    zip: text('zip').notNull(),
    country: text('country').notNull().default('US'),
    subtotalCents: integer('subtotal_cents').notNull(),
    shippingCents: integer('shipping_cents').notNull().default(0),
    totalCents: integer('total_cents').notNull(),
    paymentMethod: text('payment_method').notNull().default('gpay'),
    paymentStatus: text('payment_status').notNull().default('pending'),
    fulfillmentStatus: text('fulfillment_status').notNull().default('new'),
    placedAt: timestamp('placed_at', { withTimezone: true })
      .notNull()
      .defaultNow(),
    paidAt: timestamp('paid_at', { withTimezone: true }),
    shippedAt: timestamp('shipped_at', { withTimezone: true }),
    updatedAt: timestamp('updated_at', { withTimezone: true })
      .notNull()
      .defaultNow(),
  },
  (t) => [
    index('orders_user_id_idx').on(t.userId),
    index('orders_placed_at_idx').on(t.placedAt.desc()),
    index('orders_fulfillment_status_idx').on(t.fulfillmentStatus),
    check('orders_subtotal_cents_check', sql`${t.subtotalCents} >= 0`),
    check('orders_total_cents_check', sql`${t.totalCents} >= 0`),
    check('orders_payment_method_check', sql`${t.paymentMethod} in ('gpay')`),
    check(
      'orders_payment_status_check',
      sql`${t.paymentStatus} in ('pending','paid','refunded','failed')`,
    ),
    check(
      'orders_fulfillment_status_check',
      sql`${t.fulfillmentStatus} in ('new','paid','shipped','delivered','cancelled')`,
    ),
  ],
);
