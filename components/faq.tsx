import { Plus } from 'lucide-react';
import { Reveal } from './reveal';
import { DisplayHeading, Eyebrow } from './section-heading';
import { FAQ_ITEMS } from '@/lib/site';

export function Faq() {
  return (
    <section id="faq" className="w-full border-t border-almond bg-linen/70 py-20 sm:py-28 lg:py-32">
      <div className="mx-auto grid max-w-[88rem] gap-12 px-4 sm:px-6 md:px-10 lg:grid-cols-[0.75fr_1.25fr] lg:gap-20 lg:px-12">
        <Reveal className="lg:sticky lg:top-28 lg:self-start">
          <Eyebrow>FAQ</Eyebrow>
          <DisplayHeading className="mt-5 text-obsidian">
            Have
            <br />
            questions?
          </DisplayHeading>
          <p className="mt-6 max-w-xs text-[15px] leading-relaxed text-obsidian/60">
            Quick answers about how paying here works. Anything else, just email us.
          </p>
        </Reveal>

        <Reveal className="border-b border-obsidian/15">
          {FAQ_ITEMS.map((item) => (
            <details key={item.question} className="group border-t border-obsidian/15">
              <summary className="flex items-center justify-between gap-6 py-6 text-left sm:py-7">
                <span className="font-heading text-[1.05rem] font-bold leading-snug tracking-[-0.02em] sm:text-[1.3rem]">
                  {item.question}
                </span>
                <span className="faq-plus flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-obsidian text-linen transition-all duration-300 group-hover:bg-terracotta group-hover:text-obsidian">
                  <Plus className="h-4 w-4" strokeWidth={2.4} />
                </span>
              </summary>
              <p className="max-w-2xl pb-7 pr-14 text-[14.5px] leading-[1.8] text-obsidian/60">{item.answer}</p>
            </details>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
