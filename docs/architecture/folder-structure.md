# Folder Structure

> Version: 1.0

---

# Design Principles

The project follows a **Feature-Oriented Modular Architecture**.

Goals:

- High cohesion
- Low coupling
- Clear ownership
- Easy scalability
- Predictable organization

---

# Root Structure

```text
portfolio/
│
├── docs/
├── prisma/
├── public/
├── src/
├── middleware.ts
├── package.json
├── tsconfig.json
└── ...
```

---

# Source Structure

```text
src
│
├── app/                 # Next.js App Router
│
├── features/            # Business features
│
├── components/          # Shared UI
│
├── lib/                 # Shared libraries
│
├── services/            # Business services
│
├── repositories/        # Data access
│
├── validation/          # Shared Zod schemas
│
├── types/
│
├── constants/
│
├── config/
│
├── hooks/
│
├── providers/
│
├── styles/
│
└── middleware/
```

---

# app/

Contains:

- layouts
- pages
- route handlers
- loading
- error
- metadata

Business logic does not belong here.

---

# features/

Each feature owns:

```text
contact/

blog/

portfolio/

projects/

journey/

dashboard/

authentication/
```

Inside each feature

```text
components/

services/

repositories/

schemas/

types/

utils/
```

---

# components/

Only reusable UI.

Examples

Button

Modal

Card

Badge

Input

Textarea

Navbar

Footer

ThemeToggle

---

# lib/

Shared libraries.

Examples

Prisma Client

JWT

Logger

Request ID

Email

Date Helpers

---

# services/

Cross-feature business services.

Examples

AuthService

EmailService

SEOService

---

# repositories/

Database access.

Prisma repositories.

No business logic.

---

# validation/

Reusable Zod schemas.

---

# constants/

Single Source of Truth

Examples

```text
personal.ts

navigation.ts

social-links.ts

seo.ts

routes.ts
```

Your personal information belongs here.

---

# config/

Application configuration.

Environment

Theme

Site

Metadata

---

# providers/

React Providers

Theme

Toast

Query

---

# hooks/

Reusable React Hooks.

---

# styles/

Global styling.

Tailwind

Variables

Animations

---

# Public Assets

```text
public/

images/

icons/

resume/

fonts/
```

---

# Future Growth

Supports

CMS

Newsletter

Analytics

Media

Search

Multi-role Dashboard

---

# Folder Design Principles

- Feature first
- Shared infrastructure
- Thin route handlers
- Shared validation
- Service layer
- Repository pattern
- Clear ownership

---

# Status

Approved (Draft v1.0)