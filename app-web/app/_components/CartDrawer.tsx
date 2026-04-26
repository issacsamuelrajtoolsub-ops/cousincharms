'use client';

import Link from 'next/link';
import { Icon } from './Icon';
import { Button } from './Button';
import { CousinAvatar } from './CousinAvatar';
import { useStore } from '../_lib/store';
import { findCharm } from '../_lib/charms';

export function CartDrawer() {
  const { cartOpen, cart, closeCart, removeFromCart } = useStore();
  const total = cart.reduce((a, it) => a + it.qty * (findCharm(it.id)?.price ?? 0), 0);

  return (
    <>
      <div
        className={`fixed inset-0 bg-cc-ink-950/50 backdrop-blur-sm z-[100] transition-opacity duration-300 ${
          cartOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={closeCart}
      />
      <aside
        className={`fixed top-0 right-0 bottom-0 w-[420px] max-w-[92vw] bg-cc-bg-warm z-[101] transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] flex flex-col ${
          cartOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <header className="flex items-center justify-between px-6 py-5 border-b border-cc-border">
          <h3 className="font-display italic text-[26px] m-0">Your bag</h3>
          <button
            onClick={closeCart}
            className="w-9 h-9 rounded-cc-sm inline-flex items-center justify-center text-cc-ink-800 hover:bg-cc-ink-100 cursor-pointer"
            aria-label="Close cart"
          >
            <Icon name="close" size={18} />
          </button>
        </header>

        {cart.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center gap-4 p-6 text-center">
            <CousinAvatar size={100} />
            <p className="text-[19px] text-cc-ink-700">Nothing in here yet. That&apos;s fixable.</p>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-auto px-6 py-4">
              {cart.map((it) => {
                const c = findCharm(it.id);
                if (!c) return null;
                return (
                  <div key={it.id} className="flex gap-3.5 items-center py-3 border-b border-dashed border-cc-border">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={c.img} alt={c.name} style={{ width: 56, height: 70 }} />
                    <div className="flex-1">
                      <div className="font-display italic text-[17px]">{c.name}</div>
                      <div className="text-sm text-cc-ink-500 cc-tabular">Qty {it.qty} · ${c.price * it.qty}.00</div>
                    </div>
                    <button
                      onClick={() => removeFromCart(it.id)}
                      className="w-9 h-9 rounded-cc-sm inline-flex items-center justify-center text-cc-ink-800 hover:bg-cc-ink-100 cursor-pointer"
                      aria-label={`Remove ${c.name}`}
                    >
                      <Icon name="trash" size={16} />
                    </button>
                  </div>
                );
              })}
            </div>
            <footer className="px-6 py-5 border-t border-cc-border bg-white">
              <div className="flex justify-between items-baseline mb-3 text-xl">
                <span className="font-medium">Subtotal</span>
                <span className="font-display italic">${total}.00</span>
              </div>
              <Link href="/checkout" onClick={closeCart} className="block">
                <Button size="lg" className="w-full">
                  Check out <Icon name="arrowRight" size={16} />
                </Button>
              </Link>
              <p className="text-xs text-cc-ink-500 text-center mt-2">
                You&apos;ll need an account for this part. It&apos;s quick.
              </p>
            </footer>
          </>
        )}
      </aside>
    </>
  );
}
