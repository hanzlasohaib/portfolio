# Prisma Schema Planning

> Version: 1.1.0
>
> Status: Approved
>
> Last Updated: 2026-07-17
>
> Owner: Project Team
>
> Category: Database

---

# Purpose

This document defines the implementation-ready Prisma data model for Version 1.

Do **not** invent a separate Portfolio or Experience model.

| Concept | Model |
|---------|--------|
| Showcase work | `Project` |
| Professional timeline | `Journey` |
| Contact submissions | `Contact` |
| Admin auth | `User` |

Image fields (`thumbnail`, `coverImage`, `icon`) store **URL strings** only. No file upload system in V1.

This document is documentation only. Do not generate `schema.prisma` or migrations from this task alone — implement schema in Phase 3 per the roadmap.

---

# Design Principles

- UUID primary keys (`String` `@id` `@default(uuid())`)
- Explicit relationships
- Database normalization
- Type safety
- Soft deletes only when required (none in V1 core models)
- Auditable timestamps (`createdAt`, `updatedAt`)
- `@@map` for snake_case table names where the Prisma model name differs from the table name

---

# Enums

```prisma
enum UserRole {
  ADMIN
}

enum ContactStatus {
  NEW
  READ
  REPLIED
  ARCHIVED
}
```

---

# Models

## User

Purpose: Administrative authentication.

```prisma
model User {
  id           String   @id @default(uuid())
  fullName     String
  email        String   @unique
  passwordHash String
  role         UserRole @default(ADMIN)
  isActive     Boolean  @default(true)
  createdAt    DateTime @default(now())
  updatedAt    DateTime @updatedAt

  @@index([email])
  @@map("users")
}
```

`email` uniqueness is case-insensitive in practice: the value is normalized to lowercase before every write and lookup (see `docs/architecture/validation-strategy.md` § Shared Formats), so the `@unique` constraint above is sufficient without a database-level collation change.

`/dashboard/settings` manages the authenticated admin's own `User` record (`fullName`, `email`, password change) using this model directly. No separate `Settings` entity is required for V1.

---

## Contact

Purpose: Store contact form submissions.

```prisma
model Contact {
  id        String        @id @default(uuid())
  fullName  String
  email     String
  subject   String
  message   String        @db.Text
  status    ContactStatus @default(NEW)
  ipAddress String?
  userAgent String?
  createdAt DateTime      @default(now())
  updatedAt DateTime      @updatedAt

  @@index([email])
  @@index([status])
  @@index([createdAt])
  @@map("contact_messages")
}
```

---

## Project

Purpose: Portfolio website showcase items (the Project entity).

```prisma
model Project {
  id               String              @id @default(uuid())
  slug             String              @unique
  title            String
  shortDescription String
  description      String              @db.Text
  thumbnail        String?
  repositoryUrl    String?
  liveUrl          String?
  featured         Boolean             @default(false)
  published        Boolean             @default(false)
  displayOrder     Int                 @default(0)
  createdAt        DateTime            @default(now())
  updatedAt        DateTime            @updatedAt
  technologies     ProjectTechnology[]

  @@index([slug])
  @@index([featured])
  @@index([published])
  @@index([displayOrder])
  @@map("projects")
}
```

---

## Technology

```prisma
model Technology {
  id        String              @id @default(uuid())
  name      String              @unique
  icon      String?
  color     String?
  createdAt DateTime            @default(now())
  updatedAt DateTime            @updatedAt
  projects  ProjectTechnology[]

  @@index([name])
  @@map("technologies")
}
```

---

## ProjectTechnology

Many-to-many bridge between Project and Technology.

```prisma
model ProjectTechnology {
  projectId    String
  technologyId String
  project      Project    @relation(fields: [projectId], references: [id], onDelete: Cascade)
  technology   Technology @relation(fields: [technologyId], references: [id], onDelete: Restrict)

  @@id([projectId, technologyId])
  @@map("project_technologies")
}
```

The two sides of this relation intentionally use different delete behavior. `project` cascades because a join row is meaningless once its project is gone. `technology` restricts deletion because a `Technology` still tagged to any project must be untagged from all of them first — this prevents a routine tag-list cleanup from silently stripping that technology off unrelated projects, consistent with how `Contact.status` and `Project.published` are already used elsewhere in this schema to avoid silent, irreversible data loss.

---

## Journey

Purpose: Professional timeline (canonical name for what was previously called Experience).

```prisma
model Journey {
  id           String    @id @default(uuid())
  title        String
  organization String?
  description  String?   @db.Text
  location     String?
  startDate    DateTime
  endDate      DateTime?
  displayOrder Int       @default(0)
  createdAt    DateTime  @default(now())
  updatedAt    DateTime  @updatedAt

  @@index([displayOrder])
  @@map("journeys")
}
```

---

## Skill

Purpose: Skills shown on landing/about content. No dedicated `/skills` route in V1.

```prisma
model Skill {
  id           String   @id @default(uuid())
  name         String
  category     String?
  icon         String?
  displayOrder Int      @default(0)
  createdAt    DateTime @default(now())
  updatedAt    DateTime @updatedAt

  @@index([category])
  @@index([displayOrder])
  @@map("skills")
}
```

---

## Blog (Future — not V1 routes)

Kept for schema readiness. Do not expose `/blog` or `/dashboard/blog` in V1.

```prisma
model Blog {
  id          String    @id @default(uuid())
  slug        String    @unique
  title       String
  excerpt     String?
  content     String    @db.Text
  coverImage  String?
  readingTime Int?
  published   Boolean   @default(false)
  publishedAt DateTime?
  createdAt   DateTime  @default(now())
  updatedAt   DateTime  @updatedAt

  @@index([slug])
  @@index([published])
  @@index([publishedAt])
  @@map("blog_posts")
}
```

---

# Relationships

```text
User          — independent (admin auth)

Project
  └── ProjectTechnology ── Technology

Contact       — independent

Journey       — independent

Skill         — independent

Blog          — independent (Future UI)
```

No Portfolio model. No Experience model.

---

# Constraints Summary

| Model | Constraints |
|-------|-------------|
| User | `email` unique (case-insensitive via lowercase normalization); `role` default `ADMIN`; `isActive` default `true` |
| Contact | `status` default `NEW`; `message` Text; optional `ipAddress`, `userAgent` |
| Project | `slug` unique; `featured`/`published` default `false`; `displayOrder` default `0`; optional URLs/thumbnail |
| Technology | `name` unique |
| ProjectTechnology | composite PK `(projectId, technologyId)`; `project` cascade delete; `technology` restrict delete |
| Journey | `title` required; `startDate` required; optional `endDate`, `organization`, `description`, `location` |
| Skill | optional `category`, `icon` |
| Blog | `slug` unique; Future UI only |

---

# UUID Strategy

All tables use UUID string primary keys.

---

# Migration Strategy

Rules (apply in Phase 3):

- Never edit existing production migrations.
- Every schema change gets a new migration.
- Review generated SQL before applying.
- Test locally before deployment.

---

# Core Models (V1 data)

- User
- Project
- Technology
- ProjectTechnology
- Journey
- Skill
- Contact

# Future Extension Models

- Blog (model defined above; UI deferred)
- Newsletter
- Analytics
- AuditLog
- Notification
- Media
- Session

---

# Status

**Status:** Approved
