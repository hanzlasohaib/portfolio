# Dependency Graph

> Version: 1.0
>
> Status: Draft

---

# Purpose

This document defines the allowed dependencies between architectural layers.

Maintaining these boundaries keeps the codebase modular, testable, and maintainable.

---

# High-Level Dependency Flow

```text
Presentation Layer
        │
        ▼
Application Layer
        │
        ▼
Service Layer
        │
        ▼
Repository Layer
        │
        ▼
Prisma ORM
        │
        ▼
Supabase PostgreSQL
```

Dependencies must always flow downward.

Lower layers must never depend on higher layers.

---

# Allowed Dependencies

## app/

Can import

- features
- components
- lib
- config
- services
- validation
- constants
- types

Cannot import

- prisma directly

---

## features/

Can import

- shared components
- services
- validation
- lib
- constants
- types

Cannot import

- Prisma Client
- Route Handlers

---

## services/

Can import

- repositories
- validation
- lib
- config
- types

Cannot import

- React
- UI Components
- Next.js Pages

---

## repositories/

Can import

- Prisma Client
- Database Types

Cannot import

- React
- Components
- Services
- Route Handlers

Repositories should only contain data access logic.

---

## validation/

Can import

- Zod
- Shared Types

Cannot import

- UI
- Prisma
- Services

Validation must remain framework-independent.

---

## lib/

Contains shared infrastructure.

Examples

- prisma
- jwt
- logger
- requestId
- email
- env

Should not depend on feature modules.

---

## components/

Can import

- hooks
- constants
- types

Cannot import

- repositories
- prisma
- database

---

# Dependency Rules

## Rule 1

Route Handlers are coordinators.

They validate, call services, and return responses.

No business logic.

---

## Rule 2

Business logic belongs only in services.

---

## Rule 3

Repositories only communicate with Prisma.

---

## Rule 4

Prisma must never be imported into React components.

---

## Rule 5

Services must not import React components.

---

## Rule 6

Repositories must never import Route Handlers.

---

## Rule 7

Validation schemas should be reusable by both frontend and backend.

---

# Dependency Diagram

```text
app
│
▼
features/*
│
▼
feature service
│
▼
feature repository
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

These modules may be shared across multiple layers:

- config
- constants
- types
- validation
- lib/logger
- lib/requestId
- lib/env

They must remain free of business logic.

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

Approved (Draft v1.0)