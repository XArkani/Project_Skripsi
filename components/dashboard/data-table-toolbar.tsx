"use client"

import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"

interface DataTableToolbarProps {
  searchValue: string
  onSearchChange: (value: string) => void
  placeholder?: string
  left?: React.ReactNode
  children?: React.ReactNode
}

export default function DataTableToolbar({
  searchValue,
  onSearchChange,
  placeholder = "Cari...",
  left,
  children,
}: DataTableToolbarProps) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex flex-1 flex-col gap-2 sm:flex-row sm:items-center sm:gap-3">
        <div className="relative w-full sm:max-w-xs">
          <Search
            className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
            aria-hidden="true"
          />
          <Input
            type="search"
            value={searchValue}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder={placeholder}
            aria-label={placeholder}
            className="h-9 pl-9"
          />
        </div>
        {left}
      </div>
      {children && <div className="flex shrink-0 items-center gap-2">{children}</div>}
    </div>
  )
}