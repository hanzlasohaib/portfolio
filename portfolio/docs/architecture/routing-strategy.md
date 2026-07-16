# Routing Strategy

> Version: 1.0.0
>
> Status: Draft
>
> Last Updated: 2026-07-16
>
> Owner: Project Team
>
> Category: Architecture

---

# 1. Purpose

This document defines the routing strategy for the Portfolio application.

The routing strategy aims to provide:

- Predictable URLs
- SEO-friendly routes
- Logical separation of public and protected areas
- Scalable feature organization
- Clean navigation
- Maintainable route hierarchy

---

# 2. Routing Principles

The application follows these principles:

- Human-readable URLs
- RESTful API endpoints
- Feature-oriented routing
- Protected administrative routes
- Static generation whenever possible
- Route groups used only for organization
- Consistent naming conventions

---

# 3. Public Routes

Public routes require no authentication.

| Route | Purpose |
|--------|---------|
| / | Landing Page |
| /about | About Me |
| /skills | Skills |
| /experience | Experience |
| /projects | Projects |
| /projects/[slug] | Project Details |
| /portfolio | Portfolio |
| /portfolio/[slug] | Portfolio Item |
| /journey | Professional Journey |
| /blog | Blog |
| /blog/[slug] | Blog Post |
| /contact | Contact |

---

# 4. Protected Routes

Accessible only to authenticated administrators.

| Route | Purpose |
|--------|---------|
| /login | Admin Login |
| /dashboard | Dashboard |
| /dashboard/profile | Profile |
| /dashboard/projects | Project Management |
| /dashboard/blog | Blog Management |
| /dashboard/journey | Journey Management |
| /dashboard/messages | Contact Messages |
| /dashboard/settings | Application Settings |

---

# 5. API Routes

All backend APIs are exposed under:

```text
/api/*
```

Examples:

```text
/api/contact

/api/auth/login

/api/projects

/api/blog

/api/journey

/api/messages
```

---

# 6. Dynamic Routes

Dynamic routes should use meaningful identifiers.

Preferred:

```text
/projects/portfolio-redesign

/blog/nextjs-app-router-guide
```

Avoid exposing database IDs unless required.

---

# 7. Route Protection

Authentication middleware should protect:

- Dashboard
- Admin APIs
- Settings
- Content Management

Public routes should remain accessible without authentication.

---

# 8. Route Groups

Route groups are used only for organization and should not affect URLs.

Example:

```text
(public)
(admin)
(auth)
(api)
```

---

# 9. Navigation Strategy

The landing page contains a sticky navigation bar.

Navigation supports:

- Smooth scrolling to sections
- Active section highlighting
- Responsive mobile navigation
- Theme toggle
- Resume download
- Contact CTA

Each landing section includes a button linking to its dedicated page for additional details.

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

Examples:

```text
/full-stack-projects

/google-authentication

/contact
```

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

These ensure graceful handling of navigation failures.

---

# 13. Future Routing

The routing strategy supports future modules including:

- CMS
- Newsletter
- Analytics
- Admin Roles
- Portfolio Categories
- Blog Categories
- Search

No breaking URL changes should be required.

---

# 14. Routing Decision Summary

| Decision | Choice |
|-----------|--------|
| Framework | Next.js App Router |
| Route Style | Feature-Oriented |
| Dynamic Routes | Slug-Based |
| API Prefix | /api |
| Admin Area | /dashboard |
| Authentication | Middleware Protected |
| SEO | Metadata API |
| Navigation | Sticky + Smooth Scroll |

---

# Document Status

**Status:** Approved (Draft v1.0)

This routing strategy defines the public navigation, protected administration area, API organization, URL conventions, and route protection mechanisms for the portfolio application.