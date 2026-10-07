'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, ArrowUp, ArrowUpRight, Check, Mail } from 'lucide-react';
import { BrandLogo } from './brand-logo';
import { SITE } from '@/lib/site';

// Monochrome payment badges, set as type and simple marks so they sit quietly in the card.
const ApplePayBadge = () => (
  <div className="flex select-none items-center gap-1.5" title="Apple Pay">
    <svg className="h-4 w-auto sm:h-5" viewBox="0 0 170 170" fill="currentColor" aria-hidden>
      <path d="M150.37 130.25c-2.45 5.66-5.35 10.87-8.71 15.66-4.58 6.53-8.33 11.05-11.22 13.56-4.48 4.12-9.28 6.23-14.42 6.35-3.69 0-8.14-1.05-13.32-3.18-5.19-2.12-9.97-3.17-14.34-3.17-4.58 0-9.49 1.05-14.75 3.17-5.26 2.13-9.5 3.24-12.74 3.35-4.35.13-9.16-1.9-14.42-6.08-3.7-3.04-7.69-7.85-11.97-14.42-6.19-9.56-10.98-20.43-14.38-32.61-3.41-12.18-5.12-23.78-5.12-34.8 0-14.75 3.73-27.14 11.2-37.17 7.46-10.04 16.92-15.19 28.37-15.45 5.11 0 10.81 1.34 17.09 4.02 6.28 2.68 10.3 4.08 12.06 4.2 1.45-.25 5.69-1.68 12.74-4.29 7.05-2.61 12.92-3.79 17.62-3.53 10.04.66 18.36 4.41 24.97 11.26 6.61 6.84 10.74 14.86 12.39 24.06-8.91 5.37-13.31 12.77-13.2 22.2.11 8.24 3.3 15.15 9.58 20.73 6.28 5.58 13.58 8.95 21.9 10.11-1.89 5.88-4.14 11.83-6.75 17.85zM119.22 31.84c0-7.17 2.6-13.9 7.8-20.19 5.2-6.29 11.59-10.39 19.18-12.31.22 1.45.33 2.8.33 4.04 0 7.39-2.73 14.35-8.19 20.89-5.46 6.54-12.08 10.45-19.86 11.73-.23-1.34-.35-2.72-.35-4.16z" />
    </svg>
    <span className="text-sm font-semibold leading-none tracking-tight sm:text-base">Pay</span>
  </div>
);

const GooglePayBadge = () => (
  <span className="select-none text-sm font-semibold leading-none tracking-tight sm:text-base" title="Google Pay">
    G&nbsp;Pay
  </span>
);

const MastercardBadge = () => (
  <div className="flex select-none items-center" title="Mastercard">
    <svg className="h-4 w-auto sm:h-5" viewBox="0 0 38 24" fill="none" aria-label="Mastercard">
      <circle cx="12" cy="12" r="11" fill="currentColor" fillOpacity="0.95" />
      <circle cx="26" cy="12" r="11" fill="currentColor" fillOpacity="0.35" />
      <path
        d="M19 4.8a10.95 10.95 0 0 1 3.6 7.2A10.95 10.95 0 0 1 19 19.2a10.95 10.95 0 0 1-3.6-7.2A10.95 10.95 0 0 1 19 4.8Z"
        fill="currentColor"
        fillOpacity="0.75"
      />
    </svg>
  </div>
);

const VisaBadge = () => (
  <span className="select-none text-sm font-black italic leading-none tracking-wider sm:text-base" title="VISA">
    VISA
  </span>
);

const COLUMNS = [
  {
    title: 'Payments',
    links: [
      { label: 'How it works', href: '#how-it-works' },
      { label: 'Security', href: '#security' },
      { label: 'Help with a payment', href: '#help' },
      { label: 'Questions', href: '#faq' },
    ],
  },
  {
    title: 'For Businesses',
    links: [
      { label: 'Accept payments', href: '#businesses' },
      { label: 'Become a merchant', href: `mailto:${SITE.businessEmail}?subject=Becoming%20a%20merchant` },
      { label: 'Integration', href: '#businesses' },
    ],
  },
  {
    title: 'Support',
    links: [
      { label: 'Contact support', href: `mailto:${SITE.supportEmail}` },
      { label: 'Merchant enquiries', href: `mailto:${SITE.businessEmail}` },
    ],
  },
];

const LINK_CLASS =
  'block py-0.5 text-sm font-normal leading-relaxed text-[#20221c]/70 transition-all duration-150 hover:translate-x-1 hover:text-[#20221c] sm:text-[15px]';

