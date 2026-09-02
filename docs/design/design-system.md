# Design System — v2

> Version: 2.0.0
>
> Status: **Implemented — Phase 6 complete (2026-09-01)**
>
> Last Updated: 2026-09-01
>
> Category: Design
>
> Supersedes: `docs/ui-ux/design-system.md` (v1.0.0) and `docs/ui-ux/typography.md` (v1.0.0)
>
> Does **not** supersede: `docs/ui-ux/color-palette.md` — the blue accent system is retained by owner decision (2026-08-29)
>
> Close review: `docs/design/uiux-final-review.md`

---

## 0. Status and preconditions

This document is the implemented visual system for Phase 6 (closed 2026-09-01). See `docs/design/uiux-final-review.md`.

Preconditions that had to land first:

1. **ADR-011 approved.** The font change in §3.1 supersedes `docs/ui-ux/typography.md` (Orbitron and Fira Code). Colour is **not** affected — audit conflict C-1 kept the existing blue palette, so `docs/ui-ux/color-palette.md` stands unchanged.
2. **Phase 6** was added to `docs/implementation-roadmap.md` before implementation.

`docs/ui-ux/design-system.md` and `docs/ui-ux/typography.md` are marked `Status: Superseded` with a pointer here. CSS source-of-truth comments in `src/styles/variables.css`, `globals.css`, and `animations.css` already point here.

### Implementation contract

- Every value below becomes a **CSS custom property** in `src/styles/variables.css` and is bridged to Tailwind through `@theme inline` in `src/styles/globals.css`.
- No component may introduce a raw colour, an arbitrary pixel size, or an ad-hoc duration. If a value is needed and not defined here, the token is added here first.
- Tailwind v4 only. No `tailwind.config.js` is introduced.
- No new runtime dependencies. Motion stays in CSS.

---

## 1. Principles

1. **Evidence over decoration.** Every pixel of visual weight should be spent on proof of capability — outcomes, metrics, artefacts — not on ornament.
2. **Contrast creates hierarchy.** Scale, weight, and colour temperature do the work. Not borders, not glow, not boxes.
3. **One accent, used sparingly.** Blue is the signal. If everything is accented, nothing is.
4. **Motion is a sentence, not punctuation.** It says "this is new", "this belongs to that", or "that worked". Otherwise it does not exist.
5. **Surfaces earn their edges.** A card needs a border only when it must be separated from something adjacent.
6. **Accessible by construction.** Contrast, focus, and touch target are properties of the tokens, not a later audit.

---

## 2. Colour

### 2.1 Foundation — dark (default)

Unchanged from current implementation. These are correct and stay.

| Token | Value | Role |
|---|---|---|
| `--background` | `#040414` | Page canvas |
| `--background-secondary` | `#080a18` | Alternating sections (raised from `#0a0e19` for a cleaner step) |
| `--surface` | `#0d1526` | Cards, panels |
| `--surface-hover` | `#121c30` | Card hover |
| `--surface-raised` | `#16203a` | **New.** Modals, popovers, sticky bars |

### 2.2 Text

| Token | Value | Contrast on `#040414` | Role |
|---|---|---|---|
| `--text-primary` | `#e6eaf2` | 15.8:1 | Headings, body emphasis |
| `--text-secondary` | `#9ca4b3` | 7.4:1 | Body copy, descriptions |
| `--text-tertiary` | `#6f7789` | **New.** 4.6:1 | Metadata, captions, timestamps |
| `--text-disabled` | `#5a6172` | 3.4:1 | Disabled only — never for content |
| `--text-inverse` | `#040414` | — | On light surfaces |

`--text-tertiary` is added because the current system forces a jump from `--text-secondary` straight to `--text-disabled` for metadata, and `--text-disabled` at 3.4:1 fails AA for content use.

### 2.3 Accent — retained unchanged

**Owner decision (2026-08-29): the existing blue accent system is kept.** The magenta/aqua/violet direction proposed in the redesign brief is **not** adopted. `docs/ui-ux/color-palette.md` remains authoritative for hue, and no ADR is required for colour.

