import { notFound } from "next/navigation"
import { fieldConfigMap, modelLabels, resolveModel } from "@/lib/admin-field-configs"
import { CrudForm } from "@/components/admin/CrudForm"
import type { ModelName } from "@/lib/admin-actions"

export default async function ModelNewPage({ params }: { params: Promise<{ model: string }> }) {
  const { model } = await params
  const modelName = resolveModel(model)
  if (!modelName) return notFound()

  const fields = fieldConfigMap[modelName]
  const meta = modelLabels[modelName]
  const singular = meta.singular.toLowerCase()

  return (
    <div className="w-full">
      <header className="mb-8">
        <h1 className="text-2xl font-semibold tracking-tight text-foreground">Tambah {singular}</h1>
        <p className="mt-1 text-sm text-muted-foreground">Lengkapi informasi di bawah untuk membuat {singular} baru.</p>
      </header>
      <CrudForm
        title={`Tambah ${meta.singular}`}
        modelName={modelName as ModelName}
        baseUrl={`/dashboard/${model}`}
        fields={fields}
        mode="create"
      />
    </div>
  )
}
