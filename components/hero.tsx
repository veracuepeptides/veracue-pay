import { CardFan, HeroBackdrop } from './art';
import { CheckoutPanel } from './checkout-panel';
import { FitPanel } from './fit-panel';
import { HeroButton } from './hero-button';
import { Reveal } from './reveal';

const DOCK_ITEMS = [
  ['Cards', 'accepted'],
  ['Wallets', 'where supported'],
  ['3-D Secure', 'ready'],
  ['No account', 'needed'],
  ['Stripe', 'processed'],
  ['Straight back', 'to the shop'],
];

function DockSet({ hidden = false }: { hidden?: boolean }) {
  return (
    <div className="flex shrink-0 items-center gap-8 pr-8 md:gap-12 md:pr-12" aria-hidden={hidden || undefined}>
      {DOCK_ITEMS.map(([strong, soft], i) => (
        <div key={strong} className="flex items-center gap-2 whitespace-nowrap font-heading text-[12.5px] tracking-[-0.015em] sm:gap-2.5 sm:text-[14.5px]">
          {i % 2 === 0 ? (
            <span className="inline-block h-2.5 w-2.5 rounded-full border-2 border-obsidian" />
          ) : (
            <span className="text-[13px] font-bold leading-none text-obsidian">✦</span>
          )}
          <span className="font-extrabold text-obsidian">{strong}</span>
          <span className="-ml-0.5 font-medium text-obsidian/55">{soft}</span>
        </div>
      ))}
    </div>
  );
}

export function Hero() {
  return (
    <section className="flex min-h-[100dvh] w-full flex-col bg-alabaster pb-2 pt-[82px] sm:pb-4 sm:pt-[100px] md:h-[100dvh] md:min-h-[600px]">
      <div className="mx-auto flex max-w-4xl shrink-0 flex-col items-center px-4 text-center">
        <Reveal>
          <p className="font-editorial text-[10px] uppercase tracking-[0.22em] text-obsidian/70 sm:text-[11.5px]">
            The hosted payment page for independent businesses
          </p>
        </Reveal>

        <Reveal delay={80}>
          <h1 className="mt-2.5 text-balance font-heading text-[1.75rem] font-extrabold leading-[1.08] tracking-[-0.04em] text-obsidian sm:text-[2.3rem] lg:text-[2.8rem] xl:text-[3.2rem]">
            Know who you&rsquo;re paying. Pay in seconds.
          </h1>
        </Reveal>

        <Reveal delay={160}>
          <p className="mt-2.5 max-w-xl text-[12.5px] leading-relaxed text-obsidian/60 sm:text-[14px]">
            Every checkout names the business, the order and the amount before you pay. No account, no extra steps.
          </p>
        </Reveal>

        <Reveal delay={240} className="mt-4 flex flex-wrap items-center justify-center gap-2.5 sm:mt-5">
          <HeroButton href="#how-it-works">How it works</HeroButton>
          <HeroButton href="#businesses" variant="secondary">
            Accept payments
          </HeroButton>
        </Reveal>
      </div>

      <Reveal delay={120} className="mt-4 flex min-h-[440px] w-full flex-1 px-3 sm:mt-5 sm:px-6 md:min-h-0 md:px-10">
        <div className="relative isolate flex-1 overflow-hidden rounded-2xl bg-charcoal md:rounded-[26px]">
          <HeroBackdrop />
          <div
            aria-hidden
            className="pointer-events-none absolute left-[30%] top-1/2 hidden origin-center -translate-y-[52%] scale-[0.78] lg:block xl:left-[33%] xl:scale-90"
          >
            <CardFan />
          </div>

          <div className="absolute inset-0 flex items-stretch justify-center gap-8 px-5 pb-12 pt-4 sm:px-9 md:justify-between md:px-14 md:pb-14">
            <div className="hidden max-w-sm self-center text-left text-white md:block">
              <p className="font-heading text-[3.4rem] font-black leading-[0.9] tracking-[-0.05em] drop-shadow-[0_4px_24px_rgba(0,0,0,0.6)] lg:text-[4.6rem] xl:text-[5.4rem]">
                Card
                <br />
                safe.
              </p>
              <p className="mt-4 max-w-[17rem] text-[13px] font-medium leading-relaxed text-white/90 drop-shadow-[0_2px_10px_rgba(0,0,0,0.7)]">
                Card details go straight to Stripe in a secure frame. They never pass through the shop or this page.
              </p>
            </div>

            <FitPanel className="flex-1 justify-center md:justify-end md:pr-4 lg:pr-12">
              <CheckoutPanel />
            </FitPanel>
          </div>

            {/* Docked marquee pill with scooped ears, matching the page background. */}
            <div className="absolute -bottom-[3px] left-1/2 z-20 flex -translate-x-1/2 items-end">
              <svg
                className="-mr-px h-9 w-8 shrink-0 text-alabaster sm:h-12 sm:w-11 md:h-14 md:w-14"
                viewBox="0 0 58 58"
                preserveAspectRatio="none"
                fill="currentColor"
                aria-hidden
              >
                <path d="M 0 58 L 2 58 C 29 58, 29 0, 56 0 L 58 0 L 58 58 Z" />
              </svg>
              <div className="marquee-pause relative flex h-9 w-[250px] max-w-[calc(100vw-90px)] items-center overflow-hidden bg-alabaster sm:h-12 sm:w-[520px] md:h-14 md:w-[760px]">
                <div aria-hidden className="absolute inset-y-0 left-0 z-10 w-6 bg-gradient-to-r from-alabaster to-transparent sm:w-10" />
                <div aria-hidden className="absolute inset-y-0 right-0 z-10 w-6 bg-gradient-to-l from-alabaster to-transparent sm:w-10" />
                <div className="marquee-left flex w-max items-center" style={{ ['--marquee-speed' as string]: '26s' }}>
                  <DockSet />
                  <DockSet hidden />
                </div>
              </div>
              <svg
                className="-ml-px h-9 w-8 shrink-0 -scale-x-100 text-alabaster sm:h-12 sm:w-11 md:h-14 md:w-14"
                viewBox="0 0 58 58"
                preserveAspectRatio="none"
                fill="currentColor"
                aria-hidden
              >
                <path d="M 0 58 L 2 58 C 29 58, 29 0, 56 0 L 58 0 L 58 58 Z" />
              </svg>
            </div>
        </div>
      </Reveal>
    </section>
  );
}
