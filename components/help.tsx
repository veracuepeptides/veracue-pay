import { Reveal } from './reveal';
import { DisplayHeading, Eyebrow } from './section-heading';
import { TROUBLESHOOTING } from '@/lib/site';

export function Help() {
  return (
    <section id="help" className="w-full bg-alabaster py-20 sm:py-28 lg:py-32">
      <div className="mx-auto max-w-[88rem] px-4 sm:px-6 md:px-10 lg:px-12">
        <Reveal className="mb-12 flex flex-col justify-between gap-6 sm:mb-16 md:flex-row md:items-end">
          <div className="max-w-3xl">
            <Eyebrow>Help</Eyebrow>
            <DisplayHeading className="mt-5 text-obsidian">When something doesn&rsquo;t go to plan.</DisplayHeading>
          </div>
          <p className="max-w-sm text-[15px] leading-relaxed text-obsidian/60">
            The four things people ask about most, answered straight. For anything else, the business you paid
            and our support team are both a message away.
          </p>
        </Reveal>

        <div className="grid gap-px overflow-hidden rounded-[28px] border border-obsidian/10 bg-obsidian/10 sm:grid-cols-2 sm:rounded-[36px]">
          {TROUBLESHOOTING.map((item, i) => (
            <Reveal
              key={item.problem}
              delay={i * 70}
              className="group bg-alabaster p-7 transition-colors duration-300 hover:bg-white sm:p-10 lg:p-12"
            >
              <span className="tnum font-heading text-[13px] font-bold tracking-[0.14em] text-terracotta">
                {String(i + 1).padStart(2, '0')}
              </span>
              <h3 className="mt-5 font-heading text-[1.4rem] font-bold leading-tight tracking-[-0.025em] sm:text-[1.7rem]">
                {item.problem}
              </h3>
              <p className="mt-4 max-w-md text-[14.5px] leading-[1.75] text-obsidian/60">{item.answer}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
