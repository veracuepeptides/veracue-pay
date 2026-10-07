import type { ReactNode } from 'react';

// Eyebrow pill + heavy uppercase display heading, the pairing used across the site.
export function Eyebrow({ children, dark = false }: { children: ReactNode; dark?: boolean }) {
  return (
    <span
      className={`inline-block rounded-full border px-3.5 py-1.5 font-editorial text-[10.5px] uppercase tracking-[0.2em] shadow-2xs sm:text-xs ${
        dark ? 'border-white/20 bg-white/10 text-sage' : 'border-almond bg-white text-sage'
      }`}
    >
      {children}
    </span>
  );
}

export function DisplayHeading({
  children,
  className = '',
  as: Tag = 'h2',
}: {
  children: ReactNode;
  className?: string;
  as?: 'h1' | 'h2' | 'h3';
}) {
  return (
    <Tag
      className={`font-heading text-[2rem] font-extrabold uppercase leading-[1.04] tracking-[-0.035em] sm:text-5xl lg:text-[4.25rem] ${className}`}
    >
      {children}
    </Tag>
  );
}
