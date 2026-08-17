"use client"

import { ArrowRight } from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"
import type { News } from "@/lib/types"
import ImagePlaceholder from "@/components/shared/ImagePlaceholder"
import CarouselDots from "@/components/shared/CarouselDots"
import { useSnapScroller } from "@/components/shared/useSnapScroller"
import Reveal, { Stagger, fadeUpItem } from "@/components/shared/Reveal"

interface NewsPreviewProps {
  items: News[]
}

export default function NewsPreview({ items }: NewsPreviewProps) {
  const { scrollRef, onScroll, scrollToCard, activeIndex } = useSnapScroller()
  const visibleItems = items.slice(0, 3)

  return (
    <section className="py-12 sm:py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal className="flex flex-wrap items-end justify-between gap-4 mb-6">
          <div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 mb-1">Kabar & Berita</h2>
            <p className="text-slate-500 text-sm">Prestasi, riset, dan informasi penting dari dekanat.</p>
          </div>
          <Link href="/berita" className="inline-flex items-center gap-1.5 text-emerald-600 hover:text-emerald-700 font-medium text-sm transition-colors mb-1">
            <span>Lihat Semua Berita</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </Reveal>

        <Stagger
          scrollRef={scrollRef}
          onScroll={onScroll}
          className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-2 -mx-4 px-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:mx-0 sm:px-0 sm:pb-0 sm:grid sm:grid-cols-2 lg:grid-cols-3 sm:gap-5 sm:overflow-visible"
        >
          {visibleItems.map((article) => (
            <motion.div key={article.id} variants={fadeUpItem} className="flex-none w-[85%] snap-center sm:w-auto">
              <Link
                href={`/berita/${article.slug}`}
                data-carousel-card
                className="group bg-slate-50 rounded-xl overflow-hidden border border-slate-200/60 hover:shadow-md hover:border-emerald-200 transition-all w-full h-full flex flex-col"
              >
                <div className="h-44 overflow-hidden bg-slate-100">
                  <ImagePlaceholder label={article.title} className="w-full h-full" />
                </div>
                <div className="p-4 flex-1">
                  <span className="text-slate-400 text-xs font-medium">{article.date}</span>
                  <h3 className="font-bold text-slate-900 mt-1 group-hover:text-emerald-700 transition-colors line-clamp-2">{article.title}</h3>
                  <p className="text-slate-500 text-sm mt-1 line-clamp-2">{article.excerpt}</p>
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