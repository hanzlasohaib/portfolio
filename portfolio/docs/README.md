# Portfolio Architecture Documentation

## Version

Architecture Baseline **v1.1** (Documentation Reconciliation — 2026-07-17)

---

## Status

Approved

---

## Purpose

This documentation is the approved baseline for Version 1 of the Portfolio website.

All implementation should conform to these documents.

Architectural changes after this point should be introduced through:

- New ADRs
- Documentation updates
- Versioned revisions

---

## Priority of Truth

Defined in `AGENTS.md`:

1. `AGENTS.md`
2. `docs/project-design/project-scope.md`
3. `docs/database/prisma-schema-planning.md`
4. `docs/architecture/routing-strategy.md`
5. `docs/implementation-roadmap.md`

If two documents conflict: never merge; follow the higher-priority document; report the conflict.

---

## Canonical Sources (V1)

| Concern | Source of Truth |
|---------|-----------------|
| V1 routes & scope | `docs/project-design/project-scope.md` |
| Page content outline | `docs/project-design/pages.md` |
| Routing details | `docs/architecture/routing-strategy.md` |
| Prisma models | `docs/database/prisma-schema-planning.md` |
| Folder structure | `docs/architecture/folder-structure.md` |
| Feature-local logic | `docs/adr/ADR-008-feature-local-business-logic.md` |
| Dependencies | `docs/architecture/dependency-graph.md` |
| Environment variables | `docs/architecture/backend-architecture.md` § Environment Configuration |
| Validation rules | `docs/architecture/validation-strategy.md` |
| Implementation phases | `docs/implementation-roadmap.md` |

---

## Documentation Structure

```text
docs/
├── project-design/     # Scope, pages, quality
├── architecture/       # System, frontend, backend, routing, folders
├── database/           # Prisma planning, naming
├── api/                # Response format, endpoints
├── adr/                # Architecture Decision Records
├── ui-ux/              # Design system
├── deployment/         # Deploy docs (many Deferred)
├── testing/            # Testing docs (many Deferred)
└── security/           # Threat model, checklist
```

---

## Reading Order (Phase 1)

1. `AGENTS.md`
2. `docs/project-design/project-scope.md`
3. `docs/implementation-roadmap.md`
4. `docs/architecture/folder-structure.md`
5. `docs/architecture/routing-strategy.md`
6. `docs/ui-ux/design-system.md`

---

## Baseline Tag

Version: **v1.1 Documentation Reconciliation**

Status: **Approved**

Ready for Phase 1 implementation from a documentation consistency standpoint.
