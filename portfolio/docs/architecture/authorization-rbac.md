# Authorization (RBAC)

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

Define authorization rules independently from authentication.

Authentication answers:

Who are you?

Authorization answers:

What are you allowed to do?

---

# Current Roles

Visitor

Admin

---

# Future Roles

Editor

Moderator

---

# Visitor Permissions

✓ View Portfolio

✓ Contact

✓ Read Blog

✓ Download Resume

✗ Dashboard

---

# Admin Permissions

✓ Full Dashboard

✓ Manage Projects

✓ Manage Blog

✓ Manage Journey

✓ View Messages

✓ Update Portfolio

✓ Settings

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

Responsibilities

- Verify role
- Redirect unauthorized
- Return 403

---

# Principles

Least privilege

Centralized authorization

No duplicated permission checks

---

# Future Permission Matrix

| Feature | Visitor | Editor | Admin |
|----------|----------|---------|--------|
| Blog | Read | Edit | Full |
| Projects | Read | Edit | Full |
| Journey | Read | Edit | Full |
| Contact Messages | No | No | Yes |

---

# Status

Approved