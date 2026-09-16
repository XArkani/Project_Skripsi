"use client"

import { useEffect, useState } from "react"
import { AnimatePresence, motion, useReducedMotion, useScroll, useSpring } from "framer-motion"
import { ArrowUp } from "lucide-react"
import { useUiChrome } from "./ui-chrome"

const SHOW_AFTER_PX = 600
const RING_SIZE = 44
const RING_RADIUS = 20

export default function ScrollToTop() {
  const { navOpen, installPromptOpen } = useUiChrome()
  const [scrolled, setScrolled] = useState(false)
  const [footerNear, setFooterNear] = useState(false)
  const reduceMotion = useReducedMotion()

  const { scrollYProgress } = useScroll()
  const springProgress = useSpring(scrollYProgress, {
    stiffness: 300,
    damping: 40,
    mass: 0.8,
  })
  const progress = reduceMotion ? scrollYProgress : springProgress

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > SHOW_AFTER_PX)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  useEffect(() => {
    // Sembunyi saat footer mendekat supaya tidak menutupi copyright / tautan footer.
    const footer = document.querySelector("footer")
    if (!footer || typeof IntersectionObserver === "undefined") return
    const observer = new IntersectionObserver(
      ([entry]) => setFooterNear(entry.isIntersecting),
      { rootMargin: "0px 0px 96px 0px" }
    )
    observer.observe(footer)
    return () => observer.disconnect()
  }, [])

  const visible = scrolled && !footerNear && !navOpen && !installPromptOpen

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={reduceMotion ? { opacity: 1 } : { opacity: 0, y: 8, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={reduceMotion ? { opacity: 1 } : { opacity: 0, y: 8, scale: 0.95 }}
          transition={reduceMotion ? { duration: 0 } : { duration: 0.22, ease: "easeOut" }}
          className="fixed bottom-[calc(18px+env(safe-area-inset-bottom))] right-4 z-30 md:right-6 md:bottom-6"
        >
          <button
            type="button"
            aria-label="Kembali ke atas"
            title="Kembali ke atas"
            onClick={() => window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" })}
            className="relative grid h-11 w-11 cursor-pointer place-items-center rounded-full border border-border bg-card/95 text-foreground shadow-[0_2px_10px_rgba(2,6,23,0.08)] backdrop-blur-md transition-[translate,scale,border-color,background-color,color] duration-150 hover:-translate-y-0.5 hover:border-emerald-300 hover:bg-card hover:text-emerald-700 active:translate-y-0 active:scale-[0.96] dark:hover:text-emerald-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600"
          >
            <svg
              className="pointer-events-none absolute inset-0 h-full w-full -rotate-90"
              viewBox={`0 0 ${RING_SIZE} ${RING_SIZE}`}
              fill="none"
              aria-hidden="true"
            >
              <circle
                cx={RING_SIZE / 2}
                cy={RING_SIZE / 2}
                r={RING_RADIUS}
                className="text-border"
                stroke="currentColor"
                strokeWidth={2}
              />
              <motion.circle
                cx={RING_SIZE / 2}
                cy={RING_SIZE / 2}
                r={RING_RADIUS}
                className="text-emerald-600"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                style={{ pathLength: progress }}
              />
            </svg>
            <ArrowUp className="relative h-[18px] w-[18px]" strokeWidth={2} aria-hidden="true" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
