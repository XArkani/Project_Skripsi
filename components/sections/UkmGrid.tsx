"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import type { UKM } from "@/lib/types"

interface UkmGridProps {
  items: UKM[]
}

const gridVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const cardVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: "easeOut" as const },
  },
}

export default function UkmGrid({ items }: UkmGridProps) {
  return (
    <motion.div
      className="grid md:grid-cols-3 gap-8"
      variants={gridVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
    >
      {items.map((ukm) => (
        <motion.div
          key={ukm.id}
          variants={cardVariants}
          className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex flex-col justify-between"
        >
          <div>
            <div className="w-14 h-14 rounded-2xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-3xl mb-5 shadow-sm">
              <span>{ukm.logo}</span>
            </div>
            <h2 className="font-extrabold text-xl text-slate-900 mb-3">{ukm.name}</h2>
            <p className="text-slate-600 text-sm mb-4 leading-relaxed">{ukm.description}</p>

            <div className="space-y-3 pt-3 border-t border-slate-100">
              <div>
                <span className="block text-[10px] uppercase font-bold text-slate-400">Ragam Kegiatan</span>
                <p className="text-xs text-slate-700 mt-1">{ukm.activities}</p>
              </div>
              <div>
                <span className="block text-[10px] uppercase font-bold text-slate-400">Kontak Resmi</span>
                <p className="text-xs text-emerald-800 font-semibold mt-1">{ukm.contact}</p>
              </div>
            </div>
          </div>

          <div className="pt-6 mt-4">
            <Link
              href="/hubungi"
              className="block w-full text-center py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-all"
            >
              Daftar Ormawa Ini
            </Link>
          </div>
        </motion.div>
      ))}
    </motion.div>
  )
}
