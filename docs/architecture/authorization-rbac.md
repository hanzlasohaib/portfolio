# Authorization (RBAC)

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

Define authorization rules independently from authentication.

Authentication answers: Who are you?

Authorization answers: What are you allowed to do?

---

# Current Roles

| Role | Storage |
|------|---------|
| Visitor | Unauthenticated user (no JWT). Not a database role. |
| Admin | Authenticated user with `UserRole.ADMIN` |

---

# Future Roles

- Editor
- Moderator

---

# Visitor Permissions (V1)

✓ View portfolio website (public pages)

✓ View Projects and Project Details

✓ View Journey

✓ Submit Contact form

✓ Download Resume (static asset, if published)

✗ Dashboard

✗ Admin mutations

---

# Admin Permissions (V1)

✓ Full Dashboard (`/dashboard`)

✓ Manage Projects (`/dashboard/projects`)

✓ Manage Journey (`/dashboard/journey`)

✓ View / manage Contact Messages (`/dashboard/messages`)

✓ Settings (`/dashboard/settings`)

---

# Authorization Flow

```text
JWT Verified
    ↓
Extract Role
    ↓
Permission Check
    ↓
Allow / Deny
```

---

# Middleware

Responsibilities:

- Verify role for `/dashboard/**`
- Redirect unauthenticated users to `/login`
- Return 403 for authenticated users lacking permission (future multi-role)

`/login` is public and must not be treated as a protected route.

---

# Principles

- Least privilege
- Centralized authorization
- No duplicated permission checks

---

# Future Permission Matrix

| Feature | Visitor | Editor | Admin |
|----------|----------|---------|--------|
| Projects | Read | Edit | Full |
| Journey | Read | Edit | Full |
| Contact Messages | Submit only | No | Yes |
| Blog | Read (Future) | Edit (Future) | Full (Future) |

---

# Status

**Status:** Approved
