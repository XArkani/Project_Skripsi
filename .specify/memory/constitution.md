<!--
  Sync Impact Report

  Version change: (none → 1.0.0)
  - Initial constitution creation from template.

  Modified principles:
  - (all new — first draft)

  Added sections:
  - Core Principles (5 principles)
  - Technology Stack & Constraints
  - Development Workflow
  - Governance

  Removed sections:
  - (none — first draft)

  Templates requiring updates:
  - .specify/templates/plan-template.md ✅ (no changes needed — already generic)
  - .specify/templates/spec-template.md ✅ (no changes needed — already generic)
  - .specify/templates/tasks-template.md ✅ (no changes needed — already generic)

  Follow-up TODOs: None.
-->

# Project Skripsi Constitution

## Core Principles

### I. Layer Separation (UI / Logic / Data)

Strict layer separation MUST be maintained at all times:

- UI → `components/` folder only. No business logic, no database queries, no role
  validation inside components.
- HTTP → `app/api/` routes only. Thin handlers that delegate to lib.
- Logic → `lib/` folder. All business logic, auth configuration, upload
  configuration, helpers, and domain services.
- Database → `prisma/` folder only. Schema, migrations, seeds.
- Access control → `proxy.ts` is the ONLY global interception layer. No
  `middleware.ts` file shall exist under any name.

Layer violations are not allowed. Any code that crosses a layer boundary MUST
be refactored into the correct layer.

### II. Type Safety & Zero Tolerance

TypeScript strict mode is always enforced:

- Zero lint errors and zero typecheck errors (`tsc --noEmit`) are mandatory
  before any merge or phase completion.
- The `any` type is prohibited in all source code. Use `unknown` with proper
  narrowing, or define explicit interfaces.
- Inline code comments are not allowed. Code MUST be self-documenting through
  clear naming and structure.
- ESLint and `tsc --noEmit` are mandatory gates. No exceptions.

### III. Authentication & Authorization First

All authentication MUST use Better Auth:

- Better Auth handles all auth flows (email/password, session management, OAuth
  if added later).
- `proxy.ts` is the sole global interception layer — never create
  `middleware.ts`.
- Session validation occurs in layouts (server-side via `auth.api.getSession`).
- Admin dashboard access requires email match against `ADMIN_EMAIL` env var.
- No Firebase auth or Firestore. No hardcoded credentials.

### IV. Bahasa Indonesia UI

All user-facing content MUST be written in Bahasa Indonesia:

- UI text, labels, buttons, headings, messages, error toasts, empty states,
  and all visible strings.
- English is allowed ONLY for technical identifiers: variable names, function
  names, file names, type names, and database field names.
- Mixing English and Indonesian in UI content is not allowed.
- Consistent language across all pages and components.

### V. Cache-First Data Access

Data fetching MUST use Next.js 16 cache primitives:

- Use `"use cache"` directive with `cacheTag` for all read operations.
- Use `revalidateTag(tag, "max")` for cache invalidation after mutations.
- Never use `force-static` or `force-dynamic` route segment options.
- Server Actions (`"use server"`) MUST be used for all mutations (create,
  update, delete).
- Each model has its own cache tag for granular revalidation.

## Technology Stack & Constraints

**Core Stack**: Next.js 16 App Router, TypeScript 5, Tailwind CSS v4,
shadcn/ui, Prisma v7 + Neon adapter + PostgreSQL, Better Auth, UploadThing v7,
Bun.

**Structural Constraints**:
- No `src/` directory. Code lives at project root.
- Package management via `bun` only — no npm, no yarn.
- Prisma generator output goes to `generated/prisma/` — never edited manually.
- Environment variables follow `.env.example` conventions.

## Development Workflow

**Quality Gates**:
- Lint (`bun run lint`) and typecheck (`bun run typecheck`) MUST pass with
  0 errors and 0 warnings before completing any phase.
- Client-only values (e.g., current year) MUST use `useEffect` +
  `startTransition` to avoid React 19 hydration/prerender errors.
- All seed scripts use `upsert` to prevent duplicates on re-seed.

**File Conventions**:
- Follow canonical CodeNight starter structure.
- New component directories use kebab-case.
- `components/ui/` is reserved for shadcn/ui base primitives — no custom
  business components there.

## Governance

This constitution supersedes all other development practices. Any amendment
MUST:
1. Be documented in this file with rationale.
2. Be reviewed and approved before taking effect.
3. Include a migration plan if existing code violates the new rule.

**Versioning**:
- MAJOR: Backward-incompatible governance changes or principle removals.
- MINOR: New principles or materially expanded guidance.
- PATCH: Clarifications, wording refinements, typo fixes.

All PRs and reviews MUST verify constitution compliance. Complexity must be
justified — simpler solutions are preferred unless a clear need is documented.

**Version**: 1.0.0 | **Ratified**: 2026-07-17 | **Last Amended**: 2026-07-17
