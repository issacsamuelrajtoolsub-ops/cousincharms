'use client';

import { Fragment } from 'react';
import Link from 'next/link';
import { Button } from '../../_components/Button';
import { Icon } from '../../_components/Icon';
import { CousinAvatar } from '../../_components/CousinAvatar';
import { CHARMS } from '../../_lib/charms';
import { useStore } from '../../_lib/store';

export default function ComparePage() {
  const { compareSet, addToCart } = useStore();
  const list = CHARMS.filter((c) => compareSet.has(c.id));

  if (list.length === 0) {
    return (
      <div className="max-w-[600px] mx-auto px-8 py-20 flex flex-col items-center gap-4 text-center">
        <CousinAvatar size={100} />
        <h2 className="cc-h2">Nothing to compare yet.</h2>
        <p className="text-[19px] leading-relaxed text-cc-ink-700">Pick two or more charms to see them side-by-side.</p>
        <Link href="/shop">
          <Button>Back to shop</Button>
        </Link>
      </div>
    );
  }

  const rows: { k: keyof (typeof CHARMS)[number] | 'img'; l: string; fmt?: (v: unknown) => string }[] = [
    { k: 'img', l: '' },
    { k: 'name', l: 'Name' },
    { k: 'price', l: 'Price', fmt: (v) => `$${v}.00` },
    { k: 'material', l: 'Material' },
    { k: 'size', l: 'Size' },
    { k: 'rating', l: 'Rating', fmt: (v) => `★ ${v}` },
    { k: 'stock', l: 'In stock' },
  ];

  return (
    <div className="max-w-[1200px] mx-auto px-8 pt-6 pb-20">
      <Link href="/shop" className="text-sm font-medium text-cc-ink-700 hover:text-cc-ink-950 inline-flex gap-1.5 items-center mb-6">
        <Icon name="arrowLeft" size={16} /> Back to shop
      </Link>
      <div className="cc-eyebrow">SIDE BY SIDE</div>
      <h1 className="cc-h2 mt-1">Which one&apos;s yours?</h1>

      <div
        className="grid bg-white border-[1.5px] border-cc-border rounded-cc-lg overflow-hidden mt-6"
        style={{ gridTemplateColumns: `160px repeat(${list.length}, 1fr)` }}
      >
        {rows.map((r) => (
          <Fragment key={r.k as string}>
            <div className="px-5 py-4 text-[13px] font-semibold uppercase tracking-[0.12em] bg-cc-bg-inset border-b border-cc-border">
              {r.l}
            </div>
            {list.map((c) => (
              <div
                key={c.id}
                className={`px-5 py-4 text-[15px] text-cc-ink-800 border-b border-cc-border-soft border-l border-cc-border-soft flex items-center ${
                  r.k === 'img' ? '!p-6 min-h-[180px] justify-center bg-cc-yellow-50' : ''
                }`}
              >
                {r.k === 'img' ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={c.img} alt={c.name} style={{ width: '80%', maxWidth: 140 }} />
                ) : r.k === 'name' ? (
                  <span className="font-display italic text-xl">{c.name}</span>
                ) : (
                  <span className={r.k === 'price' || r.k === 'rating' || r.k === 'stock' ? 'cc-tabular' : ''}>
                    {r.fmt ? r.fmt((c as Record<string, unknown>)[r.k as string]) : String((c as Record<string, unknown>)[r.k as string])}
                  </span>
                )}
              </div>
            ))}
          </Fragment>
        ))}

        <div />
        {list.map((c) => (
          <div key={c.id} className="p-3">
            <Button onClick={() => addToCart(c.id)} className="w-full">
              Add to bag
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}
