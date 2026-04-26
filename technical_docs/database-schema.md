# Cousin Charms — Database Schema (draft)

Postgres (Neon) + Drizzle ORM. Money stored as integer **cents** (`price = 4800` for `$48.00`) — never floats.
All `timestamptz`, all `id` columns are `uuid` defaulting to `gen_random_uuid()`.

> Mark this doc up with whatever needs to change (column names, types, missing tables, relations you want differently, etc.). I'll regenerate the Drizzle schema from the final version.

---

## Tables at a glance

| Table | Purpose | Key relations |
|---|---|---|
| `users` | Customers and admins | — |
| `user_sessions` | Refresh-token / device sessions | → users |
| `products` | The charm catalog | — |
| `product_reviews` | Customer ratings + reviews (drives "★ 4.9 · 240 reviews") | → products, users |
| `carts` | One open cart per user (or guest by session) | → users |
| `cart_items` | Line items inside a cart | → carts, products |
| `orders` | Placed orders (the "CC-2847" series) | → users |
| `order_items` | Line items at time of order (snapshot) | → orders, products |
| `wishlists` | The heart-icon save on PDP | → users, products |

ERD (text):

```
users 1───n user_sessions
users 1───1 carts ───n cart_items ───n products
users 1───n orders ───n order_items ───n products
users 1───n product_reviews n───1 products
users 1───n wishlists       n───1 products
```

---

## 1. `users`

Stores both customers and admins. Role-flag distinguishes them — keep it one table so login flow is identical.

| Column | Type | Constraints | Notes |
|---|---|---|---|
| `id` | `uuid` | PK, default `gen_random_uuid()` | |
| `email` | `text` | NOT NULL, UNIQUE (lower) | citext-style: store lowercased |
| `password_hash` | `text` | NOT NULL | bcrypt / argon2 |
| `role` | `text` | NOT NULL, default `'customer'`, CHECK in (`'customer'`, `'admin'`) | |
| `first_name` | `text` | NULL | optional at signup |
| `last_name` | `text` | NULL | |
| `marketing_opt_in` | `boolean` | NOT NULL, default `true` | the signup checkbox |
| `two_factor_secret` | `text` | NULL | populated for admins only — TOTP shared secret |
| `created_at` | `timestamptz` | NOT NULL, default `now()` | |
| `updated_at` | `timestamptz` | NOT NULL, default `now()` | bump on update |

Indexes: `users_email_lower_idx` (unique, on `lower(email)`).

---

## 2. `user_sessions`

Tracks each logged-in device. Stores the **hashed** refresh token — never the plain token.

| Column | Type | Constraints | Notes |
|---|---|---|---|
| `id` | `uuid` | PK | |
| `user_id` | `uuid` | NOT NULL, FK → `users(id)` ON DELETE CASCADE | |
| `refresh_token_hash` | `text` | NOT NULL, UNIQUE | sha256 of refresh token |
| `user_agent` | `text` | NULL | captured at login |
| `ip` | `inet` | NULL | |
| `expires_at` | `timestamptz` | NOT NULL | typically 30 days |
| `revoked_at` | `timestamptz` | NULL | logout / forced revoke |
| `created_at` | `timestamptz` | NOT NULL, default `now()` | |

Indexes: `user_sessions_user_id_idx` on `user_id`.

---

## 3. `products`

The charm catalog. The shop, PDP, compare, admin table, and order-item snapshots all read from here.

| Column | Type | Constraints | Notes |
|---|---|---|---|
| `id` | `uuid` | PK | |
| `slug` | `text` | NOT NULL, UNIQUE | URL — `heart`, `crescent-moon` |
| `name` | `text` | NOT NULL | `Heart on a Chain` |
| `description` | `text` | NOT NULL, default `''` | shown on PDP |
| `price_cents` | `integer` | NOT NULL, CHECK ≥ 0 | `4800` = $48.00 |
| `category` | `text` | NOT NULL, CHECK in (`'classics'`,`'new'`,`'limited'`) | drives shop filters |
| `material` | `text` | NOT NULL, default `''` | `Brass, gold-plated` |
| `size_label` | `text` | NOT NULL, default `'Dime'` | `Dime` / `Nickel` |
| `image_url` | `text` | NOT NULL | path or CDN url |
| `stock` | `integer` | NOT NULL, CHECK ≥ 0, default `0` | drives "Only N left" badge |
| `is_popular` | `boolean` | NOT NULL, default `false` | bestseller eyebrow |
| `is_new` | `boolean` | NOT NULL, default `false` | new-this-week eyebrow |
| `is_active` | `boolean` | NOT NULL, default `true` | soft-hide from storefront |
| `created_at` | `timestamptz` | NOT NULL, default `now()` | |
| `updated_at` | `timestamptz` | NOT NULL, default `now()` | |

