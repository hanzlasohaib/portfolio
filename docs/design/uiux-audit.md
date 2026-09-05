# UI/UX Audit

> Version: 1.0.0
>
> Status: Historical — Phase 6 closed 2026-09-01. Disposition: `docs/design/uiux-final-review.md`.
>
> Last Updated: 2026-09-01
>
> Category: Design
>
> Scope: Read-only audit of the pre-redesign UI. Application code was not modified to produce the original findings.

---

## 1. How to read this document

Every finding carries a severity:

| Severity | Meaning |
|---|---|
| **P0** | Broken, or a genuine usability failure. Fix first. |
| **P1** | High-impact UX/design problem. Blocks "high-end" perception. |
| **P2** | Refinement. Consistency and polish. |
| **P3** | Optional polish. Nice to have. |

Findings are also tagged by category:

`A` serious UX · `B` visual inconsistency · `C` generic/mediocre pattern · `D` missing interaction state · `E` visual noise · `F` premium opportunity · `G` accessibility · `H` responsive · `I` motion · `J` do not change

---

## 2. Baseline: what actually exists

This section corrects several assumptions so the redesign is planned against reality.

### 2.1 Actual stack

| Assumed in brief | Actual in repository |
|---|---|
| React + Vite | **Next.js 16.2.10 App Router**, React 19.2.4, Turbopack. No Vite. |
| Framer Motion | **Not installed.** All motion is hand-written CSS in `src/styles/animations.css` plus Tailwind transition utilities. |
| FastAPI backend | **No FastAPI.** Backend is Next.js Route Handlers (`src/app/api/**`) + Server Actions (`src/features/*/actions/**`). |
| Tailwind CSS | Correct — **Tailwind v4**, configured entirely through CSS (`@theme inline` in `src/styles/globals.css`). There is no `tailwind.config.js`. |
| Prisma / PostgreSQL / Supabase | Correct. |

**Implication:** the redesign must be delivered in CSS + Tailwind v4 tokens. Adding Framer Motion would be a new runtime dependency and is explicitly out of scope under the brief's "do not introduce unnecessary dependencies" rule. The existing CSS motion layer is sufficient for everything proposed.

### 2.2 Actual colour system

The brief describes the current visual direction as "Electric Magenta/Violet ≈ `#E254FF`, Aqua ≈ `#00B8D4`, Violet ≈ `#536DFE`".

**This palette does not exist in the codebase.** `src/styles/variables.css` and `docs/ui-ux/color-palette.md` (v1.0.0, marked *Approved*) both define a **blue** system:

```137:163:src/styles/variables.css
[data-theme="dark"] {
  --background: #040414;
  ...
  --primary: #3f8cff;
  --primary-light: #6ac5ff;
  --secondary: #22d3ee;
  ...
  --gradient-primary: linear-gradient(90deg, #3f8cff, #6ac5ff);
```

Only `--background: #040414` matches the brief. `docs/ui-ux/color-palette.md` additionally states *"Not gaming/neon"* and *"Avoid introducing additional accent colors unless approved."*

**This is a documentation conflict requiring an explicit decision (see §7, Conflict C-1).** It is treated in `docs/design/design-system.md` as a proposed re-brand, not as a preserved starting point.

### 2.3 Route inventory

| Route | Exists | Notes |
|---|---|---|
| `/` | Yes | One-pager: Hero, About, Projects, Skills, Journey, Contact |
| `/about` | Yes | 11 stacked sections |
| `/projects` | Yes | Search + technology filter + grid |
| `/projects/[slug]` | Yes | Detail page |
| `/journey` | Yes | Timeline |
| `/contact` | Yes | Form + info + FAQ |
| `/login` | Yes | Credentials → MFA OTP |
| `/dashboard`, `/dashboard/{projects,journey,skills,messages,settings}` | Yes | All CRUD implemented |

All routes in the brief exist and work. Earlier documentation claiming `/about`, `/projects`, `/journey`, `/contact` 404 is **stale** (see Conflict C-3).

### 2.4 Existing strengths — category J, do not change

These are genuinely good and must survive the redesign:

