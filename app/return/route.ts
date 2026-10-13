import { NextResponse } from 'next/server';
import { getStripe } from '@/lib/stripe';
import { decodeReturnUrl, getMerchantById } from '@/lib/merchants';

// Where Stripe sends the customer after they pay. The pay page gives Stripe this address instead of
// the merchant's own, so the merchant's web address never appears on the Stripe payment or in its
// request logs. From here the customer is forwarded to the merchant.
//
// The destination is never read from the request. It is rebuilt from what was stored on the
// PaymentIntent when the merchant created it (a position among its registered origins, and a path),
// so this can only ever lead to an address that merchant has registered, not an open redirect.
export const dynamic = 'force-dynamic';

export async function GET(req: Request) {
  const url = new URL(req.url);
  const pi = url.searchParams.get('pi');
  if (!pi) return NextResponse.redirect(new URL('/pay', url), 302);

  let destination: URL | null = null;
  try {
    const paymentIntent = await getStripe().paymentIntents.retrieve(pi);
    const merchant = getMerchantById(paymentIntent.metadata?.merchantId);
    const target = merchant ? decodeReturnUrl(paymentIntent.metadata, merchant) : null;
    if (target) destination = new URL(target);
  } catch {
    // Unknown payment: fall through to the pay page, which explains it.
  }

  // The address carries a payment reference and Stripe's client secret, so no browser or proxy may
  // store this redirect.
  const redirect = (to: URL) => {
    const response = NextResponse.redirect(to, 302);
    response.headers.set('Cache-Control', 'no-store');
    return response;
  };

  if (!destination) {
    return redirect(new URL(`/pay?pi=${encodeURIComponent(pi)}`, url));
  }

  // Stripe appends payment_intent, payment_intent_client_secret and redirect_status. Pass them on so
  // the merchant sees exactly what it would have if Stripe had redirected there directly.
  for (const [key, value] of url.searchParams) {
    if (key !== 'pi') destination.searchParams.set(key, value);
  }
  return redirect(destination);
}
