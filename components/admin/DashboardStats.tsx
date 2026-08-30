import Link from "next/link"
import { getNews, getMessages, getDosen, getEvents, getUKM, getBlueprints, getFAQs, getStruktur } from "@/lib/faculty"
import {
  Newspaper,
  Inbox,
  CalendarDays,
  Files,
  ArrowUpRight,
  Mail,
} from "lucide-react"
import StatCard from "@/components/dashboard/stat-card"

const statusDot: Record<string, string> = {
  "Akan Datang": "bg-blue-500",
  "Sedang Berlangsung": "bg-emerald-500",
  Selesai: "bg-slate-400",
}

export async function DashboardStats() {
  const [news, messages, dosen, events, ukm, blueprints, faqs, struktur] = await Promise.all([
    getNews(), getMessages(), getDosen(), getEvents(), getUKM(), getBlueprints(), getFAQs(), getStruktur(),
  ])

  const unread = messages.filter((m) => !m.isRead)
  const totalContent = blueprints.length + dosen.length + ukm.length + events.length + news.length + faqs.length + struktur.length
  const upcoming = events.filter((e) => e.status !== "Selesai")
  const latestNews = news.slice(0, 3)
  const latestUpcoming = upcoming.slice(0, 3)

  return (
    <div className="space-y-6">
      <section aria-label="Ringkasan utama" className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          icon={Files}
          label="Total Konten"
          value={totalContent}
          context="Seluruh konten terkelola"
          href="/dashboard/blueprint"
        />
        <StatCard
          icon={Newspaper}
          label="Berita"
          value={news.length}
          context={`${news.length} publikasi berita`}
          href="/dashboard/berita"
        />
        <StatCard
          icon={CalendarDays}
          label="Event Aktif"
          value={events.filter((e) => e.status !== "Selesai").length}
          context={`${events.length} total agenda`}
          href="/dashboard/event"
        />
        <StatCard
          icon={Inbox}
          label="Pesan Baru"
          value={unread.length}
          context={`${messages.length} total pesan`}
          href="/dashboard/messages"
          badge={unread.length}
        />
      </section>

      <section aria-label="Status event" className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {(["Akan Datang", "Sedang Berlangsung", "Selesai"] as const).map((status) => (
          <Link
            key={status}
            href="/dashboard/event"
            className="group flex items-center justify-between rounded-xl border border-border bg-card px-5 py-4 transition-colors group-hover:border-foreground/20"
          >
            <span className="flex items-center gap-2.5">
              <span className={`h-2 w-2 rounded-full ${statusDot[status]}`} aria-hidden="true" />
              <span className="text-sm font-medium text-muted-foreground">{status}</span>
            </span>
            <span className="text-2xl font-semibold tabular-nums tracking-tight text-foreground">
              {events.filter((e) => e.status === status).length}
            </span>
          </Link>
        ))}
      </section>

      <section aria-label="Aktivitas dan pesan" className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="rounded-xl border border-border bg-card p-5 lg:col-span-2">
          <h2 className="text-sm font-semibold text-foreground">Aktivitas Terbaru</h2>
          <p className="mt-0.5 text-xs text-muted-foreground">Berita dan agenda terbaru fakultas.</p>

          <div className="mt-5 grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">Berita</p>
              <ul className="mt-3 space-y-4">
                {latestNews.map((n) => (
                  <li key={n.id}>
                    <Link href="/dashboard/berita" className="block">
                      <p className="line-clamp-1 text-sm font-medium text-foreground transition-colors hover:text-emerald-700">
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
              <p className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">Event Terdekat</p>
              <ul className="mt-3 space-y-4">
                {latestUpcoming.map((e) => (
                  <li key={e.id}>
                    <Link href="/dashboard/event" className="block">
                      <p className="line-clamp-1 text-sm font-medium text-foreground transition-colors hover:text-emerald-700">
                        {e.title}
                      </p>
                      <p className="mt-0.5 text-xs text-muted-foreground">{e.date}</p>
                    </Link>
                  </li>
                ))}
                {latestUpcoming.length === 0 && (
                  <li className="text-sm text-muted-foreground">Belum ada event mendatang.</li>
                )}
              </ul>
            </div>
          </div>
        </div>

        <div className="flex flex-col rounded-xl border border-border bg-card p-5">
          <div className="flex items-center justify-between gap-3">
            <div>
              <h2 className="text-sm font-semibold text-foreground">Pesan Terbaru</h2>
              <p className="mt-0.5 text-xs text-muted-foreground">
                {unread.length > 0 ? `${unread.length} belum dibaca` : "Semua pesan sudah dibaca"}
              </p>
            </div>
            {unread.length > 0 && (
              <span className="inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-emerald-600 px-1.5 text-[11px] font-semibold text-white tabular-nums">
                {unread.length}
              </span>
            )}
          </div>

          {unread.length === 0 ? (
            <p className="mt-6 flex-1 rounded-lg border border-dashed border-border px-4 py-8 text-center text-sm text-muted-foreground">
              Tidak ada pesan baru.
            </p>
          ) : (
            <ul className="mt-4 flex-1 space-y-4">
              {unread.slice(0, 4).map((m) => (
                <li key={m.id}>
                  <Link href="/dashboard/messages" className="group flex items-start gap-3">
                    <Mail className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" aria-hidden="true" />
                    <span className="min-w-0">
                      <span className="block line-clamp-1 text-sm font-medium text-foreground">
                        {m.subject || "(tanpa subjek)"}
                      </span>
                      <span className="mt-0.5 block line-clamp-1 text-xs text-muted-foreground">
                        {m.senderName} · {m.date}
                      </span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          )}

          <Link
            href="/dashboard/messages"
            className="mt-5 inline-flex items-center gap-1 text-sm font-medium text-emerald-700 transition-colors hover:text-emerald-800"
          >
            Lihat semua pesan
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </div>
  )
}