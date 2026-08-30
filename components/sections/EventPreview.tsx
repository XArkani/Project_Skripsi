import Link from "next/link"
import { ArrowRight, Clock3, MapPin } from "lucide-react"
import type { Event } from "@/lib/types"
import Container from "@/components/ui/container"
import SectionHeading from "@/components/ui/section-heading"
import ImagePlaceholder from "@/components/shared/ImagePlaceholder"
import ScrollReveal from "@/components/shared/ScrollReveal"

const MONTHS_ID = [
  "Januari", "Februari", "Maret", "April", "Mei", "Juni",
  "Juli", "Agustus", "September", "Oktober", "November", "Desember",
]

function dateParts(evt: Event) {
  const d = evt.dateTime ? new Date(evt.dateTime) : null
  if (d && !Number.isNaN(d.getTime()) && d.getUTCFullYear() > 2000) {
    return { day: d.getUTCDate(), month: MONTHS_ID[d.getUTCMonth()].slice(0, 3) }
  }
  const parts = evt.date.split(" ")
  const day = Number(parts[0]) || 0
  const rawMonth = parts[1] ?? ""
  const idx = MONTHS_ID.findIndex((m) => m.toLowerCase().startsWith(rawMonth.toLowerCase().slice(0, 3)))
  return { day, month: MONTHS_ID[idx >= 0 ? idx : 0].slice(0, 3) }
}

const statusChip: Record<string, string> = {
  "Akan Datang": "bg-emerald-700",
  "Sedang Berlangsung": "bg-amber-600",
  Selesai: "bg-slate-700",
}

const statusDot: Record<string, string> = {
  "Akan Datang": "bg-emerald-600",
  "Sedang Berlangsung": "bg-amber-500",
  Selesai: "bg-slate-400",
}

export default function EventPreview({ items }: { items: Event[] }) {
  const [featured, ...rest] = items
  const agenda = rest.slice(0, 3)

  if (!featured) return null
  const f = dateParts(featured)

  return (
    <section className="bg-background py-16 sm:py-24">
      <Container>
        <ScrollReveal>
          <SectionHeading
            title="Agenda & Event"
            description="Seminar, workshop, dan kegiatan rutin Fakultas Teknik."
            action={{ label: "Lihat Semua Agenda", href: "/event" }}
          />
        </ScrollReveal>

        <ScrollReveal delay={120}>
          <div className="mt-10 grid gap-10 lg:grid-cols-5">
          <article className="lg:col-span-3">
            <Link
              href={`/event/${featured.slug}`}
              className="group flex h-full flex-col overflow-hidden rounded-[20px] border border-border bg-card transition-all duration-300 hover:-translate-y-1 hover:border-emerald-200 hover:shadow-[0_8px_24px_rgba(2,6,23,0.06)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600"
            >
              <div className="relative aspect-[16/9] overflow-hidden">
                <ImagePlaceholder label={featured.title} className="h-full w-full" />
                <span className={`absolute left-4 top-4 rounded-full px-3 py-1 text-xs font-bold text-white ${statusChip[featured.status] ?? "bg-slate-700"}`}>
                  {featured.status}
                </span>
              </div>
              <div className="flex flex-1 flex-col gap-3 p-6 sm:p-7">
                <div className="flex items-center gap-3 text-muted-foreground">
                  <span className="flex items-center gap-2 rounded-lg border border-border bg-muted px-3 py-1.5">
                    <span className="tnum text-lg font-bold leading-none text-foreground">{f.day || "?"}</span>
                    <span className="text-[11px] font-bold uppercase text-muted-foreground">{f.month}</span>
                  </span>
                </div>
                <h3 className="line-clamp-2 text-2xl font-bold leading-snug tracking-[-0.01em] text-foreground group-hover:text-emerald-800">
                  {featured.title}
                </h3>
                <p className="line-clamp-2 leading-relaxed text-muted-foreground">{featured.description}</p>
                <div className="mt-2 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-muted-foreground">
                  <span className="inline-flex items-center gap-1.5">
                    <Clock3 className="h-4 w-4 text-emerald-700" aria-hidden="true" />
                    {featured.time || "Waktu menyusul"}
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <MapPin className="h-4 w-4 text-emerald-700" aria-hidden="true" />
                    {featured.location || "Lokasi menyusul"}
                  </span>
                </div>
              </div>
            </Link>
          </article>

          <div className="lg:col-span-2">
            <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-muted-foreground">
              Agenda Terdekat
            </p>
            <div className="mt-4 divide-y divide-border border-y border-border">
              {agenda.length === 0 ? (
                <p className="py-8 text-sm text-muted-foreground">Belum ada agenda berikutnya.</p>
              ) : (
                agenda.map((evt) => {
                  const d = dateParts(evt)
                  return (
                    <Link
                      key={evt.id}
                      href={`/event/${evt.slug}`}
                      className="group flex items-center gap-4 py-5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600"
                    >
                      <span className="grid h-14 w-14 shrink-0 place-items-center rounded-xl border border-border bg-muted">
                        <span className="text-center">
                          <span className="tnum block text-lg font-bold leading-none text-foreground">
                            {d.day || "?"}
                          </span>
                          <span className="block text-[10px] font-bold uppercase text-muted-foreground">{d.month}</span>
                        </span>
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="flex items-center gap-2">
                          <span className={`h-1.5 w-1.5 shrink-0 rounded-full ${statusDot[evt.status] ?? "bg-slate-400"}`} aria-hidden="true" />
                          <span className="line-clamp-1 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                            {evt.status}
                          </span>
                        </span>
                        <span className="mt-0.5 block line-clamp-2 text-sm font-semibold leading-snug text-foreground group-hover:text-emerald-800">
                          {evt.title}
                        </span>
                        <span className="mt-1 flex items-center gap-1 text-xs text-muted-foreground">
                          <MapPin className="h-3 w-3" aria-hidden="true" />
                          <span className="truncate">{evt.location || "Lokasi menyusul"}</span>
                        </span>
                      </span>
                    </Link>
                  )
                })
              )}
            </div>
            <Link
              href="/event"
              className="group mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-emerald-700 hover:text-emerald-800"
            >
              Lihat Semua Agenda
              <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" aria-hidden="true" />
            </Link>
          </div>
        </div>
        </ScrollReveal>
      </Container>
    </section>
  )
}