export const instant = false

import { ImageUpload } from "@/components/upload/ImageUpload"
import { FileUpload } from "@/components/upload/FileUpload"
import PageHeader from "@/components/dashboard/page-header"

export default function UploadPage() {
  return (
    <div className="space-y-4 sm:space-y-6">
      <PageHeader
        eyebrow="Manajemen Aset"
        title="Upload"
        description="Unggah dan kelola gambar serta dokumen untuk konten fakultas."
      />
      <p className="rounded-2xl border border-border bg-card p-4 text-[13px] leading-relaxed text-muted-foreground sm:text-sm">
        Catatan: file yang diunggah di sini belum otomatis masuk ke daftar data. Salin URL-nya lalu
        tempel ke kolom Gambar/Logo pada form Tambah/Edit di halaman dashboard agar tampil realtime
        di daftar dan halaman publik.
      </p>
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <section className="rounded-2xl border border-border bg-card p-4 sm:p-5">
          <h2 className="text-base font-semibold tracking-tight text-foreground sm:text-lg">Media / Gambar</h2>
          <p className="mb-4 mt-0.5 text-[13px] text-muted-foreground sm:mb-5 sm:text-sm">Unggah aset visual untuk konten fakultas.</p>
          <ImageUpload />
        </section>
        <section className="rounded-2xl border border-border bg-card p-4 sm:p-5">
          <h2 className="text-base font-semibold tracking-tight text-foreground sm:text-lg">Dokumen</h2>
          <p className="mb-4 mt-0.5 text-[13px] text-muted-foreground sm:mb-5 sm:text-sm">Unggah dokumen dan berkas pendukung.</p>
          <FileUpload />
        </section>
      </div>
    </div>
  )
}
