'use client';

import Link from 'next/link';
import { AuthShell, AuthInput } from '../../_components/AuthShell';

export default function AdminLoginPage() {
  return (
    <AuthShell
      side={{
        admin: true,
        title: (
          <>
            Studio-only.<br />For the people making them.
          </>
        ),
        sub: 'Cousin Charms admin. Manage products, track orders, keep things moving.',
      }}
    >
      <form onSubmit={(e) => e.preventDefault()} className="flex flex-col gap-4 animate-cc-reveal">
        <div
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-semibold tracking-[0.12em] uppercase w-fit"
          style={{
            background: 'rgba(247,201,72,0.15)',
            color: 'var(--color-cc-yellow-700)',
            border: '1px solid var(--color-cc-yellow-600)',
          }}
        >
          ⚿ Restricted
        </div>
        <h1 className="font-display text-[38px] leading-[1.1] tracking-[-0.02em] m-0">
          Studio <em className="italic" style={{ color: 'var(--color-cc-yellow-700)' }}>login.</em>
        </h1>
        <p className="text-cc-ink-600 m-0 text-[15px]">
          Just staff, please. If you&apos;re shopping,{' '}
          <Link href="/auth" className="text-cc-yellow-700 border-b border-cc-yellow-700">
            head this way
          </Link>
          .
        </p>

        <AuthInput label="Staff email" type="email" placeholder="you@cousincharms.studio" defaultValue="studio@cousincharms.co" />
        <AuthInput label="Password" type="password" placeholder="••••••••" />
        <AuthInput label="2-factor code" placeholder="6-digit from your authenticator" />

        <Link
          href="/admin"
          className="bg-cc-ink-950 text-cc-yellow-400 px-3.5 py-3.5 border-[1.5px] border-cc-yellow-400 rounded-cc-md font-semibold text-[15px] cursor-pointer transition-all hover:-translate-y-px text-center"
          style={{ boxShadow: '0 10px 30px -6px rgba(247, 201, 72, 0.3)' }}
        >
          Enter studio →
        </Link>

        <p className="text-[13px] text-cc-ink-500 text-center">
          Not you?{' '}
          <Link href="/auth" className="text-cc-yellow-700 border-b border-cc-yellow-700">
            Customer login
          </Link>
        </p>
      </form>
    </AuthShell>
  );
}
