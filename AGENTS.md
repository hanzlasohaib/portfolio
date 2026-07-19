<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes. APIs, conventions, rendering behavior, and file structure may differ from your training data.

Before writing any Next.js code:

- Read the relevant documentation in `node_modules/next/dist/docs/`.
- Follow current Next.js conventions.
- Respect deprecation notices.
- Do not rely on outdated APIs.
<!-- END:nextjs-agent-rules -->

# AGENTS.md

This document defines the global implementation rules for this project.

Every implementation must follow these instructions.

---

# Phase Rules

Implementation must follow the current phase defined in:

`docs/implementation-roadmap.md`

Do not implement work from future phases unless explicitly instructed.

If a requested feature belongs to a later phase:

- Report it.
- Explain why.
- Do not partially implement future architecture.

---

# Documentation First

Before writing code:

1. Read AGENTS.md.
2. Read every document directly related to the requested feature.
3. Understand the existing implementation.
4. Reuse existing architecture whenever possible.

Never skip documentation.

---

# Analysis First

Before modifying files:

1. Explain the current implementation.
2. List files that will be changed.
3. Mention reusable components.
4. Mention relevant documentation.
5. Report documentation conflicts.
6. Explain the implementation plan.

Do not immediately begin writing code.

---

# Architecture Rules

Always follow the project's feature-based architecture.

Never:

- duplicate code
- duplicate components
- duplicate layouts
- duplicate business logic

Prefer reuse over creation.

App Router pages should remain thin.

Business logic belongs inside feature modules.

Shared UI belongs inside shared components.

Feature-specific UI belongs inside feature folders.

---

# Documentation Priority (Priority of Truth)

1. AGENTS.md
2. docs/project-design/project-scope.md
3. docs/database/prisma-schema-planning.md
4. docs/architecture/routing-strategy.md
5. docs/implementation-roadmap.md

If two documents conflict:

- Never merge both behaviors.
- Follow the higher priority document.
- Report the conflict.
- Do not invent hybrid behavior.

---

# Configuration Rules

Never hardcode:

- passwords
- API keys
- secrets
- tokens
- database URLs
- private credentials
- email credentials

Always load configuration from environment variables.

If an environment variable is missing:

- Report it.
- Never invent a value.

Canonical configuration documentation:

- `.env.example`
- `docs/architecture/backend-architecture.md`

---

# Code Quality Rules

Generate production-ready code.

Never:

- use `any`
- ignore TypeScript errors
- disable ESLint
- bypass type safety
- leave placeholder implementations
- leave TODOs as completed work

Prefer:

- strict typing
- composition
- reusable components
- accessibility
- semantic HTML
- responsive layouts

---

# Existing Code First

Before creating:

- component
- hook
- utility
- helper
- constant
- provider

Search the project first.

Reuse existing implementations whenever possible.

Do not create duplicate abstractions.

---

# Performance

Prefer:

- Server Components where appropriate
- lazy loading
- optimized images
- code splitting
- metadata optimization

Avoid unnecessary client components.

Maintain strong Lighthouse scores.

---

# Accessibility

Always maintain:

- semantic HTML
- keyboard accessibility
- focus visibility
- aria attributes where needed
- sufficient color contrast

Accessibility is never optional.

---

# Validation Before Completion

Before marking any implementation complete, verify:

```bash
npm run lint
npm run typecheck
npm run build
```

If any command would fail:

- report the issue
- do not claim the work is complete

---

# Git Rules

Produce clean, logical commits.

Do not modify unrelated files.

Keep pull requests focused.

Avoid unnecessary refactoring unless explicitly requested.

---

# Communication Rules

When implementing a feature:

Always explain:

- what is changing
- why it is changing
- which files are affected
- how it follows the architecture
- any tradeoffs

Never silently make architectural decisions.

Always explain them.

---

# Long-Term Maintainability

Optimize for maintainability over speed.

Choose solutions that align with:

- project architecture
- documentation
- scalability
- readability
- future phases

Avoid shortcuts that create technical debt.

---

## Cursor Cloud specific instructions

Stack: Next.js 16 (App Router, Turbopack) + React 19 + TypeScript + Tailwind CSS v4, package manager is npm (Node 22 works). This is a single web app, not a monorepo.

Commands (from `package.json`): `npm run dev` (dev server on http://localhost:3000), `npm run lint`, `npm run typecheck`, `npm run build`. Note `README.md` says `npm run type-check`, but the real script is `npm run typecheck` (no hyphen).

No database, `.env`, or external services are required to run today. The backend (Prisma/Supabase/JWT/Zod) described in `README.md` and `docs/` is planned for later phases and is NOT yet implemented — there is no `prisma/schema.prisma`, no API route handlers, and no `.env.example`.

Only two pages currently exist (Phase 1/2 per `docs/implementation-roadmap.md`): `/` (home, composed of Hero/About/Projects/Skills feature sections) and `/login`. Other routes (`/about`, `/projects`, `/journey`, `/contact`) return 404 by design, and `/login` renders `null` for now — these are not bugs.