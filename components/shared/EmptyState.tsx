import { PackageOpen } from "lucide-react"
import { cn } from "@/lib/utils"

interface EmptyStateProps {
  title?: string
  description?: string
  className?: string
}

export default function EmptyState({
  title = "Belum ada data",
  description = "Data belum tersedia saat ini. Silakan kembali lagi nanti.",
  className,
}: EmptyStateProps) {
  return (
    <div className={cn("flex flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-border bg-muted/60 px-6 py-14 text-center", className)}>
      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-muted text-muted-foreground">
        <PackageOpen className="h-7 w-7" />
      </div>
      <h3 className="text-base font-bold text-foreground">{title}</h3>
      {description && <p className="max-w-sm text-sm text-muted-foreground">{description}</p>}
    </div>
  )
}
