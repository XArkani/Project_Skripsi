"use client"

import { ArrowRight } from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"
import type { Dosen } from "@/lib/types"
import ImagePlaceholder from "@/components/shared/ImagePlaceholder"

interface DosenHighlightProps {
  items: Dosen[]
}

export default function DosenHighlight({ items }: DosenHighlightProps) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="py-16 bg-white"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10">
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              Tenaga Pendidik Unggulan
            </h2>
            <p className="text-slate-500 text-sm sm:text-base mt-2">
              Dosen-dosen ahli dengan portofolio riset nasional dan komitmen pengajaran tinggi.
            </p>
          </div>
          <Link
            href="/dosen"
            className="mt-4 md:mt-0 text-emerald-700 hover:text-emerald-800 font-bold text-sm inline-flex items-center space-x-1"
          >
            <span>Lihat Seluruh Dosen</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {items.slice(0, 4).map((dosen) => (
            <div
              key={dosen.id}
              className="bg-slate-50 rounded-2xl p-5 border border-slate-200/80 text-center flex flex-col justify-between"
            >
              <div>
                <div className="w-24 h-24 rounded-full overflow-hidden mx-auto border-4 border-white shadow-md mb-4">
                  {dosen.image ? (
                    <img
                      src={dosen.image}
                      alt={dosen.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <ImagePlaceholder label="Foto" className="w-full h-full" />
                  )}
                </div>
                <h3 className="font-bold text-slate-900 text-base leading-snug">{dosen.name}</h3>
                <p className="text-emerald-700 text-xs font-semibold mt-1">{dosen.title}</p>
                <p className="text-slate-400 text-[11px] mt-0.5">{dosen.position}</p>

                <div className="mt-4 pt-3 border-t border-slate-200/60 text-left">
                  <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                    Fokus Utama
                  </p>
                  <p className="text-xs text-slate-600 line-clamp-2 mt-1">{dosen.expertise}</p>
                </div>
              </div>

              <Link
                href="/dosen"
                className="mt-5 w-full block text-center text-xs font-bold text-emerald-700 hover:underline"
              >
                Lihat Selengkapnya
              </Link>
            </div>
          ))}
        </div>
      </div>
    </motion.section>
  )
}
