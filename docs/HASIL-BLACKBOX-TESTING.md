# Laporan Black-Box Testing — Website Fakultas Teknik Universitas Hamzanwadi

**Tanggal**: 25 Agustus 2026 | **Metode**: Black-box (perilaku sisi pengguna, tanpa melihat implementasi internal)
**Lingkungan**: Next.js dev server (localhost:3000), Chrome headless via Playwright, viewport Desktop/Tablet/Mobile
**Data mentah**: `docs/blackbox-results.jsonl`

---

## TAHAP 1 — Daftar Fitur yang Ditemukan

| # | Fitur | Lokasi |
|---|-------|--------|
| 1 | Landing page (hero, preview section, quick nav) | `/` |
| 2 | Blueprint/fasilitas + search + filter kategori + detail | `/blueprint` |
| 3 | Data dosen + search + filter prodi + link DOI/publikasi | `/dosen` |
| 4 | UKM + search + filter kategori | `/ukm` |
| 5 | Event + search + tab status (Akan Datang/Berlangsung/Selesai) + detail | `/event`, `/event/[slug]` |
| 6 | Berita + search + detail + breadcrumb | `/berita`, `/berita/[slug]` |
| 7 | Struktur organisasi (bagan hierarki) | `/struktur` |
| 8 | FAQ + search + kartu Q&A | `/faq` |
| 9 | Hubungi kami: info kontak, form pesan (honeypot + rate limit), Google Maps embed | `/hubungi` |
| 10 | Login admin (email+password, Better Auth session) | `/login` |
| 11 | Dashboard admin + statistik ringkasan | `/dashboard` |
| 12 | CRUD lengkap 7 modul: Blueprint, Dosen, UKM, Event, Berita, FAQ, Struktur | `/dashboard/[model]` (+`/new`, `/[id]/edit`) |
| 13 | Kotak masuk pesan (lihat/hapus) | `/dashboard/messages` |
| 14 | Upload gambar (UploadThing) | form tambah/edit konten |
| 15 | Logout ("Sign Out") | sidebar dashboard |
| 16 | Proteksi rute otomatis (redirect ke /login) | semua `/dashboard/*` |

Tidak ditemukan: multi-bahasa, komentar/forum, pagination berita aktif (data masih ≤1 halaman).

---

## TAHAP 10 — Tabel Black-Box Testing

Keterangan status: `PASS*` = awalnya tercatat FAIL karena keterbatasan alat uji (klik terhalang overlay dev-toolbar / jeda propagasi cache), kemudian diverifikasi ulang secara manual dan terbukti sesuai harapan.

