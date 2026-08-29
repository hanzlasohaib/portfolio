# Dynamic Content Architecture

> Version: 1.3.0
>
> Status: Approved
>
> Last Updated: 2026-08-29
>
> Owner: Project Team
>
> Category: Architecture

---

## Purpose

Defines which portfolio content is database/dashboard-managed vs code/config, where content lives, and how fallbacks work. This document freezes V1 dynamic content scope based on the completed static vs dynamic audit (2026-08-27), plus P1 and P2 implementation, and the final dynamic-content audit (2026-08-29) that added search metadata, availability, and derived About snapshot stats.

---

## Content Classification

### Database-managed (Dashboard CRUD)

Content you can edit via `/dashboard/*` without touching source code.

| Content | Prisma model | Dashboard route | Public display |
|---------|--------------|-----------------|----------------|
| **Projects** | `Project`, `ProjectTechnology`, `Technology` | `/dashboard/projects` | Home, `/projects`, `/projects/[slug]` |
| **Journey entries** | `Journey` | `/dashboard/journey` | Home, `/journey`, `/about` |
| **Skills** | `Skill` | `/dashboard/skills` | Home, `/about` |
| **Contact submissions** | `Contact` | `/dashboard/messages` (read/status/delete only) | Form creates via `/api/contact` |
| **Site identity** | `SiteProfile` (singleton) | `/dashboard/settings` | Hero, About, Footer, Navbar, Contact, JSON-LD, page metadata, Open Graph image |
| **About narrative** | `SiteProfile` (same singleton) | `/dashboard/settings` | Home About preview, `/about` (bio, summary, education, what I do, learning) |
| **Availability** | `SiteProfile.availability` | `/dashboard/settings` (Site identity) | Contact details list + availability FAQ answer |
| **Search metadata** | `SiteProfile.metaDescription`, `.metaKeywords` | `/dashboard/settings` (Site identity) | Root metadata description/keywords, Home description, Open Graph + Twitter description |

**Derived (no storage of its own):** the `/about` snapshot's Experience value is the current `Journey` entry title, and its Projects value is the published `Project` count. Both are computed at render — do not add snapshot-stat columns.

### Static (code/config)

Content in `src/constants/` or `src/features/*/constants/` that requires source edits or PRs.

| Content | File | Reason |
|---------|------|--------|
| About marketing leftovers (strengths, current focus, working-with list, CTA) | `src/features/about/constants/about-content.ts` | Strengths / working-with overlap Skills; current focus restates Journey; CTA is UI copy |
| Contact FAQ questions + non-identity answers | `src/features/contact/constants/contact-content.ts` | Rarely change (availability and location answers are composed from SiteProfile) |
| SEO titles (`defaultTitle`, `titleTemplate`), `twitterCard` | `src/constants/seo.ts` | Title structure is IA, not content. `description` / `keywords` in the same file are fallback-only. |
| Nav routes, section IDs | `src/constants/navigation.ts` | IA / architecture |
| Section headings, form labels | Component JSX | UX copy, not portfolio content |
| Theme tokens, Tailwind config | Design system | Style, not content |
| Auth, MFA, RBAC, env | Backend code | Security / ops |

`src/constants/personal.ts` and `src/constants/social-links.ts` are **fallback-only** for identity. Career narrative fields in `about-content.ts` are **fallback-only**; runtime narrative is `SiteProfile`. `SEO_DEFAULTS.description` / `.keywords` and `CONTACT_CONTENT.availability` are likewise **fallback-only**. `ABOUT_CONTENT.atAGlance` now holds the education label only — it is the fallback for `SiteProfile.educationLabel`.

### Out of scope (do not activate)

| Model | Status | Action |
|-------|--------|--------|
| `Blog` | In schema, never used | Keep for future; do not seed, route, or dashboard |
| `Technology.icon`, `.color` | In schema, unused | Wait until badges need icons |
| `Skill.icon` | In schema, actions use it | Public UI renders text; defer icon display |

---

## Source of Truth