1. **Token discipline.** Zero raw Tailwind palette colours (`slate-*`, `zinc-*`, `gray-*`) anywhere in `src/components/**` or `src/features/**`. Everything routes through semantic tokens. This is rare and valuable.
2. **Feature-based architecture.** Route files only compose and fetch; all UI lives in `src/features/*/components/**`.
3. **`Modal`** (`src/components/modal/modal.tsx`) — portal, focus trap, Escape, scroll lock, focus restore, `aria-modal`, and reduced-motion awareness. Production quality.
4. **Reduced-motion handling** — `src/styles/animations.css:177-203` plus `usePrefersReducedMotion()` in JS-driven components.
5. **Semantic lists** — `<ul>` for projects/skills, `<ol>` for the journey timeline.
6. **Optimistic UI with rollback** in every dashboard CRUD panel.
7. **`ConfirmDialog` on every destructive action.**
8. **Contact form** — Zod validation, `aria-invalid`, `aria-describedby`, `role="alert"`, pending state.
9. **Single `<h1>` per route** on every page.
10. **`--on-primary: #040414`** with documented contrast reasoning in `variables.css:121-134`. The reasoning is correct and transfers to the new palette.
11. **Navbar deliberately omits the admin login link.**
12. **Skeletons with `role="status"` / `aria-busy` / `sr-only` text.**
13. **Login security UX** — MFA, reCAPTCHA, constrained `next` redirect, correct `autocomplete` attributes.

---

## 3. Cross-cutting findings

### CC-1 — No design *language*, only design *tokens* · P1 · C, F

The token layer is disciplined but expressively flat. Every section is `Container → SectionHeading → grid of Cards`, alternating `section-alt` backgrounds. Nine of the site's visual regions are a 3-column card grid with identical `gap`, radius, border, and hover-lift.

The result reads as a well-built component demo rather than a designed portfolio. There is no typographic voice, no scale contrast, no editorial moment, and no signature element a viewer would remember.

**Evidence:** `grid gap-6 sm:grid-cols-2 lg:grid-cols-3` appears in home About, home Projects, home Skills, `/about` What-I-Do, `/about` Skills, `/projects` explorer, and `/contact` FAQ.

### CC-2 — Type scale has no high end · P1 · C

`--size-hero: 64px` is the largest token, and `h1` clamps to `48px`. On a 1440px viewport the hero name renders at 64px — roughly 4.4% of viewport width. Premium portfolios anchor at 8–12vw. There is also no display/body contrast: headings are Orbitron bold at every level, so h2/h3/h4 differ only by a few pixels.

`--tracking-hero: 0.04em` applies *positive* tracking to the largest text, which is backwards; large display type wants negative tracking.

### CC-3 — Orbitron as the display face · P1 · C, F

`Orbitron` (`src/app/layout.tsx:13-18`) is a geometric "sci-fi" face used for **all** headings h1–h6. It is a widely recognised free font strongly associated with generic tech/gaming templates, it has poor legibility below ~20px, and it undermines the "technical credibility / not gaming" goal stated in `docs/ui-ux/color-palette.md`.

Using it at h4/h5/h6 sizes (24/20/18px) is the worst case — a display face doing UI-label work.

### CC-4 — Section rhythm is uniform · P2 · C, F

`--section-padding-desktop: 96px` is applied identically to every section via `.section`. Every page therefore has a metronomic rhythm with no pacing: no breathing room around important moments, no compression around dense ones.

### CC-5 — Off-token arbitrary values · P2 · B

Confirmed offenders:

| File:line | Value |
|---|---|
| `src/components/scroll-progress-bar/scroll-progress-bar.tsx:20` | `z-[60]`, `h-[3px]` |
| `src/components/back-to-top-button/back-to-top-button.tsx:59` | `z-[55]`, `duration-300` |
| `src/components/mobile-menu/mobile-menu.tsx:68` | `duration-300` (token is 250ms) |
| `src/components/icon-button/icon-button.tsx:51` | `[&_svg]:size-[18px]` |
| `src/components/social-links/social-links.tsx:11` | `size-[18px]` |
| `src/components/spinner/spinner.tsx:12` | `border-[3px]` |
| `src/features/journey/.../journey-timeline.tsx:27` | `-left-[29px]`, `sm:-left-[37px]`, `top-1.5` |
| `src/features/home/.../hero-section.tsx:47` | `text-lg sm:text-xl` instead of a token |
| `src/features/about/.../about-introduction.tsx:21` | same pattern, duplicated |
| `src/features/home/.../hero-scroll-hint.tsx:35` | `text-base` |

