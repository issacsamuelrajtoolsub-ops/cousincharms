'use client';

import { useEffect, useRef, useState, type CSSProperties } from 'react';

export function CousinAvatar({ size = 120, style }: { size?: number; style?: CSSProperties }) {
  const ref = useRef<HTMLDivElement>(null);
  const [eye, setEye] = useState({ x: 0, y: 0 });
  const [blink, setBlink] = useState(false);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      if (!ref.current) return;
      const r = ref.current.getBoundingClientRect();
      const cx = r.left + r.width / 2;
      const cy = r.top + r.height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      const d = Math.hypot(dx, dy) || 1;
      setEye({ x: (dx / d) * Math.min(3, d / 40), y: (dy / d) * Math.min(3, d / 40) });
    };
    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  useEffect(() => {
    let t: ReturnType<typeof setTimeout>;
    const loop = () => {
      setBlink(true);
      setTimeout(() => setBlink(false), 140);
      t = setTimeout(loop, 3000 + Math.random() * 3000);
    };
    t = setTimeout(loop, 2000);
    return () => clearTimeout(t);
  }, []);

  return (
    <div
      ref={ref}
      style={{ width: size, height: size * 1.33, animation: 'cc-float 4s ease-in-out infinite', ...style }}
    >
      <svg viewBox="0 0 120 160" width="100%" height="100%">
        <defs>
          <radialGradient id="av-body2" cx="0.4" cy="0.35" r="0.7">
            <stop offset="0" stopColor="#FFF3C4" />
            <stop offset="0.6" stopColor="#F7C948" />
            <stop offset="1" stopColor="#CB6E17" />
          </radialGradient>
        </defs>
        <path d="M 60 0 L 60 32" stroke="#2B231C" strokeWidth="1.5" strokeDasharray="0 5" strokeLinecap="round" />
        <circle cx="60" cy="36" r="5" fill="none" stroke="#2B231C" strokeWidth="2" />
        <rect x="56" y="40" width="8" height="10" rx="2" fill="#FBF7EC" stroke="#2B231C" strokeWidth="1.5" />
        <circle cx="60" cy="95" r="42" fill="url(#av-body2)" stroke="#2B231C" strokeWidth="2.5" />
        <circle cx="60" cy="95" r="36" fill="none" stroke="#2B231C" strokeWidth="0.8" opacity="0.3" />
        <circle cx="48" cy="88" r="5" fill="#FBF7EC" stroke="#2B231C" strokeWidth="1.5" />
        <circle cx="72" cy="88" r="5" fill="#FBF7EC" stroke="#2B231C" strokeWidth="1.5" />
        {!blink && (
          <>
            <circle cx={48 + eye.x} cy={88 + eye.y} r="2.2" fill="#1A1612" />
            <circle cx={72 + eye.x} cy={88 + eye.y} r="2.2" fill="#1A1612" />
          </>
        )}
        {blink && (
          <>
            <path d="M 43 88 L 53 88" stroke="#1A1612" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M 67 88 L 77 88" stroke="#1A1612" strokeWidth="1.5" strokeLinecap="round" />
          </>
        )}
        <ellipse cx="43" cy="102" rx="5" ry="3" fill="#B44D12" opacity="0.35" />
        <ellipse cx="77" cy="102" rx="5" ry="3" fill="#B44D12" opacity="0.35" />
        <path d="M 50 106 Q 60 114, 70 106" stroke="#2B231C" strokeWidth="2" fill="none" strokeLinecap="round" />
        <path d="M 90 68 L 91.5 72 L 95.5 73.5 L 91.5 75 L 90 79 L 88.5 75 L 84.5 73.5 L 88.5 72 Z" fill="#FFFBEA" opacity="0.9" />
      </svg>
    </div>
  );
}
