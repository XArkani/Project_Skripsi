# Konversi landing.jsx ke Next.js 16 — Design Document

## Ringkasan

Mengonversi file `landing.jsx` (2057 baris, React SPA dengan Firebase) menjadi aplikasi Next.js 16 menggunakan App Router, TypeScript, shadcn/ui, Framer Motion, Prisma V7 (Neon Postgres), dan Better Auth.

## Arsitektur Route

```
app/
  layout.tsx                       # Root layout (font, metadata)
  globals.css                      # Tailwind v4 + OKLCH colors
  (public)/                        # Public faculty website
    layout.tsx                     # Header + Footer wrapper
    page.tsx                       # Home (hero + 6 previews)
    blueprint/page.tsx
    ukm/page.tsx
    dosen/page.tsx
    event/page.tsx
    event/[id]/page.tsx
    berita/page.tsx
    berita/[id]/page.tsx
    struktur/page.tsx
    faq/page.tsx
    hubungi/page.tsx
    login/page.tsx                 # Admin login (Better Auth)
  (dashboard)/
    admin/
      page.tsx                     # Admin dashboard CRUD
      messages/page.tsx
  api/
    auth/[...all]/route.ts         # Better Auth (existing)
    hubungi/route.ts               # Contact form API
```

## Prisma Schema (7 models baru)

- `blueprint` — Fasilitas dan infrastruktur
- `dosen` — Data dosen dan kepakaran
- `ukm` — Unit Kegiatan Mahasiswa
- `event` — Agenda dan event
- `news` — Berita dan publikasi
- `faq` — Pertanyaan umum
- `message` — Pesan dari form kontak

Semua model memiliki `id` (cuid), `createdAt`, `updatedAt`.

## Komponen

### Shared (`components/shared/`)
- `Header.tsx` — Sticky navbar dengan dropdown
- `Footer.tsx` — Footer 4 kolom
- `Toast.tsx` — Notifikasi toast (Framer Motion)
- `Breadcrumbs.tsx` — Breadcrumb navigasi
- `PageHeader.tsx` — Header halaman reusable (badge + title + desc)

### Sections (`components/sections/`)
- `HeroSection.tsx` — Hero banner
- `QuickNavPanel.tsx` — 8 kartu navigasi cepat
- `BlueprintPreview.tsx` — Preview 3 kartu blueprint
- `DosenHighlight.tsx` — Preview 4 kartu dosen
- `EventPreview.tsx` — Preview 3 kartu event
- `NewsPreview.tsx` — Preview 3 kartu berita
- `FaqPreview.tsx` — Preview 3 FAQ

### Admin (`components/admin/`)
- `AdminHeader.tsx`
- `StatsOverview.tsx`
- `NewsManager.tsx`
- `MessagesInbox.tsx`

## Data Flow

1. **Public pages** — Server Component dengan `'use cache'` + `cacheTag()`
2. **Admin mutations** — Server Action + `revalidateTag(tag, profile)` / `updateTag()`
3. **Contact form** — API Route POST → Prisma create → revalidateTag
4. **Auth** — Better Auth (existing) untuk admin login

## Styling

- Warna emerald dari landing.jsx dikonversi ke OKLCH di `@theme inline {}`
- Semua border-radius, padding, font-size identik
- Emoji diganti Lucide icons dari shadcn/ui
- Framer Motion `whileInView` untuk scroll-reveal animations
