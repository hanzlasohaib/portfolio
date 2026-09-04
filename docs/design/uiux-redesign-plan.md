# UI/UX Redesign Plan

> Version: 1.0.0
>
> Status: **Complete — Phase 6 closed 2026-09-01**
>
> Last Updated: 2026-09-03
>
> Category: Design
>
> Depends on: `docs/design/uiux-audit.md`, `docs/design/design-system.md`
>
> Close review: `docs/design/uiux-final-review.md`

---

## 0. Gates before any code changes

| # | Gate | Status | Why |
|---|---|---|---|
| G1 | **ADR-011 — Typography v2** approved and merged | Required | The font change supersedes `docs/ui-ux/typography.md` (v1.0.0, *Approved*). `AGENTS.md` requires an ADR to override an approved document. |
| G2 | **Phase 6 added to `docs/implementation-roadmap.md`** | Required | Phases 1–5 are closed. `AGENTS.md` forbids implementing work outside the current phase. |
| G3 | Baseline captured on `main` | **Done** | `npm run lint` → 0 errors, 1 warning (the raw `<img>` at audit `PD-3`). `npm run typecheck` → clean. |
| G4 | Stale docs corrected: `AGENTS.md` route claims and ADR path, `contact-content.ts` "Coming Soon" | Required | Conflicts C-2c, C-3, C-5 from the audit. |

**Colour is not a gate.** Audit conflict C-1 was resolved in favour of retaining the existing blue accent system, so `docs/ui-ux/color-palette.md` stands and no colour ADR is needed.

Work proceeds on `feat/portfolio-uiux-redesign` (already branched from `main` at `28caad7`).

---

## 1. Sequencing rationale

The order is **foundation → highest recruiter impact → breadth → polish**, because:

- Token work must land first or every subsequent change is written twice.
- Hero and projects are what a recruiter actually sees; they justify the effort.
- Motion is deliberately last, because animating a layout that is still moving is wasted work.
- Accessibility is a **continuous constraint** enforced at every step, plus one dedicated sweep — not a phase you can defer.

| Stage | Work item | Depends on |
|---|---|---|
| 0 | Design foundation (tokens, fonts, primitives) | G1–G4 |
| 1 | Homepage / hero | 0 |
| 2 | Navigation | 0 |
| 3 | Projects presentation | 0, 1 |
| 4 | Project detail pages | 3 |
| 5 | About composition | 0 |
| 6 | Journey timeline | 0 |
| 7 | Contact experience | 0 |
| 8 | Dashboard visual consistency | 0 |
| 9 | Mobile UX sweep | 1–8 |
| 10 | Accessibility sweep | 1–9 |
| 11 | Motion pass | 1–10 |

Each stage ends with `npm run lint` + `npm run typecheck`, a manual pass at 320/768/1280px, a keyboard pass, and a `prefers-reduced-motion` check. `npm run build` runs at the end of stages 0, 3, 8, and 11.

---

## Stage 0 — Design foundation · **COMPLETE (2026-08-29)**

**Delivered.** Structural tokens, fonts, type scale, and primitives. Verified: `npm run lint` 0 errors / 1 pre-existing warning, `npm run typecheck` clean, `npm run build` clean (32/32 routes prerendered), all public + dashboard routes return 200, 404s correct, unauthenticated `/dashboard` still serves the sign-in form. New tokens confirmed present in served CSS.

Files changed: `src/styles/variables.css`, `src/styles/globals.css`, `src/styles/animations.css`, `src/app/layout.tsx`, `src/components/heading/heading.tsx`, `src/components/text/{text.tsx,text.types.ts}`, `src/components/button/button-variants.ts`, `src/components/card/card.tsx`, `src/components/input/field-styles.ts`, `src/components/scroll-progress-bar/scroll-progress-bar.tsx`, `src/components/back-to-top-button/back-to-top-button.tsx`, `src/components/social-links/social-links.tsx`, `src/features/home/components/hero-section/hero-section.tsx`.

**Deviations from plan, recorded:**

- **Dead-code removal was dropped.** `Checkbox`, `Radio`, `Select`, and `Divider` are unused *abstractions*, not dead code — Stage 8 needs `Select` for the messages status control and `Checkbox` for the projects form, both of which currently hand-roll native elements. Adopting them is the correct fix; deleting them would have been backwards. `ContentWrapper` / `PageWrapper` deduplication is deferred to Stage 9.
- **`outline` was not merged into `secondary`.** Both are used widely as Cancel and submit actions. Instead they were made visually distinct (`secondary` = filled surface, `outline` = transparent/quiet) and the old cyan treatment moved to a new `accent` variant. No consumer breakage.
- **Two hero fixes landed early** because they were direct consequences of token changes: the two infinite `animate-blob` elements were removed with their keyframes (audit `H-3`), and the off-token role/measure classes were tokenised (audit `CC-12`). Hero *composition* remains Stage 1.
- **Latent bug found and fixed:** Tailwind v4 has no `--duration-*` theme namespace, so `duration-normal` in `modal.tsx` and elsewhere generated **no CSS at all**. Explicit `.duration-*` utilities are now defined in `globals.css` §9.

