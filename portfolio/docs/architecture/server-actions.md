# Server Actions Strategy

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

This document defines when to use Next.js Server Actions versus Route Handlers.

The goal is consistency across the application.

---

# Guiding Principle

Use the simplest solution that satisfies the requirement.

Do not expose public APIs unless required.

---

# Server Actions

Use for:

- Internal form submissions
- Dashboard CRUD
- Admin-only actions
- Mutations initiated by React components
- Data updates that don't require public API access

Examples

- Update profile
- Delete project
- Create blog post
- Update portfolio information

Advantages

- End-to-end type safety
- No HTTP serialization
- Less boilerplate
- Better developer experience

---

# Route Handlers

Use for:

- Public APIs
- Contact form
- Authentication
- Webhooks
- Future mobile applications
- Third-party integrations

Examples

POST /api/contact

POST /api/auth/login

POST /api/webhooks/resend

---

# Decision Matrix

| Scenario | Server Action | Route Handler |
|-----------|--------------|---------------|
| Internal Dashboard | ✅ | ❌ |
| Contact Form | ❌ | ✅ |
| Login | ❌ | ✅ |
| Third-party API | ❌ | ✅ |
| Admin CRUD | ✅ | Optional |

---

# Security

Never trust client input.

Always validate with Zod.

Always authorize protected actions.

---

# Status

Approved