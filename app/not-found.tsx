import Link from 'next/link';
import { PayShell } from './pay/PayShell';

export default function NotFound() {
  return (
    <PayShell>
      <div className="mx-auto flex min-h-[60vh] max-w-md flex-col items-center justify-center text-center">
        <p className="font-editorial text-xs uppercase tracking-[0.22em] text-terracotta">404</p>
        <h1 className="mt-4 font-heading text-[2.4rem] font-extrabold uppercase leading-[1.04] tracking-[-0.035em]">
          That page isn&rsquo;t here.
        </h1>
        <p className="mt-4 text-[15px] leading-relaxed text-obsidian/65">
          If you were trying to pay for an order, go back to the store and start checkout again.
        </p>
        <Link
          href="/"
          className="mt-9 inline-flex h-12 items-center rounded-full bg-obsidian px-7 text-[14px] font-semibold text-linen transition-colors hover:bg-charcoal"
        >
          VeracuePay home
        </Link>
      </div>
    </PayShell>
  );
}
