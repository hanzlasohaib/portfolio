# System Architecture

> **Document Version:** 1.0
>
> **Status:** Draft
>
> **Last Updated:** July 2026

---

# 1. Overview

The Portfolio application is designed as a **production-ready, scalable, and maintainable full-stack web application** built using **Next.js App Router**.

Rather than separating the frontend and backend into multiple repositories, the application follows a **single codebase architecture**, where both the client-facing application and backend APIs coexist in the same project.

This architecture minimizes deployment complexity, improves developer experience, enables code sharing, and supports future scalability.

---

# 2. Architecture Goals

The system is designed to achieve the following goals:

- Production-ready architecture
- High maintainability
- Excellent developer experience
- Scalability for future features
- Strong separation of concerns
- Shared TypeScript types
- Shared validation logic
- SEO optimization
- Security by design
- Modular feature development

---

# 3. High-Level Architecture

```text
                        +----------------------+
                        |      Visitor         |
                        +----------+-----------+
                                   |
                                   |
                                   ▼
                        +----------------------+
                        |      Next.js         |
                        |     App Router       |
                        +----------+-----------+
                                   |
            ┌──────────────────────┴──────────────────────┐
            │                                             │
            ▼                                             ▼
+-----------------------------+              +-----------------------------+
|      React UI Layer         |              |     Route Handlers / APIs   |
|                             |              |      Server Actions          |
+-------------+---------------+              +-------------+---------------+
              |                                              |
              └────────────────────┬─────────────────────────┘
                                   ▼
                       Business Logic / Services
                                   │
                                   ▼
                        Repository / Data Layer
                                   │
                                   ▼
                              Prisma ORM
                                   │
                                   ▼
                       Supabase PostgreSQL Database
```

---

# 4. Architectural Style

The application follows a **Layered Architecture** combined with **Feature-Oriented Organization**.

Every layer has a single responsibility.

```text
Presentation Layer

↓

Application Layer

↓

Business Layer

↓

Data Access Layer

↓

Database Layer
```

---

# 5. Layer Responsibilities

## 5.1 Presentation Layer

Responsible for everything related to the user interface.

Responsibilities:

- Pages
- Layouts
- Components
- Navigation
- Theme
- Forms
- User interactions
- Client-side state

Technologies:

- Next.js
- React
- Tailwind CSS
- TypeScript

This layer never communicates directly with the database.

---

## 5.2 Application Layer

Responsible for coordinating requests.

Responsibilities:

- Route Handlers
- Server Actions
- Request Validation
- Authorization
- Response Formatting

Business rules should remain minimal in this layer.

---

## 5.3 Business Layer

Contains the application's business logic.

Examples:

- Submit Contact Form
- Publish Blog
- Create Portfolio Item
- Update Skills
- Authenticate User

Business logic should remain independent from framework-specific code whenever possible.

---

## 5.4 Data Access Layer

Responsible for database interaction.

Responsibilities:

- Repository Pattern
- Database Queries
- Transactions
- Data Mapping

Uses:

- Prisma ORM

No business logic belongs in this layer.

---

## 5.5 Database Layer

Persistent storage.

Technology:

- Supabase PostgreSQL

Responsibilities:

- Data persistence
- Constraints
- Relationships
- Indexes
- Integrity

---

# 6. Rendering Strategy

The application uses a hybrid rendering model.

| Page | Rendering Strategy | Reason |
|------|--------------------|--------|
| Home | Static Site Generation (SSG) | Best performance and SEO |
| About | SSG | Rarely changes |
| Skills | SSG | Static content |
| Experience | SSG | Static content |
| Portfolio | SSG initially, ISR later | Future updates |
| Projects | SSG initially, ISR later | SEO + updates |
| Blog | Incremental Static Regeneration (ISR) | Frequently updated |
| Journey | ISR | Occasionally updated |
| Contact | Client + Server | Form submission |
| Login | Dynamic Rendering | Authentication |
| Dashboard | Server-Side Rendering (SSR) | Protected content |

---

# 7. Request Flow

## Public Page Request

```text
Visitor

↓

Browser

↓

Next.js Route

↓

Server Component

↓

Rendered HTML

↓

Browser
```