`--z-nav: 10`, `--z-modal: 70`, `--z-toast: 80` exist as tokens but the progress bar and back-to-top invent `60` and `55` instead.

### CC-6 — No public `loading.tsx`, `error.tsx`, or `not-found.tsx` · P1 · A, D

There is **no** `loading.tsx`, `error.tsx`, or `not-found.tsx` anywhere under `src/app/(public)/` or at `src/app/`. Consequences:

- A failed database read on any public page produces the raw Next.js error overlay in dev and a bare error page in production.
- `notFound()` in `src/app/(public)/projects/[slug]/page.tsx:49-50` renders the unstyled Next.js default 404 — a hard break in the visual identity, and the single most likely page a recruiter reaches from a stale link.
- No route-level loading affordance on database-backed pages.

### CC-7 — No skip-to-content link · P1 · G

No skip link exists in `src/`. With a fixed header and up to ~10 nav/social links before `<main>`, keyboard and screen-reader users must traverse the entire header on every page. `docs/project-design/quality-standards.md` targets WCAG AA; this is a bypass-blocks (2.4.1) gap.

> Addressed Stage 2 (public) and Stage 10 (dashboard + login): `SkipToContent` is the first focusable control in `PublicLayout`, `DashboardShell`, and `AuthLayout`.

### CC-8 — Hover-only affordances with no touch equivalent · P2 · D, H

`.surface-card:hover` and `.hover-lift` (`src/styles/globals.css:355-359, 439-448`) provide `translateY(-4px)` and a glow. On touch devices these never fire, so cards have no interactive affordance at all — no press state, no active state. Cards that are wholly clickable are indistinguishable from cards that are not.

### CC-9 — Focus rings are uniform but not designed · P2 · D, G

The global `:focus-visible` (`src/styles/globals.css:262-265`) draws a 2px `--primary` outline at 2px offset. On the dark background at small offsets this is legible, but on top of a `--primary`-tinted surface (e.g. active filter pills, `bg-primary/15`) the ring and the background are the same hue and contrast poorly.

> Addressed Stage 10: `--focus-ring-offset` is 3px; `.focus-on-primary` and `shadow-focus` add `--elevation-focus` on primary buttons, pressed chips, and the active dashboard nav row.

### CC-10 — Dead code in the component library · P3 · B

`Checkbox`, `Radio`, `Select`, and `Divider` are exported from `src/components/index.ts` but have zero consumers. Meanwhile `src/features/contact/.../dashboard-messages-panel.tsx:160-178` hand-rolls a raw `<select>` instead of using the existing `Select`.

Unused API surface: `Button`/`IconButton` `loading` prop (never passed anywhere), `Link variant="secondary"`, `Badge` `success`/`warning`/`danger`/`neutral`, `Card` `elevated`/`outlined`, `Card padding` `none`/`lg`, `SectionHeading align="center"`.

`ContentWrapper` and `PageWrapper` have byte-identical class strings (`flex w-full flex-1 flex-col`).

### CC-11 — Motion vocabulary is defined but unused · P2 · I

`animate-fade-up` and `stagger-1`…`stagger-5` are defined in `src/styles/animations.css:69-160` and bridged into Tailwind, but **no feature component uses them**. The only real motion on the site is the hero entrance sequence and two background blobs. Every other section appears instantly with no scroll-reveal, no continuity, and no hierarchy signalling.

> Addressed Stage 11: shared `useScrollReveal` observer; `.reveal` on section headings, project cards, timeline entries, and About stats. Hero is three steps / 520ms. Blobs were removed in Stage 1. Toast enter/exit. Easing tokens already replaced `ease-out` in Stage 0.

Conversely, `--easing-default`, `--easing-entrance`, and `--easing-exit` are all set to plain `ease-out` / `ease-in` (`variables.css:97-99`) — there is no custom easing curve anywhere, which is a large part of why interactions feel ordinary.

### CC-12 — Duplicated "role" typography · P2 · B

