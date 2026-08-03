"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Pencil, Trash2, Search, Plus } from "lucide-react"
import type { FieldConfig } from "@/lib/types"

interface DataTableProps {
  columns: FieldConfig[]
  data: Record<string, unknown>[]
  onEdit: (item: Record<string, unknown>) => void
  onDelete: (id: string) => void
  onAdd: () => void
  searchKeys?: string[]
}

export function DataTable({
  columns,
  data,
  onEdit,
  onDelete,
  onAdd,
  searchKeys,
}: DataTableProps) {
  const [search, setSearch] = useState("")

  const filtered = search
    ? data.filter((item) => {
        const keys = searchKeys ?? columns.map((c) => c.name)
        return keys.some((key) => {
          const val = item[key]
          return val != null && String(val).toLowerCase().includes(search.toLowerCase())
        })
      })
    : data

  const displayColumns = columns.filter((c) => c.type !== "image" && c.type !== "checkbox")

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Cari..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>
        <Button onClick={onAdd} size="sm" className="cursor-pointer">
          <Plus className="h-4 w-4 mr-1" />
          Tambah
        </Button>
      </div>

      <div className="rounded-xl border border-border overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-muted/50 border-b border-border">
              <th className="text-left px-4 py-3 font-bold text-xs uppercase text-muted-foreground">#</th>
              {displayColumns.map((col) => (
                <th key={col.name} className="text-left px-4 py-3 font-bold text-xs uppercase text-muted-foreground">
                  {col.label}
                </th>
              ))}
              <th className="text-right px-4 py-3 font-bold text-xs uppercase text-muted-foreground">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={displayColumns.length + 2} className="text-center py-12 text-muted-foreground text-sm">
                  {search ? "Tidak ditemukan." : "Belum ada data."}
                </td>
              </tr>
            ) : (
              filtered.map((item, idx) => (
                <tr key={String(item.id)} className="border-b border-border/50 hover:bg-muted/30 transition-colors">
                  <td className="px-4 py-3 text-muted-foreground font-mono text-xs">{idx + 1}</td>
                  {displayColumns.map((col) => (
                    <td key={col.name} className="px-4 py-3 max-w-[200px] truncate">
                      {item[col.name] != null ? String(item[col.name]) : "-"}
                    </td>
                  ))}
                  <td className="px-4 py-3 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <Button variant="outline" size="xs" onClick={() => onEdit(item)} className="cursor-pointer">
                        <Pencil className="h-3 w-3 mr-1" />
                        Edit
                      </Button>
                      <Button variant="destructive" size="xs" onClick={() => onDelete(String(item.id))} className="cursor-pointer">
                        <Trash2 className="h-3 w-3 mr-1" />
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
    </div>
  )
}
