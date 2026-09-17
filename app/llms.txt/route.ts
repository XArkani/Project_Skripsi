import { getSiteUrl } from "@/lib/site-url"

export function GET() {
  const base = getSiteUrl()
  const body = `# Fakultas Teknik Universitas Hamzanwadi

> Portal resmi Fakultas Teknik Universitas Hamzanwadi (FT Hamzanwadi). Berisi profil fakultas, blueprint & fasilitas, data dosen, agenda & event, berita, struktur organisasi, unit kegiatan mahasiswa (UKM), dan kanal kontak.

## Halaman utama
- [Beranda](${base}/): ringkasan fakultas, statistik, fasilitas unggulan, tenaga pendidik, agenda, berita, dan kehidupan mahasiswa.
- [Blueprint & Fasilitas](${base}/blueprint): daftar gedung, laboratorium, dan sarana prasarana.
- [Dosen](${base}/dosen): direktori tenaga pendidik beserta program studi, jabatan, dan kepakaran.
- [Berita & Publikasi](${base}/berita): berita dan publikasi terbaru fakultas.
- [Agenda & Event](${base}/event): jadwal seminar, workshop, dan kegiatan fakultas.
- [Kemahasiswaan (UKM)](${base}/ukm): unit kegiatan mahasiswa dan aktivitasnya.
- [Struktur Organisasi](${base}/struktur): susunan pimpinan dan unit fakultas.
- [Tanya Jawab (FAQ)](${base}/faq): pertanyaan yang sering diajukan.
- [Hubungi Kami](${base}/hubungi): kanal kontak resmi fakultas.

## Catatan
- Halaman admin (/dashboard) dan area unggah (/upload) tidak untuk publik dan tidak diindeks.
- Sitemap: ${base}/sitemap.xml
`
  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  })
}
