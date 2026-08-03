"use client"

import { Building2, GraduationCap, Zap, Calendar, Newspaper, Landmark, Lightbulb, Phone } from "lucide-react"
import Link from "next/link"

const links = [
  { title: "Blueprint", path: "/blueprint", icon: Building2 },
  { title: "Dosen", path: "/dosen", icon: GraduationCap },
  { title: "UKM", path: "/ukm", icon: Zap },
  { title: "Event", path: "/event", icon: Calendar },
  { title: "Berita", path: "/berita", icon: Newspaper },
  { title: "Struktur", path: "/struktur", icon: Landmark },
  { title: "FAQ", path: "/faq", icon: Lightbulb },
  { title: "Hubungi", path: "/hubungi", icon: Phone },
]

export default function QuickNavPanel() {
  return (
    <div className="py-4 bg-white border-y border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap justify-center gap-1.5 sm:gap-2">
          {links.map((item) => {
            const Icon = item.icon
            return (
              <Link
                key={item.path}
                href={item.path}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-slate-600 hover:text-emerald-700 hover:bg-emerald-50 text-sm font-medium transition-colors"
              >
                <Icon className="w-4 h-4 shrink-0" />
                <span>{item.title}</span>
              </Link>
            )
          })}
        </div>
      </div>
    </div>
  )
}
