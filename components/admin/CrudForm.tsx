"use client"

import { useState, useTransition } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { ImageUpload } from "./ImageUpload"
import { createRecord, updateRecord, type ModelName } from "@/lib/admin-actions"
import { slugify } from "@/lib/utils"
import { ArrowLeft, Loader2 } from "lucide-react"
import type { FieldConfig } from "@/lib/types"

interface CrudFormProps {
  modelName: ModelName
  baseUrl: string
  fields: FieldConfig[]
  mode: "create" | "edit"
  id?: string
  initialData?: Record<string, unknown>
}

export function CrudForm({ modelName, baseUrl, fields, mode, id, initialData = {} }: CrudFormProps) {
  const router = useRouter()
  const [formData, setFormData] = useState<Record<string, unknown>>(initialData)
  const [error, setError] = useState<string | null>(null)
  const [pending, startTransition] = useTransition()

  const base = baseUrl
  const editableFields = fields.filter((f) => f.name !== "id")

  const groups = editableFields.reduce<string[]>((acc, f) => {
    const g = f.group ?? "Informasi Utama"
    if (!acc.includes(g)) acc.push(g)
    return acc
  }, [])

  function handleChange(name: string, value: unknown) {
    setFormData((prev) => {
      const next = { ...prev, [name]: value }
      if (name === "title") {
        const slugField = fields.find((f) => f.type === "slug")
        if (slugField && (prev[slugField.name] == null || prev[slugField.name] === "")) {
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
          const msg = `"${f.label}" wajib diisi.`
          setError(msg)
          toast.error(msg)
          return
        }
      }
    }

    startTransition(async () => {
      try {
        if (mode === "edit" && id) {
          await updateRecord(modelName, id, base, formData)
          toast.success("Perubahan berhasil disimpan.")
        } else {
          await createRecord(modelName, base, formData)
          toast.success("Data berhasil ditambahkan.")
        }
        router.push(base)
        router.refresh()
      } catch (err) {
        const msg = err instanceof Error ? err.message : "Gagal menyimpan."
        setError(msg)
        toast.error(msg)
      }
    })
  }

  function renderField(field: FieldConfig) {
    const value = String(formData[field.name] ?? "")
    const inputId = field.name

    if (field.type === "slug") {
      return (
        <Input
          id={inputId}
          type="text"
          value={value}
          onChange={(e) => handleChange(field.name, e.target.value)}
          placeholder="Otomatis dari judul, bisa diedit"
          className="h-11 md:h-9"
        />
      )
    }
    if (field.type === "textarea") {
      return (
        <Textarea
          id={inputId}
          value={value}
          onChange={(e) => handleChange(field.name, e.target.value)}
          rows={4}
        />
      )
    }
    if (field.type === "select") {
      return (
        <Select
          value={value}
          onValueChange={(v) => handleChange(field.name, v)}
        >
          <SelectTrigger id={inputId} className="h-11 w-full md:h-9" aria-label={field.label}>
            <SelectValue placeholder="Pilih..." />
          </SelectTrigger>
          <SelectContent>
            {field.options?.map((opt) => (
              <SelectItem key={opt} value={opt}>
                {opt}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      )
    }
    if (field.type === "image") {
      return (
        <ImageUpload
          value={value}
          onChange={(url) => handleChange(field.name, url)}
        />
      )
    }
    if (field.type === "checkbox") {
      return (
        <label className="flex min-h-11 items-center gap-2 text-sm text-foreground">
          <input
            type="checkbox"
            checked={Boolean(formData[field.name])}
            onChange={(e) => handleChange(field.name, e.target.checked)}
            className="size-4 rounded border-input accent-[#008f5a]"
          />
          {formData[field.name] ? "Ya" : "Tidak"}
        </label>
      )
    }
    if (field.type === "date") {
      // Nilai dari DB berupa ISO datetime ("2026-08-19T00:00:00.000Z") yang
      // tidak bisa ditampilkan input type="date" (tampil kosong). Potong ke
      // YYYY-MM-DD agar tanggal tersimpan terlihat & tetap valid saat submit.
      const dateValue = /^\d{4}-\d{2}-\d{2}/.test(value) ? value.slice(0, 10) : value
      return (
        <Input
          id={inputId}
          type="date"
          value={dateValue}
          onChange={(e) => handleChange(field.name, e.target.value)}
          className="h-11 md:h-9"
        />
      )
    }
    return (
      <Input
        id={inputId}
        type={field.type === "number" ? "number" : "text"}
        value={value}
        onChange={(e) => handleChange(field.name, e.target.value)}
        className="h-11 md:h-9"
      />
    )
  }

  return (
    <div className="mx-auto max-w-2xl">
      <Link
        href={base}
        className="mb-4 inline-flex min-h-11 items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600 sm:mb-6"
      >
        <ArrowLeft className="h-4 w-4" />
        Kembali ke daftar
      </Link>

      <form onSubmit={handleSubmit} className="rounded-2xl border border-border bg-card p-4 sm:p-6">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6">
          {groups.map((group) => (
            <fieldset key={group} className="sm:col-span-2">
              <legend className="mb-3 text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
                {group}
              </legend>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5">
                {editableFields
                  .filter((f) => (f.group ?? "Informasi Utama") === group)
                  .map((field) => (
                    <div
                      key={field.name}
                      className={
                        field.type === "textarea" ||
                        field.type === "select" ||
                        field.type === "image" ||
                        field.type === "checkbox"
                          ? "sm:col-span-2"
                          : ""
                      }
                    >
                      <label className="mb-1.5 block text-sm font-medium text-foreground" htmlFor={field.name}>
                        {field.label}
                        {field.required && <span className="ml-0.5 text-destructive">*</span>}
                      </label>
                      <div id={field.name}>{renderField(field)}</div>
                    </div>
                  ))}
              </div>
            </fieldset>
          ))}
        </div>

        {error && <p className="mt-5 break-words text-sm font-medium text-destructive" role="alert">{error}</p>}

        <div className="mt-6 flex flex-col-reverse gap-2 border-t border-border/50 pt-5 sm:flex-row sm:justify-end">
          <Button type="button" variant="ghost" asChild className="min-h-11 w-full cursor-pointer sm:min-h-9 sm:w-auto">
            <Link href={base}>Batal</Link>
          </Button>
          <Button type="submit" disabled={pending} className="min-h-11 w-full cursor-pointer sm:w-auto">
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
    </div>
  )
}
