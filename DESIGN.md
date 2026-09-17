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

- `Container` — `max-w-[1280px]` + gutter token `--page-gutter` (16/20/24/32px); irama section via `section-y`.
- `SectionHeading` — judul + deskripsi + tautan aksi opsional.
- `ButtonLink` — varian primary (hijau solid), secondary (outline), on-dark (putih `#003c32`).
- `ImagePlaceholder` — panel gradasi hijau-hitam + blueprint-grid halus + ikon, pengganti foto.
- `MobileCarousel` — pembungkus carousel mobile (<768px): baris scroll-snap + progress bar emerald
  (scroll-driven CSS transform, tanpa library animasi) + hint `MoveHorizontal` "Geser" (16px/11px, memudar
  setelah interaksi atau ±4,5 dtk); md+ kembali grid biasa.
- `HorizontalScrollHint` — pill kaca kecil `MoveHorizontal` + "Geser" di tepi baris chip yang meluap
  (pointer-events-none; hanya muncul bila konten benar-benar overflow).
- `MobileNavSheet` — top sheet menu: turun dari tepi atas, `rounded-b-3xl`, drag handle di tepi bawah.
- `ScrollToTop` — tombol 44px kembali ke atas (mobile + desktop) dengan ring progres halaman 2px:
  muncul setelah `scrollY > 600`, surface `bg-card/95` + `backdrop-blur-md` + border; sembunyi saat
  top sheet navigasi / prompt PWA terbuka dan saat footer mendekat.
- Radius: 12–16px (kartu/panel), 8px (kontrol kecil). Shadow minimal: `shadow-sm` dan
  `shadow-[0_8px_24px_rgba(2,6,23,0.06)]` saat hover kartu.
- Hover: `-translate-y-1` + border hijau + shadow ringan, durasi 200–300ms.

## Beranda (13 section)

Navbar 72px **putih solid** → **Hero penuh-latar gradasi hijau-hitam, teks di tengah** (H1
`clamp(2.5rem,6vw,4.25rem)` + deskripsi + 2 CTA; tanpa badge, tanpa panel kanan, tanpa statistik;
cue gulir `ChevronDown` halus di dasar hero)
digeser ke bawah di bawah baris navigasi dengan **zona langit tetap** (spacer `96/112/128px`)
sehingga celah nav→heading terjamin di semua breakpoint → Quick Access (4 tautan) →
Tentang Fakultas (teks + pilar Tridharma) → Engineering in Numbers (band hijau pekat, 4 angka
dinamis **count-up**) → Blueprint & Fasilitas (1 featured + grid) → Tenaga Pendidik (4, avatar
dominan) → Agenda & Event (featured + agenda list + status) → Berita (1 featured + 2 secondary) →
Kehidupan Mahasiswa (3 UKM) → FAQ (accordion satu-buka) → Contact CTA (band hijau, tombol putih) →
Footer 4 kolom (hijau-tua). Latar home berselang putih / `#f7f9fa`; navbar **putih solid** (64px mobile /
72px sm+) sticky dengan blur halus saat scroll. Tiga kelompok kartu (fasilitas, tenaga pendidik, UKM)
memakai **carousel scroll-snap** di mobile (kartu `84vw` + progress bar + hint "Geser") dan kembali grid di md+.

## Gerak

Ringan & profesional (hormati `prefers-reduced-motion`):
- Hero: `hero-rise` (fade + naik 24px) dengan stagger saat load.
- Section: `ScrollReveal` — reveal **tanpa JavaScript**: keyframes `reveal-up` (fade + naik 24px, 500ms)
  dengan `animation-timeline: view()` (scroll-driven) bila didukung; fallback animasi saat load.
  Section di bawah fold memakai `section-lazy` (`content-visibility: auto` + `contain-intrinsic-size`)
  agar style/paint awal lebih murah.
- Angka stats: **count-up** (easing cubic-out, 1.3s) saat band terlihat; SSR menampilkan nilai asli.
- Footer menu: icon panah dengan hover geser; tombol/kartu hover translate-1 + border hijau.
- Top sheet navigasi mobile: `translateY(-100%) → 0` 300ms `cubic-bezier(0.22,1,0.36,1)`, backdrop fade 220ms.
- Carousel mobile: progress bar digerakkan `scrollLeft` → `scaleX` via `requestAnimationFrame` (tanpa
  framer-motion, tanpa re-render); kartu masuk dengan animasi CSS `card-enter` (450ms, `both`) sehingga
  konten sudah terlihat sejak render awal; hint `MoveHorizontal`
  "Geser" adalah cue onboarding yang memudar setelah scroll pertama atau ±4,5 dtk.
- Hero: cue gulir `ChevronDown` 20px (stroke 2) di dasar hero — translateY 0→5px, opacity 0.5→1,
  2s tenang; hanya beranda, bukan halaman listing.
- Back to top: masuk 220ms ease-out (opacity + translateY 8px + scale 0.95); ring progres dari
  `useScroll` (spring hanya bila motion diizinkan) tanpa re-render; hover desktop `translateY(-2px)`
  + border/ikon hijau, press mobile `scale(0.96)`.
