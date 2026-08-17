"use client"

import { useState, useTransition } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ImageUpload } from "./ImageUpload"
import { createRecord, updateRecord, type ModelName } from "@/lib/admin-actions"
import { slugify } from "@/lib/utils"
import { ArrowLeft, Loader2 } from "lucide-react"
import type { FieldConfig } from "@/lib/types"

interface CrudFormProps {
  title: string
  modelName: ModelName
  baseUrl: string
  fields: FieldConfig[]
  mode: "create" | "edit"
  id?: string
  initialData?: Record<string, unknown>
}

export function CrudForm({ title, modelName, baseUrl, fields, mode, id, initialData = {} }: CrudFormProps) {
  const router = useRouter()
  const [formData, setFormData] = useState<Record<string, unknown>>(initialData)
  const [error, setError] = useState<string | null>(null)
  const [pending, startTransition] = useTransition()

  const base = baseUrl
  const editableFields = fields.filter((f) => f.name !== "id")
  const orderedFields = [...editableFields].sort((a, b) => Number(b.type === "image") - Number(a.type === "image"))

  function handleChange(name: string, value: unknown) {
    setFormData((prev) => {
      const next = { ...prev, [name]: value }
      if (name === "title") {
        const slugField = fields.find((f) => f.type === "slug")
        if (slugField) {
          next[slugField.name] = slugify(String(value ?? ""))
        }
      }
      return next
    })
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    for (const f of editableFields) {
      if (f.required) {
        const val = formData[f.name]
        if (val == null || String(val).trim() === "") {
          setError(`"${f.label}" wajib diisi.`)
          return
        }
      }
    }

    startTransition(async () => {
      try {
        if (mode === "edit" && id) {
          const result = await updateRecord(modelName, id, formData)
          if (result.success) router.push(base)
        } else {
          const result = await createRecord(modelName, formData)
          if (result.success) router.push(base)
        }
        router.refresh()
      } catch (err) {
        setError(err instanceof Error ? err.message : "Gagal menyimpan.")
      }
    })
  }

  return (
    <div className="mx-auto max-w-2xl">
      <Link
        href={base}
        className="mb-6 inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        Kembali ke daftar
      </Link>

      <Card>
        <CardHeader className="border-b border-border/50">
          <CardTitle className="text-lg font-semibold tracking-tight">{title}</CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {orderedFields.map((field) => (
              <div key={field.name}>
                <label className="mb-1.5 block text-sm font-medium text-foreground">
                  {field.label}
                  {field.required && <span className="ml-0.5 text-destructive">*</span>}
                </label>

                {field.type === "slug" ? (
                  <Input
                    type="text"
                    value={String(formData[field.name] ?? "")}
                    onChange={(e) => handleChange(field.name, e.target.value)}
                    placeholder="Otomatis dari judul"
                  />
                ) : field.type === "textarea" ? (
                  <Textarea
                    value={String(formData[field.name] ?? "")}
                    onChange={(e) => handleChange(field.name, e.target.value)}
                    rows={4}
                  />
                ) : field.type === "select" ? (
                  <select
                    value={String(formData[field.name] ?? "")}
                    onChange={(e) => handleChange(field.name, e.target.value)}
                    className="flex h-9 w-full rounded-md border border-input bg-transparent px-2.5 py-1 text-sm shadow-xs outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
                  >
                    <option value="">Pilih...</option>
                    {field.options?.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                ) : field.type === "image" ? (
                  <ImageUpload
                    value={String(formData[field.name] ?? "")}
                    onChange={(url) => handleChange(field.name, url)}
                  />
                ) : field.type === "checkbox" ? (
                  <label className="flex items-center gap-2 text-sm text-foreground">
                    <input
                      type="checkbox"
                      checked={Boolean(formData[field.name])}
                      onChange={(e) => handleChange(field.name, e.target.checked)}
                      className="size-4 rounded border-input accent-primary"
                    />
                    {formData[field.name] ? "Ya" : "Tidak"}
                  </label>
                ) : (
                  <Input
                    type={field.type === "number" ? "number" : "text"}
                    value={String(formData[field.name] ?? "")}
                    onChange={(e) => handleChange(field.name, e.target.value)}
                  />
                )}
              </div>
            ))}

            {error && <p className="text-sm font-medium text-destructive">{error}</p>}

            <div className="flex items-center justify-end gap-3 border-t border-border/50 pt-5">
              <Button type="button" variant="ghost" asChild className="cursor-pointer">
                <Link href={base}>Batal</Link>
              </Button>
              <Button type="submit" disabled={pending} className="min-w-28 cursor-pointer">
                {pending ? (
                  <>
                    <Loader2 className="size-4 animate-spin" />
                    Menyimpan...
                  </>
                ) : mode === "edit" ? (
                  "Simpan Perubahan"
                ) : (
                  "Simpan"
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
