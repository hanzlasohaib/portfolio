# Typography

> Version: 1.0.0
>
> Status: **Superseded**
>
> Last Updated: 2026-09-01
>
> Owner: Project Team
>
> Category: UI-UX
>
> Superseded by: ADR-011 and `docs/design/design-system.md` §3 (Space Grotesk + JetBrains Mono + Inter, fluid scale).

---

**This document is historical.** It mandated Orbitron and Fira Code. Do not implement from it.

---

# Philosophy

Typography should communicate professionalism and readability.

Hierarchy should be obvious without relying on color.

---

# Font Stack

## Display

Orbitron

Used only for:

- Hero Heading
- Logo
- Major Section Titles

---

## Body

Inter

Used for:

- Paragraphs
- Navigation
- Cards
- Forms
- Buttons

---

## Monospace

Fira Code

Used for:

- Code snippets
- Tech Stack
- Terminal UI
- Inline code

---

# Font Sizes

| Style | Size | Weight |
|--------|------|--------|
| Hero | 64px | 700 |
| H1 | 48px | 700 |
| H2 | 36px | 700 |
| H3 | 30px | 600 |
| H4 | 24px | 600 |
| H5 | 20px | 600 |
| H6 | 18px | 600 |
| Body Large | 18px | 400 |
| Body | 16px | 400 |
| Small | 14px | 400 |
| Caption | 12px | 400 |

---

# Line Height

Heading

1.2

Body

1.6

Caption

1.4

---

# Letter Spacing

Hero

0.04em

Headings

0.02em

Body

Normal

---

# Font Weight

Regular

400

Medium

500

Semi Bold

600

Bold

700

---

# Responsive Rules

Desktop

Hero

64px

Tablet

48px

Mobile

36px

Never use fixed pixel sizes inside components.

Use Tailwind typography utilities.

---

# Usage Rules

Do not use more than three font families.

Avoid uppercase paragraphs.

Keep body text left aligned.

Maintain consistent heading hierarchy.

Do not skip heading levels.