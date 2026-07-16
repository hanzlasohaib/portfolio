# Component Guidelines

> Version: 1.0.0
>
> Status: Approved
>
> Last Updated: 2026-07-16
>
> Owner: Project Team
>
> Category: UI-UX

---

# Purpose

This document defines the reusable UI components used throughout the application.

Goals:

- Consistency
- Reusability
- Accessibility
- Scalability
- Predictable APIs

---

# General Rules

Every component must:

- Have a single responsibility.
- Be reusable.
- Be fully typed with TypeScript.
- Support dark mode.
- Be responsive.
- Follow the design system.
- Be accessible.

---

# Component Categories

## Layout

- Container
- Section
- PageHeader
- Grid
- Stack

---

## Navigation

- Navbar
- MobileMenu
- NavLink
- ThemeToggle
- Breadcrumb

---

## Buttons

### Primary Button

Purpose:

Main CTA.

Variants:

- default
- loading
- disabled

---

### Secondary Button

Outline button.

---

### Ghost Button

Transparent button.

---

### Icon Button

Square icon-only button.

Must include an accessible label.

---

# Cards

## Card

Reusable content container.

Supports:

- title
- description
- actions
- footer

---

## Project Card

Contains:

- Image
- Title
- Description
- Tech Stack
- Links

---

## Blog Card

Contains:

- Cover
- Date
- Reading Time
- Tags

---

# Inputs

Components:

- Text Input
- Textarea
- Select
- Checkbox
- Radio
- Switch

All inputs must support:

- label
- helper text
- error message
- disabled state

---

# Feedback Components

- Alert
- Toast
- Spinner
- Skeleton
- EmptyState
- ErrorState

---

# Badges

Variants:

- Primary
- Secondary
- Success
- Warning
- Danger

---

# Modal

Supports:

- Title
- Description
- Footer
- Close Button

Must trap keyboard focus.

---

# Dialog

Confirmation dialog.

Used for destructive actions.

---

# Avatar

Supports:

- Image
- Initials
- Fallback

---

# Social Icons

Reusable social link component.

Supported:

- GitHub
- LinkedIn
- Email
- X
- Instagram

---

# Hero Section

Contains:

- Heading
- Description
- CTA Buttons
- Social Links
- Hero Illustration

---

# Section Component

Responsibilities:

- Consistent spacing
- Section heading
- Optional subtitle

---

# Footer

Contains:

- Navigation
- Social Links
- Copyright
- Back to top

---

# Component Props

Components should expose:

- className
- children
- variant
- size
- disabled

Avoid unnecessary props.

---

# Naming Convention

## Component Naming

Project-wide naming conventions are defined in:

docs/database/naming-conventions.md

All components must follow those conventions.

---

# Folder Convention

Each reusable component:

components/

Button/

Button.tsx

Button.test.tsx

Button.types.ts

index.ts

---

# Accessibility

Every interactive component must:

- Support keyboard navigation.
- Show focus styles.
- Have semantic HTML.
- Include ARIA attributes when necessary.

---

# Performance

Avoid unnecessary re-renders.

Memoize only when profiling indicates benefit.

Prefer Server Components unless client-side interactivity is required.

---

# Design Principles

Every component should be:

- Predictable
- Minimal
- Composable
- Responsive
- Accessible