---

## API Request

```text
Browser

↓

Route Handler

↓

Validation

↓

Authorization (if required)

↓

Business Service

↓

Repository

↓

Prisma

↓

Supabase PostgreSQL

↓

JSON Response
```

---

## Contact Form Flow

```text
Visitor

↓

Contact Form

↓

Client Validation

↓

POST /api/contact

↓

Server Validation

↓

Contact Service

↓

Repository

↓

Prisma

↓

Supabase

↓

Success Response
```

---

## Admin Request Flow

```text
Admin

↓

Login

↓

JWT Verification

↓

RBAC Authorization

↓

Protected Route

↓

Business Service

↓

Repository

↓

Database

↓

Response
```

---

# 8. Module Boundaries

The application is organized around independent feature modules.

Core modules include:

- Portfolio
- Projects
- Blog
- Journey
- Contact
- Authentication
- Dashboard
- Shared Configuration
- Shared UI
- SEO

Each module owns:

- UI
- Validation
- Business Logic
- API
- Data Access

Modules communicate through well-defined interfaces rather than accessing each other's internal implementation.

---

# 9. External Services

| Service | Purpose |
|----------|---------|
| Next.js | Full-stack framework |
| Prisma | ORM |
| Supabase | PostgreSQL Database |
| GitHub | Version Control |
| Vercel | Deployment |
| Resend | Email Notifications (Future) |
| Google reCAPTCHA v3 | Bot Protection (Future) |

---

# 10. Security Boundaries

## Public Access

Visitors can:

- Browse Portfolio
- View Projects
- Read Blog
- View Journey
- Download Resume
- Submit Contact Form

Authentication is not required.

---

## Protected Access

Administrators can:

- Login
- Access Dashboard
- Manage Content
- View Contact Messages
- Manage Portfolio
- Manage Blog
- Manage Journey
- Manage Settings

Protected routes require successful authentication and authorization.

---

# 11. Scalability Considerations

The architecture is designed to support future enhancements without significant restructuring.

Future capabilities include:

- Content Management System (CMS)
- Multi-Admin Support
- Analytics Dashboard
- Visitor Insights
- Newsletter
- Blog Management
- Portfolio Categories
- Mobile Application
- REST APIs
- Third-party Integrations

---

# 12. Key Architectural Principles

The project follows these engineering principles:

- Single Codebase Architecture
- Separation of Concerns
- Feature-Oriented Organization
- Shared TypeScript Types
- Shared Validation
- Thin Route Handlers
- Service Layer Pattern
- Repository Pattern
- Reusable Components
- Configuration over Duplication
- Security by Design
- Performance by Default

---

# 13. Technology Stack

| Layer | Technology |
|--------|------------|
| Framework | Next.js (App Router) |
| Frontend | React |
| Language | TypeScript |
| Styling | Tailwind CSS |
| ORM | Prisma |
| Database | Supabase PostgreSQL |
| Authentication | JWT |
| Authorization | RBAC |
| Deployment | Vercel |
| Version Control | Git & GitHub |

---

# 14. Architecture Decision Summary

| Decision | Selected Option |
|-----------|-----------------|
| Repository Strategy | Monolithic Single Codebase |
| Framework | Next.js App Router |
| Language | TypeScript |
| Styling | Tailwind CSS |
| Rendering | Hybrid (SSG + ISR + SSR) |
| ORM | Prisma |
| Database | Supabase PostgreSQL |
| Authentication | JWT |
| Authorization | RBAC |
| Deployment | Vercel |
| Architecture Style | Layered + Feature-Oriented |

---

# 15. Design Principles

The architecture is designed to satisfy the following engineering qualities:

- Maintainability
- Scalability
- Readability
- Testability
- Extensibility
- Performance
- Security
- Reusability

Every future implementation should align with these principles to ensure long-term project health and maintain production-quality standards.

---

# Document Status

**Status:** Approved (Draft v1.0)

This document serves as the architectural foundation for the project. All subsequent design artifacts—including frontend architecture, backend architecture, database design, API design, authentication strategy, and folder structure—must align with the decisions documented here.