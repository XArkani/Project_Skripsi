"use client"

import { useMemo, useRef, useState, useCallback, useEffect } from "react"
import Image from "next/image"
import { useRouter, usePathname, useSearchParams } from "next/navigation"
import { useReducedMotion } from "@/lib/use-reduced-motion"
import { Dialog as DialogPrimitive } from "radix-ui"
import { Search, X, Building2, RotateCcw, ArrowRight, Maximize2, MapPin } from "lucide-react"
import type { Blueprint } from "@/lib/types"
import ImagePlaceholder from "@/components/shared/ImagePlaceholder"
import HorizontalScrollHint from "@/components/shared/ScrollHint"
import { cn } from "@/lib/utils"

interface BlueprintListProps {
  items: Blueprint[]
}

function isStockImage(src: string) {
  try {
    return new URL(src).hostname.includes("unsplash")
  } catch {
    return false
  }
}

function FacilityMedia({ src, alt }: { src: string; alt: string }) {
  if (src && !isStockImage(src)) {
    return (
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(min-width: 768px) 50vw, 100vw"
        className="object-cover group-hover:scale-105 transition-transform duration-500"
        loading="lazy"
      />
    )
  }
  return <ImagePlaceholder label="Foto belum tersedia" className="w-full h-full" />
}

interface RowProps {
  bp: Blueprint
  index: number
  animate: boolean
  onOpen: () => void
}

function FacilityRow({ bp, index, animate, onOpen }: RowProps) {
  const isEven = index % 2 === 0
  return (
    <div
      className={`${animate ? "card-enter " : ""}grid md:grid-cols-2 gap-6 sm:gap-8 items-center`}
    >
      <div className={cn("group", isEven ? "" : "md:order-2")}>
        <button
          type="button"
          onClick={onOpen}
          aria-haspopup="dialog"
          className="relative aspect-video w-full overflow-hidden rounded-2xl shadow-lg bg-muted cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600"
        >
          <FacilityMedia src={bp.image} alt={bp.title} />
          <span className="absolute top-4 left-4 inline-flex max-w-[calc(100%-2rem)] items-center gap-1.5 bg-emerald-900/85 text-white text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wider backdrop-blur-sm">
            <MapPin className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
            <span className="truncate">{bp.category}</span>
          </span>
          <span className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
            <span className="inline-flex items-center gap-1.5 text-white text-sm font-bold">
              <Maximize2 className="w-4 h-4" aria-hidden="true" />
              Lihat Detail
            </span>
          </span>
        </button>
      </div>

      <div className={cn("space-y-4", isEven ? "" : "md:order-1")}>
        <h2 className="text-xl sm:text-2xl font-bold text-foreground leading-snug">{bp.title}</h2>
        <p className="text-muted-foreground leading-relaxed">{bp.description}</p>
        {bp.details && <p className="text-muted-foreground text-sm leading-relaxed">{bp.details}</p>}
        <button
          type="button"
          onClick={onOpen}
          aria-haspopup="dialog"
          className="inline-flex items-center gap-2 min-h-11 py-2 text-sm font-bold text-emerald-700 hover:text-emerald-800 dark:text-emerald-300 dark:hover:text-emerald-200 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600"
        >
          Selengkapnya
          <ArrowRight className="w-4 h-4" aria-hidden="true" />
        </button>
      </div>
    </div>
  )
}

