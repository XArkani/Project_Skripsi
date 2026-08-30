# Alur Website Fakultas Teknik - 5 Flowchart Penting

> Semua diagram pakai bahasa sederhana, tanpa istilah teknis.

---

## 1. Pengunjung Buka Website

Alur utama orang yang pertama kali buka website.

```
                    .-----------------.
                   (      MULAI       )
                    '--------+--------'
                             |
                             v
                    +-------------------+
                    | Buka Halaman Awal |
                    +---------+---------+
                              |
                              v
                    +-------------------+
                    | Lihat Menu & Info |
                    | (Berita, Dosen,   |
                    |  Event, dll)      |
                    +---------+---------+
                              |
                              v
                       +------+------+
                       | Mau lihat   |
                       | detail?     |
                       +--+-------+--+
                          |       |
                     Ya --+       +-- Tidak
                      |                |
                      v                v
            +-----------------+  +--------------+
            | Klik "Lihat     |  | Tetap di     |
            | Selengkapnya"   |  | Halaman Awal |
            +--------+--------+  +------+-------+
                     |                  |
                     v                  v
            +-----------------+   .-----------------.
            | Baca Halaman    |  (     SELESAI      )
            | Lengkap         |   '-----------------'
            +--------+--------+
                     |
                     v
              .-----------------.
             (     SELESAI      )
              '-----------------'
```

**Penjelasan:**
Pengunjung buka halaman awal, lihat ringkasan info. Kalau tertarik, klik tombol untuk baca lebih lengkap. Kalau tidak, tetap di halaman awal.

---

## 2. Admin Masuk ke Dashboard

Alur admin untuk masuk dan kelola website.

```
                    .-----------------.
                   (      MULAI       )
                    '--------+--------'
                             |
                             v
                    +-------------------+
                    | Buka Halaman      |
                    | Login Admin       |
                    +---------+---------+
                              |
                              v
                    +-------------------+
                    | Isi Email &       |
                    | Password          |
                    +---------+---------+
                              |
                              v
                       +------+------+
                       | Benar?      |
                       +--+-------+--+
                          |       |
                     Ya --+       +-- Tidak
                      |                |
                      v                v
            +-----------------+  +--------------+
            | Masuk ke        |  | Lihat Pesan  |
            | Dashboard       |  | "Gagal Masuk"|
            +--------+--------+  +------+-------+
                     |                  |
                     |                  v
                     |          +--------------+
                     |          | Coba Lagi    |
                     |          +------+-------+
                     |                 |
                     |                 v
                     |          .-----------------.
                     |         (     SELESAI      )
                     |          '-----------------'
                     v
            +-----------------+
            | Lihat Angka     |
            | Ringkasan       |
            | (Jumlah Dosen,  |
            |  Berita, dll)   |
            +--------+--------+
                     |
                     v
              .-----------------.
             (     SELESAI      )
              '-----------------'
```

**Penjelasan:**
Admin buka halaman login, isi email dan password. Kalau benar langsung masuk dashboard dan lihat ringkasan data. Kalau salah, muncul pesan gagal dan bisa coba lagi.

---

## 3. Admin Kelola Konten (Tambah / Ubah / Hapus)

Alur admin saat atur data seperti Berita, Dosen, Event, dll.

```
                    .-----------------.
                   (      MULAI       )
                    '--------+--------'
                             |
                             v
                    +-------------------+
                    | Pilih Menu        |
                    | (Berita/Dosen/    |
                    |  Event/UKM/dll)   |
                    +---------+---------+
                              |
                              v
                    +-------------------+
                    | Lihat Daftar Data |
                    +---------+---------+
                              |
                              v
                 +------------+------------+
                 |            |            |
                 v            v            v
          +-----------+ +----------+ +----------+
          | Tambah    | | Ubah     | | Hapus    |
          | Baru      | | Data     | | Data     |
          +-----+-----+ +----+-----+ +-----+----+
                |            |             |
                v            v             v
          +-----------+ +----------+ +----------+
          | Isi Form  | | Ganti    | | Pastikan |
          | Kosong    | | Isian    | | Yakin?   |
          +-----+-----+ +----+-----+ +-----+----+
                |            |             |
                +------------+-------------+
                              |
                              v
                    +-------------------+
                    | Tekan Simpan      |
                    +---------+---------+
                              |
                              v
                    +-------------------+
                    | Data Langsung     |
                    | Muncul di Website |
                    +--------+----------+
                             |
                             v
                      .-----------------.
                     (     SELESAI      )
                      '-----------------'
```

