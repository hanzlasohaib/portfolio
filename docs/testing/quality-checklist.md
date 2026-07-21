# Quality Checklist

> Version: 1.1.0
>
> Status: In Progress (Phase 4)
>
> Last Updated: 2026-07-21
>
> Owner: Project Team
>
> Category: Testing

---

Use this checklist to close Phase 4. Commands must pass before release:

```text
npm run lint
npm run typecheck
npm run build
```

## Smoke tests (local + production)

- [ ] Home, About, Projects, Journey, Contact render
- [ ] Contact form creates a message (dashboard Messages)
- [ ] Login → dashboard → refresh keeps session → logout
- [ ] Guests hitting `/dashboard` redirect to `/login`
- [ ] Projects / Journey CRUD in dashboard reflects on public pages
- [ ] Theme toggle works; no obvious layout break on mobile

## Performance

- [ ] Lighthouse Performance reviewed on production (mobile + desktop)
- [ ] No unbounded client bundles on public pages (Server Components preferred)
- [ ] Images use Next.js `Image` where applicable

## Accessibility

- [ ] Keyboard reachability for nav, forms, modals, dashboard actions
- [ ] Visible focus styles
- [ ] Form labels / errors associated correctly
- [ ] Color contrast adequate in light and dark themes

## SEO

- [ ] Metadata present on public routes
- [ ] `robots.txt` and `sitemap.xml` resolve
- [ ] `NEXT_PUBLIC_SITE_URL` matches the live canonical host
- [ ] Open Graph image loads

## Security (V1-applicable)

See also `docs/security/security-checklist.md`.

- [x] HTTPS (Vercel)
- [x] Required env vars configured on host
- [x] Secure HTTP-only auth cookies
- [x] Prisma migrations applied
- [x] Baseline security headers (`next.config.ts`)
- [x] Test Admin retained for V1 — dashboard login on Vercel uses the seeded User in Supabase
- [ ] `JWT_SECRET` rotated if previously exposed
- [ ] No debug/admin endpoints outside `/dashboard` + auth APIs

## Deferred (documented, not Phase 4 blockers)

- Rate limiting
- reCAPTCHA
- Resend transactional email
- Full CSP (add via ADR when needed)
