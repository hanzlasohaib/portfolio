# Portfolio

Personal portfolio of **Hanzla Sohaib** — Full Stack Software Engineer & AI Engineer.

Built with a feature-based Next.js App Router architecture. Documentation in `docs/` is the source of truth for scope and design decisions.

---

## Current status

**Phases 1–5 complete (V1).** Production-ready tag: `v1.4-production-ready`.

| Route | Status |
|-------|--------|
| `/` | Live — Hero, About, Projects, Skills, Journey, Contact, Footer |
| `/about` | Live (skills/technologies can load from DB) |
| `/projects` | Live (DB-backed with static fallback) |
| `/journey` | Live (DB-backed with static fallback) |
| `/contact` | Live — form posts to `POST /api/contact` |
| `/login` | Live — JWT cookie auth (+ email OTP MFA when Resend env is set) |
| `/dashboard/**` | Live — protected admin shell + CRUD panels |
| `/projects/[slug]` | Live — project detail (DB-backed with static fallback) |

There is **no** dedicated `/skills` route in V1 — skills appear on Home and `/about`.

### Production notes

Required Vercel env vars (names must match — `POSTGRES_*` / `SUPABASE_*` alone are not enough):

- `DATABASE_URL`
- `DIRECT_URL`
- `JWT_SECRET`
- `NEXT_PUBLIC_SITE_URL` (production site URL)

Do **not** set `NODE_ENV` on Vercel (Vercel sets `production` automatically).

**Test Admin on Vercel (intentional for V1):** Login uses the `User` row in Supabase, not `SEED_ADMIN_*` env vars. Point Vercel `DATABASE_URL` / `DIRECT_URL` at the same database you seeded locally, then sign in at `/login` with the same email/password you used for seed (`SEED_ADMIN_EMAIL` / `SEED_ADMIN_PASSWORD`). You do **not** need to add `SEED_ADMIN_*` on Vercel for dashboard login to work — those vars are only for running `npx prisma db seed` (locally, against that DB). Seed still refuses to run when `NODE_ENV=production`.

**Email OTP MFA (optional):** When all three are set on the host, password login requires a code emailed to your real inbox:

- `RESEND_API_KEY`
- `RESEND_FROM_EMAIL`
- `MFA_NOTIFY_EMAIL`

Login identity stays the Test Admin email; codes go to `MFA_NOTIFY_EMAIL`, not `admin@example.com`. Without these vars, login stays password-only.

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
