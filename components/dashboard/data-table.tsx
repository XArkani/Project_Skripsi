"use client"

import { useMemo, useState, useTransition } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Plus, Inbox, SearchX } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { deleteRecord, type ModelName } from "@/lib/admin-actions"
import { toast } from "sonner"
import { getAdminTable } from "@/lib/admin-columns"
import type { Row } from "@/lib/admin-table-types"
import { cn } from "@/lib/utils"
import EmptyState from "./empty-state"
import DeleteDialog from "./delete-dialog"
import DetailSheet from "./detail-sheet"
import DataTableToolbar from "./data-table-toolbar"
import DataTablePagination from "./data-table-pagination"
import DataTableRowActions from "./data-table-row-actions"
import DataTableColumnHeader, { type SortDir } from "./data-table-column-header"

interface DataTableProps {
  modelName: ModelName
  rows: Row[]
  baseUrl: string
  pageSize?: number
}

export default function DataTable({ modelName, rows, baseUrl, pageSize = 10 }: DataTableProps) {
  const router = useRouter()
  const config = useMemo(() => getAdminTable(modelName, rows), [modelName, rows])

  const [data, setData] = useState<Row[]>(rows)
  const [search, setSearch] = useState("")
  const [sortKey, setSortKey] = useState<string | null>(null)
  const [sortDir, setSortDir] = useState<SortDir>(null)
  const [filterValue, setFilterValue] = useState<string>("all")
  const [page, setPage] = useState(1)
  const [viewRow, setViewRow] = useState<Row | null>(null)
  const [deleteTarget, setDeleteTarget] = useState<{ id: string; label: string } | null>(null)
  const [deleteError, setDeleteError] = useState<string | null>(null)
  const [pending, startTransition] = useTransition()
  // Sinkronkan state lokal saat server mengirim rows baru (mis. setelah
  // tambah/edit + router.refresh()). Pola "adjust state during render"
  // agar tidak perlu useEffect (hindari cascading renders).
  // Tanpa ini tabel tetap menampilkan snapshot lama sampai browser
  // di-refresh manual.
  const [prevRows, setPrevRows] = useState(rows)
  if (prevRows !== rows) {
    setPrevRows(rows)
    setData(rows)
    setPage(1)
  }

  const { columns, searchKeys, filter: filterMeta } = config

  const filterOptions = useMemo(() => {
    if (!filterMeta) return null
    const set = new Set<string>()
    for (const r of data) {
      const v = r[filterMeta.key]
      if (v != null && v !== "") set.add(String(v))
    }
    return {
      key: filterMeta.key,
      label: filterMeta.label,
      options: [...set].map((v) => ({ value: v, label: v })),
    }
  }, [data, filterMeta])

  const keys = searchKeys ?? columns.map((c) => c.key)

  const filtered = useMemo(() => {
    let list = data
    const q = search.trim().toLowerCase()
    if (q) {
      list = list.filter((row) =>
        keys.some((k) => {
          const val = row[k]
          return val != null && String(val).toLowerCase().includes(q)
        })
      )
    }
    if (filterOptions && filterValue !== "all") {
      list = list.filter((row) => String(row[filterOptions.key] ?? "") === filterValue)
    }
    if (sortKey && sortDir) {
      list = [...list].sort((a, b) => {
        const av = String(a[sortKey] ?? "")
        const bv = String(b[sortKey] ?? "")
        const cmp = av.localeCompare(bv, "id", { numeric: true, sensitivity: "base" })
        return sortDir === "asc" ? cmp : -cmp
      })
    }
    return list
  }, [data, search, filterValue, sortKey, sortDir, filterOptions, keys])

  const pageCount = Math.max(1, Math.ceil(filtered.length / pageSize))
  const safePage = Math.min(page, pageCount)
  const start = filtered.length === 0 ? 0 : (safePage - 1) * pageSize + 1
  const end = Math.min(safePage * pageSize, filtered.length)
  const pageRows = filtered.slice((safePage - 1) * pageSize, safePage * pageSize)

  function handleSort(key: string) {
    if (sortKey !== key) {
      setSortKey(key)
      setSortDir("asc")
    } else if (sortDir === "asc") {
      setSortDir("desc")
    } else {
      setSortKey(null)
      setSortDir(null)
    }
    setPage(1)
  }

  function handleDelete() {
    if (!deleteTarget) return
    setDeleteError(null)
    startTransition(async () => {
      try {
        await deleteRecord(modelName, deleteTarget.id)
        setData((prev) => prev.filter((r) => String(r.id) !== deleteTarget.id))
        setDeleteTarget(null)
        toast.success("Data berhasil dihapus.")
        router.refresh()
      } catch (err) {
        const msg = err instanceof Error ? err.message : "Gagal menghapus data."
        setDeleteError(msg)
        toast.error(msg)
      }
    })
  }

  const titleColumn = columns[0]
  const secondaryColumns = columns.slice(1, 3).filter((c) => !c.hideOnMobile)

  return (
    <div className="space-y-4">
      <DataTableToolbar
        searchValue={search}
        onSearchChange={(v) => {
          setSearch(v)
          setPage(1)
        }}
        placeholder={config.searchPlaceholder ?? "Cari..."}
        left={
          filterOptions && filterOptions.options.length > 0 ? (
            <Select
              value={filterValue}
              onValueChange={(v) => {
                setFilterValue(v)
                setPage(1)
              }}
            >
              <SelectTrigger aria-label={filterOptions.label} className="w-full sm:w-44">
                <SelectValue placeholder={filterOptions.label} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Semua</SelectItem>
                {filterOptions.options.map((opt) => (
                  <SelectItem key={opt.value} value={opt.value}>
                    {opt.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          ) : null
        }
      >
        <Button asChild size="sm" className="w-full sm:w-auto cursor-pointer">
          <Link href={`${baseUrl}/new`}>
            <Plus />
            {config.addLabel}
          </Link>
        </Button>
      </DataTableToolbar>

      {data.length === 0 ? (
        <EmptyState
          icon={Inbox}
          title={config.emptyTitle}
          description={config.emptyDescription}
        />
      ) : filtered.length === 0 ? (
        <EmptyState
          icon={SearchX}
          title="Data tidak ditemukan"
          description="Tidak ada data yang cocok dengan pencarian atau filter saat ini."
        />
      ) : (
        <>
          <div className="hidden overflow-hidden rounded-xl border border-border md:block">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-muted/40">
                  {columns.map((col) => (
                    <th key={col.key} className="px-4 py-3 text-left">
                      <DataTableColumnHeader
                        label={col.label}
                        sortable={col.sortable}
                        active={sortKey === col.key ? sortDir : null}
                        onSort={() => handleSort(col.key)}
                      />
                    </th>
                  ))}
                  <th className="w-12 px-4 py-3 text-right">
                    <span className="sr-only">Aksi</span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/60">
                {pageRows.map((row) => {
                  const id = String(row.id)
                  return (
                    <tr key={id} className="transition-colors hover:bg-muted/30">
                      {columns.map((col) => (
                        <td key={col.key} className={cn("px-4 py-3 align-middle", col.className)}>
                          {col.render ? (
                            col.render(row)
                          ) : (
                            <span className="line-clamp-2 block">{String(row[col.key] ?? "—")}</span>
                          )}
                        </td>
                      ))}
                      <td className="px-4 py-3 text-right">
                        <DataTableRowActions
                          onView={() => setViewRow(row)}
                          onEdit={() => router.push(`${baseUrl}/${id}/edit`)}
                          onDelete={() => setDeleteTarget({ id, label: config.getItemLabel(row) })}
                          disabled={pending}
                        />
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>

          <div className="space-y-3 md:hidden">
            {pageRows.map((row) => {
              const id = String(row.id)
              return (
                <div key={id} className="flex items-start gap-3 rounded-xl border border-border bg-card p-4">
                  <button
                    type="button"
                    onClick={() => setViewRow(row)}
                    className="min-w-0 flex-1 text-left focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600"
                  >
                    <span className="block font-medium text-foreground">
                      {titleColumn.render ? titleColumn.render(row) : String(row[titleColumn.key] ?? "—")}
                    </span>
                    {secondaryColumns.map((col) => (
                      <span key={col.key} className="mt-1 block text-sm text-muted-foreground">
                        {col.render ? col.render(row) : String(row[col.key] ?? "")}
                      </span>
                    ))}
                  </button>
                  <DataTableRowActions
                    onView={() => setViewRow(row)}
                    onEdit={() => router.push(`${baseUrl}/${id}/edit`)}
                    onDelete={() => setDeleteTarget({ id, label: config.getItemLabel(row) })}
                    disabled={pending}
                  />
                </div>
              )
            })}
          </div>

          <DataTablePagination
            page={safePage}
            pageCount={pageCount}
            total={filtered.length}
            start={start}
            end={end}
            onPageChange={(p) => setPage(p)}
          />
        </>
      )}

      <DetailSheet
        open={viewRow !== null}
        onOpenChange={(open) => {
          if (!open) setViewRow(null)
        }}
        title={viewRow ? config.getItemLabel(viewRow) : ""}
        fields={viewRow ? config.getDetailFields(viewRow) : []}
        footer={
          viewRow ? (
            <Button asChild className="w-full cursor-pointer">
              <Link href={`${baseUrl}/${String(viewRow.id)}/edit`}>
                Edit {config.scopeLabel}
              </Link>
            </Button>
          ) : null
        }
      />

      <DeleteDialog
        open={deleteTarget !== null}
        onOpenChange={(open) => {
          if (!open && !pending) {
            setDeleteTarget(null)
            setDeleteError(null)
          }
        }}
        itemLabel={deleteTarget?.label}
        scopeLabel={config.scopeLabel}
        pending={pending}
        error={deleteError}
        onConfirm={handleDelete}
      />
    </div>
  )
}