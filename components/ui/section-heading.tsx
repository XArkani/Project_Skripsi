import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"

interface SectionHeadingProps {
  title: string
  description?: string
  action?: {
    label: string
    href: string
  }
  align?: "left" | "center"
  className?: string
  titleClassName?: string
}

export default function SectionHeading({
  title,
  description,
  action,
  align = "left",
  className,
  titleClassName,
}: SectionHeadingProps) {
  return (
    <div className={cn("flex flex-wrap items-end justify-between gap-x-8 gap-y-4", className)}>
      <div className={cn("max-w-2xl", align === "center" && "mx-auto text-center")}>
        <h2
          className={cn(
            "text-[clamp(1.75rem,3vw,2.5rem)] font-bold leading-[1.12] tracking-[-0.02em] text-foreground",
            titleClassName
          )}
        >
          {title}
        </h2>
        {description && (
          <p className={cn("mt-3 max-w-xl text-base leading-relaxed text-muted-foreground", align === "center" && "mx-auto")}>
            {description}
          </p>
        )}
      </div>
      {action && (
        <Link
          href={action.href}
          className="group inline-flex items-center gap-1.5 rounded-lg py-2 text-sm font-semibold text-emerald-700 transition-colors hover:text-emerald-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600"
        >
          {action.label}
          <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" aria-hidden="true" />
        </Link>
      )}
    </div>
  )
}