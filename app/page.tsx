import { SiteHeader } from '@/components/site-header';
import { Hero } from '@/components/hero';
import { HowItWorks } from '@/components/how-it-works';
import { Security } from '@/components/security';
import { ForBusinesses } from '@/components/for-businesses';
import { Help } from '@/components/help';
import { Faq } from '@/components/faq';
import { SiteFooter } from '@/components/site-footer';

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
