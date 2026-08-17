import Link from "next/link"
import { getNews, getMessages, getDosen, getEvents, getUKM, getBlueprints, getFAQs, getStruktur } from "@/lib/faculty"
import { Card, CardContent } from "@/components/ui/card"
import {
  Newspaper,
  Inbox,
  GraduationCap,
  CalendarDays,
  ClipboardList,
  HelpCircle,
  GitBranch,
  Users,
  ArrowUpRight,
} from "lucide-react"

import { contentHues } from "@/lib/admin-hues"

const eventHues = {
  "Akan Datang": {
    dot: "bg-emerald-500",
    text: "text-emerald-700",
    card: "group-hover:border-emerald-200 group-hover:bg-emerald-50/40",
  },
  "Sedang Berlangsung": {
    dot: "bg-amber-500",
    text: "text-amber-700",
    card: "group-hover:border-amber-200 group-hover:bg-amber-50/40",
  },
  Selesai: {
    dot: "bg-slate-400",
    text: "text-slate-600",
    card: "group-hover:border-slate-300 group-hover:bg-slate-50/60",
  },
} as const

type StatConfig = {
  label: string
  count: number
  icon: typeof Newspaper
  href: string
  badge?: number
  tint: string
}

export async function DashboardStats() {
  const [news, messages, dosen, events, ukm, blueprints, faqs, struktur] = await Promise.all([
    getNews(), getMessages(), getDosen(), getEvents(), getUKM(), getBlueprints(), getFAQs(), getStruktur(),
  ])

  const unread = messages.filter((m) => !m.isRead)
  const upcoming = events.filter((e) => e.status !== "Selesai").slice(0, 3)
  const latestNews = [...news].slice(0, 3)

  const stats: StatConfig[] = [
    { label: "Berita", count: news.length, icon: Newspaper, href: "/dashboard/berita", tint: contentHues.berita.chip },
    { label: "Dosen", count: dosen.length, icon: GraduationCap, href: "/dashboard/dosen", tint: contentHues.dosen.chip },
    { label: "Event", count: events.length, icon: CalendarDays, href: "/dashboard/event", tint: contentHues.event.chip },
    { label: "UKM", count: ukm.length, icon: Users, href: "/dashboard/ukm", tint: contentHues.ukm.chip },
    { label: "Blueprint", count: blueprints.length, icon: ClipboardList, href: "/dashboard/blueprint", tint: contentHues.blueprint.chip },
    { label: "FAQ", count: faqs.length, icon: HelpCircle, href: "/dashboard/faq", tint: contentHues.faq.chip },
    { label: "Struktur", count: struktur.length, icon: GitBranch, href: "/dashboard/struktur", tint: contentHues.struktur.chip },
    { label: "Pesan", count: messages.length, icon: Inbox, href: "/dashboard/messages", badge: unread.length, tint: contentHues.pesan.chip },
  ]

  return (
    <div className="space-y-10">
      <section aria-label="Ringkasan konten">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((stat) => {
            const Icon = stat.icon
            return (
              <Link key={stat.label} href={stat.href} className="group">
                <Card size="sm" className="h-full transition-colors group-hover:border-foreground/20">
                  <CardContent className="flex items-start justify-between gap-3 py-5">
                    <div>
                      <p className="text-3xl font-semibold tracking-tight text-foreground tabular-nums leading-none">
                        {stat.count}
                      </p>
                      <p className="mt-2 text-sm font-medium text-muted-foreground">{stat.label}</p>
                    </div>
                    <div className="flex flex-col items-end gap-2.5">
                      <span className={`flex h-9 w-9 items-center justify-center rounded-lg ${stat.tint}`}>
                        <Icon className="h-4 w-4" aria-hidden="true" />
                      </span>
                      {stat.badge != null && stat.badge > 0 && (
                        <span className="inline-flex min-w-5 h-5 items-center justify-center rounded-full bg-emerald-600 px-1 text-[11px] font-semibold text-white tabular-nums">
                          {stat.badge}
                        </span>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </Link>
            )
          })}
        </div>

        <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
          {(Object.keys(eventHues) as (keyof typeof eventHues)[]).map((status) => {
            const hue = eventHues[status]
            const count = events.filter((e) => e.status === status).length
            return (
              <Link key={status} href="/dashboard/event" className="group">
                <Card size="sm" className={`h-full transition-colors ${hue.card}`}>
                  <CardContent className="flex items-center justify-between py-5">
                    <span className="flex items-center gap-2.5">
                      <span className={`h-2 w-2 rounded-full ${hue.dot}`} aria-hidden="true" />
                      <p className="text-sm font-medium text-muted-foreground">{status}</p>
                    </span>
                    <p className={`text-2xl font-semibold tracking-tight tabular-nums ${hue.text}`}>{count}</p>
                  </CardContent>
                </Card>
              </Link>
            )
          })}
        </div>
      </section>

      <section aria-label="Aktivitas dan pesan" className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardContent className="py-6">
            <div className="mb-6 flex items-center gap-2.5">
              <span className="h-4 w-1 shrink-0 rounded-full bg-emerald-500" aria-hidden="true" />
              <div>
                <h2 className="text-sm font-semibold text-foreground">Aktivitas Terbaru</h2>
                <p className="mt-0.5 text-xs text-muted-foreground">Berita dan acara terbaru.</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground/80 mb-3">Berita</p>
                <ul className="space-y-4">
                  {latestNews.map((n) => (
                    <li key={n.id}>
                      <Link href="/dashboard/berita" className="block group/item">
                        <p className="text-sm font-medium text-foreground leading-snug line-clamp-1 group-hover/item:underline underline-offset-4">
                          {n.title}
                        </p>
                        <p className="mt-0.5 text-xs text-muted-foreground">{n.date}</p>
                      </Link>
                    </li>
                  ))}
                  {latestNews.length === 0 && <li className="text-sm text-muted-foreground">Belum ada berita.</li>}
                </ul>
              </div>

              <div>
                <p className="text-[11px] font-semibold uppercase tracking-widest text-emerald-700/90 mb-3">Event Terdekat</p>
                <ul className="space-y-4">
                  {upcoming.map((e) => (
                    <li key={e.id}>
                      <Link href="/dashboard/event" className="block group/item">
                        <p className="text-sm font-medium text-foreground leading-snug line-clamp-1 group-hover/item:underline underline-offset-4">
                          {e.title}
                        </p>
                        <p className="mt-0.5 text-xs text-muted-foreground">{e.date}</p>
                      </Link>
                    </li>
                  ))}
                  {upcoming.length === 0 && <li className="text-sm text-muted-foreground">Belum ada event mendatang.</li>}
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="py-6">
            <div className="mb-4 flex items-center justify-between gap-3">
              <div className="flex items-center gap-2.5">
                <span className="h-4 w-1 shrink-0 rounded-full bg-emerald-500" aria-hidden="true" />
                <div>
                  <h2 className="text-sm font-semibold text-foreground">Pesan Masuk</h2>
                  <p className="mt-0.5 text-xs text-muted-foreground">
                    {unread.length > 0 ? `${unread.length} belum dibaca` : "Semua pesan sudah dibaca"}
                  </p>
                </div>
              </div>
              {unread.length > 0 && (
                <span className="inline-flex min-w-5 h-5 items-center justify-center rounded-full bg-emerald-600 px-1 text-[11px] font-semibold text-white tabular-nums">
                  {unread.length}
                </span>
              )}
            </div>

            {unread.length === 0 ? (
              <div className="flex flex-col items-start justify-center rounded-lg border border-dashed border-border px-4 py-10 text-center">
                <p className="mx-auto text-sm text-muted-foreground">Tidak ada pesan baru.</p>
              </div>
            ) : (
              <ul className="space-y-4">
                {unread.slice(0, 4).map((m) => (
                  <li key={m.id}>
                    <Link href="/dashboard/messages" className="block group/item">
                      <p className="text-sm font-medium text-foreground leading-snug line-clamp-1 group-hover/item:text-emerald-700 transition-colors">
                        {m.subject || "(tanpa subjek)"}
                      </p>
                      <p className="mt-0.5 text-xs text-muted-foreground">
                        {m.senderName} · {m.date}
                      </p>
                    </Link>
                  </li>
                ))}
              </ul>
            )}

            <Link
              href="/dashboard/messages"
              className="mt-6 inline-flex items-center gap-1 text-sm font-medium text-emerald-700 hover:text-emerald-800 transition-colors"
            >
              Lihat semua pesan
              <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>
          </CardContent>
        </Card>
      </section>
    </div>
  )
}
