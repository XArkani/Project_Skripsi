"use client"

import { cn } from "@/lib/utils"

interface CarouselDotsProps {
  count: number
  activeIndex: number
  onSelect: (index: number) => void
  className?: string
}

export default function CarouselDots({ count, activeIndex, onSelect, className }: CarouselDotsProps) {
  if (count <= 1) return null

  return (
    <div className={cn("flex items-center justify-center gap-2", className)}>
      {Array.from({ length: count }).map((_, i) => (
        <button
          key={i}
          type="button"
          onClick={() => onSelect(i)}
          aria-label={`Lompat ke data ${i + 1}`}
          className={cn(
            "h-2.5 rounded-full transition-all duration-300 cursor-pointer",
            i === activeIndex ? "w-7 bg-emerald-600" : "w-2.5 bg-slate-300 hover:bg-slate-400"
          )}
        />
      ))}
    </div>
  )
}