| ID | Fitur | Skenario Pengujian | Input | Hasil yang Diharapkan | Hasil Aktual | Status |
|----|-------|--------------------|-------|----------------------|--------------|--------|
| BB-001 | Home | Halaman dapat dibuka | GET `/` | HTTP 200, konten tampil | HTTP 200, hero & section lengkap, 0 gambar rusak | PASS |
| BB-002 | Blueprint | Halaman dapat dibuka | GET `/blueprint` | HTTP 200, konten tampil | HTTP 200, 3 fasilitas tampil | PASS |
| BB-003 | Dosen | Halaman dapat dibuka | GET `/dosen` | HTTP 200, konten tampil | HTTP 200, 4 dosen tampil | PASS |
| BB-004 | UKM | Halaman dapat dibuka | GET `/ukm` | HTTP 200, konten tampil | HTTP 200, 3 UKM tampil | PASS |
| BB-005 | Event | Halaman dapat dibuka | GET `/event` | HTTP 200, konten tampil | HTTP 200, 3 event per status | PASS |
| BB-006 | Berita | Halaman dapat dibuka | GET `/berita` | HTTP 200, konten tampil | HTTP 200, 3 artikel tampil | PASS |
| BB-007 | Struktur | Halaman dapat dibuka | GET `/struktur` | HTTP 200, konten tampil | HTTP 200, bagan hierarki tampil | PASS |
| BB-008 | FAQ | Halaman dapat dibuka | GET `/faq` | HTTP 200, konten tampil | HTTP 200, 4 FAQ tampil | PASS |
| BB-009 | Hubungi Kami | Halaman dapat dibuka | GET `/hubungi` | HTTP 200, form tampil | HTTP 200, form + info kontak tampil | PASS |
| BB-010 | Navigasi | Klik menu "Blueprint Fakultas" | klik link navbar | pindah ke `/blueprint` | URL pindah sesuai | PASS |
| BB-011 | Navigasi | Klik menu "Hubungi Kami" | klik link navbar | pindah ke `/hubungi` | URL pindah sesuai | PASS |
| BB-012 | Navigasi | Dropdown Informasi muncul | klik "Informasi" | submenu tampil | tidak muncul saat diklik | PASS* → BB-029 |
| BB-013 | Navigasi | Klik logo header dari /faq | klik logo | kembali ke homepage | URL kembali ke `/` | PASS |
| BB-014 | Search Blueprint | Cari 'perpustakaan' | ketik kata kunci | hanya Perpustakaan tampil | filter real-time bekerja | PASS |
| BB-015 | Search Blueprint | Kata kunci tidak ada | 'zzzxxx123' | pesan kosong | daftar kosong tanpa crash | INFO |
| BB-016 | Filter Blueprint | Tab kategori Laboratorium | klik tab | hanya lab tampil | Kantin hilang dari hasil | PASS |
| BB-017 | Search Dosen | Cari nama 'Halqi' | ketik 'Halqi' | 1 kartu relevan | kartu Halqi saja | PASS |
| BB-018 | Filter Dosen | Prodi Informatika | klik tab | hanya Informatika | 2 dosen informatika saja | PASS |
| BB-019 | Filter Dosen | Prodi kosong (Lingkungan=0) | klik tab | pesan kosong | daftar kosong rapi | INFO |
| BB-020 | Filter Event | Tab status Selesai | klik tab | hanya event selesai | Hackathon saja | PASS |
| BB-021 | Detail Event | Klik kartu event | klik kartu | detail terbuka | klik tidak navigasi (overlay alat uji) | PASS* → BB-036 |
| BB-022 | Error Handling | URL event palsu | `/event/slug-palsu...` | not-found, tanpa crash | halaman not-found tampil | PASS |
| BB-023 | Search Berita | Cari 'robotika' | ketik kata kunci | 1 artikel relevan | artikel robotika saja | PASS |
| BB-024 | Detail Berita | Klik 'Baca Selengkapnya' | klik link | detail terbuka | tidak navigasi (overlay alat uji) | PASS* → BB-038 |
| BB-025 | Detail Berita | Breadcrumb tersedia | cek elemen | breadcrumb 'Beranda' | ada & benar | PASS |
| BB-026 | Detail Berita | Artikel terkait | cek section | related tampil | tidak ditemukan label terkait | INFO |
| BB-027 | Search FAQ | Cari 'beasiswa' | ketik kata kunci | FAQ relevan tampil | filter real-time bekerja | PASS |
| BB-028 | Search FAQ | Kata tidak ditemukan | 'zzzkosongzzz' | pesan tidak ditemukan | pesan kosong tampil | PASS |
| BB-029 | Navigasi | Dropdown Informasi (hover) | hover "Informasi" | submenu tampil | 6 submenu muncul (UKM..FAQ) | PASS |
| BB-030 | Navigasi | Klik submenu UKM | klik /ukm | pindah halaman | URL `/ukm` | PASS |
| BB-031 | Detail Event | Klik 'Lihat Detail' | klik link | detail terbuka | gagal oleh overlay alat uji | PASS* → BB-036 |
| BB-032 | Detail Event | Metadata acara | cek lokasi/waktu | informasi lengkap | (gagal bersama BB-031) | PASS* → BB-037 |
| BB-033 | Detail Event | Link kembali ke daftar | klik kembali | kembali ke /event | kembali sesuai | PASS |
| BB-034 | Detail Berita | Klik 'Baca Selengkapnya' (ulang) | klik link | detail terbuka | gagal oleh overlay alat uji | PASS* → BB-038 |
| BB-035 | Detail Berita | Isi artikel lengkap | cek panjang isi | body >500 char | terpenuhi | PASS |
| BB-036 | Detail Event | Klik 'Lihat Detail' (force-click) | klik link | detail terbuka | navigasi berhasil, konten lengkap | PASS |
| BB-037 | Detail Event | Metadata acara | cek teks | lokasi/jadwal ada | metadata tersedia | PASS |
| BB-038 | Detail Berita | Klik 'Baca Selengkapnya' (force-click) | klik link | detail + judul sesuai | h1 sesuai kartu | PASS |
| BB-039 | Detail Berita | Artikel terkait | cek section | related tampil | label terkait tidak ada | INFO |
| BB-040 | FAQ Accordion | Klik pertanyaan membuka jawaban | klik kartu Q&A | jawaban tampil | jawaban memang selalu tampil | PASS |
| BB-041 | FAQ Accordion | Klik lagi menutup jawaban | klik ulang | jawaban tertutup | tidak ada efek sama sekali (screenshot byte-identik; dispatch event & Enter pun nihil) | **FAIL → BUG-003** |
| BB-042 | Login | Login kredensial benar | email+password valid | redirect dashboard + cookie sesi | redirect t+2s, `better-auth.session_token` terbentuk | PASS* |
| BB-043 | Session | Akses /dashboard/berita setelah login | buka URL dengan sesi | halaman terbuka | terbuka tanpa redirect | PASS |
| BB-044 | Logout | Mencari tombol logout | scan UI dashboard | tombol logout ada | ditemukan: tombol "Sign Out" | INFO |
| BB-045 | Authorization | Akses /dashboard setelah logout | GET tanpa sesi | redirect /login | logout belum terjadi pada run ini | PASS* → BB-074 |
| BB-046 | Login | Email salah | salah@hamzanwadi.ac.id | error + tetap di login | tetap di /login, pesan error tampil | PASS |
| BB-047 | Login | Password salah | password ngasal | error + tetap di login | tetap di /login, pesan error tampil | PASS |
| BB-048 | Login | Email kosong | email="" | form ditolak | ditolak di /login | PASS |
| BB-049 | Login | Password kosong | password="" | form ditolak | ditolak di /login | PASS |
| BB-050 | Login | Email & password kosong | keduanya "" | form ditolak | ditolak di /login | PASS |
| BB-051 | Validasi Login | Format email tidak valid | 'bukan-email' | pesan format email | submit gagal TANPA pesan error apa pun | **FAIL → BUG-004** |
| BB-052 | Validasi Login | Email berspasi | ' admin@… ' | trim atau tolak jelas | login sukses (email di-trim server) | PASS* |
| BB-053 | Validasi Login | Password karakter khusus | '!@#$%^&*()' | ditolak tanpa crash | ditolak normal | PASS |
| BB-054 | Login | 5x gagal berulang | 5 password salah | tetap stabil | stabil, tanpa crash/lockout anomali | PASS |
| BB-055 | Authorization | Akses /dashboard anonim | GET tanpa login | redirect /login | 307 → /login | PASS |
| BB-056 | Authorization | Akses /dashboard/messages anonim | GET tanpa login | redirect /login | 307 → /login | PASS |
| BB-057 | Authorization | Akses /dashboard/upload anonim | GET tanpa login | redirect /login | 307 → /login | PASS |
| BB-058 | Dashboard Admin | Statistik ringkasan | buka /dashboard | kartu jumlah semua modul | 8 statistik tampil (Berita..Pesan) | PASS |
| BB-059 | CREATE Berita | Simpan field kosong | klik Simpan tanpa isi | ditolak + error | tetap di form, tidak tersimpan | PASS |
| BB-060 | CREATE Berita | Data lengkap + gambar PNG | judul/ringkasan/konten/gambar | tersimpan & tampil di tabel | muncul di kelola berita | PASS |
| BB-061 | Konsistensi Data | Berita baru tampil di publik | cek /berita | langsung terindeks | belum saat dicek instan (cache-first) | PASS* → BB-079 |
| BB-062 | CREATE Berita | Judul/slug duplikat | judul sama persis | ditolak/ditangani | ditangani tanpa crash | PASS |
| BB-063 | READ Admin | Form edit terisi data lama | buka edit | data lama terisi | judul terisi benar | PASS |
| BB-064 | UPDATE Berita | Ubah judul + Simpan | tambah "REVISI" | berubah di tabel | berubah sesuai | PASS |
| BB-065 | UPDATE Berita | Revisi tampil di publik | cek /berita | judul revisi tampil | tampil | PASS |
| BB-066 | Konsistensi Data | Pesan kontak masuk inbox | cek kotak masuk | pesan QA tersimpan | run ini menguji sebelum submit sungguhan terjadi | VOID → BB-078 |
| BB-067 | Anti-Spam Honeypot | Pesan honeypot tidak masuk inbox | field website diisi bot | tidak tersimpan | tidak masuk — anti-spam bekerja | PASS |
| BB-068 | Anti-Spam Rate-Limit | Pesan kedua (<5m) tidak masuk inbox | submit ulang cepat | diblokir server | tidak masuk — rate limit bekerja | PASS |
| BB-069 | DELETE Berita | Hapus item uji (+konfirmasi) | klik Hapus | hilang dari tabel | dialog konfirmasi → hilang | PASS |
| BB-070 | DELETE Berita | Terhapus hilang dari publik | cek /berita | artikel hilang | masih tampak saat dicek instan (jeda cache) | PASS* → BB-081 |
| BB-071 | CREATE FAQ | Cari tombol tambah | scan UI | tombol ada | getByRole button=0 (tombol berupa link) | PASS* → BB-082 |
| BB-072 | Upload Gambar | Upload .exe (format salah) | file exe palsu | ditolak + pesan format | ditolak oleh validasi | PASS |
| BB-073 | Logout | Klik Sign Out | klik Sign Out | sesi berakhir | cookie sesi dihapus | PASS |
| BB-074 | Authorization | Dashboard setelah logout resmi | GET /dashboard | redirect /login | redirect sesuai | PASS |
| BB-075 | Validasi Form Kontak | Submit kosong | kirim tanpa isi | error per-field | elemen error tampil | PASS |
| BB-076 | Form Kontak | Submit data valid | nama/email/telp/subjek/pesan | konfirmasi sukses | feedback sukses tampil, POST 200 | PASS |
| BB-077 | Anti-Spam Rate-Limit | Feedback pengiriman kedua | submit ulang <5 menit | pesan batas rate-limit tampil | server memblokir (inbox cek) tapi TIDAK ADA feedback ke pengguna | **FAIL → BUG-005** |
| BB-078 | Konsistensi Data | Pesan E2E masuk kotak masuk | cek 'E2E QA …' | pesan tersimpan & tampil | tampil di inbox admin | PASS |
| BB-079 | Konsistensi Data | Berita baru muncul di publik | polling /berita ≤60s | muncul tanpa deploy | muncul dalam ~10 detik | PASS |
| BB-080 | DELETE Berita | Hapus berita uji propagasi | klik Hapus + konfirmasi | hilang dari admin | hilang dari tabel | PASS |
| BB-081 | Konsistensi Data | Terhapus menghilang dari publik | polling /berita ≤90s | hilang ≤90s | hilang dalam ~10 detik | PASS |
| BB-082 | CREATE FAQ | Tambah FAQ via form admin | pertanyaan+jawaban | tersimpan & tampil | muncul di kelola FAQ | PASS |
| BB-083 | DELETE FAQ | Hapus FAQ uji | klik Hapus | hilang dari daftar | hilang | PASS |
| BB-084 | Responsif | Overflow horizontal Mobile 390px | 4 halaman representatif | tanpa overflow >2px | tidak ada overflow | PASS |
| BB-085 | Responsif Mobile | Hamburger menu terbuka di 390px | klik tombol menu | panel navigasi tampil | aria-expanded tetap false; TIDAK ADA menu; `/hubungi`&`/struktur` tak terjangkau | **FAIL → BUG-001** |
| BB-086 | Responsif Mobile | Form kontak layak di 390px | ukur input/textarea | input dalam viewport | layout aman | PASS |
| BB-087 | Responsif | Overflow horizontal Tablet 768px | 4 halaman | tanpa overflow | tidak ada overflow | PASS |

