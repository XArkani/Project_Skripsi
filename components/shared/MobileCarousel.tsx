"use client"

import { useCallback, useEffect, useRef, useState, type ReactNode } from "react"
import { cn } from "@/lib/utils"
import { ScrollHintLabel } from "@/components/shared/ScrollHint"

interface MobileCarouselProps {
  label: string
  count: number
  className?: string
  rowClassName?: string
  children: ReactNode
}

export default function MobileCarousel({
  label,
  count,
  className,
  rowClassName,
  children,
}: MobileCarouselProps) {
  const rowRef = useRef<HTMLDivElement>(null)
  const fillRef = useRef<HTMLSpanElement>(null)
  const stepRef = useRef(0)
  const [index, setIndex] = useState(0)
  const [hintVisible, setHintVisible] = useState(true)

  const safeCount = Math.max(count, 1)

  // Ukur lebar satu kartu + gap SEKALI (mount/resize), bukan tiap event scroll —
  // getComputedStyle/offsetWidth di dalam handler scroll memicu forced reflow.
  const measure = useCallback(() => {
    const row = rowRef.current
    if (!row) return
    const first = row.firstElementChild as HTMLElement | null
    if (!first) return
    const gap = parseFloat(getComputedStyle(row).columnGap || "0") || 0
    stepRef.current = first.offsetWidth + gap
  }, [])

  // Satu handler scroll: baca scrollLeft (murah), tulis index + transform progress
  // bar langsung ke DOM tanpa re-render React.
  const update = useCallback(() => {
    const row = rowRef.current
    if (!row) return
    if (row.scrollLeft > 8) setHintVisible(false)

    const step = stepRef.current
    if (step > 0) {
      setIndex(Math.min(Math.max(Math.round(row.scrollLeft / step), 0), safeCount - 1))
    }

    const max = row.scrollWidth - row.clientWidth
    const ratio = max > 0 ? Math.min(1, Math.max(row.scrollLeft / max, 1 / safeCount)) : 1
    if (fillRef.current) fillRef.current.style.transform = `scaleX(${ratio})`
  }, [safeCount])

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      measure()
      update()
    })
    const onResize = () => {
      measure()
      update()
    }
    window.addEventListener("resize", onResize)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener("resize", onResize)
    }
  }, [measure, update])

  useEffect(() => {
    const timer = setTimeout(() => setHintVisible(false), 4500)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className={cn("relative", className)}>
      <div ref={rowRef} onScroll={update} role="region" aria-label={label} className={rowClassName}>
        {children}
      </div>

      <div className="mt-3 flex items-center gap-3 md:hidden">
        <div
          className="relative h-1 flex-1 overflow-hidden rounded-full bg-border"
          aria-hidden="true"
        >
          <span
            ref={fillRef}
            className="absolute inset-0 origin-left rounded-full bg-emerald-600 transition-transform duration-150 ease-out"
            style={{ transform: `scaleX(${1 / safeCount})` }}
          />
        </div>
        <ScrollHintLabel
          className={cn("transition-opacity duration-300", hintVisible ? "opacity-100" : "opacity-0")}
        />
      </div>

      <p className="sr-only" aria-live="polite">
        {`Kartu ${index + 1} dari ${safeCount}`}
      </p>
    </div>
  )
}