export default function BlueprintList({ items }: BlueprintListProps) {
  const reduceMotion = useReducedMotion()
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [selected, setSelected] = useState<Blueprint | null>(null)

  const categories = useMemo(() => ["Semua", ...Array.from(new Set(items.map((item) => item.category)))], [items])

  const counts = useMemo(() => {
    const map = new Map<string, number>()
    map.set("Semua", items.length)
    items.forEach((item) => map.set(item.category, (map.get(item.category) ?? 0) + 1))
    return map
  }, [items])

  const validCategories = useMemo(() => new Set(categories), [categories])

  const urlQuery = searchParams.get("q") ?? ""
  const urlCategory = searchParams.get("kategori") ?? "Semua"
  const activeCategory = validCategories.has(urlCategory) ? urlCategory : "Semua"

  const [query, setQuery] = useState(urlQuery)
  const [lastSynced, setLastSynced] = useState(urlQuery)
  if (lastSynced !== urlQuery) {
    setLastSynced(urlQuery)
    setQuery(urlQuery)
  }

  const normalizedQuery = query.trim().toLowerCase()

  const filteredItems = useMemo(
    () =>
      items.filter((item) => {
        const matchCategory = activeCategory === "Semua" || item.category === activeCategory
        const matchQuery =
          !normalizedQuery ||
          [item.title, item.description, item.details, item.category].join(" ").toLowerCase().includes(normalizedQuery)
        return matchCategory && matchQuery
      }),
    [items, activeCategory, normalizedQuery]
  )

  const hasFilter = query.trim() !== "" || activeCategory !== "Semua"

  const updateUrl = useCallback(
    (nextQuery: string, nextCategory: string) => {
      const params = new URLSearchParams(searchParams.toString())
      if (nextQuery.trim()) params.set("q", nextQuery.trim())
      else params.delete("q")
      if (nextCategory !== "Semua") params.set("kategori", nextCategory)
      else params.delete("kategori")
      const qs = params.toString()
      router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false })
    },
    [pathname, router, searchParams]
  )

  const activeCategoryRef = useRef(activeCategory)
  useEffect(() => {
    activeCategoryRef.current = activeCategory
  }, [activeCategory])

  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const handleQueryChange = (value: string) => {
    setQuery(value)
    if (debounceRef.current) clearTimeout(debounceRef.current)
    debounceRef.current = setTimeout(() => updateUrl(value, activeCategoryRef.current), 300)
  }

  const resetFilters = () => {
    setQuery("")
    updateUrl("", "Semua")
  }

  return (
    <div className="space-y-8">
      <div className="sticky top-(--header-h) z-20 mx-[calc(-1*var(--page-gutter))] px-(--page-gutter) sm:mx-0 sm:px-0 py-3 bg-background/95 backdrop-blur-sm space-y-3">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" aria-hidden="true" />
          <input
            type="search"
            value={query}
            onChange={(e) => handleQueryChange(e.target.value)}
            placeholder="Cari fasilitas, gedung, atau laboratorium..."
            aria-label="Cari fasilitas"
            className="w-full pl-11 pr-10 py-3 rounded-xl border border-border bg-background focus:bg-background focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-sm transition-all outline-none placeholder:text-muted-foreground"
          />
          {query !== "" && (
            <button
              type="button"
              onClick={() => setQuery("")}
              aria-label="Bersihkan pencarian"
              className="absolute right-2 top-1/2 -translate-y-1/2 flex h-11 w-11 items-center justify-center rounded-full text-muted-foreground hover:text-foreground hover:bg-muted transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        <HorizontalScrollHint rowClassName="flex items-center gap-2 overflow-x-auto overscroll-x-contain scrollbar-none mx-[calc(-1*var(--page-gutter))] px-(--page-gutter) sm:mx-0 sm:px-0">
          {categories.map((category) => {
            const isActive = activeCategory === category
            return (
              <button
                key={category}
                type="button"
                onClick={() => updateUrl(query, category)}
                aria-pressed={isActive}
                className={cn(
                  "shrink-0 inline-flex min-h-11 items-center gap-1.5 px-4 py-2 rounded-full text-sm font-bold border transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600",
                  isActive
                    ? "bg-emerald-700 text-white border-emerald-700 shadow-sm"
                    : "bg-background text-muted-foreground border-border hover:border-emerald-300 hover:text-emerald-700 dark:hover:text-emerald-300"
                )}
              >
                {category}
                <span
                  className={cn(
                    "text-xs font-bold rounded-full px-1.5 py-0.5",
                    isActive ? "bg-white text-emerald-800" : "bg-muted text-muted-foreground"
                  )}
                >
                  {counts.get(category) ?? 0}
                </span>
              </button>
            )
          })}
        </HorizontalScrollHint>
      </div>

      <div className="flex items-center justify-between flex-wrap gap-2">
        <p aria-live="polite" className="text-sm text-muted-foreground">
          Menampilkan <span className="font-bold text-foreground">{filteredItems.length}</span> dari{" "}
          <span className="font-bold text-foreground">{items.length}</span> fasilitas
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

      {filteredItems.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-border bg-card px-6 py-14 text-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-muted text-muted-foreground mx-auto">
            <Building2 className="h-7 w-7" />
          </div>
          <h3 className="text-base font-bold text-foreground mt-4">Fasilitas tidak ditemukan</h3>
          <p className="max-w-sm mx-auto text-sm text-muted-foreground mt-1.5">
            Tidak ada fasilitas yang cocok{query.trim() !== "" && (
              <>
                {" "}
                untuk pencarian <span className="font-bold text-emerald-700 dark:text-emerald-300">&quot;{query.trim()}&quot;</span>
              </>
            )}
            {activeCategory !== "Semua" && (
              <>
                {" "}
                pada kategori <span className="font-bold text-emerald-700 dark:text-emerald-300">{activeCategory}</span>
              </>
            )}
            .
          </p>
          <button
            type="button"
            onClick={resetFilters}
            className="inline-flex items-center gap-2 mt-5 bg-emerald-700 hover:bg-emerald-800 text-white text-sm font-bold px-5 py-2.5 min-h-11 rounded-xl transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600"
          >
            <RotateCcw className="w-4 h-4" aria-hidden="true" />
            Tampilkan Semua Fasilitas
          </button>
        </div>
      ) : (
        <div className="space-y-12 sm:space-y-16">
          {filteredItems.map((bp, index) => (
            <FacilityRow key={bp.id} bp={bp} index={index} animate={!reduceMotion} onOpen={() => setSelected(bp)} />
          ))}
        </div>
      )}

      <DialogPrimitive.Root open={selected !== null} onOpenChange={(open) => !open && setSelected(null)}>
        <DialogPrimitive.Portal>
          <DialogPrimitive.Overlay className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm data-open:animate-in data-open:fade-in-0 data-closed:animate-out data-closed:fade-out-0" />
          <DialogPrimitive.Content className="fixed top-1/2 left-1/2 z-50 w-[calc(100%-2rem)] max-w-2xl max-h-[85dvh] -translate-x-1/2 -translate-y-1/2 overflow-y-auto rounded-2xl bg-card shadow-2xl border border-border outline-none data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95">
            {selected && (
              <>
                <div className="relative aspect-video w-full overflow-hidden bg-muted">
                  <FacilityMedia src={selected.image} alt={selected.title} />
                  <span className="absolute top-4 left-4 inline-flex max-w-[calc(100%-2rem)] items-center gap-1.5 bg-emerald-900/85 text-white text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wider backdrop-blur-sm">
                    <MapPin className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                    <span className="truncate">{selected.category}</span>
                  </span>
                  <button
                    type="button"
                    onClick={() => setSelected(null)}
                    aria-label="Tutup detail"
                    className="absolute top-4 right-4 flex items-center justify-center w-11 h-11 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
                <div className="p-6 sm:p-8">
                  <DialogPrimitive.Title className="text-xl sm:text-2xl font-extrabold text-foreground pr-8">
                    {selected.title}
                  </DialogPrimitive.Title>
                  <DialogPrimitive.Description className="mt-3 text-muted-foreground leading-relaxed">
                    {selected.description}
                  </DialogPrimitive.Description>
                  {selected.details && (
                    <p className="mt-4 text-sm text-muted-foreground leading-relaxed border-t border-border pt-4">
                      {selected.details}
                    </p>
                  )}
                </div>
              </>
            )}
          </DialogPrimitive.Content>
        </DialogPrimitive.Portal>
      </DialogPrimitive.Root>
    </div>
  )
}