# VeracuePay

A hosted payment page for independent businesses, plus a public page explaining how it works.
Next.js 15 (App Router), Tailwind 4, Stripe Payment Element, Stripe Connect.

```bash
cp .env.example .env.local   # fill in the values
npm install
npm run dev
```

## How the platform is set up

- **One payment page, many registered sites.** Every site that takes payments through VeracuePay is registered
  in `VERACUEPAY_MERCHANTS`. A payment for a merchant that isn't registered is refused.
- **Each checkout names the business.** The pay page looks the merchant up from the payment itself and shows
  its name, order and amount.
- **Charges are made on VeracuePay's own Stripe account** (the keys in `.env`), the same model as nextlvlpay.
  A merchant that has its own Stripe Connect connected account can set `stripeAccountId`, and its payments
  become destination charges (`on_behalf_of` + `transfer_data`) that settle there instead.
- **A merchant can only act as itself.** Each merchant has its own secret; the secret identifies the merchant,
  and a merchant can only read its own payments and return customers to its own registered origins
  (`origin` plus any `altOrigins`).

Register a site by adding an entry to `VERACUEPAY_MERCHANTS` (see `.env.example`) and giving the site its secret.
Only lawful businesses that meet Stripe's terms should be registered.

## Merchant integration

All server-to-server calls send `Authorization: Bearer <merchant secret>`.

1. **Create** — `POST /api/payments/create` with `{ orderId, amount, currency, returnUrl, customerEmail?, description? }`
   (`amount` in major units, e.g. `151.95`; `returnUrl` must be on the merchant's registered origin).
   Returns `{ paymentIntentId }`.
2. **Redirect** the customer to `https://<this site>/pay?pi=<paymentIntentId>`.
3. After payment Stripe returns the customer to `returnUrl`.
4. **Verify** — `POST /api/payments/status` with `{ paymentIntentId }` returns the real state from Stripe.
   Never trust the redirect alone.
5. **Webhook fallback** — VeracuePay POSTs `{ orderId, eventType: 'succeeded' | 'failed' | 'refunded' }` to the
   merchant's `webhookUrl` (default `{origin}/api/webhooks/veracuepay`) with the same bearer secret. The merchant
   should re-check via step 4 before acting.

## Identity and design

Platform identity lives in `lib/site.ts`, driven by `NEXT_PUBLIC_*` env vars. The palette is the Veracue brand set
(terracotta, almond, linen, alabaster, sand, sage, stone, plus olive-charcoal for dark surfaces), defined as
tokens in `app/globals.css`. Type is Sora with Plus Jakarta Sans. All artwork is original SVG/CSS in
`components/art.tsx`.