export function SiteFooter() {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);

  // No backend needed: opens a pre-filled enquiry in the visitor's mail app.
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const body = encodeURIComponent(`Hello, I'd like to start accepting payments through ${SITE.name}.\n\nContact: ${email}`);
    window.location.href = `mailto:${SITE.businessEmail}?subject=${encodeURIComponent('Merchant enquiry')}&body=${body}`;
    setSent(true);
    setTimeout(() => setSent(false), 4000);
  };

  return (
    <footer
      id="site-footer"
      className="relative z-30 w-full overflow-hidden bg-[#f0efeb] pb-8 pt-6 text-[#20221c] sm:pb-12 sm:pt-10 md:pt-14"
    >
      {/* Ambient warm glow behind the CTA */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[550px] w-[90vw] max-w-[1200px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-tr from-[#eddcd2]/60 via-[#ddbea9]/30 to-[#cb997e]/20 blur-[130px]" />

      {/* PRE-FOOTER CTA */}
      <div className="relative z-10 mx-auto w-full max-w-[1920px] px-3 pb-12 pt-4 sm:px-6 sm:pb-16 sm:pt-10 md:px-10 md:pb-24 md:pt-16">
        <div className="max-w-5xl">
          <p className="text-[2rem] font-bold leading-[1.12] tracking-tight text-[#20221c] sm:text-5xl sm:leading-[1.1] md:text-6xl md:leading-[1.08] lg:text-[4.5rem] lg:leading-[1.06] xl:text-[5.2rem] xl:leading-[1.05]">
            Need a hand with a payment?
          </p>
          <p className="mt-1 text-[2rem] font-medium leading-[1.12] tracking-tight text-[#20221c]/40 sm:mt-2 sm:text-5xl sm:leading-[1.1] md:text-6xl md:leading-[1.08] lg:text-[4.5rem] lg:leading-[1.06] xl:text-[5.2rem] xl:leading-[1.05]">
            Let&rsquo;s sort it out
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-4 sm:mt-10 sm:gap-x-7 md:mt-12">
            <a
              href={`mailto:${SITE.supportEmail}?subject=Payment%20question`}
              className="group inline-flex items-center gap-3.5 text-base font-semibold text-[#20221c] transition-colors hover:text-[#cb997e] sm:text-lg"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#cb997e] text-[#fff1e6] shadow-sm transition-all duration-300 group-hover:scale-110 sm:h-11 sm:w-11">
                <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 sm:h-[18px] sm:w-[18px]" strokeWidth={2.4} />
              </div>
              <span className="border-b-2 border-transparent transition-all group-hover:border-[#cb997e]">Contact our team</span>
            </a>

            <span className="hidden text-sm text-[#20221c]/25 sm:inline">&bull;</span>

            <a
              href="#how-it-works"
              className="text-sm font-medium text-[#20221c]/65 underline decoration-[#20221c]/25 underline-offset-4 transition-colors hover:text-[#20221c] hover:decoration-[#cb997e] sm:text-base"
            >
              See how paying works &rarr;
            </a>
          </div>
        </div>
      </div>

      {/* Container matching the site standard width */}
      <div className="relative z-10 mx-auto w-full max-w-[1920px] px-3 sm:px-6 md:px-10">
        {/* FLOATING LUXURY CARD */}
        <div className="relative overflow-hidden rounded-2xl border border-[#eddcd2] bg-[#fff1e6] p-5 shadow-[0_16px_40px_-15px_rgba(203,153,126,0.12),0_4px_16px_-4px_rgba(32,34,28,0.03)] sm:rounded-3xl sm:p-10 md:rounded-[36px] md:p-12 lg:rounded-[44px] lg:p-16 xl:p-20">
          <div className="flex flex-col items-start justify-between gap-10 sm:gap-12 lg:flex-row lg:gap-14 xl:gap-20">
            {/* LEFT: headline, form, direct contact */}
            <div className="flex w-full flex-col justify-between lg:w-[46%] xl:w-[44%]">
              <p className="max-w-xl font-heading text-[1.5rem] font-extrabold uppercase leading-[1.16] tracking-tight text-[#20221c] sm:text-3xl sm:leading-[1.14] md:text-4xl md:leading-[1.12] lg:text-[2.5rem] lg:leading-[1.1] xl:text-[2.85rem]">
                Running a business? Take payments under your own name.
              </p>

              <div className="mt-8 w-full max-w-md sm:mt-10 md:mt-12">
                <form onSubmit={handleSubmit} className="group relative w-full">
                  <div className="relative flex items-center border-b border-[#20221c]/30 pb-3 transition-colors group-focus-within:border-[#cb997e] sm:pb-3.5">
                    <input
                      type="email"
                      name="email"
                      aria-label="Business email address"
                      placeholder="Business email address"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-transparent pr-10 text-base font-normal text-[#20221c] outline-none transition-all placeholder:text-[#20221c]/45 sm:text-lg"
                    />
                    <button
                      type="submit"
                      aria-label="Send merchant enquiry"
                      className="absolute right-0 top-1/2 flex -translate-y-1/2 cursor-pointer items-center justify-center text-[#20221c] transition-all duration-200 hover:text-[#cb997e] group-hover:translate-x-1"
                    >
                      {sent ? (
                        <Check className="h-5 w-5 text-[#cb997e]" strokeWidth={2.5} />
                      ) : (
                        <ArrowRight className="h-5 w-5 sm:h-6 sm:w-6" strokeWidth={1.8} />
                      )}
                    </button>
                  </div>
                  {sent && (
                    <p className="mt-2.5 text-xs font-medium text-[#cb997e]">Opening your email app to send the enquiry.</p>
                  )}
                </form>

                <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-[#eddcd2]/80 pt-6 text-sm text-[#20221c]">
                  <a
                    href={`mailto:${SITE.supportEmail}`}
                    className="group flex min-w-0 items-center gap-2 font-medium text-[#20221c]/80 transition-colors hover:text-[#cb997e]"
                    title="Email support"
                  >
                    <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#20221c]/5 text-[#20221c] transition-colors group-hover:bg-[#cb997e] group-hover:text-white">
                      <Mail className="h-3.5 w-3.5" />
                    </div>
                    <span className="truncate">{SITE.supportEmail}</span>
                  </a>
                </div>
              </div>
            </div>

            {/* RIGHT: link columns + big logo */}
            <div className="w-full lg:w-[54%] xl:w-[56%]">
              <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 sm:gap-6 lg:gap-8 xl:gap-12">
                {COLUMNS.map((col, i) => (
                  <div key={col.title} className={`flex min-w-0 flex-col ${i === 2 ? 'col-span-2 sm:col-span-1' : ''}`}>
                    <p className="mb-4 text-sm font-semibold tracking-normal text-[#20221c] sm:mb-5 sm:text-base">{col.title}</p>
                    <nav aria-label={col.title} className="flex flex-col gap-2.5">
                      {col.links.map((link) => (
                        <a key={link.label} href={link.href} className={LINK_CLASS}>
                          {link.label}
                        </a>
                      ))}
                    </nav>
                  </div>
                ))}
              </div>

              <div className="mt-10 flex items-center justify-start pt-2 sm:mt-12 sm:pt-4 md:mt-16">
                <Link href="/" aria-label="VeracuePay home" className="inline-block transition-opacity hover:opacity-85">
                  <span className="sm:hidden">
                    <BrandLogo size={46} />
                  </span>
                  <span className="hidden sm:inline md:hidden">
                    <BrandLogo size={64} />
                  </span>
                  <span className="hidden md:inline">
                    <BrandLogo size={84} />
                  </span>
                </Link>
              </div>
            </div>
          </div>

          {/* BOTTOM ROW INSIDE CARD: payment badges + back to top */}
          <div className="mt-12 flex flex-col items-center justify-between gap-6 border-t border-[#eddcd2]/80 pt-6 sm:mt-16 sm:flex-row sm:gap-4 sm:pt-8 md:mt-24">
            <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-[#20221c]/80 transition-colors hover:text-[#20221c] sm:justify-start sm:gap-8">
              <ApplePayBadge />
              <GooglePayBadge />
              <MastercardBadge />
              <VisaBadge />
            </div>

            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              aria-label="Scroll back to top"
              className="group flex cursor-pointer select-none items-center gap-2 rounded-full bg-[#20221c] py-2 pl-3.5 pr-2.5 text-[#fff1e6] shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#cb997e] hover:text-white sm:py-2.5 sm:pl-4 sm:pr-3"
            >
              <span className="text-[11px] font-bold uppercase tracking-wider sm:text-xs">Back to top</span>
              <div className="flex h-5 w-5 items-center justify-center rounded-full bg-white/15 transition-transform duration-200 group-hover:-translate-y-0.5">
                <ArrowUp className="h-3 w-3 text-current" strokeWidth={2.5} />
              </div>
            </button>
          </div>
        </div>

        {/* OUTSIDE CARD: disclaimer + copyright bar */}
        <div className="mt-8 flex flex-col gap-5 px-2 text-xs text-[#20221c]/60 sm:mt-10 sm:px-4">
          <p className="max-w-5xl text-center text-[11px] leading-relaxed sm:text-left sm:text-xs">
            <span className="mr-1.5 font-bold uppercase tracking-wider text-[#20221c]/80">Please note:</span>
            The business named on each payment page is the seller of that order. Its policies on refunds, shipping and
            returns apply to your purchase, and card payments are processed by Stripe on its behalf.
          </p>

          <div className="flex flex-col items-center justify-between gap-3 border-t border-[#eddcd2]/80 pt-4 text-center text-xs text-[#20221c]/60 sm:flex-row sm:text-left">
            <p className="font-medium">
              &copy; {new Date().getFullYear()} {SITE.legalName}. All rights reserved.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
              <span className="font-medium tracking-wide">Secure checkout &bull; Processed by Stripe</span>
              <span className="font-normal">
                Designed by{' '}
                <a
                  href="https://belkdigital.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-[#20221c]/80 transition-colors hover:text-[#cb997e]"
                >
                  Belk Digital
                </a>
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
