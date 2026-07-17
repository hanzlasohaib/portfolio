# Project Scope

> Version: 1.1.0
>
> Status: Approved
>
> Last Updated: 2026-07-17
>
> Owner: Project Team
>
> Category: Project-Design

---

## Terminology

This website is a **portfolio website**.

| Term | Meaning |
|------|---------|
| Portfolio Website | The overall public application |
| Project | The data entity and feature for showcase work |
| Journey | The data entity and feature for professional timeline |

There is **no** separate Portfolio data entity or `/portfolio` route in V1.

There is **no** separate Experience entity. Use **Journey** instead.

---

## In Scope (Version 1)

### Public Website

| Page | Route |
|------|-------|
| Landing Page | `/` |
| About | `/about` |
| Projects | `/projects` |
| Project Details | `/projects/[slug]` |
| Journey | `/journey` |
| Contact | `/contact` |
| Login | `/login` |

Landing page sections may include About preview, Featured Projects, Skills preview, Journey timeline preview, and Contact CTA. Skills may appear as **content on the landing/about pages**; there is no dedicated `/skills` route in V1.

### Admin

| Capability | Route |
|------------|-------|
| Dashboard Overview | `/dashboard` |
| Manage Projects | `/dashboard/projects` |
| Manage Journey | `/dashboard/journey` |
| Manage Contact Messages | `/dashboard/messages` |
| Settings | `/dashboard/settings` |

### Technical

- SEO
- Sitemap
- robots.txt
- Dark/Light Theme
- Responsive Design
- Prisma
- Supabase (PostgreSQL hosting)
- RBAC
- JWT
- Vercel Deployment
- GitHub CI-ready Structure
- Image fields as URL strings only (no file upload system)

---

## Out of Scope (Version 1)

- Comments
- User Registration
- User Profiles
- OAuth Login
- Newsletter
- Notifications
- Multi-language Support
- CMS Integration
- Analytics Dashboard
- Real-time Chat
- Payment Integration
- File Upload System
- Multi-Admin Support
- Public API (third-party open API; internal Route Handlers for contact/auth are allowed)
- Mobile Application
- Forgot Password / Password Reset
- Separate Portfolio entity or `/portfolio` route
- Separate Experience entity or `/experience` route

---

## Future (Not V1)

Reserved for later versions:

- Blog (`/blog`, `/blog/[slug]`, `/dashboard/blog`)
- Skills dedicated page (`/skills`)
- Services
- Certifications
- Resume page
- Testimonials
- Profile management (`/dashboard/profile`)
- Portfolio categories / search

---

## Authoritative V1 Route Inventory

This table is the single source of truth for V1 routes. All other documents must match it.

### Public

| Route | Purpose |
|-------|---------|
| `/` | Landing Page |
| `/about` | About |
| `/projects` | Projects |
| `/projects/[slug]` | Project Details |
| `/journey` | Journey |
| `/contact` | Contact |
| `/login` | Admin Login |

### Admin (authenticated)

| Route | Purpose |
|-------|---------|
| `/dashboard` | Dashboard Overview |
| `/dashboard/projects` | Manage Projects |
| `/dashboard/journey` | Manage Journey |
| `/dashboard/messages` | Contact Messages |
| `/dashboard/settings` | Settings |

---

# Status

**Status:** Approved
