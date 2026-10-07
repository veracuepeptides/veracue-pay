import type { CSSProperties } from 'react';
import { Check, Lock, ShoppingBag } from 'lucide-react';

/* Original vector artwork for VeracuePay, drawn in the Veracue palette. Everything here is pure
   SVG/CSS, so it stays crisp at any size and needs no image files. */

// ---------------------------------------------------------------------------------------------
// Payment card
// ---------------------------------------------------------------------------------------------
type Tone = 'obsidian' | 'sage' | 'terracotta' | 'linen';

const TONES: Record<Tone, string> = {
  obsidian: 'from-[#3a3d30] via-[#20221c] to-[#11120e] text-linen',
  sage: 'from-[#c2c2ad] via-[#a5a58d] to-[#8a8a73] text-obsidian',
  terracotta: 'from-[#e0b49b] via-[#cb997e] to-[#b07c5c] text-obsidian',
  linen: 'from-white via-[#fff1e6] to-[#eddcd2] text-obsidian',
};

// Sized in ems off a single pixel width, so the whole card scales as one object.
export function CardFace({
  tone = 'obsidian',
  size = 320,
  className = '',
  style,
}: {
  tone?: Tone;
  size?: number;
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <div
      aria-hidden
      className={`relative shrink-0 overflow-hidden rounded-[1.1em] bg-gradient-to-br shadow-[0_2.2em_4em_-1.2em_rgba(0,0,0,0.55)] ${TONES[tone]} ${className}`}
      style={{ width: size, height: size / 1.586, fontSize: size / 20, ...style }}
    >
      <div className="absolute inset-0 bg-[radial-gradient(120%_90%_at_0%_0%,rgba(255,255,255,0.26),transparent_55%)]" />
      <svg viewBox="0 0 100 63" className="absolute inset-0 h-full w-full" preserveAspectRatio="none" aria-hidden>
        <circle cx="92" cy="14" r="46" fill="none" stroke="currentColor" strokeOpacity="0.08" strokeWidth="0.5" />
        <circle cx="92" cy="14" r="34" fill="none" stroke="currentColor" strokeOpacity="0.08" strokeWidth="0.5" />
        <circle cx="92" cy="14" r="22" fill="none" stroke="currentColor" strokeOpacity="0.08" strokeWidth="0.5" />
      </svg>

      <div className="relative flex h-full flex-col justify-between p-[1.5em]">
        <div className="flex items-start justify-between">
          <span className="font-heading text-[0.95em] font-extrabold tracking-[0.34em]">PAY</span>
          <svg viewBox="0 0 24 24" className="h-[1.6em] w-[1.6em] opacity-70" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
            <path d="M8 8.5a5 5 0 0 1 0 7M11.5 6a8.5 8.5 0 0 1 0 12M15 3.5a12 12 0 0 1 0 17" />
          </svg>
        </div>

        <div className="h-[2.3em] w-[3em] rounded-[0.4em] bg-gradient-to-br from-[#f6dfbf] via-[#ddbea9] to-[#c9a285] shadow-inner">
          <div className="grid h-full w-full grid-cols-3 grid-rows-3 gap-px p-[0.35em] opacity-40">
            {Array.from({ length: 9 }).map((_, i) => (
              <span key={i} className="rounded-[1px] border border-obsidian/50" />
            ))}
          </div>
        </div>

        <div className="flex items-end justify-between">
          <span className="tnum font-heading text-[1.05em] font-medium tracking-[0.16em]">&bull;&bull;&bull;&bull; &nbsp;4242</span>
          <span className="font-editorial text-[0.8em] uppercase tracking-[0.25em] opacity-70">Debit</span>
        </div>
      </div>
    </div>
  );
}

