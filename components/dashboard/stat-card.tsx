import Link from "next/link"
import type { LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"

interface StatCardProps {
  icon: LucideIcon
  label: string
  value: string | number
  context?: string
  href?: string
  badge?: number
}

export default function StatCard({
  icon: Icon,
  label,
  value,
  context,
  href,
  badge,
}: StatCardProps) {
  const body = (
    <div className="flex h-full min-h-[120px] items-start justify-between gap-3 rounded-2xl border border-border bg-card p-4 transition-colors group-hover:border-foreground/20 sm:min-h-0 sm:gap-4 sm:p-5">
      <div className="min-w-0">
        <p className="truncate text-[13px] font-medium text-muted-foreground sm:text-sm">{label}</p>
        <p className="mt-1.5 text-[28px] font-semibold leading-none tabular-nums tracking-tight text-foreground sm:text-3xl">
          {value}
        </p>
        {context && <p className="mt-1.5 line-clamp-2 text-xs text-muted-foreground">{context}</p>}
      </div>
      <div className="flex shrink-0 flex-col items-end gap-2">
        <span className="grid h-9 w-9 place-items-center rounded-lg bg-emerald-50 text-emerald-700 ring-1 ring-emerald-100 dark:bg-emerald-950/60 dark:text-emerald-300 dark:ring-emerald-900 sm:h-10 sm:w-10">
          <Icon className="h-5 w-5" aria-hidden="true" />
        </span>
        {badge != null && badge > 0 && (
          <span className="inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-emerald-600 px-1.5 text-[11px] font-semibold text-white tabular-nums">
            {badge}
          </span>
        )}
      </div>
    </div>
  )

  if (href) {
    return (
      <Link href={href} className="group block h-full focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600">
        {body}
      </Link>
    )
  }
  return <div className={cn("h-full")}>{body}</div>
}