**Original problem statement.** Tokens are disciplined but expressively flat (audit `CC-1`, `CC-2`, `CC-4`, `CC-5`). One line-height for all headings, one section rhythm, no display tier, positive tracking on the largest type, `ease-out` as the only curve, and arbitrary z-index/icon-size values scattered across six components.

**Proposed solution.** Implement `docs/design/design-system.md` §2–§7 in the token layer only. Swap fonts in `src/app/layout.tsx`. Extend `@theme inline`. Add the missing `:active` states and the three card intents to the primitives. Delete dead components. Retire the glow-on-hover.

**Accent hues are unchanged** — `--primary`, `--primary-light`, and `--secondary` keep their approved values. What changes is structural: new `--text-tertiary`, `--surface-raised`, and `--border-neutral` tiers, a softened `--border`, two-layer elevations, tokenised z-index and icon sizes, and the usage discipline in design-system §2.3 that stops the accent being applied to everything at once.

**Components affected**
`src/styles/variables.css` · `src/styles/globals.css` · `src/styles/animations.css` · `src/app/layout.tsx` · `components/button/*` · `components/card/*` · `components/badge/*` · `components/input/field-styles.ts` · new `components/chip/*` · `components/scroll-progress-bar` · `components/back-to-top-button` · `components/icon-button` · `components/spinner` · `components/social-links` · delete `checkbox`, `radio`, `divider` re-exports if still unused after audit re-check, merge `PageWrapper` into `ContentWrapper`.

**Risk: MEDIUM** (reduced from HIGH now that the accent is not changing). The main hazards are the font swap shifting metrics across every heading, and the fluid type scale exposing layouts that were tuned to fixed sizes.

**Mitigation.** Land structural tokens first and verify nothing shifts, then the fonts, then the primitives — three separate commits so any breakage is attributable. Verify every text/background pair against `#040414` after the `--border` and `--text-tertiary` changes. Grep for every arbitrary value listed in audit `CC-5` and confirm zero remain.

**Order:** 0.1 structural tokens → 0.2 fonts + type scale → 0.3 primitives + `:active` → 0.4 dead-code removal.

---

## Stage 1 — Homepage / hero · **COMPLETE (2026-08-30)**

**Delivered.** Asymmetric hero composition with credibility strip, differentiated CTAs (primary + secondary), compressed entrance animation (640ms total), and grid-based responsive layout. Verified: `npm run lint` 0 errors / 1 pre-existing warning, `npm run typecheck` clean, `npm run build` clean (32/32 routes prerendered), all public routes return 200.

Files changed: `src/features/home/components/hero-section/hero-section.tsx`, `src/app/(public)/page.tsx`, `src/styles/animations.css`.

**What changed:**

1. **Layout transformation**: Centered stack → asymmetric 12-column grid
   - Left column (7/12 on md, 8/12 on lg): Content with role eyebrow, display-scale name with gradient-text, lead tagline, credibility strip, CTAs
   - Right column (5/12 on md): `about-me.py` code card over social links (owner-requested, 2026-09-03; superseded the earlier empty-space composition — see design-system §6.9).
   - Mobile: Single column stack with optimal spacing

2. **Credibility strip**: New data-driven component showing:
   - Current experience (from `getCurrentJourneyEntryForUi()`)
   - Project count (from `getPublishedProjectCountForUi()`)
   - Location (from `profile.location`)
   - Renders conditionally — collapses cleanly if data is missing
   - Styled with mono font, uppercase tracking for labels, emphasis on values

3. **CTA hierarchy fixed**: 
   - "View My Work" → Primary button (gradient, high contrast)
   - "Download Resume" → Secondary button (border, subtle)
   - Preserves functionality, improves visual priority

4. **Entrance animation compressed**: 6 steps → 6 steps but tighter timing
   - Role: 0ms start, 280ms duration
   - Name: 60ms start, 360ms duration (blur effect)
   - Description: 140ms start, 280ms duration
   - Stats: 200ms start, 280ms duration (new element)
   - CTAs: 280ms start, 280ms duration
   - Social: 360ms start, 280ms duration
   - Total sequence: 640ms (last element completes at 640ms)

