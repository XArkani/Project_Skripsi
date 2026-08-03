<!-- BEGIN:nextjs-agent-rules -->
 
# Next.js: ALWAYS read docs before coding
 
Before any Next.js work, find and read the relevant doc in `node_modules/next/dist/docs/`. Your training data is outdated — the docs are the source of truth.
 
<!-- END:nextjs-agent-rules -->

<!-- SPECKIT START -->
For additional context about technologies to be used, project structure,
shell commands, and other important information, read the implementation plan:
`specs/001-faculty-website/plan.md`
<!-- SPECKIT END -->

# Prisma: schema change = migrate + generate (NEVER generate alone)

- After ANY edit to `prisma/schema.prisma`, run BOTH:
  1. `bunx prisma migrate dev --name <short-description>` (creates + applies migration)
  2. `bunx prisma generate` (regenerates client)
- `prisma generate` alone NEVER touches the database — running it without a
  migration causes runtime errors like "column does not exist".
- Required columns (no default) added to tables that already have rows cannot
  be executed automatically. Use `migrate dev --create-only` (or a manual
  migration file) to add the column as nullable, backfill data, then `SET NOT NULL`.
- Use `bunx prisma migrate deploy` for non-interactive application of pending migrations.

# RSC boundary: data modules stay on the server

- `"use client"` files MUST NEVER import modules that contain `"use cache"`,
  `"use server"`, or Prisma (`lib/faculty.ts`, `lib/prisma.ts`, `lib/actions.ts`).
  The whole module gets bundled into the client, and Next.js fails the build
  with "It is not allowed to define inline 'use cache' annotated functions in
  Client Components".
- Pattern: Server Component fetches data (`getFAQs()` etc.), passes serializable
  results as props to a Client Component child (`components/sections/FaqSearch.tsx`).

# Build verification is mandatory (typecheck + lint are NOT enough)

- RSC boundary violations and uncached-data-in-static-route errors ("Uncached
  data was accessed outside of <Suspense>") only surface in `next build`,
  never in `tsc`/`eslint`.
- After touching any page that fetches data, run `bunx next build` and verify
  it completes.
- Dynamic data (`headers()`, `cookies()`, `searchParams`) accessed at the top
  of a layout/page that otherwise renders `"use cache"` data must be wrapped
  in a `<Suspense>` boundary (see `app/(dashboard)/layout.tsx` pattern).
