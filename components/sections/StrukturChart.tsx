"use client"

import { motion, useReducedMotion } from "framer-motion"
import { Users, Crown, GraduationCap, School } from "lucide-react"
import type { Struktur } from "@/lib/types"

interface StrukturChartProps {
  items: Struktur[]
}

const EASE = [0.22, 1, 0.36, 1] as const

function getInitials(name: string) {
  return name
    .replace(/^(Dr\.?|Ir\.?|Prof\.?|H\.?)\s+/gi, "")
    .split(/[\s,]+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() ?? "")
    .join("")
}

function OrganizationCard({
  role,
  name,
  detail,
  variant,
  initials,
  icon,
}: {
  role: string
  name: string
  detail?: string | null
  variant: "dean" | "vice" | "kaprodi"
  initials: string
  icon: React.ReactNode
}) {
  if (variant === "dean") {
    return (
      <div className="relative bg-[#0f3d2e] text-white rounded-2xl border border-emerald-800 shadow-[0_2px_16px_rgba(0,0,0,0.08)] px-6 py-7 sm:px-8 sm:py-8 text-center overflow-hidden">
        <div className="absolute inset-x-0 top-0 h-[3px] bg-emerald-400" />
        <span className="inline-flex items-center gap-1.5 bg-white/10 border border-white/10 text-emerald-100 text-[10px] font-bold tracking-[0.14em] uppercase px-3 py-1 rounded-full">
          <Crown className="w-3 h-3" aria-hidden="true" />
          Dekan Fakultas Teknik
        </span>
        <div className="mx-auto mt-5 flex h-[68px] w-[68px] items-center justify-center rounded-2xl bg-white/10 border border-white/15 text-white font-extrabold text-[20px] tracking-wide">
          {initials || icon}
        </div>
        <h3 className="font-bold text-[17px] sm:text-[20px] leading-snug mt-4 text-white">{name}</h3>
        <p className="text-emerald-200/90 text-xs font-semibold tracking-wide uppercase mt-1.5">{role}</p>
        {detail && <p className="text-white/60 text-xs mt-3 leading-relaxed max-w-[28ch] mx-auto">{detail}</p>}
      </div>
    )
  }
  if (variant === "vice") {
    return (
      <div className="bg-white rounded-2xl border border-zinc-200 shadow-[0_1px_8px_rgba(0,0,0,0.04)] px-5 py-6 sm:px-6 sm:py-7 text-center flex flex-col items-center gap-3">
        <span className="bg-zinc-50 border border-zinc-200 text-zinc-600 text-[10px] font-bold tracking-[0.12em] uppercase px-2.5 py-1 rounded-full">
          {role}
        </span>
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-50 border border-emerald-100 text-emerald-700 font-extrabold text-[17px]">
          {initials || icon}
        </div>
        <h3 className="font-bold text-zinc-900 text-sm leading-snug">{name}</h3>
        {detail && <p className="text-zinc-500 text-xs font-medium">{detail}</p>}
      </div>
    )
  }
  return (
    <div className="bg-white rounded-2xl border border-zinc-200 shadow-[0_1px_8px_rgba(0,0,0,0.04)] px-5 py-5 sm:py-6 text-center flex flex-col items-center gap-3">
      <span className="bg-emerald-50 border border-emerald-100 text-emerald-700 text-[10px] font-bold tracking-[0.12em] uppercase px-2.5 py-1 rounded-full">
        Ketua Program Studi
      </span>
      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-zinc-50 border border-zinc-200 text-zinc-700 font-extrabold text-[15px]">
        {initials || icon}
      </div>
      <h3 className="font-bold text-zinc-900 text-sm leading-snug">{name}</h3>
      {detail && <p className="text-emerald-700 text-xs font-semibold">{detail}</p>}
      <p className="text-zinc-400 text-[11px] hidden">{role}</p>
    </div>
  )
}

