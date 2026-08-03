"use client"

import { ArrowRight, Sparkles } from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"

export default function HeroSection() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7 }}
      className="relative overflow-hidden bg-gradient-to-br from-emerald-900 via-emerald-800 to-slate-900 text-white py-20 lg:py-32"
    >
      <div
        className="absolute inset-0 opacity-10 bg-cover bg-center"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=1500')" }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-12 space-y-6">
            <div className="inline-flex items-center space-x-2 bg-emerald-700/50 border border-emerald-500/30 px-3 py-1.5 rounded-full text-emerald-300 text-xs sm:text-sm font-semibold uppercase tracking-wider backdrop-blur-sm">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <Sparkles className="w-3.5 h-3.5" />
              <span>Maju Berinovasi, Kokoh Berkualitas</span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-none">
              Membangun Masa Depan{" "}
              <span className="text-emerald-400 block mt-2">Teknologi Berintegritas</span>
            </h1>
            <p className="text-slate-300 text-base sm:text-lg max-w-xl leading-relaxed">
              Selamat datang di Fakultas Teknik Universitas Hamzanwadi. Kami berkomitmen untuk
              menghasilkan lulusan yang adaptif, inovatif, berakhlak mulia, dan siap memimpin
              industri di era digital global.
            </p>
            <div className="flex flex-wrap gap-4 pt-2">
              <Link
                href="/blueprint"
                className="inline-flex items-center space-x-2 bg-emerald-500 hover:bg-emerald-400 text-slate-900 px-6 py-3 rounded-lg text-sm sm:text-base font-bold shadow-lg shadow-emerald-950/40 transition-all hover:scale-105"
              >
                <span>Lihat Blueprint & Fasilitas</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/dosen"
                className="inline-flex items-center space-x-2 bg-slate-800 hover:bg-slate-700 border border-slate-600 text-white px-6 py-3 rounded-lg text-sm sm:text-base font-bold transition-all hover:scale-105"
              >
                <span>Jelajahi Data Dosen</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  )
}
