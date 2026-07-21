# Implementation Roadmap

Implementation Roadmap
│
├── Phase 1 – UI Foundation
│      □ Global Styling
│      □ Layout System
│      □ Base Components
│      □ Navigation
│      □ Theme System
│      ✓ Phase Review
│      ✓ Git Tag
│
├── Phase 2 – Public Pages
│      □ Hero
│      □ About
│      □ Projects
│      □ Journey
│      □ Contact
│      ✓ Phase Review
│      ✓ Git Tag
│
│      Note: Skills may appear as a landing/about section.
│      There is no dedicated /skills route in V1
│      (see project-scope.md).
│

## Phase 3 – Backend Foundation

Status: Completed (2026-07-21)

Auth and dashboard shell land inside Phase 3 (former Phase 4
dashboard foundation). Quality and Release follow Phase 3.

Git tag: `v1.2-backend` (initial) / `v1.3-phase3-complete` (close)

```text
Phase 3.1 – Foundation + Auth + Seed
       ├── Prisma schema + migrate
       ├── Supabase PostgreSQL connection
       ├── Typed environment (`config/env.ts`, `.env.example`)
       ├── Authentication (login / logout Route Handlers + JWT cookie)
       ├── Idempotent seed (Test Admin)
       └── Verify login API + cookie

Phase 3.2 – Dashboard shell + protection
       ├── Middleware (session validation)
       ├── Dashboard route shell + placeholders
       ├── Role protection (ADMIN)
       ├── Login UI wired to API
       └── Verify: sign-in, refresh session, protect routes, sign-out

Phase 3.3+ – Feature data + CRUD
       ├── Contact (POST /api/contact + messages)
       ├── Projects (+ Technology M2M)
       ├── Journey
       ├── Skills (content; no /skills route)
       └── About (static constants unless DB fields are required)
```

Phase 3 verification (manual):

- [x] Contact form persists via `POST /api/contact`
- [x] Projects / Journey / Skills read from DB (with static fallback)
- [x] Dashboard CRUD for projects, journey, messages
- [x] Production login / dashboard session verified on Vercel

## Phase 4 – Quality

Status: In Progress

```text
Phase 4 – Production readiness
       ├── Security headers (Next.js)
       ├── Manual / production smoke checklist
       ├── Accessibility & SEO review
       ├── Security checklist (V1-applicable items)
       ├── Keep Test Admin for V1 (sign in on Vercel via seeded DB user)
       └── Performance / Lighthouse pass
```

Deferred to later ADRs / not blocking Phase 4 close unless required:

- Rate limiting
- reCAPTCHA
- Resend email delivery

## Phase 5 – Release

Status: Deferred until Phase 4 is completed.

Target tag: `v1.4-production-ready`

---

# Development Workflow

Every implementation task follows the same development cycle to ensure quality, maintainability, and incremental progress.

```
Plan
    ↓
Implement
    ↓
Verify
    ↓
Review
    ↓
Commit
    ↓
Push
    ↓
Tag (when a major phase is completed)
```

## Workflow Steps

### 1. Plan

- Review the relevant documentation.
- Confirm architectural constraints.
- Define the implementation scope.

### 2. Implement

- Build only the planned functionality.
- Keep changes focused and small.
- Follow project naming conventions and coding standards.

### 3. Verify

- Confirm the implementation behaves as expected.
- Run the appropriate verification commands.
- Resolve issues before continuing.

### 4. Review

- Ensure the implementation matches the architecture.
- Check code readability and reusability.
- Remove unnecessary code or duplication.

### 5. Commit

- Create a small, milestone-based commit.
- Use Conventional Commits.

Example:

```text
feat(ui): implement reusable Button component
```

### 6. Push

- Push the completed milestone to the remote repository.

### 7. Tag

Create an annotated Git tag after completing a major implementation phase.

Examples:

```text
v1.1-ui-foundation
v1.2-public-pages
v1.3-backend-foundation
v1.4-production-ready
```

---

## Phase 1 – UI Foundation

### Verification Checklist

- [ ] Application starts successfully.
- [ ] No TypeScript errors.
- [ ] No ESLint warnings or errors.
- [ ] Components render correctly.
- [ ] Responsive layouts verified.
- [ ] Accessibility basics verified.

  Commands:
   - npm run lint
   - npm run typecheck
   - npm run build

### Verification Workflow

Every milestone must pass the full verification pipeline:

```text
npm run lint
npm run typecheck
npm run build
```

If any command fails, fix the issue and re-run the complete pipeline. Do not commit failing code.

Only after all verification commands succeed may the implementation proceed to Review and Commit.

---

## Phase 2 – Public Pages

### Verification Checklist

- [ ] All sections render correctly.
- [ ] Navigation works.
- [ ] Mobile layout verified.
- [ ] Images load correctly.
- [ ] Metadata configured.

  Commands:
   - npm run lint
   - npm run typecheck
   - npm run build

