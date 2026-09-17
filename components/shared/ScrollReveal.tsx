import { cn } from "@/lib/utils"

interface ScrollRevealProps {
  children: React.ReactNode
  className?: string
  delay?: number
  y?: number
}

// Reveal tanpa JavaScript: animasi CSS scroll-driven (`animation-timeline: view()`)
// bila didukung; fallback ke animasi saat load. Tidak ada komponen klien,
// tidak ada IntersectionObserver, dan konten tetap ada di HTML server.
export default function ScrollReveal({
  children,
  className,
  delay = 0,
  y = 24,
}: ScrollRevealProps) {
  return (
    <div
      className={cn("reveal", className)}
      style={
        {
          animationDelay: `${delay}ms`,
          "--reveal-y": `${y}px`,
        } as React.CSSProperties
      }
    >
      {children}
    </div>
  )
}
