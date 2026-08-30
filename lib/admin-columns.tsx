"use client"

import { cn } from "@/lib/utils"
import type { AdminTableConfig, DetailField, Row } from "./admin-table-types"
import type { ModelName } from "@/lib/admin-actions"

const MONTHS_ID = [
  "Januari", "Februari", "Maret", "April", "Mei", "Juni",
  "Juli", "Agustus", "September", "Oktober", "November", "Desember",
]

function text(row: Row, key: string) {
  const v = row[key]
  return v != null && v !== "" ? String(v) : null
}

function readableDate(value: Date | string | null | undefined) {
  if (value instanceof Date && !Number.isNaN(value.getTime())) {
    return `${value.getDate()} ${MONTHS_ID[value.getMonth()]} ${value.getFullYear()}`
  }
  if (typeof value === "string") {
    const m = value.match(/^(\d{4})-(\d{2})-(\d{2})/)
    if (m) return `${Number(m[3])} ${MONTHS_ID[Number(m[2]) - 1]} ${m[1]}`
    return value
  }
  return null
}

function StatusBadge({ status }: { status: string }) {
  const cls =
    status === "Sedang Berlangsung"
      ? "bg-emerald-50 text-emerald-700 ring-emerald-100"
      : status === "Akan Datang"
        ? "bg-blue-50 text-blue-700 ring-blue-100"
        : "bg-slate-100 text-slate-600 ring-slate-200"
  return (
    <span className={cn("inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ring-1 ring-inset", cls)}>
      {status}
    </span>
  )
}

function Chip({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex max-w-full items-center rounded-md bg-muted px-2 py-0.5 text-xs font-medium text-muted-foreground">
      <span className="truncate">{children}</span>
    </span>
  )
}

function initialsOf(name: string) {
  return name
    .split(/\s+/)
    .filter((w) => /^[A-Za-z]/.test(w))
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase()
}

