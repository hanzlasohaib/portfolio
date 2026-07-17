# Data Flow

> Version: 1.0.0
>
> Status: Approved
>
> Last Updated: 2026-07-16
>
> Owner: Project Team
>
> Category: Architecture

---

# Purpose

This document defines the standard execution flow for all application features.

Every feature should follow the same lifecycle to ensure consistency, maintainability, observability, and testability.

---

# Core Principle

Business logic should never exist inside:

- React Components
- Route Handlers
- Repository Layer

Every request flows through the same architecture.

---

# Standard Request Flow

```text
Client

↓

UI Component

↓

Validation (Client)

↓

Route Handler / Server Action

↓

Validation (Server)

↓

Service Layer

↓

Repository Layer

↓

Prisma ORM

↓

Supabase PostgreSQL

↓

Repository

↓

Service

↓

ApiResponse<T>

↓

UI

↓

Toast / UI Update
```

---

# Contact Form Flow

```text
Visitor

↓

Contact Form

↓

Zod Validation

↓

POST /api/contact

↓

Route Handler

↓

ContactService

↓

ContactRepository

↓

Prisma

↓

Supabase

↓

Success Response

↓

Success Toast
```

---

# Login Flow

```text
Admin

↓

Login Form

↓

Client Validation

↓

POST /api/auth/login

↓

Route Handler

↓

AuthService

↓

UserRepository

↓

Prisma

↓

Password Verification

↓

JWT Generation

↓

HTTP-only Cookie

↓

Dashboard Redirect
```

---

# Dashboard Data Flow

```text
Dashboard Page

↓

Server Component

↓

DashboardService

↓

Repositories

↓

Prisma

↓

Database

↓

Typed Data

↓

UI Rendering
```

---

# Error Flow

```text
Error

↓

Logger

↓

Request ID Attached

↓

Structured ApiResponse

↓

Toast / Inline Validation

↓

User Action
```

---

# Request Lifecycle

1. Request received
2. Assign Request ID
3. Authenticate (if required)
4. Validate input
5. Execute business logic
6. Persist/fetch data
7. Return typed response
8. Log completion

---

# Cross-Cutting Concerns

Every request automatically supports:

- Request ID
- Structured Logging
- Validation
- Error Handling
- Authentication (protected routes)
- Authorization
- Typed Responses

---

# Async Operations

Future background tasks:

- Email Notifications
- Analytics
- Audit Logs

Should not block the HTTP response.

---

# Status

# Status

**Status:** Approved
