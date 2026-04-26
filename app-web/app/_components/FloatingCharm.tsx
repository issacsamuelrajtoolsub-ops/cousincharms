import type { CSSProperties } from 'react';

export function FloatingCharm({
  src,
  delay = 0,
  size = 200,
  angle = 0,
  className = '',
  style,
}: {
  src: string;
  delay?: number;
  size?: number;
  angle?: number;
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <div
      className={className}
      style={{
        position: 'relative',
        width: size,
        height: size * 1.4,
        animation: `cc-float 5.5s ease-in-out ${delay}s infinite`,
        transformOrigin: 'top center',
        ...style,
      }}
    >
      {/* svg charms — alt is empty since they're decorative */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt="" style={{ width: '100%', height: '100%', transform: `rotate(${angle}deg)` }} />
    </div>
  );
}
