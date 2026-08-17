"use client"

import { useRef, useState } from "react"

export function useSnapScroller() {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [activeIndex, setActiveIndex] = useState(0)

  const handleScroll = () => {
    const container = scrollRef.current
    if (!container) return
    const containerRect = container.getBoundingClientRect()
    const containerCenter = containerRect.left + containerRect.width / 2
    const cards = Array.from(container.querySelectorAll<HTMLElement>("[data-carousel-card]"))
    let bestIndex = 0
    let bestDistance = Infinity
    cards.forEach((card, i) => {
      const rect = card.getBoundingClientRect()
      const distance = Math.abs(rect.left + rect.width / 2 - containerCenter)
      if (distance < bestDistance) {
        bestDistance = distance
        bestIndex = i
      }
    })
    setActiveIndex(bestIndex)
  }

  const scrollToCard = (index: number) => {
    const container = scrollRef.current
    if (!container) return
    const card = container.querySelectorAll<HTMLElement>("[data-carousel-card]")[index]
    if (!card) return
    const containerRect = container.getBoundingClientRect()
    const target = container.scrollLeft + (card.getBoundingClientRect().left - containerRect.left)
    container.scrollTo({ left: target, behavior: "smooth" })
  }

  return { scrollRef, onScroll: handleScroll, scrollToCard, activeIndex }
}