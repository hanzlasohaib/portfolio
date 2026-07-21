# Quality Checklist

> Version: 1.2.0
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

Production host: `https://portfolio-eta-rust-yq70o12jnn.vercel.app`

- [x] Home, About, Projects, Journey, Contact render (HTTP 200 on production)
- [x] Contact form creates a message (`POST /api/contact` → 201; smoke id `ba7e27c9-55c7-4df3-8876-f83c3561a119` — safe to archive/delete in dashboard)
- [x] Login → dashboard → refresh keeps session → logout (owner-verified on production)
- [x] Guests hitting `/dashboard` redirect to `/login` (HTTP 307 → `/login?next=%2Fdashboard`)
- [ ] Projects / Journey CRUD in dashboard reflects on public pages (manual confirm in dashboard once)
- [x] Theme toggle present with accessible label (`ThemeToggle` aria-label); spot-check mobile layout in browser

## Performance

- [ ] Lighthouse Performance reviewed on production (mobile + desktop) — run in Chrome DevTools / PageSpeed
- [x] Public pages are primarily Server Components (feature pages under `app/(public)`)
- [x] No content `<img>` / `next/image` assets in V1 UI; OG image via `next/og` (`opengraph-image.tsx`)

## Accessibility

- [x] Interactive controls use buttons/links with keyboard-capable defaults; modals use `aria-modal` / labelled-by
- [x] Global `:focus-visible` ring in `globals.css`
- [x] Shared `Input` / `Textarea` associate labels via `htmlFor` + `aria-describedby` / `aria-invalid`
- [ ] Color contrast adequate in light and dark themes (manual spot-check)

## SEO

- [x] Metadata present on public routes (`buildPageMetadata` on Home/About/Projects/Journey/Contact)
- [x] `robots.txt` and `sitemap.xml` resolve (HTTP 200; sitemap uses production host)
- [x] `NEXT_PUBLIC_SITE_URL` matches live host (`https://portfolio-eta-rust-yq70o12jnn.vercel.app`)
- [x] Open Graph image loads (`/opengraph-image` → HTTP 200)

## Security (V1-applicable)

See also `docs/security/security-checklist.md`.

- [x] HTTPS (Vercel)
- [x] Required env vars configured on host
- [x] Secure HTTP-only auth cookies
- [x] Prisma migrations applied
- [x] Baseline security headers observed on production (`X-Frame-Options`, `X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy`, `Strict-Transport-Security`)
- [x] Test Admin retained for V1 — dashboard login on Vercel uses the seeded User in Supabase
- [ ] `JWT_SECRET` rotated if previously exposed (owner decision)
- [x] No debug/admin endpoints outside `/dashboard` + `/api/auth/*` + `/api/contact`

## Remaining to close Phase 4

1. Manual: confirm one Projects/Journey edit appears on the public site.
2. Manual: Lighthouse pass (Performance) on production.
3. Manual: quick contrast check in light + dark.
4. Optional: rotate `JWT_SECRET` if it was ever shared.

## Deferred (documented, not Phase 4 blockers)

- Rate limiting
- reCAPTCHA
- Resend transactional email
- Full CSP (add via ADR when needed)