| Content | Primary source | Fallback | When fallback triggers |
|---------|---------------|----------|------------------------|
| Projects | DB `Project` → `getPublishedProjectsForUi()` | `src/features/projects/constants/projects-data.ts` | `projects.length === 0` or thrown exception |
| Journey | DB `Journey` → `getJourneyEntriesForUi()` | `src/features/journey/constants/journey-data.ts` | `journeys.length === 0` or thrown exception |
| Skills | DB `Skill` → `getSkillCategoriesForUi()` | `src/features/skills/constants/skills-data.ts` | `skills.length === 0` or thrown exception |
| Contact submissions | DB `Contact` only | None | Form POST fails with error |
| About narrative | DB `SiteProfile` → `getSiteProfileForUi()` | `src/features/about/constants/about-content.ts` (bio, summary, education, whatIDo, currentlyLearning) | No row, incomplete narrative columns, or thrown exception |
| Identity | DB `SiteProfile` → `getSiteProfileForUi()` | `personal.ts` + `social-links.ts` | No row, or thrown exception |
| Availability | DB `SiteProfile.availability` → `getSiteProfileForUi()` | `CONTACT_CONTENT.availability` | No row, empty column, or thrown exception |
| Search metadata | DB `SiteProfile.metaDescription` / `.metaKeywords` → `getSiteProfileForUi()` | `SEO_DEFAULTS.description` / `.keywords` | No row, empty column, unusable JSON, or thrown exception |
| About snapshot Experience | DB `Journey` → `getCurrentJourneyEntryForUi()` | `JOURNEY_DATA[0]` | Empty table or thrown exception |
| About snapshot Projects | DB `Project` → `getPublishedProjectCountForUi()` | `PROJECTS_DATA.length` | Count of 0 or thrown exception |

**Fallback rationale:** When DB is empty or unreachable, public pages show seed-like content instead of failing. This supports dev/demo without breaking the build. Dashboard should make the fallback state visible (e.g., "Using static identity — save this form to replace it").

**Identity fields (single source):** name, role/title, tagline, email, location, availability, GitHub URL, LinkedIn URL, resume URL. Email mailto and social link lists are derived from those fields.

**Search metadata fields (same row, saved with identity):** `metaDescription`, `metaKeywords` (JSON `string[]`). The root layout sets both; other routes inherit keywords through Next.js metadata merging and pass their own page-specific `description`. Nullable columns fall back per field, so rows saved before this change keep working.

**About narrative fields (same `SiteProfile` row, separate Settings save):** biography, professional summary, education (degree, institution, period, at-a-glance label), what I do (`{ title, description }[]`), currently learning (`string[]`). Do not store Skills lists, Journey roles, or CTA copy here.

**Admin vs public email:** `User.email` is the dashboard login. `SiteProfile.email` is the public contact address. They are independent.

---

## Dashboard Ownership

Routes defined in `src/components/dashboard-nav/dashboard-nav.constants.ts`.

| Route | Managed content | Operations | Notes |
|-------|----------------|------------|-------|
| `/dashboard` | None (overview only) | Read stats, recent messages | Links to CRUD panels |
| `/dashboard/projects` | `Project`, `Technology` (create-only) | Full CRUD, tech M2M | Thumbnail + repositoryUrl + liveUrl are optional strings |
| `/dashboard/journey` | `Journey` | Full CRUD | Revalidates `/`, `/journey`, `/about`, `/dashboard/journey` |
| `/dashboard/messages` | `Contact` | Read, update status, delete | No create (form-only) |
| `/dashboard/settings` | `SiteProfile` (edit) + `User` (read-only) | Upsert identity (incl. availability + search metadata), upsert About narrative, logout | No `/dashboard/profile`. Identity save does not clear narrative columns. |
| `/dashboard/skills` | `Skill` | Full CRUD | Revalidates `/`, `/about`, `/dashboard/skills` |

**No dashboard route for:** Blog (future only), nav/theme (code). About career prose and search metadata are edited on Settings, not a CMS.

---

## Media and Resume Storage

V1 constraint: **No file-upload system** (project-scope.md § Out of Scope). All media references are URL or `/public` path strings stored in DB.

### Project media

| Asset | Storage | Resolution | Dashboard |
|-------|---------|------------|-----------|
| Thumbnail | DB `Project.thumbnail` (optional string) | `resolvePublicAssetUrl()` validates file exists under `public/` or passes through https URLs | Free-text path field |
| Preview | DB `Project.preview` (optional string) | Same resolver; missing → placeholder in preview modal | Free-text path field |

**Agreed layout:** drop files under `public/projects/{slug}/`, then store the matching public path in the dashboard:

- Thumbnail: `/projects/{slug}/thumbnail.webp` (or `.png` / `.jpg`)
- Preview: `/projects/{slug}/preview.mp4`

Dashboard does **not** infer preview from slug. If `preview` is empty or the file is missing, the preview modal shows “Preview media will be added soon.” Missing thumbnails are omitted from cards/detail.

### Resume

| Asset | Storage | Dashboard | Notes |
|-------|---------|-----------|-------|
| PDF file | `public/resume/*.pdf` | Path field on `/dashboard/settings` (`SiteProfile.resumeUrl`) | Public path (`/resume/...`) or https URL. No upload. |

File replacement stays manual: drop a new PDF into `public/resume/`, then update the path on Settings. `PERSONAL.resumeUrl` is fallback-only.

