# Component Architecture

> Version: 1.0.0
>
> Status: Approved
>
> Last Updated: 2026-07-16
>
> Owner: Project Team
>
> Category: Architecture

---

# Purpose

This document defines the component architecture of the application.

The goal is to build a reusable, maintainable, scalable component system rather than creating page-specific components.

---

# Design Principles

The UI follows Atomic Design concepts combined with Feature-Oriented Architecture.

Objectives

- Reusability
- Consistency
- Accessibility
- Maintainability
- Separation of Concerns

---

# Component Layers

```text
Pages

↓

Feature Components

↓

Shared Components

↓

UI Primitives
```

Business logic should never exist inside reusable UI primitives.

---

# Component Categories

## 1. UI Primitives

Purpose

Reusable presentation-only components.

Examples

Button

Input

Textarea

Label

Badge

Avatar

Card

Dialog

Dropdown

Tooltip

Skeleton

Separator

Spinner

ThemeToggle

Toast

---

## 2. Shared Components

Reusable across multiple features.

Examples

Navbar

Footer

Section

SectionHeading

Container

PageHeader

SocialLinks

ResumeButton

ThemeToggle

SEO

Breadcrumb

EmptyState

LoadingState

ErrorState

---

## 3. Layout Components

Examples

RootLayout

DashboardLayout

AuthLayout

SectionLayout

Container

Grid

Stack

Sidebar

Header

---

## 4. Feature Components

Each feature owns its own components.

Example

```text
features/

communication/

contact/

components/

ContactForm

ContactCard

ContactInfo

ContactSuccess

ContactError

ContactActions
```

---

# Component Naming

Project-wide naming conventions are defined in:

docs/database/naming-conventions.md

All components must follow those conventions.

---

# File Naming

Component

Button.tsx

Navbar.tsx

HeroSection.tsx

Hook

useTheme.ts

Utility

formatDate.ts

Constant

personal.ts

Route

kebab-case

Example

/about

/contact

/projects

/blog

---

# Component Responsibilities

UI Components

Presentation only

Feature Components

Presentation + feature interaction

Services

Business logic

Repositories

Database access

---

# Props Design

Rules

- Explicit props
- Avoid unnecessary optional props
- Favor composition over inheritance
- Prefer children where appropriate

---

# Forms

Every form follows

UI

↓

Zod Validation

↓

Server Action / Route Handler

↓

Service

↓

Repository

↓

Prisma

↓

Database

---

# Theme Support

Every component must support

- Light Mode
- Dark Mode

Avoid hardcoded colors.

Use semantic Tailwind utility classes.

---

# Accessibility

Every reusable component must

- Support keyboard navigation
- Have ARIA labels where required
- Maintain sufficient color contrast
- Display visible focus states

---

# Performance

- Prefer Server Components by default
- Use Client Components only when necessary
- Lazy-load heavy UI
- Memoize expensive computations only when profiling justifies it

---

# Status

Approved (Draft v1.0)