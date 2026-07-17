# Domain Model

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

This document defines the business domains of the Portfolio website.

The project is organized around business capabilities rather than database tables.

**Terminology:** “Portfolio” means the website. The showcase data entity is **Project**. The timeline entity is **Journey** (not Experience).

Authoritative schema: `docs/database/prisma-schema-planning.md`

Authoritative routes: `docs/project-design/project-scope.md`

---

# Domain Overview

```text
Portfolio Website
│
├── Projects
├── Journey
├── About
├── Contact
├── Skills (content on landing/about; no dedicated /skills route in V1)
└── Personal Information

Communication
│
├── Contact Form
├── Contact Messages
└── Direct Email (static links)

Administration
│
├── Authentication
├── Authorization
├── Dashboard
├── Manage Projects
├── Manage Journey
├── Manage Messages
└── Settings
```

**Future domain (not V1):** Content / Blog

---

# Portfolio Website Domain

Purpose: Professional information visible to visitors.

Responsibilities:

- Projects
- Journey
- About / Hero
- Skills content
- Resume (static)
- Social Links

Public Access: Yes

Admin Managed: Yes (Projects, Journey)

---

# Communication Domain

Purpose: Visitor outreach.

Responsibilities:

- Contact Form
- Contact Messages

Public Access: Submit only

Admin Managed: Yes (messages)

---

# Administration Domain

Purpose: Secure content and message management.

Responsibilities:

- Authentication (JWT)
- Authorization (RBAC)
- Dashboard
- Settings

Public Access: Login page only

Admin Managed: Yes

---

# Shared Kernel

Cross-cutting concerns:

- Authentication utilities
- Logging
- Caching
- Configuration
- SEO helpers

These belong in shared infrastructure (`lib/`, `config/`).

---

# Mapping Domains to Features

```text
Portfolio Website
↓
features/home
features/about
features/projects
features/journey

Communication
↓
features/contact

Administration
↓
features/authentication
features/dashboard
```

There is **no** `features/portfolio` module. Projects are owned by `features/projects`.

Future:

```text
features/blog
```

---

# Domain Principles

Each feature owns:

- Components
- Service
- Validation schemas
- Types
- Repository
- Feature-local API / action coordination

Features communicate through well-defined interfaces.

Direct coupling should be avoided.

---

# Future Domains

- Blog / Content
- Newsletter
- Analytics
- Search
- Media Library

These can be introduced without restructuring.

---

# Status

**Status:** Approved
