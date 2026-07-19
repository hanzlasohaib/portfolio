# ADR-008: Feature-Local Business Logic

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

# Context

The application will continue growing with additional features such as:

- Projects
- Journey
- Contact Management
- Dashboard
- Authentication
- Blog (Future)
- Analytics (Future)
- Newsletter (Future)

A traditional layered folder structure places all services, repositories, and schemas into global directories.

Example

```text
services/
repositories/
schemas/
```

As the application grows, these directories become crowded and difficult to navigate.

---

# Decision

The project adopts a Feature-Oriented Architecture.

Each business feature owns its own:

- Components
- Service (`service.ts`)
- Repository (`repository.ts`)
- Schemas
- Types
- Hooks
- Constants

Shared infrastructure remains under the `lib/` directory.

There are **no** global `src/services/` or `src/repositories/` directories.

Canonical source layout:

```text
src/
├── app/
├── components/
├── constants/
├── features/
├── hooks/
├── lib/
├── providers/
├── styles/
├── types/
└── config/
```

`app/` contains **only** routing concerns (including intentional route groups `(public)`, `(auth)`, `(dashboard)`). Business logic never belongs inside `app/`.

---

# Example

```text
features/
└── contact/
    ├── components/
    ├── schemas/
    ├── service.ts
    ├── repository.ts
    ├── hooks/
    ├── types.ts
    ├── constants.ts
    └── index.ts
```

Do not nest features under artificial domain folders (for example `features/communication/contact/`) unless a future ADR explicitly requires it.

---

# Benefits

- High cohesion
- Low coupling
- Easier navigation
- Independent feature evolution
- Simpler testing
- Better onboarding for contributors
- Clear ownership boundaries

---

# Consequences

## Advantages

- Easier maintenance
- Scalable architecture
- Reduced merge conflicts
- Improved modularity
- Better separation of concerns

## Trade-offs

- Slight duplication of small utility files across features
- Developers must understand feature boundaries

The advantages outweigh the trade-offs for this application.

---

# Alternatives Considered

## Global Layered Architecture

```text
services/
repositories/
schemas/
components/
```

Rejected because:

- Poor scalability
- Reduced feature cohesion
- Difficult navigation
- Large shared directories

## Domain-Driven Design (DDD)

Considered but rejected.

The project size does not justify the additional complexity of aggregates, bounded contexts, factories, and domain events.

---

# Related Documents

- `docs/architecture/folder-structure.md`
- `docs/architecture/dependency-graph.md`
- ADR-001 Next.js App Router
- ADR-002 Prisma ORM
- ADR-003 Supabase PostgreSQL
- ADR-004 JWT Authentication
- ADR-005 Feature-Based Architecture
- ADR-006 Next.js Route Handlers
- ADR-007 Tailwind CSS

---

# Decision Summary

The project organizes business logic around self-contained feature modules while keeping shared infrastructure under `lib/`.

---

# Status

**Status:** Approved
