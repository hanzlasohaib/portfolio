# Folder Structure

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

# Architecture Baseline

This folder structure is the authoritative reference for the application's directory layout.

Any structural change affecting architectural boundaries **must first be reflected in this documentation** and, where applicable, recorded through a new Architecture Decision Record (ADR).

Aligned with:

- `docs/adr/ADR-008-feature-local-business-logic.md`
- `docs/architecture/dependency-graph.md`
- `docs/architecture/routing-strategy.md`

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
├── prisma/               # Prisma schema and migrations (Phase 3+)
├── public/               # Static assets
├── src/                  # Application source code
├── middleware.ts         # Global Next.js middleware (Phase 4+)
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
├── app/                  # Next.js App Router (routing only)
│
├── components/           # Shared reusable UI
│
├── constants/            # Shared constants
│
├── features/             # Business domains / features
│
├── hooks/                # Shared React hooks
│
├── lib/                  # Shared infrastructure
│
├── providers/            # React providers
│
├── styles/               # Global styling
│
├── types/                # Shared TypeScript types
│
└── config/               # Typed configuration
```

**Do not** introduce top-level `core/`, `shared/`, global `services/`, or global `repositories/` directories.

Shared validation helpers that span multiple features may live under `lib/validators/` or feature-local `schemas/`. Feature-specific Zod schemas belong inside the feature.

---

# Architectural Philosophy

Each business feature owns its:

- Components
- Business Logic (`service.ts`)
- Data Access (`repository.ts`)
- Validation (`schemas/`)
- Types
- Hooks
- Constants
- Utilities

Business logic must remain **close to the feature it belongs to**.

Cross-feature infrastructure remains inside **lib/**.

`app/` contains **only** routing concerns. Business logic never belongs inside `app/`.

---

# app/

The `app/` directory contains only Next.js routing concerns:

- Layouts
- Pages
- Route Handlers
- Metadata
- Loading UI
- Error UI

The App Router **must remain thin**.

Route handlers and pages delegate work to feature services.

## Route Groups (Intentional)

Route groups organize layouts and **must not** affect URLs.

```text
src/app/
│
├── layout.tsx                 # Root layout
├── globals.css
│
├── (public)/                  # Public pages
│   ├── layout.tsx
│   ├── page.tsx               # /
│   ├── about/page.tsx
│   ├── projects/
│   │   ├── page.tsx
│   │   └── [slug]/page.tsx
│   ├── journey/page.tsx
│   └── contact/page.tsx
│
├── (auth)/                    # Auth pages (public)
│   ├── layout.tsx
│   └── login/page.tsx         # /login
│
├── (dashboard)/               # Protected admin
│   ├── layout.tsx
│   ├── page.tsx               # /dashboard
│   ├── projects/page.tsx
│   ├── journey/page.tsx
│   ├── messages/page.tsx
│   └── settings/page.tsx
│
└── api/                       # Route Handlers (Phase 3+)
    ├── contact/route.ts
    └── auth/login/route.ts
```

Do **not** remove these route groups. They are required for layout separation.

---

# features/

Each business domain owns its implementation.

V1 feature modules:

```text
features/
├── home/
├── about/
├── projects/
├── journey/
├── contact/
├── authentication/
└── dashboard/
```

## Feature Internal Shape

```text
features/projects/
│
├── components/
├── schemas/
├── service.ts
├── repository.ts
├── types.ts
├── utils.ts
├── hooks/
├── constants/
└── index.ts
```

Use flat `service.ts` and `repository.ts` (not global or nested `services/` / `repositories/` directories at `src/` root).

Feature-local `repository.ts` **may** import Prisma Client. Feature UI components and hooks **must not** import Prisma Client.

Future features (not V1): `blog`, `newsletter`, etc.

---

# components/

Contains only reusable UI components.

Examples:

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
JourneyTimeline
```

Components must remain presentation-focused.

Business logic belongs inside features.

---

# lib/

Contains shared infrastructure used across multiple features.

```text
lib/
├── auth/
├── cache/
├── email/
├── logger/
├── prisma/
├── request-id/
├── seo/
├── utils/
└── validators/
```

No feature-specific business logic belongs here.

---

# Global Services & Repositories

Global `services/` and `repositories/` directories are intentionally **avoided**.

Business services and repositories remain **feature-local**.

This follows **ADR-008 Feature Local Business Logic**.

---

# constants/

```text
personal.ts
navigation.ts
social-links.ts
seo.ts
routes.ts
site.ts
```

Personal information (name, email, resume, LinkedIn, GitHub, site URL) must exist only once.

---

# config/

```text
env.ts
site.ts
theme.ts
metadata.ts
```

---

# providers/

```text
ThemeProvider
ToastProvider
```

Providers should remain lightweight. Do not add `SessionProvider` unless a library requiring it is adopted.

---

# hooks/

Shared hooks only (for example `useTheme`, `useMediaQuery`, `useDebounce`).

Feature-specific hooks belong inside their feature.

---

# types/

Shared application-wide TypeScript types.

Feature-specific types remain inside each feature.

---

# styles/

```text
globals.css
animations.css
variables.css
```

---

# Public Assets

```text
public/
├── images/
├── icons/
├── fonts/
├── resume/
└── favicons/
```

---

# Dependency Rules

Allowed dependency flow:

```text
app/
  → features/* (pages/layouts call feature modules)
  → components/
  → providers/
  → constants/
  → config/
  → types/
  → lib/

features/*/service.ts
  → features/*/repository.ts
  → features/*/schemas/
  → lib/
  → config/
  → types/
  → constants/

features/*/repository.ts
  → lib/prisma
  → types/

components/
  → hooks/
  → constants/
  → types/
```

Forbidden:

- Features importing UI internals from other features
- Components importing Prisma or repositories
- Route handlers / pages containing business logic
- Global `src/services/` or `src/repositories/`
- Circular dependencies
- `core/` or `shared/` top-level directories

See `docs/architecture/dependency-graph.md`.

---

# Future Growth

Planned without restructuring:

- Blog feature module
- Newsletter
- Analytics
- Media library
- Redis-backed cache
- Multi-role authorization

---

# Related Documents

- `docs/adr/ADR-008-feature-local-business-logic.md`
- `docs/architecture/dependency-graph.md`
- `docs/architecture/routing-strategy.md`
- `docs/project-design/project-scope.md`

---

# Status

**Status:** Approved
