"use client"

import { useMemo, useState } from "react"
import Image from "next/image"
import { useReducedMotion } from "@/lib/use-reduced-motion"
import { Search, X, Briefcase, GraduationCap, RotateCcw, UsersRound, ExternalLink } from "lucide-react"
import type { Dosen } from "@/lib/types"
import { PRODI_LIST } from "@/lib/prodi"
import ImagePlaceholder from "@/components/shared/ImagePlaceholder"
import HorizontalScrollHint from "@/components/shared/ScrollHint"
import { cn } from "@/lib/utils"

interface DosenGridProps {
  items: Dosen[]
}

const CARD_CLASSES =
  "group bg-card rounded-2xl p-5 border border-border shadow-sm hover:border-emerald-200 hover:shadow-lg transition-all flex flex-col justify-between gap-4"

function isStockImage(src: string) {
  try {
    return new URL(src).hostname.includes("unsplash")
  } catch {
    return false
  }
}

function DosenAvatar({ dosen }: { dosen: Dosen }) {
  if (dosen.image && !isStockImage(dosen.image)) {
    return (
      <Image src={dosen.image} alt={`Foto ${dosen.name}`} fill sizes="96px" className="object-cover" loading="lazy" />
    )
  }
  return <ImagePlaceholder label="Foto belum tersedia" className="w-full h-full" />
}

function DosenCard({ dosen, animate }: { dosen: Dosen; animate: boolean }) {
  const doi = dosen.doi?.trim()
  const hasDoi = !!doi && /^https?:\/\//i.test(doi)

  return (
    <div className={`${CARD_CLASSES}${animate ? " card-enter" : ""}`}>
      <div className="flex gap-4">
        <div className="relative w-20 h-20 sm:w-24 sm:h-24 shrink-0 rounded-2xl overflow-hidden border border-border bg-muted shadow-sm">
          <DosenAvatar dosen={dosen} />
        </div>

        <div className="min-w-0 flex-1">
          <h3 className="font-bold text-base text-foreground leading-snug line-clamp-2">{dosen.name}</h3>
          <span className="inline-flex items-center gap-1.5 mt-2 text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-100 px-2.5 py-1 rounded-full dark:text-emerald-300 dark:bg-emerald-950/60 dark:border-emerald-900">
            <GraduationCap className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
            {dosen.prodi}
          </span>
          {dosen.position && (
            <p className="mt-2.5 text-sm font-semibold text-muted-foreground flex items-start gap-1.5">
              <Briefcase className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" aria-hidden="true" />
              <span className="min-w-0 line-clamp-2">{dosen.position}</span>
            </p>
          )}
          {dosen.nuptk && (
            <p className="mt-2 text-xs text-muted-foreground">
              NUPTK: <span className="font-semibold text-foreground/85">{dosen.nuptk}</span>
            </p>
          )}
        </div>
      </div>

      {hasDoi ? (
        <a
          href={doi.startsWith("http") ? doi : `https://${doi}`}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full min-h-11 flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-emerald-700 hover:bg-emerald-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600 text-white text-sm font-bold transition-colors cursor-pointer"
        >
          <ExternalLink className="w-4 h-4 shrink-0" aria-hidden="true" />
          <span className="truncate">Lihat DOI / Publikasi</span>
        </a>
      ) : (
        <p className="w-full min-h-11 flex items-center justify-center rounded-xl border border-border text-sm text-muted-foreground">
          DOI belum tersedia
        </p>
      )}
    </div>
  )
}

