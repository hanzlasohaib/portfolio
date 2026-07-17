# Feature Template

> Version: 1.1.0
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

This document defines the standard structure every feature must follow.

Aligned with:

- `docs/architecture/folder-structure.md`
- `docs/adr/ADR-008-feature-local-business-logic.md`
- `docs/architecture/dependency-graph.md`

---

# Feature Goals

Each feature should be:

- Self-contained
- Independent
- Testable
- Easy to maintain

---

# Standard Structure

```text
features/<feature-name>/
├── components/
├── hooks/
├── schemas/
├── service.ts
├── repository.ts
├── types.ts
├── constants/
├── utils.ts
└── index.ts
```

Optional (when needed):

```text
├── actions/              # Server Actions (thin coordinators)
```

Route Handlers live under `app/api/**`, not inside the feature folder. They call `service.ts`.

Do **not** create global `src/services/` or `src/repositories/`.

Do **not** nest features under domain folders (for example `features/communication/contact/`) unless a future ADR requires it.

---

# Responsibilities

## components/

React UI only. No database access. No Prisma.

## hooks/

Feature-specific hooks. No Prisma.

## schemas/

Zod validation schemas. Shared by frontend and backend where possible.

Rules source: `docs/architecture/validation-strategy.md`

## service.ts

Business logic. Coordinates workflows. Calls `repository.ts`. Never imports React UI.

## repository.ts

Data access only. May import Prisma Client via `lib/prisma`.

## types.ts / constants / utils.ts

Feature-local types, constants, and helpers.

## index.ts

Public API of the feature. Pages and other features should import from here when possible.

---

# Example: contact

```text
features/contact/
├── components/
│   └── contact-form.tsx
├── schemas/
│   └── contact-form-schema.ts
├── service.ts
├── repository.ts
├── types.ts
└── index.ts
```

---

# V1 Features

| Feature | Module |
|---------|--------|
| Home | `features/home` |
| About | `features/about` |
| Projects | `features/projects` |
| Journey | `features/journey` |
| Contact | `features/contact` |
| Authentication | `features/authentication` |
| Dashboard | `features/dashboard` |

There is no `features/portfolio` module.

Future: `features/blog`

---

# Forbidden

- Business logic in `app/`
- Prisma in components or hooks
- Global services/repositories directories
- Cross-feature deep imports of repositories

---

# Status

**Status:** Approved
