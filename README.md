# e-commerce-frontend

Next.js (App Router, TypeScript, Tailwind) storefront + dashboards for the
multi-vendor marketplace. Planning docs live in `../docs/`, especially
[10-project-structure.md](../docs/10-project-structure.md) (this repo's
target layout) and [14-execution-checklist.md](../docs/14-execution-checklist.md)
(what to build, in order).

> **Note:** this project pins a very recent Next.js version (16.x) with
> breaking API/convention changes vs. older Next.js. See
> [AGENTS.md](AGENTS.md) — read the docs under `node_modules/next/dist/docs/`
> before relying on prior Next.js knowledge, especially around `middleware`
> vs. `proxy.ts` (see [Structure](#structure) below).

## Prerequisites

Pick **one** of the two setup paths below. Whichever you use, you need:

- **Git**
- **Node.js 20+** and **npm** (this repo uses `package-lock.json`; don't mix
  in yarn/pnpm lockfiles)
- **Docker path**: Docker Engine + Docker Compose v2
- The backend must be running for anything beyond static pages to work —
  see [e-commerce-backend/README.md](../e-commerce-backend/README.md)

## Option A — Docker Compose (recommended)

The backend's `docker-compose.yml` also builds and runs this frontend
alongside Postgres/Redis/MinIO/Celery, so you don't need to run anything
separately.

1. Clone both repos as sibling directories (the backend's Compose file
   references `../e-commerce-frontend` as a build context):

   ```bash
   git clone <backend-repo-url> e-commerce-backend
   git clone <frontend-repo-url> e-commerce-frontend
   ```

2. From either directory:

   ```bash
   docker compose -f ../e-commerce-backend/docker-compose.yml up
   ```

   (If you're already inside `e-commerce-backend/`, just `docker compose up`.)

3. Open http://localhost:3000. `NEXT_PUBLIC_API_BASE_URL` is already set to
   `http://localhost:8000/api/v1` for you inside `docker-compose.yml` — no
   `.env.local` needed in this mode.

4. Code changes on your host hot-reload automatically (the `frontend`
   service mounts this repo as a volume, with `node_modules` and `.next`
   kept container-local via anonymous volumes so your host's `node_modules`
   isn't required/overwritten).

5. Stop everything with `docker compose down` from `e-commerce-backend/`.

## Option B — Standalone (no Docker)

Use this if the backend is already reachable some other way (its own
Docker container, a remote dev server, etc.) and you just want to iterate
on the frontend directly with `npm run dev`.

1. Install dependencies:

   ```bash
   npm install
   ```

2. Copy the env file:

   ```bash
   cp .env.example .env.local
   ```

   By default this points at `http://localhost:8000/api/v1` — edit
   `NEXT_PUBLIC_API_BASE_URL` if your backend runs elsewhere.

3. Make sure the backend is actually running and reachable at that URL
   (see [e-commerce-backend/README.md](../e-commerce-backend/README.md) —
   either its own `docker compose up` or its standalone `runserver` path).

4. Start the dev server:

   ```bash
   npm run dev
   ```

5. Open http://localhost:3000.

## Environment variables

| Variable | Purpose |
|---|---|
| `NEXT_PUBLIC_API_BASE_URL` | Base URL the frontend calls for all API requests (e.g. `http://localhost:8000/api/v1`). Prefixed `NEXT_PUBLIC_` so it's available client-side. |

Never commit `.env.local` (already gitignored) — see
[11-deployment-infra.md](../docs/11-deployment-infra.md).

## Structure

- `app/(storefront)`, `app/(auth)`, `app/(customer)`, `app/(vendor)`,
  `app/(admin)` — route groups by actor (docs/10-project-structure.md).
  Vendor/admin pages live under explicit `/vendor/*` and `/admin/*` URL
  segments (not just their route group) since Next.js route groups don't
  affect the URL — `(vendor)/orders` and `(admin)/orders` would otherwise
  both resolve to `/orders`.
- `components/ui`, `components/domain` — shared presentational components.
- `features/<domain>` — feature-scoped hooks + API calls, one folder per
  backend app (`features/orders` calls `apps/orders`' endpoints, etc).
- `lib/api-client.ts` — fetch wrapper with JWT auth + refresh.
- `proxy.ts` — role-gated route protection. Named `proxy` rather than the
  `middleware.ts` docs/10-project-structure.md mentions, because Next.js 16
  deprecated `middleware` in favor of `proxy` (functionally the same file).

## Scripts

```bash
npm run dev     # dev server (http://localhost:3000)
npm run build   # production build
npm run start   # run the production build locally (run `build` first)
npm run lint    # ESLint
```

CI (`.github/workflows/ci.yml`) runs `lint` and `build` on every push/PR.

## Troubleshooting

- **API calls fail / CORS errors in the browser console** — confirm the
  backend is actually running and that its `DJANGO_CORS_ALLOWED_ORIGINS`
  (backend `.env`) includes `http://localhost:3000`.
- **Port 3000 already in use** — stop whatever else is bound to it, or run
  `npm run dev -- -p 3001` and adjust the backend's CORS origin to match.
- **Stale build after pulling new code** — delete `.next/` and re-run
  `npm run dev`; in Docker, `docker compose build frontend`.
- **Dependency errors after pulling new code** — rerun `npm install`
  (standalone) or `docker compose build frontend` (Docker).
