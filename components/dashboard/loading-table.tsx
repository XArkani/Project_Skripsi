import { Skeleton } from "@/components/ui/skeleton"

export default function LoadingTable({ rowCount = 6 }: { rowCount?: number }) {
  return (
    <div className="space-y-4" aria-hidden="true">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <Skeleton className="h-11 w-full sm:max-w-xs md:h-9" />
        <div className="flex gap-2.5 sm:gap-3">
          <Skeleton className="hidden h-9 w-44 sm:block" />
          <Skeleton className="h-11 w-full sm:h-9 sm:w-32 md:h-9" />
        </div>
      </div>

      {/* Mobile: card skeleton */}
      <div className="space-y-3 md:hidden">
        {Array.from({ length: rowCount }).map((_, i) => (
          <div key={i} className="flex items-start gap-3 rounded-2xl border border-border bg-card p-3.5">
            <div className="min-w-0 flex-1 space-y-2">
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-3 w-1/2" />
            </div>
            <Skeleton className="h-10 w-10 shrink-0 rounded-lg" />
          </div>
        ))}
      </div>

      {/* Desktop: table skeleton */}
      <div className="hidden overflow-hidden rounded-xl border border-border md:block">
        <div className="flex items-center gap-4 border-b border-border bg-muted/40 px-4 py-3">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-3 w-20" />
          ))}
        </div>
        <div className="divide-y divide-border/60">
          {Array.from({ length: rowCount }).map((_, i) => (
            <div key={i} className="flex items-center gap-4 px-4 py-3.5">
              <Skeleton className="h-3 w-1/3" />
              <Skeleton className="h-3 w-1/4" />
              <Skeleton className="h-3 w-1/5" />
              <Skeleton className="ml-auto h-8 w-8 rounded-md" />
            </div>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-between gap-3">
        <Skeleton className="h-4 w-28 md:h-3 md:w-36" />
        <Skeleton className="h-11 w-32 md:h-8 md:w-24" />
      </div>
    </div>
  )
}
