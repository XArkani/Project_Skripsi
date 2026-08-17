import { notFound } from "next/navigation"
import { getModelById } from "@/lib/admin-data"
import { fieldConfigMap, modelLabels, resolveModel } from "@/lib/admin-field-configs"
import { CrudForm } from "@/components/admin/CrudForm"
import type { ModelName } from "@/lib/admin-actions"

export default async function ModelEditPage({
  params,
}: {
  params: Promise<{ model: string; id: string }>
}) {
  const { model, id } = await params
  const modelName = resolveModel(model)
  if (!modelName) return notFound()

  const fields = fieldConfigMap[modelName]
  const meta = modelLabels[modelName]
  const singular = meta.singular.toLowerCase()

  const record = await getModelById(modelName as ModelName, id)
  if (!record) return notFound()

  return (
    <div className="w-full">
      <header className="mb-8">
        <h1 className="text-2xl font-semibold tracking-tight text-foreground">Edit {singular}</h1>
        <p className="mt-1 text-sm text-muted-foreground">Perbarui informasi {singular} di bawah ini.</p>
      </header>
      <CrudForm
        title={`Edit ${meta.singular}`}
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