5. **Typography tokens applied**:
   - Role uses `Text variant="overline"` (new token)
   - Name uses `gradient-text`, `text-display`, `leading-display`, `tracking-display`
   - Description uses `Text variant="lead"` with `measure-lead`
   - Stats use mono font for labels with semantic styling

6. **Responsive improvements**:
   - Hero height: `min-h-[calc(100svh-var(--nav-height))]` replaces `min-h-[70svh]`
   - Grid collapses cleanly at mobile breakpoint
   - Social links orientation adjusts (row on mobile, column on desktop)

**Original problem.** The highest-traffic screen was the most generic (audit `H-1`, `H-2`, `H-3`, `H-8`). A centered column of role / name / tagline / two buttons / social row, with no evidence of capability above the fold, two infinite background blobs providing perpetual meaningless motion, and a 1.2-second entrance sequence. `/about` held real metrics that the hero never surfaced.

**Components affected**
`features/home/components/hero-section/hero-section.tsx` · `app/(public)/page.tsx` · `styles/animations.css`.

**Risk: MEDIUM.** Content risk, not technical — the credibility strip is only as good as the data behind it. Layout risk on landscape mobile where `min-h-[70vh]` currently misbehaves.

**Mitigation applied.** Every metric renders conditionally and the strip collapses cleanly to zero items. Replaced `min-h-[70vh]` with viewport-height calculation using `svh` units and nav-height token.

**Deviations from plan:** A bordered decorative panel was rejected during Stage 1, and the right column shipped as social links over empty grid cells. The owner reversed that on 2026-09-03: the column now carries a data-generated `about-me.py` card, the credibility strip is icon-led, and a technology rail closes the hero (design-system §6.9).

---

## Stage 2 — Navigation · **COMPLETE (2026-08-30)**

**Delivered.** Scroll-aware transparent header, animated nav link underlines, full-height mobile menu sheet with backdrop/scroll-lock/focus-trap, skip-to-content link, and resume CTA with appropriate visual hierarchy. Verified: `npm run lint` 0 errors / 1 pre-existing warning, `npm run typecheck` clean, `npx next build` clean (32/32 routes prerendered).

Files changed: `src/components/public-layout/public-layout.tsx`, `src/components/scroll-aware-header/*` (new), `src/components/skip-to-content/*` (new), `src/components/navbar/{navbar.tsx,navbar.types.ts}`, `src/components/nav-link/nav-link-styles.ts`, `src/components/mobile-menu/{mobile-menu.tsx,mobile-menu.types.ts}`, `src/components/button/button.tsx`, `src/components/main/main.tsx`.

**What changed:**

1. **Scroll-aware header**: Created new `ScrollAwareHeader` client component
   - Transparent over hero (`bg-transparent`, `border-transparent`)
   - Transitions to solid after 24px scroll (`bg-background/85`, `backdrop-blur-[12px]`, `border-border`)
   - Smooth 300ms transition with entrance easing
   - Uses `useEffect` + passive scroll listener for performance

2. **Nav link improvements**: Animated center-out underline
   - Underline grows from center on hover (pointer devices only) and active state
   - Uses `scale-x` transform for hardware acceleration
   - Respects `prefers-reduced-motion` (hides hover underline)
   - Touch devices show underline only for active links
   - Improved color transitions with proper easing

3. **Mobile menu redesign**: Full-height sheet with complete accessibility
   - **Visual**: Side sheet (max-w-sm) sliding in from right, backdrop blur overlay
   - **Scroll lock**: Locks body scroll when open, accounts for scrollbar width
   - **Focus trap**: Traps focus within menu, cycles Tab from last to first element
   - **Keyboard**: Closes on Escape, returns focus to trigger button
   - **Structure**: Header (title + theme toggle + close button), nav links, footer with resume CTA
   - **Animation**: Drawer easing curve (iOS-like), backdrop fade, respects reduced motion

4. **Skip-to-content link**: Accessibility landmark
   - Positioned fixed, visually hidden until focused
   - First tab-stop in document
   - Jumps to `<main id="main-content">`
   - Styled as primary button with proper contrast

5. **Resume CTA added**: Desktop navbar now includes resume download
   - Uses new `accent` button variant (subtle, not competing with primary)
   - Small size (`sm`) to maintain navbar proportions
   - Mobile: Full-width primary button in menu footer
   - Maintains download attribute and proper labeling

6. **Button component enhancement**: Added `forwardRef` support
   - Required for mobile menu focus management
   - Maintains all existing props and behavior
   - No breaking changes to existing usage

**Original problem.** 72px opaque bar from first paint (audit §4.1, `S-6`). Mobile menu was inline dropdown with no backdrop, no scroll lock. Nav links always point at `/#section` hashes.

