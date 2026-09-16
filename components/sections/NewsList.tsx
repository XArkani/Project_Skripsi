"use client"

import { useMemo, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, useReducedMotion } from "framer-motion"
import { Search, X, RotateCcw, ArrowRight, Calendar, Newspaper } from "lucide-react"
import type { News } from "@/lib/types"
import ImagePlaceholder from "@/components/shared/ImagePlaceholder"

interface NewsListProps {
  items: News[]
}

const EASE = [0.22, 1, 0.36, 1] as const

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: EASE } },
}

function isStockImage(src: string) {
  try {
    return new URL(src).hostname.includes("unsplash")
  } catch {
    return false
  }
}

function NewsMedia({ src, alt }: { src: string; alt: string }) {
  if (src && !isStockImage(src)) {
    return (
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(min-width: 1280px) 33vw, (min-width: 640px) 50vw, 100vw"
        className="object-cover group-hover:scale-105 transition-transform duration-500"
        loading="lazy"
      />
    )
  }
  return <ImagePlaceholder label="Gambar Berita" className="w-full h-full" />
}

function NewsCard({ item, animate }: { item: News; animate: boolean }) {
  return (
    <motion.div
      variants={animate ? cardVariants : undefined}
      initial={animate ? "hidden" : false}
      whileInView={animate ? "visible" : undefined}
      viewport={animate ? { once: true, margin: "-40px", amount: 0.1 } : undefined}
      className="group bg-card overflow-hidden border border-border shadow-sm hover:shadow-lg hover:border-emerald-200 transition-all flex flex-col rounded-2xl"
    >
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-muted sm:aspect-auto sm:h-48">
        <NewsMedia src={item.image} alt={item.title} />
      </div>

      <div className="flex flex-1 flex-col gap-3 p-5">
        <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-muted-foreground">
          <Calendar className="w-3.5 h-3.5 shrink-0 text-emerald-600" aria-hidden="true" />
          {item.date}
        </span>

        <Link href={`/berita/${item.slug}`}>
          <h3 className="font-bold text-foreground leading-snug group-hover:text-emerald-700 dark:group-hover:text-emerald-300 transition-colors line-clamp-2">
            {item.title}
          </h3>
        </Link>

        <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">{item.excerpt}</p>

        <div className="mt-auto pt-3">
          <Link
            href={`/berita/${item.slug}`}
            className="w-full min-h-11 flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600 text-white text-sm font-bold transition-colors"
          >
            Baca Selengkapnya
            <ArrowRight className="w-4 h-4 shrink-0" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </motion.div>
  )
}

export default function NewsList({ items }: NewsListProps) {
  const reduceMotion = useReducedMotion()
  const [query, setQuery] = useState("")

  const normalizedQuery = query.trim().toLowerCase()

  const filtered = useMemo(
    () =>
      items.filter((item) =>
        normalizedQuery === ""
          ? true
          : [item.title, item.excerpt, item.date].join(" ").toLowerCase().includes(normalizedQuery)
      ),
    [items, normalizedQuery]
  )

  const hasFilter = query.trim() !== ""

  const resetFilters = () => setQuery("")

  return (
    <div className="space-y-6">
      <div className="sticky top-(--header-h) z-20 mx-[calc(-1*var(--page-gutter))] px-(--page-gutter) sm:mx-0 sm:px-0 py-3 bg-background/95 backdrop-blur-sm">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" aria-hidden="true" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Cari berita, prestasi, atau kata kunci..."
            aria-label="Cari berita"
            className="w-full pl-11 pr-10 py-3 rounded-xl border border-border bg-background focus:bg-background focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-sm transition-all outline-none placeholder:text-muted-foreground"
          />
          {query !== "" && (
            <button
              type="button"
              onClick={() => setQuery("")}
              aria-label="Bersihkan pencarian"
              className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center justify-center w-11 h-11 rounded-full text-muted-foreground hover:text-foreground hover:bg-muted transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      <div className="flex items-center justify-between flex-wrap gap-2">
        <p aria-live="polite" className="text-sm text-muted-foreground">
          Menampilkan <span className="font-bold text-foreground">{filtered.length}</span> dari{" "}
          <span className="font-bold text-foreground">{items.length}</span> berita
        </p>
        {hasFilter && (
          <button
            type="button"
            onClick={resetFilters}
            className="inline-flex min-h-11 items-center gap-1.5 text-sm font-bold text-emerald-700 hover:text-emerald-800 hover:bg-emerald-50 dark:text-emerald-300 dark:hover:text-emerald-200 dark:hover:bg-emerald-950/60 px-3 py-2 rounded-lg transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600"
          >
            <RotateCcw className="w-4 h-4" aria-hidden="true" />
            Reset
          </button>
        )}
      </div>

      {filtered.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-border bg-card px-6 py-14 text-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-muted text-muted-foreground mx-auto">
            <Newspaper className="h-7 w-7" />
          </div>
          <h3 className="text-base font-bold text-foreground mt-4">Berita tidak ditemukan</h3>
          <p className="max-w-sm mx-auto text-sm text-muted-foreground mt-1.5">
            {query.trim() !== "" ? (
              <>
                Tidak ada berita yang cocok untuk pencarian{" "}
                <span className="font-bold text-emerald-700 dark:text-emerald-300">&quot;{query.trim()}&quot;</span>.
              </>
            ) : (
              "Belum ada berita yang cocok."
            )}
          </p>
          {hasFilter && (
            <button
              type="button"
              onClick={resetFilters}
              className="inline-flex items-center gap-2 mt-5 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-bold px-5 py-2.5 min-h-11 rounded-xl transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600"
            >
              <RotateCcw className="w-4 h-4" aria-hidden="true" />
              Tampilkan Semua Berita
            </button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
          {filtered.map((item) => (
            <NewsCard key={item.id} item={item} animate={!reduceMotion} />
          ))}
        </div>
      )}
    </div>
  )
}
