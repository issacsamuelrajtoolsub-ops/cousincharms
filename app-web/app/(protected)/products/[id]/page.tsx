'use client';

import Link from 'next/link';
import { use, useState } from 'react';
import { notFound } from 'next/navigation';
import { Button } from '../../../_components/Button';
import { Icon } from '../../../_components/Icon';
import { FloatingCharm } from '../../../_components/FloatingCharm';
import { findCharm } from '../../../_lib/charms';
import { useStore } from '../../../_lib/store';

export default function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const charm = findCharm(id);
  const { addToCart } = useStore();
  const [qty, setQty] = useState(1);

  if (!charm) notFound();

  const eyebrow = charm.isNew ? 'NEW THIS WEEK' : charm.popular ? 'BESTSELLER' : 'THE CLASSICS';

  return (
    <div className="max-w-[1200px] mx-auto px-8 pt-6 pb-20">
      <Link href="/shop" className="text-sm font-medium text-cc-ink-700 hover:text-cc-ink-950 inline-flex gap-1.5 items-center mb-6">
        <Icon name="arrowLeft" size={16} /> Keep looking
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] gap-14">
        <div
          className="border-[1.5px] border-cc-border rounded-cc-xl flex items-center justify-center min-h-[540px]"
          style={{ backgroundImage: 'radial-gradient(circle at 50% 40%, #FFF3C4, var(--color-cc-yellow-50) 70%)' }}
        >
          <FloatingCharm src={charm.img} delay={0} size={320} angle={0} />
        </div>

        <div className="flex flex-col gap-4 pt-4">
          <div className="cc-eyebrow">{eyebrow}</div>
          <h1 className="cc-h1 italic" style={{ fontSize: 52 }}>
            {charm.name}
          </h1>
          <div className="font-display italic text-[34px] cc-tabular my-1">
            ${charm.price}.<small className="text-lg align-top">00</small>
          </div>
          <p className="text-[19px] leading-relaxed text-cc-ink-700">{charm.desc}</p>

          <dl className="grid grid-cols-2 gap-3 my-5">
            {[
              { k: 'Material', v: charm.material },
              { k: 'Size', v: `${charm.size}-sized` },
              { k: 'Rating', v: `★ ${charm.rating} · 240 reviews` },
              { k: 'Stock', v: `${charm.stock} in stock` },
            ].map((row) => (
              <div key={row.k} className="bg-cc-bg-inset rounded-cc-sm px-3.5 py-3">
                <dt className="text-[11px] font-medium uppercase tracking-[0.12em] text-cc-ink-500">{row.k}</dt>
                <dd className="mt-1 text-sm font-medium text-cc-ink-900">{row.v}</dd>
              </div>
            ))}
          </dl>

          <div className="inline-flex items-center border-[1.5px] border-cc-ink-950 rounded-cc-md overflow-hidden w-fit">
            <button onClick={() => setQty(Math.max(1, qty - 1))} className="px-3.5 py-2.5 cursor-pointer hover:bg-cc-ink-100">
              <Icon name="minus" size={14} />
            </button>
            <span className="px-5 py-2.5 text-base font-medium cc-tabular border-x-[1.5px] border-cc-ink-950">{qty}</span>
            <button onClick={() => setQty(qty + 1)} className="px-3.5 py-2.5 cursor-pointer hover:bg-cc-ink-100">
              <Icon name="plus" size={14} />
            </button>
          </div>

          <div className="flex gap-3">
            <Button size="lg" onClick={() => addToCart(charm.id, qty)} className="flex-1">
              Add to bag · ${charm.price * qty}.00
            </Button>
            <Button size="lg" variant="secondary" className="!w-14 !p-0" aria-label="Save">
              <Icon name="heart" size={20} />
            </Button>
          </div>

          <div className="flex flex-wrap gap-5 mt-5 text-[13px] font-medium text-cc-ink-700">
            <span>✦ Free shipping over $50</span>
            <span>✦ 30-day returns</span>
            <span>✦ Gift-wrapped on request</span>
          </div>
        </div>
      </div>
    </div>
  );
}
