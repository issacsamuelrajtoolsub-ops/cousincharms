import Link from 'next/link';
import { Button } from '../../_components/Button';
import { Icon } from '../../_components/Icon';
import { FloatingCharm } from '../../_components/FloatingCharm';
import { Footer } from '../../_components/Footer';

export default function AboutPage() {
  return (
    <div className="max-w-[1320px] mx-auto px-8">
      <section className="grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] gap-12 items-center pt-20 pb-16">
        <div>
          <div className="cc-eyebrow">OUR STORY</div>
          <h1 className="cc-h1 mt-3 mb-4">
            Made by hand, <em className="cc-swash">passed along.</em>
          </h1>
          <p className="text-[19px] leading-relaxed text-cc-ink-700 max-w-[520px]">
            Cousin Charms is a small studio in Boise, Idaho. We cast every charm in solid brass, polish it,
            plate it, and tie a tiny jump ring through it ourselves. No factory line, no rush.
          </p>
          <p className="text-[19px] leading-relaxed text-cc-ink-700 max-w-[520px] mt-4">
            We started in 2024 making one charm — a heart — for a cousin&apos;s wedding. People asked where it was from,
            and the rest of the catalogue grew from there.
          </p>
          <Link href="/shop" className="inline-block mt-6">
            <Button size="lg">
              Browse the catalogue <Icon name="arrowRight" size={18} />
            </Button>
          </Link>
        </div>
        <div className="hidden lg:flex justify-center gap-6">
          <FloatingCharm src="/assets/charm-heart.svg" delay={0} size={150} angle={-3} />
          <FloatingCharm src="/assets/charm-key.svg" delay={-1.6} size={150} angle={4} />
          <FloatingCharm src="/assets/charm-clover.svg" delay={-3} size={150} angle={-2} />
        </div>
      </section>

      <Footer />
    </div>
  );
}
