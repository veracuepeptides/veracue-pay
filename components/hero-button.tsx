import type { MouseEventHandler, ReactNode } from 'react';
import { ArrowRight } from 'lucide-react';

type Variant = 'primary' | 'secondary' | 'olive';
type Size = 'md' | 'lg';

interface HeroButtonProps {
  children: ReactNode;
  href?: string;
  variant?: Variant;
  size?: Size;
  className?: string;
  type?: 'button' | 'submit';
  disabled?: boolean;
  onClick?: MouseEventHandler<HTMLElement>;
  icon?: ReactNode;
}

const COLORS: Record<Variant, string> = {
  primary: 'bg-obsidian text-linen border-obsidian hover:bg-terracotta hover:border-terracotta hover:text-obsidian',
  secondary: 'bg-white text-obsidian border-stone/70 hover:bg-sage hover:border-sage hover:text-white',
  olive: 'bg-sage text-linen border-sage hover:bg-obsidian hover:border-obsidian',
};

const BADGES: Record<Variant, string> = {
  primary: 'bg-white text-obsidian',
  secondary: 'bg-obsidian text-white group-hover:bg-white group-hover:text-obsidian',
  olive: 'bg-white text-obsidian',
};

const SIZES: Record<Size, { pill: string; badge: string }> = {
  md: { pill: 'h-12 pl-6 pr-1.5 text-[14.5px] gap-4', badge: 'h-9 w-9' },
  lg: { pill: 'h-14 pl-7 pr-2 text-[15.5px] gap-5', badge: 'h-10 w-10' },
};

// The signature pill: a capsule with a round badge whose arrow slides through on hover.
export function HeroButton({
  children,
  href,
  variant = 'primary',
  size = 'md',
  className = '',
  type = 'button',
  disabled,
  onClick,
  icon,
}: HeroButtonProps) {
  const classes = `group relative inline-flex max-w-full items-center justify-between overflow-hidden whitespace-nowrap rounded-full border font-heading font-semibold tracking-tight shadow-[0_2px_10px_rgba(32,34,28,0.08)] transition-colors duration-300 ${COLORS[variant]} ${SIZES[size].pill} ${
    disabled ? 'pointer-events-none opacity-60' : ''
  } ${className}`;

  const inner = (
    <>
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-1000 ease-out group-hover:translate-x-full"
      />
      <span className="relative truncate transition-transform duration-300 group-hover:translate-x-0.5">{children}</span>
      <span
        className={`relative flex shrink-0 items-center justify-center overflow-hidden rounded-full transition-colors duration-300 ${BADGES[variant]} ${SIZES[size].badge}`}
      >
        {icon ? (
          icon
        ) : (
          <>
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-6" strokeWidth={2.2} />
            <ArrowRight
              className="absolute h-4 w-4 -translate-x-6 transition-transform duration-300 group-hover:translate-x-0"
              strokeWidth={2.2}
            />
          </>
        )}
      </span>
    </>
  );

  if (href) {
    return (
      <a href={href} onClick={onClick} className={classes}>
        {inner}
      </a>
    );
  }

  return (
    <button type={type} disabled={disabled} onClick={onClick} className={classes}>
      {inner}
    </button>
  );
}
