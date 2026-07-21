# Quality Checklist

> Version: 1.4.1
>
> Status: Completed (Phase 4)
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
- [x] Projects / Journey CRUD in dashboard reflects on public pages (owner-verified 2026-07-21)
- [x] Theme toggle present with accessible label (`ThemeToggle` aria-label); spot-check mobile layout in browser

## Performance

- [x] Lighthouse on production (owner-reported): Performance **78**, Accessibility **100**, Best Practices **100**, SEO **100**
- [x] Public pages are primarily Server Components (feature pages under `app/(public)`)
- [x] No content `<img>` / `next/image` assets in V1 UI; OG image via `next/og` (`opengraph-image.tsx`)

> Note: Performance 78 accepted for V1. Further optimization (fonts, JS weight, caching) remains optional.

## Accessibility

- [x] Interactive controls use buttons/links with keyboard-capable defaults; modals use `aria-modal` / labelled-by
- [x] Global `:focus-visible` ring in `globals.css`
- [x] Shared `Input` / `Textarea` associate labels via `htmlFor` + `aria-describedby` / `aria-invalid`
- [x] Color contrast / a11y covered by Lighthouse Accessibility **100**

## SEO

- [x] Metadata present on public routes (`buildPageMetadata` on Home/About/Projects/Journey/Contact)
- [x] `robots.txt` and `sitemap.xml` resolve (HTTP 200; sitemap uses production host)
- [x] `NEXT_PUBLIC_SITE_URL` matches live host (`https://portfolio-eta-rust-yq70o12jnn.vercel.app`)
- [x] Open Graph image loads (`/opengraph-image` → HTTP 200)
- [x] Lighthouse SEO **100**

## Security (V1-applicable)

See also `docs/security/security-checklist.md`.

- [x] HTTPS (Vercel)
- [x] Required env vars configured on host
- [x] Secure HTTP-only auth cookies
- [x] Prisma migrations applied
- [x] Baseline security headers observed on production (`X-Frame-Options`, `X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy`, `Strict-Transport-Security`)
- [x] Test Admin retained for V1 — dashboard login on Vercel uses the seeded User in Supabase
- [x] `JWT_SECRET` not rotated — owner confirmed it was never shared
- [x] No debug/admin endpoints outside `/dashboard` + `/api/auth/*` + `/api/contact`

## Phase 4 closed

Completed 2026-07-21. Release tag: `v1.4-production-ready`.

Optional follow-ups (non-blocking):

- Improve Lighthouse Performance further if desired

## Deferred (documented, not Phase 4 blockers)

- Rate limiting
- reCAPTCHA
- Resend transactional email
- Full CSP (add via ADR when needed)
