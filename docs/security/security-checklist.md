# Security Checklist

> Version: 1.1.0
>
> Status: Approved (Phase 4 tracking)
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
- [ ] JWT secret rotated for production if the development secret was ever shared
- [x] Prisma migrations applied
- [x] Security headers configured (`next.config.ts`)
- [ ] Demo / seed admin replaced with a real production admin
- [ ] No secrets committed (`.env` gitignored; only `.env.example` tracked)

## Deferred (future ADR / later phase — not V1 Phase 4 blockers)

- [ ] Rate limiting enabled
- [ ] reCAPTCHA enabled
- [ ] CSP headers configured (beyond baseline headers)
- [ ] Lighthouse security audit passed

## Hygiene

- [ ] No unnecessary `console.log` in production paths
- [ ] No placeholder TODOs pretending to be complete features
- [ ] No debug endpoints
