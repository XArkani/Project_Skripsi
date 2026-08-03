# Tasks: Faculty Website & Admin CMS

**Input**: Design documents from `specs/001-faculty-website/`
**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md, contracts/

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

---

## Phase 1: Foundational (Blocking Prerequisites)

**Purpose**: Schema updates and core infrastructure

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [X] T001 [P] Add `slug` field (unique) to `event` and `news` models in `prisma/schema.prisma`
- [X] T002 [P] Create Next.js 16 route groups for slug-based detail pages (`app/(public)/berita/[slug]/` and `app/(public)/event/[slug]/`)
- [X] T003 Run `bunx prisma generate` to regenerate Prisma client after schema changes
- [X] T004 [P] Add empty state handling ("Belum ada data") component in `components/shared/EmptyState.tsx`
- [X] T005 [P] Add image placeholder component in `components/shared/ImagePlaceholder.tsx`

**Checkpoint**: Foundation ready — user story implementation can now begin

---

## Phase 2: User Story 1 — Public Visitor Browsing Faculty Information (Priority: P1) 🎯 MVP

**Goal**: Pengunjung umum dapat mengakses seluruh halaman informasi fakultas tanpa login, melihat pratinjau section, membaca berita/event, mencari FAQ, mengirim pesan kontak

**Independent Test**: Pengunjung dapat membuka halaman Home, membaca pratinjau section, mengeklik "Lihat Selengkapnya", dan tiba di halaman detail yang sesuai tanpa diminta login

### Implementation for User Story 1

- [X] T006 [P] [US1] Create data fetching function `getNewsBySlug` in `lib/faculty.ts`
- [X] T007 [P] [US1] Create data fetching function `getEventBySlug` in `lib/faculty.ts`
- [X] T008 [P] [US1] Update Berita listing page to link by slug in `app/(public)/berita/page.tsx`
- [X] T009 [P] [US1] Create Berita detail page with slug param in `app/(public)/berita/[slug]/page.tsx` (hero image, metadata, breadcrumb, body, related articles)
- [X] T010 [P] [US1] Update Event listing page to link by slug in `app/(public)/event/page.tsx`
- [X] T011 [P] [US1] Create Event detail page with slug param in `app/(public)/event/[slug]/page.tsx` (banner, description, schedule, location, related events)
- [X] T012 Remove old `[id]` route groups for berita and event (`app/(public)/berita/[id]/` and `app/(public)/event/[id]/`)
- [X] T013 [P] [US1] Add honeypot hidden field to contact form in `app/(public)/hubungi/page.tsx`
- [X] T014 [P] [US1] Add rate limiting check (1 msg per IP per 5 min) in `lib/actions.ts` for `submitContact`
- [X] T015 [P] [US1] Add Google Maps fallback (static address card) in `app/(public)/hubungi/page.tsx`
- [X] T016 [P] [US1] Add empty state for all public listing pages using `EmptyState` component
- [X] T017 [P] [US1] Add image placeholder fallback for all image fields using `ImagePlaceholder`

**Checkpoint**: At this point, User Story 1 should be fully functional — public pages display content, contact form has spam protection, empty/image states handled

---

## Phase 3: User Story 2 — Calon Mahasiswa Menjelajahi Program Fakultas (Priority: P2)

**Goal**: Calon mahasiswa dapat menjelajahi blueprint fasilitas, profil dosen, dan UKM untuk mempertimbangkan pendaftaran

**Independent Test**: Calon mahasiswa dapat melihat halaman Blueprint Fakultas, membaca deskripsi setiap fasilitas, dan melihat galeri gambar tanpa login

### Implementation for User Story 2

- [ ] T018 [P] [US2] Add alternating layout (kiri-kanan) to Blueprint page in `app/(public)/blueprint/page.tsx`
- [ ] T019 [P] [US2] Add Framer Motion scroll-reveal animations to Blueprint page in `app/(public)/blueprint/page.tsx`
- [ ] T020 [P] [US2] Add Framer Motion stagger animations to Dosen grid in `app/(public)/dosen/page.tsx`
- [ ] T021 [P] [US2] Add Framer Motion entrance animations to UKM page in `app/(public)/ukm/page.tsx`