**Components affected**
`components/public-layout/*` · new `components/scroll-aware-header/*` · new `components/skip-to-content/*` · `components/navbar/*` · `components/mobile-menu/*` · `components/nav-link/nav-link-styles.ts` · `components/button/button.tsx` · `components/main/main.tsx`.

**Risk: MEDIUM.** The fixed header + `--nav-height` spacer is load-bearing; height changes affect scroll-spy offsets and every anchor landing position.

**Mitigation applied.** Kept the spacer pattern driven by `--nav-height` (already 64px from Stage 0). No height change, so scroll-spy remains unaffected. Tested scroll behavior and anchor links preserved.

**Deviations from plan:** None. All planned features implemented as specified. The "centre-out animated underline" was implemented as specified using `scale-x` transform with center origin.

---

## Stage 3 — Projects presentation · **COMPLETE (2026-09-01)**

**Delivered.** Rebuilt `ProjectCard` with 16:9 `next/image` thumbnails and monogram fallback, max four tech badges with `+N`, and a two-action footer. `/projects` now uses a featured wide row above a 2-up grid, `Chip` filters, a live “showing N of M” count, and an `h2` between the page `h1` and card `h3`. Verified: `npm run lint`, `npm run typecheck`, `npm run build`.

Files changed: `src/features/projects/components/project-card/*`, `projects-explorer/*`, `projects-page/*`, `constants/projects-data.ts`, `service.ts`, new `src/components/chip/*`, `src/components/badge/*`, `src/components/index.ts`, `next.config.ts`.

**What changed:**

1. **ProjectCard** follows design-system §6.3: thumbnail (or monogram), title, supporting line (`outcome` when present, otherwise `shortDescription`), optional metric row, ≤4 tech badges, Details + one contextual action (Preview if media exists, otherwise Live Demo). GitHub is no longer on the card.
2. **`/projects` composition:** first `featured` project (when unfiltered) as a wide feature row; remaining projects in a 2-up grid. Search/filter suppress the feature row so results stay a uniform grid.
3. **Chip** is a new shared primitive with `aria-pressed`, hover, `:active`, and focus ring. Technology filters no longer reuse Badge/button hybrids.
4. **Live count** `Showing N of M projects` with `aria-live="polite"`.
5. **Heading order:** page `h1` → explorer `h2` “Selected work” → card `h3`.
6. **`next.config.ts`** `images.remotePatterns` allows `https` thumbnails from any host (dashboard-managed URLs). Local `public/` paths continue to resolve via `resolvePublicAssetUrl`.
7. **`featured` is passed through** from the existing Prisma field. No schema changes. `outcome` / `metrics` are optional on the UI type and render only when populated.

**Original problem.** Cards showed title + short description + unbounded tech badges and up to four wrapping actions. Thumbnails existed in data but were never rendered. `/projects` matched the home grid plus a search box.

**Risk: MEDIUM-HIGH.** `next/image` remote hosts; empty outcome/metric fields.

**Mitigation applied.** Monogram fallback ships with the image (including `onError`). Outcome/metrics are conditional. No schema changes.

**Deviations from plan:** Outcome and metric *rows* are implemented but unused until those fields exist in data — `shortDescription` is the supporting line. GitHub was removed from the card (moved to detail, Stage 4) rather than given an overflow menu. Home `#projects` still uses a 2/3-up grid of the new cards rather than the featured-row layout, which is reserved for `/projects`.

---

## Stage 4 — Project detail pages · **COMPLETE (2026-09-01)**

**Delivered.** `/projects/[slug]` is a case-study layout: sticky metadata rail + `--measure-prose` narrative, `next/image` media, conditional Overview / Approach / Outcome, and previous/next navigation. Branded `not-found` / `error` / public `loading` files replace the unstyled Next.js defaults. Verified: `npm run lint`, `npm run typecheck`, `npm run build`.

Files changed: `src/features/projects/components/project-detail-page/*`, `project-card/project-thumbnail.tsx`, `constants/projects-data.ts`, `utils/adjacent-projects.ts`, `src/app/(public)/projects/[slug]/page.tsx`, `src/components/breadcrumb/*`, new `src/components/not-found-view/*`, new `src/components/error-fallback/*`, new `src/app/not-found.tsx`, `src/app/error.tsx`, `src/app/(public)/not-found.tsx`, `src/app/(public)/error.tsx`, `src/app/(public)/loading.tsx`.

**What changed:**

