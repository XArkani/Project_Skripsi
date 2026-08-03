# Quickstart: Faculty Website & Admin CMS

## Prerequisites

- Bun installed
- Neon PostgreSQL database with `DATABASE_URL`
- UploadThing account with `UPLOADTHING_TOKEN`
- Better Auth configured (see `lib/auth.ts`)

## Setup

```bash
# Install dependencies
bun install

# Generate Prisma client
bunx prisma generate

# Push schema to database
bunx prisma db push

# Seed initial data
bunx prisma db seed

# Start dev server
bun dev
```

## Environment Variables

See `.env.example` for required variables:
- `DATABASE_URL` — Neon PostgreSQL connection string
- `UPLOADTHING_TOKEN` — UploadThing v7 token
- `BETTER_AUTH_SECRET` — Better Auth secret
- `BETTER_AUTH_URL` — Application URL

## Key Scripts

| Command | Description |
|---------|-------------|
| `bun dev` | Start dev server |
| `bun run lint` | Run ESLint |
| `bun run typecheck` | Run TypeScript check |
| `bunx prisma db push` | Sync schema to DB |
| `bunx prisma generate` | Regenerate Prisma client |
| `bunx prisma studio` | Open Prisma Studio |

## Project Structure

- `app/(public)/` — Public pages (no auth)
- `app/(dashboard)/` — Admin pages (auth required)
- `app/api/auth/[...all]` — Better Auth API
- `app/api/uploadthing` — UploadThing API
- `components/ui/` — shadcn/ui primitives
- `components/public/` — Public page components
- `components/admin/` — Admin CMS components
- `lib/` — Business logic, auth, upload config
- `prisma/` — Schema, migrations, seeds

## Architecture

- **Data fetching**: `"use cache"` + `cacheTag` + `revalidateTag("tag", "max")`
- **Mutations**: Server Actions with `"use server"`
- **Auth**: Better Auth via `lib/auth.ts`, session in layouts
- **Route protection**: `proxy.ts` (not `middleware.ts`)
- **File uploads**: UploadThing v7 with token-only config
- **UI**: Bahasa Indonesia, shadcn/ui + Tailwind CSS v4
