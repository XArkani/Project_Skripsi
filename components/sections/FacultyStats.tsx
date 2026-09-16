"use client"

import { useEffect, useRef, useState } from "react"

interface Stat {
  label: string
  value: string
}

function parseValue(raw: string) {
  const match = raw.match(/\d+/)
  return {
    target: match ? Number(match[0]) : 0,
    suffix: match ? raw.replace(match[0], "") : "",
  }
}

function useCountUp(target: number, start: boolean, duration = 1300) {
  const [value, setValue] = useState(target)
  useEffect(() => {
    if (!start) return
    let raf = 0
    let started = false
    let t0 = 0
    const tick = (now: number) => {
      if (!started) {
        started = true
        t0 = now
        setValue(0)
      }
      const p = Math.min(1, (now - t0) / duration)
      const eased = 1 - Math.pow(1 - p, 3)
      setValue(Math.round(target * eased))
      if (p < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [start, target, duration])
  return value
}

function StatCell({ stat, start }: { stat: Stat; start: boolean }) {
  const { target, suffix } = parseValue(stat.value)
  const count = useCountUp(target, start)
  return (
    <div>
      <span className="mb-3 block h-1 w-8 rounded-full bg-emerald-400" aria-hidden="true" />
      <p className="tnum text-3xl font-bold tracking-tight text-white sm:text-[3.25rem] lg:text-5xl">
        {count}
        {suffix}
      </p>
      <p className="mt-1.5 text-[13px] font-medium leading-snug text-emerald-100/85 sm:text-sm">{stat.label}</p>
    </div>
  )
}

export default function FacultyStats({ stats }: { stats: Stat[] }) {
  const ref = useRef<HTMLDivElement>(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          observer.disconnect()
        }
      },
      { threshold: 0.25 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <section className="section-y relative overflow-hidden bg-[#003c32] text-white">
      <div className="bg-blueprint-grid absolute inset-0 opacity-30" aria-hidden="true" />
      <div
        className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-emerald-500/15 blur-3xl"
        aria-hidden="true"
      />
      <div
        ref={ref}
        className="page-gutter relative mx-auto grid w-full max-w-[1280px] grid-cols-2 gap-x-6 gap-y-8 lg:grid-cols-4"
      >
        {stats.map((s) => (
          <StatCell key={s.label} stat={s} start={inView} />
        ))}
      </div>
    </section>
  )
}