`hero-section.tsx:47` and `about-introduction.tsx:21` both render the professional role with the identical one-off string `text-lg font-semibold text-primary-light sm:text-xl`. Neither uses a token; the pattern is copy-pasted.

---

## 4. Public routes

### 4.1 `/` — Home

Composition: Hero → About (alt) → Projects → Skills (alt) → Journey → Contact (alt).

| ID | Severity | Cat | Finding |
|---|---|---|---|
| H-1 | **P1** | C, F | The hero is a centred single column: role, name, tagline, two buttons, social row, scroll hint. It is the most template-like screen on the site. Nothing communicates *what kind of engineer* beyond a text line — no proof, no metric, no artefact. |
| H-2 | **P1** | A | No credibility signals above the fold. `/about` has real metrics (project count, current role, location, education) via `AboutAtAGlance`, but the homepage hero surfaces none of them. A recruiter's first 5 seconds contain zero evidence. |
| H-3 | **P1** | C, E | Two `animate-blob` background blobs (`hero-section.tsx:39,43`) run an 18s/20s infinite loop. Perpetual ambient motion with no communicative purpose — exactly the "meaningless animation" the brief rejects — and it keeps the compositor awake indefinitely. |
| H-4 | **P1** | A, C | Project cards carry title + short description + tech badges only. No thumbnail, no outcome, no metric, no role. `Project.thumbnail` exists in the data model and `resolve-public-asset.ts` exists to resolve it, but the card never renders an image. This is the single biggest recruiter-facing content gap. |
| H-5 | P2 | H | `ProjectCard` footer can render 3 actions (Details / Preview / Live Demo) in `flex-wrap` (`project-card.tsx:80`). At ~320px this wraps to three stacked full-width-ish buttons and dominates the card. |
| H-6 | P2 | D | Disabled "Live Demo" renders as `<span aria-disabled="true" class="… cursor-not-allowed opacity-50">` (`project-card.tsx:119-129`) — visually a button, not focusable, not announced as a control. Inconsistent with the enabled variant which is an `<a>`. |
| H-7 | P2 | A | Zero empty states. If Projects, Skills, or Journey return no rows, the section renders its heading above an empty `<ul>`. |
| H-8 | P2 | I | Hero entrance runs a 5-step stagger totalling ~1.2s of delay (`animations.css:125-143`; last item starts at 960ms). The social row does not appear until nearly a second after paint. This delays perceived readiness. Addressed Stage 11: three steps over 520ms (name 0ms, copy 120ms, actions 240ms). |
| H-9 | P3 | B | `min-h-[70vh]` on the hero (`hero-section.tsx:46`) is off-token and produces an awkward short hero on landscape mobile. |
| **H-J** | — | **J** | Section `id`s + scroll-spy (`useActiveSection`) + alternating `section-alt` are well built. The Contact section's asymmetric `lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]` is the best composition on the site — keep and extend that idea. |

### 4.2 `/about`

| ID | Severity | Cat | Finding |
|---|---|---|---|
| A-1 | **P1** | A, C | **Eleven** stacked sections: Introduction, At a Glance, Professional Summary, What I Do, Education, Journey Summary, Skills, Technologies, Currently Working With, Currently Learning, CTA. This is a wall. There is no scannable structure and no priority — everything is a level-2 heading of equal weight. |
| A-2 | **P1** | A | Content redundancy: "Skills" and "Technologies" and "Currently Working With" and "Currently Learning" are four separate badge-cloud sections covering overlapping information. "Journey Summary" duplicates `/journey`. |
| A-3 | P2 | C | Every section is centred single-column or a symmetric grid. Eleven identical rhythmic beats at 96px each. |
| A-4 | P2 | H | `AboutAtAGlance` uses `gap-6 sm:grid-cols-2 lg:grid-cols-4` (`about-at-a-glance.tsx:44`). At 1024px, four stat cards with long labels compress badly. |
| A-5 | P2 | B | Role line duplicates the hero's off-token string (CC-12). |
| A-6 | P3 | G | Stats are `<ul>/<li>` with heading + text. A `<dl>` with `<dt>`/`<dd>` is the correct semantic for label/value pairs. Addressed Stage 5: `AboutAtAGlance` is a `<dl>`. |
| **A-J** | — | **J** | `AboutAtAGlance` derives real numbers from services rather than hardcoding. `AboutPage` reuses `JourneyTimeline` and `SkillsCategories` rather than re-implementing them. Both must be preserved. |

