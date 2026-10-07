import type { Metadata } from 'next';
import { getStripe } from '@/lib/stripe';
import { getMerchantById, isReturnUrlAllowed, publicMerchant } from '@/lib/merchants';
import { PayClient } from './PayClient';
import { PayShell } from './PayShell';
import { SITE } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Complete your payment',
  robots: { index: false, follow: false },
};

// Always read the PaymentIntent fresh.
export const dynamic = 'force-dynamic';

export default async function PayPage({ searchParams }: { searchParams: Promise<{ pi?: string }> }) {
  const { pi } = await searchParams;

  if (!pi) {
    return <Unavailable title="Payment link incomplete" message="This link is missing its payment reference. Please use the link from your order." />;
  }

  let paymentIntent;
  try {
    paymentIntent = await getStripe().paymentIntents.retrieve(pi);
  } catch {
    return <Unavailable title="We couldn’t find this payment" message="It may have expired. Head back to the business’s website and start checkout again." />;
  }

  // Who is being paid, and where to send the customer afterwards, live only in the PaymentIntent's
  // metadata, set once server-side when the payment was created. Nothing is read from the URL.
  const merchant = getMerchantById(paymentIntent.metadata?.merchantId);
  const returnUrl = paymentIntent.metadata?.returnUrl;
  if (!merchant || !returnUrl || !isReturnUrlAllowed(returnUrl, merchant)) {
    return <Unavailable title="This payment link isn’t valid" message="We can’t tell who this payment is for, so we won’t take it. Please return to the website you came from." />;
  }

  if (paymentIntent.status === 'succeeded') {
    return (
      <Unavailable
        title="This order is already paid"
        message={`Nothing more to do here. Your confirmation is waiting at ${merchant.name}.`}
        action={{ href: returnUrl, label: `Back to ${merchant.name}` }}
      />
    );
  }

  if (paymentIntent.status === 'canceled' || !paymentIntent.client_secret) {
    return <Unavailable title="This payment can no longer be completed" message={`Return to ${merchant.name} and start checkout again.`} />;
  }

  return (
    <PayClient
      clientSecret={paymentIntent.client_secret}
      returnUrl={returnUrl}
      amount={paymentIntent.amount}
      currency={paymentIntent.currency}
      orderId={orderLabel(paymentIntent.metadata)}
      merchant={publicMerchant(merchant)}
    />
  );
}

// The order as the customer knows it: the merchant's display number when it sent one, otherwise its
// own reference. A purely numeric one is shown as "#1280", matching how shops write order numbers.
function orderLabel(metadata: Record<string, string> | null | undefined): string | undefined {
  const value = metadata?.orderNumber || metadata?.orderId;
  if (!value) return undefined;
  return /^\d+$/.test(value) ? `#${value}` : value;
}

function Unavailable({
  title,
  message,
  action,
}: {
  title: string;
  message: string;
  action?: { href: string; label: string };
}) {
  return (
    <PayShell>
      <div className="mx-auto flex min-h-[60vh] max-w-md flex-col items-center justify-center text-center">
        <h1 className="font-heading text-[2.2rem] font-extrabold uppercase leading-[1.04] tracking-[-0.035em]">{title}</h1>
        <p className="mt-4 text-[15px] leading-relaxed text-obsidian/65">{message}</p>
        <a
          href={action?.href ?? '/'}
          className="mt-9 inline-flex h-12 items-center rounded-full bg-obsidian px-7 font-heading text-[14px] font-semibold text-linen transition-colors hover:bg-terracotta hover:text-obsidian"
        >
          {action?.label ?? `About ${SITE.name}`}
        </a>
        <p className="mt-6 text-[13px] text-obsidian/50">
          Need help?{' '}
          <a className="font-medium underline underline-offset-4" href={`mailto:${SITE.supportEmail}`}>
            {SITE.supportEmail}
          </a>
        </p>
      </div>
    </PayShell>
  );
}
