import { ArrowUpRight } from 'lucide-react';
import { Reveal } from './reveal';
import { DisplayHeading, Eyebrow } from './section-heading';
import { BUSINESS_POINTS, SITE } from '@/lib/site';

export function ForBusinesses() {
  return (
    <section id="businesses" className="w-full bg-alabaster py-20 sm:py-28 lg:py-32">
      <div className="mx-auto grid max-w-[88rem] grid-cols-1 items-start gap-14 px-4 sm:px-6 md:px-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-20 lg:px-12">
        <Reveal className="min-w-0">
          <Eyebrow>For businesses</Eyebrow>
          <DisplayHeading className="mt-5 text-obsidian">Accept payments under your own name.</DisplayHeading>
          <p className="mt-6 max-w-xl text-[15.5px] leading-[1.75] text-obsidian/60">
            VeracuePay gives your shop a fast, secure hosted checkout without you building one. You stay the
            seller of record: customers see your name, and the money settles straight to your Stripe account.
          </p>

          <ul className="mt-10 divide-y divide-obsidian/15 border-y border-obsidian/15">
            {BUSINESS_POINTS.map((point, i) => (
              <li key={point.title} className="flex gap-5 py-6 sm:gap-8">
                <span className="tnum font-heading text-[1.4rem] font-extrabold leading-none tracking-tight text-terracotta sm:text-[1.8rem]">
                  {String(i + 1).padStart(2, '0')}.
                </span>
                <div>
                  <h3 className="font-heading text-[1.15rem] font-bold tracking-[-0.02em] sm:text-[1.3rem]">{point.title}</h3>
                  <p className="mt-2 max-w-lg text-[14.5px] leading-[1.75] text-obsidian/60">{point.body}</p>
                </div>
              </li>
            ))}
          </ul>

          <p className="mt-6 max-w-xl text-[13px] leading-relaxed text-obsidian/50">
            Every business is reviewed before going live. We only work with lawful businesses that meet
            Stripe&rsquo;s terms, and some categories can&rsquo;t be accepted.
          </p>

          <a
            href={`mailto:${SITE.businessEmail}?subject=Becoming%20a%20merchant`}
            className="group mt-8 inline-flex items-center gap-3.5 font-heading text-base font-semibold hover:text-terracotta sm:text-lg"
          >
            <span className="flex h-11 w-11 items-center justify-center rounded-full bg-terracotta text-linen shadow-sm transition-transform duration-300 group-hover:scale-110">
              <ArrowUpRight className="h-[18px] w-[18px]" strokeWidth={2.4} />
            </span>
            Become a merchant
          </a>
        </Reveal>

        <Reveal delay={120} className="min-w-0 lg:sticky lg:top-28">
          <div className="overflow-hidden rounded-[28px] bg-obsidian text-linen shadow-[0_40px_80px_-40px_rgba(32,34,28,0.7)] sm:rounded-[34px]">
            <div className="flex items-center justify-between border-b border-white/10 px-6 py-4">
              <div className="flex items-center gap-1.5" aria-hidden>
                <span className="h-2.5 w-2.5 rounded-full bg-terracotta" />
                <span className="h-2.5 w-2.5 rounded-full bg-sand" />
                <span className="h-2.5 w-2.5 rounded-full bg-sage" />
              </div>
              <span className="font-editorial text-[10px] uppercase tracking-[0.2em] text-linen/45">Create a payment</span>
            </div>

            <pre className="overflow-x-auto px-6 py-6 font-mono text-[12.5px] leading-[1.9] text-linen/80 sm:text-[13px]">
              <code>
                <span className="text-sage">POST</span> /api/payments/create{'\n'}
                <span className="text-sage">Authorization:</span> Bearer &lt;merchant secret&gt;{'\n\n'}
                {'{'}{'\n'}
                {'  '}<span className="text-sand">&quot;orderId&quot;</span>: <span className="text-terracotta">&quot;20481&quot;</span>,{'\n'}
                {'  '}<span className="text-sand">&quot;amount&quot;</span>: <span className="text-terracotta">151.95</span>,{'\n'}
                {'  '}<span className="text-sand">&quot;currency&quot;</span>: <span className="text-terracotta">&quot;usd&quot;</span>,{'\n'}
                {'  '}<span className="text-sand">&quot;returnUrl&quot;</span>: <span className="text-terracotta">&quot;https://yourshop.com/orders/20481&quot;</span>{'\n'}
                {'}'}
              </code>
            </pre>

            <div className="border-t border-white/10 px-6 py-5 text-[12.5px] leading-relaxed text-linen/60">
              <p>
                <span className="font-heading font-semibold text-linen">1.</span> Create the payment and get back a
                reference.
              </p>
              <p className="mt-1.5">
                <span className="font-heading font-semibold text-linen">2.</span> Send the customer to{' '}
                <span className="font-mono text-linen/80">/pay?pi=…</span>
              </p>
              <p className="mt-1.5">
                <span className="font-heading font-semibold text-linen">3.</span> Verify the result server to server.
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