**Penjelasan:**
Admin pilih mau atur apa, lalu bisa tambah data baru, ubah data lama, atau hapus data. Setelah tekan simpan, perubahan langsung terlihat oleh pengunjung di website.

---

## 4. Pengunjung Kirim Pesan (Hubungi Kami)

Alur kirim pesan lewat form kontak.

```
                    .-----------------.
                   (      MULAI       )
                    '--------+--------'
                             |
                             v
                    +-------------------+
                    | Buka Halaman      |
                    | Hubungi Kami      |
                    +---------+---------+
                              |
                              v
                    +-------------------+
                    | Isi Form          |
                    | (Nama, Email,     |
                    |  Pesan)           |
                    +---------+---------+
                              |
                              v
                       +------+------+
                       | Lengkap &   |
                       | Benar?      |
                       +--+-------+--+
                          |       |
                     Ya --+       +-- Tidak
                      |                |
                      v                v
            +-----------------+  +--------------+
            | Cek Apakah      |  | Lihat Pesan  |
            | Bukan Spam      |  | "Lengkapi    |
            +--------+--------+  |  Form"       |
                     |          +------+-------+
                     v                 |
                +----+----+            v
                | Spam?   |     +--------------+
                +--+---+--+     | Perbaiki     |
                   |   |        | Isian        |
              Tidak+   +Ya      +------+-------+
                |      |               |
                v      v               |
     +-----------------+ +-----------+ |
     | Pesan Tersimpan | | Ditolak,  |<+
     +--------+--------+ | Tunggu 5  |
              |         | Menit     |
              |         +-----+-----+
              |               |
              |               v
              |        .-----------------.
              |       (     SELESAI      )
              |        '-----------------'
              v
     +-----------------+
     | Lihat Pesan     |
     | "Berhasil       |
     | Terkirim"       |
     +--------+--------+
              |
              v
       .-----------------.
      (     SELESAI      )
       '-----------------'
```

**Penjelasan:**
Pengunjung isi form kontak. Kalau ada yang kosong/salah, diminta perbaiki dulu. Kalau sudah benar, sistem cek apakah spam. Kalau spam ditolak, kalau bukan spam pesan disimpan dan muncul tulisan berhasil terkirim.

---

## 5. Pengunjung Cari Informasi

Alur cari jawaban atau event/berita yang diinginkan.

```
                    .-----------------.
                   (      MULAI       )
                    '--------+--------'
                             |
                             v
                    +-------------------+
                    | Buka Halaman      |
                    | (FAQ / Berita /   |
                    |  Event)           |
                    +---------+---------+
                              |
                              v
                    +-------------------+
                    | Ketik di Kotak    |
                    | Pencarian         |
                    +---------+---------+
                              |
                              v
                       +------+------+
                       | Ketemu?     |
                       +--+-------+--+
                          |       |
                     Ya --+       +-- Tidak
                      |                |
                      v                v
            +-----------------+  +--------------+
            | Lihat Hasil     |  | Lihat Tulisan|
            | Pencarian       |  | "Tidak       |
            +--------+--------+  |  Ditemukan"  |
                     |          +------+-------+
                     v                 |
            +-----------------+        v
            | Klik untuk      |  .-----------------.
            | Baca Lengkap    | (     SELESAI      )
            +--------+--------+  '-----------------'
                     |
                     v
              .-----------------.
             (     SELESAI      )
              '-----------------'
```

**Penjelasan:**
Pengunjung buka halaman FAQ/Berita/Event lalu ketik kata kunci di kotak pencarian. Kalau ada yang cocok langsung ditampilkan, kalau tidak ada muncul tulisan tidak ditemukan. Kalau ketemu, bisa diklik untuk baca lebih lengkap.

---
