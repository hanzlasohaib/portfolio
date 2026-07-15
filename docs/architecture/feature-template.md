# Feature Template

> Version: 1.0

> Status: Draft

---

# Purpose

This document defines the standard structure every feature must follow.

Every new feature should use this template.

---

# Feature Goals

Each feature should be:

- Self-contained
- Independent
- Reusable
- Testable
- Easy to maintain

---

# Standard Structure

```text
feature-name/

components/
hooks/
schemas/
services/
repositories/
types/
constants/
utils/

actions/
route-handlers/

index.ts
README.md
```

---

# Responsibilities

## components/

React UI only.

No database access.

---

## hooks/

Feature-specific hooks.

---

## schemas/

Zod validation schemas.

Shared by frontend and backend where possible.

---

## services/

Business logic.

Coordinates repositories and validation.

---

## repositories/

Database access only.

Uses Prisma.

No business rules.

---

## types/

Feature-specific TypeScript types.

---

## constants/

Configuration specific to the feature.

---

## utils/

Pure helper functions.

No side effects.

---

## actions/

Server Actions (when applicable).

---

## route-handlers/

API endpoints for the feature.

Thin controllers only.

---

## index.ts

Public API for the feature.

Expose only what other modules need.

---

# Dependency Rules

Allowed:

```text
components
    ↓
hooks
    ↓
services
    ↓
repositories
    ↓
Prisma
```

Forbidden:

- Components → Prisma
- Components → Repositories
- Repositories → Components
- Services → React UI
- Repositories → Route Handlers

---

# Example

```text
features/

communication/

contact/

components/
ContactForm.tsx
ContactInfo.tsx

hooks/
useContact.ts

schemas/
contact.schema.ts

services/
contact.service.ts

repositories/
contact.repository.ts

types/
contact.types.ts

constants/
contact.constants.ts

utils/
contact.mapper.ts

actions/
submit-contact.ts

route-handlers/
contact.route.ts

index.ts
README.md
```

---

# Checklist

Before creating a feature, verify:

- Clear ownership
- Validation defined
- Service layer identified
- Repository required?
- Shared code extracted?
- Tests planned?

---

# Status

Approved (Draft v1.0)