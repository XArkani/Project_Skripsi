"use client"

import { useMemo, useState, useTransition } from "react"
import { Button } from "@/components/ui/button"
import { Inbox, Search, Trash2, MailCheck } from "lucide-react"
import { markMessageRead, deleteRecord } from "@/lib/admin-actions"
import DetailSheet, { type DetailField } from "@/components/dashboard/detail-sheet"
import DeleteDialog from "@/components/dashboard/delete-dialog"
import EmptyState from "@/components/dashboard/empty-state"
import DataTableToolbar from "@/components/dashboard/data-table-toolbar"
import { useRouter } from "next/navigation"
import type { Message } from "@/lib/types"

type Row = Message & { createdAt?: Date | string }

function initialsOf(name: string) {
  return name
    .split(/\s+/)
    .filter((w) => /^[A-Za-z]/.test(w))
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase()
}

function timeAgo(value: Date | string | undefined) {
  if (!value) return null
  const d = value instanceof Date ? value : new Date(value)
  if (Number.isNaN(d.getTime())) return null
  const diff = Math.max(0, Date.now() - d.getTime())
  const mins = Math.floor(diff / 60000)
  if (mins < 1) return "Baru saja"
  if (mins < 60) return `${mins} menit lalu`
  const hours = Math.floor(mins / 60)
  if (hours < 24) return `${hours} jam lalu`
  const days = Math.floor(hours / 24)
  return `${days} hari lalu`
}

const filterTabs = [
  { value: "semua", label: "Semua Pesan" },
  { value: "belum", label: "Belum Dibaca" },
  { value: "dibaca", label: "Sudah Dibaca" },
] as const

