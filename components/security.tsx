import { ShieldCheck } from 'lucide-react';
import { ShieldArt } from './art';
import { Reveal } from './reveal';
import { DisplayHeading, Eyebrow } from './section-heading';
import { SECURITY_POINTS } from '@/lib/site';

export function Security() {
  return (
    <section id="security" className="w-full bg-alabaster py-20 sm:py-28 lg:py-32">
      <div className="mx-auto max-w-[88rem] px-4 sm:px-6 md:px-10 lg:px-12">
        <Reveal className="mb-12 max-w-4xl sm:mb-16">
          <Eyebrow>Security</Eyebrow>
          <DisplayHeading className="mt-5 text-obsidian">
            Your card number never touches our servers.
          </DisplayHeading>
        </Reveal>

        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14">
          <Reveal>
            <div className="relative aspect-[4/4.6] overflow-hidden rounded-[28px] bg-charcoal sm:rounded-[36px] lg:sticky lg:top-28">
              <ShieldArt />
              <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />

              <div className="absolute left-4 top-4 flex items-center gap-2 rounded-full bg-white px-3.5 py-2 font-editorial text-[11px] uppercase tracking-[0.16em] text-obsidian shadow-sm sm:left-6 sm:top-6">
                <ShieldCheck className="h-4 w-4 text-sage" strokeWidth={2.2} />
                Handled by Stripe
              </div>

              <div className="absolute inset-x-4 bottom-4 rounded-2xl border border-white/20 bg-black/35 p-5 text-white backdrop-blur-md sm:inset-x-6 sm:bottom-6">
                <p className="font-heading text-[1.35rem] font-extrabold leading-tight tracking-tight sm:text-2xl">
                  A payment page should be dull in the best way.
                </p>
                <p className="mt-2 text-[13px] leading-relaxed text-white/80">
                  It does a small number of things, in the safest place to do them.
                </p>
              </div>
            </div>
          </Reveal>

          <div className="border-b border-obsidian/15">
            {SECURITY_POINTS.map((point, i) => (
              <Reveal
                key={point.title}
                delay={i * 80}
                className="group border-t border-obsidian/15 py-8 transition-colors hover:bg-white/50 sm:px-4 sm:py-10 lg:px-6"
              >
                <div className="flex gap-5 sm:gap-8">
                  <span className="tnum font-heading text-[1.5rem] font-extrabold leading-none tracking-tight text-terracotta sm:text-[2rem]">
                    {String(i + 1).padStart(2, '0')}.
                  </span>
                  <div className="min-w-0">
                    <span className="inline-block rounded-full border border-obsidian/15 bg-white px-3 py-1 font-editorial text-[10px] uppercase tracking-[0.16em] text-obsidian/70">
                      {point.tag}
                    </span>
                    <h3 className="mt-4 font-heading text-[1.35rem] font-bold leading-tight tracking-[-0.025em] sm:text-[1.75rem]">
                      {point.title}
                    </h3>
                    <p className="mt-3 max-w-xl text-[14.5px] leading-[1.75] text-obsidian/60">{point.body}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
