"use client"

import { useEffect, useState } from "react"

export function useReducedMotion() {
  const [reduced, setReduced] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)")
    const update = () => setReduced(mq.matches)
    const frame = requestAnimationFrame(update)
    mq.addEventListener("change", update)
    return () => {
      cancelAnimationFrame(frame)
      mq.removeEventListener("change", update)
    }
  }, [])

  return reduced
}