| Token | Value | Contrast on `#040414` | Role |
|---|---|---|---|
| `--primary` | `#3f8cff` | **6.20:1** ✅ AA | Primary CTA, active state, focus ring, brand signal |
| `--primary-light` | `#6ac5ff` | **10.69:1** ✅ AAA | Hover, links on dark, gradient light stop |
| `--secondary` | `#22d3ee` | **11.25:1** ✅ AAA | Technical/data accent: code, metrics, tech badges |

Contrast computed against `#040414` using the WCAG 2.1 relative-luminance formula. All three clear 4.5:1 comfortably.

No third accent is introduced — `docs/ui-ux/color-palette.md` states *"Avoid introducing additional accent colors unless approved."* Structural elements that might otherwise want a third hue (timeline rail, dividers, chart lines) use `--border-strong` and `--text-tertiary` instead.

**Usage discipline — this is what separates a system from a paint job.** The current codebase applies `--primary` to links, buttons, borders, glows, focus rings, badges, and card hovers simultaneously, which is why the accent reads as wallpaper rather than signal.

| Colour | Allowed | Forbidden |
|---|---|---|
| `--primary` | One primary CTA per viewport; active nav; focus ring; the single most important number on a page | Body text; large fills; more than ~5% of any screen |
| `--primary-light` | Link hover, gradient light stop | Resting link colour on `--surface` |
| `--secondary` | Tech badges, inline code, metric values, monospace accents | CTAs, headings, body text |

### 2.4 Gradient

```css
--gradient-primary: linear-gradient(135deg, #3f8cff 0%, #6ac5ff 100%);
--gradient-text:    linear-gradient(135deg, #6ac5ff 0%, #3f8cff 55%, #22d3ee 100%);
--gradient-hero:    radial-gradient(120% 80% at 50% -10%, rgba(63,140,255,0.10), transparent 60%);
```

- `--gradient-primary` keeps the approved blue ramp; only the angle changes from `90deg` to `135deg`.
- `--gradient-text` stays inside the blue→cyan family. Wide hue travel (purple→pink→orange) is what makes a gradient read as generic; this does not do that. Permitted on **exactly one element per page**: the hero name.
- `--gradient-hero` replaces the two animated background blobs (audit `H-3`) with a single static radial wash.

### 2.5 On-accent text

```css
--on-primary: #040414;
```

Retained unchanged, and the reasoning already documented at `src/styles/variables.css:121-134` still holds. `#040414` on `#3f8cff` = 6.20:1 and on `#6ac5ff` = 10.69:1 — both pass AA for normal text at any weight. White on this gradient fails the light stop and remains forbidden.

### 2.6 Borders and glow

| Token | Value | Role |
|---|---|---|
| `--border` | `rgba(63,140,255,0.14)` | Default hairline — softened from `0.20` |
| `--border-strong` | `rgba(63,140,255,0.32)` | Hover, active, focus-within |
| `--border-neutral` | `rgba(230,234,242,0.08)` | **New.** Non-accent separation (tables, dividers, static cards) |
| `--glow-primary` | `rgba(63,140,255,0.16)` | Focus and active only |

The brief forbids excessive glow. `--elevation-glow-primary` is therefore **removed from the default card hover** and reserved for focus and active states only.

### 2.7 Semantic

Unchanged: `--success #22c55e`, `--warning #f59e0b`, `--danger #ef4444`, `--info #0ea5e9`. `--info` sits visually close to `--secondary`; reserve `--info` for alert surfaces and `--secondary` for content accents.

### 2.8 Light theme

The light theme exists and is reachable via `ThemeToggle` in both the desktop navbar and mobile menu. Its accent values are unchanged (`--primary #2563eb`, `--primary-light #3b82f6`, `--secondary #0ea5e9`); it inherits only the **structural** additions:

| Token | Value | Note |
|---|---|---|
| `--background` | `#f7f8fc` | Slightly cooled from `#f5f7fb` |
| `--surface-raised` | `#ffffff` | New tier |
| `--text-tertiary` | `#5b6577` | New tier; 5.9:1 on `#f7f8fc` |
| `--border-neutral` | `rgba(15,23,42,0.08)` | New tier |

Light theme is a **P2 deliverable**: verified for correctness, not the design focus.

---

## 3. Typography

