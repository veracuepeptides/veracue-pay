'use client';

import { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';

const ROWS = [
  {
    text: 'CHECK OUT • PAY • CONFIRMED • VERACUE PAY • CHECK OUT • PAY • CONFIRMED • VERACUE PAY • CHECK OUT • PAY • CONFIRMED • VERACUE PAY •',
    from: -240,
    to: 240,
  },
  {
    text: 'SECURE • SIMPLE • STRIPE • NO ACCOUNT • SECURE • SIMPLE • STRIPE • NO ACCOUNT • SECURE • SIMPLE • STRIPE • NO ACCOUNT •',
    from: 240,
    to: -240,
  },
  {
    text: 'CARDS • WALLETS • 3-D SECURE • CARDS • WALLETS • 3-D SECURE • CARDS • WALLETS • 3-D SECURE • CARDS • WALLETS • 3-D SECURE •',
    from: -200,
    to: 200,
  },
];

function Row({ text, from, to, progress }: { text: string; from: number; to: number; progress: ReturnType<typeof useScroll>['scrollYProgress'] }) {
  const reduce = useReducedMotion();
  const x = useTransform(progress, [0, 1], reduce ? [0, 0] : [from, to]);

  return (
    <motion.div style={{ x }} className="-ml-[40vw] w-max whitespace-nowrap will-change-transform">
      <span className="block font-heading text-[5.5rem] font-black uppercase leading-[0.82] tracking-tighter text-linen/85 sm:text-[9.5rem] md:text-[11.5rem] lg:text-[13.5rem] xl:text-[15rem]">
        {text}
      </span>
    </motion.div>
  );
}

// Full-bleed rows of giant type that slide sideways as the section scrolls through the viewport,
// alternating direction row to row. Fills its (relatively positioned) parent edge to edge.
export function ScrollMarquee() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });

  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none absolute inset-0 z-0 flex select-none flex-col justify-between overflow-hidden py-2 sm:py-4"
    >
      {ROWS.map((row) => (
        <Row key={row.text} {...row} progress={scrollYProgress} />
      ))}
    </div>
  );
}
