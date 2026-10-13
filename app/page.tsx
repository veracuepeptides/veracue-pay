import { SiteHeader } from '@/components/site-header';
import { Hero } from '@/components/hero';
import { HowItWorks } from '@/components/how-it-works';
import { Security } from '@/components/security';
import { ForBusinesses } from '@/components/for-businesses';
import { Help } from '@/components/help';
import { Faq } from '@/components/faq';
import { SiteFooter } from '@/components/site-footer';
import type { Metadata } from 'next';

// The home page names its own address. Indexing stays off for every page (see app/layout.tsx).
export const metadata: Metadata = {
  alternates: { canonical: '/' },
};

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main id="main-content">
        <Hero />
        <HowItWorks />
        <Security />
        <ForBusinesses />
        <Help />
        <Faq />
      </main>
      <SiteFooter />
    </>
  );
}
