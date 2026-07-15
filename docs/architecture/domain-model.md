# Domain Model

> Version: 1.0
>
> Status: Draft

---

# Purpose

This document defines the business domains of the Portfolio application.

The project is organized around business capabilities rather than database tables.

This approach improves:

- Maintainability
- Scalability
- Separation of Concerns
- Team Collaboration
- Feature Ownership

---

# Domain Overview

The application consists of four primary business domains.

```text
Portfolio
│
├── Projects
├── Skills
├── Experience
├── Education
├── Resume
└── Personal Information

Content
│
├── Blog
├── Journey
└── SEO Content

Communication
│
├── Contact Form
├── Direct Email
├── Contact Messages
└── Email Notifications

Administration
│
├── Authentication
├── Authorization
├── Dashboard
├── Settings
└── Content Management
```

---

# Portfolio Domain

Purpose

Represents professional information visible to visitors.

Responsibilities

- Projects
- Skills
- Experience
- Resume
- Social Links
- Hero Section
- About Section

Public Access

Yes

Admin Managed

Yes

---

# Content Domain

Purpose

Manages long-form content.

Responsibilities

- Blog
- Journey
- Articles
- Storytelling
- SEO Metadata

Public Access

Yes

Admin Managed

Yes

---

# Communication Domain

Purpose

Handles all visitor communication.

Responsibilities

- Contact Form
- Contact Messages
- Email Notifications
- Spam Protection
- reCAPTCHA
- Message Status

Public Access

Partially

Admin Managed

Messages only

---

# Administration Domain

Purpose

Provides secure management tools.

Responsibilities

- Login
- JWT Authentication
- RBAC
- Dashboard
- Content Management
- Settings

Public Access

No

---

# Shared Domain

Some functionality is shared across every domain.

Examples

- Theme
- Navigation
- SEO
- Logger
- Request IDs
- Environment Variables
- Error Handling
- Toast Notifications

These belong in shared infrastructure.

---

# Domain Ownership

| Domain | Owner |
|----------|--------|
| Portfolio | Public Website |
| Content | CMS |
| Communication | Contact System |
| Administration | Dashboard |

---

# Domain Interaction

```text
Visitor
   │
   ▼
Portfolio

Visitor
   │
   ▼
Communication

Admin
   │
   ▼
Administration
      │
      ▼
Portfolio

Administration
      │
      ▼
Content
```

---

# Mapping Domains to Features

```text
Portfolio
↓

features/portfolio

Content
↓

features/blog
features/journey

Communication
↓

features/contact

Administration
↓

features/dashboard
features/auth
```

---

# Domain Principles

Each domain owns:

- Components
- Services
- Validation
- Types
- Repository
- API Logic

Domains communicate through services.

Direct coupling should be avoided.

---

# Future Domains

Possible future additions

- Newsletter
- Analytics
- Search
- Media Library
- Comments
- CMS

These can be introduced without restructuring the project.

---

# Status

Approved (Draft v1.0)