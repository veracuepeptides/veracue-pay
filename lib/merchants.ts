import { timingSafeEqual } from 'node:crypto';

// Every business that takes payments through VeracuePay is registered here. Nothing is ever
// charged to a business that isn't in this registry.
//
// Charges are made directly on VeracuePay's own Stripe account (the keys in STRIPE_SECRET_KEY).
// A merchant that has its own connected account can set stripeAccountId, and its charges then
// settle there as destination charges instead.
//
// One shop (the usual case) is described by plain variables:
//   SHOP_NAME            Veracue Labs                          shown to customers on the payment page
//   SHOP_URL             https://veracue-peptides.vercel.app   where customers are returned, and where
//                                                              webhook pings go ({SHOP_URL}/api/webhooks/veracuepay)
//   SHOP_ALT_URLS        https://veracuelabs.com,https://www.veracuelabs.com            (optional, comma separated)
//   SHOP_SUPPORT_EMAIL   orders@veracuelabs.com                    (optional, shown on the payment page)
//   VERACUEPAY_API_SECRET  64 random hex characters, the same value as on the shop's own site
// Its internal id is "veracue"; it is stamped on every payment so the payment can be traced to its shop.
//
// Several shops are described by VERACUEPAY_MERCHANTS instead, a JSON array. When it is set it is used
// and the SHOP_* variables are ignored. For example:
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

// What the environment declares, before validation: the JSON list if there is one, otherwise the
// single shop described by the SHOP_* variables.
function declaredMerchants(): unknown[] {
  const json = process.env.VERACUEPAY_MERCHANTS?.trim();
  if (json) {
    try {
      const parsed: unknown = JSON.parse(json);
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      console.error('VERACUEPAY_MERCHANTS is not valid JSON');
      return [];
    }
  }

  const url = process.env.SHOP_URL?.trim();
  if (!url) return [];
  const text = (name: string) => process.env[name]?.trim() || undefined;
  return [
    {
      id: 'veracue',
      name: text('SHOP_NAME'),
      origin: url,
      altOrigins: (process.env.SHOP_ALT_URLS || '').split(',').map((s) => s.trim()).filter(Boolean),
      secret: text('VERACUEPAY_API_SECRET'),
      supportEmail: text('SHOP_SUPPORT_EMAIL'),
      webhookUrl: text('SHOP_WEBHOOK_URL'),
    },
  ];
}

function load(): Merchant[] {
  if (cache) return cache;

  const list: Merchant[] = [];
  for (const item of declaredMerchants()) {
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
      console.error(`Skipping merchant "${String((item as { id?: string })?.id)}": needs a name (SHOP_NAME), an address (SHOP_URL, starting http:// or https://) and a 32+ character secret (VERACUEPAY_API_SECRET); stripeAccountId (acct_…) only if one is set`);
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

// Every address a merchant's customers may be sent back to, primary first. The position in this
// list is what gets stored on a payment, so Stripe never holds the merchant's own web address.
export function merchantOrigins(merchant: Merchant): string[] {
  return [merchant.origin, ...(merchant.altOrigins ?? [])];
}

// Splits an allowed return address into what is stored on the Stripe payment: which of the
// merchant's registered origins it is on (a position, not an address) and the path. Null when the
// address is not one the merchant may use.
export function encodeReturnUrl(
  url: unknown,
  merchant: Merchant,
): { returnOrigin: string; returnPath: string } | null {
  if (typeof url !== 'string' || !isReturnUrlAllowed(url, merchant)) return null;
  const parsed = new URL(url);
  const index = merchantOrigins(merchant).indexOf(parsed.origin);
  if (index < 0) return null;
  return { returnOrigin: String(index), returnPath: parsed.pathname + parsed.search };
}

// Rebuilds the full return address from what encodeReturnUrl stored, using only the merchant's
// registered origins, so the result can never point anywhere the merchant has not registered.
// Payments created before the address was split up carried it whole; those still work.
export function decodeReturnUrl(
  metadata: Record<string, string> | null | undefined,
  merchant: Merchant,
): string | null {
  if (!metadata) return null;

  if (metadata.returnOrigin !== undefined) {
    const origin = merchantOrigins(merchant)[Number(metadata.returnOrigin)];
    const path = metadata.returnPath;
    if (!origin || typeof path !== 'string') return null;
    // A path must stay a path: "//host" and "/\host" are how a redirect escapes to another site.
    if (!path.startsWith('/') || path.startsWith('//') || path.includes('\\')) return null;
    try {
      const rebuilt = new URL(path, origin);
      return rebuilt.origin === origin ? rebuilt.toString() : null;
    } catch {
      return null;
    }
  }

  const whole = metadata.returnUrl;
  return typeof whole === 'string' && isReturnUrlAllowed(whole, merchant) ? whole : null;
}

// Public view of a merchant, safe to send to the browser.
export function publicMerchant(m: Merchant) {
  return {
    name: m.name,
    statementDescriptor: m.statementDescriptor,
    supportEmail: m.supportEmail,
  };
}
