"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DataTable } from "./DataTable"
import { FormModal } from "./FormModal"
import { createRecord, updateRecord, deleteRecord } from "@/lib/admin-actions"
import type { FieldConfig } from "@/lib/types"
import type { ModelName } from "@/lib/admin-actions"

interface CrudManagerProps {
  title: string
  modelName: ModelName
  fields: FieldConfig[]
  initialData: unknown[]
}

export function CrudManager({ title, modelName, fields, initialData }: CrudManagerProps) {
  const [data, setData] = useState<Record<string, unknown>[]>(initialData as Record<string, unknown>[])
  const [modalOpen, setModalOpen] = useState(false)
  const [editItem, setEditItem] = useState<Record<string, unknown> | null>(null)

  async function handleSubmit(formData: Record<string, unknown>) {
    if (editItem) {
      const result = await updateRecord(modelName, editItem.id as string, formData)
      if (result.success) {
        setData((prev) => prev.map((item) => (item.id === editItem.id ? result.data : item)))
      }
    } else {
      const result = await createRecord(modelName, formData)
      if (result.success) {
        setData((prev) => [result.data, ...prev])
      }
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Hapus data ini?")) return
    await deleteRecord(modelName, id)
    setData((prev) => prev.filter((item) => item.id !== id))
  }

  function handleEdit(item: Record<string, unknown>) {
    setEditItem(item)
    setModalOpen(true)
  }

  function handleAdd() {
    setEditItem(null)
    setModalOpen(true)
  }

  function handleClose() {
    setModalOpen(false)
    setEditItem(null)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <DataTable
          columns={fields}
          data={data}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onAdd={handleAdd}
          searchKeys={fields.map((f) => f.name)}
        />
        <FormModal
          open={modalOpen}
          onOpenChange={handleClose}
          fields={fields}
          initialData={editItem}
          onSubmit={handleSubmit}
        />
      </CardContent>
    </Card>
  )
}
