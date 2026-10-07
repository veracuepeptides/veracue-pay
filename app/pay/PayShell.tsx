import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { BrandLogo } from '@/components/brand-logo';
import { SITE } from '@/lib/site';

// Chrome for the simple screens (unavailable link, 404): brand, a way back, and the content.
export function PayShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-alabaster">
      <header className="w-full px-2 pt-2.5 sm:px-6 sm:pt-4 md:px-10">
        <div className="flex h-[54px] w-full items-center justify-between rounded-2xl border border-stone/90 bg-sage px-2.5 sm:h-16 sm:rounded-[22px] sm:px-6 md:h-[70px] lg:px-8">
          <Link href="/" aria-label="VeracuePay home">
            <BrandLogo size={22} />
          </Link>
          <a
            href="/"
            className="group inline-flex h-9 items-center gap-1.5 rounded-full bg-white px-4 font-heading text-[13px] font-semibold text-obsidian transition-colors hover:bg-obsidian hover:text-linen"
          >
            About {SITE.name}
            <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-px group-hover:translate-x-px" />
          </a>
        </div>
      </header>

      <main id="main-content" className="mx-auto w-full max-w-[1100px] flex-1 px-5 py-10 sm:px-8">
        {children}
      </main>

      <footer className="border-t border-almond">
        <div className="mx-auto flex max-w-[1920px] flex-col gap-2 px-5 py-6 text-[12px] text-obsidian/50 sm:flex-row sm:justify-between sm:px-8">
          <p>Payments are processed by Stripe on behalf of the business named at checkout.</p>
          <p>
            Help:{' '}
            <a className="underline underline-offset-4" href={`mailto:${SITE.supportEmail}`}>
              {SITE.supportEmail}
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
}
