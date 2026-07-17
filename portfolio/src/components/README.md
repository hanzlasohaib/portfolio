# Components

Shared, presentation-only UI for the portfolio application.

---

## Shared Layout Components

Reusable application layout primitives used by route-group layouts and pages:

- `Container`
- `Section`
- `Main`
- `PageWrapper`
- `ContentWrapper`
- `Header`
- `Footer`
- `LayoutShell`
- `PublicLayout`
- `DashboardLayout`
- `AuthLayout`

These define structure, spacing, and semantic landmarks. They must not contain business logic.

---

## Base UI Components

Reusable UI primitives. Typography primitives are available now; remaining
controls arrive in later Base Components work.

Implemented:

- `Heading`
- `Text`
- `Label`
- `Divider`
- `Button`
- `IconButton`
- `Badge`
- `Link`
- `ExternalLink`

Planned:

- `Card`
- `Input`
- `Textarea`
- `Avatar`
- `Spinner`

Keep these generic and reusable across features.

---

## Feature Components

Feature-specific UI belongs inside:

```text
src/features/<feature>/components/
```

Examples:

```text
src/features/projects/components/
src/features/journey/components/
```

Do not move feature components into `src/components`.

---

## Rules

- Place only shared components in this directory.
- No business logic.
- No API calls.
- No Prisma.
- Prefer reuse over duplication.
- Feature-specific UI stays inside `src/features/*/components/`.

Import shared components via the root barrel when possible:

```ts
import { Container, Heading, Section } from "@/components";
```