export default function DosenGrid({ items }: DosenGridProps) {
  const reduceMotion = useReducedMotion()
  const [query, setQuery] = useState("")
  const [activeProdi, setActiveProdi] = useState("Semua")

  const normalizedQuery = query.trim().toLowerCase()

  const prodiCounts = useMemo(() => {
    const counts = new Map<string, number>()
    for (const item of items) counts.set(item.prodi, (counts.get(item.prodi) ?? 0) + 1)
    return counts
  }, [items])

  const filteredItems = useMemo(
    () =>
      items.filter((d) => {
        const matchesQuery =
          normalizedQuery === "" ||
          [d.name, d.prodi, d.position, d.doi, d.nuptk].join(" ").toLowerCase().includes(normalizedQuery)
        const matchesProdi = activeProdi === "Semua" || d.prodi === activeProdi
        return matchesQuery && matchesProdi
      }),
    [items, normalizedQuery, activeProdi]
  )

  const hasActiveState = query.trim() !== "" || activeProdi !== "Semua"

  const filterChips = [{ label: "Semua", count: items.length }, ...PRODI_LIST.map((p) => ({ label: p, count: prodiCounts.get(p) ?? 0 }))]

  const grid = (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
      {filteredItems.map((dosen) => (
        <DosenCard key={dosen.id} dosen={dosen} animate={!reduceMotion} />
      ))}
    </div>
  )

  return (
    <div className="space-y-6">
      <div className="sticky top-(--header-h) z-20 mx-[calc(-1*var(--page-gutter))] px-(--page-gutter) sm:mx-0 sm:px-0 py-3 bg-background/95 backdrop-blur-sm">
        <div className="flex flex-col gap-3">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" aria-hidden="true" />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Cari dosen, prodi, atau posisi..."
              aria-label="Cari dosen"
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
            {filterChips.map((chip) => {
              const isActive = activeProdi === chip.label
              return (
                <button
                  key={chip.label}
                  type="button"
                  onClick={() => setActiveProdi(chip.label)}
                  aria-pressed={isActive}
                  className={cn(
                    "shrink-0 inline-flex min-h-11 items-center gap-1.5 px-4 py-2 rounded-full text-sm font-bold border transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600",
                    isActive
                      ? "bg-emerald-700 text-white border-emerald-700 shadow-sm"
                      : "bg-background text-muted-foreground border-border hover:border-emerald-300 hover:text-emerald-700 dark:hover:text-emerald-300"
                  )}
                >
                  {chip.label}
                  <span
                    className={cn(
                      "text-xs font-bold rounded-full px-1.5 py-0.5",
                      isActive ? "bg-white text-emerald-800" : "bg-muted text-muted-foreground"
                    )}
                  >
                    {chip.count}
                  </span>
                </button>
              )
            })}
          </HorizontalScrollHint>
        </div>
      </div>

      <div className="flex items-center justify-between flex-wrap gap-2">
        <p className="text-sm text-muted-foreground">
          Menampilkan <span className="font-bold text-foreground">{filteredItems.length}</span> dari{" "}
          <span className="font-bold text-foreground">{items.length}</span> dosen
        </p>
        {hasActiveState && (
          <button
            type="button"
            onClick={() => {
              setQuery("")
              setActiveProdi("Semua")
            }}
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
            <UsersRound className="h-7 w-7" />
          </div>
          <h3 className="text-base font-bold text-foreground mt-4">Dosen tidak ditemukan</h3>
          <p className="max-w-sm mx-auto text-sm text-muted-foreground mt-1.5">
            Tidak ada dosen yang cocok{query.trim() !== "" && (
              <>
                {" "}untuk pencarian <span className="font-bold text-emerald-700 dark:text-emerald-300">&quot;{query.trim()}&quot;</span>
              </>
            )}
            {activeProdi !== "Semua" && (
              <>
                {" "}pada prodi <span className="font-bold text-emerald-700 dark:text-emerald-300">{activeProdi}</span>
              </>
            )}
            .
          </p>
          <button
            type="button"
            onClick={() => {
              setQuery("")
              setActiveProdi("Semua")
            }}
            className="inline-flex items-center gap-2 mt-5 bg-emerald-700 hover:bg-emerald-800 text-white text-sm font-bold px-5 py-2.5 min-h-11 rounded-xl transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600"
          >
            <RotateCcw className="w-4 h-4" aria-hidden="true" />
            Tampilkan Semua Dosen
          </button>
        </div>
      ) : (
        grid
      )}
    </div>
  )
}