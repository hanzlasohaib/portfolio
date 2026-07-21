# Portfolio

Personal portfolio of **Hanzla Sohaib** — Full Stack Software Engineer & AI Engineer.

Built with a feature-based Next.js App Router architecture. Documentation in `docs/` is the source of truth for scope and design decisions.

---

## Current status

**Phases 1–2 complete** (UI foundation + public pages).

| Route | Status |
|-------|--------|
| `/` | Live — Hero, About, Projects, Skills, Journey, Contact, Footer |
| `/about` | Live |
| `/projects` | Live (search + technology filter) |
| `/journey` | Live |
| `/contact` | Live (form UI; submission deferred to backend) |
| `/login` | Route exists (placeholder; auth in later phase) |
| `/projects/[slug]` | Planned (V1 scope; not implemented yet) |
| `/dashboard/**` | Planned (Phase 4) |

There is **no** dedicated `/skills` route in V1 — skills appear on Home and `/about`.

---

## Stack (implemented today)

- **Next.js 16** (App Router, Turbopack)
- **React 19**
- **TypeScript**
- **Tailwind CSS v4**

### Planned (later phases)

- Prisma + Supabase
- Auth (login / protected dashboard)
- Contact form API + validation
- Admin dashboard

---

## Features (public site)

- Responsive one-page Home with section navigation
- Dedicated About, Projects, Journey, and Contact pages
- Project preview modal + live demo links
- Theme toggle (light / dark)
- Scroll progress bar + floating back-to-top
- SEO: per-page metadata, Open Graph image, JSON-LD, `sitemap.xml`, `robots.txt`

---

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

No `.env` is required for local UI development today. When deploying, set `NEXT_PUBLIC_SITE_URL` for canonical SEO URLs (see `src/config/site.ts`).

---

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Production build |
| `npm run start` | Serve production build |
| `npm run lint` | ESLint |
| `npm run typecheck` | TypeScript (`tsc --noEmit`) |

> Note: the script name is `typecheck` (no hyphen).

---

## Project structure

```text
src/
├── app/                 # App Router (route groups: public, auth, dashboard)
├── components/          # Shared UI primitives
├── features/            # Feature modules (about, projects, journey, contact, …)
├── constants/           # Shared constants (personal, navigation, SEO)
├── config/              # Site / metadata config
├── hooks/               # Shared hooks
├── providers/           # App providers (theme)
└── styles/              # Design tokens + global CSS

docs/                    # Architecture & project design
AGENTS.md                # Implementation rules for agents & contributors
```

Pages stay thin; business UI lives in `src/features/*` (see `docs/architecture/feature-template.md`).

---

## Documentation

Start here:

- [`AGENTS.md`](./AGENTS.md) — implementation rules & priority of truth
- [`docs/README.md`](./docs/README.md) — docs index
- [`docs/project-design/project-scope.md`](./docs/project-design/project-scope.md) — V1 scope & routes
- [`docs/implementation-roadmap.md`](./docs/implementation-roadmap.md) — phases
- [`docs/architecture/`](./docs/architecture/) — routing, folder structure, SEO, etc.

---

## Roadmap

1. **Phase 1** — UI foundation ✓  
2. **Phase 2** — Public pages ✓  
3. **Phase 3** — Backend foundation (Prisma, API, contact submit, auth)  
4. **Phase 4** — Dashboard  
5. **Phase 5** — Quality  
6. **Phase 6** — Release  

---

## License

Private portfolio project.
