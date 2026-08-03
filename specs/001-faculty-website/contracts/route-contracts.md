# Route Contracts

## Public Routes (no auth)

| Route | Page | Description |
|-------|------|-------------|
| `/` | Home | Hero, Quick Nav, section previews |
| `/blueprint` | Blueprint | Daftar fasilitas kampus |
| `/dosen` | Dosen | Grid profil dosen |
| `/ukm` | UKM | Grid unit kegiatan mahasiswa |
| `/event` | Event | Event terkelompok by status |
| `/event/[slug]` | Detail Event | Banner, deskripsi, jadwal, lokasi |
| `/berita` | Berita | Kartu artikel dengan pagination |
| `/berita/[slug]` | Detail Berita | Hero image, metadata, body, breadcrumb |
| `/struktur-organisasi` | Struktur | Hierarki kepemimpinan visual |
| `/faq` | FAQ | Search bar + accordion |
| `/hubungi-kami` | Hubungi Kami | Split layout form + info, Google Maps |
| `/login` | Login Admin | Email + password login |

## Admin Routes (auth required)

| Route | Page | Description |
|-------|------|-------------|
| `/dashboard` | Dashboard | Statistik semua entitas |
| `/dashboard/kelola-blueprint` | Kelola Blueprint | CRUD fasilitas |
| `/dashboard/kelola-dosen` | Kelola Dosen | CRUD dosen |
| `/dashboard/kelola-ukm` | Kelola UKM | CRUD UKM |
| `/dashboard/kelola-event` | Kelola Event | CRUD event |
| `/dashboard/kelola-berita` | Kelola Berita | CRUD berita |
| `/dashboard/kelola-faq` | Kelola FAQ | CRUD FAQ |
| `/dashboard/kelola-struktur` | Kelola Struktur | CRUD node organisasi |
| `/dashboard/pesan-masuk` | Pesan Masuk | Lihat & hapus pesan |

## API Routes

| Route | Method | Purpose |
|-------|--------|---------|
| `/api/auth/[...all]` | GET/POST | Better Auth endpoints |
| `/api/uploadthing` | GET/POST | UploadThing file upload |
