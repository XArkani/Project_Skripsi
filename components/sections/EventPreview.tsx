"use client"

import { ArrowRight, Calendar, MapPin } from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"
import type { Event } from "@/lib/types"
import ImagePlaceholder from "@/components/shared/ImagePlaceholder"

interface EventPreviewProps {
  items: Event[]
}

export default function EventPreview({ items }: EventPreviewProps) {

  return (
    <motion.section
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="py-12 sm:py-16 bg-slate-50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 mb-1">Agenda & Event</h2>
        <p className="text-slate-500 text-sm mb-6">Kolaborasi ilmiah, webinar, kompetisi, dan program kemitraan.</p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {items.slice(0, 3).map((evt) => {
            const statusColor =
              evt.status === "Akan Datang" ? "bg-blue-600"
              : evt.status === "Sedang Berlangsung" ? "bg-amber-500"
              : "bg-slate-500"

            return (
              <Link
                key={evt.id}
                href={`/event/${evt.slug}`}
                className="group bg-white rounded-xl overflow-hidden border border-slate-200 hover:shadow-md hover:border-emerald-200 transition-all"
              >
                <div className="relative h-44 overflow-hidden bg-slate-100">
                  <ImagePlaceholder label={evt.title} className="w-full h-full" />
                  <span className={`absolute top-3 left-3 text-white text-xs font-bold px-2.5 py-1 rounded-full ${statusColor}`}>
                    {evt.status}
                  </span>
                </div>
                <div className="p-4">
                  <div className="flex items-center gap-1.5 text-slate-400 text-xs mb-1.5">
                    <Calendar className="w-3 h-3 shrink-0" />
                    <span>{evt.date}</span>
                    <span className="text-slate-300">·</span>
                    <MapPin className="w-3 h-3 shrink-0" />
                    <span className="truncate">{evt.location}</span>
                  </div>
                  <h3 className="font-bold text-slate-900 group-hover:text-emerald-700 transition-colors line-clamp-2">{evt.title}</h3>
                  <p className="text-slate-500 text-sm mt-1 line-clamp-2">{evt.description}</p>
                </div>
              </Link>
            )
          })}
        </div>

        <div className="mt-6 flex justify-end">
          <Link href="/event" className="inline-flex items-center gap-1.5 text-emerald-600 hover:text-emerald-700 font-medium text-sm transition-colors">
            <span>Lihat Semua Agenda</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </motion.section>
  )
}
