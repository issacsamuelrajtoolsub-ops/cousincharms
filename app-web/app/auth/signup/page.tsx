'use client';

import Link from 'next/link';
import { AuthShell, AuthInput } from '../../_components/AuthShell';

export default function SignupPage() {
  return (
    <AuthShell
      side={{
        title: (
          <>
            Charms for the people you call <em className="italic" style={{ color: 'var(--color-cc-yellow-400)' }}>cousin.</em>
          </>
        ),
        sub: 'Make an account to save your bag, track shipments, and hear about new drops.',
      }}
    >
      <form onSubmit={(e) => e.preventDefault()} className="flex flex-col gap-4 animate-cc-reveal">
        <div className="cc-eyebrow">NEW TO COUSIN</div>
        <h1 className="font-display text-[38px] leading-[1.1] tracking-[-0.02em] m-0">
          Nice to <em className="italic" style={{ color: 'var(--color-cc-yellow-700)' }}>meet you.</em>
        </h1>
        <p className="text-cc-ink-600 m-0 text-[15px]">
          Takes about 20 seconds. We&apos;ll email you when things ship.
        </p>

        <div className="grid grid-cols-2 gap-1 p-1 bg-cc-ink-100 rounded-cc-md">
          <Link href="/auth" className="text-center py-2.5 rounded-[10px] text-sm font-semibold text-cc-ink-700">
            Log in
          </Link>
          <span className="text-center py-2.5 rounded-[10px] text-sm font-semibold bg-white text-cc-ink-950 shadow-cc-xs">Sign up</span>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <AuthInput label="First name" placeholder="Maya" />
          <AuthInput label="Last name" placeholder="Torres" />
        </div>
        <AuthInput label="Email" type="email" placeholder="you@cousin.co" />
        <AuthInput label="Password" type="password" placeholder="At least 8 characters" />

        <label className="flex gap-2.5 items-center text-[13px] text-cc-ink-700">
          <input type="checkbox" defaultChecked />
          Send me a note when new charms drop (no spam, promise)
        </label>

        <button
          type="submit"
          className="bg-cc-yellow-400 text-cc-ink-950 px-3.5 py-3.5 border-[1.5px] border-cc-ink-950 rounded-cc-md font-semibold text-[15px] cursor-pointer transition-all hover:-translate-y-px hover:shadow-cc-glow"
        >
          Create account →
        </button>

        <p className="text-[13px] text-cc-ink-500 text-center">
          Been here before?{' '}
          <Link href="/auth" className="text-cc-yellow-700 border-b border-cc-yellow-700">
            Log in
          </Link>
        </p>
      </form>
    </AuthShell>
  );
}
