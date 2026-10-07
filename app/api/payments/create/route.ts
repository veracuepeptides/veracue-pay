import { createHash } from 'node:crypto';
import type Stripe from 'stripe';
import { getStripe } from '@/lib/stripe';
import { authenticateMerchant, isReturnUrlAllowed } from '@/lib/merchants';

// Stripe's ceiling for a single USD charge ($999,999.99). Anything above is a bug on the caller's side.
const MAX_AMOUNT_CENTS = 99_999_999;

// Called server-to-server by a registered merchant after it has created its own pending order.
// The merchant is identified by its secret, and the amount is trusted because this endpoint is
// never reachable from a customer's browser.
//
// By default the charge is made directly on VeracuePay's own Stripe account. A merchant that has a
// connected account (stripeAccountId) gets a destination charge instead, made on behalf of, and
// settling to, that account.
export async function POST(req: Request) {
  const merchant = authenticateMerchant(req);
  if (!merchant) {
    return new Response('Unauthorized', { status: 401 });
  }

  try {
    const { orderId, orderNumber, amount, currency, returnUrl, customerEmail, description } = (await req.json()) || {};

    if (!orderId || typeof amount !== 'number' || !(amount > 0) || !currency || !returnUrl) {
      return new Response('Missing or invalid fields', { status: 400 });
    }

    if (!isReturnUrlAllowed(returnUrl, merchant)) {
      return new Response('returnUrl must be on one of your registered origins', { status: 400 });
    }

    const amountInCents = Math.round(amount * 100);
    if (amountInCents < 50) {
      return new Response('Amount too low for card processing (minimum $0.50)', { status: 400 });
    }

    if (amountInCents > MAX_AMOUNT_CENTS) {
      return new Response('Amount too high', { status: 400 });
    }

    const cur = String(currency).toLowerCase();
    const params: Stripe.PaymentIntentCreateParams = {
      amount: amountInCents,
      currency: cur,
      automatic_payment_methods: { enabled: true },
      ...(merchant.stripeAccountId
        ? { on_behalf_of: merchant.stripeAccountId, transfer_data: { destination: merchant.stripeAccountId } }
        : {}),
      description: typeof description === 'string' && description ? description : `${merchant.name} order ${orderId}`,
      ...(typeof customerEmail === 'string' && customerEmail ? { receipt_email: customerEmail } : {}),
      metadata: {
        merchantId: merchant.id,
        // The merchant's own reference, used to find the order again when the payment is verified.
        orderId: String(orderId),
        // What the customer knows the order as, if that differs from the reference above. Only ever
        // shown on the payment page; it is never used to look anything up.
        ...(typeof orderNumber === 'string' || typeof orderNumber === 'number'
          ? (String(orderNumber).trim() ? { orderNumber: String(orderNumber).trim().slice(0, 40) } : {})
          : {}),
        returnUrl,
      },
    };

    // A retried call with identical details replays the same PaymentIntent. The key covers every
    // parameter, so the same order arriving with a different return address or email gets its own
    // PaymentIntent rather than a Stripe idempotency conflict.
    const fingerprint = createHash('sha256').update(JSON.stringify(params)).digest('hex').slice(0, 16);
    let key = `veracuepay-create-${merchant.id}-${orderId}-${amountInCents}-${cur}-${fingerprint}`;
    const stripe = getStripe();
    let paymentIntent = await stripe.paymentIntents.create(params, { idempotencyKey: key });

    // A replay can hand back an earlier PaymentIntent that has since been canceled, and a canceled
    // one can never be paid. Stripe replays the response saved when the key was first used, which
    // still says "requires_payment_method", so the live status has to be read before deciding.
    // A canceled one is replaced with a fresh PaymentIntent under a new key.
    for (let attempt = 0; attempt < 5; attempt++) {
      const live = await stripe.paymentIntents.retrieve(paymentIntent.id);
      if (live.status !== 'canceled') break;
      key = `${key}-after-${paymentIntent.id}`;
      paymentIntent = await stripe.paymentIntents.create(params, { idempotencyKey: key });
    }

    return Response.json({ paymentIntentId: paymentIntent.id });
  } catch (error: unknown) {
    console.error('veracuepay payments/create error:', error);
    return new Response(error instanceof Error ? error.message : 'Failed to create payment', { status: 500 });
  }
}
