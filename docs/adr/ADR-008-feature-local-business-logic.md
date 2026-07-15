# ADR-008: Feature-Local Business Logic

Status: Accepted

Date: 2026-07-15

---

# Context

The application will continue growing with additional features such as:

- Blog
- Journey
- Contact Management
- Dashboard
- Authentication
- Analytics
- Newsletter

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
- Services
- Repositories
- Schemas
- Types
- Hooks
- Constants

Shared infrastructure remains under the `lib/` directory.

---

# Example

```text
features/

communication/

contact/

components/

schemas/

services/

repositories/

hooks/

types.ts

constants.ts

index.ts
```

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

Advantages

- Easier maintenance
- Scalable architecture
- Reduced merge conflicts
- Improved modularity
- Better separation of concerns

Trade-offs

- Slight duplication of small utility files across features
- Developers must understand feature boundaries

The advantages outweigh the trade-offs for medium to large applications.

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

---

## Domain-Driven Design (DDD)

Considered but rejected.

Reason

The project size does not justify the additional complexity of aggregates, bounded contexts, factories, and domain events.

The chosen feature-oriented architecture provides sufficient modularity while remaining approachable.

---

# Related ADRs

- ADR-001 Next.js App Router
- ADR-002 Prisma ORM
- ADR-003 Supabase PostgreSQL
- ADR-004 JWT Authentication
- ADR-005 Feature-Based Architecture
- ADR-006 Next.js Route Handlers
- ADR-007 Tailwind CSS

---

# Decision Summary

The project will organize business logic around self-contained feature modules while keeping shared infrastructure under the `lib/` directory.

This architecture balances simplicity, scalability, and maintainability for the expected growth of the portfolio application.

---

Status: Accepted