- Drawer/dropdown desktop pakai spring pendek; accordion FAQ `grid-template-rows` native 300ms.
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

Sistem admin mobile-first yang lebih padat daripada situs publik; desktop (sidebar `md+` + tabel) tidak berubah.

- **Token**: `--primary` global = hijau `#008f5a` (tombol/checkbox); netral zinc/slate; merah hanya
  untuk destructive (delete/error); icon menu **netral** (hijau hanya saat aktif, termasuk varian `dark:`). Semua kartu admin memakai token (`--card`/`--border`/`--muted`), tanpa warna hardcode dark-only.
- **Gutter & rhythm**: `PageContainer` memakai token `--page-gutter` (16/20/24/32) + `pt-7 pb-24 md:py-8`
  (ruang bawah 96px agar pagination tak tertutup kontrol floating).
- **Shell mobile**: topbar 56px sticky (`backdrop-blur-md`, border halus) — hamburger 44px, logo 32px,
  brand 14px/700, theme toggle 44px dengan border subtle; desktop sidebar `w-64` + footer admin tak berubah.
- **Navigasi mobile — drawer kiri** (dipertahankan seperti semula): panel `w-72 max-w-[85vw]` meluncur dari kiri
  200ms, backdrop `slate-950/50`, `aria-modal`, Escape menutup, scroll-lock body, fokus pindah ke tombol tutup;
  menutup saat rute berubah **dan** saat item menu ditekan (termasuk halaman yang sedang aktif) serta saat backdrop
  ditekan. Isi: Dashboard + KELOLA KONTEN (Blueprint, Dosen, UKM, Event, Berita, FAQ, Struktur, Pesan) + footer
  email/Sign Out. Item aktif hijau subtle dengan varian `dark:`; drawer menyembunyikan `ScrollToTop` via `ui-chrome`.
- **PageHeader**: eyebrow 12px hijau (varian dark), title 26px→30px/700, deskripsi 14–15px; spacing
  nav→heading 28px, eyebrow→title 8px, title→desc 8px.
- **Toolbar** (`DataTableToolbar`): baris 1 search 44px (md: 36px) + ikon 18px, placeholder pendek per model;
  baris 2 filter `flex-1` + tombol tambah (`h-11 md:h-9`, ikon Plus 16px) — vertikal di ≤340px. Filter
  mobile = Select 44px; desktop tetap `w-44`.
- **Kartu mobile** (`DataTable`, `md:hidden`): radius 16px, padding 14px, gap 12px, tanpa shadow berat;
  judul `line-clamp-2`, metadata 13px `line-clamp-2`, `min-w-0` + `break-words`; kolom mobile per model
  (Blueprint: kategori • deskripsi; Dosen: avatar 48px + NUPTK di sel utama + prodi + jabatan; Event:
  tanggal + badge status; Berita: tanggal + ringkasan; FAQ: jawaban; Struktur: jabatan). Desktop tetap
  tabel `rounded-xl` + sort header.
- **Aksi baris**: trigger `MoreHorizontal` 40px; **mobile → action bottom sheet** (Lihat Detail / Edit /
  Hapus destructive setelah divider), **desktop → dropdown** `[…]` seperti sebelumnya. Konfirmasi hapus
  (`DeleteDialog`) berjudul "Hapus {scope} ini?" dengan tombol `min-h-11` di mobile.
- **Pagination**: kontrol 44px mobile dengan indikator `x / y`, ringkasan `1–10 dari 36 data` (desktop:
  `Menampilkan …` + nomor halaman 32px); `pb-24` memastikan tidak tertutup.
- **Dashboard**: 4 stat `grid-cols-2` (≥360px; 1 kolom <340px), kartu min-h 120px, value 28–32px, ikon
  36–40px; status event 3 kartu compact (item ketiga `col-span-2` di mobile sempit); Aktivitas/Pesan berupa
  list row `py-2.5` + divider; empty pesan compact 120–150px dengan CTA text-link.
- **Pesan**: tab segmented horizontal-scroll (44px, `shrink-0`, jumlah) dengan varian dark; baris pesan
  compact (avatar 40px, dot unread); empty state 180–220px; empty terfilter menampilkan tombol
  **Reset filter**.
- **Form & upload**: `CrudForm` `rounded-2xl p-4 sm:p-6`, input 44px mobile, footer aksi full-width ≥44px,
  error `break-words`; dropzone upload `min-h-[180px] sm:min-h-[250px]`; tombol hapus file/gambar selalu
  terlihat (bukan hover-only) dengan target 40px.
- **State**: `LoadingTable` punya versi kartu mobile yang mengikuti bentuk akhir; bedakan database kosong
  ("Belum ada …") vs hasil filter kosong ("Tidak ditemukan … untuk pencarian ini" + Reset); `EmptyState`
  mobile `py-10`.
- **Floating**: `ScrollToTop` publik (44px, ring progres 2px, threshold 600px) dipasang juga di layout admin.
- **Utilitas**: `scrollbar-none` kini terdefinisi di `globals.css` (dipakai baris carousel/tab).