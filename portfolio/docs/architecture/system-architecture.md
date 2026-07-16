# System Architecture

> Version: 1.0.0
>
> Status: Approved (Architecture Baseline v1.0)
>
> Last Updated: 2026-07-16
>
> Owner: Project Team
>
> Category: Architecture

---

# 1. Purpose

This document defines the high-level architecture of the Portfolio application.

It serves as the architectural foundation for the project and establishes the major architectural decisions that every implementation must follow.

All implementation artifacts—including folder structure, feature modules, API routes, database schema, and deployment configuration—are **derived from this approved Architecture Baseline**.

---

# 2. Architecture Goals

The architecture is designed to achieve the following goals:

- Production-ready architecture
- Scalability
- Maintainability
- Feature independence
- Strong separation of concerns
- Type safety
- Security by design
- High performance
- Excellent developer experience
- Future extensibility

---

# 3. High-Level Architecture

```text
                               Visitor
                                  │
                                  ▼
                     Next.js App Router (Presentation)
                                  │
                 ┌────────────────┴────────────────┐
                 │                                 │
                 ▼                                 ▼
        React Server/Client UI          Route Handlers / Server Actions
                 │                                 │
                 └───────────────┬─────────────────┘
                                 ▼
                      Feature Service Layer
                                 │
                                 ▼
                    Feature Repository Layer
                                 │
                                 ▼
                           Prisma ORM
                                 │
                                 ▼
                    Supabase PostgreSQL Database
```

The application follows a **single-codebase architecture**, where frontend and backend coexist in one Next.js application while remaining logically separated.

---

# 4. Architectural Style

The system combines multiple architectural styles:

- Layered Architecture
- Feature-Oriented Architecture
- Repository Pattern
- Service Layer Pattern
- Modular Design
- Domain-Oriented Organization

Every layer has one clear responsibility.

```text
Presentation Layer

↓

Application Layer

↓

Feature Service Layer

↓

Feature Repository Layer

↓

Persistence Layer

↓

Database
```

---

# 5. Layer Responsibilities

## 5.1 Presentation Layer

Responsible for rendering the user interface.

Responsibilities:

- Pages
- Layouts
- Shared Components
- Feature Components
- Navigation
- Theme
- Forms
- User Interactions

Technologies:

- Next.js App Router
- React
- Tailwind CSS
- TypeScript

This layer never communicates directly with the database.

---

## 5.2 Application Layer

Acts as the entry point into backend functionality.

Responsibilities:

- Route Handlers
- Server Actions
- Request Parsing
- Authentication
- Authorization
- Response Formatting

Business logic must remain minimal.

---

## 5.3 Feature Service Layer

Contains business rules.

Examples:

- Submit Contact Form
- Publish Blog
- Update Project
- Authenticate Admin
- Manage Portfolio Content

Feature services coordinate workflows and delegate persistence to repositories.

Business logic should remain independent from HTTP, Prisma, and UI whenever practical.

---

## 5.4 Feature Repository Layer

Responsible only for data access.

Responsibilities:

- CRUD Operations
- Transactions
- Query Optimization
- Database Mapping

Repositories communicate exclusively with Prisma.

No business logic belongs here.

---

## 5.5 Persistence Layer

Technology:

- Prisma ORM

Responsibilities:

- Type-safe Queries
- Relationship Handling
- Transactions
- Database Abstraction

---

## 5.6 Database Layer

Technology:

- Supabase PostgreSQL

Responsibilities:

- Persistent Storage
- Constraints
- Relationships
- Indexes
- Data Integrity

---

# 6. Domain-Oriented Architecture

The project is organized around business domains rather than database tables.

Primary domains:

```text
Portfolio

Content

Communication

Administration
```

Each domain owns its own:

- Components
- Schemas
- Services
- Repositories
- Types
- Utilities

This keeps related functionality cohesive and reduces coupling between features.

---

# 7. Rendering Strategy

The application follows a hybrid rendering model.

| Page | Rendering Strategy | Reason |
|------|--------------------|--------|
| Home | SSG | Performance + SEO |
| About | SSG | Static Content |
| Skills | SSG | Static Content |
| Experience | SSG | Static Content |
| Portfolio | SSG → ISR | Future Content Updates |
| Projects | SSG → ISR | SEO |
| Blog | ISR | Frequently Updated |
| Journey | ISR | Occasionally Updated |
| Contact | Client + Server | Interactive Form |
| Login | Dynamic | Authentication |
| Dashboard | SSR | Protected Content |

---

# 8. Request Flow

## Public Page

```text
Visitor
    │
    ▼
Next.js Route
    │
    ▼
Server Component
    │
    ▼
Rendered HTML
    │
    ▼
Browser
```

---

## API Request

```text
Browser
    │
    ▼
Route Handler
    │
    ▼
Validation
    │
    ▼
Authentication (if required)
    │
    ▼
Authorization (if required)
    │
    ▼
Feature Service
    │
    ▼
Feature Repository
    │
    ▼
Prisma
    │
    ▼
Supabase PostgreSQL
    │
    ▼
ApiResponse<T>
```

---

## Contact Form Flow

