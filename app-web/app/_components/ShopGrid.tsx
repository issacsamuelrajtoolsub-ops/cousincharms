'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';
import { Button } from './Button';
import { Icon } from './Icon';
import { ProductCard } from './ProductCard';
import { CHARMS } from '../_lib/charms';
import { useStore } from '../_lib/store';

type Cat = 'all' | 'classics' | 'new';
type Sort = 'popular' | 'newest' | 'price-asc' | 'price-desc';

export function ShopGrid({
  initialCat = 'all',
  title = 'Pick one. Or two.',
  eyebrow = 'ALL CHARMS',
}: {
  initialCat?: Cat;
  title?: string;
  eyebrow?: string;
}) {
  const { addToCart, compareSet, toggleCompare } = useStore();
  const [cat, setCat] = useState<Cat>(initialCat);
  const [price, setPrice] = useState(60);
  const [sort, setSort] = useState<Sort>('popular');
  const [inStock, setInStock] = useState(false);

  const filtered = useMemo(() => {
    let list = CHARMS.filter((c) => c.price <= price);
    if (cat !== 'all') list = list.filter((c) => c.category === cat);
    if (inStock) list = list.filter((c) => c.stock > 0);
    const s = [...list];
    if (sort === 'popular') s.sort((a, b) => b.rating - a.rating);
    if (sort === 'price-asc') s.sort((a, b) => a.price - b.price);
    if (sort === 'price-desc') s.sort((a, b) => b.price - a.price);
    if (sort === 'newest') s.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
    return s;
  }, [cat, price, sort, inStock]);

  return (
    <div className="max-w-[1320px] mx-auto px-8 py-12">
      <header className="mb-10 relative">
        <div className="cc-eyebrow">{eyebrow}</div>
        <h1 className="cc-h2 mt-1">{title}</h1>
        <p className="text-[19px] leading-relaxed text-cc-ink-700 max-w-[520px] mt-2">
          {filtered.length} charms. Cast brass, mostly gold-plated. Every one about the size of a dime.
        </p>
        {compareSet.size > 0 && (
          <div className="mt-4 inline-flex items-center gap-4 bg-cc-yellow-100 border-[1.5px] border-cc-yellow-600 px-4 py-2.5 rounded-cc-md text-sm font-medium text-cc-ink-900 animate-cc-reveal">
            <span>
              <b>{compareSet.size}</b> selected to compare
            </span>
            <Link href="/compare">
              <Button size="sm" variant="dark">
                Compare side-by-side <Icon name="arrowRight" size={14} />
              </Button>
            </Link>
          </div>
        )}
      </header>

      <div className="grid grid-cols-1 md:grid-cols-[240px_1fr] gap-10">
        <aside className="flex flex-col gap-7 md:sticky md:top-[92px] md:self-start">
          <div className="flex flex-col gap-2">
            <div className="text-[13px] font-semibold">Category</div>
            {([
              { k: 'all', l: 'Everything' },
              { k: 'classics', l: 'The classics' },
              { k: 'new', l: 'New this week' },
            ] as { k: Cat; l: string }[]).map((o) => (
              <label key={o.k} className="flex gap-2 items-center text-sm text-cc-ink-700 cursor-pointer">
                <input type="radio" name="cat" checked={cat === o.k} onChange={() => setCat(o.k)} />
                <span>{o.l}</span>
              </label>
            ))}
          </div>

          <div className="flex flex-col gap-2">
            <div className="text-[13px] font-semibold">Price · up to ${price}</div>
            <input
              type="range"
              min={30}
              max={60}
              step={2}
              value={price}
              onChange={(e) => setPrice(Number(e.target.value))}
              className="w-full"
            />
            <div className="flex justify-between text-sm text-cc-ink-500">
              <span>$30</span>
              <span>$60</span>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <div className="text-[13px] font-semibold">Availability</div>
            <label className="flex gap-2 items-center text-sm text-cc-ink-700 cursor-pointer">
              <input type="checkbox" checked={inStock} onChange={(e) => setInStock(e.target.checked)} />
              <span>In stock only</span>
            </label>
          </div>

          <div className="flex flex-col gap-2">
            <div className="text-[13px] font-semibold">Sort by</div>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as Sort)}
              className="px-3 py-2.5 border-[1.5px] border-cc-border rounded-cc-sm bg-white text-sm cursor-pointer"
            >
              <option value="popular">Most loved</option>
              <option value="newest">Newest</option>
              <option value="price-asc">Price · low to high</option>
              <option value="price-desc">Price · high to low</option>
            </select>
          </div>
        </aside>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((c) => (
            <ProductCard
              key={c.id}
              charm={c}
              onAdd={addToCart}
              onCompare={toggleCompare}
              compareOn={compareSet.has(c.id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
