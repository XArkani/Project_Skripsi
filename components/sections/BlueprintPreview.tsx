"use client"

import { ArrowRight } from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"
import type { Blueprint } from "@/lib/types"
import ImagePlaceholder from "@/components/shared/ImagePlaceholder"

interface BlueprintPreviewProps {
  items: Blueprint[]
}

export default function BlueprintPreview({ items }: BlueprintPreviewProps) {
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
              Blueprint & Fasilitas Unggulan
            </h2>
            <p className="text-slate-500 text-sm sm:text-base mt-2">
              Gambaran komitmen kami untuk memberikan fasilitas belajar mengajar dengan standar
              industri.
            </p>
          </div>
          <Link
            href="/blueprint"
            className="mt-4 md:mt-0 text-emerald-700 hover:text-emerald-800 font-bold text-sm inline-flex items-center space-x-1"
          >
            <span>Lihat Selengkapnya</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {items.slice(0, 3).map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-sm flex flex-col justify-between"
            >
              <div>
                <div className="relative h-48 overflow-hidden">
                  {item.image ? (
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <ImagePlaceholder label="Gambar Fasilitas" className="w-full h-full" />
                  )}
                  <span className="absolute top-4 left-4 bg-emerald-600 text-white text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-widest">
                    {item.category}
                  </span>
                </div>
                <div className="p-6">
                  <h3 className="font-bold text-lg text-slate-900 mb-2">{item.title}</h3>
                  <p className="text-slate-500 text-sm line-clamp-3">{item.description}</p>
                </div>
              </div>
              <div className="px-6 pb-6 pt-2">
                <Link
                  href="/blueprint"
                  className="block w-full text-center py-2.5 rounded-lg border border-slate-200 hover:bg-emerald-50 hover:text-emerald-800 hover:border-emerald-200 text-slate-700 text-xs font-bold transition-colors"
                >
                  Lihat Detail Fasilitas
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.section>
  )
}
