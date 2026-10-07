'use client';

import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import { ArrowLeft, Lock, ShieldCheck } from 'lucide-react';
import { PaymentForm } from './PaymentForm';
import { RingsBackdrop } from '@/components/art';
import { BrandLogo } from '@/components/brand-logo';
import { formatMoney } from '@/lib/format';
import { SITE } from '@/lib/site';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || '');

// Stripe's fields live in an iframe, so they are themed here instead of with page CSS.
const appearance = {
  theme: 'flat' as const,
  variables: {
    colorPrimary: '#20221c',
    colorBackground: '#ffffff',
    colorText: '#20221c',
    colorTextSecondary: '#6b6d64',
    colorDanger: '#b85450',
    fontFamily: '"Plus Jakarta Sans", system-ui, sans-serif',
    fontSizeBase: '15px',
    spacingUnit: '4px',
    borderRadius: '14px',
  },
  rules: {
    '.Input': { border: '1px solid #e2d6cd', boxShadow: 'none', padding: '14px 15px', backgroundColor: '#ffffff' },
    '.Input:focus': { border: '1px solid #a5a58d', boxShadow: '0 0 0 3px rgba(165,165,141,0.35)' },
    '.Label': { fontWeight: '600', fontSize: '12px', letterSpacing: '0.02em', marginBottom: '7px' },
    '.Tab': { border: '1px solid #e2d6cd', boxShadow: 'none', backgroundColor: '#ffffff' },
    '.Tab:hover': { border: '1px solid #a5a58d' },
    '.Tab--selected': { border: '1px solid #20221c', backgroundColor: '#20221c', color: '#fff1e6', boxShadow: 'none' },
    '.TabIcon--selected': { fill: '#fff1e6' },
    '.TabLabel--selected': { color: '#fff1e6' },
    '.Error': { fontSize: '13px' },
  },
};

const fonts = [
  { cssSrc: 'https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600&display=swap' },
];

export function PayClient({
  clientSecret,
  returnUrl,
  amount,
  currency,
  orderId,
  merchant,
}: {
  clientSecret: string;
  returnUrl: string;
  amount: number;
  currency: string;
  orderId?: string;
  merchant: { name: string; statementDescriptor?: string; supportEmail?: string };
}) {
  const total = formatMoney(amount, currency);

  return (
    <div className="min-h-screen lg:grid lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)]">
      {/* Order summary */}
      <aside className="relative isolate overflow-hidden bg-charcoal text-linen lg:sticky lg:top-0 lg:h-screen">
        <div aria-hidden className="absolute -left-20 top-0 -z-10 h-[420px] w-[420px] rounded-full bg-sage/30 blur-[120px]" />
        <div aria-hidden className="absolute -bottom-24 right-0 -z-10 h-[380px] w-[380px] rounded-full bg-terracotta/25 blur-[120px]" />
        <RingsBackdrop cx={30} cy={70} className="-z-10" />

        <div className="flex h-full flex-col justify-between gap-12 px-5 py-6 sm:px-10 sm:py-8 lg:px-14 lg:py-12">
          <div className="flex items-center justify-between">
            <BrandLogo onDark size={24} />
            <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3.5 py-1.5 font-heading text-[12px] font-medium backdrop-blur-sm">
              <Lock className="h-3.5 w-3.5 text-sage" />
              Secure payment
            </span>
          </div>

          <div>
            <p className="font-editorial text-[11px] uppercase tracking-[0.22em] text-sage">You&rsquo;re paying</p>
            <p className="mt-2 font-heading text-[1.7rem] font-bold tracking-[-0.03em]">{merchant.name}</p>

            <p className="tnum mt-6 font-heading text-[3.4rem] font-extrabold leading-none tracking-[-0.05em] sm:text-[4.6rem] lg:text-[5.6rem]">
              {total}
            </p>

            <dl className="mt-8 max-w-sm divide-y divide-white/10 border-y border-white/10 text-[13.5px]">
              {orderId && (
                <div className="flex justify-between py-3.5">
                  <dt className="text-linen/55">Order</dt>
                  <dd className="tnum font-heading font-semibold">{orderId}</dd>
                </div>
              )}
              {merchant.statementDescriptor && (
                <div className="flex justify-between py-3.5">
                  <dt className="text-linen/55">Statement name</dt>
                  <dd className="font-heading font-semibold">{merchant.statementDescriptor}</dd>
                </div>
              )}
            </dl>

            <p className="mt-6 hidden max-w-sm text-[12px] leading-relaxed text-linen/45 lg:block">
              {merchant.name} is the seller of this order. {SITE.name} is the secure payment page it uses.
            </p>

            <a
              href={returnUrl}
              className="mt-8 hidden items-center gap-2 font-heading text-[13px] font-medium text-linen/70 transition-colors hover:text-linen lg:inline-flex"
            >
              <ArrowLeft className="h-4 w-4" />
              Cancel and return to {merchant.name}
            </a>
          </div>
        </div>
      </aside>

      {/* Payment form */}
      <main id="main-content" className="flex flex-col justify-center bg-alabaster px-5 py-10 sm:px-10 lg:px-16 lg:py-16">
        <div className="mx-auto w-full max-w-[520px]">
          <h1 className="font-heading text-[2rem] font-extrabold uppercase leading-[1.04] tracking-[-0.035em] sm:text-[2.4rem]">
            Payment details
          </h1>
          <p className="mt-3 text-[14.5px] leading-relaxed text-obsidian/60">
            Choose how you&rsquo;d like to pay. Your total can&rsquo;t be changed from this page.
          </p>

          <div className="mt-8 rounded-[26px] border border-almond bg-linen/70 p-5 shadow-[0_30px_70px_-45px_rgba(32,34,28,0.5)] sm:p-8">
            <Elements stripe={stripePromise} options={{ clientSecret, appearance, fonts }}>
              <PaymentForm returnUrl={returnUrl} total={total} />
            </Elements>
          </div>

          <div className="mt-6 flex items-start gap-3 text-[12.5px] leading-relaxed text-obsidian/55">
            <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-sage" />
            <p>
              Encrypted and processed by Stripe. Neither {merchant.name} nor {SITE.name} sees your full card number. Trouble paying?{' '}
              <a className="font-semibold text-obsidian underline underline-offset-4" href={`mailto:${merchant.supportEmail ?? SITE.supportEmail}`}>
                {merchant.supportEmail ?? SITE.supportEmail}
              </a>
            </p>
          </div>

          <a
            href={returnUrl}
            className="mt-6 inline-flex items-center gap-2 font-heading text-[13px] font-medium text-obsidian/60 hover:text-obsidian lg:hidden"
          >
            <ArrowLeft className="h-4 w-4" />
            Cancel and return to {merchant.name}
          </a>
        </div>
      </main>
    </div>
  );
}
