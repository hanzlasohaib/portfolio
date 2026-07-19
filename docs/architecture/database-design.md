# Database Design

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

# Purpose

This document defines the logical database architecture for the Portfolio website.

**Authoritative model definitions (types, nullability, indexes, `@@map`):**  
`docs/database/prisma-schema-planning.md`

There is no Portfolio entity and no Experience entity. Use `Project` and `Journey`.

The database is designed for:

- Scalability
- Data integrity
- Maintainability
- Performance
- Future extensibility

---

# Database Technology

| Component | Technology |
|-----------|------------|
| Database | Supabase PostgreSQL |
| ORM | Prisma |
| Migration Tool | Prisma Migrate |

---

# Design Principles

- Normalize data where appropriate (3NF)
- Use UUID primary keys
- Enforce foreign keys
- Soft delete only where business requirements demand it
- Timestamp every record
- Add indexes for frequently queried columns
- Never store derived data unless necessary

---

# Entities

## User

Purpose:

Administrative authentication.

Fields

- id (UUID)
- fullName
- email (Unique)
- passwordHash
- role
- isActive
- createdAt
- updatedAt

---

## Contact

Purpose:

Store visitor contact submissions.

Fields

- id
- fullName
- email
- subject
- message
- ipAddress (optional)
- userAgent (optional)
- status
- createdAt

Indexes

- email
- createdAt
- status

---

## Project

Fields

- id
- slug (Unique)
- title
- description
- thumbnail
- repositoryUrl
- liveUrl
- featured
- displayOrder
- published
- createdAt
- updatedAt

Indexes

- slug
- featured
- published

---

## Blog

Fields

- id
- slug
- title
- excerpt
- content
- coverImage
- readingTime
- published
- publishedAt
- createdAt
- updatedAt

Indexes

- slug
- published
- publishedAt

---

## Journey

Fields

- id
- title
- organization
- description
- startDate
- endDate
- displayOrder
- createdAt
- updatedAt

---

## Skill

Fields

- id
- name
- category
- icon
- displayOrder

---

## Technology

Reusable technologies.

Examples

- React
- Next.js
- Prisma
- PostgreSQL

---

# Relationships

```text
User
│
├── manages Projects
├── manages Blog
├── manages Journey

Project
│
└── many-to-many Technology

Contact
(no relations)
```

---

# Constraints

- Email must be unique for User
- Slug must be unique
- Foreign keys enforced
- Required fields NOT NULL
- Boolean defaults
- Timestamp defaults

---

# Indexing Strategy

Index

- slug
- email
- published
- featured
- createdAt
- status

Composite indexes added only after profiling.

---

# Future Tables

- Analytics
- Newsletter
- Categories
- Tags
- Media
- Audit Logs
- Sessions

---

# Prisma Strategy

- One Prisma schema
- Feature-based models
- Explicit relations
- UUID primary keys
- Prisma Migrate only

---

# Component Naming

Project-wide naming conventions are defined in:

docs/database/naming-conventions.md

All components must follow those conventions.

---

# Document Status

**Status:** Approved

Detailed Prisma models live in `docs/database/prisma-schema-planning.md`.
