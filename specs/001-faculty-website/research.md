# Research: Faculty Website & Admin CMS

## Technology Best Practices & Decisions

### Next.js 16 App Router

- **Decision**: Use App Router with Server Components by default, Server Actions for mutations, `"use cache"` directive for data caching
- **Rationale**: Next.js 16 stable introduces `"use cache"` as a stable API (removed `unstable_` prefix). The `cacheLife` and `cacheTag` imports are now direct from `next/cache`.
- **Key Patterns**:
  - Use `"use cache"` directive on async data-fetching functions with `cacheTag` for granular invalidation
  - Use `revalidateTag(tag, "max")` (new 2-arg form) for cache invalidation after mutations in Server Actions
  - Use `updateTag(tag)` for read-your-own-writes within the same action
  - Use `forbidden()` from `next/navigation` for role-based access in server components
  - Use `revalidatePath` for path-level cache clearing
  - `connection()` from `next/server` to defer to request time when needed inside cached functions
  - No `force-static` or `force-dynamic` — use granular cache directives instead

### Prisma v7 + Neon PostgreSQL

- **Decision**: Use Prisma v7 with `@prisma/adapter-neon` for Neon PostgreSQL connection pooling
- **Rationale**: The Neon adapter provides WebSocket-based connection pooling optimal for serverless environments. Prisma v7 uses `prisma.config.ts` for configuration instead of ENV interpolation in schema.
- **Key Patterns**:
  - Configure datasource URL in `prisma.config.ts` using `defineConfig({ datasource: { url } })`
  - Initialize PrismaClient with `PrismaNeon` adapter: `new PrismaNeon({ connectionString })`
  - Use `DATABASE_URL` only (no `directUrl`) — Neon adapter handles pooling
  - Use `onDelete: Cascade` for parent-child relations
  - Use explicit many-to-many junction tables (PostTag pattern) for M:N relations
  - Seed using `upsert` to prevent duplicates
  - Output to `generated/prisma/` — never edit manually

### Better Auth

- **Decision**: Use Better Auth with Prisma adapter for authentication flow
- **Rationale**: Better Auth provides email/password auth with session management, Prisma adapter, and Next.js integration via `nextCookies()` plugin.
- **Key Patterns**:
  - Configure in `lib/auth.ts` with `betterAuth()` and `prismaAdapter(prisma, { provider: "postgresql" })`
  - Enable `emailAndPassword` with `enabled: true`
  - Use `nextCookies()` plugin (must be last in plugin array) for automatic cookie handling in Server Actions
  - Get session in Server Components: `auth.api.getSession({ headers: await headers() })`
  - Server Action sign-in: `auth.api.signInEmail({ body: { email, password } })`
  - Use `proxy.ts` for global route protection (NOT `middleware.ts`)
  - Prisma schema: User, Session, Account, Verification models with proper relations
  - Generate schema via `npx auth@latest generate`

### UploadThing v7

- **Decision**: Use UploadThing v7 with token-only configuration (`UPLOADTHING_TOKEN`)
- **Rationale**: v7 simplifies configuration to a single token instead of separate secret + app ID.
- **Key Patterns**:
  - Import `createUploadthing` from `uploadthing/next` for App Router
  - Configure `createRouteHandler` with `{ router, config: { token: process.env.UPLOADTHING_TOKEN } }`
  - Define FileRouter with `.middleware()` for auth checks and `.onUploadComplete()` for post-upload logic
  - Use `file.ufsUrl` (new in v7, replaces deprecated `file.url`)
  - File type constraints: `{ image: { maxFileSize: "4MB", maxFileCount: 1 } }`
  - Throw `UploadThingError` for unauthorized uploads
  - Server data via `{ awaitServerData: true }` option for onUploadComplete promise resolution

### shadcn/ui

- **Decision**: Use shadcn/ui components as base UI primitives
- **Rationale**: Shadcn/ui provides accessible, customizable components that integrate well with Next.js App Router and Tailwind CSS v4.
- **Key Patterns**:
  - Components live in `components/ui/` — no custom business components there
  - Form integration: Use `useActionState` with Next.js Server Actions for form state management
  - Use `<Form action={formAction}>` from `next/form` with pending state for loading UX
  - Business components in `components/public/` and `components/admin/`

### Framer Motion

- **Decision**: Use Framer Motion for page transitions, layout animations, and scroll-based effects
- **Rationale**: Framer Motion provides declarative animation API with `AnimatePresence` for exit animations and `layout` prop for smooth layout shifts.
- **Key Patterns**:
  - Use `motion.div` with `initial`, `animate`, `exit` props for entry/exit animations
  - Use `AnimatePresence mode="wait"` for page transitions
  - Use `layout` prop for smooth layout changes on list reordering
  - Use `LayoutGroup` for coordinating animations between multiple elements
  - Use `LazyMotion` + `domAnimation` for code-splitting (optimize bundle size)
  - Scroll-triggered animations via `useInView` hook for section reveals

### Tailwind CSS v4

- **Decision**: Use Tailwind CSS v4 with `@tailwindcss/postcss` and CSS `@import`
- **Rationale**: v4 uses `@import "tailwindcss"` instead of `@tailwind` directives, with CSS-based `@theme` configuration.
- **Key Patterns**:
  - Replace `@tailwind base/components/utilities` with `@import "tailwindcss"`
  - Use `@theme` block in CSS for design tokens (colors, fonts, breakpoints)
  - PostCSS config: `{ plugins: { "@tailwindcss/postcss": {} } }`
  - No need for `postcss-import` or `autoprefixer` — v4 handles these automatically
  - CSS variables via `@theme` for dynamic theming

## Alternatives Considered

| Technology | Alternative | Why Rejected |
|-----------|------------|-------------|
| Prisma ORM | Drizzle ORM | Already using Prisma v7 + Neon adapter in project setup |
| Auth | NextAuth.js/Auth.js | Already using Better Auth with Prisma adapter |
| Uploads | Direct S3 uploads | UploadThing provides simpler DX with same underlying storage |
| Styling | CSS Modules, Styled Components | Tailwind CSS v4 already configured in project |
| Animations | CSS animations, GSAP | Framer Motion integrates best with React component model |
| Runtime | Node.js | Already using Bun as runtime & package manager |

## Unresolved Items

- **Testing framework**: `package.json` needs inspection for test setup
- **Deployment**: Vercel deployment assumed but specific settings not verified
- **Analytics**: Not specified — may need future consideration
