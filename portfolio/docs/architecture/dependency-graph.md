# Dependency Graph

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

This document defines the allowed dependencies between architectural layers.

Aligned with:

- `docs/architecture/folder-structure.md`
- `docs/adr/ADR-008-feature-local-business-logic.md`

---

# High-Level Dependency Flow

```text
app/ (routing only)
        │
        ▼
features/* (UI composition + service + repository)
        │
        ▼
lib/ (shared infrastructure)
        │
        ▼
Prisma ORM
        │
        ▼
Supabase PostgreSQL
```

Dependencies must always flow downward.

Lower layers must never depend on higher layers.

There are **no** global `src/services/` or `src/repositories/` directories. Services and repositories are **feature-local**.

---

# Allowed Dependencies

## app/

Can import

- `features/*` (public API / `index.ts`)
- `components`
- `providers`
- `lib`
- `config`
- `constants`
- `types`

Cannot import

- Prisma Client directly
- `features/*/repository.ts` directly (prefer feature service or feature public API)

`app/` must remain thin. No business logic in pages or route handlers.

---

## features/

### Feature UI / hooks / components

Can import

- `components` (shared UI)
- sibling feature public APIs only when necessary (prefer avoid)
- `lib` (non-Prisma utilities)
- `constants`
- `config`
- `types`
- feature-local `schemas`, `types`, `hooks`, `constants`

Cannot import

- Prisma Client
- Another feature's `repository.ts` or internal files

### Feature `service.ts`

Can import

- Feature-local `repository.ts`
- Feature-local `schemas/`
- `lib`
- `config`
- `types`
- `constants`

Cannot import

- React
- UI components
- Next.js pages / route handlers

### Feature `repository.ts`

Can import

- `lib/prisma` (Prisma Client)
- Database / shared types

Cannot import

- React
- UI components
- Feature services
- Route handlers

Repositories contain data access logic only.

---

## components/

Can import

- `hooks`
- `constants`
- `types`

Cannot import

- Feature repositories
- Prisma
- Feature services

---

## lib/

Contains shared infrastructure:

- prisma
- jwt
- logger
- request-id
- email
- env helpers
- validators (shared only)

Must not depend on feature modules.

---

## config / constants / types / providers / hooks

May be imported by higher layers.

Must remain free of feature business logic and Prisma access (except typed config that reads env).

---

# Dependency Rules

## Rule 1

Route Handlers and Server Actions are coordinators.

They validate, call feature services, and return responses.

No business logic.

## Rule 2

Business logic belongs only in feature `service.ts` files.

## Rule 3

Only feature `repository.ts` files communicate with Prisma.

## Rule 4

Prisma must never be imported into React components.

## Rule 5

Feature services must not import React components.

## Rule 6

Repositories must never import Route Handlers or Server Actions.

## Rule 7

Validation schemas should be reusable by both frontend and backend (feature `schemas/` or shared `lib/validators/`).

## Rule 8

Do not create top-level `core/`, `shared/`, `services/`, or `repositories/` directories.

---

# Dependency Diagram

```text
app
 │
 ▼
features/*/ (components, pages compose these)
 │
 ▼
features/*/service.ts
 │
 ▼
features/*/repository.ts
 │
 ▼
lib/prisma
 │
 ▼
database
```

No reverse dependencies are allowed.

---

# Cross-Cutting Modules

Shared across layers when free of business logic:

- config
- constants
- types
- lib/logger
- lib/request-id
- lib/env
- lib/validators

---

# Benefits

- Easier testing
- Reduced coupling
- Better maintainability
- Clear ownership
- Scalable architecture
- Safer refactoring

---

# Status

**Status:** Approved
