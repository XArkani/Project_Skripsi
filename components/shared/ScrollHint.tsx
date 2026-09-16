"use client"

import { useEffect, useRef, useState, type ReactNode } from "react"
import { MoveHorizontal } from "lucide-react"
import { cn } from "@/lib/utils"

export function ScrollHintLabel({ className }: { className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "pointer-events-none inline-flex shrink-0 items-center gap-1.5 text-[11px] font-medium text-muted-foreground",
        className
      )}
    >
      <MoveHorizontal className="h-4 w-4" strokeWidth={2} aria-hidden="true" />
      Geser
    </span>
  )
}

interface HorizontalScrollHintProps {
  children: ReactNode
  rowClassName?: string
  className?: string
}

export default function HorizontalScrollHint({
  children,
  rowClassName,
  className,
}: HorizontalScrollHintProps) {
  const rowRef = useRef<HTMLDivElement>(null)
  const [overflowing, setOverflowing] = useState(false)
  const [dismissed, setDismissed] = useState(false)

  useEffect(() => {
    const row = rowRef.current
    if (!row) return
    const check = () => setOverflowing(row.scrollWidth > row.clientWidth + 8)
    const frame = requestAnimationFrame(check)
    window.addEventListener("resize", check)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener("resize", check)
    }
  }, [])

  useEffect(() => {
    if (!overflowing) return
    const timer = setTimeout(() => setDismissed(true), 4500)
    return () => clearTimeout(timer)
  }, [overflowing])

  const showHint = overflowing && !dismissed

  return (
    <div className={cn("relative", className)}>
      <div
        ref={rowRef}
        onScroll={() => {
          if ((rowRef.current?.scrollLeft ?? 0) > 8) setDismissed(true)
        }}
        className={rowClassName}
      >
        {children}
      </div>
      <div
        aria-hidden="true"
        className={cn(
          "pointer-events-none absolute right-2 top-1/2 inline-flex -translate-y-1/2 items-center rounded-full border border-border bg-background/95 px-2.5 py-1 shadow-[0_2px_8px_rgba(2,6,23,0.08)] backdrop-blur-sm transition-opacity duration-300",
          showHint ? "opacity-100" : "opacity-0"
        )}
      >
        <ScrollHintLabel />
      </div>
    </div>
  )
}
