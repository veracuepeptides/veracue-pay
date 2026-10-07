import { ArrowRight, Check, Lock, ShoppingBag } from 'lucide-react';

// Decorative replica of the real payment page. Figures are examples, so it is hidden from
// assistive tech. Kept compact so the hero fits a single screen.
export function CheckoutPanel() {
  return (
    <div
      aria-hidden
      className="float-soft relative w-full max-w-[350px] rounded-[22px] border border-white/70 bg-white/90 p-4 shadow-[0_40px_90px_-30px_rgba(0,0,0,0.65)] backdrop-blur-2xl sm:p-5"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-obsidian font-heading text-[14px] font-extrabold text-linen">M</span>
          <div>
            <p className="font-heading text-[14px] font-bold leading-tight tracking-tight">Your merchant</p>
            <p className="text-[11px] leading-tight text-obsidian/50">Order 20481</p>
          </div>
        </div>
        <span className="inline-flex items-center gap-1.5 rounded-full bg-obsidian px-2.5 py-1 font-heading text-[10px] font-semibold text-linen">
          <Lock className="h-3 w-3" /> Secure
        </span>
      </div>

      <div className="mt-3.5 flex items-center gap-3 rounded-2xl bg-alabaster p-2.5">
        <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-terracotta text-obsidian">
          <ShoppingBag className="h-5 w-5" strokeWidth={2} />
        </span>
        <div className="min-w-0 flex-1">
          <p className="truncate font-heading text-[13px] font-semibold tracking-tight">Order items</p>
          <p className="text-[11px] text-obsidian/50">Subtotal</p>
        </div>
        <p className="tnum font-heading text-[13px] font-semibold">$142.00</p>
      </div>

      <div className="tnum mt-3 space-y-1.5 text-[12px]">
        <div className="flex justify-between text-obsidian/60">
          <span>Shipping</span>
          <span className="font-medium text-obsidian">$9.95</span>
        </div>
        <div className="flex items-end justify-between border-t border-almond pt-2.5">
          <span className="font-heading text-[12.5px] font-semibold">Total due</span>
          <span className="font-heading text-[24px] font-extrabold leading-none tracking-tight">$151.95</span>
        </div>
      </div>

      <div className="mt-3.5 space-y-1.5">
        <div className="rounded-xl border border-almond bg-white px-3 py-2">
          <p className="text-[9px] font-semibold uppercase tracking-[0.12em] text-obsidian/40">Card number</p>
          <p className="tnum text-[13px] text-obsidian/35">1234 1234 1234 1234</p>
        </div>
        <div className="grid grid-cols-2 gap-1.5">
          <div className="rounded-xl border border-almond bg-white px-3 py-2">
            <p className="text-[9px] font-semibold uppercase tracking-[0.12em] text-obsidian/40">Expiry</p>
            <p className="text-[13px] text-obsidian/35">MM / YY</p>
          </div>
          <div className="rounded-xl border border-almond bg-white px-3 py-2">
            <p className="text-[9px] font-semibold uppercase tracking-[0.12em] text-obsidian/40">CVC</p>
            <p className="text-[13px] text-obsidian/35">123</p>
          </div>
        </div>
      </div>

      <div className="mt-3.5 flex h-11 items-center justify-between rounded-full bg-obsidian pl-5 pr-1.5 font-heading text-[13.5px] font-semibold text-linen">
        Pay $151.95
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-obsidian">
          <ArrowRight className="h-4 w-4" strokeWidth={2.2} />
        </span>
      </div>

      <div className="absolute -bottom-4 -left-3 hidden items-center gap-2.5 rounded-2xl border border-white/70 bg-white px-3.5 py-2.5 shadow-[0_18px_40px_-16px_rgba(0,0,0,0.5)] sm:-left-12 sm:flex">
        <span className="pulse-ring flex h-7 w-7 items-center justify-center rounded-full bg-ok text-white">
          <Check className="h-3.5 w-3.5" strokeWidth={2.6} />
        </span>
        <div>
          <p className="font-heading text-[12px] font-bold leading-tight tracking-tight">Payment confirmed</p>
          <p className="text-[10.5px] leading-tight text-obsidian/50">Taking you back to the shop</p>
        </div>
      </div>
    </div>
  );
}
