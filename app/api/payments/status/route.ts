import { getStripe } from '@/lib/stripe';
import { authenticateMerchant } from '@/lib/merchants';

// A merchant's own check on one of its payments. It never takes a webhook's word for the outcome;
// it asks here for the real, current state straight from Stripe. A merchant can only read its own.
export async function POST(req: Request) {
  const merchant = authenticateMerchant(req);
  if (!merchant) {
    return new Response('Unauthorized', { status: 401 });
  }

  try {
    const { paymentIntentId } = (await req.json()) || {};
    if (!paymentIntentId) {
      return new Response('Missing paymentIntentId', { status: 400 });
    }

    const paymentIntent = await getStripe().paymentIntents.retrieve(paymentIntentId, {
      expand: ['latest_charge'],
    });

    if (paymentIntent.metadata?.merchantId !== merchant.id) {
      return new Response('Not found', { status: 404 });
    }

    // Refund state lives on the charge.
    const charge =
      paymentIntent.latest_charge && typeof paymentIntent.latest_charge === 'object'
        ? paymentIntent.latest_charge
        : null;

    return Response.json({
      status: paymentIntent.status,
      amount: paymentIntent.amount,
      currency: paymentIntent.currency,
      metadata: paymentIntent.metadata,
      amountRefunded: charge?.amount_refunded ?? 0,
    });
  } catch (error: unknown) {
    console.error('veracuepay payments/status error:', error);
    return new Response(error instanceof Error ? error.message : 'Failed to retrieve payment status', {
      status: 500,
    });
  }
}
