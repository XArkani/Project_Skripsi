"use client"

import { motion } from "framer-motion"
import { Mail } from "lucide-react"
import type { Dosen } from "@/lib/types"
import ImagePlaceholder from "@/components/shared/ImagePlaceholder"

interface DosenGridProps {
  items: Dosen[]
}

const gridVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
    },
  },
}

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" as const },
  },
}

export default function DosenGrid({ items }: DosenGridProps) {
  return (
    <motion.div
      className="grid md:grid-cols-2 gap-8"
      variants={gridVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
    >
      {items.map((dosen) => (
        <motion.div
          key={dosen.id}
          variants={cardVariants}
          className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex flex-col sm:flex-row items-center sm:items-start gap-6"
        >
          <div className="w-28 h-28 rounded-xl overflow-hidden border border-slate-200 shadow-sm flex-shrink-0">
            {dosen.image ? (
              <img src={dosen.image} alt={dosen.name} className="w-full h-full object-cover" />
            ) : (
              <ImagePlaceholder label="Foto" className="w-full h-full" />
            )}
          </div>

          <div className="space-y-2 flex-grow text-center sm:text-left">
            <h3 className="font-extrabold text-lg text-slate-900 leading-snug">{dosen.name}</h3>
            <div className="space-y-1">
              <p className="text-emerald-700 text-xs font-bold">{dosen.title}</p>
              <p className="text-slate-400 text-xs font-medium">{dosen.position}</p>
            </div>

            <div className="pt-2 border-t border-slate-100 text-left">
              <span className="block text-[9px] uppercase font-bold text-slate-400 tracking-wider">Kepakaran Utama</span>
              <p className="text-xs text-slate-700 font-semibold mt-0.5">{dosen.expertise}</p>
            </div>

            <div className="text-left">
              <span className="block text-[9px] uppercase font-bold text-slate-400 tracking-wider">Topik Riset Aktif</span>
              <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">{dosen.interest}</p>
            </div>

            <div className="pt-2 text-left">
              <span className="inline-flex items-center gap-1 text-[11px] text-emerald-700 font-bold bg-emerald-50 px-2.5 py-1 rounded-md">
                <Mail className="w-3 h-3" />
                {dosen.email}
              </span>
            </div>
          </div>
        </motion.div>
      ))}
    </motion.div>
  )
}
