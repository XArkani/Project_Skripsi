"use client"

import { ArrowRight } from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-emerald-950 via-emerald-900 to-slate-950 text-white min-h-[50vh] sm:min-h-[60vh] flex items-center pt-24 pb-12 sm:pt-28 sm:pb-20">
      <div className="absolute inset-0 overflow-hidden select-none pointer-events-none" aria-hidden="true">
        <div className="absolute -top-24 -left-16 w-72 h-72 rounded-full border-[32px] border-emerald-800/20 opacity-50" />
        <div className="absolute bottom-4 right-0 w-56 h-56 rounded-full border-[24px] border-emerald-700/15 opacity-40 translate-x-1/4 translate-y-1/4" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="motion-safe:opacity-100 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full"
      >
        <div className="max-w-2xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-emerald-800/50 border border-emerald-500/25 px-3 py-1 rounded-full text-white/90 text-xs sm:text-sm font-semibold uppercase tracking-wider mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            <span>Maju Berinovasi, Kokoh Berkualitas</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-[1.15] text-white mb-4">
            Membangun Masa Depan<br />
            <span className="text-emerald-300">Teknologi Berintegritas</span>
          </h1>

          <p className="text-slate-200 text-sm sm:text-base max-w-lg mx-auto leading-relaxed mb-6">
            Selamat datang di Fakultas Teknik Universitas Hamzanwadi — mencetak lulusan adaptif, inovatif, dan berakhlak mulia untuk era digital global.
          </p>

          <div className="flex flex-wrap gap-2 justify-center">
            <Link
              href="/blueprint"
              className="inline-flex items-center gap-1.5 bg-emerald-500 hover:bg-emerald-400 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors"
            >
              <span>Lihat Blueprint</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
            <Link
              href="/dosen"
              className="inline-flex items-center gap-1.5 bg-white/10 hover:bg-white/15 border border-white/15 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors"
            >
              <span>Data Dosen</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </motion.div>
    </section>
  )
}
