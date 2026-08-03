"use client"

import { ArrowRight, Calendar, MapPin } from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"
import type { Event } from "@/lib/types"

interface EventPreviewProps {
  items: Event[]
}

export default function EventPreview({ items }: EventPreviewProps) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="py-16 bg-slate-50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10">
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              Agenda & Kegiatan Mendatang
            </h2>
            <p className="text-slate-500 text-sm sm:text-base mt-2">
              Jangan lewatkan kolaborasi ilmiah, webinar, kompetisi, dan program kemitraan menarik.
            </p>
          </div>
          <Link
            href="/event"
            className="mt-4 md:mt-0 text-emerald-700 hover:text-emerald-800 font-bold text-sm inline-flex items-center space-x-1"
          >
            <span>Lihat Semua Agenda</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {items.slice(0, 3).map((evt) => {
            const statusColor =
              evt.status === "Akan Datang"
                ? "bg-blue-600"
                : evt.status === "Sedang Berlangsung"
                  ? "bg-amber-500"
                  : "bg-slate-500"

            return (
              <div
                key={evt.id}
                className="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-sm flex flex-col justify-between"
              >
                <div>
                  <div className="relative h-44 overflow-hidden">
                    <img
                      src={evt.image}
                      alt={evt.title}
                      className="w-full h-full object-cover"
                    />
                    <span
                      className={`absolute top-4 left-4 text-white text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-widest ${statusColor}`}
                    >
                      {evt.status}
                    </span>
                  </div>
                  <div className="p-5">
                    <div className="flex items-center space-x-2 text-slate-400 text-xs mb-2">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>{evt.date}</span>
                      <span>•</span>
                      <MapPin className="w-3.5 h-3.5" />
                      <span>{evt.location}</span>
                    </div>
                    <h3 className="font-bold text-base text-slate-900 line-clamp-2 hover:text-emerald-800 transition-colors">
                      <Link href={`/event/${evt.slug}`}>{evt.title}</Link>
                    </h3>
                    <p className="text-slate-500 text-xs sm:text-sm mt-2 line-clamp-2">
                      {evt.description}
                    </p>
                  </div>
                </div>
                <div className="px-5 pb-5">
                  <Link
                    href={`/event/${evt.slug}`}
                    className="block w-full text-center py-2 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-xs font-bold transition-colors"
                  >
                    Selengkapnya & Registrasi
                  </Link>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </motion.section>
  )
}