export default function StrukturChart({ items }: StrukturChartProps) {
  const reduceMotion = useReducedMotion()
  const dekan = items.find((s) => s.role === "Dekan Fakultas Teknik" || (s.role.includes("Dekan") && s.parentId === null))
  const wakilDekan = items.filter((s) => s.role.startsWith("Wakil Dekan")).sort((a, b) => a.role.localeCompare(b.role))
  const kaprodi = items
    .filter((s) => s.role.includes("Ketua Program Studi"))
    .sort((a, b) => {
      const order = ["Informatika", "Teknik Komputer", "Sistem Informasi", "Teknik Lingkungan"]
      const ai = order.findIndex((o) => a.role.includes(o))
      const bi = order.findIndex((o) => b.role.includes(o))
      return (ai === -1 ? 99 : ai) - (bi === -1 ? 99 : bi)
    })

  const view = reduceMotion ? undefined : { once: true, margin: "-30px" as const, amount: 0.12 as const }

  return (
    <div className="w-full flex flex-col items-center">
      {dekan && (
        <motion.div
          initial={reduceMotion ? undefined : { opacity: 0, y: 14 }}
          whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={view}
          transition={reduceMotion ? undefined : { duration: 0.45, ease: EASE }}
          className="w-full max-w-[420px]"
        >
          <OrganizationCard
            role={dekan.role}
            name={dekan.name}
            detail={dekan.details}
            variant="dean"
            initials={getInitials(dekan.name)}
            icon={<Crown className="w-6 h-6" />}
          />
        </motion.div>
      )}

      <div className="flex flex-col items-center w-full" aria-hidden="true">
        <div className="h-8 w-px bg-zinc-200" />
        <div className="h-2 w-2 rounded-full bg-emerald-600 ring-4 ring-emerald-50" />
        <div className="hidden sm:block relative w-full max-w-[520px] h-8">
          <div className="absolute left-1/2 top-0 h-4 w-px -translate-x-1/2 bg-zinc-200" />
          <div className="absolute left-[25%] right-[25%] top-4 h-px bg-zinc-200" />
          <div className="absolute left-[25%] top-4 h-4 w-px bg-zinc-200" />
          <div className="absolute right-[25%] top-4 h-4 w-px bg-zinc-200" />
        </div>
        <div className="sm:hidden h-8 w-px bg-zinc-200" />
      </div>

      {wakilDekan.length > 0 && (
        <div className="w-full max-w-[720px] grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
          {wakilDekan.map((wd, i) => (
            <motion.div
              key={wd.id}
              initial={reduceMotion ? undefined : { opacity: 0, y: 14 }}
              whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={view}
              transition={reduceMotion ? undefined : { duration: 0.4, ease: EASE, delay: i * 0.06 }}
            >
              <OrganizationCard
                role={wd.role}
                name={wd.name}
                detail={wd.details}
                variant="vice"
                initials={getInitials(wd.name)}
                icon={<GraduationCap className="w-6 h-6" />}
              />
            </motion.div>
          ))}
        </div>
      )}

      <div className="flex flex-col items-center w-full" aria-hidden="true">
        <div className="hidden lg:block relative w-full max-w-6xl h-10">
          <div className="absolute left-1/2 top-0 h-5 w-px -translate-x-1/2 bg-zinc-200" />
          <div className="absolute left-[12.5%] right-[12.5%] top-5 h-px bg-zinc-200" />
          <div className="absolute left-[12.5%] top-5 h-5 w-px bg-zinc-200" />
          <div className="absolute left-[37.5%] top-5 h-5 w-px bg-zinc-200" />
          <div className="absolute right-[37.5%] top-5 h-5 w-px bg-zinc-200" />
          <div className="absolute right-[12.5%] top-5 h-5 w-px bg-zinc-200" />
        </div>
        <div className="hidden sm:block lg:hidden relative w-full max-w-3xl h-14">
          <div className="absolute left-1/2 top-0 h-5 w-px -translate-x-1/2 bg-zinc-200" />
          <div className="absolute left-[25%] right-[25%] top-5 h-px bg-zinc-200" />
          <div className="absolute left-[25%] top-5 h-4 w-px bg-zinc-200" />
          <div className="absolute right-[25%] top-5 h-4 w-px bg-zinc-200" />
          <div className="absolute left-[25%] top-9 h-px w-[50%] bg-zinc-200 sm:hidden" />
        </div>
        <div className="sm:hidden h-8 w-px bg-zinc-200" />
        <div className="hidden sm:block lg:hidden h-5 w-px bg-zinc-200 -mt-0" />
      </div>

      {kaprodi.length > 0 && (
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {kaprodi.map((kp, i) => (
            <motion.div
              key={kp.id}
              initial={reduceMotion ? undefined : { opacity: 0, y: 14 }}
              whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={view}
              transition={reduceMotion ? undefined : { duration: 0.4, ease: EASE, delay: i * 0.05 }}
            >
              <OrganizationCard
                role={kp.role}
                name={kp.name}
                detail={kp.details}
                variant="kaprodi"
                initials={getInitials(kp.name)}
                icon={<School className="w-5 h-5" />}
              />
            </motion.div>
          ))}
        </div>
      )}

      <div className="flex flex-col items-center" aria-hidden="true">
        <div className="hidden lg:block relative w-full h-10">
          <div className="absolute left-[12.5%] right-[12.5%] top-0 h-px bg-zinc-200" />
          <div className="absolute left-[12.5%] top-0 h-5 w-px bg-zinc-200" />
          <div className="absolute left-[37.5%] top-0 h-5 w-px bg-zinc-200" />
          <div className="absolute right-[37.5%] top-0 h-5 w-px bg-zinc-200" />
          <div className="absolute right-[12.5%] top-0 h-5 w-px bg-zinc-200" />
          <div className="absolute left-1/2 top-5 h-5 w-px -translate-x-1/2 bg-zinc-200" />
        </div>
        <div className="hidden sm:block lg:hidden relative w-[50vw] max-w-3xl h-10">
          <div className="absolute left-[25%] right-[25%] top-0 h-px bg-zinc-200" />
          <div className="absolute left-[25%] top-0 h-5 w-px bg-zinc-200" />
          <div className="absolute right-[25%] top-0 h-5 w-px bg-zinc-200" />
          <div className="absolute left-1/2 top-5 h-5 w-px -translate-x-1/2 bg-zinc-200" />
        </div>
        <div className="sm:hidden h-8 w-px bg-zinc-200" />
        <div className="h-2 w-2 rounded-full bg-emerald-600 ring-4 ring-emerald-50 sm:mt-0" />
        <div className="h-8 w-px bg-zinc-200" />
      </div>

      <motion.div
        initial={reduceMotion ? undefined : { opacity: 0, y: 10 }}
        whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
        viewport={view}
        transition={reduceMotion ? undefined : { duration: 0.4, ease: EASE }}
        className="w-full max-w-[520px]"
      >
        <div className="bg-zinc-900 text-white rounded-2xl border border-zinc-800 px-6 py-6 sm:py-7 text-center shadow-[0_2px_16px_rgba(0,0,0,0.08)]">
          <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-xl bg-white/10 border border-white/10">
            <Users className="w-5 h-5 text-white" aria-hidden="true" />
          </div>
          <h3 className="font-bold text-sm sm:text-[15px] tracking-wide uppercase mt-3">Seluruh Dosen</h3>
          <p className="text-white/60 text-xs sm:text-sm mt-1">Fakultas Teknik Universitas Hamzanwadi</p>
          <p className="text-white/35 text-[11px] mt-3 leading-relaxed">
            Mencakup seluruh dosen dari Program Studi Informatika, Teknik Komputer, Sistem Informasi, dan Teknik Lingkungan
          </p>
        </div>
      </motion.div>

      <p className="sr-only">
        Hierarki: Dekan di atas, membawahi Wakil Dekan I Bidang Akademik dan Wakil Dekan II Bidang Non-Akademik yang setara, membawahi empat Ketua Program Studi yang setara, membawahi Seluruh Dosen Fakultas Teknik.
      </p>
    </div>
  )
}
