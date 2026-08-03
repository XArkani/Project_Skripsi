# Feature Specification: Faculty Website & Admin CMS

**Feature Branch**: `001-faculty-website`
**Created**: 2026-07-17
**Status**: Draft
**Input**: User description of the official website for Fakultas Teknik Universitas Hamzanwadi

## Clarifications

### Session 2026-07-17

- Q: Fitur apa yang out of scope? → A: Fokus pada informasi dan konten statis + admin CMS. Tidak ada sistem pendaftaran, payment, forum, atau multi-bahasa.
- Q: Format URL untuk halaman detail? → A: Slug human-readable (mis. `/berita/judul-berita`).
- Q: Perlindungan spam untuk form kontak? → A: Rate limiting maks 1 pesan per IP per 5 menit + honeypot field.
- Q: Fallback jika Google Maps gagal? → A: Static address card dengan alamat teks dan link ke Google Maps eksternal.

## User Scenarios & Testing

### User Story 1 - Public Visitor Browsing Faculty Information (Priority: P1)

Pengunjung umum dapat mengakses seluruh halaman informasi fakultas tanpa perlu login.
Mereka dapat melihat profil fakultas, daftar dosen, UKM, event, berita, struktur
organisasi, FAQ, dan mengirim pesan melalui formulir kontak.

**Why this priority**: Fungsi dasar website sebagai portal informasi publik.

**Independent Test**: Pengunjung dapat membuka halaman Home, membaca pratinjau
section, mengeklik "Lihat Selengkapnya", dan tiba di halaman detail yang sesuai
tanpa diminta login.

**Acceptance Scenarios**:

1. **Given** pengunjung membuka homepage, **When** mereka menggulir ke section
   pratinjau berita, **Then** mereka melihat 2-3 kartu berita terbaru dan tombol
   "Lihat Selengkapnya" yang menuju ke halaman Berita.
2. **Given** pengunjung berada di halaman Event, **When** mereka mengeklik salah
   satu kartu event, **Then** mereka diarahkan ke halaman Detail Event yang
   menampilkan banner, deskripsi, jadwal, dan lokasi.
3. **Given** pengunjung mengisi formulir Hubungi Kami, **When** mereka menekan
   tombol kirim dengan data valid, **Then** pesan tersimpan dan pengunjung
   melihat konfirmasi keberhasilan.

---

### User Story 2 - Calon Mahasiswa Menjelajahi Program Fakultas (Priority: P2)

Calon mahasiswa dapat menjelajahi informasi fakultas seperti blueprint fasilitas,
profil dosen, dan UKM untuk mempertimbangkan pendaftaran.

**Why this priority**: Mendukung rekrutmen mahasiswa baru.

**Independent Test**: Calon mahasiswa dapat melihat halaman Blueprint Fakultas,
membaca deskripsi setiap fasilitas, dan melihat galeri gambar tanpa login.

**Acceptance Scenarios**:

1. **Given** calon mahasiswa membuka halaman Blueprint Fakultas, **When** halaman
   dimuat, **Then** mereka melihat daftar gedung, laboratorium, dan fasilitas
   dengan gambar besar dan deskripsi secara bergantian (kiri-kanan).
2. **Given** calon mahasiswa membuka halaman Data Dosen, **When** halaman dimuat,
   **Then** mereka melihat grid kartu dosen yang masing-masing berisi foto, nama,
   gelar akademik, jabatan, bidang keahlian, dan minat riset.

---

### User Story 3 - Administrator Mengelola Konten Website (Priority: P1)

Administrator tunggal dapat login ke panel admin untuk mengelola seluruh konten
website: blueprint, dosen, UKM, event, berita, struktur organisasi, FAQ, dan
pesan masuk.

**Why this priority**: Konten website harus dapat diperbarui tanpa campur tangan
pengembang.

**Independent Test**: Administrator login, masuk ke halaman manajemen berita,
membuat berita baru, dan berita tersebut langsung tampil di halaman publik.

