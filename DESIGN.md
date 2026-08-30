# DESIGN.md — FT Hamzanwadi (public web)

Ditulis dari dunia yang ter-bangun, jadi dasar kebenaran untuk penyesuaian ke depan.
Halaman publik ini memperlakukan hijau-hitam sebagai **bahasa rekayasa** (`engineering language`),
bukan sekadar warna tema.

## Mode

**Persuade / Market** pada beranda (pengunjung memahami institusi lalu bertindak: jelajahi / hubungi).
**Operate / Browse** pada halaman direktori (blueprint, dosen, event, berita, ukm, faq, struktur).

## Palet (Tailwind v4, override `--color-emerald-*`)

| Token | Nilai | Peran |
|---|---|---|
| `emerald-50` | `#eaf7f1` | aksen iseng / badge pucat |
| `emerald-100/200` | `#d6f0e4` / `#ace2c9` | border halus, selection |
| `emerald-600` | `#008f5a` | **Primary Green** — link aktif, icon, badge, border, highlight |
| `emerald-700` | `#00714c` | isian solid ber-teks-putih (tommbol) — ≥5.8:1 kontras |
| `emerald-800` | `#004d3d` | Dark Green — hover tommbol, teks brand |
| `emerald-900` | `#003c32` | Deep Green — band stats & lab |
| `#001a15`–`#00150f` | footer, panel gradasi | field fotografi pengganti |

Netral: latar `#ffffff`, latar sekunder `#f7f9fa`, teks `#111827` (slate-950), teks sekunder `#64748b`
(slate-500/600), border `#e2e8f0` (slate-200). Hijau **strategis**, bukan merata.

> Aksesibilitas: putih di atas `#008f5a` hanya 4.07:1 sehingga **isian solid** memakai
> `emerald-700` (`#00714c`, 5.8:1) supaya tombol lolos WCAG AA; `#008f5a` tetap dipakai untuk
> teks link besar, icon, badge, border, dan aksen.

## Tipografi

- Satu keluarga: **Inter** (`next/font`), `font-sans`.
- Skala: display `clamp(2.5rem,5.5vw,3.9rem)` (hero), section heading `clamp(1.75rem,3vw,2.5rem)`,
  body 16px, meta 14px, caption 11–12px.
- Berat hanya sampai `font-bold`; heading `tracking-[-0.02,-0.03em]`, leading 1.08–1.15.
- Angka memakai `font-variant-numeric: tabular-nums` (tnum).

## Komponen UI publik

- `Container` — `max-w-[1280px]`, `px-4/6/8`.
- `SectionHeading` — judul + deskripsi + tautan aksi opsional.
- `ButtonLink` — varian primary (hijau solid), secondary (outline), on-dark (putih `#003c32`).
- `ImagePlaceholder` — panel gradasi hijau-hitam + blueprint-grid halus + ikon, pengganti foto.
- Radius: 12–16px (kartu/panel), 8px (kontrol kecil). Shadow minimal: `shadow-sm` dan
  `shadow-[0_8px_24px_rgba(2,6,23,0.06)]` saat hover kartu.
- Hover: `-translate-y-1` + border hijau + shadow ringan, durasi 200–300ms.

## Beranda (13 section)

Navbar 72px **putih solid** → **Hero penuh-latar gradasi hijau-hitam, teks di tengah** (H1
`clamp(2.5rem,6vw,4.25rem)` + deskripsi + 2 CTA; tanpa badge, tanpa panel kanan, tanpa statistik)
digeser ke bawah di bawah baris navigasi dengan **zona langit tetap** (spacer `96/112/128px`)
sehingga celah nav→heading terjamin di semua breakpoint → Quick Access (4 tautan) →
Tentang Fakultas (teks + pilar Tridharma) → Engineering in Numbers (band hijau pekat, 4 angka
dinamis **count-up**) → Blueprint & Fasilitas (1 featured + grid) → Tenaga Pendidik (4, avatar
dominan) → Agenda & Event (featured + agenda list + status) → Berita (1 featured + 2 secondary) →
Kehidupan Mahasiswa (3 UKM) → FAQ (accordion satu-buka) → Contact CTA (band hijau, tombol putih) →
Footer 4 kolom (hijau-tua). Latar home berselang putih / `#f7f9fa`; navbar **putih solid** (72px)
dengan hero **di bawah** baris navigasi — tidak lagi transparan/overlap.

## Gerak

Ringan & profesional (hormati `prefers-reduced-motion`):
- Hero: `hero-rise` (fade + naik 24px) dengan stagger saat load.
- Section: `ScrollReveal` (IntersectionObserver, fade + naik 24px, 500ms ease-out, sekali jalan).
- Angka stats: **count-up** (easing cubic-out, 1.3s) saat band terlihat; SSR menampilkan nilai asli.
- Footer menu: icon panah dengan hover geser; tombol/kartu hover translate-1 + border hijau.
- Drawer mobile + dropdown pakai spring pendek; accordion FAQ `grid-template-rows` native 300ms.
Tanpa blur-scroll, parallax, atau entrance per-teks.

## Batasan teknis

TPA tidak menyentuh skema DB, route, API/actions, filter/search halaman direktori, atau dashboard.
Data beranda seluruhnya dinamis dari Prisma (`lib/faculty.ts`). Belum ada foto asli → seluruh media
menggunakan gradasi hijau-hitam; slot aset foto siap diganti saat tersedia.

## Surface brief

Public homepage — mode **Persuade**. Aksi utama: eksplorasi (Blueprint / Dosen / Berita / Event)
dan kontak (`/hubungi`). Konten = data fakultas riil. Konstrain: tanpa foto (gradasi), bahasa
Indonesia sederhana, hijau strategis, tombol/target sentuh ≥44px.

## Dashboard admin — Minimal Institutional Dashboard (mode Operate)

- **Token**: `--primary` global = hijau `#008f5a` (tombol/checkbox); netral zinc/slate; merah hanya
  untuk destructive (delete/error); icon menu **netral** (hijau hanya saat aktif).
- **Shell**: sidebar `w-64` netral + footer admin/sign-out; main fluid `min-w-0` (`PageContainer`,
  max 1400px); mobile pakai drawer kiri (`MobileSidebar` — focus, Escape, aria-modal) + top bar.
- **Halaman**: satu `PageHeader` (judul + deskripsi + aksi); tanpa judul ganda.
- **DataTable** (custom, tanpa dependency baru): search 300–400px, filter kontekstual (Select),
  sort header, pagination `10/h`, dropdown aksi `[…]` (Lihat Detail / Edit / Hapus), **DeleteDialog**
  konfirmasi, **DetailSheet** sisi kanan (radix Dialog), mobile → **list-card** (<md).
- **Konfigurasi per model** di `lib/admin-columns.tsx` (client): kolom terpilih, status badge
  (Info/`Akan Datang`, Sukses/`Berlangsung`, Netral/`Selesai`), tanggal eksplisit, avatar dosen,
  info panjang hanya di detail sheet.
- **Pesan**: mental model inbox (filter belum/sudah dibaca, dot unread, relative time, Sheet detail,
  tandai dibaca, delete dialog).
- **Dashboard home**: 4 KPI utama (StatCard) + status event + Aktivitas Terbaru / Pesan Terbaru.
- **State**: `LoadingTable` (skeleton), `EmptyState`, `ErrorState` + `error.tsx` (retry), `loading.tsx`.
- PWA prompt compact, z-index di bawah sheet/dialog, dismiss persisten.