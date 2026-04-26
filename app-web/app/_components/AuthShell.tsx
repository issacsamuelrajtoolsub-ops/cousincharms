'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { ReactNode } from 'react';

export function AuthShell({
  side,
  children,
}: {
  side: { admin?: boolean; title: ReactNode; sub: ReactNode };
  children: ReactNode;
}) {
  const pathname = usePathname();
  const which = pathname?.endsWith('/admin') ? 'admin' : pathname?.endsWith('/signup') ? 'signup' : 'login';

  const tabs = [
    { href: '/auth', l: 'Customer · Log in', k: 'login' },
    { href: '/auth/signup', l: 'Sign up', k: 'signup' },
    { href: '/auth/admin', l: 'Studio', k: 'admin' },
  ];

  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2">
      {/* SIDE */}
      <div
        className={`relative overflow-hidden p-12 hidden md:flex flex-col justify-between ${
          side.admin ? '' : ''
        }`}
        style={{
          background: side.admin
            ? '#1A1612 radial-gradient(circle at 30% 20%, rgba(247,201,72,0.08) 0%, transparent 50%)'
            : 'var(--color-cc-ink-950)',
          color: 'var(--color-cc-ink-50)',
        }}
      >
        <div className="flex items-center gap-2.5 font-display text-[22px]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/assets/logo-mark.svg" width={34} height={34} alt="" style={{ filter: 'invert(1) brightness(0.95)' }} />
          <span>
            Cousin <em className="italic" style={{ color: 'var(--color-cc-yellow-400)' }}>Charms</em>
          </span>
        </div>
        <div>
          {side.admin && (
            <div
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-semibold tracking-[0.12em] uppercase mb-3"
              style={{
                background: 'rgba(247,201,72,0.12)',
                color: 'var(--color-cc-yellow-400)',
                border: '1px solid rgba(247,201,72,0.3)',
              }}
            >
              ⚿ Studio access
            </div>
          )}
          <h1 className="font-display text-[48px] leading-[1.1] tracking-[-0.02em] max-w-[400px]">
            {side.title}
          </h1>
          <p className="text-base max-w-[380px] mt-4" style={{ color: 'var(--color-cc-ink-200)' }}>
            {side.sub}
          </p>
          {!side.admin && (
            <div className="flex gap-2 mt-6">
              <span className="px-3 py-1.5 rounded-full text-xs font-medium" style={{ background: 'var(--color-cc-ink-800)', color: 'var(--color-cc-ink-100)' }}>
                Free over $50
              </span>
              <span className="px-3 py-1.5 rounded-full text-xs font-medium" style={{ background: 'var(--color-cc-ink-800)', color: 'var(--color-cc-ink-100)' }}>
                30-day returns
              </span>
            </div>
          )}
        </div>
        {!side.admin && (
          <div className="absolute right-[-20px] bottom-[-30px] flex gap-3.5 opacity-95 pointer-events-none">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/assets/charm-heart.svg" alt="" style={{ width: 120, animation: 'cc-float 6s ease-in-out 0s infinite' }} />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/assets/charm-moon.svg" alt="" style={{ width: 120, animation: 'cc-float 6s ease-in-out -2s infinite' }} />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/assets/charm-star.svg" alt="" style={{ width: 120, animation: 'cc-float 6s ease-in-out -4s infinite' }} />
          </div>
        )}
      </div>

      {/* FORM */}
      <div className="flex items-center justify-center p-12">
        <div className="w-full max-w-[420px]">
          <div className="flex gap-1 p-1 bg-cc-ink-100 rounded-cc-md mb-6 w-fit">
            {tabs.map((t) => (
              <Link
                key={t.k}
                href={t.href}
                className={`px-4 py-2 rounded-[10px] text-[13px] font-semibold ${
                  which === t.k ? 'bg-white text-cc-ink-950 shadow-cc-xs' : 'text-cc-ink-700'
                }`}
              >
                {t.l}
              </Link>
            ))}
          </div>
          {children}
        </div>
      </div>
    </div>
  );
}

export function AuthInput({
  label,
  type = 'text',
  ...rest
}: { label: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-[13px] font-medium text-cc-ink-800">{label}</label>
      <input
        type={type}
        {...rest}
        className="px-3.5 py-3 border-[1.5px] border-cc-border rounded-cc-md bg-white text-[15px] text-cc-ink-950 outline-none transition-all focus:border-cc-ink-950 focus:ring-4 focus:ring-cc-yellow-100"
      />
    </div>
  );
}