### 4.3 `/projects`

| ID | Severity | Cat | Finding |
|---|---|---|---|
| P-1 | **P1** | A, C | Same 3-column card grid as the homepage. A dedicated projects index should differentiate — featured project given more weight, richer cards, or a list/detail composition. Currently `/projects` looks like `/#projects` with a search box. |
| P-2 | **P1** | A | Cards still have no thumbnails and no outcomes (see H-4). On the page whose entire job is showcasing work, this is the core failure. |
| P-3 | P2 | B | Technology filter pills hand-roll Badge styling instead of using `Badge` (`projects-explorer.tsx:126-129`), with `px-2.5 py-1` vs Badge's `px-2.5 py-0.5`. Two visually similar chip systems now exist. |
| P-4 | P2 | G | Heading hierarchy skips h2: page `h1` → card `h3`. Addressed Stage 3 on `/projects` (`h2` “Selected work”); Stage 10 on `/journey` (timeline titles semantic `h2`). |
| P-5 | P2 | H | With `showRepository` enabled, cards render **four** actions (Details / Preview / Live Demo / GitHub) in a wrapping row. Worst mobile crowding on the site. |
| P-6 | P2 | D | Filtering is instant with no result-count announcement beyond the empty state; there is no "showing N of M" feedback. |
| P-7 | P3 | A | No sort control (newest / featured) and no empty state for the zero-projects-published case (only the zero-filter-results case). |
| **P-J** | — | **J** | The filter empty state with actionable copy, `aria-pressed` on filter buttons, `aria-label="Technology filters"`, `role="status"` on results, and focus restoration after the preview modal closes are all correct. Keep. |

### 4.4 `/projects/[slug]`

| ID | Severity | Cat | Finding |
|---|---|---|---|
| PD-1 | **P1** | A, F | The page is Breadcrumb → h1 → lead → image → "Overview" prose → "Technologies" badges → link row. There is no case-study structure: no Role, no Problem, no Approach, no Outcome, no Stack rationale, no timeline. This is the page that proves technical depth and it currently proves nothing. |
| PD-2 | **P1** | A | `notFound()` falls through to the unstyled Next.js 404 (CC-6). |
| PD-3 | P2 | F | Raw `<img>` (`project-detail-page.tsx:48-54`) instead of `next/image` — no responsive `srcset`, no lazy loading, no intrinsic sizing, contributing to CLS. |
| PD-4 | P2 | B | Reading column uses Tailwind's `max-w-3xl` (768px) rather than a token. Measure is ~95 characters at `--size-body`, above the 60–75 ideal. |
| PD-5 | P3 | A | No previous/next project navigation, and no related-projects affordance — the page is a dead end apart from the breadcrumb. |
| **PD-J** | — | **J** | Breadcrumb with `aria-current="page"`, meaningful `alt` text, conditional CTAs (no fake disabled buttons), and the constrained single-column reading layout are all right. Keep. |

### 4.5 `/journey`

| ID | Severity | Cat | Finding |
|---|---|---|---|
| J-1 | P2 | B, H | Timeline dot uses `top-1.5 -left-[29px] sm:-left-[37px]` (`journey-timeline.tsx:27`) — magic numbers coupled to the rail's `pl-6 sm:pl-8`. Any padding change silently misaligns every dot. |
| J-2 | P2 | A | No empty state; zero entries renders an empty `<ol>`. |
| J-3 | P2 | A | Entries are narrative prose with no impact metrics and no visual distinction between education, work, and milestone entry types. |
| J-4 | P3 | A | Page dead-ends: no CTA to projects or contact, unlike the homepage journey section. |
| J-5 | P3 | I | A vertical timeline is the single best scroll-reveal candidate on the site and currently has zero motion. Addressed Stage 11: each timeline entry uses `Reveal`. |
| **J-J** | — | **J** | `<ol>` semantics, `aria-hidden` on decorative dots, and reuse across home/about/journey. Keep. |

### 4.6 `/contact`