### 3.1 Font stack — proposed change

| Role | Current | Proposed | Rationale |
|---|---|---|---|
| Display | Orbitron | **Space Grotesk** (600/700) | Geometric with real character, tight apertures, excellent at large sizes, still legible at 20px. Reads as technical without reading as gaming. |
| Body | Inter | **Inter** (400/500/600) | Keep. Correct choice; no reason to change. |
| Mono | Fira Code | **JetBrains Mono** (400/500) | Better at small sizes, clearer numerals, and it is the font engineers actually recognise. |

All three are available via `next/font/google`, so this is a change to `src/app/layout.tsx` font declarations plus `--font-family-*` in `variables.css`. No new dependency, no self-hosting, no CLS regression (all use `display: "swap"` with the existing pattern).

**Weight discipline:** Display is 600 or 700 only. Body is 400, 500, 600 only. No 300, no 800, no 900. Nine weights across the site is a design system; twenty is drift.

### 3.2 Type scale

The current scale tops out at 64px and clamps h1 to 48px. The new scale adds a genuine display tier and uses fluid `clamp()` throughout.

| Token | Fluid value | Family | Weight | Line height | Tracking | Use |
|---|---|---|---|---|---|---|
| `--size-display` | `clamp(3rem, 11vw, 8.5rem)` | Display | 700 | 0.92 | `-0.03em` | Hero name — one per site |
| `--size-h1` | `clamp(2.25rem, 5.5vw, 4rem)` | Display | 700 | 1.05 | `-0.02em` | Page title |
| `--size-h2` | `clamp(1.75rem, 3.5vw, 2.75rem)` | Display | 700 | 1.12 | `-0.015em` | Section title |
| `--size-h3` | `clamp(1.375rem, 2.2vw, 1.75rem)` | Display | 600 | 1.2 | `-0.01em` | Card title, subsection |
| `--size-h4` | `1.25rem` | Body | 600 | 1.3 | `-0.005em` | Small headings, labels |
| `--size-h5` | `1.0625rem` | Body | 600 | 1.4 | `0` | Dense UI headings |
| `--size-lead` | `clamp(1.0625rem, 1.4vw, 1.25rem)` | Body | 400 | 1.55 | `0` | Section lead paragraph |
| `--size-body` | `1rem` | Body | 400 | 1.65 | `0` | Default |
| `--size-small` | `0.875rem` | Body | 400 | 1.6 | `0` | Secondary copy |
| `--size-caption` | `0.75rem` | Body | 500 | 1.45 | `0.02em` | Metadata |
| `--size-overline` | `0.6875rem` | Mono | 500 | 1.3 | `0.14em` | Section eyebrow, uppercase |

**Key corrections against current state:**

- Display and h1 use **negative** tracking. The current `--tracking-hero: 0.04em` is positive, which is wrong for display type.
- `h4`/`h5` move to the **body** family. A display face should never do UI-label work (audit `CC-3`).
- Line height decreases as size increases (0.92 → 1.65). Currently every heading shares `--leading-heading: 1.2`.
- `--size-overline` is new and is the signature typographic device: a small uppercase monospace eyebrow above each section heading. It carries the technical identity at almost zero visual cost.

### 3.3 Measure

| Token | Value | Use |
|---|---|---|
| `--measure-prose` | `68ch` | Long-form body (project detail, about narrative) |
| `--measure-lead` | `54ch` | Section leads, hero tagline |
| `--measure-narrow` | `42ch` | Card descriptions, captions |

This replaces the current ad-hoc `max-w-xl` / `max-w-2xl` / `max-w-3xl` usage (audit `PD-4`).

---

## 4. Space

### 4.1 Scale

The 8-point scale is retained exactly. It is correct and widely used.

`4 · 8 · 12 · 16 · 20 · 24 · 32 · 40 · 48 · 64 · 80 · 96` px

**Added** for the larger rhythm the redesign needs:

`--space-32: 128px` · `--space-40: 160px`

### 4.2 Section rhythm — replaces uniform 96px

The current single `--section-padding-*` produces a metronome (audit `CC-4`). Three tiers replace it:

