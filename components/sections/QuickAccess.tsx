import Link from "next/link"
import { Compass, GraduationCap, CalendarDays, Newspaper, ArrowUpRight } from "lucide-react"
import ScrollReveal from "@/components/shared/ScrollReveal"

const links = [
  {
    title: "Blueprint",
    caption: "Fasilitas dan ruang belajar",
    href: "/blueprint",
    icon: Compass,
  },
  {
    title: "Dosen",
    caption: "Profil dan kepakaran",
    href: "/dosen",
    icon: GraduationCap,
  },
  {
    title: "Agenda & Event",
    caption: "Seminar dan workshop",
    href: "/event",
    icon: CalendarDays,
  },
  {
    title: "Berita",
    caption: "Kabar terbaru kampus",
    href: "/berita",
    icon: Newspaper,
  },
]

export default function QuickAccess() {
  return (
    <section className="border-y border-slate-200 bg-white">
      <ScrollReveal className="mx-auto w-full max-w-[1280px] px-0">
        <div className="grid grid-cols-2 lg:grid-cols-4">
        {links.map((item, i) => {
          const Icon = item.icon
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`group flex items-center gap-4 px-4 py-6 transition-colors duration-200 hover:bg-slate-50 focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-emerald-600 sm:px-6 ${i % 2 === 1 ? "border-l border-slate-200 lg:border-l" : ""} ${i >= 2 ? "border-t border-slate-200 lg:border-t-0" : ""} ${i > 0 ? "lg:border-l lg:border-l-slate-200" : ""}`}
            >
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-emerald-100 bg-emerald-50 text-emerald-700 transition-colors duration-200 group-hover:bg-emerald-700 group-hover:text-white">
                <Icon className="h-5 w-5" aria-hidden="true" />
              </span>
              <span className="min-w-0">
                <span className="block truncate text-sm font-semibold text-slate-900 group-hover:text-emerald-700">
                  {item.title}
                </span>
                <span className="block truncate text-xs text-slate-500">{item.caption}</span>
              </span>
              <ArrowUpRight
                className="ml-auto h-4 w-4 shrink-0 text-slate-300 transition-colors group-hover:text-emerald-700"
                aria-hidden="true"
              />
            </Link>
          )
        })}
      </div>
      </ScrollReveal>
    </section>
  )
}