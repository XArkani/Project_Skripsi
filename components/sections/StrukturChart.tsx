"use client"

import { motion, useReducedMotion } from "framer-motion"
import { Building2, GraduationCap, School, Crown } from "lucide-react"
import type { Struktur } from "@/lib/types"

interface StrukturChartProps {
  items: Struktur[]
}

const EASE = [0.22, 1, 0.36, 1] as const

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: EASE } },
}

function getInitials(name: string) {
  return name
    .replace(/^(Dr|Ir|Prof|Dr\.|Ir\.)\s*/i, "")
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() ?? "")
    .join("")
}

function prodiName(role: string) {
  const cleaned = role.replace(/^Ketua Program Studi\s*/i, "").trim()
  return cleaned || "Program Studi"
}

export default function StrukturChart({ items }: StrukturChartProps) {
  const reduceMotion = useReducedMotion()

  const dekan = items.find((s) => s.role.includes("Dekan") && s.parentId === null)
  const wakilDekan = items.filter((s) => s.role.includes("Wakil Dekan"))
  const kaprodi = items.filter((s) => s.role.includes("Ketua Program Studi"))

  return (
    <div className="flex flex-col items-center gap-10 sm:gap-12">
      {dekan && (
        <motion.div
          variants={!reduceMotion ? cardVariants : undefined}
          initial={!reduceMotion ? "hidden" : false}
          whileInView={!reduceMotion ? "visible" : undefined}
          viewport={!reduceMotion ? { once: true, margin: "-40px", amount: 0.1 } : undefined}
          className="w-full max-w-md"
        >
          <div className="relative bg-emerald-900 text-white p-6 sm:p-8 rounded-2xl border border-emerald-700/60 shadow-lg text-center overflow-hidden">
            <div className="absolute inset-x-0 top-0 h-1 bg-emerald-400" />
            <span className="inline-flex items-center gap-1.5 bg-emerald-700/70 text-emerald-50 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
              <Crown className="w-3 h-3" aria-hidden="true" />
              Dekanat Utama
            </span>
            <div className="mx-auto mt-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-500/20 border border-emerald-400/30 text-emerald-50 font-extrabold text-xl shadow-inner">
              {getInitials(dekan.name) || <Building2 className="w-7 h-7" aria-hidden="true" />}
            </div>
            <h3 className="font-bold text-lg sm:text-xl mt-4">{dekan.name}</h3>
            <p className="text-emerald-200 text-xs sm:text-sm mt-1 font-semibold">{dekan.role}</p>
            {dekan.details && <p className="text-emerald-100/70 text-xs mt-3 leading-relaxed">{dekan.details}</p>}
          </div>
        </motion.div>
      )}

      {wakilDekan.length > 0 && (
        <>
          <div className="flex flex-col items-center -my-2 sm:-my-3" aria-hidden="true">
            <div className="h-2 w-2 rounded-full bg-emerald-600" />
            <div className="h-10 w-0.5 bg-emerald-300" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 w-full">
            {wakilDekan.map((wd, i) => (
              <motion.div
                key={wd.id}
                variants={!reduceMotion ? cardVariants : undefined}
                initial={!reduceMotion ? "hidden" : false}
                whileInView={!reduceMotion ? "visible" : undefined}
                viewport={!reduceMotion ? { once: true, margin: "-40px", amount: 0.1 } : undefined}
                transition={{ delay: !reduceMotion ? i * 0.05 : 0 }}
                className="group bg-card p-6 rounded-2xl border border-border shadow-sm hover:shadow-lg hover:border-emerald-200 transition-all flex flex-col items-center gap-3 text-center"
              >
                <span className="bg-emerald-50 text-emerald-700 text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider border border-emerald-100">
                  {wd.role.replace("Wakil Dekan ", "").replace("Bidang ", "").trim()}
                </span>
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-50 to-emerald-100 border border-emerald-100 text-emerald-700 font-extrabold text-lg shadow-sm group-hover:scale-105 transition-transform">
                  {getInitials(wd.name) || <GraduationCap className="w-6 h-6" aria-hidden="true" />}
                </div>
                <h3 className="font-bold text-foreground text-sm leading-snug">{wd.name}</h3>
                <p className="text-muted-foreground text-xs">{wd.role}</p>
                {wd.details && <p className="text-muted-foreground text-[11px] leading-relaxed">{wd.details}</p>}
              </motion.div>
            ))}
          </div>
        </>
      )}

      {kaprodi.length > 0 && (
        <>
          <div className="flex flex-col items-center -my-2 sm:-my-3" aria-hidden="true">
            <div className="h-2 w-2 rounded-full bg-emerald-600" />
            <div className="h-10 w-0.5 bg-emerald-300" />
          </div>

          <div className="w-full bg-muted p-6 sm:p-10 rounded-2xl border border-border text-center">
            <span className="inline-flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-wider text-emerald-700">
              <School className="w-4 h-4" aria-hidden="true" />
              Program Studi Di Bawah Naungan
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 max-w-3xl mx-auto mt-6">
              {kaprodi.map((kp) => (
                <motion.div
                  key={kp.id}
                  variants={!reduceMotion ? cardVariants : undefined}
                  initial={!reduceMotion ? "hidden" : false}
                  whileInView={!reduceMotion ? "visible" : undefined}
                  viewport={!reduceMotion ? { once: true, margin: "-40px", amount: 0.1 } : undefined}
                  className="bg-card p-5 rounded-xl border border-border shadow-sm hover:border-emerald-200 hover:shadow-md transition-all text-left flex items-start gap-3"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-50 border border-emerald-100 text-emerald-700">
                    <School className="w-5 h-5" aria-hidden="true" />
                  </div>
                  <div className="min-w-0 space-y-1">
                    <span className="text-emerald-700 font-bold text-xs block uppercase tracking-wide">
                      {prodiName(kp.role)}
                    </span>
                    <h4 className="font-bold text-foreground text-sm sm:text-base">{kp.name}</h4>
                    <p className="text-muted-foreground text-xs">{kp.role}</p>
                    {kp.details && <p className="text-muted-foreground text-xs leading-relaxed">{kp.details}</p>}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  )
}