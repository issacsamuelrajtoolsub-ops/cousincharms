'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '../../_components/Button';
import { Icon } from '../../_components/Icon';
import { findCharm } from '../../_lib/charms';
import { useStore } from '../../_lib/store';

export default function CheckoutPage() {
  const router = useRouter();
  const { cart, clearCart } = useStore();
  const total = cart.reduce((a, it) => a + it.qty * (findCharm(it.id)?.price ?? 0), 0);
  const ship = total > 50 ? 0 : 5;

  const onComplete = () => {
    clearCart();
    router.push('/order/done');
  };

  return (
    <div className="max-w-[1200px] mx-auto px-8 pt-6 pb-20">
      <Link href="/shop" className="text-sm font-medium text-cc-ink-700 hover:text-cc-ink-950 inline-flex gap-1.5 items-center mb-6">
        <Icon name="arrowLeft" size={16} /> Back to bag
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-[1.3fr_1fr] gap-10 mt-4">
        <div className="bg-white border-[1.5px] border-cc-border rounded-cc-xl p-8">
          <div className="cc-eyebrow">STEP 1 · SHIP TO</div>
          <div className="grid grid-cols-2 gap-3.5 mt-3">
            {[
              { l: 'Full name', v: 'Maya Torres', span: true },
              { l: 'Email', v: 'maya@cousin.co', type: 'email', span: true },
              { l: 'Street', v: '212 Mulberry St', span: true },
              { l: 'City', v: 'Boise' },
              { l: 'State', v: 'ID' },
              { l: 'ZIP', v: '83702' },
            ].map((f) => (
              <label key={f.l} className={`flex flex-col gap-1.5 text-[13px] font-medium text-cc-ink-800 ${f.span ? 'col-span-2' : ''}`}>
                {f.l}
                <input
                  type={f.type ?? 'text'}
                  defaultValue={f.v}
                  className="px-3.5 py-2.5 border-[1.5px] border-cc-border rounded-cc-sm bg-cc-bg-warm text-[15px] outline-none focus:border-cc-ink-950 focus:bg-white transition-colors"
                />
              </label>
            ))}
          </div>

          <div className="cc-eyebrow mt-8">STEP 2 · PAY WITH</div>
          <div className="mt-3 flex items-center gap-3.5 px-5 py-4 border-2 border-cc-ink-950 rounded-cc-md bg-cc-bg-warm">
            <div className="w-7 h-7 bg-cc-yellow-400 text-cc-ink-950 rounded-full inline-flex items-center justify-center border-[1.5px] border-cc-ink-950">
              <Icon name="check" size={18} />
            </div>
            <div className="flex-1">
              <div className="font-semibold text-base">
                <span style={{ color: '#4285F4' }}>G</span>
                <span style={{ color: '#EA4335' }}>o</span>
                <span style={{ color: '#FBBC05' }}>o</span>
                <span style={{ color: '#4285F4' }}>g</span>
                <span style={{ color: '#34A853' }}>l</span>
                <span style={{ color: '#EA4335' }}>e</span>
                <span className="ml-1.5 text-cc-ink-950">Pay</span>
              </div>
              <div className="text-sm text-cc-ink-500">Selected. We&apos;ll confirm on the next tap.</div>
            </div>
            <span className="text-[11px] font-medium uppercase tracking-[0.1em] text-cc-ink-500">only option for now</span>
          </div>

          <Button size="lg" onClick={onComplete} className="w-full mt-8">
            <Icon name="lock" size={16} /> Pay ${total + ship}.00 with GPay
          </Button>
          <p className="text-xs text-cc-ink-500 text-center mt-3">
            We&apos;ll only charge once Google confirms. No funny stuff.
          </p>
        </div>

        <aside className="bg-cc-bg-warm border-[1.5px] border-cc-border rounded-cc-xl p-7 h-fit lg:sticky lg:top-[92px]">
          <h3 className="font-display italic text-[26px] m-0 mb-4">Order summary</h3>
          {cart.map((it) => {
            const c = findCharm(it.id);
            if (!c) return null;
            return (
              <div key={it.id} className="flex gap-3 items-center py-2.5 border-b border-dashed border-cc-border">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={c.img} alt={c.name} style={{ width: 48, height: 60 }} />
                <div className="flex-1">
                  <div className="font-display italic">{c.name}</div>
                  <div className="text-sm text-cc-ink-500">Qty {it.qty}</div>
                </div>
                <div className="cc-tabular">${c.price * it.qty}.00</div>
              </div>
            );
          })}
          <hr className="border-0 border-t border-dashed border-cc-border my-4" />
          <div className="flex justify-between py-1.5 text-sm text-cc-ink-700 cc-tabular">
            <span>Subtotal</span>
            <span>${total}.00</span>
          </div>
          <div className="flex justify-between py-1.5 text-sm text-cc-ink-700 cc-tabular">
            <span>Shipping</span>
            <span>{ship === 0 ? 'Free' : `$${ship}.00`}</span>
          </div>
          <div className="flex justify-between py-3 mt-1.5 border-t-[1.5px] border-cc-ink-950 font-semibold text-base text-cc-ink-950">
            <span>Total</span>
            <span className="font-display italic text-[22px]">${total + ship}.00</span>
          </div>
        </aside>
      </div>
    </div>
  );
}
