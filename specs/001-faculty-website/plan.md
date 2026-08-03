# Implementation Plan: Faculty Website & Admin CMS

**Branch**: `001-faculty-website` | **Date**: 2026-07-20 | **Spec**: `specs/001-faculty-website/spec.md`
**Input**: Feature specification from `specs/001-faculty-website/spec.md`

## Summary

Official website for Fakultas Teknik Universitas Hamzanwadi with public information pages (Home, Blueprint, Dosen, UKM, Event, Berita, Struktur Organisasi, FAQ, Hubungi Kami) and single-admin CMS dashboard. Built with Next.js 16 App Router, Prisma v7 + Neon PostgreSQL, Better Auth, UploadThing v7, shadcn/ui, and Framer Motion.

## Technical Context

**Language/Version**: TypeScript 5 (strict mode), Next.js 16 (App Router), Bun runtime  
**Primary Dependencies**: shadcn/ui (base components), Framer Motion (animations), Prisma v7 + `@prisma/adapter-neon` (ORM + Neon), Better Auth (authentication), UploadThing v7 (file uploads), Tailwind CSS v4 (styling)  
**Storage**: Neon PostgreSQL via Prisma v7 with Neon adapter (`DATABASE_URL` only, no `directUrl`)  
**Testing**: Tidak ada — proyek tidak menggunakan test framework. Kualitas dijamin melalui `bun run lint` dan `bun run typecheck`.  
**Target Platform**: Web (Vercel deployment target)  
**Project Type**: Web application — full-stack Next.js App Router (SSR + RSC)  
**Performance Goals**: <3s initial page load, <2s form submission, <1s FAQ search with real-time filter  
**Constraints**: Bahasa Indonesia UI only, cache-first (`"use cache"` + `cacheTag`/`revalidateTag("tag", "max")`), `proxy.ts` for route protection (no `middleware.ts`), no `src/` directory  
**Scale/Scope**: ~10 public pages + admin CMS with 9 entity types, 1 admin user, public visitors

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| Principle | Status | Notes |
|-----------|--------|-------|
| I. Layer Separation | ✅ PASS | UI in `components/`, logic in `lib/`, DB in `prisma/`, access control in `proxy.ts` |
| II. Type Safety | ✅ PASS | TypeScript strict, `any` prohibited, ESLint + `tsc --noEmit` gates |
| III. Auth First | ✅ PASS | Better Auth via `lib/auth.ts`, session checks in layouts, `proxy.ts` for protection |
| IV. Bahasa Indonesia UI | ✅ PASS | All user-facing text in Indonesian per spec |
| V. Cache-First Data | ✅ PASS | `"use cache"` directive + `cacheTag`/`revalidateTag("tag", "max")` for all reads |
| No `src/` directory | ✅ PASS | Code at project root |
| No `middleware.ts` | ✅ PASS | Using `proxy.ts` |

No violations — complexity tracking not required.

## Project Structure

### Documentation (this feature)

```text
specs/001-faculty-website/
├── plan.md              # This file
├── research.md          # Phase 0 output
├── data-model.md        # Phase 1 output
├── quickstart.md        # Phase 1 output
├── contracts/           # Phase 1 output
└── tasks.md             # Phase 2 output (/speckit.tasks command)
```

### Source Code (repository root)

```text
app/
├── (public)/            # Public routes (no auth required)
│   ├── page.tsx         # Home
│   ├── blueprint/
│   ├── dosen/
│   ├── ukm/
│   ├── event/
│   ├── berita/
│   ├── struktur-organisasi/
│   ├── faq/
│   ├── hubungi/
│   └── layout.tsx
├── (dashboard)/         # Dashboard routes (auth required)
│   ├── dashboard/
│   ├── upload/
│   └── layout.tsx
├── (admin)/             # Admin CRUD routes (auth required, ADMIN_EMAIL only)
│   └── admin/
│       ├── berita/
│       ├── blueprint/
│       ├── dosen/
│       ├── event/
│       ├── faq/
│       ├── messages/
│       ├── struktur/
│       ├── ukm/
│       └── layout.tsx
├── api/
│   ├── auth/[...all]/
│   └── uploadthing/
├── layout.tsx
└── page.tsx

components/
├── ui/                  # shadcn/ui primitives
├── shared/              # Shared components (Header, Footer, Toast)
├── sections/            # Public page section components (Hero, Preview cards)
├── admin/               # Admin CMS components (CrudManager, DataTable, FormModal)
└── upload/              # Upload components (FileUpload, ImageUpload)

lib/
├── auth.ts              # Better Auth config
├── prisma.ts            # Prisma client
├── uploadthing.ts       # UploadThing router
└── utils.ts

prisma/
├── schema.prisma
└── seed.ts

proxy.ts                 # Route protection (Not Next.js middleware)
```

**Structure Decision**: Next.js App Router with route groups `(public)` for unauthenticated and `(dashboard)` for admin-authenticated routes. Single project at root level (no `src/`). Controllers and services in `lib/`, UI in `components/`, database in `prisma/`.

## Complexity Tracking

No constitution violations — section not needed.
