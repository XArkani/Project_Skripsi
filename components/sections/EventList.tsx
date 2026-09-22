"use client"

import { useMemo, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { useReducedMotion } from "@/lib/use-reduced-motion"
import { Search, X, RotateCcw, ArrowRight, Clock, MapPin, CalendarDays } from "lucide-react"
import type { Event } from "@/lib/types"
import { EVENT_STATUSES, statusConfig } from "@/lib/status"
import ImagePlaceholder from "@/components/shared/ImagePlaceholder"
import HorizontalScrollHint from "@/components/shared/ScrollHint"
import { cn } from "@/lib/utils"

interface EventListProps {
  events: Event[]
}

const MONTHS_ID = [
  "Januari", "Februari", "Maret", "April", "Mei", "Juni",
  "Juli", "Agustus", "September", "Oktober", "November", "Desember",
]

function dateParts(evt: Event) {
  const d = evt.dateTime ? new Date(evt.dateTime) : null
  if (d && !Number.isNaN(d.getTime()) && d.getUTCFullYear() > 2000) {
    return { day: d.getUTCDate(), month: MONTHS_ID[d.getUTCMonth()].slice(0, 3) }
  }
  const parts = evt.date.split(" ")
  const day = Number(parts[0]) || 0
  const rawMonth = parts[1] ?? ""
  const idx = MONTHS_ID.findIndex((m) => m.toLowerCase().startsWith(rawMonth.toLowerCase().slice(0, 3)))
  return { day, month: MONTHS_ID[idx >= 0 ? idx : 0].slice(0, 3) }
}

function isStockImage(src: string) {
  try {
    return new URL(src).hostname.includes("unsplash")
  } catch {
    return false
  }
}

function EventMedia({ src, alt }: { src: string; alt: string }) {
  if (src && !isStockImage(src)) {
    return (
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(min-width: 1280px) 33vw, (min-width: 640px) 50vw, 100vw"
        className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
        loading="lazy"
      />
    )
  }
  return <ImagePlaceholder label="Poster belum tersedia" className="w-full h-full" />
}

interface CardProps {
  evt: Event
  animate: boolean
}

function EventCard({ evt, animate }: CardProps) {
  const { day, month } = dateParts(evt)
  const badge = statusConfig[evt.status]

  return (
    <div
      className={`${animate ? "card-enter " : ""}group bg-card overflow-hidden border border-border shadow-sm hover:shadow-lg hover:border-emerald-200 transition-all flex flex-col rounded-2xl`}
    >
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-muted sm:aspect-auto sm:h-48">
        <EventMedia src={evt.image} alt={evt.title} />
        <span
          className={cn(
            "absolute top-3 left-3 max-w-[calc(100%-1.5rem)] truncate text-white text-xs font-bold px-2.5 py-1 rounded-full uppercase tracking-wider shadow-sm",
            badge.badge
          )}
        >
          {evt.status}
        </span>
        <span className="absolute bottom-3 left-3 flex items-center gap-2 rounded-lg bg-background/95 backdrop-blur px-2.5 py-1.5 text-emerald-700 border border-emerald-100 shadow-sm dark:text-emerald-300 dark:border-emerald-900">
          <span className="text-lg font-extrabold leading-none">{day || "?"}</span>
          <span className="text-xs font-bold uppercase leading-tight">{month}</span>
        </span>
      </div>

      <div className="flex flex-1 flex-col gap-3 p-5">
        <h3 className="font-bold text-foreground leading-snug group-hover:text-emerald-700 dark:group-hover:text-emerald-300 transition-colors line-clamp-2">
          {evt.title}
        </h3>

        <div className="text-sm text-muted-foreground space-y-2">
          <p className="flex items-center gap-2">
            <Clock className="w-4 h-4 shrink-0 text-emerald-600" aria-hidden="true" />
            <span className="truncate">{evt.time || "Waktu menyusul"}</span>
          </p>
          <p className="flex items-center gap-2">
            <MapPin className="w-4 h-4 shrink-0 text-emerald-600" aria-hidden="true" />
            <span className="truncate">{evt.location}</span>
          </p>
        </div>

        <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">{evt.description}</p>

        <div className="mt-auto pt-3">
          <Link
            href={`/event/${evt.slug}`}
            className="w-full min-h-11 flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-emerald-700 hover:bg-emerald-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600 text-white text-sm font-bold transition-colors"
          >
            Lihat Detail
            <ArrowRight className="w-4 h-4 shrink-0" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </div>
  )
}

export default function EventList({ events }: EventListProps) {
  const reduceMotion = useReducedMotion()
  const [query, setQuery] = useState("")
  const [activeStatus, setActiveStatus] = useState("Semua")

  const counts = useMemo(() => {
    const map = new Map<string, number>()
    map.set("Semua", events.length)
    for (const s of EVENT_STATUSES) map.set(s, events.filter((e) => e.status === s).length)
    return map
  }, [events])

  const normalizedQuery = query.trim().toLowerCase()

  const matches = (e: Event) =>
    (normalizedQuery === "" ||
      [e.title, e.description, e.location, e.date, e.status].join(" ").toLowerCase().includes(normalizedQuery)) &&
    (activeStatus === "Semua" || e.status === activeStatus)

  const filteredEvents = events
    .filter(matches)
    .sort((a, b) => (b.dateTime ?? "").localeCompare(a.dateTime ?? ""))

  const hasFilter = query.trim() !== "" || activeStatus !== "Semua"

  const resetFilters = () => {
    setQuery("")
    setActiveStatus("Semua")
  }

  return (
    <div className="space-y-6">
      <div className="sticky top-(--header-h) z-20 mx-[calc(-1*var(--page-gutter))] px-(--page-gutter) sm:mx-0 sm:px-0 py-3 bg-background/95 backdrop-blur-sm space-y-3">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" aria-hidden="true" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Cari acara, lokasi, atau kata kunci..."
            aria-label="Cari acara"
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

        <HorizontalScrollHint rowClassName="flex items-center gap-2 overflow-x-auto overscroll-x-contain scrollbar-none mx-[calc(-1*var(--page-gutter))] px-(--page-gutter) sm:mx-0 sm:px-0">
          {["Semua", ...EVENT_STATUSES].map((status) => {
            const isActive = activeStatus === status
            return (
              <button
                key={status}
                type="button"
                onClick={() => setActiveStatus(status)}
                aria-pressed={isActive}
                className={cn(
                  "shrink-0 inline-flex min-h-11 items-center gap-1.5 px-4 py-2 rounded-full text-sm font-bold border transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600",
                  isActive
                    ? "bg-emerald-700 text-white border-emerald-700 shadow-sm"
                    : "bg-background text-muted-foreground border-border hover:border-emerald-300 hover:text-emerald-700 dark:hover:text-emerald-300"
                )}
              >
                {status === "Semua" ? "Semua" : <span className="inline-flex items-center gap-1.5"><span className={cn("w-2 h-2 rounded-full", statusConfig[status as keyof typeof statusConfig].dot)} />{status}</span>}
                <span
                  className={cn(
                    "text-xs font-bold rounded-full px-1.5 py-0.5",
                    isActive ? "bg-white text-emerald-800" : "bg-muted text-muted-foreground"
                  )}
                >
                  {counts.get(status) ?? 0}
                </span>
              </button>
            )
          })}
        </HorizontalScrollHint>
      </div>

      <div className="flex items-center justify-between flex-wrap gap-2">
        <p aria-live="polite" className="text-sm text-muted-foreground">
          Menampilkan <span className="font-bold text-foreground">{filteredEvents.length}</span> dari{" "}
          <span className="font-bold text-foreground">{events.length}</span> acara
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

      {filteredEvents.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-border bg-card px-6 py-14 text-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-muted text-muted-foreground mx-auto">
            <CalendarDays className="h-7 w-7" />
          </div>
          <h3 className="text-base font-bold text-foreground mt-4">Acara tidak ditemukan</h3>
          <p className="max-w-sm mx-auto text-sm text-muted-foreground mt-1.5">
            Tidak ada acara yang cocok{query.trim() !== "" && (
              <>
                {" "}
                untuk pencarian <span className="font-bold text-emerald-700 dark:text-emerald-300">&quot;{query.trim()}&quot;</span>
              </>
            )}
            {activeStatus !== "Semua" && (
              <>
                {" "}
                dengan status <span className="font-bold text-emerald-700 dark:text-emerald-300">{activeStatus}</span>
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
            Tampilkan Semua Acara
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
          {filteredEvents.map((evt) => (
            <EventCard key={evt.id} evt={evt} animate={!reduceMotion} />
          ))}
        </div>
      )}
    </div>
  )
}