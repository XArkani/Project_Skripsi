"use client"

import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"

interface DataTableToolbarProps {
  searchValue: string
  onSearchChange: (value: string) => void
  placeholder?: string
  filter?: React.ReactNode
  action?: React.ReactNode
}

export default function DataTableToolbar({
  searchValue,
  onSearchChange,
  placeholder = "Cari...",
  filter,
  action,
}: DataTableToolbarProps) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div className="relative w-full sm:max-w-xs">
        <Search
          className="pointer-events-none absolute left-3.5 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-muted-foreground"
          aria-hidden="true"
        />
        <Input
          type="search"
          value={searchValue}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder={placeholder}
          aria-label={placeholder}
          className="h-11 pl-10 md:h-9"
        />
      </div>

      {(filter || action) && (
        <div className="flex flex-col gap-2.5 min-[341px]:flex-row min-[341px]:items-center sm:flex-1 sm:justify-end sm:gap-3">
          {filter && (
            <div className="min-[341px]:min-w-0 min-[341px]:flex-1 sm:w-44 sm:flex-none">
              {filter}
            </div>
          )}
          {action && <div className="shrink-0">{action}</div>}
        </div>
      )}
    </div>
  )
}
