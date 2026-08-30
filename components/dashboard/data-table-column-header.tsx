"use client"

import { ArrowUp, ArrowDown, ArrowUpDown } from "lucide-react"
import { cn } from "@/lib/utils"

export type SortDir = "asc" | "desc" | null

interface DataTableColumnHeaderProps {
  label: string
  className?: string
  sortable?: boolean
  active: SortDir
  onSort: () => void
}

export default function DataTableColumnHeader({
  label,
  className,
  sortable,
  active,
  onSort,
}: DataTableColumnHeaderProps) {
  if (!sortable) {
    return (
      <span className={cn("text-xs font-medium uppercase tracking-wider text-muted-foreground", className)}>
        {label}
      </span>
    )
  }
  return (
    <button
      type="button"
      onClick={onSort}
      className={cn(
        "group inline-flex items-center gap-1 text-xs font-medium uppercase tracking-wider text-muted-foreground hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600",
        className
      )}
    >
      {label}
      {active === "asc" ? (
        <ArrowUp className="h-3.5 w-3.5" aria-hidden="true" />
      ) : active === "desc" ? (
        <ArrowDown className="h-3.5 w-3.5" aria-hidden="true" />
      ) : (
        <ArrowUpDown className="h-3.5 w-3.5 opacity-40 group-hover:opacity-100" aria-hidden="true" />
      )}
    </button>
  )
}