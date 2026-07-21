# Portfolio

Personal portfolio of **Hanzla Sohaib** — Full Stack Software Engineer & AI Engineer.

Built with a feature-based Next.js App Router architecture. Documentation in `docs/` is the source of truth for scope and design decisions.

---

## Current status

**Phases 1–3 complete.** **Phase 4 (Quality) in progress.**

| Route | Status |
|-------|--------|
| `/` | Live — Hero, About, Projects, Skills, Journey, Contact, Footer |
| `/about` | Live (skills/technologies can load from DB) |
| `/projects` | Live (DB-backed with static fallback) |
| `/journey` | Live (DB-backed with static fallback) |
| `/contact` | Live — form posts to `POST /api/contact` |
| `/login` | Live — JWT cookie auth |
| `/dashboard/**` | Live — protected admin shell + CRUD panels |
| `/projects/[slug]` | Planned (V1 scope; not implemented yet) |

There is **no** dedicated `/skills` route in V1 — skills appear on Home and `/about`.

### Production notes

Required Vercel env vars (names must match — `POSTGRES_*` / `SUPABASE_*` alone are not enough):

- `DATABASE_URL`
- `DIRECT_URL`
- `JWT_SECRET`
- `NEXT_PUBLIC_SITE_URL` (production site URL)

Do **not** set `SEED_ADMIN_*` or `NODE_ENV` on Vercel. Seed is local/dev only.

**Replace the demo admin before treating production as locked down:** create a real admin (or update the seeded user’s email/password hash in Supabase), rotate `JWT_SECRET` if it was ever shared, and stop using `admin@example.com` / seed passwords.

---

## Stack

- **Next.js 16** (App Router, Turbopack)
- **React 19**
- **TypeScript**
- **Tailwind CSS v4**
- **Prisma** + **Supabase PostgreSQL**
- **Zod** validation
- **JWT** (HTTP-only cookie) + **bcryptjs**

---

## Getting started

```bash
npm install
cp .env.example .env
# Fill DATABASE_URL, DIRECT_URL, JWT_SECRET, NEXT_PUBLIC_SITE_URL,
# and development seed vars (SEED_ADMIN_*).
npx prisma migrate dev
npx prisma db seed
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Sign in at `/login` with the seeded Test Admin (`SEED_ADMIN_EMAIL` / `SEED_ADMIN_PASSWORD`).

---

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Generate Prisma client + production build |
| `npm run start` | Serve production build |
| `npm run lint` | ESLint |
| `npm run typecheck` | TypeScript (`tsc --noEmit`) |
| `npx prisma migrate dev` | Apply migrations |
| `npx prisma db seed` | Seed Test Admin + demo content (dev only) |

> Note: the script name is `typecheck` (no hyphen).

---
