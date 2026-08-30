import { notFound } from "next/navigation"
import { fieldConfigMap, modelLabels, resolveModel } from "@/lib/admin-field-configs"
import { CrudForm } from "@/components/admin/CrudForm"
import PageHeader from "@/components/dashboard/page-header"
import type { ModelName } from "@/lib/admin-actions"

export default async function ModelNewPage({ params }: { params: Promise<{ model: string }> }) {
  const { model } = await params
  const modelName = resolveModel(model)
  if (!modelName || modelName === "message") return notFound()

  const fields = fieldConfigMap[modelName]
  const meta = modelLabels[modelName]
  const singular = meta.singular.toLowerCase()

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Kelola Konten"
        title={`Tambah ${meta.singular}`}
        description={`Lengkapi informasi di bawah untuk membuat ${singular} baru.`}
      />
      <CrudForm
        modelName={modelName as ModelName}
        baseUrl={`/dashboard/${model}`}
        fields={fields}
        mode="create"
      />
    </div>
  )
}