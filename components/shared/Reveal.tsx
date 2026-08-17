"use client"

import { motion, useReducedMotion } from "framer-motion"
import { cn } from "@/lib/utils"

export const EASE_PREMIUM = [0.22, 1, 0.36, 1] as const

export const fadeUpItem = {
  hidden: { opacity: 0, y: 24, filter: "blur(4px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.55, ease: EASE_PREMIUM },
  },
}

interface RevealProps {
  children: React.ReactNode
  className?: string
  delay?: number
  y?: number
  once?: boolean
}

export default function Reveal({ children, className, delay = 0, y = 28, once = true }: RevealProps) {
  const reduceMotion = useReducedMotion()

  return (
    <motion.div
      initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y, scale: 0.98, filter: "blur(6px)" }}
      whileInView={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
      viewport={{ once, margin: "-60px" }}
      transition={{ duration: 0.6, delay, ease: EASE_PREMIUM }}
      className={cn(className)}
    >
      {children}
    </motion.div>
  )
}

interface StaggerProps {
  children: React.ReactNode
  className?: string
  stagger?: number
  delayChildren?: number
  amount?: number
  scrollRef?: React.RefObject<HTMLDivElement | null>
  onScroll?: (e: React.UIEvent<HTMLDivElement>) => void
}

export function Stagger({
  children,
  className,
  stagger = 0.08,
  delayChildren = 0.1,
  amount = 0.2,
  scrollRef,
  onScroll,
}: StaggerProps) {
  return (
    <motion.div
      ref={scrollRef}
      onScroll={onScroll}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: stagger, delayChildren } },
      }}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px", amount }}
      className={cn(className)}
    >
      {children}
    </motion.div>
  )
}