**Acceptance Scenarios**:

1. **Given** administrator login di halaman Admin Login, **When** kredensial
   valid, **Then** mereka diarahkan ke Dashboard Admin yang menampilkan statistik
   jumlah dosen, UKM, event, berita, FAQ, dan pesan.
2. **Given** administrator berada di halaman Kelola Berita, **When** mereka
   mengeklik "Tambah Berita", mengisi form (judul, tanggal, ringkasan, konten,
   gambar), dan menyimpan, **Then** berita baru muncul di halaman Berita publik.
3. **Given** administrator membuka halaman Pesan Masuk, **When** mereka
   mengeklik salah satu pesan, **Then** detail pesan (nama, email, subjek, isi)
   ditampilkan dan pesan dapat dihapus.

---

### Edge Cases

- Data kosong: Setiap halaman publik menampilkan pesan "Belum ada data" jika
  database belum diisi.
- Gambar tidak tersedia: Tampilkan placeholder jika gambar belum diupload.
- Form kontak: Validasi email, nama tidak boleh kosong. Tampilkan error jika
  validasi gagal.
- Spam form kontak: Rate limiting maks 1 pesan per IP per 5 menit + honeypot
  field tersembunyi untuk mendeteksi bot.
- Google Maps gagal dimuat: Tampilkan static address card dengan alamat teks
  dan link "Buka di Google Maps".
- Event dengan status berbeda: Halaman Event mengelompokkan kartu berdasarkan
  status "Akan Datang", "Sedang Berlangsung", "Selesai".
- Pencarian FAQ: Jika tidak ada hasil pencarian, tampilkan "FAQ tidak ditemukan".

## Requirements

### Functional Requirements

- **FR-001**: Public visitors MUST dapat mengakses semua halaman informasi tanpa
  login.
- **FR-002**: Halaman Home MUST menampilkan pratinjau section (Hero, Quick Nav,
  Blueprint, Dosen, Event, Berita, FAQ) dengan tombol "Lihat Selengkapnya" yang
  menuju halaman masing-masing.
- **FR-003**: Navbar MUST sticky, berisi menu Home, Blueprint Fakultas, Informasi
  (dropdown: UKM, Data Dosen, Event, Berita, Struktur Organisasi, FAQ), Hubungi
  Kami, dan tombol CTA "Hubungi Kami".
- **FR-004**: Halaman Blueprint Fakultas MUST menampilkan daftar fasilitas dengan
  gambar besar dan deskripsi secara bergantian (alternating layout).
- **FR-005**: Halaman UKM MUST menampilkan grid organisasi mahasiswa dengan logo,
  nama, deskripsi, kegiatan, dan kontak.
- **FR-006**: Halaman Data Dosen MUST menampilkan grid dosen dengan foto, nama,
  gelar, jabatan, keahlian, dan minat riset.
- **FR-007**: Halaman Event MUST mengelompokkan event berdasarkan status: Akan
  Datang, Sedang Berlangsung, Selesai. Setiap kartu menuju halaman Detail Event.
- **FR-008**: Halaman Detail Event MUST menampilkan banner, deskripsi, jadwal,
  lokasi, dan event terkait.
- **FR-009**: Halaman Berita MUST menampilkan kartu artikel dengan thumbnail,
  tanggal, judul, ringkasan, dan pagination.
- **FR-010**: Halaman Detail Berita MUST menampilkan hero image, metadata, body
  artikel, breadcrumb, dan artikel terkait.
- **FR-011**: Halaman Struktur Organisasi MUST menampilkan visualisasi hierarki
  kepemimpinan fakultas yang responsif.
- **FR-012**: Halaman FAQ MUST memiliki search bar dan accordion untuk semua
  pertanyaan.
- **FR-013**: Halaman Hubungi Kami MUST memiliki split layout (informasi kontak
  di kiri, form di kanan) dan Google Maps di bawah.