Indexes:
- `products_slug_idx` (unique)
- `products_category_idx` on `category`
- `products_active_idx` on `is_active` (partial: `WHERE is_active`)

> The `★ 4.9 · 240 reviews` shown on PDP is **derived** from `product_reviews` (avg + count). Don't denormalize unless query volume forces it.

---

## 4. `product_reviews`

| Column | Type | Constraints | Notes |
|---|---|---|---|
| `id` | `uuid` | PK | |
| `product_id` | `uuid` | NOT NULL, FK → `products(id)` ON DELETE CASCADE | |
| `user_id` | `uuid` | NOT NULL, FK → `users(id)` ON DELETE CASCADE | |
| `rating` | `smallint` | NOT NULL, CHECK between 1 and 5 | |
| `title` | `text` | NULL | |
| `body` | `text` | NULL | |
| `created_at` | `timestamptz` | NOT NULL, default `now()` | |

Indexes:
- `product_reviews_product_id_idx`
- `product_reviews_unique_per_user` UNIQUE on `(product_id, user_id)` — one review per user per product.

---

## 5. `carts`

One row per active cart. Either tied to a user (after login) or to a guest session.

| Column | Type | Constraints | Notes |
|---|---|---|---|
| `id` | `uuid` | PK | |
| `user_id` | `uuid` | NULL, FK → `users(id)` ON DELETE CASCADE | NULL for guest carts |
| `session_id` | `text` | NULL | cookie value for guests |
| `status` | `text` | NOT NULL, default `'active'`, CHECK in (`'active'`,`'converted'`,`'abandoned'`) | flip to `converted` on checkout |
| `created_at` | `timestamptz` | NOT NULL, default `now()` | |
| `updated_at` | `timestamptz` | NOT NULL, default `now()` | |

Indexes:
- `carts_user_id_active_idx` UNIQUE on `(user_id)` WHERE `status = 'active' AND user_id IS NOT NULL` — at most one open cart per user.
- `carts_session_id_idx` on `session_id`.

---

## 6. `cart_items`

| Column | Type | Constraints | Notes |
|---|---|---|---|
| `id` | `uuid` | PK | |
| `cart_id` | `uuid` | NOT NULL, FK → `carts(id)` ON DELETE CASCADE | |
| `product_id` | `uuid` | NOT NULL, FK → `products(id)` ON DELETE RESTRICT | don't lose history if product deleted; soft-delete instead via `is_active` |
| `qty` | `integer` | NOT NULL, CHECK > 0 | |
| `created_at` | `timestamptz` | NOT NULL, default `now()` | |

Indexes:
- `cart_items_cart_product_idx` UNIQUE on `(cart_id, product_id)` — one row per product per cart; bumping qty updates the row.

---

## 7. `orders`

| Column | Type | Constraints | Notes |
|---|---|---|---|
| `id` | `uuid` | PK | |
| `order_number` | `text` | NOT NULL, UNIQUE | `CC-2847` — generated, human-friendly |
| `user_id` | `uuid` | NULL, FK → `users(id)` ON DELETE SET NULL | NULL allowed if user is later deleted |
| `email` | `text` | NOT NULL | snapshot — works for guest / deleted-user orders |
| `full_name` | `text` | NOT NULL | snapshot |
| `street` | `text` | NOT NULL | |
| `city` | `text` | NOT NULL | |
| `state` | `text` | NOT NULL | |
| `zip` | `text` | NOT NULL | |
| `country` | `text` | NOT NULL, default `'US'` | future-proof |
| `subtotal_cents` | `integer` | NOT NULL, CHECK ≥ 0 | |
| `shipping_cents` | `integer` | NOT NULL, default `0` | $5 if subtotal < $50 |
| `total_cents` | `integer` | NOT NULL, CHECK ≥ 0 | redundant with subtotal+shipping but worth storing for reporting |
| `payment_method` | `text` | NOT NULL, default `'gpay'`, CHECK in (`'gpay'`) | only option per the design |
| `payment_status` | `text` | NOT NULL, default `'pending'`, CHECK in (`'pending'`,`'paid'`,`'refunded'`,`'failed'`) | |
| `fulfillment_status` | `text` | NOT NULL, default `'new'`, CHECK in (`'new'`,`'paid'`,`'shipped'`,`'delivered'`,`'cancelled'`) | drives admin orders table tag |
| `placed_at` | `timestamptz` | NOT NULL, default `now()` | |
| `paid_at` | `timestamptz` | NULL | set when GPay confirms |
| `shipped_at` | `timestamptz` | NULL | |
| `updated_at` | `timestamptz` | NOT NULL, default `now()` | |