| Token | Mobile | Desktop | Use |
|---|---|---|---|
| `--section-tight` | `48px` | `64px` | Adjacent related sections, dashboard |
| `--section-base` | `64px` | `96px` | Default section |
| `--section-loose` | `88px` | `160px` | Before and after a moment of emphasis (hero exit, closing CTA) |

Exposed as `.section-tight`, `.section`, `.section-loose`.

### 4.3 Containers

| Token | Value | Use |
|---|---|---|
| `--container-wide` | `1440px` | **New.** Full-bleed feature rows, hero |
| `--container-app` | `1280px` | Default page container (unchanged) |
| `--container-content` | `1120px` | Text-forward pages (narrowed from 1200px) |
| `--container-prose` | `760px` | Long-form reading |

Gutters unchanged: `16px` mobile / `24px` tablet / `32px` desktop, with `40px` added at ≥1440px.

---

## 5. Shape and surface

### 5.1 Radius

| Token | Value | Use |
|---|---|---|
| `--radius-token-xs` | `6px` | **New.** Badges, chips, inline code |
| `--radius-token-sm` | `8px` | Inputs, small buttons |
| `--radius-token-md` | `12px` | Buttons, form controls |
| `--radius-token-lg` | `16px` | Cards, panels |
| `--radius-token-xl` | `24px` | Feature cards, modals |
| `--radius-token-pill` | `999px` | Pills, avatars |

Rule: nested radii step down by one tier. A `lg` card containing an image uses `md` on the image.

### 5.2 Surface hierarchy

Depth is expressed by **background step first, border second, shadow last** — not by shadow alone.

| Level | Background | Border | Shadow |
|---|---|---|---|
| 0 — canvas | `--background` | none | none |
| 1 — alt section | `--background-secondary` | none | none |
| 2 — card | `--surface` | `--border-neutral` | none |
| 3 — interactive card | `--surface` | `--border` | `--elevation-soft` |
| 4 — raised | `--surface-raised` | `--border-strong` | `--elevation-medium` |
| 5 — modal | `--surface-raised` | `--border-strong` | `--elevation-large` |

**Change:** a plain card at level 2 has **no shadow**. Currently every `Card` gets `shadow-soft` regardless of role, which flattens hierarchy by making everything equally raised.

### 5.3 Elevation

```css
--elevation-soft:   0 2px 8px rgba(0,0,0,0.30), 0 8px 24px rgba(0,0,0,0.18);
--elevation-medium: 0 4px 16px rgba(0,0,0,0.38), 0 16px 40px rgba(0,0,0,0.24);
--elevation-large:  0 8px 32px rgba(0,0,0,0.46), 0 32px 72px rgba(0,0,0,0.34);
--elevation-focus:  0 0 0 3px rgba(63,140,255,0.24);
```

Two-layer shadows (contact + ambient) instead of the current single blur. `--elevation-glow-*` is retired from resting states.

### 5.4 Z-index

All arbitrary values (`z-[55]`, `z-[60]` — audit `CC-5`) are replaced by tokens:

`--z-base 0` · `--z-card 1` · `--z-dropdown 20` · `--z-nav 40` · `--z-progress 45` · `--z-floating 50` · `--z-modal 70` · `--z-toast 80` · `--z-cursor 90`

---

## 6. Components

### 6.1 Buttons

| Variant | Resting | Hover | Active | Use |
|---|---|---|---|---|
| `primary` | `--gradient-primary`, `--on-primary`, weight 600 | Public CTAs (`CtaLink` / `CtaAnchor`): expanding `--primary-light` fill, arrow swap, ring eases out. Dashboard / form `Button` primary: brightness 1.08, `--elevation-soft` | `scale(.98)`, brightness .96 | One per viewport |
| `secondary` | `--surface`, 1px `--border`, `--text-primary` | `--surface-hover`, `--border-strong` | `scale(.98)` | Paired with primary |
| `ghost` | transparent, `--text-secondary` | `--surface`, `--text-primary` | `scale(.98)` | Tertiary, toolbars |
| `accent` | **New.** transparent, 1px `--secondary`/30, `--secondary` | `--secondary`/10 bg | `scale(.98)` | Technical actions (repo, docs) |
| `danger` | `--danger`, `--text-primary` | brightness 1.08 | `scale(.98)` | Destructive |