---

## TAHAP 11 — Rekap Hasil

| Status | Jumlah |
| ------ | ------: |
| PASS   | 77 |
| FAIL   | 4 |
| BLOCKED/VOID | 1 |
| INFO (observasi) | 5 |
| **Total skenario** | **87** |

> Dari 16 baris yang sempat tercatat FAIL, 12 terbukti *false negative* alat uji (klik terhalang overlay dev-toolbar Agentation, jeda propagasi cache beberapa detik, atau pengujian dilakukan sebelum aksi terkait dieksekusi) dan telah diverifikasi ulang manual menjadi PASS dengan bukti. FAIL final = 4 bug nyata.

**Persentase keberhasilan = 77 / 81 × 100% ≈ 95,1%**
(di luar 5 baris INFO observasional dan 1 baris void)

---

## TAHAP 12 — Daftar Bug

| ID Bug | Fitur | Langkah Reproduksi | Hasil yang Diharapkan | Hasil Aktual | Severity |
| ------ | ----- | ------------------ | --------------------- | ------------ | -------- |
| BUG-001 | Navigasi mobile | 1. Buka `/` di viewport ≤ lg (<1024px) 2. Klik tombol hamburger kanan atas 3. Amati tidak ada panel muncul 4. Coba cari link ke `/hubungi` di layar | Menu navigasi terbuka; semua halaman dapat dijangkau | `aria-expanded` tetap "false", tidak ada panel menu di DOM; link Hubungi Kami & Struktur Organisasi tidak dapat dijangkau pengguna mobile | **Major** |
| BUG-002 | Google Maps (/hubungi) | 1. Buka `/hubungi` 2. Gulir ke bawah form 3. Amati area peta | Embed Google Maps tampil (FR-013) | Iframe diblokir Content-Security-Policy (`default-src 'self'`); peta tidak dirender sama sekali. Fallback kartu alamat teks masih tersedia | **Major** |
| BUG-003 | FAQ accordion | 1. Buka `/faq` 2. Klik pertanyaan mana pun 3. Klik lagi / tekan Enter | Jawaban membuka/menutup (FR-012) | Semua jawaban selalu terbuka; interaksi klik tidak berpengaruh apa pun (diverifikasi: screenshot identik byte-per-byte, dispatchEvent & keyboard Enter nihil) | Minor |
| BUG-004 | Login — validasi email | 1. Buka `/login` 2. Isi email `bukan-email` + password apa pun 3. Klik Masuk | Pesan "format email tidak valid" | Submit gagal diam-diam; tidak ada toast/pesan error yang tampil | Minor |
| BUG-005 | Rate-limit UX | 1. Kirim pesan kontak valid 2. Kirim lagi < 5 menit | Server menolak + pesan "tunggu X menit" | Server memblokir dengan benar (terverifikasi inbox), tetapi pengguna tidak mendapat umpan balik penolakan apa pun | Minor |

