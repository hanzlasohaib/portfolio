# Backend Architecture

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

# 1. Purpose

The backend is responsible for handling business logic, authentication, authorization, data persistence, validation, and communication with external services.

Although the application uses a single Next.js codebase, the backend architecture is designed with clear logical boundaries to ensure scalability, maintainability, and testability.

---

# 2. Backend Goals

The backend architecture should provide:

- Clean separation of concerns
- Thin API handlers
- Centralized business logic
- Secure authentication & authorization
- Consistent validation
- Database abstraction
- Type-safe data access
- Reusable services
- Easy testing
- Future scalability

---

# 3. Backend Layers

The backend follows a layered architecture.

```text
Client

↓

Route Handler (API)

↓

Validation

↓

Authentication

↓

Authorization (RBAC)

↓

Business logic is colocated with its feature whenever practical.

Example

features/

contact/

service.ts

repository.ts

schemas/

types/

Shared cross-cutting services
(Logger, Email, Auth, Cache)

remain inside lib/.

↓

Prisma ORM

↓

Supabase PostgreSQL
```

Each layer has exactly one responsibility.

---

# 4. Layer Responsibilities

## 4.1 Route Handler Layer

Responsibilities:

- Receive HTTP requests
- Parse request data
- Invoke validation
- Call services
- Return standardized responses

Route handlers should remain thin and contain no business logic.

---

## 4.2 Validation Layer

Responsible for validating all incoming data.

Validation includes:

- Request body
- Route parameters
- Query parameters
- Environment variables

Technology:

- Zod

Validation schemas should be reusable between frontend and backend whenever possible.

---

## 4.3 Authentication Layer

Responsible for verifying user identity.

Responsibilities:

- Login
- Logout
- JWT verification
- Session validation
- Protected route access

Authentication should occur before business logic execution.

---

## 4.4 Authorization Layer

Responsible for permission checking.

Current Role:

- Admin

Future Roles:

- Editor
- Moderator
- Visitor

RBAC should remain extensible without requiring major architectural changes.

---

## 4.5 Service Layer

The service layer contains all business logic.

Examples:

- Create Contact Message
- Update Project
- Create Project
- Create Journey entry
- Authenticate User

Services coordinate workflows and call repositories when data access is required.

Services should never directly depend on HTTP request or response objects.

---

## 4.6 Repository Layer

The repository layer abstracts database operations.

Responsibilities:

- CRUD operations
- Transactions
- Query optimization
- Data mapping

Repositories isolate Prisma-specific code from business logic.

---

## 4.7 Data Access Layer

Responsible for communication with the database.

Technology:

- Prisma ORM

Responsibilities:

- Query execution
- Relationship handling
- Transactions
- Type-safe database operations

Business logic should never communicate directly with Prisma.

---

# 5. API Architecture

The backend exposes RESTful APIs through Next.js Route Handlers.

Principles:

- REST conventions
- Resource-oriented endpoints
- Consistent HTTP methods
- Predictable responses
- Standardized errors

Example:

```text
GET    /api/projects

GET    /api/projects/:slug

POST   /api/contact

POST   /api/auth/login

PUT    /api/projects/:id

DELETE /api/projects/:id
```

---

# 6. Request Lifecycle

```text
HTTP Request

↓

Route Handler

↓

Validation

↓

Authentication (if required)

↓

Authorization (if required)

↓

Business Service

↓

Repository

↓

Prisma

↓

Supabase

↓

Response Formatter

↓

HTTP Response
```

---

# 7. Response Standardization

Every API response should follow a consistent structure.

## Success

```json
{
  "success": true,
  "message": "Operation completed successfully.",
  "data": {}
}
```

---

## Error

```json
{
  "success": false,
  "message": "Validation failed.",
  "errors": []
}
```

This structure should remain consistent across the application.

---

# 8. Error Handling Strategy

The backend should centralize error handling.

Error categories include:

- Validation Errors
- Authentication Errors
- Authorization Errors
- Database Errors
- External Service Errors
- Unexpected Errors

Errors should never expose internal implementation details.

---

# 9. Database Strategy

Database Technology:

- Supabase PostgreSQL

ORM:

- Prisma

Migration Tool:

- Prisma Migrate

Principles:

- Normalize data where appropriate
- Use foreign keys
- Create indexes for frequent queries
- Enforce constraints at the database level

Caching Policy: 

All business services should depend on a cache abstraction rather than a concrete implementation. Version 1 uses Next.js built-in caching. A distributed cache (e.g., Redis) may be introduced later without changing repository or business logic.

---

# 10. Prisma Integration

Prisma is responsible for:

- Schema definition
- Type generation
- Database migrations
- Query building
- Transactions

Business logic should remain independent of Prisma APIs.

---

# 11. Environment Configuration

**This section is the single source of truth for environment variables.**

Configuration must be loaded from environment variables via a typed `config/env.ts` module.

