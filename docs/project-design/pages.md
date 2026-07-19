# Pages

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

**Authoritative V1 routes:** `docs/project-design/project-scope.md`

---

# Public Pages

## Home (`/`)

Purpose:

Introduce the developer and guide visitors.

Sections:

- Hero
- About Preview
- Featured Projects
- Skills Preview
- Journey Timeline Preview
- Contact CTA
- Footer

---

## About (`/about`)

Sections:

- Introduction
- Professional Summary
- Education
- Journey Summary
- Skills
- Technologies
- Interests

---

## Projects (`/projects`)

Features:

- Project Grid
- Search
- Filter
- Technology Tags

Each project includes:

- Cover Image (URL string; no file upload in V1)
- Description
- Tech Stack
- GitHub Link
- Live Demo

---

## Project Details (`/projects/[slug]`)

Displays a single project by slug.

---

## Journey (`/journey`)

Displays the professional Journey timeline.

Component example: `JourneyTimeline`

---

## Contact (`/contact`)

Contains:

- Contact Form
- Email
- LinkedIn
- GitHub
- Success Message
- Validation

---

# Authentication

## Login (`/login`)

Public route (no auth required to view).

Fields:

- Email
- Password

Actions:

- Login

Forgot Password is **out of scope** for V1 (see project scope and authentication docs).

---

# Dashboard

Private routes under `/dashboard/**`.

| Module | Route |
|--------|-------|
| Overview | `/dashboard` |
| Projects Management | `/dashboard/projects` |
| Journey Management | `/dashboard/journey` |
| Contact Messages | `/dashboard/messages` |
| Settings | `/dashboard/settings` |

---

# Shared Layout

Navbar

↓

Page Content

↓

Footer

---

# Navbar

Links:

- Home
- About
- Projects
- Journey
- Contact

Desktop:

Horizontal Navigation

Mobile:

Hamburger Menu

---

# Footer

Contains:

- Copyright
- Navigation
- Social Links
- Back To Top

---

# Error Pages

404

500

Unauthorized

---

# SEO

Every page requires:

- Title
- Description
- OpenGraph
- Canonical URL

---

# Performance

Lazy load:

- Images
- Heavy sections
- Dashboard modules

---

# Accessibility

Every page must:

- Use semantic HTML
- Maintain heading hierarchy
- Support keyboard navigation
- Include focus states

---

# Responsive

Support:

- Mobile
- Tablet
- Laptop
- Desktop

No horizontal scrolling.

---

# Future Pages

Reserved (not V1):

- Blog
- Skills (dedicated page)
- Services
- Certifications
- Resume
- Testimonials
- `/portfolio` (not used; Projects is the showcase entity)

---

# Status

**Status:** Approved