```text
Visitor
    │
    ▼
Contact Form
    │
    ▼
Client Validation
    │
    ▼
Server Action / POST /api/contact
    │
    ▼
Server Validation
    │
    ▼
Contact Service
    │
    ▼
Contact Repository
    │
    ▼
Prisma
    │
    ▼
Supabase PostgreSQL
    │
    ▼
ApiResponse<T>
    │
    ▼
Toast Notification
```

---

## Admin Request Flow

```text
Admin
    │
    ▼
Login
    │
    ▼
JWT Verification
    │
    ▼
RBAC Authorization
    │
    ▼
Feature Service
    │
    ▼
Repository
    │
    ▼
Database
    │
    ▼
Response
```

---

# 9. Module Boundaries

The application is divided into independent feature modules.

Core modules include:

- Portfolio
- Projects
- Blog
- Journey
- Contact
- Authentication
- Dashboard

Every feature owns:

- UI
- Validation
- Business Logic
- Repository
- Types
- Utilities

Shared infrastructure remains outside feature modules.

---

# 10. Shared Infrastructure

Cross-cutting concerns live inside `lib/`.

Examples:

- Prisma Client
- Logger
- Request ID
- Authentication Utilities
- Email Utilities
- Date Utilities
- Environment Utilities
- Cache Provider
- Error Helpers

These modules must remain framework-agnostic whenever practical.

---

# 11. External Services

| Service | Purpose |
|----------|---------|
| Next.js | Full-stack Framework |
| Prisma | ORM |
| Supabase | PostgreSQL Database |
| GitHub | Version Control |
| Vercel | Deployment |
| Resend | Email Delivery (Future) |
| Google reCAPTCHA v3 | Spam Protection (Future) |

---

# 12. Security Boundaries

## Public Access

Visitors may:

- Browse Portfolio
- View Projects
- Read Blog
- View Journey
- Download Resume
- Submit Contact Form

Authentication is not required.

---

## Protected Access

Administrators may:

- Login
- Access Dashboard
- Manage Portfolio
- Manage Blog
- Manage Journey
- View Contact Messages
- Update Settings

Protected functionality requires:

- JWT Authentication
- RBAC Authorization

---

# 13. Scalability Strategy

The architecture supports future expansion without restructuring.

Potential additions:

- CMS Integration
- Newsletter
- Analytics Dashboard
- Visitor Insights
- Search
- Media Library
- Multi-Administrator Support
- Public REST API
- Mobile Application

---

# 14. Caching Strategy

Version 1 intentionally relies on Next.js built-in caching.

Preferred mechanisms:

- `unstable_cache()`
- `revalidateTag()`
- `revalidatePath()`

Business services depend only on a cache abstraction.

A distributed cache (Redis) may be introduced later without changing business logic or repositories.

---

# 15. Architectural Constraints

The following rules are mandatory.

- Route Handlers must not contain business logic.
- Server Actions must remain thin coordinators.
- Business logic belongs in feature services.
- Feature services access data only through repositories.
- Repositories are the only layer permitted to communicate with Prisma.
- UI components must never import Prisma or repositories.
- Shared infrastructure belongs inside `lib/`.
- Features communicate through public interfaces rather than internal implementation details.
- Validation schemas should be reusable across frontend and backend whenever practical.
- Cross-feature dependencies should be minimized.

Any violation of these constraints requires an Architecture Decision Record (ADR).

---

# 16. Technology Stack

| Layer | Technology |
|--------|------------|
| Framework | Next.js App Router |
| Frontend | React |
| Language | TypeScript |
| Styling | Tailwind CSS |
| UI Components | shadcn/ui |
| Notifications | Sonner |
| Forms | React Hook Form |
| Validation | Zod |
| ORM | Prisma |
| Database | Supabase PostgreSQL |
| Authentication | JWT |
| Authorization | RBAC |
| Deployment | Vercel |

---

# 17. Architecture Decision Summary

| Decision | Selected Option |
|-----------|-----------------|
| Repository Strategy | Single Codebase |
| Architecture Style | Layered + Feature-Oriented |
| Domain Organization | Business Domains |
| Business Logic | Feature Services |
| Data Access | Feature Repositories |
| Rendering | Hybrid (SSG + ISR + SSR) |
| Validation | Zod |
| ORM | Prisma |
| Database | Supabase PostgreSQL |
| Authentication | JWT |
| Authorization | RBAC |
| Deployment | Vercel |

---

# 18. Engineering Principles

The architecture follows these engineering principles:

- Separation of Concerns
- Single Responsibility Principle
- High Cohesion
- Low Coupling
- Feature-Oriented Organization
- Domain-Driven Thinking
- Reusable Components
- Shared Validation
- Thin Route Handlers
- Type Safety
- Security by Design
- Performance by Default
- Configuration over Duplication

---

# Document Status

**Status:** Approved (Architecture Baseline v1.0)

This document serves as the authoritative architectural foundation of the project.

All implementation artifacts—including the application folder structure, feature organization, database schema, API routes, component hierarchy, deployment configuration, and future architectural decisions—**must be derived from and remain consistent with this approved v1.0 Architecture Baseline**.

Future architectural changes that affect these decisions should be documented through a new Architecture Decision Record (ADR) before implementation.