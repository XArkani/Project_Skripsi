"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import type { Blueprint } from "@/lib/types"
import ImagePlaceholder from "@/components/shared/ImagePlaceholder"

interface BlueprintListProps {
  items: Blueprint[]
}

export default function BlueprintList({ items }: BlueprintListProps) {
  return (
    <div className="space-y-16">
      {items.map((bp, idx) => (
        <motion.div
          key={bp.id}
          className="grid md:grid-cols-12 gap-8 items-center"
          initial={{ opacity: 0, y: 60, x: idx % 2 === 1 ? 40 : -40 }}
          whileInView={{ opacity: 1, y: 0, x: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <div className={`md:col-span-6 ${idx % 2 === 1 ? "md:order-2" : ""}`}>
            <div className="relative rounded-2xl overflow-hidden shadow-lg aspect-video">
              {bp.image ? (
                <img src={bp.image} alt={bp.title} className="w-full h-full object-cover" />
              ) : (
                <ImagePlaceholder label="Gambar Fasilitas" className="w-full h-full" />
              )}
              <span className="absolute bottom-4 right-4 bg-emerald-900/90 text-white text-xs font-bold px-3 py-1.5 rounded-md uppercase tracking-wider backdrop-blur-sm">{bp.category}</span>
            </div>
          </div>

          <div className="md:col-span-6 space-y-4">
            <h2 className="text-2xl font-bold text-slate-900">{bp.title}</h2>
            <p className="text-slate-600 font-medium leading-relaxed">{bp.description}</p>
            <p className="text-slate-500 text-sm leading-relaxed">{bp.details}</p>
            <div className="pt-2">
              <Link
                href="/hubungi"
                className="inline-block bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-xs font-bold px-4 py-2.5 rounded-lg border border-emerald-200 transition-colors"
              >
                Ajukan Kunjungan Kampus
              </Link>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  )
}