---

## Empty DB and Fallback Behavior

**Current behavior:** Empty `Project` / `Journey` / `Skill` tables silently show constants (`*-data.ts`). After you delete all DB rows, the site looks "updated" from stale seed-like data. Empty `SiteProfile` uses `PERSONAL` + `SOCIAL_LINKS`. Settings shows an info banner until the first save.

**Approved pattern:** Keep fallback for dev/build resilience. Services should log when fallback is active. Dashboard panels should detect empty tables and show a banner: "No projects yet — the site is showing static examples. Add a project to replace them."

**Do not:**
- Remove fallback entirely (breaks local dev when DB is unreachable)
- Make empty DB throw on public pages (breaks static export / prerender)
- Silently mix DB and constants (pick one per content type)

---

## Revalidation

Dashboard mutations must revalidate affected public routes.

| Dashboard action | Revalidate paths |
|------------------|------------------|
| Project CRUD | `/`, `/projects`, `/projects/[slug]`, `/dashboard/projects` |
| Journey CRUD | `/`, `/journey`, `/about`, `/dashboard/journey` |
| Skill CRUD | `/`, `/about`, `/dashboard/skills` |
| Contact status/delete | `/dashboard/messages` |
| Settings identity | `/` (layout), `/about`, `/contact`, `/journey`, `/projects`, `/dashboard/settings` |
| Settings About narrative | `/`, `/about`, `/dashboard/settings` |

Identity save uses `revalidatePath("/", "layout")` so Navbar, Footer, JSON-LD, and root metadata refresh with the pages. Availability and search metadata ship in the same save, so they need no extra paths. Journey and Project mutations already revalidate `/about`, which is what refreshes the derived snapshot stats.

---

## V1 vs Future Boundaries

### V1 (current)

- **Dashboard-managed:** Projects, Journey, Skills, Contact messages, Site identity, availability, search metadata, About narrative (`SiteProfile` on Settings)
- **Derived:** About snapshot Experience (current `Journey` entry) and Projects count (published `Project` total)
- **Static:** About marketing leftovers (strengths, current focus, working-with list, CTA), Contact FAQ questions, SEO title structure, nav, theme
- **Media:** URL/path strings; no binary upload
- **Settings:** Read-only admin account + editable public identity (incl. availability + search metadata) + About narrative + logout
- **Blog:** Model exists, do not activate

### Post-V1 (not in scope today)

- Skill/Technology unification or documented split
- File upload for project thumbnails/previews and resume
- `/dashboard/profile` (distinct from Settings)
- Blog activation (routes, dashboard, seed)
- Favicon/app-icon management
- Admin User profile/password editing on Settings

---

## Implementation Priorities

Based on audit findings (2026-08-27) and the final dynamic-content audit (2026-08-29).

| Priority | Item | Scope | Rationale |
|----------|------|-------|-----------|
| **P1** | Skills dashboard UI | `/dashboard/skills` using `skill-actions.ts` | **Shipped** — model + actions + admin CRUD |
| **P1** | About Journey uses DB | About page calls `getJourneyEntriesForUi()`; Journey CRUD revalidates `/about` | **Shipped** — same DB-first source as Home and `/journey` |
| **P1** | Project media convention | Explicit `Project.preview` path + documented `public/projects/{slug}/` layout | **Shipped** — no hidden slug-based preview inference |
| **P2** | Site identity DB + Settings | `SiteProfile` singleton; Settings edit/save; public DB-first reads | **Shipped** — `personal.ts` / `social-links.ts` are fallback-only |
| **P2** | About narrative on Settings | Career prose on the `SiteProfile` singleton; Settings editor; public DB-first reads | **Shipped** — no extra CMS model; `ABOUT_CONTENT` is fallback-only for those fields |
| **P2** | About snapshot stats derived | Experience from current `Journey` entry; Projects from published `Project` count | **Shipped** — removed the stale hardcoded Experience value; no new columns |
| **P2** | Search metadata on Settings | `metaDescription` + `metaKeywords` on the singleton; root layout supplies both | **Shipped** — `SEO_DEFAULTS` is fallback-only for description/keywords |
| **P2** | Availability on Settings | `SiteProfile.availability` feeds the Contact row and availability FAQ answer | **Shipped** — `CONTACT_CONTENT.availability` is fallback-only |
| **P3** | Skill/Technology reconciliation | Clarify why two models exist; document their domains or unify | Project tags vs About tech cloud are unsynced |
| **P3** | Empty-DB detection UI | Dashboard banners when tables are empty + fallback is active | Make static fallback state visible |
| **P3** | Derive `currentFocus` from Journey | Home About paragraph restating the current role | Audit item 4 — deferred, not implemented |
| **P3** | Consolidate `/about` technology clouds | `currentlyWorkingWith` overlaps the Skills-derived cloud | Audit item 5 — deferred, not implemented |
| **P3** | Contact form copy housekeeping | `CONTACT_CONTENT.formNotice` / `submitLabel` are unused; the form hardcodes both | Audit item 6 — deferred, not implemented |