`outline` is merged into `secondary` — the two are currently near-identical.

| Size | Height | Padding | Text |
|---|---|---|---|
| `sm` | 36px | 12px | `--size-small` |
| `md` | 44px | 20px | `--size-body` |
| `lg` | 52px | 28px | `--size-body` |

**Changes:** `md` drops 48→44px (matching `--touch-target` exactly rather than exceeding it), `lg` drops 56→52px. Every button gains an **`:active` press state** (audit `S-3`) and every async action **must** use the existing `loading` prop (audit `S-1`).

### 6.2 Cards

Three explicit intents replace the current one-size-fits-all:

| Intent | Border | Shadow | Hover |
|---|---|---|---|
| `static` | `--border-neutral` | none | none |
| `interactive` | `--border` | `--elevation-soft` | `translateY(-2px)`, `--border-strong`, `--elevation-medium` |
| `feature` | `--border-strong` | `--elevation-medium` | `translateY(-2px)` + accent border wash |

**Changes:** hover lift reduced 4px→2px (4px is enough to read as jumpy at 250ms), the glow is removed from hover, and **only `interactive` cards animate**. Every interactive card additionally gets `:active { scale: .995 }` so touch devices get feedback (audit `CC-8`).

### 6.3 Project card — the highest-value component

Structure, in order:

1. **Thumbnail**, 16:9, `next/image`, `--radius-token-md`, with a `--primary`-tinted overlay on hover. Falls back to a generated initial-monogram tile when `thumbnail` is absent. *(Resolves audit `H-4` / `P-2`.)*
2. **Title** at `--size-h3`.
3. **Outcome line** at `--size-small`, `--text-secondary`, max 2 lines, clamped.
4. **Metric row** — up to 3 items, values in `--secondary` monospace, labels in `--size-caption`.
5. **Tech badges** — max 4 visible, then `+N`.
6. **Actions** — **maximum two visible** (`Details` primary, one contextual secondary). Live Demo and GitHub move into the detail page and an overflow affordance. *(Resolves audit `H-5` / `P-5`.)*

### 6.3.1 Project detail — case study

Layout, in order:

1. **Breadcrumb** with `aria-current="page"` on the current title.
2. **Title** at `--size-h1` and lead at `--size-body-lg`, `--measure-prose`.
3. **Two-column shell** from `lg`: sticky metadata rail (`lg:col-span-4`) beside a narrative column (`lg:col-span-8`). The rail sticks below `--nav-height`. On smaller viewports the rail stacks under the header, then the media and prose.
4. **Rail** — Role, Period, Stack, Impact metrics, and Live/GitHub links. Each row renders only when its field exists. Stack uses `Badge` `tech`. Live Demo is the single primary action; GitHub uses `accent`.
5. **Media** — 16:9 `next/image` with a monogram fallback (same primitive as the card). `sizes` is `(min-width: 1024px) 60vw, 100vw`.
6. **Narrative** — Overview / Approach / Outcome as `h2` sections inside `--measure-prose`. A section is omitted when its content is missing or identical to the lead.
7. **Adjacent navigation** — previous/next in published-list order, no wrap, plus an All projects control.

No Prisma fields are invented for Role / Period / Approach / Outcome. *(Resolves audit `PD-1`, `PD-3`, `PD-4`, `PD-5`.)*

### 6.3.2 About page — five sections

`/about` is five sections, not eleven. Nothing is deleted from the database; only page composition consolidates. *(Resolves audit `A-1`–`A-6`.)*

1. **Introduction** — `lg` two-column: sticky rail (initials portrait tile + at-a-glance `<dl>`) beside name, overline role, tagline, biography, and professional summary when it differs from the biography. Role uses the overline token, not a one-off size class. There is no portrait asset in SiteProfile; the tile is a monogram.
2. **What I Do** — 2-up grid; the first item is featured (`md:col-span-2`, elevated card) when more than one item exists. Never a 3-column row.
3. **Stack** — one section: “Currently using” emphasis, categorised skills via existing `SkillsCategories` (2-up on large screens), “Currently learning”. The old Skills / Technologies / Currently Working With / Currently Learning sections are not separate pages.
4. **Path** — education card, condensed `JourneyTimeline` (first three entries), link to `/journey`.
5. **CTA** — Projects + Contact, `--measure-prose`.