**Checkpoint**: User Story 2 works — Blueprint has alternating layout with animations, Dosen and UKM have animated entry

---

## Phase 4: User Story 3 — Administrator Mengelola Konten Website (Priority: P1)

**Goal**: Administrator tunggal dapat login ke panel admin untuk mengelola seluruh konten website

**Independent Test**: Administrator login, masuk ke halaman manajemen berita, membuat berita baru, dan berita tersebut langsung tampil di halaman publik

### Implementation for User Story 3

- [ ] T022 [P] [US3] Add Dashboard stats page with real counts from DB in `app/(dashboard)/dashboard/page.tsx`
- [ ] T023 [P] [US3] Update Berita CRUD to support slug auto-generation in `app/(admin)/admin/berita/page.tsx`
- [ ] T024 [P] [US3] Update Event CRUD to support slug auto-generation in `app/(admin)/admin/event/page.tsx`
- [ ] T025 [P] [US3] Verify all CRUD pages read and write correctly via CrudManager components
- [ ] T026 [P] [US3] Create detail view modal for Pesan Masuk in `app/(admin)/admin/messages/page.tsx`

**Checkpoint**: Admin CMS fully functional — CRUD works for all entities, messages can be read and deleted

---

## Phase 5: Polish & Cross-Cutting Concerns

**Purpose**: Improvements that affect multiple user stories

- [ ] T027 [P] Add Framer Motion `AnimatePresence` page transitions in `app/(public)/layout.tsx`
- [ ] T028 [P] Add Framer Motion exit animations to Toast component in `components/shared/Toast.tsx`
- [ ] T029 Run `bun run lint` and fix any lint errors
- [ ] T030 Run `bun run typecheck` and fix any type errors
- [ ] T031 Update seed script with sample faculty data in `prisma/seed.ts`
- [ ] T032 Final end-to-end verification of all public and admin pages

---

## Dependencies & Execution Order

### Phase Dependencies

- **Foundational (Phase 1)**: No dependencies — can start immediately
- **US1 (Phase 2)**: Depends on Foundational — can proceed independently
- **US2 (Phase 3)**: Depends on Foundational — can proceed in parallel with US1
- **US3 (Phase 4)**: Depends on Foundational — can proceed in parallel with US1 and US2
- **Polish (Phase 5)**: Depends on all user stories being complete

### User Story Dependencies

- **US1 (P1)**: Can start after Foundational — no dependencies on other stories
- **US2 (P2)**: Can start after Foundational — no dependencies on other stories
- **US3 (P1)**: Can start after Foundational — no dependencies on other stories

All three user stories can be implemented in parallel since they operate on different route groups:
- US1: `app/(public)/` — public pages
- US2: `app/(public)/blueprint/`, `dosen/`, `ukm/` — specific public pages
- US3: `app/(admin)/admin/`, `app/(dashboard)/` — admin pages

### Parallel Opportunities

- All Phase 1 foundational tasks marked [P] can run in parallel
- Within each user story, tasks marked [P] can run in parallel
- All three user stories can be worked on simultaneously by different team members

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Schema updates + slug support
2. Complete Phase 2: User Story 1 (public pages)
3. **STOP and VALIDATE**: Test User Story 1 independently
4. Deploy/demo if ready

### Incremental Delivery

1. Complete Foundational → Foundation ready
2. Add US1 (Public Pages) → Test → Deploy (MVP!)
3. Add US2 (Prospect Student Pages) → Test → Deploy
4. Add US3 (Admin CMS) → Test → Deploy
5. Polish → Final verification

### Parallel Team Strategy

With multiple developers:

1. Complete Phase 1 together
2. Once Foundational is done:
   - Developer A: User Story 1 (Public pages — highest value)
   - Developer B: User Story 2 (Prospect pages)
   - Developer C: User Story 3 (Admin CMS)
3. Stories complete and integrate independently

---

## Notes

- [P] tasks = different files, no dependencies
- [Story] label maps task to specific user story for traceability
- Each user story should be independently completable and testable
- NEVER write inline code comments — code must be self-documenting
- Use `bun` for all dependency installations — never `npm`
- Do not edit `package.json` manually
- Stop at any checkpoint to validate story independently