Indexes:
- `orders_user_id_idx` on `user_id`
- `orders_placed_at_idx` on `placed_at DESC`
- `orders_fulfillment_status_idx` on `fulfillment_status`

---

## 8. `order_items`

Snapshot of products at purchase time — never read live product data for old orders.

| Column | Type | Constraints | Notes |
|---|---|---|---|
| `id` | `uuid` | PK | |
| `order_id` | `uuid` | NOT NULL, FK → `orders(id)` ON DELETE CASCADE | |
| `product_id` | `uuid` | NULL, FK → `products(id)` ON DELETE SET NULL | nullable in case product is later deleted |
| `name_snapshot` | `text` | NOT NULL | name at time of purchase |
| `price_cents_snapshot` | `integer` | NOT NULL | unit price at purchase |
| `image_url_snapshot` | `text` | NOT NULL | image at purchase |
| `qty` | `integer` | NOT NULL, CHECK > 0 | |
| `line_total_cents` | `integer` | NOT NULL | `qty * price_cents_snapshot` — store for reporting |

Indexes: `order_items_order_id_idx`.

---

## 9. `wishlists`

The heart icon on PDP — saved items per user. Compare set is intentionally *not* a table; it's lightweight ephemeral client state.

| Column | Type | Constraints | Notes |
|---|---|---|---|
| `id` | `uuid` | PK | |
| `user_id` | `uuid` | NOT NULL, FK → `users(id)` ON DELETE CASCADE | |
| `product_id` | `uuid` | NOT NULL, FK → `products(id)` ON DELETE CASCADE | |
| `created_at` | `timestamptz` | NOT NULL, default `now()` | |

Indexes: `wishlists_user_product_idx` UNIQUE on `(user_id, product_id)`.

---

## Conventions

- **All money is integer cents.** Never `numeric(10,2)`, never floats.
- **All timestamps are `timestamptz`** (UTC stored, render in client's tz).
- **Soft-delete products** via `is_active = false`. Hard-deleting breaks order history.
- **Snapshot fields on `order_items`** (`name_snapshot`, `price_cents_snapshot`, etc.) — orders must be readable forever even if a product is renamed or deleted.
- **`updated_at` triggers** — set up a single trigger per table that bumps `updated_at` on every UPDATE.
- **Foreign keys: cascade on parent delete, restrict where history matters.** Cart→user cascades; order_items→product is `SET NULL` to preserve order history.

---

## Open questions for you to decide

1. **Guest checkout?** Currently the design says "you'll need an account for this part." If guests can ever buy, `orders.user_id` and `carts.user_id` need to stay nullable (already are).
2. **Multiple shipping addresses per user?** Right now the address is captured per-order. If you want a saved-address book, add a separate `addresses` table.
3. **Coupons / gift cards?** The footer mentions gift cards. Not modelled here. Holler if you want a `gift_cards` + `order_discounts` schema.
4. **Inventory holds during checkout?** If two people race for the last `Crescent Moon`, the loser silently fails. Add a `cart_holds` table or use SELECT ... FOR UPDATE. Probably overkill for current scale.
5. **Order numbers (`CC-2847`)** — sequential or random? Sequential leaks volume to competitors; random is opaque but uglier.
6. **Reviews moderation?** Add an `is_approved` flag if you want to gate them, or trust everything by default.
7. **Audit log for admin actions?** Useful but adds complexity. Skip for now unless you want it.

Mark up the doc with your changes, and once you're happy I'll generate the Drizzle schema files in `app-api/src/db/schema/` and the matching migration.