Environment variables must never be hardcoded.

`.env.example` must match this table exactly.

## V1 Required

| Variable | Required | Purpose |
|----------|----------|---------|
| `DATABASE_URL` | Yes | Prisma pooled connection string (Supabase PostgreSQL) |
| `DIRECT_URL` | Yes | Prisma direct connection string for migrations |
| `JWT_SECRET` | Yes | Signing secret for admin JWT cookies |
| `NEXT_PUBLIC_SITE_URL` | Yes | Canonical site URL (SEO, absolute links) |
| `NODE_ENV` | Yes | Runtime environment (`development` / `production` / `test`) |

## Post-V1 optional (abuse protection — ADR-010)

Enabled when each set is complete. Incomplete sets are skipped (local/dev convenience).

| Variable | Required | Purpose |
|----------|----------|---------|
| `UPSTASH_REDIS_REST_URL` | Optional set | Upstash Redis REST URL (rate limiting) |
| `UPSTASH_REDIS_REST_TOKEN` | Optional set | Upstash Redis REST token |
| `NEXT_PUBLIC_RECAPTCHA_SITE_KEY` | Optional set | Google reCAPTCHA v3 site key |
| `RECAPTCHA_SECRET_KEY` | Optional set | Google reCAPTCHA v3 secret key |
| `RESEND_API_KEY` | Optional set | Resend API key (MFA OTP email) |
| `RESEND_FROM_EMAIL` | Optional set | Verified Resend from address |
| `MFA_NOTIFY_EMAIL` | Optional set | Inbox that receives MFA codes |

## Deferred

| Variable | Required | Purpose |
|----------|----------|---------|
| `NEXT_PUBLIC_SUPABASE_URL` | Deferred | Only if a Supabase JS client is adopted later |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Deferred | Only if a Supabase JS client is adopted later |
| `SUPABASE_SERVICE_ROLE_KEY` | Deferred | Server-side Supabase admin operations |

V1 uses Supabase as **hosted PostgreSQL** accessed through Prisma. Supabase client SDK keys are deferred unless a future ADR requires them.

---

# 12. Authentication Flow

```text
Admin

↓

Login Request

↓

Credential Validation

↓

JWT Generation

↓

Secure Cookie / Token

↓

Protected Routes

↓

JWT Verification

↓

RBAC Check

↓

Authorized Response
```

Authentication is required only for administrative features.

---

# 13. Authorization (RBAC)

Current Role:

- Admin

Future Roles:

- Editor
- Moderator

Permissions should be checked through a centralized authorization layer rather than inside route handlers.

---

# 14. External Service Integrations

| Service | Purpose |
|----------|---------|
| Supabase | PostgreSQL Database |
| Prisma | ORM |
| Resend | Email Notifications |
| Google reCAPTCHA v3 | Bot Protection |
| Vercel | Deployment |

External integrations should be encapsulated within dedicated service classes.

---

# 15. Security Strategy

The backend should implement:

- Input Validation
- Output Sanitization
- JWT Authentication
- RBAC
- Password Hashing
- SQL Injection Prevention
- XSS Prevention
- Rate Limiting
- CSRF Protection (if cookie-based authentication is used)
- Secure HTTP Headers

Security is considered at every layer.

---

# 16. Logging Strategy

The application should log:

- Authentication Events
- API Errors
- Unexpected Exceptions
- External Service Failures

Sensitive information must never be logged.

Future integration:

- Structured logging
- Centralized log aggregation

---

# 17. Backend Module Responsibilities

Each backend feature owns:

- Validation
- Service
- Repository
- Types
- API Contracts

Modules communicate through services rather than directly accessing each other's repositories.

---

# 18. Backend Technology Stack

| Area | Technology |
|------|------------|
| Runtime | Node.js |
| Framework | Next.js Route Handlers |
| Language | TypeScript |
| Validation | Zod |
| ORM | Prisma |
| Database | Supabase PostgreSQL |
| Authentication | JWT |
| Authorization | RBAC |

---

# 19. Engineering Principles

The backend follows these principles:

- Separation of Concerns
- Single Responsibility Principle
- Thin Route Handlers
- Service Layer Pattern
- Repository Pattern
- Dependency Inversion
- Reusable Validation
- Type Safety
- Secure by Default

---

# 20. Backend Decision Summary

| Decision | Choice |
|-----------|--------|
| Framework | Next.js Route Handlers |
| ORM | Prisma |
| Database | Supabase PostgreSQL |
| Validation | Zod |
| Authentication | JWT |
| Authorization | RBAC |
| Architecture | Layered |
| Business Logic | Service Layer |
| Data Access | Repository Pattern |

---

# Document Status

**Status:** Approved

This document defines the backend architecture for the portfolio application. It establishes the responsibilities of each backend layer, standardizes API behavior, and provides the architectural foundation for authentication, authorization, database access, validation, and future backend development.