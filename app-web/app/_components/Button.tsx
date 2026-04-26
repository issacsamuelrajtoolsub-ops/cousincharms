import type { ButtonHTMLAttributes, ReactNode } from 'react';

type Variant = 'primary' | 'secondary' | 'ghost' | 'dark' | 'danger';
type Size = 'sm' | 'md' | 'lg';

const SIZES: Record<Size, string> = {
  sm: 'px-3.5 py-2 text-[13px] rounded-[10px]',
  md: 'px-[22px] py-3 text-[15px] rounded-[12px]',
  lg: 'px-7 py-4 text-[17px] rounded-[14px]',
};

const VARIANTS: Record<Variant, string> = {
  primary:
    'bg-cc-yellow-400 text-cc-ink-950 border-[1.5px] border-cc-ink-950 shadow-cc-sm hover:bg-cc-yellow-500 hover:-translate-y-px hover:shadow-cc-glow',
  secondary:
    'bg-white text-cc-ink-950 border-[1.5px] border-cc-ink-950 hover:bg-cc-ink-100',
  ghost:
    'bg-transparent text-cc-ink-950 border-[1.5px] border-transparent hover:bg-cc-ink-100',
  dark:
    'bg-cc-ink-950 text-white border-[1.5px] border-cc-ink-950 hover:bg-cc-ink-800',
  danger:
    'bg-cc-danger text-white border-[1.5px] border-cc-danger hover:opacity-90',
};

export function Button({
  variant = 'primary',
  size = 'md',
  children,
  className = '',
  type = 'button',
  ...rest
}: { variant?: Variant; size?: Size; children: ReactNode; className?: string } & ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      type={type}
      {...rest}
      className={`inline-flex items-center justify-center gap-2 font-semibold cursor-pointer transition-all duration-200 ease-[var(--ease-cc-out,cubic-bezier(0.22,1,0.36,1))] active:scale-[0.98] ${SIZES[size]} ${VARIANTS[variant]} ${className}`}
    >
      {children}
    </button>
  );
}
