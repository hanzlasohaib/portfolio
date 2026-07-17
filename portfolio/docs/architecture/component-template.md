# Component Template

> Version: 1.0.0
>
> Status: Approved
>
> Last Updated: 2026-07-17
>
> Owner: Project Team
>
> Category: Architecture

---

# Purpose

This document defines the **single canonical structure** that every reusable shared
component in `src/components/` must follow.

It exists so future developers and AI agents create consistent, predictable components
during the Base Components milestone and beyond.

Related documents:

- `docs/architecture/component-architecture.md` — component layers and categories
- `docs/database/naming-conventions.md` — authoritative naming rules
- `docs/architecture/folder-structure.md` — top-level directory layout
- `src/components/README.md` — components layer overview

---

# Scope

Applies to reusable components in:

```text
src/components/
```

Examples: `Button`, `Card`, `Input`, `Textarea`, `Badge`, `Avatar`, `Spinner`,
`Typography`, `Divider`.

**Not** in scope: feature-specific components in `src/features/*/components/`.
Those are owned by their feature and are not governed by this template.

---

# Folder Structure

One component per folder. The folder name is kebab-case.

```text
components/
└── button/
    ├── button.tsx         # Component implementation
    ├── button.types.ts    # Exported TypeScript types/interfaces
    └── index.ts           # Public barrel export
```

## Optional future files

These are **not required for V1** and are added only when the relevant tooling is adopted:

```text
components/
└── button/
    ├── button.test.tsx    # Unit tests — only when testing is introduced
    └── button.stories.tsx # Storybook docs — only if Storybook is adopted
```

---

# File Responsibilities

| File | Responsibility |
|------|----------------|
| `button.tsx` | Component implementation (presentation only). |
| `button.types.ts` | Exported TypeScript interfaces/types for the component's props. |
| `index.ts` | Public barrel export for the component and its types. |
| `button.test.tsx` | Future unit tests. Added only when testing is introduced. |
| `button.stories.tsx` | Future Storybook documentation. Added only if Storybook is adopted. |

Small components may keep types inline in `*.tsx`; add `*.types.ts` once the props
surface grows enough to benefit from separation.

---

# Rules

- One component per folder.
- Filenames use **kebab-case** (`button.tsx`, `button.types.ts`).
- Component names use **PascalCase** (`Button`).
- Prefer **named exports** over default exports.
- A **barrel export** (`index.ts`) is required for every component.
- No business logic.
- No API calls.
- No Prisma access.
- Reusable and presentation-only.
- Feature-specific UI belongs in `src/features/*/components/` and must not live here.

---

# Barrel Exports

Each component's `index.ts` re-exports its public component and types:

```ts
// components/button/index.ts
export { Button } from "./button";
export type { ButtonProps } from "./button.types";
```

The components root barrel (`src/components/index.ts`) re-exports every shared
component so consumers can import from a single entry point:

```ts
import { Button, Container } from "@/components";
```

---

# Future Components

The following are examples expected during the **Base Components** milestone.
They are listed for planning only and **must not** be implemented as part of this
documentation task:

- `Button`
- `Card`
- `Input`
- `Textarea`
- `Select`
- `Badge`
- `Avatar`
- `Spinner`
- `Divider`
- `Typography`

---

# Status

**Status:** Approved