// A fanned stack of cards used behind the hero checkout panel.
export function CardFan({ className = '' }: { className?: string }) {
  return (
    <div aria-hidden className={`relative h-[430px] w-[560px] ${className}`}>
      <div className="float-soft absolute left-0 top-[88px] -rotate-[16deg]" style={{ animationDelay: '-2s' }}>
        <CardFace tone="sage" size={340} />
      </div>
      <div className="float-soft absolute left-[84px] top-[20px] -rotate-[4deg]" style={{ animationDelay: '-5s' }}>
        <CardFace tone="terracotta" size={340} />
      </div>
      <div className="float-soft absolute left-[170px] top-[96px] rotate-[10deg]">
        <CardFace tone="obsidian" size={340} />
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------------------------
// Rings and glows
// ---------------------------------------------------------------------------------------------
export function RingsBackdrop({ className = '', cx = 70, cy = 50 }: { className?: string; cx?: number; cy?: number }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 100 100"
      preserveAspectRatio="xMidYMid slice"
      className={`pointer-events-none absolute inset-0 h-full w-full ${className}`}
    >
      {[14, 24, 34, 46, 60, 76].map((r, i) => (
        <circle key={r} cx={cx} cy={cy} r={r} fill="none" stroke="#fff1e6" strokeOpacity={0.1 - i * 0.012} strokeWidth="0.18" />
      ))}
    </svg>
  );
}

export function HeroBackdrop() {
  return (
    <div aria-hidden className="absolute inset-0 -z-10 overflow-hidden bg-[#161812]">
      <div className="absolute -left-24 top-1/3 h-[520px] w-[520px] rounded-full bg-sage/35 blur-[130px]" />
      <div className="absolute -right-20 -top-24 h-[480px] w-[480px] rounded-full bg-terracotta/30 blur-[130px]" />
      <div className="absolute bottom-0 left-1/3 h-[300px] w-[600px] rounded-full bg-sand/10 blur-[110px]" />
      <RingsBackdrop cx={52} cy={48} />
      <div
        className="absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage: 'radial-gradient(#fff1e6 1px, transparent 1px)',
          backgroundSize: '28px 28px',
        }}
      />
    </div>
  );
}

// ---------------------------------------------------------------------------------------------
// Step artwork (each fills its parent card)
// ---------------------------------------------------------------------------------------------
function StepBase({ glow, children }: { glow: string; children: React.ReactNode }) {
  return (
    <div aria-hidden className="absolute inset-0 overflow-hidden bg-[#1b1d17]">
      <div className={`absolute left-1/2 top-[34%] h-[70%] w-[90%] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[70px] ${glow}`} />
      <RingsBackdrop cx={50} cy={36} />
      {children}
      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />
    </div>
  );
}

export function StepOrderArt() {
  const rows = [
    ['bg-terracotta', 'w-[58%]', 'w-[34%]'],
    ['bg-sage', 'w-[48%]', 'w-[30%]'],
    ['bg-sand', 'w-[64%]', 'w-[26%]'],
  ];
  return (
    <StepBase glow="bg-terracotta/45">
      <div className="absolute left-1/2 top-[8%] w-[64%] -translate-x-1/2 -rotate-[5deg] rounded-[18px] bg-linen p-[7%] shadow-[0_30px_60px_-20px_rgba(0,0,0,0.7)]">
        <div className="flex items-center justify-between">
          <span className="h-2.5 w-[38%] rounded-full bg-obsidian/80" />
          <span className="h-2.5 w-[16%] rounded-full bg-obsidian/15" />
        </div>
        <div className="mt-[9%] space-y-[7%]">
          {rows.map(([swatch, a, b], i) => (
            <div key={i} className="flex items-center gap-[7%]">
              <span className={`h-9 w-9 shrink-0 rounded-lg ${swatch}`} />
              <div className="flex-1 space-y-1.5">
                <span className={`block h-2 rounded-full bg-obsidian/70 ${a}`} />
                <span className="block h-1.5 w-[40%] rounded-full bg-obsidian/15" />
              </div>
              <span className={`h-2 rounded-full bg-obsidian/70 ${b}`} style={{ maxWidth: '24%' }} />
            </div>
          ))}
        </div>
        <div className="mt-[9%] flex items-center justify-between border-t border-obsidian/10 pt-[6%]">
          <span className="h-2.5 w-[22%] rounded-full bg-obsidian/30" />
          <span className="h-4 w-[34%] rounded-full bg-obsidian" />
        </div>
      </div>
      <span className="absolute right-[12%] top-[6%] flex h-14 w-14 rotate-6 items-center justify-center rounded-full bg-terracotta text-obsidian shadow-[0_14px_30px_-8px_rgba(0,0,0,0.6)]">
        <ShoppingBag className="h-6 w-6" strokeWidth={2} />
      </span>
    </StepBase>
  );
}

