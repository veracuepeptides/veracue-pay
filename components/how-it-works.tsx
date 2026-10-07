import { CreditCard, PackageCheck, ShoppingBag } from 'lucide-react';
import { StepDoneArt, StepOrderArt, StepPayArt } from './art';
import { Reveal } from './reveal';
import { ScrollMarquee } from './scroll-marquee';
import { STEPS } from '@/lib/site';

const ICONS = [ShoppingBag, CreditCard, PackageCheck];
const ART = [StepOrderArt, StepPayArt, StepDoneArt];

export function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="relative z-20 w-full overflow-hidden border-y border-[#96967e] bg-sage pb-16 pt-16 sm:pb-24 sm:pt-24 lg:pb-28 lg:pt-28"
    >
      <div className="relative z-10 mx-auto max-w-[88rem] px-4 sm:px-6 md:px-10 lg:px-12">
        <Reveal className="mb-12 flex flex-col items-start justify-between gap-6 sm:mb-16 md:flex-row md:items-end">
          <div>
            <span className="inline-block rounded-full border border-white/40 bg-white/15 px-3.5 py-1.5 font-editorial text-[10.5px] uppercase tracking-[0.2em] text-white sm:text-xs">
              How it works
            </span>
            <h2 className="mt-5 font-heading text-[2.2rem] font-extrabold uppercase leading-[1.02] tracking-[-0.035em] text-white sm:text-5xl lg:text-[4.25rem]">
              Three steps.
              <br />
              About a minute.
            </h2>
          </div>
          <p className="max-w-sm text-[15px] leading-relaxed text-white/85">
            Most of it happens before you reach this page. All that is left here is the payment itself.
          </p>
        </Reveal>
      </div>

      {/* Full-bleed band: the giant type runs edge to edge behind the cards and slides with scroll. */}
      <div className="relative w-full">
        <ScrollMarquee />

        <div className="relative z-10 mx-auto max-w-[88rem] px-4 sm:px-6 md:px-10 lg:px-12">
          <div className="flex snap-x snap-mandatory gap-5 overflow-x-auto px-1 pb-6 pt-6 [scrollbar-width:none] sm:grid sm:grid-cols-3 sm:gap-6 sm:overflow-visible sm:pb-6 lg:gap-8 [&::-webkit-scrollbar]:hidden">
            {STEPS.map((step, i) => {
              const Icon = ICONS[i];
              const Art = ART[i];
              return (
                <Reveal
                  key={step.title}
                  delay={i * 110}
                  className="group relative flex aspect-[3/4.2] w-[82vw] max-w-[340px] shrink-0 snap-center flex-col justify-between overflow-hidden rounded-[28px] border border-white/60 bg-alabaster p-4 shadow-[0_14px_36px_rgba(0,0,0,0.14)] transition-transform duration-500 sm:w-auto sm:max-w-none sm:rounded-[36px] sm:p-6 sm:hover:-translate-y-2.5"
                >
                  <div className="absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-105">
                    <Art />
                  </div>

                  <div className="relative z-10 flex items-center justify-between">
                    <span className="rounded-full border border-neutral-200 bg-white px-3.5 py-1.5 font-editorial text-[11px] uppercase tracking-[0.16em] text-obsidian shadow-sm sm:text-xs">
                      {step.tag}
                    </span>
                    <span className="flex h-9 w-9 items-center justify-center rounded-full border border-neutral-200 bg-white text-obsidian shadow-sm">
                      <Icon className="h-4 w-4" strokeWidth={2.2} />
                    </span>
                  </div>

                  <div className="relative z-10">
                    <p className="font-heading text-[2.4rem] font-extrabold leading-none tracking-[-0.04em] text-white drop-shadow-[0_4px_20px_rgba(0,0,0,0.5)] sm:text-[2.7rem]">
                      {step.title}
                    </p>
                    <p className="mt-3 text-[13px] font-medium leading-relaxed text-white/90 drop-shadow-[0_2px_10px_rgba(0,0,0,0.6)] sm:text-[13.5px]">
                      {step.body}
                    </p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
