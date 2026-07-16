# State Management Strategy

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

# Purpose

Define where application state should live to avoid unnecessary global state and improve maintainability.

---

# Guiding Principle

Keep state as close as possible to where it is used.

Do not introduce global state unless multiple distant components genuinely require it.

---

# State Hierarchy

```text
Database

↓

Server Components

↓

URL State

↓

React Context

↓

Local Component State
```

Always prefer the highest level that naturally owns the data.

---

# Server State

Examples

- Projects
- Blog Posts
- Journey Entries
- Contact Messages

Fetched using Server Components whenever possible.

Avoid duplicating server data in Context.

---

# Client State

Examples

- Modal open/close
- Form inputs
- Active tab
- Loading indicators
- Accordion state

Use `useState`.

---

# URL State

Use search parameters for shareable UI state.

Examples

- Pagination
- Filters
- Search
- Sort order

Benefits

- Bookmarkable
- Shareable
- Browser navigation support

---

# React Context

Use only for truly global concerns.

Examples

- Theme
- Authentication Session
- Toast Provider

Do not store feature-specific state in Context.

---

# Server Actions / Route Handlers

Responsibilities

- Validate input
- Execute business logic
- Return typed responses

---

# Future Client Cache

If client-side data synchronization becomes complex, introduce TanStack Query.

Not required for v1.

---

# State Ownership

| Data | Owner |
|------|-------|
| Theme | Context |
| Authentication | Context / HTTP-only Cookie |
| Contact Form | Local State |
| Projects | Server Components |
| Blog | Server Components |
| Dashboard Metrics | Server Components |
| Search Params | URL |

---

# Anti-Patterns

- Large global Context objects
- Duplicating server state in client state
- Passing props through many component levels
- Storing derived state unnecessarily

---

# Status

Approved (Draft v1.0)