- **FR-014**: Form Hubungi Kami MUST memvalidasi input (nama, email, subjek,
  pesan) dan menyimpan pesan ke database.
- **FR-015**: Admin Login MUST menggunakan email dan password dengan sesi
  aman.
- **FR-016**: Admin Dashboard MUST menampilkan statistik: total dosen, UKM,
  event, berita, FAQ, dan pesan.
- **FR-017**: Admin MUST dapat membuat, mengedit, dan menghapus data untuk
  setiap entitas: Blueprint, Dosen, UKM, Event, Berita, Struktur Organisasi,
  FAQ.
- **FR-018**: Admin MUST dapat melihat daftar pesan masuk, membaca detail pesan,
  dan menghapus pesan.
- **FR-019**: Footer MUST berisi deskripsi fakultas, tautan cepat, informasi
  kontak, media sosial, dan hak cipta.

### Out of Scope

Fitur-fitur berikut secara eksplisit tidak termasuk dalam proyek ini:
- Sistem pendaftaran mahasiswa
- Payment gateway atau sistem pembayaran
- Forum diskusi atau komentar
- Multi-bahasa (hanya Bahasa Indonesia)
- Sistem notifikasi real-time
- Integrasi media sosial dua arah

### Key Entities

- **Blueprint**: Fasilitas kampus (gedung, laboratorium, dll.) dengan judul,
  kategori, deskripsi, detail, dan gambar.
- **Dosen**: Profil dosen dengan nama, gelar akademik, jabatan, bidang keahlian,
  minat riset, email, dan foto.
- **UKM**: Unit kegiatan mahasiswa dengan nama, deskripsi, kegiatan, kontak, dan
  logo.
- **Event**: Acara fakultas dengan judul, slug unik, status (Akan Datang/Sedang
  Berlangsung/Selesai), tanggal, waktu, lokasi, deskripsi, detail, dan poster.
- **News**: Artikel berita dengan judul, slug unik, tanggal, ringkasan, konten, dan gambar.
- **FAQ**: Pertanyaan dan jawaban seputar fakultas.
- **Struktur Organisasi**: Hierarki kepemimpinan dengan parent-child relation,
  jabatan, nama, dan detail tugas.
- **Message**: Pesan dari formulir kontak dengan nama pengirim, email, telepon,
  subjek, isi pesan, tanggal, dan status dibaca.

## Success Criteria

### Measurable Outcomes

- **SC-001**: Semua halaman publik dapat diakses dan menampilkan konten tanpa
  login — pengunjung dapat bernavigasi ke seluruh halaman dalam waktu 3 detik
  sejak halaman mulai dimuat.
- **SC-002**: Formulir Hubungi Kami berhasil menyimpan pesan dan menampilkan
  konfirmasi dalam waktu 2 detik setelah tombol kirim ditekan.
- **SC-003**: Administrator dapat menyelesaikan siklus penuh CRUD (buat, edit,
  hapus) untuk setiap jenis konten tanpa error — perubahan langsung tampil di
  halaman publik.
- **SC-004**: Pengunjung dapat menemukan informasi yang dicari melalui navigasi
  navbar dalam maksimal 3 klik dari homepage.
- **SC-005**: FAQ dengan fitur pencarian dapat memfilter pertanyaan secara
  real-time dan menampilkan hasil dalam waktu 1 detik.

## Assumptions

- Website dihosting di Vercel dengan domain resmi universitas.
- Seluruh konten awal akan diisi oleh administrator melalui panel admin setelah
  website diluncurkan.
- Google Maps ditampilkan dengan alamat kampus fakultas.
- Media sosial fakultas akan ditambahkan oleh administrator di kemudian hari.
- Website menggunakan Bahasa Indonesia untuk seluruh antarmuka publik.
- Navigasi multi-halaman menggunakan sistem routing web standar — setiap halaman
  memiliki URL unik dan dapat diakses langsung.
- Hanya satu administrator yang mengelola konten, tidak ada role hierarchy.
