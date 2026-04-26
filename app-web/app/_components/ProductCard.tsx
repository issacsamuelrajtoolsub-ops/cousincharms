'use client';

import Link from 'next/link';
import { Icon } from './Icon';
import type { Charm } from '../_lib/charms';

export function ProductCard({
  charm,
  onAdd,
  onCompare,
  compareOn,
}: {
  charm: Charm;
  onAdd: (id: string) => void;
  onCompare?: (id: string) => void;
  compareOn?: boolean;
}) {
  const eyebrow = charm.popular ? '★ BESTSELLER' : charm.category === 'new' ? 'NEW THIS WEEK' : 'THE CLASSICS';
  const eyebrowColor = charm.popular ? 'text-cc-yellow-700' : 'text-cc-ink-500';

  return (
    <article className="group bg-white border-[1.5px] border-cc-border rounded-cc-lg p-3.5 flex flex-col gap-3 transition-all duration-200 hover:border-cc-ink-300 hover:shadow-cc-md hover:-translate-y-0.5 animate-cc-reveal">
      <Link href={`/products/${charm.id}`} className="relative aspect-square rounded-cc-md bg-cc-ink-50 flex items-center justify-center overflow-hidden cursor-pointer">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={charm.img}
          alt={charm.name}
          className="w-[72%] h-[72%] animate-cc-float transition-transform duration-500 group-hover:-translate-y-2 group-hover:-rotate-2"
        />
        {charm.isNew && (
          <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-[10px] font-semibold tracking-wider bg-cc-yellow-400 text-cc-ink-950 border-[1.5px] border-cc-ink-950">
            ✦ New
          </span>
        )}
        {charm.stock <= 3 && (
          <span className="absolute bottom-3 right-3 px-2.5 py-1 rounded-full text-[10px] font-semibold tracking-wider bg-cc-danger-soft text-cc-danger border-[1.5px] border-cc-danger">
            Only {charm.stock} left
          </span>
        )}
      </Link>

      <div className="flex flex-col gap-1.5 px-1 pb-1">
        <div className={`cc-eyebrow ${eyebrowColor}`} style={{ color: 'inherit' }}>{eyebrow}</div>
        <Link href={`/products/${charm.id}`} className="font-display italic font-medium text-[20px] mt-1 cursor-pointer hover:text-cc-yellow-700 transition-colors">
          {charm.name}
        </Link>
        <div className="flex justify-between items-center mt-1">
          <div className="font-display italic text-[19px] cc-tabular">
            ${charm.price}.<small className="text-xs align-top">00</small>
          </div>
          <button
            onClick={() => onAdd(charm.id)}
            className="bg-cc-ink-950 text-white px-3 py-1.5 rounded-full text-xs font-semibold inline-flex items-center gap-1 cursor-pointer transition-colors hover:bg-cc-yellow-500 hover:text-cc-ink-950"
          >
            <Icon name="plus" size={16} /> Bag
          </button>
        </div>
        {onCompare && (
          <label className="text-xs font-medium text-cc-ink-500 inline-flex gap-1.5 items-center cursor-pointer mt-1">
            <input type="checkbox" checked={!!compareOn} onChange={() => onCompare(charm.id)} />
            Compare
          </label>
        )}
      </div>
    </article>
  );
}
