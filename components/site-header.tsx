'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { motion, useMotionValueEvent, useScroll } from 'framer-motion';
import { ArrowUpRight, Lock, Menu, X } from 'lucide-react';
import { BrandLogo } from './brand-logo';
import { SITE } from '@/lib/site';

const NAV = [
  { href: '#how-it-works', label: 'How it works' },
  { href: '#security', label: 'Security' },
  { href: '#businesses', label: 'For businesses' },
  { href: '#help', label: 'Help' },
  { href: '#faq', label: 'Questions' },
];

// Floating olive bar, same treatment on every screen size. Below md the links move into a menu.
export function SiteHeader() {
  const [open, setOpen] = useState(false);

  // Slides away while scrolling down and comes back on any scroll up, the same rules as the main
  // Veracue header: ignore jitter under 6px, and only hide once past the first 120px of the page.
  const [hidden, setHidden] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { scrollY } = useScroll();
  const lastY = useRef(0);

  useMotionValueEvent(scrollY, 'change', (y) => {
    setIsScrolled(y > 10);
    const difference = y - lastY.current;
    if (Math.abs(difference) > 6) {
      if (difference > 0 && y > 120) {
        setHidden(true);
      } else if (difference < 0) {
        setHidden(false);
      }
      lastY.current = y;
    }
  });

  useEffect(() => {
    setIsScrolled(window.scrollY > 10);
  }, []);

  // Close on Escape, and lock page scroll while the menu is open.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = prev;
    };
  }, [open]);

  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-50 w-full px-2 pt-2.5 sm:px-6 sm:pt-4 md:px-10">
      <motion.div
        variants={{ visible: { y: 0, opacity: 1 }, hidden: { y: -80, opacity: 0 } }}
        initial="visible"
        // An open menu keeps the header on screen.
        animate={hidden && !open ? 'hidden' : 'visible'}
        transition={{ duration: 0.28, ease: 'easeInOut' }}
        className={`relative w-full overflow-hidden rounded-2xl border border-stone/90 bg-sage transition-shadow duration-300 sm:rounded-[22px] ${
          hidden && !open ? 'pointer-events-none' : 'pointer-events-auto'
        } ${isScrolled ? 'shadow-[0_12px_32px_rgba(0,0,0,0.14)]' : 'shadow-[0_4px_20px_rgba(0,0,0,0.06)]'}`}
      >
        <div className="flex h-[54px] w-full items-center justify-between gap-3 px-3 sm:h-16 sm:px-6 md:h-[70px] lg:grid lg:grid-cols-[1fr_auto_1fr] lg:px-8">
          <nav aria-label="Primary" className="hidden items-center gap-1 lg:flex">
            {NAV.slice(0, 4).map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="rounded-full py-2 font-heading text-[13px] font-medium text-white/90 transition-colors hover:bg-white/15 hover:text-white px-3.5"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <Link href="/" aria-label="VeracuePay home" className="shrink-0 justify-self-center transition-opacity hover:opacity-90">
            {/* One logo per breakpoint keeps it crisp and in proportion at every width. */}
            <span className="sm:hidden">
              <BrandLogo size={22} />
            </span>
            <span className="hidden sm:inline lg:hidden">
              <BrandLogo size={28} />
            </span>
            <span className="hidden lg:inline">
              <BrandLogo size={34} />
            </span>
          </Link>

          <div className="flex items-center justify-end gap-2">
            <span className="hidden items-center gap-2 rounded-full border border-white/25 bg-white/15 px-3.5 py-1.5 font-heading text-[12px] font-medium text-white xl:inline-flex">
              <Lock className="h-3.5 w-3.5" />
              Secure checkout
            </span>
            <a
              href={`mailto:${SITE.supportEmail}`}
              className="group hidden h-9 items-center gap-1.5 rounded-full bg-white px-4 font-heading text-[13px] font-semibold text-obsidian transition-colors hover:bg-obsidian hover:text-linen sm:inline-flex"
            >
              Contact
              <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-px group-hover:translate-x-px" />
            </a>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? 'Close menu' : 'Open menu'}
              className="flex h-9 w-9 items-center justify-center rounded-full bg-white/15 text-white transition-colors hover:bg-white/25 lg:hidden"
            >
              {open ? <X className="h-[18px] w-[18px]" /> : <Menu className="h-[18px] w-[18px]" />}
            </button>
          </div>
        </div>

        {/* Mobile and tablet menu */}
        <div
          id="mobile-menu"
          className={`grid transition-[grid-template-rows] duration-300 ease-out lg:hidden ${open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}
        >
          <div className="overflow-hidden">
            <nav aria-label="Mobile" className="border-t border-white/20 px-3 pb-4 pt-2 sm:px-6">
              {NAV.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  tabIndex={open ? 0 : -1}
                  className="flex items-center justify-between border-b border-white/15 py-3.5 font-heading text-[17px] font-semibold tracking-tight text-white"
                >
                  {item.label}
                  <ArrowUpRight className="h-4 w-4 text-white/70" />
                </a>
              ))}
              <a
                href={`mailto:${SITE.supportEmail}`}
                tabIndex={open ? 0 : -1}
                className="mt-4 flex h-11 items-center justify-center gap-2 rounded-full bg-white font-heading text-[14px] font-semibold text-obsidian"
              >
                Contact support
                <ArrowUpRight className="h-4 w-4" />
              </a>
            </nav>
          </div>
        </div>
      </motion.div>
    </header>
  );
}
