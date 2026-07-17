# Validation Strategy

> Version: 1.0.0
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

This document is the **single source of truth** for V1 validation rules.

Zod schemas must be generated to match these rules exactly.

Feature-specific schemas live in `features/<name>/schemas/`.

Shared helpers (for example email format) may live in `lib/validators/`.

---

# Principles

- Validate on the client for UX and on the server for security.
- Never trust client input.
- Reuse the same Zod schemas on both sides where practical.
- Return field-level errors as `Record<string, string>` in API error responses.

---

# V1 Validation Rules

## Login

| Field | Required | Rules |
|-------|----------|--------|
| `email` | Yes | Valid email format; trim; max 255 characters |
| `password` | Yes | Min 8 characters; max 128 characters |

Notes:

- Password complexity beyond minimum length is not required in V1.
- Forgot Password / reset is out of scope for V1.

---

## Contact

| Field | Required | Rules |
|-------|----------|--------|
| `fullName` | Yes | Trim; min 2; max 100 characters |
| `email` | Yes | Valid email format; trim; max 255 characters |
| `subject` | Yes | Trim; min 3; max 150 characters |
| `message` | Yes | Trim; min 10; max 2000 characters |

Optional server-captured (not user form fields):

| Field | Required | Rules |
|-------|----------|--------|
| `ipAddress` | No | Max 64 characters if present |
| `userAgent` | No | Max 512 characters if present |

---

## Projects

| Field | Required | Rules |
|-------|----------|--------|
| `title` | Yes | Trim; min 3; max 120 characters |
| `slug` | Yes | Lowercase kebab-case (`^[a-z0-9]+(?:-[a-z0-9]+)*$`); min 3; max 120; **unique** |
| `shortDescription` | Yes | Trim; min 10; max 300 characters |
| `description` | Yes | Trim; min 20; max 10000 characters |
| `thumbnail` | No | Valid URL string if present; max 2048 characters |
| `repositoryUrl` | No | Valid URL string if present; max 2048 characters |
| `liveUrl` | No | Valid URL string if present; max 2048 characters |
| `featured` | No | Boolean; default `false` |
| `published` | No | Boolean; default `false` |
| `displayOrder` | No | Integer ≥ 0; default `0` |
| `technologyIds` | No | Array of UUID strings |

Cover/thumbnail images are URL strings only (no file upload).

---

## Journey

| Field | Required | Rules |
|-------|----------|--------|
| `title` | Yes | Trim; min 3; max 120 characters |
| `organization` | No | Trim; max 120 characters |
| `description` | No | Trim; max 5000 characters |
| `location` | No | Trim; max 120 characters |
| `startDate` | Yes | Valid date (ISO date or DateTime) |
| `endDate` | No | Valid date; if present must be ≥ `startDate` |
| `displayOrder` | No | Integer ≥ 0; default `0` |

---

## Skill (content; no dedicated public route in V1)

| Field | Required | Rules |
|-------|----------|--------|
| `name` | Yes | Trim; min 2; max 80 characters |
| `category` | No | Trim; max 80 characters |
| `icon` | No | URL or icon key string; max 2048 characters |
| `displayOrder` | No | Integer ≥ 0; default `0` |

---

## Technology

| Field | Required | Rules |
|-------|----------|--------|
| `name` | Yes | Trim; min 1; max 80 characters; **unique** |
| `icon` | No | Max 2048 characters |
| `color` | No | Max 32 characters |

---

# Shared Formats

| Format | Rule |
|--------|------|
| Email | Standard email; case-insensitive comparison for uniqueness where applicable |
| UUID | RFC 4122 string |
| Kebab-case slug | `^[a-z0-9]+(?:-[a-z0-9]+)*$` |
| URL | Absolute `http` or `https` URL |

---

# Related Documents

- `docs/api/response-format.md`
- `docs/database/prisma-schema-planning.md`
- `docs/architecture/authentication.md`
- `docs/project-design/project-scope.md`

---

# Status

**Status:** Approved
