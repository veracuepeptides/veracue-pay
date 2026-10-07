import { timingSafeEqual } from 'node:crypto';

// Every business that takes payments through VeracuePay is registered here. Nothing is ever
// charged to a business that isn't in this registry.
//
// Charges are made directly on VeracuePay's own Stripe account (the keys in STRIPE_SECRET_KEY).
// A merchant that has its own connected account can set stripeAccountId, and its charges then
// settle there as destination charges instead.
//
// VERACUEPAY_MERCHANTS is a JSON array, for example:
//   [{
//     "id": "acme",
//     "name": "Acme Studio",
//     "origin": "https://acme.example",              // also where webhook pings go by default
//     "altOrigins": ["https://www.acme.example"],    // optional, other sites customers may return to
//     "secret": "<long random string, unique per merchant>",
//     "stripeAccountId": "acct_123",                 // optional, only for a connected account
//     "statementDescriptor": "ACME STUDIO",          // optional, shown to the customer
//     "supportEmail": "help@acme.example",           // optional
//     "webhookUrl": "https://acme.example/api/webhooks/veracuepay"   // optional
//   }]
export interface Merchant {
  id: string;
  name: string;
  origin: string;
  altOrigins?: string[];
  secret: string;
  stripeAccountId?: string;
  statementDescriptor?: string;
  supportEmail?: string;
  webhookUrl?: string;
}

let cache: Merchant[] | null = null;

function load(): Merchant[] {
  if (cache) return cache;

  let raw: unknown = [];
  try {
    raw = JSON.parse(process.env.VERACUEPAY_MERCHANTS || '[]');
  } catch {
    console.error('VERACUEPAY_MERCHANTS is not valid JSON');
  }

  const list: Merchant[] = [];
  for (const item of Array.isArray(raw) ? raw : []) {
    const m = item as Partial<Merchant>;
    const valid =
      typeof m.id === 'string' && m.id &&
      typeof m.name === 'string' && m.name &&
      typeof m.origin === 'string' && /^https?:\/\//.test(m.origin) &&
      typeof m.secret === 'string' && m.secret.length >= 32 &&
      (m.stripeAccountId === undefined || (typeof m.stripeAccountId === 'string' && m.stripeAccountId.startsWith('acct_'))) &&
      (m.altOrigins === undefined ||
        (Array.isArray(m.altOrigins) && m.altOrigins.every((o) => typeof o === 'string' && /^https?:\/\//.test(o))));
    if (!valid) {
      console.error(`Skipping merchant "${String((item as { id?: string })?.id)}": needs id, name, origin and a 32+ character secret; stripeAccountId (acct_…) only if one is set`);
      continue;
    }
    list.push({
      ...(m as Merchant),
      origin: new URL(m.origin as string).origin,
      altOrigins: (m.altOrigins ?? []).map((o) => new URL(o).origin),
    });
  }

  cache = list;
  return list;
}

export function getMerchantById(id: string | undefined | null): Merchant | null {
  if (!id) return null;
  return load().find((m) => m.id === id) ?? null;
}

// The merchant is identified by its own secret, so one merchant can never act as another.
export function authenticateMerchant(req: Request): Merchant | null {
  const supplied = Buffer.from(req.headers.get('authorization') ?? '');
  let match: Merchant | null = null;
  for (const merchant of load()) {
    const expected = Buffer.from(`Bearer ${merchant.secret}`);
    if (supplied.length === expected.length && timingSafeEqual(supplied, expected)) match = merchant;
  }
  return match;
}

// Customers are only ever sent back to a registered site of the business they paid.
export function isReturnUrlAllowed(url: string, merchant: Merchant): boolean {
  try {
    const origin = new URL(url).origin;
    return origin === merchant.origin || (merchant.altOrigins ?? []).includes(origin);
  } catch {
    return false;
  }
}

// Public view of a merchant, safe to send to the browser.
export function publicMerchant(m: Merchant) {
  return {
    name: m.name,
    statementDescriptor: m.statementDescriptor,
    supportEmail: m.supportEmail,
  };
}
