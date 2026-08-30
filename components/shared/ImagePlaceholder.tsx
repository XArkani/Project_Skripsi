import { ImageIcon } from "lucide-react"
import { cn } from "@/lib/utils"

interface ImagePlaceholderProps {
  label?: string
  className?: string
  compact?: boolean
}

export default function ImagePlaceholder({
  label = "Gambar",
  className,
  compact = false,
}: ImagePlaceholderProps) {
  return (
    <div
      className={cn(
        "relative flex flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-[#005f45] via-[#003c32] to-[#001812] text-emerald-100",
        className
      )}
    >
      <div className="bg-blueprint-grid absolute inset-0 opacity-60" aria-hidden="true" />
      <div
        className="absolute -right-10 -top-14 h-52 w-52 rounded-full bg-emerald-500/20 blur-3xl"
        aria-hidden="true"
      />
      <div className="relative flex flex-col items-center gap-2.5 px-4 text-center">
        <span
          className={cn(
            "grid place-items-center rounded-full border border-emerald-300/30 bg-emerald-50/5 text-emerald-200",
            compact ? "h-9 w-9" : "h-12 w-12"
          )}
        >
          <ImageIcon className={compact ? "h-4 w-4" : "h-5 w-5"} aria-hidden="true" />
        </span>
        <span className="max-w-full truncate text-[11px] font-semibold uppercase tracking-[0.14em] text-emerald-100/70">
          {label}
        </span>
      </div>
    </div>
  )
}