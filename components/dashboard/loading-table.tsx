import { Skeleton } from "@/components/ui/skeleton"

export default function LoadingTable({ rowCount = 6 }: { rowCount?: number }) {
  return (
    <div className="space-y-4" aria-hidden="true">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <Skeleton className="h-9 w-full max-w-xs" />
        <Skeleton className="h-9 w-28" />
      </div>
      <div className="overflow-hidden rounded-xl border border-border">
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
      <div className="flex items-center justify-between">
        <Skeleton className="h-3 w-36" />
        <Skeleton className="h-8 w-24" />
      </div>
    </div>
  )
}