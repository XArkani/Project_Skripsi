"use client"

import { ArrowRight } from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"
import type { Dosen } from "@/lib/types"
import ImagePlaceholder from "@/components/shared/ImagePlaceholder"
import Reveal, { Stagger, fadeUpItem } from "@/components/shared/Reveal"

interface DosenHighlightProps {
  items: Dosen[]
}

export default function DosenHighlight({ items }: DosenHighlightProps) {
  const visibleItems = items.slice(0, 8)

  return (
    <section className="py-12 sm:py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal className="flex flex-wrap items-end justify-between gap-4 mb-6">
          <div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 mb-1">Tenaga Pendidik</h2>
            <p className="text-slate-500 text-sm">Dosen ahli dengan riset nasional dan komitmen pengajaran tinggi.</p>
          </div>
          <Link href="/dosen" className="inline-flex items-center gap-1.5 text-emerald-600 hover:text-emerald-700 font-medium text-sm transition-colors mb-1">
            <span>Lihat Seluruh Dosen</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </Reveal>

        <Stagger className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5">
          {visibleItems.map((dosen) => (
            <motion.div
              key={dosen.id}
              variants={fadeUpItem}
              className="text-center p-4 sm:p-5 rounded-xl border border-slate-200 bg-white hover:border-emerald-200 hover:shadow-md transition-all"
            >
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden mx-auto ring-2 ring-white shadow-sm bg-slate-100">
                <ImagePlaceholder label="Foto" className="w-full h-full" />
              </div>
              <h3 className="font-bold text-slate-900 text-sm mt-3">{dosen.name}</h3>
              <p className="text-emerald-700 text-xs font-bold mt-0.5">{dosen.prodi}</p>
              {dosen.position && (
                <p className="text-slate-400 text-xs mt-0.5">{dosen.position}</p>
              )}
            </motion.div>
          ))}
        </Stagger>
      </div>
    </section>
  )
}