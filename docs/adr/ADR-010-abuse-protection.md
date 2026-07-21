# ADR-010: Abuse Protection (Upstash Rate Limiting, reCAPTCHA v3, CSP)

> Version: 1.0.0
>
> Status: Approved
>
> Last Updated: 2026-07-21
>
> Owner: Project Team
>
> Category: Architecture

---

# Context

Post-V1 production surfaces that accept unauthenticated writes (login, MFA challenge, contact) need defense against credential stuffing, OTP spam, and form abuse.

ADR-009 intentionally excluded Redis from **page and data caching**. That decision remains. Distributed **rate limiting** across Vercel serverless instances does require a shared store; in-process counters are ineffective.

Google reCAPTCHA v3 and a Content-Security-Policy (CSP) are already listed in the security checklist as deferred follow-ups.

---

# Decision

## 1. Upstash Redis for rate limiting only

Use `@upstash/redis` + `@upstash/ratelimit` with REST credentials:

- `UPSTASH_REDIS_REST_URL`
- `UPSTASH_REDIS_REST_TOKEN`

Apply sliding-window limits per client IP on:

| Route | Limit |
|-------|-------|
| `POST /api/auth/login` | 5 / 15 minutes |
| `POST /api/auth/mfa/verify` and `POST /api/auth/mfa/resend` | 10 / 15 minutes (shared bucket) |
| `POST /api/contact` | 5 / 1 hour |

When Upstash env is incomplete, rate limiting is skipped (local/dev convenience). Production should set both variables.

**Out of scope for this ADR:** Redis as a Next.js data/page cache, CacheProvider, or ISR replacement. ADR-009 continues to govern caching.

## 2. Google reCAPTCHA v3

Require a valid reCAPTCHA v3 token (minimum score **0.5**) on login, MFA verify/resend, and contact when both are set:

- `NEXT_PUBLIC_RECAPTCHA_SITE_KEY`
- `RECAPTCHA_SECRET_KEY`

When incomplete, verification is skipped. When present, missing or failed tokens are rejected.

## 3. Content-Security-Policy

Add a CSP header in `next.config.ts` alongside existing baseline security headers. Allow `'self'` defaults plus Google reCAPTCHA script/frame/connect hosts required for v3.

---

# Consequences

## Positive

- Shared rate limits work across serverless instances
- Bot friction on public write endpoints without changing JWT session model
- CSP reduces XSS impact as defense-in-depth

## Negative

- Additional external dependencies (Upstash, Google)
- CSP may need tuning if new third-party scripts are added
- Optional env gating means misconfigured production can silently skip protections — operators must set env on Vercel

---

# Alternatives Considered

## Prisma / PostgreSQL rate-limit table

Rejected for this pass: owner requested Redis; Upstash is the Vercel-native fit.

## Redis for general caching

Rejected: ADR-009 still applies; no profiling justification for cache Redis.

## reCAPTCHA v2 checkbox

Rejected: v3 is documented in backend architecture and is less disruptive to UX.
