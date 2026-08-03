"use client"

import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { ImageUpload } from "./ImageUpload"
import type { FieldConfig } from "@/lib/types"

interface FormModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  fields: FieldConfig[]
  initialData: Record<string, unknown> | null
  onSubmit: (data: Record<string, unknown>) => Promise<void>
}

export function FormModal({ open, onOpenChange, fields, initialData, onSubmit }: FormModalProps) {
  const [formData, setFormData] = useState<Record<string, unknown>>(initialData ?? {})
  const [error, setError] = useState<string | null>(null)

  function handleChange(name: string, value: unknown) {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    const required = fields.filter((f) => f.required)
    for (const f of required) {
      const val = formData[f.name]
      if (val == null || String(val).trim() === "") {
        setError(`"${f.label}" wajib diisi.`)
        return
      }
    }
    try {
      await onSubmit(formData)
      onOpenChange(false)
      setFormData({})
    } catch (err) {
      setError(err instanceof Error ? err.message : "Gagal menyimpan.")
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{initialData ? "Edit" : "Tambah"} Data</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          {fields
            .filter((f) => f.name !== "id")
            .map((field) => (
              <div key={field.name}>
                <label className="block text-xs font-bold text-muted-foreground uppercase mb-1.5">
                  {field.label}
                  {field.required && <span className="text-destructive ml-0.5">*</span>}
                </label>
                {field.type === "textarea" ? (
                  <Textarea
                    value={String(formData[field.name] ?? "")}
                    onChange={(e) => handleChange(field.name, e.target.value)}
                    rows={4}
                  />
                ) : field.type === "select" ? (
                  <select
                    value={String(formData[field.name] ?? "")}
                    onChange={(e) => handleChange(field.name, e.target.value)}
                    className="flex h-10 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
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
                  <input
                    type="checkbox"
                    checked={Boolean(formData[field.name])}
                    onChange={(e) => handleChange(field.name, e.target.checked)}
                    className="h-5 w-5 rounded border-input"
                  />
                ) : (
                  <Input
                    type={field.type === "number" ? "number" : "text"}
                    value={String(formData[field.name] ?? "")}
                    onChange={(e) => handleChange(field.name, e.target.value)}
                  />
                )}
              </div>
            ))}
          {error && <p className="text-sm text-destructive font-semibold">{error}</p>}
          <div className="flex justify-end gap-2 pt-2">
            <Button type="button" variant="secondary" onClick={() => onOpenChange(false)} className="cursor-pointer">
              Batal
            </Button>
            <Button type="submit" className="cursor-pointer">
              Simpan
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
