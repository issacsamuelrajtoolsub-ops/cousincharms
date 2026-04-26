'use client';

import Link from 'next/link';
import { Button } from '../../../_components/Button';
import { Icon } from '../../../_components/Icon';
import { CousinAvatar } from '../../../_components/CousinAvatar';

export default function OrderDonePage() {
  return (
    <div className="max-w-[720px] mx-auto px-8 py-20 flex flex-col items-center gap-4 text-center">
      <CousinAvatar size={160} />
      <div className="cc-eyebrow">ORDER #CC-2847</div>
      <h1 className="cc-h1" style={{ fontSize: 60 }}>
        <em className="cc-swash">Thanks,</em> cousin.
      </h1>
      <p className="text-[19px] leading-relaxed text-cc-ink-700 max-w-[480px]">
        We&apos;ll pack these carefully and send a note when they&apos;re on the way. Usually 2–3 business days.
      </p>
      <Link href="/shop">
        <Button size="lg">
          Keep looking <Icon name="arrowRight" size={16} />
        </Button>
      </Link>
    </div>
  );
}