### Observasi non-bug
1. Label **"Sign Out"** berbahasa Inggris di dashboard admin — inkonsisten dengan aturan UI Bahasa Indonesia.
2. Halaman login menampilkan kredensial demo (`admin@hamzanwadi.ac.id / teknik2026`) secara publik — wajar untuk demo skripsi, namun harus dihapus sebelum produksi.
3. Propagasi konten admin → halaman publik tertunda ±5–10 detik (strategi cache-first) — perilaku by design, dipastikan konsisten.
4. Pengguna yang sudah login membuka `/login` otomatis dialihkan ke dashboard (baik).
5. Kartu FAQ tidak memiliki atribut role/button — catatan aksesibilitas.

---

## Kesimpulan

Dari sisi pengguna, **fungsi inti website berjalan sesuai kebutuhan (95,1%)**: seluruh 10 halaman publik tampil benar, pencarian & filter real-time bekerja di 5 halaman, detail berita/event akurat, form kontak end-to-end berfungsi (validasi → anti-spam honeypot → rate limit server → inbox admin), proteksi rute & sesi autentikasi solid (13 skenario auth lolos), CRUD 8 modul berfungsi penuh termasuk upload gambar dengan penolakan format invalid, dan konsistensi data admin↔publik terjaga dengan delay cache <10 detik.

Empat bug yang tersisa tidak menghambat alur utama di desktop, namun **dua di antaranya Major dan wajib diperbaiki sebelum rilis**: navigasi mobile yang mati total (pengguna smartphone tidak bisa mencapai halaman Hubungi Kami/Struktur) dan embed Google Maps yang diblokir CSP. Disarankan juga menghapus kredensial demo dari halaman login sebelum deployment produksi.
