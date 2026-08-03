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
