"use client"

import { useState, useTransition } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogMedia,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Search, Plus, Pencil, Trash2, ArrowUpRight, Loader2 } from "lucide-react"
import { deleteRecord, type ModelName } from "@/lib/admin-actions"
import type { FieldConfig } from "@/lib/types"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { brand } from "@/lib/admin-hues"

interface CrudListProps {
  title: string
  modelName: ModelName
  fields: FieldConfig[]
  initialData: unknown[]
  baseUrl: string
}

export function CrudList({ title, modelName, baseUrl, fields, initialData }: CrudListProps) {
  const router = useRouter()
  const [data, setData] = useState<Record<string, unknown>[]>(initialData as Record<string, unknown>[])
  const [search, setSearch] = useState("")
  const [pending, startTransition] = useTransition()
  const [deleteTarget, setDeleteTarget] = useState<{ id: string; label: string } | null>(null)
  const [deleteError, setDeleteError] = useState<string | null>(null)

  const filtered = search
    ? data.filter((item) =>
        fields.some((f) => {
          const val = item[f.name]
          return val != null && String(val).toLowerCase().includes(search.toLowerCase())
        })
      )
    : data

  const displayColumns = fields.filter((f) => f.type !== "image" && f.type !== "checkbox" && f.name !== "id")
  const base = baseUrl

  async function handleDelete(id: string) {
    setDeleteError(null)
    startTransition(async () => {
      try {
        const result = await deleteRecord(modelName, id)
        if (result.success) {
          setData((prev) => prev.filter((item) => String(item.id) !== id))
          setDeleteTarget(null)
          router.refresh()
        }
      } catch (err) {
        setDeleteError(err instanceof Error ? err.message : "Gagal menghapus data.")
      }
    })
  }

  return (
    <Card>
      <CardHeader className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <CardTitle className="text-lg font-semibold tracking-tight">{title}</CardTitle>
        </div>
        <Button asChild size="sm" className={`cursor-pointer ${brand.solid}`}>
          <Link href={`${base}/new`}>
            <Plus />
            Tambah
          </Link>
        </Button>
      </CardHeader>
      <CardContent>
        <div className="relative mb-4 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground/60" />
          <Input
            placeholder="Cari..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>

        <div className="overflow-x-auto rounded-lg border border-border">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-emerald-50/40 text-left">
                <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">#</th>
                {displayColumns.map((col) => (
                  <th key={col.name} className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    {col.label}
                  </th>
                ))}
                <th className="px-4 py-3 text-right text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Aksi
                </th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={displayColumns.length + 2} className="px-4 py-16 text-center text-sm text-muted-foreground">
                    {search ? "Tidak ditemukan." : "Belum ada data."}
                  </td>
                </tr>
              ) : (
                filtered.map((item, idx) => (
                  <tr key={String(item.id)} className="border-b border-border/50 last:border-0 hover:bg-muted/30 transition-colors">
                    <td className="px-4 py-3 text-xs text-muted-foreground tabular-nums">{idx + 1}</td>
                    {displayColumns.map((col) => {
                      const raw = item[col.name]
                      const text = raw != null ? String(raw) : "—"
                      const isUrl = /^https?:\/\//i.test(text) && /\.\w{2,}/.test(text)
                      return (
                        <td key={col.name} className="max-w-[220px] truncate px-4 py-3">
                          {isUrl ? (
                            <a
                              href={text}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex max-w-full items-center gap-1 text-foreground underline underline-offset-4 decoration-border hover:decoration-foreground"
                            >
                              <span className="truncate">{text}</span>
                              <ArrowUpRight className="h-3.5 w-3.5 shrink-0 text-muted-foreground" />
                            </a>
                          ) : (
                            text
                          )}
                        </td>
                      )
                    })}
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-end gap-1.5">
                        <Button variant="ghost" size="sm" asChild className="cursor-pointer hover:bg-muted/70">
                          <Link href={`${base}/${String(item.id)}/edit`}>
                            <Pencil />
                            Edit
                          </Link>
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            const mainField = displayColumns[0]
                            const label =
                              mainField != null && item[mainField.name] != null
                                ? String(item[mainField.name])
                                : String(item.id)
                            setDeleteTarget({ id: String(item.id), label })
                          }}
                          disabled={pending}
                          className="cursor-pointer border border-transparent text-destructive hover:border-destructive/30 hover:bg-destructive/10 hover:text-destructive"
                        >
                          <Trash2 />
                          Hapus
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <AlertDialog
          open={deleteTarget !== null}
          onOpenChange={(open) => {
            if (!open && !pending) {
              setDeleteTarget(null)
              setDeleteError(null)
            }
          }}
        >
          <AlertDialogContent className="sm:max-w-sm">
            <AlertDialogHeader>
              <AlertDialogMedia className="bg-destructive/10 text-destructive">
                <Trash2 aria-hidden="true" />
              </AlertDialogMedia>
              <AlertDialogTitle>Hapus data ini?</AlertDialogTitle>
              <AlertDialogDescription>
                <span className="font-semibold break-words text-foreground">{deleteTarget?.label}</span>{" "}
                akan dihapus permanen dari daftar {title.toLowerCase()}. Tindakan ini tidak dapat dibatalkan.
              </AlertDialogDescription>
            </AlertDialogHeader>
            {deleteError && (
              <p className="text-sm font-medium text-destructive" role="alert">
                {deleteError}
              </p>
            )}
            <AlertDialogFooter>
              <AlertDialogCancel disabled={pending} className="cursor-pointer">
                Batal
              </AlertDialogCancel>
              <AlertDialogAction
                disabled={pending}
                onClick={(e) => {
                  e.preventDefault()
                  if (deleteTarget) handleDelete(deleteTarget.id)
                }}
                className="cursor-pointer bg-destructive text-white hover:bg-destructive/90 disabled:opacity-50"
              >
                {pending ? <Loader2 className="size-4 animate-spin" /> : <Trash2 className="size-4" />}
                Hapus
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </CardContent>
    </Card>
  )
}
