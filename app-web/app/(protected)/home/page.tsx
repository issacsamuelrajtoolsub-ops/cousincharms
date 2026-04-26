'use client';

import Link from 'next/link';
import { Button } from '../../_components/Button';
import { Icon } from '../../_components/Icon';
import { FloatingCharm } from '../../_components/FloatingCharm';
import { ProductCard } from '../../_components/ProductCard';
import { Footer } from '../../_components/Footer';
import { CHARMS } from '../../_lib/charms';
import { useStore } from '../../_lib/store';

export default function HomePage() {
  const { addToCart } = useStore();
  const featured = CHARMS.slice(0, 4);

  return (
    <div className="max-w-[1320px] mx-auto px-8">
      {/* HERO */}
      <section className="grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] gap-12 items-center pt-20 pb-16">
        <div>
          <div className="cc-eyebrow">SINCE 2024 · BOISE, IDAHO</div>
          <h1 className="cc-h1 mt-4 mb-5" style={{ fontSize: 'clamp(44px, 6vw, 84px)', letterSpacing: '-0.03em' }}>
            Charms for the people<br />
            you call <em className="cc-swash">cousin.</em>
          </h1>
          <p className="text-[19px] leading-relaxed text-cc-ink-700 max-w-[440px]">
            A small thing to hang on someone you love. Cast by hand, finished slowly, passed along.
          </p>
          <div className="flex gap-3 mt-6">
            <Link href="/shop">
              <Button size="lg">
                Shop all charms <Icon name="arrowRight" size={18} />
              </Button>
            </Link>
            <Link href="/about">
              <Button size="lg" variant="secondary">
                Our story
              </Button>
            </Link>
          </div>
        </div>
        <div className="relative h-[520px] hidden lg:block">
          <div
            className="relative w-full h-full rounded-cc-2xl"
            style={{ background: 'radial-gradient(circle at 60% 40%, var(--color-cc-yellow-100) 0%, transparent 65%)' }}
          >
            <FloatingCharm src="/assets/charm-heart.svg" delay={0} size={170} angle={-4} style={{ position: 'absolute', top: 0, left: 40 }} />
            <FloatingCharm src="/assets/charm-star.svg" delay={-1.5} size={140} angle={6} style={{ position: 'absolute', top: 30, right: 20 }} />
            <FloatingCharm src="/assets/charm-moon.svg" delay={-3} size={150} angle={-2} style={{ position: 'absolute', top: 200, left: 10 }} />
            <FloatingCharm src="/assets/charm-sun.svg" delay={-2.2} size={160} angle={3} style={{ position: 'absolute', top: 240, right: 60 }} />
          </div>
        </div>
      </section>

      {/* MARQUEE — full bleed */}
      <div className="relative left-1/2 right-1/2 -mx-[50vw] w-screen bg-cc-ink-950 text-white py-3.5 overflow-hidden">
        <div className="flex gap-10 whitespace-nowrap font-medium text-[13px] uppercase tracking-[0.12em]" style={{ animation: 'cc-marquee 35s linear infinite' }}>
          {Array.from({ length: 6 }).flatMap((_, i) => [
            <span key={`a${i}`} className="shrink-0">Free shipping over $50</span>,
            <span key={`b${i}`} className="shrink-0">✦</span>,
            <span key={`c${i}`} className="shrink-0">Hand-finished in small batches</span>,
            <span key={`d${i}`} className="shrink-0">✦</span>,
            <span key={`e${i}`} className="shrink-0">Gift-wrapped on request</span>,
            <span key={`f${i}`} className="shrink-0">✦</span>,
          ])}
        </div>
      </div>

      {/* FEATURED */}
      <section className="pt-20 pb-10">
        <div className="flex flex-col gap-2 mb-10 relative">
          <div className="cc-eyebrow">THE CLASSICS</div>
          <h2 className="cc-h2">Worth keeping.</h2>
          <Link
            href="/shop"
            className="absolute right-0 bottom-1.5 inline-flex items-center gap-1.5 text-sm font-medium border-b-[1.5px] border-cc-ink-950 pb-0.5"
          >
            See all 8 <Icon name="arrowRight" size={16} />
          </Link>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
          {featured.map((c) => (
            <ProductCard key={c.id} charm={c} onAdd={addToCart} />
          ))}
        </div>
      </section>

      {/* STORY STRIP */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center bg-cc-ink-950 rounded-cc-2xl px-14 py-16 my-10" style={{ color: 'var(--color-cc-ink-50)' }}>
        <div>
          <div className="font-semibold text-[12px] uppercase tracking-[0.14em]" style={{ color: 'var(--color-cc-ink-300)' }}>MADE SLOWLY</div>
          <h2 className="cc-h2 mt-2 max-w-[480px]" style={{ color: 'var(--color-cc-ink-50)' }}>
            Small batches, <em className="cc-swash">finished by hand.</em>
          </h2>
          <p className="text-[19px] leading-relaxed max-w-[480px] mt-3" style={{ color: 'var(--color-cc-ink-200)' }}>
            Every charm is cast in solid brass, polished, plated, and tied with a tiny jump ring by someone who takes their time.
          </p>
        </div>
        <div className="flex justify-center gap-5">
          <FloatingCharm src="/assets/charm-clover.svg" delay={-0.8} size={130} angle={-4} />
          <FloatingCharm src="/assets/charm-flower.svg" delay={-2.1} size={130} angle={3} />
          <FloatingCharm src="/assets/charm-butterfly.svg" delay={-1.2} size={130} angle={-2} />
        </div>
      </section>

      <Footer />
    </div>
  );
}