### 6.3.3 Journey timeline

Shared by Home, About Path, and `/journey`.

1. **Rail** — CSS Grid `auto` marker column + card column. The vertical line is a flex-grow segment in the marker column using `--border-strong`. Markers use `--primary` only (filled circle = work, hollow circle = education, square = milestone). No negative offsets. *(Resolves audit `J-1`, `J-3`.)*
2. **Semantics** — `<ol>` when entries exist; markers `aria-hidden`. Kind is labeled on the card in overline, not only by shape.
3. **Empty** — `EmptyState` instead of an empty `<ol>`. *(Resolves audit `J-2`.)*
4. **`/journey` CTA** — Projects + Contact after the timeline so the page does not dead-end. *(Resolves audit `J-4`.)*
5. **Motion** — timeline entries use shared scroll reveal (`Reveal`, 60ms stagger, 15% intersection). *(Resolves audit `J-5`.)*

No Prisma `kind` field. Kind is optional on the UI type and otherwise inferred from existing title/organization strings.

### 6.3.4 Contact

The `/contact` page keeps its asymmetric form/aside grid. Refinements:

1. **Heading order** — page `h1`, aside `h2` (“Reach me directly”). Home `#contact` already has an `h2`, so the aside is `h3` there. *(Resolves audit `C-1`.)*
2. **Channels** — email, LinkedIn, and GitHub use `ExternalLink`. Mailto uses `target="_self"`.
3. **Submit** — `Button loading` with spinner; fields disabled while pending. Copy comes from `CONTACT_CONTENT.submitLabel`. *(Resolves audit `C-3` / contact slice of `S-1`.)*
4. **Availability** — SiteProfile value with a status pip (`role="status"`). Success pip when the copy contains “open”; otherwise tertiary.
5. **FAQ** — native `<details>` / `<summary>`, first item open. *(Resolves audit `C-5`.)*

Validation, `POST /api/contact`, rate limiting, and reCAPTCHA are unchanged.

### 6.4 Badges

| Variant | Style |
|---|---|
| `tech` | `--radius-token-xs`, mono `--size-caption`, `--secondary`, `--secondary`/8 bg, `--secondary`/20 border |
| `status` | pill, `--size-caption`, semantic colour at /15 bg + /30 border |
| `accent` | pill, `--primary` at /12 bg + /28 border |
| `neutral` | pill, `--border-neutral`, `--text-tertiary` |

Interactive chips (filters, toggles) are a **separate `Chip` component**, not a restyled Badge, and carry hover, `:active`, `aria-pressed`, and a focus ring. *(Resolves audit `P-3`.)*

### 6.5 Forms

| Property | Value |
|---|---|
| Height | `44px` (`--input-height`, reduced from 48px) |
| Radius | `--radius-token-sm` |
| Background | `--surface` |
| Border | `--border-neutral` resting |
| Hover | `--border` |
| Focus | `--border-strong` + `--elevation-focus` ring |
| Error | `--danger` border + `--danger`/20 ring |
| Label | `--size-small`, weight 500, `--text-primary`, **`*` in `--danger` when required** |
| Helper | `--size-caption`, `--text-tertiary` |
| Error text | `--size-caption`, `--danger`, `role="alert"` |

**Rules:** labels are always visible (never placeholder-only); errors always render inline at the field, never as a toast alone (audit `D-4`); inputs are `disabled` during pending mutations (audit `D-8`); required state flows from input to `Label` (audit `D-7`).

### 6.6 Navigation

**Public navbar** — 64px (down from 72px). Transparent over the hero, transitioning to `--background`/85 with `backdrop-blur(12px)` and a `--border-neutral` bottom edge after 24px of scroll. Active link marked by a 2px `--primary` underline that animates width from the centre. Mobile menu becomes a **full-height sheet with a backdrop and scroll lock** (audit `S-6`).