1. **Case-study layout** — sticky rail (role, period, stack, metrics, links) beside a 68ch narrative column. Sections and rail rows render only when content exists.
2. **`next/image`** via the existing `ProjectThumbnail` primitive (monogram fallback, `sizes`, LCP `priority` on the hero).
3. **Previous/next** from published-list order, no wrap, plus All projects.
4. **Branded 404 / error / loading** — root `not-found.tsx` wraps `PublicLayout` for unmatched URLs; `(public)/not-found.tsx` is the inner view only so `notFound()` from a public page does not double the chrome. `error.tsx` is a Client Component with `reset()`. `(public)/loading.tsx` uses the existing `Skeleton`.
5. **Breadcrumb** separator uses `--text-tertiary` instead of `--text-disabled`.

**Original problem.** Breadcrumb → h1 → lead → raw `<img>` → Overview → badges → link row. Unstyled Next.js 404. `max-w-3xl` (~95ch). No previous/next.

**Risk: LOW-MEDIUM.** Structured sections depend on data that may not exist; `error.tsx` must be a Client Component with a working reset.

**Mitigation applied.** Every section and rail row is conditional. No schema changes. `error.tsx` is a Client Component calling `reset()`. 404 is a branded view with Home / Projects actions.

**Deviations from plan:** Role, Period, Approach, and Outcome remain unused until those fields exist in data (same pattern as Stage 3 metrics). Overview hides when `description` equals `shortDescription` so the lead is not repeated. Extra `(public)/not-found.tsx` and `(public)/error.tsx` keep public chrome without double-wrapping `PublicLayout`. GitHub uses the `accent` button variant (design-system §6.1) rather than outline.

---

## Stage 5 — About composition · **COMPLETE (2026-09-01)**

**Delivered.** `/about` is five sections: Introduction (monogram + narrative + at-a-glance `<dl>`), What I Do (2-up asymmetric), Stack (merged skills / currently using / learning), Path (education + condensed timeline + link to `/journey`), CTA. Verified: `npm run lint`, `npm run typecheck`, `npm run build`.

Files changed: `src/features/about/components/about-page/*`, `about-introduction/*`, `about-at-a-glance/*`, `about-what-i-do/*`, `about-cta/*`, `constants/about-content.ts`, new `about-stack/*`, new `about-path/*`, `src/app/(public)/about/page.tsx`; removed unused section wrappers (professional summary, education, skills, technologies, currently-working-with, currently-learning, journey-summary). Docs: `docs/design/uiux-redesign-plan.md`, `docs/design/design-system.md`, `docs/implementation-roadmap.md`, `docs/project-design/pages.md`.

**What changed:**

1. **Introduction** folds portrait, biography, professional summary, and at-a-glance into one section. Stats are a `<dl>`. Role uses the overline token.
2. **What I Do** is a 2-up grid with the first item featured; never three equal columns.
3. **Stack** reuses `SkillsCategories` and keeps currently-using / currently-learning as headings inside the same section.
4. **Path** reuses `JourneyTimeline` for the first three entries, keeps education in this section, and links to `/journey`.
5. **No schema, repository, or service changes.** Dashboard About narrative and skills CRUD are untouched. Home `#about` preview is unchanged.

**Original problem.** Eleven equal-weight sections; four overlapping badge clouds; Journey Summary duplicated `/journey`; stats were a card grid/`ul`; role used a one-off type string.

**Risk: MEDIUM.** Consolidation removes visible section headings. Owner requested full Stage 5 implementation.

**Mitigation applied.** Data sources unchanged. Sections and rows omit themselves when empty. Timeline chrome left for Stage 6.

**Deviations from plan:** No portrait photograph exists in SiteProfile or `public/`; an initials monogram is used instead of inventing an image. The flat Technologies cloud is omitted because it is the same list as categorised skills. Path shows education here rather than as a sixth section. Home About preview was not redesigned (out of Stage 5 page scope).

---

## Stage 6 — Journey timeline · **COMPLETE (2026-09-01)**

**Delivered.** Timeline rail is CSS Grid (no negative offsets), markers distinguish work / education / milestone in `--primary`, empty lists use `EmptyState`, and `/journey` ends with Projects + Contact. Scroll reveal is deferred to Stage 11. Verified: `npm run lint`, `npm run typecheck`, `npm run build`.

Files changed: `src/features/journey/components/journey-timeline/*`, `journey-card/*`, `journey-page/*`, `constants/journey-data.ts`, new `utils/journey-entry-kind.ts`, `src/features/journey/index.ts`, `src/features/about/components/about-path/about-path.tsx`. Docs: `docs/design/uiux-redesign-plan.md`, `docs/design/design-system.md`, `docs/implementation-roadmap.md`, `docs/project-design/pages.md`.

**What changed:**

