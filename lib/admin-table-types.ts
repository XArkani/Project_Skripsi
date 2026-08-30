import type { ModelName } from "@/lib/admin-actions"

export type Row = Record<string, unknown>

export interface DetailField {
  label: string
  value: React.ReactNode
  multiline?: boolean
}

export interface DataColumn {
  key: string
  label: string
  className?: string
  sortable?: boolean
  hideOnMobile?: boolean
  render?: (row: Row) => React.ReactNode
}

export interface AdminTableConfig {
  columns: DataColumn[]
  searchKeys?: string[]
  searchPlaceholder?: string
  filter?: { key: keyof Row; label: string }
  addLabel: string
  scopeLabel: string
  emptyTitle: string
  emptyDescription: string
  getItemLabel: (row: Row) => string
  getDetailFields: (row: Row) => DetailField[]
}

export type { ModelName }