# Prisma Schema Planning

> Version: 1.0
>
> Status: Draft

---

# Purpose

This document defines the complete Prisma data model before implementation.

The goal is to avoid unnecessary migration churn by designing the database schema first.

---

# Design Principles

- UUID primary keys
- Explicit relationships
- Database normalization
- Future extensibility
- Type safety
- Soft deletes only when required
- Auditable timestamps

---

# Enums

## UserRole

```prisma
enum UserRole {
  ADMIN
}
```

---

## ContactStatus

```prisma
enum ContactStatus {
  NEW
  READ
  REPLIED
  ARCHIVED
}
```

---

## Models

# User

Purpose

Administrative authentication.

Fields

```text
id UUID PK
fullName
email UNIQUE
passwordHash
role UserRole
isActive Boolean
createdAt
updatedAt
```

Indexes

- email

---

# Contact

Purpose

Store contact form submissions.

Fields

```text
id UUID PK
fullName
email
subject
message
status ContactStatus
ipAddress
userAgent
createdAt
updatedAt
```

Indexes

- email
- status
- createdAt

---

# Project

```text
id UUID PK
slug UNIQUE
title
shortDescription
description
thumbnail
repositoryUrl
liveUrl
featured
published
displayOrder
createdAt
updatedAt
```

Indexes

- slug
- featured
- published
- displayOrder

---

# Technology

```text
id UUID PK
name UNIQUE
icon
color
createdAt
updatedAt
```

Indexes

- name

---

# ProjectTechnology

Many-to-many bridge.

Fields

```text
projectId
technologyId
```

Composite Key

```text
projectId + technologyId
```

---

# Blog

```text
id UUID PK
slug UNIQUE
title
excerpt
content
coverImage
readingTime
published
publishedAt
createdAt
updatedAt
```

Indexes

- slug
- published
- publishedAt

---

# Journey

```text
id UUID PK
title
organization
description
location
startDate
endDate
displayOrder
createdAt
updatedAt
```

Indexes

- displayOrder

---

# Skill

```text
id UUID PK
name
category
icon
displayOrder
createdAt
updatedAt
```

Indexes

- category
- displayOrder

---

# Relationships

```text
User

(no ownership required currently)

Project

Project
    │
    └─────────────< ProjectTechnology >─────────────Technology

Contact

Independent

Blog

Independent

Journey

Independent

Skill

Independent
```

---

# Constraints

User

- email unique

Project

- slug unique

Blog

- slug unique

Technology

- name unique

Contact

- status default NEW

---

# Default Values

createdAt

Current Timestamp

updatedAt

Auto Updated

status

NEW

published

false

featured

false

displayOrder

0

---

# UUID Strategy

All tables use UUID primary keys.

Advantages

- Better security
- No enumeration
- Easier distributed systems
- Stable identifiers

---

# Migration Strategy

Rules

- Never edit existing production migrations.
- Every schema change gets a new migration.
- Review generated SQL before applying.
- Test locally before deployment.

---

# Future Models

Newsletter

Media

Category

Tag

Analytics

Visitor

AuditLog

Session

Notification

---

# Status

Approved (Draft v1.0)