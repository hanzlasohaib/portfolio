# Security Checklist

> Version: 1.2.0
>
> Status: Approved (Phase 4 + ADR-010)
>
> Last Updated: 2026-07-21
>
> Owner: Project Team
>
> Category: Security

---

## Before production (V1-applicable)

- [x] HTTPS enabled (Vercel)
- [x] Environment variables configured (`DATABASE_URL`, `DIRECT_URL`, `JWT_SECRET`, `NEXT_PUBLIC_SITE_URL`)
- [x] Secure cookies (`httpOnly`, `secure` in production, `sameSite=lax`)
- [x] JWT secret not rotated — owner confirmed it was never shared
- [x] Prisma migrations applied
- [x] Security headers configured (`next.config.ts`) — verified on production response
- [x] Test Admin retained for V1 — can sign in on Vercel via the seeded DB user (SEED_ADMIN_* not required as Vercel runtime env)
- [ ] No secrets committed (`.env` gitignored; only `.env.example` tracked)

## Post-V1 abuse protection (ADR-010)

- [x] Rate limiting enabled (Upstash Redis on login / MFA / contact when `UPSTASH_REDIS_REST_*` set)
- [x] reCAPTCHA v3 enabled (login / MFA / contact when site + secret keys set)
- [x] CSP headers configured (`Content-Security-Policy` in `next.config.ts`)
- [ ] Lighthouse Best Practices / security spot-check after deploy (confirm CSP does not break login/contact)

## Deferred (future ADR / later phase)

- [ ] Stricter CSP (nonces / no `unsafe-inline` / `unsafe-eval`) if tooling allows
- [ ] Lighthouse security audit recorded after production redeploy

## Hygiene

- [ ] No unnecessary `console.log` in production paths
- [ ] No placeholder TODOs pretending to be complete features
- [ ] No debug endpoints