### Verification Workflow

Every milestone must pass the full verification pipeline:

```text
npm run lint
npm run typecheck
npm run build
```

If any command fails, fix the issue and re-run the complete pipeline. Do not commit failing code.

Only after all verification commands succeed may the implementation proceed to Review and Commit.

---

## Phase 3.1 – Foundation + Auth + Seed

### Verification Checklist

- [ ] Environment variables loaded via `config/env.ts`.
- [ ] Prisma client generated.
- [ ] Database connection verified.
- [ ] Migration completed successfully.
- [ ] Seed creates Test Admin idempotently (`npx prisma db seed`).
- [ ] Login sets HTTP-only JWT cookie; logout clears it.

  Commands:
   - npm run lint
   - npm run typecheck
   - npm run build
   - npx prisma validate
   - npx prisma generate
   - npx prisma migrate dev
   - npx prisma db seed

### Verification Workflow

Every milestone must pass the full verification pipeline:

```text
npm run lint
npm run typecheck
npm run build
```

If any command fails, fix the issue and re-run the complete pipeline. Do not commit failing code.

Only after all verification commands succeed may the implementation proceed to Review and Commit.

Phase 3.1 also requires the Prisma commands listed above before proceeding.

---

## Phase 3.2 – Dashboard shell + protection

### Verification Checklist

- [ ] Authentication works in the browser (login UI).
- [ ] Session remains valid after refresh.
- [ ] Protected `/dashboard/*` routes redirect guests to `/login`.
- [ ] Authenticated users are redirected away from `/login`.
- [ ] Sign-out clears the session.
- [ ] ADMIN role is applied for dashboard access.
- [ ] Thin authenticated mutation / session ping succeeds.

  Commands:
   - npm run lint
   - npm run typecheck
   - npm run build

### Verification Workflow

Every milestone must pass the full verification pipeline:

```text
npm run lint
npm run typecheck
npm run build
```

If any command fails, fix the issue and re-run the complete pipeline. Do not commit failing code.

Only after all verification commands succeed may the implementation proceed to Review and Commit.

---

## Phase 3.3+ – Feature data + CRUD

### Verification Checklist

- [ ] Contact form persists via `POST /api/contact`.
- [ ] Projects / Journey / Skills read from the database on public pages.
- [ ] Dashboard Server Actions support admin CRUD for managed entities.
- [ ] Forms validated with Zod (client + server).

  Commands:
   - npm run lint
   - npm run typecheck
   - npm run build

### Verification Workflow

Every milestone must pass the full verification pipeline:

```text
npm run lint
npm run typecheck
npm run build
```

If any command fails, fix the issue and re-run the complete pipeline. Do not commit failing code.

Only after all verification commands succeed may the implementation proceed to Review and Commit.

---

## Phase 4 – Production Readiness (Quality)

### Verification Checklist

- [ ] All manual tests passed (`docs/testing/quality-checklist.md`)
- [ ] Performance targets achieved
- [ ] Accessibility reviewed
- [ ] SEO configured
- [x] Baseline security headers (`next.config.ts`)
- [ ] Security checklist V1 items completed (`docs/security/security-checklist.md`)
- [x] Test Admin retained for V1 (no requirement to remove/replace)

  Commands:
   - npm run lint
   - npm run typecheck
   - npm run build

### Verification Workflow

Every milestone must pass the full verification pipeline:

```text
npm run lint
npm run typecheck
npm run build
```

If any command fails, fix the issue and re-run the complete pipeline. Do not commit failing code.

Only after all verification commands succeed may the implementation proceed to Review and Commit.

---

## Milestone Completion Checklist

Use this checklist before completing any implementation milestone
(Global Styling, Layout System, Navigation, Theme System, etc.).

- [ ] Scope matches the current roadmap milestone.
- [ ] Relevant documentation reviewed.
- [ ] Implementation completed.
- [ ] `npm run lint` passes.
- [ ] `npm run typecheck` passes.
- [ ] `npm run build` passes.
- [ ] Manual browser verification completed.
- [ ] No unrelated files were modified.
- [ ] Conventional Commit created.
- [ ] Changes pushed to remote repository.

---

## Definition of Done

A phase is considered complete only when:

- Planned deliverables are implemented.
- `npm run lint` passes.
- `npm run typecheck` passes.
- `npm run build` passes.
- Manual browser verification is completed.
- Documentation is updated.
- Changes are committed and pushed.
- Phase Review is completed.
- An annotated Git tag is created (major phase completion only).

---

## Phase Summary

Status:

- [ ] Not Started
- [ ] In Progress
- [ ] Completed

Completed On:

> YYYY-MM-DD

Git Tag:

> v1.1-ui-foundation

Notes:

> Additional observations or lessons learned.