**Dashboard navigation** — implemented in Stage 8. Real header: brand (“Dashboard” → `/dashboard`), current-section breadcrumb, and account actions (Settings + Sign out) (audit `D-2`). The sidebar collapses to an off-canvas drawer below `md`, triggered by a hamburger in that header (audit `D-1`, the only P0). Active row is a filled `--primary`/10 background with a 2px left border — **not** the horizontal navbar's bottom underline (audit `D-3`).

### 6.7 Focus

```css
:focus-visible {
  outline: 2px solid var(--primary);
  outline-offset: 3px;
  border-radius: inherit;
}
```

On surfaces already tinted with `--primary`, focus additionally applies `--elevation-focus` so the ring separates from its background (audit `CC-9`). Implementation: `.focus-on-primary:focus-visible` plus `focus-visible:shadow-focus` on primary buttons, pressed chips, and the active dashboard nav row. Focus is **never** removed, only restyled.

Skip-to-content (`SkipToContent` → `#main-content`) is the first focusable control on public, auth, and dashboard shells (audit `CC-7`).

Stage 10 (2026-09-01): heading outlines no longer skip on `/projects` (Stage 3), `/contact` (Stage 7), or `/journey` (timeline titles are semantic `h2` at `h3` visual size). MFA step change focuses the code field. Dashboard empty states under a page `h1` use `h2`.

### 6.8 Toasts

Entrance and exit (audit `S-4`, Stage 11): slide up 8px + fade over `--duration-normal` (240ms) in, fade + `scale(.97)` over `--duration-fast` (160ms) out. Maximum 3 visible; older toasts collapse. Positioning, `aria-live`, and `role` handling are unchanged.

---

## 7. Motion

### 7.1 Principles

Motion is permitted only when it does one of four things: **signal entrance** of new content, **maintain continuity** between two states, **communicate state change**, or **acknowledge input**. Anything else is deleted.

Explicitly forbidden: perpetual ambient loops, parallax, page-transition curtains, staggered reveals longer than 400ms total, motion on more than ~7 elements at once, and motion on any element the user did not cause to appear.

### 7.2 Easing

Replaces the current plain `ease-out` / `ease-in` (audit `CC-11`).

| Token | Curve | Use |
|---|---|---|
| `--ease-out` | `cubic-bezier(0.22, 1, 0.36, 1)` | Entrances, expansions — the default |
| `--ease-in` | `cubic-bezier(0.64, 0, 0.78, 0)` | Exits, dismissals |
| `--ease-in-out` | `cubic-bezier(0.65, 0, 0.35, 1)` | Position/size changes on visible elements |
| `--ease-snap` | `cubic-bezier(0.3, 0.9, 0.4, 1)` | Presses, toggles, small state flips |

No spring, no overshoot, no bounce.

### 7.3 Duration

| Token | Value | Use |
|---|---|---|
| `--duration-instant` | `100ms` | Colour, opacity on hover |
| `--duration-fast` | `160ms` | Presses, toggles, small transforms |
| `--duration-normal` | `240ms` | Cards, dropdowns, toasts |
| `--duration-slow` | `360ms` | Modals, sheets, scroll reveals |
| `--duration-deliberate` | `520ms` | Hero entrance only |

Ceiling: nothing the user waits on exceeds 400ms.

### 7.4 Scroll reveal

A single reusable pattern: `opacity 0→1` plus `translateY(12px→0)` over `--duration-slow` with `--ease-out`, triggered once at 15% intersection, never replayed.

- Applied to: section headings (`h2+` via `SectionHeading` / `Reveal`), project cards, timeline entries, and the About at-a-glance stat group.
- Stagger: **60ms** between siblings, capped at **5 items** (300ms total).
- Never applied to: navigation, footer, forms, page `h1`s, the hero, or anything already in the viewport on load.

Stage 11 (2026-09-01): `useScrollReveal` shares one `IntersectionObserver`. Below-fold nodes receive `.reveal` after mount so SSR/LCP stays visible.

### 7.5 Hero entrance

Compressed to **three steps over 520ms total**: name + role (0ms), tagline + metrics (120ms), actions + social (240ms). Each step is 280ms (`translateY` + opacity, no blur). Infinite blobs were removed in Stage 1.

### 7.6 Reduced motion

