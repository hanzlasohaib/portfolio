# Routing Strategy

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

This document defines the routing strategy for the Portfolio website.

The routing strategy aims to provide:

- Predictable URLs
- SEO-friendly routes
- Logical separation of public and protected areas
- Scalable feature organization
- Clean navigation
- Maintainable route hierarchy

**Authoritative V1 route inventory:** `docs/project-design/project-scope.md`

This document must not list V1 routes that contradict project scope.

---

# 2. Routing Principles

The application follows these principles:

- Human-readable URLs
- RESTful API endpoints where Route Handlers are required
- Feature-oriented routing
- Protected administrative routes
- Static generation whenever possible
- Route groups used only for organization
- Consistent naming conventions

---

# 3. Public Routes (V1)

Public routes require no authentication.

`/login` is public so unauthenticated admins can sign in.

| Route | Purpose |
|--------|---------|
| `/` | Landing Page |
| `/about` | About |
| `/projects` | Projects |
| `/projects/[slug]` | Project Details |
| `/journey` | Journey |
| `/contact` | Contact |
| `/login` | Admin Login |

---

# 4. Protected Routes (V1)

Accessible only to authenticated administrators.

| Route | Purpose |
|--------|---------|
| `/dashboard` | Dashboard Overview |
| `/dashboard/projects` | Manage Projects |
| `/dashboard/journey` | Manage Journey |
| `/dashboard/messages` | Contact Messages |
| `/dashboard/settings` | Settings |

---

# 5. API Routes (V1)

Backend APIs are exposed under:

```text
/api/*
```

V1 Route Handler examples:

```text
POST /api/contact

POST /api/auth/login
```

Admin mutations primarily use Server Actions (see `docs/architecture/server-actions.md`). Additional admin REST endpoints may be added only when required.

---

# 6. Dynamic Routes

Dynamic routes should use meaningful identifiers (slugs).

Preferred:

```text
/projects/portfolio-redesign
```

Avoid exposing database IDs unless required.

---

# 7. Route Protection

Authentication middleware should protect:

- `/dashboard` and all nested dashboard routes
- Admin APIs
- Admin Server Actions

Public routes (including `/login`) remain accessible without authentication.

Unauthenticated access to `/dashboard/**` redirects to `/login`.

---

# 8. Route Groups

Route groups are used only for organization and **must not** affect URLs.

Intentional V1 route groups:

```text
app/
├── (public)/       # Public pages: /, about, projects, journey, contact
├── (auth)/         # Auth pages: login
└── (dashboard)/    # Protected admin: dashboard/**
```

These route groups are routing concerns only. Business logic never belongs inside `app/`.

---

# 9. Navigation Strategy

The landing page contains a sticky navigation bar.

V1 Navbar links:

- Home (`/`)
- About (`/about`)
- Projects (`/projects`)
- Journey (`/journey`)
- Contact (`/contact`)

Navigation supports:

- Smooth scrolling to landing sections where applicable
- Active section highlighting
- Responsive mobile navigation
- Theme toggle
- Contact CTA

---

# 10. Metadata Strategy

Every route should define:

- Title
- Description
- OpenGraph metadata
- Twitter Card metadata
- Canonical URL
- Keywords (where appropriate)

---

# 11. URL Naming Conventions

Use:

- lowercase
- kebab-case
- descriptive slugs

Never use:

```text
/myProjects
/PageOne
/project_01
```

---

# 12. Error Routes

The application provides:

- 404 Page
- Global Error Page
- Route Error Pages

---

# 13. Future Routing (Not V1)

Reserved for later versions. Do not implement in V1:

| Route | Purpose |
|--------|---------|
| `/skills` | Dedicated Skills page |
| `/experience` | Deprecated alias — use `/journey` |
| `/portfolio` | Not used — Projects is the showcase entity |
| `/portfolio/[slug]` | Not used |
| `/blog` | Blog listing |
| `/blog/[slug]` | Blog post |
| `/dashboard/blog` | Blog management |
| `/dashboard/profile` | Profile management |
| Resume / Testimonials pages | Future |

---

# 14. Routing Decision Summary

| Decision | Choice |
|-----------|--------|
| Framework | Next.js App Router |
| Route Style | Feature-Oriented |
| Dynamic Routes | Slug-Based |
| API Prefix | `/api` |
| Admin Area | `/dashboard` |
| Login | Public `/login` |
| Authentication | Middleware protects `/dashboard/**` |
| SEO | Metadata API |
| Route Groups | `(public)`, `(auth)`, `(dashboard)` |

---

# Status

**Status:** Approved
