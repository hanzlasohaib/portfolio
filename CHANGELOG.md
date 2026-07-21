# Changelog

All notable architectural and implementation changes are documented here.

The format follows Keep a Changelog principles.

---

## [1.6.0] - 2026-07-21

### Added

- ADR-010 abuse protection: Upstash Redis rate limiting on login / MFA / contact
- Google reCAPTCHA v3 on login, MFA verify/resend, and contact (when keys configured)
- `Content-Security-Policy` header alongside existing security headers

### Changed

- Rate limiting and reCAPTCHA skip when their env sets are incomplete (local/dev)

### Status

Post-V1 hardening available when Upstash and/or reCAPTCHA env vars are set on the host.

---

## [1.5.0] - 2026-07-21

### Added

- Email OTP MFA after password login (Resend + `MFA_NOTIFY_EMAIL`)
- `MfaChallenge` model and `/api/auth/mfa/verify` + `/api/auth/mfa/resend`
- Login UI OTP step when MFA env is configured

### Changed

- Password-only login remains when Resend/MFA env is incomplete

### Status

Post-V1 MFA available when `RESEND_API_KEY`, `RESEND_FROM_EMAIL`, and `MFA_NOTIFY_EMAIL` are set. Owner-verified on production. Git tag: `v1.5-mfa`.

---

## [1.4.0] - 2026-07-21

### Added

- Phase 4 quality close: production smoke tests, security headers verification, Lighthouse review
- Phase 5 release tag `v1.4-production-ready`

### Changed

- Confirmed dashboard Projects/Journey CRUD reflects on public pages
- Marked Phases 4–5 complete in roadmap and README

### Status

V1 production-ready.
Lighthouse (production): Performance 79 · Accessibility 100 · Best Practices 100 · SEO 100.
Git tags: `v1.2-backend`, `v1.3-phase3-complete`, `v1.4-production-ready`.

---

## [1.3.0] - 2026-07-21

### Added

- Phase 3 backend: Prisma/Supabase, JWT admin auth, protected dashboard, feature CRUD
- Dashboard UX polish: toasts, confirm dialogs, empty states, search, optimistic deletes
- Auth hardening for production cookie storage and clearer login API errors
- Phase 4 kickoff: baseline security headers in `next.config.ts`

### Changed

- Marked Phase 3 complete; Phase 4 (Quality) in progress
- Updated README production env guidance

### Status

Phase 3 complete. Phase 4 quality work in progress.
Git tags: `v1.2-backend`, `v1.3-phase3-complete`.

---

## [1.0.0] - 2026-07-16

### Added

- Established v1.0 Architecture Baseline
- Completed architecture documentation
- Completed UI/UX documentation
- Defined database naming conventions
- Finalized folder structure
- Added component inventory
- Added Architecture Decision Records
- Established documentation standards

### Status

Architecture baseline frozen.
Ready for implementation.
