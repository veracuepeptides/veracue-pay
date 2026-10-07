'use client';

import { useLayoutEffect, useRef, useState, type ReactNode } from 'react';

// Scales its child down (never up) so it always fits the height it is given. Lets the hero card keep
// the whole checkout panel visible on short laptop screens and small phones without clipping.
export function FitPanel({ children, className = '' }: { children: ReactNode; className?: string }) {
  const outer = useRef<HTMLDivElement>(null);
  const inner = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  useLayoutEffect(() => {
    const o = outer.current;
    const i = inner.current;
    if (!o || !i) return;

    const fit = () => {
      // +24 leaves room for the confirmation chip that hangs below the panel.
      const need = i.offsetHeight + 24;
      const next = Math.min(1, Math.max(0.5, o.clientHeight / need));
      setScale((prev) => (Math.abs(prev - next) < 0.005 ? prev : next));
    };

    fit();
    const ro = new ResizeObserver(fit);
    ro.observe(o);
    ro.observe(i);
    return () => ro.disconnect();
  }, []);

  return (
    <div ref={outer} className={`flex min-h-0 items-center ${className}`}>
      <div ref={inner} className="w-[350px] max-w-full" style={{ transform: `scale(${scale})`, transformOrigin: 'center' }}>
        {children}
      </div>
    </div>
  );
}