Do **not** build: file uploads, Blog routes/dashboard, multi-admin, OAuth, profile page (distinct from Settings), forgot-password, system theme.

---

## Architectural Constraints

1. **DB-first, static fallback** — public services query DB first; if empty or unreachable, return constants. Never throw on public pages. Dashboard creates real rows; fallback becomes unused.

2. **Single source of truth** — identity fields exist in `SiteProfile`. About career prose lives on the same row. Constants are fallback-only. Do not duplicate identity or narrative across About, Contact, Hero, Footer. Do not copy Skills or Journey into SiteProfile.

3. **No file uploads in V1** — project-scope.md explicitly forbids upload systems. Store URL/path strings; document where files live under `public/`.

4. **Dashboard-managed = editable without PRs** — if content changes monthly (projects, job history, contact details), it belongs in DB + dashboard. If it changes per release (positioning, IA, UX copy), keep it in code.

5. **Revalidation is mandatory** — every dashboard mutation must revalidate affected public routes. Missing revalidations are bugs, not deferred work.

6. **Keep Blog dormant** — schema can stay; do not seed, route, or dashboard until a future phase activates it via ADR.

7. **No separate profile route** — public identity is edited on `/dashboard/settings`, not `/dashboard/profile`.

---

## SiteProfile implementation

- **Model:** singleton table `site_profiles` (application-enforced: `findFirst` + upsert).
- **Identity fields:** `name`, `role`, `tagline`, `email`, `location`, `availability?`, `resumeUrl`, `githubUrl?`, `linkedinUrl?`.
- **Search metadata fields:** `metaDescription?`, `metaKeywords?` (JSON `string[]`).
- **Narrative fields:** `biography`, `professionalSummary`, `educationDegree`, `educationInstitution`, `educationPeriod`, `educationLabel`, `whatIDo` (JSON), `currentlyLearning` (JSON).
- **Feature module:** `src/features/site-profile/` (repository, service, Zod schema, server actions, dashboard forms).
- **Public API:** `getSiteProfileForUi()` (React `cache()`). Incomplete narrative columns use `ABOUT_CONTENT` for that content type only; identity still comes from the row when present. `availability` and the search-metadata columns fall back per field, so pre-existing rows with NULLs behave like before.
- **Derived social links:** GitHub and LinkedIn from stored URLs; email as `mailto:{email}`.
- **Seed:** idempotent identity from `PERSONAL` / `SOCIAL_LINKS`; backfills narrative from `ABOUT_CONTENT`, availability from `CONTACT_CONTENT`, and search metadata from `SEO_DEFAULTS` when those columns are empty.
- **Dashboard:** `/dashboard/settings` — Account (read-only), Site identity (identity + availability + search metadata), About narrative (separate saves so identity updates do not clear prose).

### Metadata composition

`config/metadata.ts` stays pure and deliberately omits `keywords` from `defaultMetadata`. The root layout's `generateMetadata` sets `description` and `keywords` from the profile; routes built with `buildPageMetadata` inherit keywords via Next.js metadata merging and supply their own page-specific `description`. This keeps one dashboard field authoritative without every route re-reading it.

---

## Migration Path (for remaining static content)

When moving static content to DB:

1. **Create model + migration** — add table or extend existing singleton
2. **Seed from constants** — `prisma/seed.ts` reads `*-content.ts` and populates DB
3. **Update service** — replace constants import with DB query (keep fallback for empty DB)
4. **Create dashboard UI** — new page or Settings section with form
5. **Create server actions** — CRUD with revalidation
6. **Mark constants deprecated** — comment that they are fallback-only
7. **Revalidate affected routes** — test that dashboard edits appear on public pages

Do not delete constants immediately; they remain the fallback.

---

## Related Documents

- `docs/project-design/project-scope.md` — V1 feature scope, out-of-scope list
- `docs/database/prisma-schema-planning.md` — Model definitions
- `docs/implementation-roadmap.md` — Phase 3.3 deliverables
- `docs/architecture/folder-structure.md` — Single source of truth rules
- `src/features/*/repository.ts`, `service.ts` — DB-first + fallback pattern
- `src/features/site-profile/` — identity service and Settings form

---

## Status

**Approved** — P1 items and all P2 items (identity, About narrative, derived About snapshot stats, search metadata, availability) are shipped. Remaining P3 items, including audit items 4–6, are future work.
