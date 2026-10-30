# Stripe checkout (en-US and pt-BR, USD)

Stripe is the site's only payment provider. The English and Portuguese pages
both use the same **Stripe hosted Checkout**, billed in USD (activated by
`STRIPE_SECRET_KEY`); only the copy, the line-item names and the return URLs
follow the page's locale.

## How it works

```text
en-US or pt-BR configurator / build button
    ↓  POST /api/checkout/stripe  { flow: 'subscription' | 'build', locale: 'en-US' | 'pt-BR', ... }
Server validates selections and derives USD amounts (never trusts the browser)
    ↓  POST https://api.stripe.com/v1/checkout/sessions
Stripe creates a hosted Checkout Session (subscription or one-time payment)
    ↓  returns id + url (https://checkout.stripe.com/...)
Browser is redirected to Stripe's hosted checkout
    ↓
Customer pays; Stripe redirects to /checkout/complete/ (en-US) or
/pt-br/checkout/complete/ (pt-BR) with ?session_id=…
    ↓  GET /v1/checkout/sessions/{id} verifies payment_status === 'paid'
```

- **Pricing:** subscriptions use the catalog's stored USD references or the
  5:1 reference rate (`BRL_USD_REFERENCE_RATE`); the ads fee is
  `max(spendUSD × 10%, $100)` (`adSpendFeeUSD`). One-time builds use the
  en-US build table (`WEBSITE_BUILD_BASE_PRICE`). All amounts are derived
  server-side in `src/lib/server/stripe.ts` (`computeUsdMonthlyQuote`).
- **Locale:** the endpoint accepts `locale: 'en-US'` or `'pt-BR'` and rejects
  anything else with 400 `invalid_locale`. The locale picks the line-item
  names (English or Portuguese) and the return URLs: success
  `/checkout/complete/` or `/pt-br/checkout/complete/`, cancel `/services/`
  or `/pt-br/servicos/`. Amounts are the same USD amounts on both locales.
- **Client:** `SubscribeSection.svelte` and `WebsiteBuildPricing.svelte`
  render the full checkout form on both locales, show USD amounts, and POST
  to `/api/checkout/stripe` (`fetchCheckoutUrl` in `src/lib/client/checkout.ts`).
- **Return pages:** `/checkout/complete/` and `/pt-br/checkout/complete/`
  share one loader (`src/lib/server/stripe-completion.ts`) that verifies
  `session_id` live against Stripe before claiming success; only
  `payment_status: paid` renders "approved" (open/processing → pending;
  complete-but-unpaid → truthfully unconfirmed), and only for sessions bound
  to a checkout this server created (reference, USD amount and currency).
- **Webhook:** `POST /api/webhooks/stripe` verifies the `stripe-signature`
  header with `STRIPE_WEBHOOK_SECRET` (signed payload `<ts>.<body>`,
  HMAC-SHA256, 5-minute recency) and emails the owner on
  `checkout.session.completed` with `payment_status: paid`. Redeliveries are
  deduped in memory by event id.

## Environment variables (Coolify → Environment Variables)

| Variable | Purpose |
|---|---|
| `STRIPE_SECRET_KEY` | Server-side API key (`sk_live_...` in prod, `sk_test_...` in test). Missing → the checkout endpoint returns 503 `missing_credentials` and the forms show "Payments are not configured yet" / "O pagamento ainda não está configurado". |
| `STRIPE_WEBHOOK_SECRET` | Webhook signing secret (`whsec_...`); missing → the webhook endpoint refuses with 503. |

No publishable key is needed: the site never embeds Stripe.js — the server
creates the hosted session and the browser redirects to its URL.

## Stripe setup

1. Create the Stripe account and get the **Secret key** (Dashboard →
   Developers → API keys). Set `STRIPE_SECRET_KEY` on Coolify.
2. Create a webhook endpoint in the Stripe Dashboard → Developers → Webhooks:
   URL `https://<site>/api/webhooks/stripe`, event
   `checkout.session.completed`. Copy the signing secret into
   `STRIPE_WEBHOOK_SECRET`.
3. The USD prices live in the catalog/website-builds tables — update the
   tables (and their display copy) to change prices; the server never reads a
   browser amount.

## Money hygiene

- Amounts are integer cents at the Stripe boundary (`unit_amount =
  round(amountUSD × 100)`); no float drift reaches the API.
- The BRL catalog prices stay the source the USD amounts derive from; USD
  derivations are the 5:1 reference or explicit USD tables — the same numbers
  both checkout forms display, so what the customer sees is what Stripe
  bills.
- `idempotencyKey` (UUID, reused per unchanged payload) maps to Stripe's
  `Idempotency-Key` header, deduping double-submits.

## Testing

`npm run test` covers: USD quote derivation (fixed/ads/floor/invalid), session
creation (form body, recurring vs one-time, URL validation, error mapping),
the endpoint (validation, both locales' names and return URLs, 503 missing
creds, upstream status mapping, rate limit), both return pages
(paid/pending/unconfirmed/missing/error/rate-limit, plus the pt-BR copy),
and the webhook (signature, paid → owner email, dedupe, ignored types). All
Stripe calls are mocked — no real API requests.
