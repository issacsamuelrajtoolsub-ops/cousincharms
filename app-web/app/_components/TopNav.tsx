'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Icon } from './Icon';
import { useStore } from '../_lib/store';

const items = [
  { href: '/shop', label: 'Shop' },
  { href: '/new', label: 'New' },
  { href: '/compare', label: 'Compare' },
  { href: '/about', label: 'About' },
];

export function TopNav() {
  const pathname = usePathname();
  const { cartCount, openCart } = useStore();

  return (
    <nav className="sticky top-0 z-50 bg-cc-bg-warm/80 backdrop-blur-md border-b border-cc-border">
      <div className="max-w-[1320px] mx-auto flex items-center gap-9 px-8 py-3.5">
        <Link href="/home" className="flex items-center gap-2.5 shrink-0 leading-none whitespace-nowrap">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/assets/logo-mark.svg" width={34} height={34} alt="" />
          <span className="leading-none text-[22px] font-display">
            Cousin <em className="not-italic font-display italic">Charms</em>
          </span>
        </Link>

        <div className="hidden md:flex gap-6">
          {items.map((it) => {
            const active = pathname.startsWith(it.href);
            return (
              <Link
                key={it.href}
                href={it.href}
                className={`relative text-sm font-medium py-1.5 transition-colors ${
                  active ? 'text-cc-ink-950' : 'text-cc-ink-700 hover:text-cc-ink-950'
                } group`}
              >
                {it.label}
                <span
                  className={`pointer-events-none absolute left-0 right-0 -bottom-0.5 h-0.5 rounded bg-cc-yellow-500 transition-opacity ${
                    active ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
                  }`}
                />
              </Link>
            );
          })}
        </div>

        <div className="ml-auto flex items-center gap-5">
          <Link href="/auth" className="text-sm font-medium text-cc-ink-700 hover:text-cc-ink-950">
            Log in
          </Link>
          <button
            onClick={openCart}
            className="bg-cc-ink-950 text-white px-3.5 py-2.5 rounded-cc-md text-[13px] font-semibold inline-flex items-center gap-2 cursor-pointer transition-all hover:-translate-y-px hover:shadow-cc-md"
          >
            <Icon name="bag" size={16} />
            Bag
            <span className="bg-cc-yellow-400 text-cc-ink-950 px-2 py-0.5 rounded-full text-[11px]">{cartCount}</span>
          </button>
        </div>
      </div>
    </nav>
  );
}
