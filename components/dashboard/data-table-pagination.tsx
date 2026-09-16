"use client"

import { ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"

interface DataTablePaginationProps {
  page: number
  pageCount: number
  total: number
  start: number
  end: number
  onPageChange: (page: number) => void
}

function pageNumbers(page: number, pageCount: number) {
  if (pageCount <= 5) {
    return Array.from({ length: pageCount }, (_, i) => i + 1)
  }
  const set = new Set<number>([1, pageCount, page - 1, page, page + 1].filter((n) => n >= 1 && n <= pageCount))
  const sorted = [...set].sort((a, b) => a - b)
  const out: number[] = []
  let prev = 0
  for (const n of sorted) {
    if (prev && n - prev > 1) out.push(-1)
    out.push(n)
    prev = n
  }
  return out
}

const navButtonClass =
  "inline-flex h-11 w-11 items-center justify-center rounded-lg border border-border bg-card text-muted-foreground transition-colors hover:bg-muted hover:text-foreground disabled:pointer-events-none disabled:opacity-40 md:h-8 md:w-8 md:rounded-md"

export default function DataTablePagination({
  page,
  pageCount,
  total,
  start,
  end,
  onPageChange,
}: DataTablePaginationProps) {
  return (
    <div className="flex flex-col gap-2.5 sm:flex-row sm:items-center sm:justify-between">
      <p className="text-[13px] text-muted-foreground sm:text-sm" aria-live="polite">
        <span className="sm:hidden">
          <span className="font-semibold text-foreground">{total === 0 ? 0 : start}</span>–
          <span className="font-semibold text-foreground">{end}</span> dari{" "}
          <span className="font-semibold text-foreground">{total}</span> data
        </span>
        <span className="hidden sm:inline">
          Menampilkan{" "}
          <span className="font-semibold text-foreground">{total === 0 ? 0 : start}</span>–
          <span className="font-semibold text-foreground">{end}</span> dari{" "}
          <span className="font-semibold text-foreground">{total}</span> data
        </span>
      </p>

      <nav aria-label="Navigasi halaman" className="flex items-center gap-1.5 md:gap-1">
        <button
          type="button"
          onClick={() => onPageChange(page - 1)}
          disabled={page <= 1}
          aria-label="Halaman sebelumnya"
          className={navButtonClass}
        >
          <ChevronLeft className="h-4 w-4" />
        </button>

        <span className="px-2 text-sm font-medium tabular-nums text-muted-foreground md:hidden">
          {page} / {pageCount}
        </span>

        <div className="hidden items-center gap-1 md:flex">
          {pageNumbers(page, pageCount).map((n, i) =>
            n === -1 ? (
              <span key={`gap-${i}`} className="px-1 text-sm text-muted-foreground">
                …
              </span>
            ) : (
              <button
                key={n}
                type="button"
                onClick={() => onPageChange(n)}
                aria-current={n === page ? "page" : undefined}
                className={cn(
                  "inline-flex h-8 min-w-8 items-center justify-center rounded-md px-2 text-sm font-medium transition-colors",
                  n === page
                    ? "bg-emerald-600 text-white"
                    : "border border-border bg-card text-muted-foreground hover:bg-muted hover:text-foreground"
                )}
              >
                {n}
              </button>
            )
          )}
        </div>

        <button
          type="button"
          onClick={() => onPageChange(page + 1)}
          disabled={page >= pageCount}
          aria-label="Halaman berikutnya"
          className={navButtonClass}
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </nav>
    </div>
  )
}