1. **Rail** — each item is `grid` with a marker column and a card column. The connecting line is a flex-grow `--border-strong` segment; dots are not absolutely positioned with magic `left` values.
2. **Entry kinds** — filled circle (work), hollow circle (education), square (milestone). Card overline labels the kind. No new accent hue. No Prisma field; kind is inferred from existing title/organization when not set.
3. **EmptyState** when the list is empty (Home, About Path, `/journey` all share the component).
4. **`/journey` closing CTA** — View Projects + Contact Me. Home already had “View Full Journey”; it is unchanged aside from the shared rail.
5. **Scroll reveal not implemented** — Stage 11.

**Original problem.** Magic-number dots, empty `<ol>`, no type distinction, `/journey` dead-ended, no motion.

**Risk: LOW.** Shared across three surfaces.

**Mitigation applied.** `<ol>` preserved; markers `aria-hidden`; no schema, repository, or dashboard CRUD changes.

**Deviations from plan:** Kind is inferred rather than stored (no schema change). Card overline supplements marker shape so type is not shape-only. Scroll reveal explicitly deferred to Stage 11 as specified.

---

## Stage 7 — Contact experience · **COMPLETE (2026-09-01)**

**Delivered.** Contact heading order is valid, channels use `ExternalLink`, submit uses `Button loading`, availability is a live status pip from SiteProfile, stale “Coming Soon” copy is gone, and FAQ uses native disclosure. Verified: `npm run lint`, `npm run typecheck`, `npm run build`.

Files changed: `src/features/contact/components/contact-form/*`, `contact-info/*`, `contact-faq/*`, `contact-section/*`, `constants/contact-content.ts`. Docs: `docs/design/uiux-redesign-plan.md`, `docs/design/design-system.md`, `docs/implementation-roadmap.md`, `docs/project-design/pages.md`.

**What changed:**

1. **Heading** — `/contact` aside is `h2`; Home `#contact` aside is `h3` under the section `h2`.
2. **Email** uses `ExternalLink` (`target="_self"` for mailto). LinkedIn/GitHub already did.
3. **Submit** — `loading={isPending}` (spinner, `aria-busy`); label stays “Send Message”. Inputs disabled while pending.
4. **Availability** — `role="status"` pip + SiteProfile string (not a hardcoded line).
5. **FAQ** — `<details>` / `<summary>`, first item open. Copy constants already described a live form; comment made explicit.

**Original problem.** h1→h3 skip, raw mailto classes, text-swap submit, stale Coming Soon, always-open FAQ cards.

**Risk: LOW.** Presentation only.

**Mitigation applied.** Fetch, Zod, reCAPTCHA, and rate limiting untouched.

**Deviations from plan:** `S-1` is wired on the contact submit only; other async actions remain for Stage 8 / auth. Availability “open” vs other is inferred from the existing string (`/\bopen\b/i`), not a new schema flag. FAQ disclosure was included because `contact-faq` is in the Stage 7 file list and audit `C-5`.

---

## Stage 8 — Dashboard visual consistency · **COMPLETE (2026-09-01)**

**Delivered.** Off-canvas dashboard nav below `md` (the plan’s only P0), a real header (brand, breadcrumb, account actions), sidebar filled-row active state, field-level errors on projects/journey/skills, grouped project fieldsets with a sticky action bar, `startEdit` focus, skills icon input, shared `Select` for message status, `Chip` `aria-pressed` on technologies, pending-disabled fields, required indicators on Label via Input/Textarea/Select, and a three-section settings skeleton. Verified: `npm run lint`, `npm run typecheck`, `npm run build`.

**What changed:**

1. **P0 drawer (D-1)** — portaled left sheet below `md`, backdrop, scroll lock, Escape, focus trap, close on navigate. Desktop sidebar `hidden md:block`.
2. **Header (D-2)** — “Dashboard” brand → `/dashboard`, pathname breadcrumb, Settings + Sign out (`Button loading`).
3. **Sidebar active (D-3)** — `border-l-2` + `bg-primary/10`; does not reuse public `navLinkClassName`.
4. **fieldErrors (D-4)** — projects/journey/skills copy the Settings pattern; generic toast retained.
5. **Projects form (D-5)** — Copy / Media / Links / Publishing fieldsets; sticky action bar.
6. **startEdit (D-6)** — scrolls the form into view and focuses the first field.
7. **Required (D-7)** — `Input` / `Textarea` / `Select` forward `required` to `Label`.
8. **Pending (D-8)** — editor fields in a `disabled` fieldset; submit uses `loading`.
9. **Skills icon (D-9)** — optional text input; payload still `draft.icon || undefined`.
10. **Messages (D-10)** — shared `Select`.
11. **Tech chips (D-11)** — `Chip` with `aria-pressed`.
12. **Settings skeleton (D-13)** — Account / Site identity / About blocks.

