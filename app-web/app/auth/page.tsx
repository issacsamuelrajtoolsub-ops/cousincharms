'use client';

import Link from 'next/link';
import { AuthShell, AuthInput } from '../_components/AuthShell';

export default function LoginPage() {
  return (
    <AuthShell
      side={{
        title: (
          <>
            Charms for the people you call <em className="italic" style={{ color: 'var(--color-cc-yellow-400)' }}>cousin.</em>
          </>
        ),
        sub: 'Log in to keep track of your bag, saved charms, and orders on the way.',
      }}
    >
      <form onSubmit={(e) => e.preventDefault()} className="flex flex-col gap-4 animate-cc-reveal">
        <div className="cc-eyebrow">WELCOME BACK</div>
        <h1 className="font-display text-[38px] leading-[1.1] tracking-[-0.02em] m-0">
          Hey <em className="italic" style={{ color: 'var(--color-cc-yellow-700)' }}>you.</em>
        </h1>
        <p className="text-cc-ink-600 m-0 text-[15px]">Log in to pick up where you left off.</p>

        <div className="grid grid-cols-2 gap-1 p-1 bg-cc-ink-100 rounded-cc-md">
          <span className="text-center py-2.5 rounded-[10px] text-sm font-semibold bg-white text-cc-ink-950 shadow-cc-xs">Log in</span>
          <Link href="/auth/signup" className="text-center py-2.5 rounded-[10px] text-sm font-semibold text-cc-ink-700">
            Sign up
          </Link>
        </div>

        <AuthInput label="Email" type="email" placeholder="you@cousin.co" defaultValue="maya@cousin.co" />
        <AuthInput label="Password" type="password" placeholder="••••••••" defaultValue="password" />

        <button
          type="submit"
          className="bg-cc-yellow-400 text-cc-ink-950 px-3.5 py-3.5 border-[1.5px] border-cc-ink-950 rounded-cc-md font-semibold text-[15px] cursor-pointer transition-all hover:-translate-y-px hover:shadow-cc-glow inline-flex items-center justify-center gap-2"
        >
          Log in →
        </button>

        <div className="flex items-center gap-3 my-1 text-cc-ink-400 text-xs">
          <span className="flex-1 h-px bg-cc-border" /> or <span className="flex-1 h-px bg-cc-border" />
        </div>

        <button
          type="button"
          className="bg-white border-[1.5px] border-cc-border rounded-cc-md px-3.5 py-3 font-medium text-sm cursor-pointer inline-flex items-center justify-center gap-2 hover:bg-cc-ink-50 hover:border-cc-ink-300 transition-colors"
        >
          <svg width="16" height="16" viewBox="0 0 24 24">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
          </svg>
          Continue with Google
        </button>

        <p className="text-[13px] text-cc-ink-500 text-center">
          New here?{' '}
          <Link href="/auth/signup" className="text-cc-yellow-700 border-b border-cc-yellow-700">
            Make an account
          </Link>
        </p>
        <p className="text-[13px] text-cc-ink-500 text-center -mt-2">
          Are you staff?{' '}
          <Link href="/auth/admin" className="text-cc-yellow-700 border-b border-cc-yellow-700">
            Studio login
          </Link>
        </p>
      </form>
    </AuthShell>
  );
}
