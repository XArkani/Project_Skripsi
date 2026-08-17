"use client"

import { useMemo, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, useReducedMotion } from "framer-motion"
import { Search, X, RotateCcw, ArrowRight, Clock, MapPin, CalendarDays } from "lucide-react"
import type { Event } from "@/lib/types"
import { EVENT_STATUSES, statusConfig } from "@/lib/status"
import ImagePlaceholder from "@/components/shared/ImagePlaceholder"
import { cn } from "@/lib/utils"

interface EventListProps {
  events: Event[]
}

const EASE = [0.22, 1, 0.36, 1] as const

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: EASE } },
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
        className="object-cover group-hover:scale-105 transition-transform duration-500"
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
    <motion.div
      variants={animate ? cardVariants : undefined}
      initial={animate ? "hidden" : false}
      whileInView={animate ? "visible" : undefined}
      viewport={animate ? { once: true, margin: "-40px", amount: 0.1 } : undefined}
      className="group bg-white overflow-hidden border border-slate-200 shadow-sm hover:shadow-lg hover:border-emerald-200 transition-all flex flex-col rounded-2xl"
    >
      <div className="relative h-44 sm:h-48 w-full overflow-hidden bg-slate-100">
        <EventMedia src={evt.image} alt={evt.title} />
        <span
          className={cn(
            "absolute top-3 left-3 text-white text-xs font-bold px-2.5 py-1 rounded-full uppercase tracking-wider shadow-sm",
            badge.badge
          )}
        >
          {evt.status}
        </span>
        <span className="absolute bottom-3 left-3 flex items-center gap-2 rounded-lg bg-white/95 backdrop-blur px-2.5 py-1.5 text-emerald-700 border border-emerald-100 shadow-sm">
          <span className="text-lg font-extrabold leading-none">{day || "?"}</span>
          <span className="text-[11px] font-bold uppercase leading-tight">{month}</span>
        </span>
      </div>

      <div className="flex flex-1 flex-col gap-3 p-5">
        <h3 className="font-bold text-slate-900 leading-snug group-hover:text-emerald-700 transition-colors line-clamp-2">
          {evt.title}
        </h3>

        <div className="text-sm text-slate-600 space-y-2">
          <p className="flex items-center gap-2">
            <Clock className="w-4 h-4 shrink-0 text-emerald-600" aria-hidden="true" />
            <span className="truncate">{evt.time || "Waktu menyusul"}</span>
          </p>
          <p className="flex items-center gap-2">
            <MapPin className="w-4 h-4 shrink-0 text-emerald-600" aria-hidden="true" />
            <span className="truncate">{evt.location}</span>
          </p>
        </div>

        <p className="text-sm text-slate-600 leading-relaxed line-clamp-2">{evt.description}</p>

        <div className="mt-auto pt-3">
          <Link
            href={`/event/${evt.slug}`}
            className="w-full min-h-11 flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600 text-white text-sm font-bold transition-colors"
          >
            Lihat Detail
            <ArrowRight className="w-4 h-4 shrink-0" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </motion.div>
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
    .sort((a, b) => (a.dateTime ?? "").localeCompare(b.dateTime ?? ""))

  const hasFilter = query.trim() !== "" || activeStatus !== "Semua"

  const resetFilters = () => {
    setQuery("")
    setActiveStatus("Semua")
  }

  return (
    <div className="space-y-6">
      <div className="sticky top-16 z-20 -mx-4 px-4 sm:mx-0 sm:px-0 py-3 bg-slate-50/95 backdrop-blur-sm space-y-3">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" aria-hidden="true" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Cari acara, lokasi, atau kata kunci..."
            aria-label="Cari acara"
            className="w-full pl-11 pr-10 py-3 rounded-xl border border-slate-200 bg-white focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-sm transition-all outline-none placeholder:text-slate-400"
          />
          {query !== "" && (
            <button
              type="button"
              onClick={() => setQuery("")}
              aria-label="Bersihkan pencarian"
              className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center justify-center w-11 h-11 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        <div className="flex items-center gap-2 overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {["Semua", ...EVENT_STATUSES].map((status) => {
            const isActive = activeStatus === status
            return (
              <button
                key={status}
                type="button"
                onClick={() => setActiveStatus(status)}
                aria-pressed={isActive}
                className={cn(
                  "shrink-0 inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-bold border transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600",
                  isActive
                    ? "bg-emerald-600 text-white border-emerald-600 shadow-sm"
                    : "bg-white text-slate-600 border-slate-200 hover:border-emerald-300 hover:text-emerald-700"
                )}
              >
                {status === "Semua" ? "Semua" : <span className="inline-flex items-center gap-1.5"><span className={cn("w-2 h-2 rounded-full", statusConfig[status as keyof typeof statusConfig].dot)} />{status}</span>}
                <span
                  className={cn(
                    "text-xs font-bold rounded-full px-1.5 py-0.5",
                    isActive ? "bg-white/20 text-white" : "bg-slate-100 text-slate-500"
                  )}
                >
                  {counts.get(status) ?? 0}
                </span>
              </button>
            )
          })}
        </div>
      </div>

      <div className="flex items-center justify-between flex-wrap gap-2">
        <p aria-live="polite" className="text-sm text-slate-500">
          Menampilkan <span className="font-bold text-slate-800">{filteredEvents.length}</span> dari{" "}
          <span className="font-bold text-slate-800">{events.length}</span> acara
        </p>
        {hasFilter && (
          <button
            type="button"
            onClick={resetFilters}
            className="inline-flex items-center gap-1.5 text-sm font-bold text-emerald-700 hover:text-emerald-800 hover:bg-emerald-50 px-3 py-2 rounded-lg transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600"
          >
            <RotateCcw className="w-4 h-4" aria-hidden="true" />
            Reset
          </button>
        )}
      </div>

      {filteredEvents.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-14 text-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-slate-100 text-slate-400 mx-auto">
            <CalendarDays className="h-7 w-7" />
          </div>
          <h3 className="text-base font-bold text-slate-700 mt-4">Acara tidak ditemukan</h3>
          <p className="max-w-sm mx-auto text-sm text-slate-500 mt-1.5">
            Tidak ada acara yang cocok{query.trim() !== "" && (
              <>
                {" "}
                untuk pencarian <span className="font-bold text-emerald-700">&quot;{query.trim()}&quot;</span>
              </>
            )}
            {activeStatus !== "Semua" && (
              <>
                {" "}
                dengan status <span className="font-bold text-emerald-700">{activeStatus}</span>
              </>
            )}
            .
          </p>
          <button
            type="button"
            onClick={resetFilters}
            className="inline-flex items-center gap-2 mt-5 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-bold px-5 py-2.5 min-h-11 rounded-xl transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600"
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