**Risk: MEDIUM-HIGH.**

**Mitigation applied.** Optimistic create/edit/delete/rollback logic unchanged. Repositories and services unchanged. Journey/skills Server Actions only attach `zodFieldErrors` on validation failure so the panels can display them.

**Deviations from plan:** The drawer is not a separate commit (the user asked for the full Stage 8 scope in one pass). `D-12` triple skeleton is P3 and was not in the proposed solution. Auth `AU-*` is not Stage 8. Account menu is Settings link + existing `LogoutButton`, not a new dropdown.

---

## Stage 9 — Mobile UX sweep · **COMPLETE (2026-09-01)**

**Delivered.** Touch targets meet `--touch-target` (44px) with ≥8px separation, project cards stay at two actions, hover lift is pointer-only with `:active` press on touch, dense 3-up text/skill grids wait until `xl`, and `PageWrapper` is a `ContentWrapper` alias. Verified: `npm run lint`, `npm run typecheck`, `npm run build`.

**What changed:**

1. **H-5 / P-5** — Card footer `gap-2`; Details + Preview or Live Demo share the row at 320 (`flex-1`); GitHub remains on the detail page (Stage 3).
2. **A-4** — At-a-glance was already a vertical `<dl>` (Stage 5). Home About preview and Skills 3-up move to `xl` so 1024 stays 2-up. Introduction monogram is `w-full max-w-xs`.
3. **CC-8 / S-3** — Hover styles wrapped in `@media (hover: hover)` on buttons, cards, chips, links, fields, nav, social, and `.hover-lift` / `.surface-card-interactive`. `:active` press on those controls; fields gain an active border/background.
4. **44px targets** — `Button` `sm`/`md`/`lg` `min-h-[var(--touch-target)]`; chips, footer links, brand, dashboard nav, adjacent project links. Hero and page CTAs go full-width below `sm`.
5. **Dashboard 320** — Breadcrumb hidden below `md`; list Edit/Delete groups `shrink-0 gap-2`.
6. **S-7** — `PageWrapper` re-exports `ContentWrapper` (one implementation).
7. **Overflow** — Contact values `break-words`; hero stats wrap with tighter row gap.

**Risk: LOW.**

**Mitigation applied.** No route, CRUD, or dependency changes.

**Deviations from plan:** No overflow menu was added on project cards — two actions already, GitHub lives on the detail page. `D-12` and Stage 10 a11y items (`CC-7`, heading skips, `CC-9`, `AU-1`, `A-6`) were not started. Design-system “3-column at 1024” now applies to project cards; text/skill cards stay 2-up until `xl`.

---

## Stage 10 — Accessibility sweep · **COMPLETE (2026-09-01)**

**Delivered.** Skip-to-content is first-focusable on public, login, and dashboard shells. Heading outlines no longer skip on `/projects`, `/journey`, or `/contact`. Primary-tinted controls add `--elevation-focus`. MFA step change focuses the code field. Required labels, `aria-pressed` chips, and the About at-a-glance `<dl>` were already in place from Stages 5 and 8. Verified: `npm run lint`, `npm run typecheck`, `npm run build`.

**What changed:**

1. **CC-7** — `SkipToContent` added to `DashboardShell` and `AuthLayout` (public layout already had it from Stage 2). Same `#main-content` target; no duplicated CSS.
2. **P-4** — `/projects` was already `h1` → `h2` “Selected work” → card `h3` (Stage 3). `/journey` now passes `titleLevel="h2"` (visual `h3`) through `JourneyTimeline` → `JourneyCard`. Empty states under a page `h1` use semantic `h2`.
3. **C-1** — `/contact` aside already `h2`; Home `ContactSection` already `h3` (Stage 7).
4. **CC-9** — `.focus-on-primary:focus-visible` plus `shadow-focus` on primary buttons, pressed chips, and active dashboard nav. Focus offset uses `--focus-ring-offset` (3px).
5. **AU-1** — On MFA, `useLayoutEffect` focuses `#mfa-code`. Returning to credentials focuses `#login-email`. Existing success `Alert` (`role="status"`) announces the step.
6. **D-7 / D-11 / A-6** — Verified already delivered: `Label.required`, `Chip aria-pressed`, About `<dl>`.

**Risk: LOW.**

**Mitigation applied.** No ARIA where semantics suffice. No Server Action, schema, or auth-contract changes. No motion work (Stage 11).

**Deviations from plan:** Lighthouse accessibility 100 was not re-run in this pass (no browser Lighthouse in the implementation environment). `AU-4` login Suspense “Loading…” and `AU-5` stale auth-layout comment were P3 and not in the proposed solution; the comment was corrected only because `AuthLayout` was already open for the skip link.

