import { notFound } from "next/navigation"
import { getModelList } from "@/lib/admin-data"
import { resolveModel } from "@/lib/admin-field-configs"
import DataTable from "@/components/dashboard/data-table"
import PageHeader from "@/components/dashboard/page-header"
import type { ModelName } from "@/lib/admin-actions"
import type { Row } from "@/lib/admin-table-types"

const modelPageCopy: Record<string, { eyebrow: string; title: string; description: string }> = {
  blueprint: {
    eyebrow: "Kelola Konten",
    title: "Blueprint & Sarana",
    description: "Kelola ruangan dan fasilitas pendukung fakultas.",
  },
  dosen: {
    eyebrow: "Kelola Konten",
    title: "Dosen",
    description: "Kelola data dan profil tenaga pendidik.",
  },
  ukm: {
    eyebrow: "Kelola Konten",
    title: "Unit Kegiatan Mahasiswa",
    description: "Kelola organisasi dan kegiatan mahasiswa.",
  },
  event: {
    eyebrow: "Kelola Konten",
    title: "Agenda & Event",
    description: "Kelola acara, seminar, dan workshop.",
  },
  news: {
    eyebrow: "Kelola Konten",
    title: "Berita",
    description: "Kelola publikasi dan berita fakultas.",
  },
  faq: {
    eyebrow: "Kelola Konten",
    title: "FAQ",
    description: "Kelola pertanyaan yang sering diajukan.",
  },
  struktur: {
    eyebrow: "Kelola Konten",
    title: "Struktur Organisasi",
    description: "Kelola nama dan jabatan organisasi fakultas.",
  },
}

export default async function ModelListPage({ params }: { params: Promise<{ model: string }> }) {
  const { model } = await params
  const modelName = resolveModel(model)
  if (!modelName || modelName === "message") return notFound()

  const data = await getModelList(modelName as ModelName)
  const copy = modelPageCopy[modelName]

  return (
    <div className="space-y-6">
      <PageHeader {...copy} />
      <DataTable
        modelName={modelName as ModelName}
        rows={data as Row[]}
        baseUrl={`/dashboard/${model}`}
      />
    </div>
  )
}