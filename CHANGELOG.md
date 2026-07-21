# Changelog

All notable architectural and implementation changes are documented here.

The format follows Keep a Changelog principles.

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
Lighthouse (production): Performance 78 · Accessibility 100 · Best Practices 100 · SEO 100.
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
