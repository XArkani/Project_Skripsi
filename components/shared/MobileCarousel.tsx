"use client"

import { useCallback, useEffect, useRef, useState, type ReactNode } from "react"
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion"
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
  const [index, setIndex] = useState(0)
  const [hintVisible, setHintVisible] = useState(true)
  const reduceMotion = useReducedMotion()

  const { scrollXProgress } = useScroll({ container: rowRef, axis: "x" })
  const safeCount = Math.max(count, 1)
  const fillTarget = useTransform(scrollXProgress, [0, 1], [1 / safeCount, 1])
  const fillSpring = useSpring(fillTarget, { stiffness: 300, damping: 40, mass: 0.8 })
  const fill = reduceMotion ? fillTarget : fillSpring

  const update = useCallback(() => {
    const row = rowRef.current
    if (!row) return
    if (row.scrollLeft > 8) setHintVisible(false)

    const first = row.firstElementChild as HTMLElement | null
    if (first) {
      const gap = parseFloat(getComputedStyle(row).columnGap || "0") || 0
      const step = first.offsetWidth + gap
      const nextIndex = step > 0 ? Math.round(row.scrollLeft / step) : 0
      setIndex(Math.min(Math.max(nextIndex, 0), safeCount - 1))
    }
  }, [safeCount])

  useEffect(() => {
    const frame = requestAnimationFrame(update)
    window.addEventListener("resize", update)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener("resize", update)
    }
  }, [update])

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
          <motion.span
            className="absolute inset-0 origin-left rounded-full bg-emerald-600"
            style={{ scaleX: fill }}
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
