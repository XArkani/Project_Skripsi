"use client"

import { ArrowRight } from "lucide-react"
import Link from "next/link"
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion"
import { useRef } from "react"
import { EASE_PREMIUM } from "@/components/shared/Reveal"

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.15 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 28, filter: "blur(6px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.65, ease: EASE_PREMIUM },
  },
}

export default function HeroSection() {
  const ref = useRef<HTMLElement>(null)
  const reduceMotion = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] })

  const contentY = useTransform(scrollYProgress, [0, 1], [0, reduceMotion ? 0 : 90])
  const contentOpacity = useTransform(scrollYProgress, [0, 0.7], [1, reduceMotion ? 1 : 0.35])
  const circleY1 = useTransform(scrollYProgress, [0, 1], [0, reduceMotion ? 0 : -120])
  const circleY2 = useTransform(scrollYProgress, [0, 1], [0, reduceMotion ? 0 : 140])

  return (
    <section
      ref={ref}
      className="relative overflow-hidden bg-gradient-to-br from-emerald-950 via-emerald-900 to-slate-950 text-white min-h-[65vh] sm:min-h-[75vh] lg:min-h-[85vh] flex items-center mt-16 sm:mt-20 lg:mt-24 pt-16 pb-12 sm:pt-20 sm:pb-20"
    >
      <div className="absolute inset-0 overflow-hidden select-none pointer-events-none" aria-hidden="true">
        <motion.div
          style={{ y: circleY1 }}
          className="absolute -top-24 -left-16 w-72 h-72 rounded-full border-[32px] border-emerald-800/20 opacity-50"
        />
        <motion.div
          style={{ y: circleY2 }}
          className="absolute bottom-4 right-0 w-56 h-56 rounded-full border-[24px] border-emerald-700/15 opacity-40 translate-x-1/4 translate-y-1/4"
        />
      </div>

      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full"
      >
        <motion.div
          variants={containerVariants}
          initial={reduceMotion ? "visible" : "hidden"}
          animate="visible"
          className="max-w-2xl mx-auto text-center"
        >
          <motion.div
            variants={itemVariants}
            className="inline-flex items-center gap-2 bg-emerald-800/50 border border-emerald-500/25 px-3 py-1 rounded-full text-white/90 text-xs font-semibold uppercase tracking-wider mb-5"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            <span>Maju Berinovasi, Kokoh Berkualitas</span>
          </motion.div>

          <motion.h1
            variants={itemVariants}
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-[1.15] text-white mb-4"
          >
            Membangun Masa Depan<br />
            <span className="text-emerald-300">Teknologi Berintegritas</span>
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="text-slate-200 text-sm sm:text-base max-w-lg mx-auto leading-relaxed mb-6"
          >
            Selamat datang di Fakultas Teknik Universitas Hamzanwadi — mencetak lulusan adaptif, inovatif, dan
            berakhlak mulia untuk era digital global.
          </motion.p>

          <motion.div variants={itemVariants} className="flex flex-wrap gap-2 justify-center">
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
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  )
}