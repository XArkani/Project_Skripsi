import { notFound } from "next/navigation"
import { getModelList } from "@/lib/admin-data"
import { fieldConfigMap, modelLabels, resolveModel } from "@/lib/admin-field-configs"
import { CrudList } from "@/components/admin/CrudList"
import { contentHues } from "@/lib/admin-hues"
import type { ModelName } from "@/lib/admin-actions"

const modelHue: Record<string, keyof typeof contentHues> = {
  blueprint: "blueprint",
  dosen: "dosen",
  ukm: "ukm",
  event: "event",
  news: "berita",
  faq: "faq",
  struktur: "struktur",
  message: "pesan",
}

export default async function ModelListPage({ params }: { params: Promise<{ model: string }> }) {
  const { model } = await params
  const modelName = resolveModel(model)
  if (!modelName) return notFound()

  const fields = fieldConfigMap[modelName]
  const meta = modelLabels[modelName]
  const data = await getModelList(modelName as ModelName)
  const hue = contentHues[modelHue[modelName] ?? "dashboard"]

  return (
    <div className="w-full">
      <header className="mb-8">
        <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
          <span className={`h-1.5 w-1.5 rounded-full ${hue.chip.split(" ")[0]}`} aria-hidden="true" />
          Kelola Konten
        </p>
        <h1 className="mt-2 text-2xl font-semibold tracking-tight text-foreground">{meta.plural}</h1>
        <p className="mt-1 text-sm text-muted-foreground">Kelola dan perbarui data {meta.singular.toLowerCase()}.</p>
      </header>
      <CrudList
        title={meta.plural}
        modelName={modelName as ModelName}
        baseUrl={`/dashboard/${model}`}
        fields={fields}
        initialData={data}
      />
    </div>
  )
}
