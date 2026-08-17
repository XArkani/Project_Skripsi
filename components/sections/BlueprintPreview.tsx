"use client"

import { ArrowRight } from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"
import type { Blueprint } from "@/lib/types"
import ImagePlaceholder from "@/components/shared/ImagePlaceholder"
import CarouselDots from "@/components/shared/CarouselDots"
import { useSnapScroller } from "@/components/shared/useSnapScroller"
import Reveal, { Stagger, fadeUpItem } from "@/components/shared/Reveal"

interface BlueprintPreviewProps {
  items: Blueprint[]
}

export default function BlueprintPreview({ items }: BlueprintPreviewProps) {
  const { scrollRef, onScroll, scrollToCard, activeIndex } = useSnapScroller()
  const visibleItems = items.slice(0, 3)

  return (
    <section className="py-12 sm:py-16 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal className="flex flex-wrap items-end justify-between gap-4 mb-6">
          <div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 mb-1">Blueprint & Fasilitas</h2>
            <p className="text-slate-500 text-sm">Standar industri untuk fasilitas belajar mengajar terbaik.</p>
          </div>
          <Link href="/blueprint" className="inline-flex items-center gap-1.5 text-emerald-600 hover:text-emerald-700 font-medium text-sm transition-colors mb-1">
            <span>Lihat Semua Fasilitas</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </Reveal>

        <Stagger
          scrollRef={scrollRef}
          onScroll={onScroll}
          className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-2 -mx-4 px-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:mx-0 sm:px-0 sm:pb-0 sm:grid sm:grid-cols-2 lg:grid-cols-3 sm:gap-5 sm:overflow-visible"
        >
          {visibleItems.map((item) => (
            <motion.div
              key={item.id}
              variants={fadeUpItem}
              className="flex-none w-[85%] snap-center sm:w-auto"
            >
              <Link
                href="/blueprint"
                data-carousel-card
                className="group bg-white rounded-xl overflow-hidden border border-slate-200 hover:shadow-md hover:border-emerald-200 transition-all w-full h-full flex flex-col"
              >
                <div className="relative h-48 overflow-hidden bg-slate-100">
                  <ImagePlaceholder label={item.title} className="w-full h-full" />
                  {item.category && (
                    <span className="absolute top-3 left-3 bg-emerald-600 text-white text-xs font-bold px-2.5 py-1 rounded-full">
                      {item.category}
                    </span>
                  )}
                </div>
                <div className="p-4 flex-1">
                  <h3 className="font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">{item.title}</h3>
                  <p className="text-slate-500 text-sm mt-1 line-clamp-2">{item.description}</p>
                </div>
              </Link>
            </motion.div>
          ))}
        </Stagger>

        <CarouselDots
          count={visibleItems.length}
          activeIndex={activeIndex}
          onSelect={scrollToCard}
          className="sm:hidden mt-4"
        />
      </div>
    </section>
  )
}