export function MessagesManager({ initialData }: { initialData: Row[] }) {
  const router = useRouter()
  const [data, setData] = useState<Row[]>(initialData)
  const [search, setSearch] = useState("")
  const [status, setStatus] = useState<(typeof filterTabs)[number]["value"]>("semua")
  const [selected, setSelected] = useState<Row | null>(null)
  const [sheetOpen, setSheetOpen] = useState(false)
  const [deleteTarget, setDeleteTarget] = useState<{ id: string; label: string } | null>(null)
  const [deleteError, setDeleteError] = useState<string | null>(null)
  const [pending, startTransition] = useTransition()

  const unread = useMemo(() => data.filter((m) => !m.isRead).length, [data])

  const filtered = useMemo(() => {
    let list = data
    const q = search.trim().toLowerCase()
    if (q) {
      list = list.filter((item) =>
        [item.senderName, item.senderEmail, item.subject, item.message].join(" ").toLowerCase().includes(q)
      )
    }
    if (status === "belum") list = list.filter((m) => !m.isRead)
    if (status === "dibaca") list = list.filter((m) => m.isRead)
    return list
  }, [data, search, status])

  async function openMessage(item: Row) {
    setSelected(item)
    setSheetOpen(true)
    if (!item.isRead) {
      const result = await markMessageRead(item.id)
      if (result.success) {
        setData((prev) => prev.map((m) => (m.id === item.id ? { ...m, ...result.data } : m)))
        setSelected({ ...item, ...result.data })
      }
    }
  }

  function handleDelete() {
    if (!deleteTarget) return
    setDeleteError(null)
    startTransition(async () => {
      try {
        await deleteRecord("message", deleteTarget.id)
        setData((prev) => prev.filter((item) => item.id !== deleteTarget.id))
        setDeleteTarget(null)
        setSheetOpen(false)
        setSelected(null)
        router.refresh()
      } catch (err) {
        setDeleteError(err instanceof Error ? err.message : "Gagal menghapus pesan.")
      }
    })
  }

  const detailFields: DetailField[] = selected
    ? [
        { label: "Pengirim", value: selected.senderName || "—" },
        {
          label: "Email",
          value: selected.senderEmail || "—",
        },
        { label: "Telepon", value: selected.senderPhone || "—" },
        { label: "Tanggal", value: selected.date || "—" },
        { label: "Perihal", value: selected.subject || "—" },
        { label: "Isi Pesan", value: selected.message || "—", multiline: true },
      ]
    : []

  return (
    <div className="space-y-4">
      <DataTableToolbar
        searchValue={search}
        onSearchChange={setSearch}
        placeholder="Cari nama, email, atau isi pesan..."
      />

      <div className="flex flex-wrap items-center gap-2">
        {filterTabs.map((tab) => {
          const count = tab.value === "semua" ? data.length : tab.value === "belum" ? unread : data.length - unread
          const isActive = status === tab.value
          return (
            <button
              key={tab.value}
              type="button"
              onClick={() => setStatus(tab.value)}
              aria-pressed={isActive}
              className={
                isActive
                  ? "inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3.5 py-1.5 text-sm font-semibold text-emerald-700 ring-1 ring-inset ring-emerald-100"
                  : "inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted"
              }
            >
              {tab.label}
              <span className="tabular-nums text-xs text-muted-foreground">({count})</span>
            </button>
          )
        })}
      </div>

      {data.length === 0 ? (
        <EmptyState
          icon={Inbox}
          title="Belum ada pesan"
          description="Pesan dari pengunjung akan muncul di sini."
        />
      ) : filtered.length === 0 ? (
        <EmptyState
          icon={Search}
          title="Pesan tidak ditemukan"
          description="Tidak ada pesan yang cocok dengan filter atau pencarian saat ini."
        />
      ) : (
        <ul className="divide-y divide-border overflow-hidden rounded-xl border border-border">
          {filtered.map((item) => {
            const isUnread = !item.isRead
            const meta = timeAgo(item.createdAt)
            return (
              <li key={item.id}>
                <button
                  type="button"
                  onClick={() => openMessage(item)}
                  className="flex w-full items-center gap-3 px-4 py-3 text-left transition-colors hover:bg-muted/40 focus-visible:outline-none focus-visible:bg-muted/40"
                >
                  <span className="relative shrink-0">
                    <span className="grid h-10 w-10 place-items-center rounded-full bg-muted text-xs font-semibold text-muted-foreground">
                      {initialsOf(item.senderName || "?") || "?"}
                    </span>
                    {isUnread && (
                      <span className="absolute -right-0.5 -top-0.5 h-3 w-3 rounded-full bg-emerald-600 ring-2 ring-background" aria-hidden="true" />
                    )}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="flex items-baseline justify-between gap-3">
                      <span className={`line-clamp-1 ${isUnread ? "font-semibold text-foreground" : "font-medium text-muted-foreground"}`}>
                        {item.senderName || "(tanpa nama)"}
                      </span>
                      <span className="shrink-0 text-xs text-muted-foreground">{meta ?? item.date}</span>
                    </span>
                    <span className={`mt-0.5 block line-clamp-1 text-sm ${isUnread ? "text-foreground" : "text-muted-foreground"}`}>
                      {item.subject || item.message}
                    </span>
                    <span className="mt-0.5 block truncate text-xs text-muted-foreground">
                      {[item.senderEmail, item.date].filter(Boolean).join(" · ")}
                    </span>
                  </span>
                </button>
              </li>
            )
          })}
        </ul>
      )}

      <DetailSheet
        open={sheetOpen}
        onOpenChange={(open) => {
          setSheetOpen(open)
          if (!open) setSelected(null)
        }}
        title={selected?.subject || "Detail Pesan"}
        subtitle={selected?.senderEmail}
        fields={detailFields}
        footer={
          selected ? (
            <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
              {!selected.isRead && (
                <Button
                  type="button"
                  variant="secondary"
                  className="cursor-pointer"
                  onClick={() => openMessage(selected)}
                >
                  <MailCheck className="h-4 w-4" />
                  Tandai dibaca
                </Button>
              )}
              <Button
                type="button"
                variant="destructive"
                className="cursor-pointer"
                onClick={() => selected && setDeleteTarget({ id: selected.id, label: selected.subject || "pesan ini" })}
              >
                <Trash2 className="h-4 w-4" />
                Hapus
              </Button>
            </div>
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
        scopeLabel="pesan"
        pending={pending}
        error={deleteError}
        onConfirm={handleDelete}
      />
    </div>
  )
}