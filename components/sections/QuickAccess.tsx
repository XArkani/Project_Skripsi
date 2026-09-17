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
    <section className="border-y border-border bg-background">
      <ScrollReveal className="mx-auto w-full max-w-[1280px] px-0">
        <div className="grid grid-cols-2 lg:grid-cols-4">
        {links.map((item, i) => {
          const Icon = item.icon
          return (
            <Link
              key={item.href}
              href={item.href}
              prefetch={false}
              className={`group flex items-center gap-2.5 px-3 py-5 transition-colors duration-200 hover:bg-muted focus-visible:outline-2 focus-visible:outline-[-2px] focus-visible:outline-emerald-600 sm:gap-4 sm:px-6 sm:py-6 ${i % 2 === 1 ? "border-l border-border lg:border-l" : ""} ${i >= 2 ? "border-t border-border lg:border-t-0" : ""} ${i > 0 ? "lg:border-l lg:border-l-border" : ""}`}
            >
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-emerald-100 bg-emerald-50 text-emerald-700 transition-colors duration-200 group-hover:bg-emerald-700 group-hover:text-white dark:border-emerald-900 dark:bg-emerald-950/60 dark:text-emerald-300 sm:h-11 sm:w-11">
                <Icon className="h-5 w-5" aria-hidden="true" />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block truncate text-[13px] font-semibold text-foreground group-hover:text-emerald-700 dark:group-hover:text-emerald-300 sm:text-sm">
                  {item.title}
                </span>
                <span className="mt-0.5 block truncate text-xs text-muted-foreground">{item.caption}</span>
              </span>
              <ArrowUpRight
                className="hidden h-4 w-4 shrink-0 text-muted-foreground/60 transition-colors group-hover:text-emerald-700 dark:group-hover:text-emerald-300 sm:block"
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