export function StepPayArt() {
  return (
    <StepBase glow="bg-sage/55">
      <div className="absolute left-1/2 top-[9%] -translate-x-1/2 -rotate-[9deg]">
        <CardFace tone="linen" size={250} />
      </div>
      <div className="absolute left-1/2 top-[40%] -translate-x-1/2 rotate-[3deg]">
        <CardFace tone="sage" size={230} />
      </div>
      <div className="absolute left-1/2 top-[44%] flex -translate-x-1/2 items-center gap-2.5 whitespace-nowrap rounded-full border border-white/70 bg-white/95 py-2 pl-4 pr-2 font-heading text-[13px] font-bold tracking-tight text-obsidian shadow-[0_16px_36px_-10px_rgba(0,0,0,0.6)]">
        Pay $151.95
        <span className="flex h-7 w-7 items-center justify-center rounded-full bg-obsidian text-linen">
          <Lock className="h-3.5 w-3.5" />
        </span>
      </div>
    </StepBase>
  );
}

export function StepDoneArt() {
  return (
    <StepBase glow="bg-sand/50">
      <svg viewBox="0 0 200 200" className="absolute left-1/2 top-[3%] w-[78%] -translate-x-1/2 drop-shadow-[0_30px_40px_rgba(0,0,0,0.55)]">
        <polygon points="30,75 100,110 100,190 30,155" fill="#ddbea9" />
        <polygon points="100,110 170,75 170,155 100,190" fill="#cb997e" />
        <polygon points="100,40 170,75 100,110 30,75" fill="#fff1e6" />
        <polygon points="128.7,54.4 141.3,60.6 71.3,95.6 58.7,89.4" fill="#cb997e" />
        <polygon points="58.7,89.4 71.3,95.6 71.3,175.6 58.7,169.4" fill="#b07c5c" />
        <polygon points="116,121 156,101 156,126 116,146" fill="#fff1e6" />
        <polygon points="121,128 150,113.5 150,117 121,131.5" fill="#20221c" fillOpacity="0.7" />
        <polygon points="121,135 140,125.5 140,128.5 121,138" fill="#20221c" fillOpacity="0.3" />
      </svg>
      <span className="pulse-ring absolute right-[13%] top-[7%] flex h-14 w-14 items-center justify-center rounded-full bg-ok text-white shadow-[0_14px_30px_-8px_rgba(0,0,0,0.6)]">
        <Check className="h-7 w-7" strokeWidth={2.8} />
      </span>
    </StepBase>
  );
}

// ---------------------------------------------------------------------------------------------
// Security shield
// ---------------------------------------------------------------------------------------------
export function ShieldArt() {
  return (
    <div aria-hidden className="absolute inset-0 overflow-hidden bg-[#161812]">
      <div className="absolute left-1/2 top-[44%] h-[70%] w-[80%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-sage/40 blur-[90px]" />
      <div className="absolute -right-10 bottom-0 h-[40%] w-[60%] rounded-full bg-terracotta/25 blur-[100px]" />
      <RingsBackdrop cx={50} cy={44} />
      <svg viewBox="0 0 300 340" className="absolute left-1/2 top-[8%] w-[62%] -translate-x-1/2 drop-shadow-[0_40px_50px_rgba(0,0,0,0.55)]">
        <defs>
          <linearGradient id="shieldFill" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#c8c8b4" />
            <stop offset="0.55" stopColor="#a5a58d" />
            <stop offset="1" stopColor="#6f705c" />
          </linearGradient>
          <linearGradient id="shieldShine" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#fff1e6" stopOpacity="0.55" />
            <stop offset="0.5" stopColor="#fff1e6" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path d="M150 28 252 68v86c0 66-44 114-102 140C92 268 48 220 48 154V68Z" fill="url(#shieldFill)" />
        <path d="M150 28 252 68v86c0 66-44 114-102 140C92 268 48 220 48 154V68Z" fill="url(#shieldShine)" />
        <path d="M150 52 232 84v70c0 54-35 94-82 116-47-22-82-62-82-116V84Z" fill="none" stroke="#fff1e6" strokeOpacity="0.45" strokeWidth="2" />
        <circle cx="150" cy="140" r="21" fill="#20221c" />
        <path d="M143 150h14l4 40h-22Z" fill="#20221c" />
        <circle cx="150" cy="140" r="7" fill="#cb997e" />
      </svg>
    </div>
  );
}