| ID | Severity | Cat | Finding |
|---|---|---|---|
| C-1 | P2 | G | Heading skip: page `h1` → sidebar `h3` "Reach me directly" (`contact-info.tsx:71`), no intervening h2. Addressed Stage 7: `/contact` uses `h2`; Home `ContactSection` keeps `h3` under the section `h2`. |
| C-2 | P2 | B | Email rendered as raw classes `text-body text-primary-light` (`contact-info.tsx:88`) instead of the `Link`/`ExternalLink` component. |
| C-3 | P2 | D | Submit shows only a text swap to "Sending…". No spinner, despite `Button` having a fully implemented `loading` prop that nothing uses. |
| C-4 | P3 | A | `src/features/contact/constants/contact-content.ts:10` still says the submit is "Coming Soon" although the form posts to `/api/contact`. Stale copy. |
| C-5 | P3 | A | FAQ is fully expanded card list. Fine at three items; will not scale. |
| **C-J** | — | **J** | The asymmetric form/aside grid, complete accessible form wiring, success/error `Alert`s, dynamic FAQ answers driven by profile data, and no redundant hero. Keep — this is the best-composed public page. |

---

## 5. Dashboard and auth

### 5.1 Shell

| ID | Severity | Cat | Finding |
|---|---|---|---|
| D-1 | **P0** | A, H | **No mobile navigation pattern.** `dashboard-layout.tsx:20` is `flex flex-col md:flex-row`, so on mobile the sidebar becomes a full-width block of six always-visible links stacked above the content. Combined with D-2, roughly 300px of vertical space is consumed before any page content. There is no drawer, no collapse, no hamburger. |
| D-2 | **P1** | A, E | The dashboard `Header` is **empty** (`dashboard-layout.tsx:16-18` renders `<Header>` with no children). It reserves the full 72px `--nav-height` plus a border and displays nothing — no brand, no breadcrumb, no user identity, no logout. Pure wasted chrome. |
| D-3 | P2 | B | Sidebar links reuse `navLinkClassName`, whose active state is a **bottom-underline pseudo-element** designed for a horizontal navbar. Applied to full-width block rows it reads as a stray underline rather than a selected row. |
| **D-J** | — | **J** | `<aside>` + `<nav aria-label="Dashboard">`, `aria-current="page"`, `robots: noindex` on the dashboard layout, and full token reuse. Keep. |

### 5.2 CRUD panels (projects, journey, skills, messages)

| ID | Severity | Cat | Finding |
|---|---|---|---|
| D-4 | **P1** | A, D | **Server field errors are discarded.** `project-actions.ts:43-45` returns structured `fieldErrors`, but the panel only surfaces a generic toast (`dashboard-projects-panel.tsx:161-163`). On a 14-field form the user is told "Unable to save project" with no indication of which field failed. Same in journey and skills panels. |
| D-5 | **P1** | A | The projects form has 14+ fields in one flat inline stack with no grouping, no sections, and no sticky save. Editing scrolls the user away from the save control. |
| D-6 | P2 | D | Starting an edit (`startEdit()`) populates the form far above the clicked row but neither scrolls to it nor moves focus. On a long list the click appears to do nothing. |
| D-7 | P2 | G, D | `required` is set on native inputs but never passed to `Label`, so no visual or programmatic `*` appears. `Label` supports a `required` prop that nothing uses. Addressed Stage 8: `Input` / `Textarea` / `Select` forward `required` to `Label`. |
| D-8 | P2 | D | During a pending mutation only buttons are disabled; inputs remain editable, so a user can change fields mid-save. |
| D-9 | P2 | A | Skills panel keeps `icon` in its draft state (`dashboard-skills-panel.tsx:30-37`) but renders no input for it — the field is unreachable from the UI. |
| D-10 | P2 | B | Messages status control is a hand-rolled `<select>` (`dashboard-messages-panel.tsx:160-178`) bypassing `field-styles.ts`, so it has no shared focus ring, no `--input-height`, and no error wiring. |
| D-11 | P3 | G | Technology toggle chips (`dashboard-projects-panel.tsx:372-382`) are `<button>`s without `aria-pressed`, unlike the public filter chips which have it. Addressed Stage 8: shared `Chip` sets `aria-pressed`. |
| D-12 | P3 | A | Triple skeleton: route `loading.tsx` → lazy dynamic fallback → in-panel fetch skeleton, all three can flash in sequence on projects/journey/skills. |
| D-13 | P3 | B | `/dashboard/settings/loading.tsx` renders a small account-only skeleton and copy that no longer matches a page containing three large form sections. |
| **D-J** | — | **J** | Optimistic delete with rollback, `ConfirmDialog` on every destructive action, consistent search + "Show more" (`PAGE_SIZE = 8`) pattern, contextual `EmptyState`s, and the Settings panels' full `fieldErrors` wiring (which is the pattern the other panels should copy). Keep. |

