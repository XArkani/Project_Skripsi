import { ImageUpload } from "@/components/upload/ImageUpload"
import { FileUpload } from "@/components/upload/FileUpload"
import PageHeader from "@/components/dashboard/page-header"

export default function UploadPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Manajemen Aset"
        title="Upload"
        description="Unggah dan kelola gambar serta dokumen untuk konten fakultas."
      />
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <section className="rounded-xl border border-border bg-card p-5">
          <h2 className="text-lg font-semibold tracking-tight text-foreground">Media / Gambar</h2>
          <p className="mt-0.5 mb-5 text-sm text-muted-foreground">Unggah aset visual untuk konten fakultas.</p>
          <ImageUpload />
        </section>
        <section className="rounded-xl border border-border bg-card p-5">
          <h2 className="text-lg font-semibold tracking-tight text-foreground">Dokumen</h2>
          <p className="mt-0.5 mb-5 text-sm text-muted-foreground">Unggah dokumen dan berkas pendukung.</p>
          <FileUpload />
        </section>
      </div>
    </div>
  )
}