# Development Conventions

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

This document defines coding, naming, import, formatting, and architectural conventions used throughout the project.

Consistency is mandatory.

---

# Naming Conventions

## Component Naming

Project-wide naming conventions are defined in:

docs/database/naming-conventions.md

All components must follow those conventions.

---

## Hooks

camelCase

```text
useTheme.ts
useContact.ts
```

---

## Utilities

camelCase

```text
formatDate.ts
generateSlug.ts
```

---

## Routes

kebab-case

Authoritative V1 inventory: `docs/project-design/project-scope.md`

```text
/projects
/journey
/contact
/login
/dashboard
```

Future (not V1): `/blog`

---

## Constants

camelCase file names

```text
personal.ts
routes.ts
navigation.ts
seo.ts
```

---

## Types

PascalCase

```ts
User
Project
ApiResponse
ContactSubmission
```

---

# Import Aliases

```text
@/components
@/features
@/lib
@/hooks
@/config
@/constants
@/types
@/styles
```

Avoid deep relative imports.

---

# Barrel Exports

Allowed only where they improve developer experience.

Do not create unnecessary index files.

---

# TypeScript

- Strict mode enabled
- Avoid `any`
- Prefer `unknown`
- Explicit return types for exported functions
- Shared interfaces in feature or shared types

---

# ESLint

Requirements

- Zero errors
- Zero warnings before merge

---

# Formatting

Prettier controls formatting.

Do not manually format code.

---

# React Conventions

Prefer

Server Components

Use Client Components only when necessary.

---

# Component Rules

One component per file.

Keep components focused.

Extract repeated UI.

---

# Function Rules

Functions should have one responsibility.

Avoid long functions.

Prefer composition.

---

# Error Handling

Never swallow errors.

Always log server-side.

Return typed responses.

---

# Environment Variables

Never hardcode:

- Secrets
- URLs
- Keys

Always access through a centralized env module.

---

# Comments

Comment **why**, not **what**.

Self-documenting code is preferred.

---

# Git Conventions

- Small commits
- Conventional commit messages
- One logical change per commit
- PR-ready code at every commit

---

# Status

**Status:** Approved