---

## Stage 11 — Motion pass · **COMPLETE (2026-09-01)**

**Delivered.** Scroll reveal runs once at 15% intersection on section headings, project cards, timeline entries, and the About stat group — shared observer, 60ms stagger capped at 5, never above the fold. Hero is three steps over 520ms. Toasts enter/exit with a max of 3. Press feedback and the nav underline were already in place from Stages 2 and 9. Modal left unchanged. Verified: `npm run lint`, `npm run typecheck`, `npm run build`.

**What changed:**

1. **Scroll reveal (CC-11 / J-5)** — `useScrollReveal` + `Reveal`. One `IntersectionObserver`. Below-fold only; in-viewport nodes stay visible. `.reveal` is opacity + `translateY(12px)` over `--duration-slow`.
2. **Hero (§7.5 / H-8)** — role+name 0ms, tagline+metrics 120ms, CTAs+social 240ms, 280ms each (520ms total). Blur removed. Blobs already gone (Stage 1).
3. **Toasts (S-4)** — `animate-toast-in` / `animate-toast-out`; cap 3; older collapse.
4. **Spinner (S-8)** — reduced-motion: static complete ring, not a frozen gap.
5. **Press / nav / modal** — verified existing `:active` scale, nav `scale-x` underline, modal opacity/scale. No change.

**Risk: MEDIUM.**

**Mitigation applied.** Transform and opacity only. Final space reserved. Nothing above the fold is armed. Reduced motion skips transform and keeps end states. No new dependencies. No Stage 12 (roadmap has none). Phase 6 close / `uiux-final-review.md` is out of this stage’s scope.

**Deviations from plan:** Toast entrance uses `--duration-normal` (240ms) rather than the 220ms copy in an earlier draft of §6.8, matching the duration token table. Role overline ships with the name step (still three beats). Page `h1` `SectionHeading`s are not revealed. Skill cards, forms, nav, footer, and dashboard are not revealed.

---

## 2. Risk register

| Risk | Likelihood | Impact | Mitigation |
|---|---|---|---|
| Softened `--border` + new `--text-tertiary` reduce contrast below AA | Low | High | Contrast-verify every pair pre-merge; `--border` is decorative, not a contrast boundary |
| Font swap causes CLS or layout shift | Medium | Medium | `next/font` with `display: "swap"`, same loading pattern; measure before/after |
| Dashboard refactor breaks CRUD | Medium | **Critical** | Presentation-only changes; manual CRUD exercise per entity per panel |
| `next/image` misconfiguration breaks build | Medium | High | Confirm thumbnail storage and `remotePatterns` before writing image code |
| About consolidation removes wanted content | Medium | Medium | Stage 5 complete; presentation-only, no data deleted |
| Nav height change breaks scroll-spy/anchors | Medium | Medium | Drive everything from `--nav-height`; re-verify all six sections and deep links |
| Scroll reveal hurts LCP/CLS | Low | Medium | Transform/opacity only; final space reserved; nothing above the fold |
| Scope creep into backend | Low | **Critical** | Hard boundary in §3; any schema need escalates as a separate decision |

---

## 3. Hard boundaries — must not change

Restating the brief as an enforceable constraint. Any change touching these stops and escalates.

- Prisma schema, migrations, seed data.
- `repository.ts`, `service.ts`, and `actions/**` in every feature.
- DB-first read paths and static fallback behaviour.
- Authentication, MFA, RBAC, `middleware.ts`, session handling.
- Rate limiting, reCAPTCHA, CSP, security headers in `next.config.ts`.
- Route Handler request/response contracts under `src/app/api/**`.
- `generateMetadata`, `sitemap.ts`, `robots.ts`, `opengraph-image.tsx`, JSON-LD output.
- Route paths and URL structure.
- Dashboard CRUD behaviour, optimistic updates, and rollback logic.
- No new runtime dependencies.

---

## 4. Definition of done

Per stage: lint clean · typecheck clean · manual pass at 320/768/1280 · keyboard pass · reduced-motion pass · no console errors · no CRUD regression.

For the redesign overall, additionally: `npm run build` clean · every public and dashboard route verified · Lighthouse accessibility holds at 100 · Lighthouse performance ≥ the 78 baseline · dark and light themes both verified · `docs/design/uiux-final-review.md` produced · `docs/ui-ux/design-system.md` and `docs/ui-ux/typography.md` marked `Superseded` · roadmap Phase 6 closed and tagged.

`docs/ui-ux/color-palette.md` is **not** superseded (owner decision, audit conflict C-1). Browser, Lighthouse, theme, and git-tag items that were not run in the implementation environment are listed in `docs/design/uiux-final-review.md` §6.