### 5.3 Auth

| ID | Severity | Cat | Finding |
|---|---|---|---|
| AU-1 | P2 | A, D | On transition to the MFA step, focus is not moved to the code input (`login-form.tsx:98-106`). Keyboard and screen-reader users land nowhere; the step change is not announced. Addressed Stage 10: `useLayoutEffect` focuses `#mfa-code`; the success `Alert` announces the send. |
| AU-2 | P2 | D | "Resend code" has no cooldown, no timer, and no attempt feedback — it can be hammered. |
| AU-3 | P2 | C | The login page is a bare centred form on the raw background with no surface, no brand, and no route back to the public site. |
| AU-4 | P3 | A | `login/page.tsx:9-12` Suspense fallback is the bare text "Loading…" with no `role="status"`. |
| AU-5 | P3 | B | `auth-layout.tsx:8` comment still reads "Login UI comes later". Stale. |
| **AU-J** | — | **J** | Two-step MFA, `autocomplete="email"` / `"current-password"` / `"one-time-code"`, `inputMode="numeric"`, `maxLength={6}`, `noValidate` + Zod, summary `Alert` plus per-field errors, and the constrained `next` redirect. Keep all of it. |

---

## 6. Shared components

| ID | Severity | Cat | Finding |
|---|---|---|---|
| S-1 | **P1** | D | `Button` and `IconButton` implement a full `loading` state with `aria-busy` and a spinner — **no consumer ever passes it.** Every async action in the app instead swaps button text. |
| S-2 | P2 | D | `Link` has no disabled or current state. `Badge` has no interactive states, yet interactive chips are built to look like badges. |
| S-3 | P2 | D | Field styles cover hover, focus-visible, disabled, read-only, and error — but no `:active`. Nothing in the app has a press state, which is a large part of why it feels unresponsive on touch. |
| S-4 | P2 | B | Toasts have **no animation** at all — they appear and vanish instantly (`toast-provider.tsx`). Also unbounded stacking with no max-visible cap. Addressed Stage 11: enter/exit motion; max 3 visible. |
| S-5 | P2 | B | `Card` hover-lift is `translateY(-4px)` plus a glow on every card, whether or not the card is interactive. |
| S-6 | P2 | A, H | `MobileMenu` is an inline `absolute inset-x-0 top-full` dropdown with no backdrop and no scroll lock. Content scrolls behind the open menu. |
| S-7 | P3 | B | `ContentWrapper` and `PageWrapper` are identical (CC-10). |
| S-8 | P3 | I | `Skeleton` and `Spinner` use `animate-pulse` / `animate-spin` with no `prefers-reduced-motion` guard of their own (the global `animation-duration: 0.01ms` override in `animations.css:177-185` does catch them, but it makes the spinner effectively invisible rather than static). Addressed Stage 11 for Spinner: static complete ring. Skeleton pulse still uses the global override. |
| **S-J** | — | **J** | `Modal`, `field-styles.ts` (a genuinely good shared field abstraction), `button-variants.ts` structure, `cn.ts`, and the `Heading`/`Text` primitive split. Keep. |

---

## 7. Documentation conflicts

Per `AGENTS.md`, conflicts are reported rather than silently resolved.

### C-1 — Colour direction · **RESOLVED 2026-08-29**

- `docs/ui-ux/color-palette.md` v1.0.0 (**Approved**) mandates primary `#3F8CFF`, secondary `#22D3EE`, states *"Not gaming/neon"*, and forbids new accents without approval.
- `src/styles/variables.css` implements exactly that.
- The redesign brief requested `#E254FF` magenta, `#00B8D4` aqua, `#536DFE` violet — and described them as already existing, which they were not.

