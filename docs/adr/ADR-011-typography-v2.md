# ADR-011: Typography v2 (Space Grotesk, JetBrains Mono, Fluid Type Scale)

> Version: 1.0.0
>
> Status: Approved
>
> Last Updated: 2026-08-29
>
> Owner: Project Team
>
> Category: Architecture

---

# Context

Phase 6 (UI/UX Redesign) audits the portfolio against a "high-end, memorable Software Engineer / AI Engineer portfolio" goal. Two typography findings in `docs/design/uiux-audit.md` are rated **P1**:

- **`CC-3`** — `Orbitron` is the display face for **every** heading level, `h1` through `h6`. It is a geometric display face strongly associated with generic tech and gaming templates, its legibility degrades below roughly 20px, and it is currently doing UI-label work at 24/20/18px. This directly undercuts the "professional, technology-focused, not gaming" goal stated in `docs/ui-ux/color-palette.md`.
- **`CC-2`** — the type scale tops out at 64px with `h1` clamped to 48px, every heading shares `line-height: 1.2`, and `--tracking-hero` applies **positive** `0.04em` letter-spacing to the largest text. Positive tracking on display type is backwards; large type needs negative tracking to hold together.

`docs/ui-ux/typography.md` (v1.0.0, **Approved**) mandates the current fonts and the fixed-pixel scale. `AGENTS.md` requires an ADR to supersede an approved document.

The related colour question (audit conflict `C-1`) was resolved separately in favour of **retaining** the existing blue palette, so `docs/ui-ux/color-palette.md` is unaffected by this ADR.

---

# Decision

## 1. Font stack

| Role | From | To | Weights |
|---|---|---|---|
| Display | Orbitron | **Space Grotesk** | 600, 700 |
| Body | Inter | **Inter** (unchanged) | 400, 500, 600 |
| Monospace | Fira Code | **JetBrains Mono** | 400, 500 |

Space Grotesk is geometric with genuine character and tight apertures, holds up at display sizes, and remains legible at 20px — so it can serve `h1`–`h3` without the legibility penalty Orbitron incurs. JetBrains Mono has clearer numerals and better small-size rendering than Fira Code.

`h4` and `h5` move to the **body** family. A display face should not set UI labels.

Both replacements are available through `next/font/google` and follow the existing `display: "swap"` pattern in `src/app/layout.tsx`. **No new runtime dependency is added and no font is self-hosted.**

Weight discipline: display is 600/700 only; body is 400/500/600 only. No 300, 800, or 900.

## 2. Fluid type scale

Fixed pixel sizes are replaced by `clamp()`-based fluid tokens. Line height decreases as size increases (0.92 at display, 1.65 at body) instead of a single `1.2` for all headings. Letter-spacing becomes **negative** at display and `h1`–`h3` tiers.

The full table is defined in `docs/design/design-system.md` §3.2 and is not duplicated here.

## 3. New tokens

- `--size-display` replaces `--size-hero`, fluid to `8.5rem`.
- `--size-lead` for section lead paragraphs.
- `--size-overline` — small uppercase monospace, used as a section eyebrow. This is the primary carrier of technical identity in the new system and costs almost no visual weight.
- `--measure-prose` / `--measure-lead` / `--measure-narrow` replace ad-hoc `max-w-xl` / `max-w-2xl` / `max-w-3xl` usage.

---

# Consequences

## Positive

- Removes the strongest "generic template" signal in the interface.
- Establishes real typographic hierarchy; headings differ by scale, weight, family, and tracking rather than a few pixels.
- Fluid scale removes the fixed-size breakpoint tuning currently baked into components.
- Named measure tokens end arbitrary prose widths (audit `PD-4`).
- No dependency change; `next/font` continues to self-host and preload, so no CLS or privacy regression.

## Negative

- Every heading's metrics change at once; layouts tuned to Orbitron's width need re-verification.
- Three Google Font families are still loaded, unchanged from today — but the weight count must be watched to avoid payload growth.
- `docs/ui-ux/typography.md` must be marked `Superseded`, and the `Source of truth:` comments in `src/styles/variables.css` and `globals.css` re-pointed.

Done on Phase 6 close (2026-09-01): `docs/ui-ux/typography.md` is Superseded; CSS comments already point at `docs/design/design-system.md` and ADR-011.

---

# Alternatives Considered

## Keep Orbitron, fix only the scale

Rejected by the owner. It would resolve `CC-2` but leave `CC-3` — the strongest generic-template signal — untouched, and Orbitron would still be setting 18px labels.

## Display-only swap, keep Fira Code

Rejected by the owner. Fira Code's numerals and small-size rendering are the weaker part of the current stack, and the monospace face is load-bearing in the new system because `--size-overline` and metric values both use it.

## A variable display font with a wider weight axis

Rejected: unnecessary payload for a system that deliberately uses only two display weights.

## Self-hosted or licensed commercial display face

Rejected: adds cost and build complexity for a portfolio, and `next/font/google` already self-hosts and preloads at build time.