function DosenCell({ row }: { row: Row }) {
  const name = text(row, "name") ?? "—"
  const src = text(row, "image")
  const nuptk = text(row, "nuptk")
  return (
    <span className="flex items-center gap-3">
      {src ? (
        <img src={src} alt={`Foto ${name}`} className="h-9 w-9 shrink-0 rounded-full object-cover ring-1 ring-border" />
      ) : (
        <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-gradient-to-br from-[#008f5a] to-[#00231d] text-[11px] font-semibold text-white">
          {initialsOf(name) || "?"}
        </span>
      )}
      <span className="min-w-0">
        <span className="block truncate font-medium text-foreground">{name}</span>
        {nuptk && (
          <span className="block truncate text-xs tabular-nums text-muted-foreground">NUPTK · {nuptk}</span>
        )}
      </span>
    </span>
  )
}

function primaryCell(key: string) {
  return {
    sortable: true,
    className: "max-w-[300px]",
    render: (row: Row) => (
      <span className="block truncate font-medium text-foreground">{text(row, key) ?? "—"}</span>
    ),
  }
}

function detailField(row: Row, label: string, key: string): DetailField {
  return { label, value: text(row, key) ?? "—" }
}

const MAIN: Record<ModelName, string> = {
  blueprint: "title",
  dosen: "name",
  ukm: "name",
  event: "title",
  news: "title",
  faq: "question",
  struktur: "name",
  message: "subject",
}

function getItemLabel(modelName: ModelName, row: Row) {
  return text(row, MAIN[modelName]) ?? String(row.id)
}

export function getAdminTable(modelName: ModelName, rows: Row[]): AdminTableConfig {
  const name = (r: Row) => String(r.name ?? "")
  const parentOf = (r: Row) => {
    const pid = text(r, "parentId")
    if (!pid) return null
    const p = rows.find((x) => String(x.id) === pid)
    return p ? name(p) : null
  }

  const base: Omit<AdminTableConfig, "columns" | "getItemLabel" | "getDetailFields"> = {
    searchKeys: [],
    searchPlaceholder: "Cari...",
    filter: undefined,
    addLabel: "Tambah",
    scopeLabel: "Data",
    emptyTitle: "Belum ada data",
    emptyDescription: "Data yang ditambahkan akan muncul di sini.",
  }

  switch (modelName) {
    case "blueprint":
      return {
        ...base,
        columns: [
          { key: "title", label: "Ruangan", ...primaryCell("title") },
          { key: "category", label: "Kategori", hideOnMobile: true, render: (row) => <Chip>{text(row, "category") ?? "—"}</Chip> },
          {
            key: "description",
            label: "Deskripsi",
            className: "max-w-[420px]",
            render: (row) => <span className="line-clamp-2 block text-muted-foreground">{text(row, "description") ?? "—"}</span>,
          },
        ],
        searchKeys: ["title", "category", "description"],
        searchPlaceholder: "Cari ruangan, kategori...",
        filter: { key: "category", label: "Kategori" },
        addLabel: "Tambah Ruangan",
        scopeLabel: "ruangan",
        emptyTitle: "Belum ada ruangan / fasilitas",
        emptyDescription: "Ruangan atau fasilitas yang ditambahkan akan muncul di sini.",
        getItemLabel: (row) => getItemLabel(modelName, row),
        getDetailFields: (row) => [
          detailField(row, "Judul", "title"),
          detailField(row, "Kategori", "category"),
          { label: "Deskripsi", value: text(row, "description") ?? "—", multiline: true },
          { label: "Detail", value: text(row, "details") ?? "—", multiline: true },
          detailField(row, "Gambar", "image"),
        ],
      }

    case "dosen":
      return {
        ...base,
        columns: [
          { key: "name", label: "Dosen", sortable: true, className: "max-w-[320px]", render: (row) => <DosenCell row={row} /> },
          { key: "prodi", label: "Program Studi", hideOnMobile: true, render: (row) => <Chip>{text(row, "prodi") ?? "—"}</Chip> },
          { key: "position", label: "Jabatan", render: (row) => <span className="block max-w-[240px] truncate">{text(row, "position") ?? "—"}</span> },
          { key: "nuptk", label: "NUPTK", hideOnMobile: true, className: "max-w-[180px]", render: (row) => <span className="tabular-nums text-muted-foreground">{text(row, "nuptk") ?? "—"}</span> },
        ],
        searchKeys: ["name", "prodi", "position", "nuptk", "email", "expertise"],
        searchPlaceholder: "Cari nama, prodi, posisi...",
        filter: { key: "prodi", label: "Program Studi" },
        addLabel: "Tambah Dosen",
        scopeLabel: "dosen",
        emptyTitle: "Belum ada data dosen",
        emptyDescription: "Dosen yang ditambahkan akan muncul di sini.",
        getItemLabel: (row) => getItemLabel(modelName, row),
        getDetailFields: (row) => [
          detailField(row, "Nama", "name"),
          detailField(row, "Posisi", "position"),
          detailField(row, "Program Studi", "prodi"),
          detailField(row, "Gelar", "title"),
          detailField(row, "Kepakaran", "expertise"),
          detailField(row, "NUPTK", "nuptk"),
          {
            label: "Email",
            value: (() => {
              const v = text(row, "email")
              return v ? (
                <a href={`mailto:${v}`} className="text-sm text-emerald-700 underline underline-offset-4 hover:text-emerald-800">
                  {v}
                </a>
              ) : "—"
            })(),
          },
          detailField(row, "DOI / Publikasi", "doi"),
          detailField(row, "Foto", "image"),
        ],
      }

    case "ukm":
      return {
        ...base,
        columns: [
          { key: "name", label: "Nama UKM", ...primaryCell("name") },
          { key: "description", label: "Deskripsi", className: "max-w-[480px]", render: (row) => <span className="line-clamp-2 block text-muted-foreground">{text(row, "description") ?? "—"}</span> },
          { key: "contact", label: "Kontak", hideOnMobile: true, className: "max-w-[240px]", render: (row) => <span className="block truncate">{text(row, "contact") ?? "—"}</span> },
        ],
        searchKeys: ["name", "description", "activities", "contact"],
        searchPlaceholder: "Cari UKM atau kegiatan...",
        addLabel: "Tambah UKM",
        scopeLabel: "UKM",
        emptyTitle: "Belum ada UKM",
        emptyDescription: "Unit kegiatan mahasiswa yang ditambahkan akan muncul di sini.",
        getItemLabel: (row) => getItemLabel(modelName, row),
        getDetailFields: (row) => [
          detailField(row, "Nama", "name"),
          { label: "Deskripsi", value: text(row, "description") ?? "—", multiline: true },
          { label: "Kegiatan", value: text(row, "activities") ?? "—", multiline: true },
          detailField(row, "Kontak", "contact"),
          detailField(row, "Logo", "logo"),
        ],
      }

    case "event":
      return {
        ...base,
        columns: [
          { key: "title", label: "Event", ...primaryCell("title") },
          {
            key: "date",
            label: "Tanggal",
            hideOnMobile: true,
            className: "max-w-[180px] whitespace-nowrap",
            render: (row) => (
              <span className="whitespace-nowrap tabular-nums text-muted-foreground">
                {readableDate((row.dateTime as Date | null) ?? text(row, "date")) ?? "—"}
              </span>
            ),
          },
          { key: "status", label: "Status", render: (row) => <StatusBadge status={text(row, "status") ?? "—"} /> },
        ],
        searchKeys: ["title", "location", "status", "date"],
        searchPlaceholder: "Cari acara, lokasi...",
        filter: { key: "status", label: "Status" },
        addLabel: "Tambah Event",
        scopeLabel: "acara",
        emptyTitle: "Belum ada agenda / event",
        emptyDescription: "Event yang dijadwalkan akan muncul di sini.",
        getItemLabel: (row) => getItemLabel(modelName, row),
        getDetailFields: (row) => [
          detailField(row, "Judul", "title"),
          {
            label: "Status",
            value: text(row, "status") ? <StatusBadge status={text(row, "status")!} /> : "—",
          },
          {
            label: "Tanggal",
            value: readableDate((row.dateTime as Date | null) ?? text(row, "date")) ?? "—",
          },
          detailField(row, "Waktu", "time"),
          detailField(row, "Lokasi", "location"),
          { label: "Deskripsi", value: text(row, "description") ?? "—", multiline: true },
          { label: "Detail", value: text(row, "details") ?? "—", multiline: true },
          detailField(row, "Poster", "image"),
        ],
      }

    case "news":
      return {
        ...base,
        columns: [
          { key: "title", label: "Judul", ...primaryCell("title") },
          {
            key: "date",
            label: "Tanggal",
            hideOnMobile: true,
            className: "max-w-[180px] whitespace-nowrap",
            render: (row) => (
              <span className="whitespace-nowrap tabular-nums text-muted-foreground">
                {readableDate(text(row, "date")) ?? "—"}
              </span>
            ),
          },
          { key: "excerpt", label: "Ringkasan", className: "max-w-[420px]", render: (row) => <span className="line-clamp-2 block text-muted-foreground">{text(row, "excerpt") ?? "—"}</span> },
        ],
        searchKeys: ["title", "excerpt", "content", "date"],
        searchPlaceholder: "Cari judul berita...",
        addLabel: "Tambah Berita",
        scopeLabel: "berita",
        emptyTitle: "Belum ada berita",
        emptyDescription: "Berita yang dipublikasikan akan muncul di sini.",
        getItemLabel: (row) => getItemLabel(modelName, row),
        getDetailFields: (row) => [
          detailField(row, "Judul", "title"),
          detailField(row, "Tanggal", "date"),
          { label: "Ringkasan", value: text(row, "excerpt") ?? "—", multiline: true },
          { label: "Konten", value: text(row, "content") ?? "—", multiline: true },
          detailField(row, "Gambar", "image"),
        ],
      }

    case "faq":
      return {
        ...base,
        columns: [
          { key: "question", label: "Pertanyaan", className: "max-w-[380px]", sortable: true, render: (row) => <span className="block truncate font-medium text-foreground">{text(row, "question") ?? "—"}</span> },
          { key: "answer", label: "Jawaban", className: "max-w-[460px]", render: (row) => <span className="line-clamp-2 block text-muted-foreground">{text(row, "answer") ?? "—"}</span> },
        ],
        searchKeys: ["question", "answer"],
        searchPlaceholder: "Cari pertanyaan...",
        addLabel: "Tambah FAQ",
        scopeLabel: "FAQ",
        emptyTitle: "Belum ada FAQ",
        emptyDescription: "Pertanyaan yang ditambahkan akan muncul di sini.",
        getItemLabel: (row) => getItemLabel(modelName, row),
        getDetailFields: (row) => [
          detailField(row, "Pertanyaan", "question"),
          { label: "Jawaban", value: text(row, "answer") ?? "—", multiline: true },
        ],
      }

    case "struktur":
      return {
        ...base,
        columns: [
          { key: "name", label: "Nama", className: "max-w-[300px]", sortable: true, render: (row) => <span className="block truncate font-medium text-foreground">{text(row, "name") ?? "—"}</span> },
          { key: "role", label: "Jabatan", hideOnMobile: true, className: "max-w-[260px]", render: (row) => <span className="block truncate">{text(row, "role") ?? "—"}</span> },
          { key: "parentId", label: "Atasan", hideOnMobile: true, className: "max-w-[220px]", render: (row) => <span className="block truncate text-muted-foreground">{parentOf(row) ?? "—"}</span> },
        ],
        searchKeys: ["name", "role", "details"],
        searchPlaceholder: "Cari nama atau jabatan...",
        addLabel: "Tambah Struktur",
        scopeLabel: "struktur",
        emptyTitle: "Belum ada struktur organisasi",
        emptyDescription: "Anggota struktur yang ditambahkan akan muncul di sini.",
        getItemLabel: (row) => getItemLabel(modelName, row),
        getDetailFields: (row) => [
          detailField(row, "Nama", "name"),
          detailField(row, "Jabatan", "role"),
          { label: "Atasan", value: parentOf(row) ?? "—" },
          { label: "Detail Tugas", value: text(row, "details") ?? "—", multiline: true },
        ],
      }

    case "message":
      return {
        ...base,
        columns: [{ key: "subject", label: "Perihal", ...primaryCell("subject") }],
        searchKeys: ["subject"],
        addLabel: "Tambah Pesan",
        scopeLabel: "pesan",
        emptyTitle: "Belum ada pesan",
        emptyDescription: "Pesan dari pengunjung akan muncul di halaman Kotak Masuk.",
        getItemLabel: (row) => text(row, "subject") ?? String(row.id),
        getDetailFields: (row) => [detailField(row, "Perihal", "subject")],
      }
  }
}