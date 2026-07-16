# Folder Structure

> Version: 1.0.0
>
> Status: Approved
>
> Last Updated: 2026-07-16
>
> Owner: Project Team
>
> Category: Architecture
>
> **Architecture Baseline:** Frozen (v1.0)

---

# Architecture Baseline

This folder structure is **derived from the approved v1.0 Architecture Baseline** documented under the `docs/` directory.

The architecture defines the implementation—not the other way around.

All implementation decisions must conform to the approved architecture, including:

- Functional Requirements
- Non-Functional Requirements
- System Architecture
- Frontend Architecture
- Backend Architecture
- Domain Model
- Dependency Graph
- Component Architecture
- Routing Strategy
- Authentication & Authorization
- Database Design
- Security Architecture

Any structural change affecting architectural boundaries **must first be reflected in the appropriate documentation** and, where applicable, recorded through a new **Architecture Decision Record (ADR)** before implementation.

---

# Design Principles

The project follows a **Feature-Oriented Modular Architecture**.

## Goals

- High Cohesion
- Low Coupling
- Clear Ownership
- Separation of Concerns
- Predictable Organization
- Scalability
- Maintainability
- Testability
- Reusability

---

# Root Structure

```text
portfolio/
│
├── docs/                 # Architecture & project documentation
├── prisma/               # Prisma schema and migrations
├── public/               # Static assets
├── src/                  # Application source code
├── middleware.ts         # Global Next.js middleware
├── next.config.ts
├── package.json
├── tsconfig.json
├── .env.example
└── ...
```

---

# Source Structure

```text
src/
│
├── app/                  # Next.js App Router
│
├── features/             # Business domains/features
│
├── components/           # Shared reusable UI
│
├── lib/                  # Shared infrastructure
│
├── validation/           # Shared validation schemas
│
├── constants/            # Single Source of Truth
│
├── config/               # Typed configuration
│
├── hooks/                # Shared React hooks
│
├── providers/            # React providers
│
├── types/                # Shared TypeScript types
│
├── styles/               # Global styling
│
└── middleware/           # Custom middleware utilities
```

---

# Architectural Philosophy

The project adopts a **Feature-First Architecture**.

Each business feature owns its:

- Components
- Business Logic
- Validation
- Types
- Repository
- Service
- Utilities

Business logic should remain **close to the feature it belongs to**.

Cross-feature infrastructure remains inside **lib/**.

This approach minimizes coupling while maximizing cohesion.

---

# app/

The `app/` directory contains only Next.js routing concerns.

Examples:

- Layouts
- Pages
- Route Handlers
- Metadata
- Loading UI
- Error UI
- Server Components

The App Router **must remain thin**.

Business logic must never live inside route handlers or page components.

Instead, route handlers delegate work to feature services.

---

# features/

Each business domain owns its implementation.

Example:

```text
features/

contact/
│
├── components/
├── schemas/
├── service.ts
├── repository.ts
├── types.ts
├── utils.ts
└── index.ts

blog/
│
├── components/
├── schemas/
├── service.ts
├── repository.ts
├── types.ts
└── ...

portfolio/
projects/
journey/
authentication/
dashboard/
newsletter/
```

Each feature is independently maintainable.

Features communicate through well-defined interfaces rather than directly accessing each other's internals.

---

# components/

Contains only reusable UI components.

Examples

```text
Button
Card
Badge
Modal
Dialog
Input
Textarea
Avatar
Navbar
Footer
ThemeToggle
Section
Container
```

Components must remain presentation-focused.

Business logic belongs inside features.

---

# lib/

Contains shared infrastructure used across multiple features.

Example

```text
lib/

auth/
cache/
email/
logger/
prisma/
request-id/
seo/
utils/
validators/
```

Examples include

- Prisma Client
- JWT utilities
- Logger
- Request Correlation IDs
- Cache Provider
- Email utilities
- Date helpers

No feature-specific business logic belongs here.

---

# Global Services & Repositories

Global `services/` and `repositories/` directories are intentionally **avoided**.

Business services should remain **feature-local** whenever practical.

Examples:

```text
features/contact/service.ts

features/blog/service.ts

features/authentication/service.ts
```

Global abstractions should only exist when they genuinely span multiple features.

Examples:

- Email Service
- Cache Provider
- Logger
- Search Service
- SEO Service

This follows the architecture defined in **ADR-008 Feature Local Business Logic**.

---

# validation/

Contains reusable validation shared between multiple features.

Examples

```text
email.ts

pagination.ts

common.ts
```

Feature-specific validation belongs inside the respective feature.

---

# constants/

Single Source of Truth.

Examples

```text
personal.ts
navigation.ts
social-links.ts
seo.ts
routes.ts
site.ts
```

Personal information such as:

- Full Name
- Email
- Resume
- LinkedIn
- GitHub
- Portfolio URL

must exist only once.

---

# config/

Contains typed configuration.

Examples

```text
env.ts
site.ts
theme.ts
metadata.ts
```

Configuration should never be scattered across the application.

---

# providers/

Contains React Providers.

Examples

```text
ThemeProvider
ToastProvider
QueryProvider
SessionProvider
```

Providers should remain lightweight.

---

# hooks/

Contains reusable custom React Hooks.

Examples

```text
useTheme()
useMediaQuery()
useDebounce()
useScrollSpy()
```

Feature-specific hooks belong inside their respective feature.

---

# types/

Contains shared application-wide TypeScript types.

Feature-specific types remain inside each feature.

---

# styles/

Contains global styling resources.

Examples

```text
globals.css
animations.css
variables.css
```

---

# Public Assets

```text
public/

images/
icons/
fonts/
resume/
favicons/
```

Static assets only.

No generated files should be committed here.

---

# Dependency Rules

Allowed dependency flow:

```text
app
        ↓
features
        ↓
lib
        ↓
Prisma
        ↓
Supabase PostgreSQL
```

Forbidden:

- Features importing UI from other features
- Repositories importing UI
- Route Handlers containing business logic
- Components directly accessing the database
- Circular dependencies

---

# Folder Design Principles

The folder structure follows these principles:

- Feature First
- Business Logic Colocation
- Shared Infrastructure
- Thin Route Handlers
- Separation of Concerns
- Single Responsibility Principle
- Dependency Inversion
- Repository Pattern
- Service Layer
- Shared Validation
- Predictable Organization
- Clear Ownership

---

# Future Growth

The architecture is intentionally designed to support future expansion without restructuring.

Planned future capabilities include:

- Blog Management
- Journey Timeline
- Newsletter
- Contact Dashboard
- Analytics
- Admin Panel
- Search
- Media Library
- CMS Integration
- Redis-backed Distributed Cache
- Background Jobs
- Multi-role Authorization

---

# Related Documents

- `docs/architecture/system-architecture.md`
- `docs/architecture/frontend-architecture.md`
- `docs/architecture/backend-architecture.md`
- `docs/architecture/domain-model.md`
- `docs/architecture/dependency-graph.md`
- `docs/architecture/routing-strategy.md`
- `docs/architecture/component-architecture.md`
- `docs/architecture/state-management.md`
- `docs/architecture/database-design.md`
- `docs/architecture/security-architecture.md`
- `docs/adr/ADR-008-feature-local-business-logic.md`
- `docs/adr/ADR-009-cache-strategy.md`

---

# Status

**Version:** v1.0

**Architecture Status:** Approved

**Baseline:** Frozen

This document is part of the **v1.0 Architecture Baseline** and serves as the authoritative reference for the application's directory structure.

Implementation should follow this structure unless superseded by a future approved Architecture Decision Record (ADR) or a new architecture baseline.