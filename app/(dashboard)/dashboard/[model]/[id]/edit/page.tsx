export const instant = false

import { notFound } from "next/navigation"
import { getModelById } from "@/lib/admin-data"
import { fieldConfigMap, modelLabels, resolveModel } from "@/lib/admin-field-configs"
import { CrudForm } from "@/components/admin/CrudForm"
import PageHeader from "@/components/dashboard/page-header"
import type { ModelName } from "@/lib/admin-actions"

export default async function ModelEditPage({
  params,
}: {
  params: Promise<{ model: string; id: string }>
}) {
  const { model, id } = await params
  const modelName = resolveModel(model)
  if (!modelName || modelName === "message") return notFound()

  const fields = fieldConfigMap[modelName]
  const meta = modelLabels[modelName]
  const singular = meta.singular.toLowerCase()

  const record = await getModelById(modelName as ModelName, id)
  if (!record) return notFound()

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Kelola Konten"
        title={`Edit ${meta.singular}`}
        description={`Perbarui informasi ${singular} di bawah ini.`}
      />
      <CrudForm
        modelName={modelName as ModelName}
        baseUrl={`/dashboard/${model}`}
        fields={fields}
        mode="edit"
        id={id}
        initialData={JSON.parse(JSON.stringify(record))}
      />
    </div>
  )
}