**Owner decision: keep the existing blue system.** `docs/ui-ux/color-palette.md` remains authoritative and is **not** superseded. No colour ADR is required. Every other improvement in this audit proceeds unchanged; the accent simply stays blue.

Measured contrast on `#040414` confirms the retained palette is sound: `--primary #3f8cff` = 6.20:1, `--primary-light #6ac5ff` = 10.69:1, `--secondary #22d3ee` = 11.25:1. The redesign therefore changes how the accent is *used* (audit `CC-1`) rather than what it is.

### C-2 — Two competing design-system documents

The brief requests `docs/design/design-system.md` while `docs/ui-ux/design-system.md` v1.0.0 (**Approved**) already exists and is cited as the source of truth in the header comments of `src/styles/variables.css`, `globals.css`, and `animations.css`.

Creating a second one without a supersession note produces exactly the drift `AGENTS.md` forbids. **Resolution taken:** `docs/design/design-system.md` is written as the explicit successor to `docs/ui-ux/design-system.md` and `docs/ui-ux/typography.md`, which should be marked `Superseded` on approval rather than deleted. `docs/ui-ux/color-palette.md` is explicitly left in force.

### C-2b — Typography direction · **ADR required**

`docs/ui-ux/typography.md` v1.0.0 (**Approved**) mandates Orbitron display and Fira Code monospace, plus a fixed-pixel type scale with positive letter-spacing on the largest text.

**Owner decision: swap to Space Grotesk (display) and JetBrains Mono (code); Inter is retained for body.** This supersedes an approved document and is recorded in **ADR-011**. Both replacements ship via `next/font/google`, so no dependency is added.

### C-2c — ADR directory path

`AGENTS.md` states ADRs live in `docs/architecture/adr/`. They actually live in **`docs/adr/`**. The path in `AGENTS.md` is wrong.

### C-3 — Stale route documentation

`AGENTS.md` states that only `/` and `/login` exist, that other routes 404 by design, and that `/login` renders `null`. All false as of `28caad7` — every route works and login is fully implemented. `AGENTS.md` also claims no `.env.example` exists; it does.

### C-4 — Roadmap has no phase for this work

`docs/implementation-roadmap.md` shows Phases 1–5 complete and V1 tagged `v1.4-production-ready`. There is no phase covering a UI/UX redesign. `AGENTS.md` forbids implementing work from undefined/future phases. A **Phase 6 — UI/UX Redesign** entry must be added to the roadmap before implementation begins.

### C-5 — Stale contact copy

`src/features/contact/constants/contact-content.ts:10` describes the contact submit as "Coming Soon"; it has been functional since Phase 3.3.

---

## 8. Severity roll-up

### P0 — 1 item

- `D-1` Dashboard has no mobile navigation pattern.

### P1 — 19 items

`CC-1` no design language · `CC-2` type scale has no high end · `CC-3` Orbitron as display face · `CC-6` no public loading/error/not-found · `CC-7` no skip link · `H-1` template hero · `H-2` no above-fold credibility · `H-3` perpetual blob motion · `H-4` project cards lack thumbnails/outcomes · `A-1` eleven-section About wall · `A-2` About content redundancy · `P-1` `/projects` undifferentiated · `P-2` cards lack thumbnails/outcomes · `PD-1` no case-study structure · `PD-2` unstyled 404 · `D-2` empty dashboard header · `D-4` server field errors discarded · `D-5` unstructured 14-field form · `S-1` unused loading state.

### P2 — 33 items · P3 — 17 items

Enumerated inline above.

---

## 9. Explicitly out of scope

Not to be touched by the redesign:

- Prisma schema, migrations, seed.
- Repository / service / action layers in `src/features/*/`.
- DB-first read paths and static fallback behaviour.
- Authentication, MFA, RBAC, middleware, session handling.
- Rate limiting, reCAPTCHA, CSP, security headers.
- Route Handler contracts under `src/app/api/**`.
- SEO metadata generation, `sitemap.ts`, `robots.ts`, `opengraph-image.tsx`, JSON-LD.
- Route paths and the URL structure.
- Blog (out of scope by project decision).
- Binary upload (out of scope by project decision).