`prefers-reduced-motion: reduce` disables all transform and scroll-reveal animation, retains opacity fades at ≤100ms, and preserves the *end state* of every animation. The global override in `animations.css` is kept. `Spinner` / `animate-spin` uses a static complete ring rather than freezing mid-rotation (audit `S-8`).

### 7.7 Public custom cursor

Owner-requested. Public routes only (`PublicLayout`). A `--primary` 6px dot tracks the pointer; a 34px ring lags behind (lerp, `transform` only). Over links and buttons the ring scales to ~52px (`scale(1.53)`), not width/height.

Gates: `(hover: hover) and (pointer: fine)`; `prefers-reduced-motion: reduce` restores the native cursor. Text fields keep `cursor: text` and hide the custom layers. The animation frame loop stops when the ring has caught up. Dashboard and auth layouts are unchanged.

---

## 8. Responsive

Tailwind defaults, unchanged: `sm 640` · `md 768` · `lg 1024` · `xl 1280` · `2xl 1536`.

| Breakpoint | Behaviour |
|---|---|
| `<640` | Single column; 16px gutter; drawer nav; max 2 card actions; display type at 3rem floor |
| `640–1023` | 2-column grids; 24px gutter; dashboard sidebar drawer below `md`, pinned from `md` |
| `1024–1279` | Project cards 3-up; Home About / Skills stay 2-up until `xl` (audit `A-4`); dashboard sidebar pinned; asymmetric layouts activate |
| `≥1280` | Full composition; `--container-app` |
| `≥1440` | `--container-wide` for feature rows; 40px gutter |

**Rules:** mobile-first authoring; no horizontal scroll at 320px; touch targets ≥44px with ≥8px separation; hover styles gated to `@media (hover: hover)` with `:active` press on touch (audit `CC-8` / `S-3`); text never below 14px.

Stage 9 (2026-09-01): `sm` buttons and chips meet `--touch-target`; project cards keep ≤2 actions; `PageWrapper` is an alias of `ContentWrapper`.

---

## 9. Accessibility floor

Non-negotiable, verified per page:

- Body text ≥4.5:1, large text and UI boundaries ≥3:1.
- Exactly one `<h1>` per route; no skipped heading levels.
- A skip-to-content link as the first focusable element on every page (audit `CC-7`). Present on public, login, and dashboard shells.
- Every interactive element reachable and operable by keyboard, with a visible focus ring. Primary-tinted controls add `--elevation-focus` (audit `CC-9`).
- Dialogs: focus trap, Escape, focus restore, `aria-modal`, labelled.
- Async results announced via `aria-live`; errors via `role="alert"`.
- Form labels always visible and programmatically associated.
- `prefers-reduced-motion` honoured everywhere.
- Touch targets ≥44×44px.

---

## 10. Token migration map

For implementation reference. Left column exists today; right column is the target.

| Current | Target | Note |
|---|---|---|
| `--primary: #3f8cff` | unchanged | Owner decision: blue retained |
| `--secondary: #22d3ee` | unchanged | Owner decision: blue retained |
| `--border: rgba(63,140,255,0.20)` | `0.14` | Softened |
| — | `--text-tertiary` | New |
| — | `--surface-raised` | New |
| — | `--border-neutral` | New |
| `--size-hero: 64px` | `--size-display: clamp(3rem,11vw,8.5rem)` | Renamed + fluid |
| `--tracking-hero: 0.04em` | `-0.03em` | Sign flip |
| `--leading-heading: 1.2` (all) | Per-tier 0.92→1.4 | Split |
| `--font-family-display: Orbitron` | Space Grotesk | Requires ADR |
| `--font-family-mono: Fira Code` | JetBrains Mono | Requires ADR |
| `--section-padding-*` | `--section-{tight,base,loose}` | Split into 3 |
| `--easing-*: ease-out/ease-in` | Four cubic-bezier curves | Replaced |
| `--duration-*` (4) | 5 tokens, retimed | Extended |
| `--elevation-glow-*` on hover | Focus/active only | Scope reduced |
| `z-[55]`, `z-[60]` | `--z-floating`, `--z-progress` | Tokenised |
| `size-[18px]` ×3 | `--icon-sm: 18px` | Tokenised |
