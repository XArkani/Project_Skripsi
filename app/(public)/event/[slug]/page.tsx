import { cacheTag } from "next/cache"
import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { getEventBySlug, getEvents } from "@/lib/faculty"
import { Calendar, Clock, MapPin, ArrowLeft, CheckCircle2, ExternalLink } from "lucide-react"
import { statusConfig } from "@/lib/status"
import ImagePlaceholder from "@/components/shared/ImagePlaceholder"

export async function generateStaticParams() {
  const events = await getEvents()
  return events.map((evt) => ({ slug: evt.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const evt = await getEventBySlug(slug)
  if (!evt) return { title: "Acara tidak ditemukan" }
  return {
    title: `${evt.title} | Event`,
    description: evt.description,
  }
}

function isStockImage(src: string) {
  try {
    return new URL(src).hostname.includes("unsplash")
  } catch {
    return false
  }
}

export default async function EventDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  "use cache"
  const { slug } = await params
  cacheTag(`event-${slug}`)

  const evt = await getEventBySlug(slug)
  if (!evt) notFound()

  const events = await getEvents()
  const related = events.filter((e) => e.slug !== evt.slug).slice(0, 2)

  const badge = statusConfig[evt.status]
  const isPast = evt.status === "Selesai"

  return (
    <div className="max-w-4xl mx-auto page-gutter pt-20 sm:pt-28 pb-16 sm:pb-24">
      <Link
        href="/event"
        className="inline-flex items-center gap-1.5 min-h-11 text-sm font-bold text-muted-foreground hover:text-emerald-700 dark:hover:text-emerald-300 mb-6 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" aria-hidden="true" />
        Kembali ke Daftar Acara
      </Link>

      <div className="bg-card rounded-3xl overflow-hidden border border-border/80 shadow-sm">
        <div className="relative aspect-[4/3] overflow-hidden bg-muted sm:aspect-auto sm:h-96">
          {evt.image && !isStockImage(evt.image) ? (
            <Image src={evt.image} alt={evt.title} fill sizes="(min-width: 768px) 896px, 100vw" className="object-cover" priority />
          ) : (
            <ImagePlaceholder label="Poster belum tersedia" className="w-full h-full" />
          )}
          <span className={`absolute top-4 left-4 sm:top-6 sm:left-6 max-w-[calc(100%-2rem)] truncate text-white text-xs font-bold px-3 py-1.5 rounded-md uppercase tracking-wider ${badge.badge}`}>
            {evt.status}
          </span>
        </div>

        <div className="p-6 sm:p-10 space-y-6">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-foreground leading-tight">{evt.title}</h1>

          <div className="grid sm:grid-cols-3 gap-4 p-4 rounded-xl bg-muted border border-border">
            <div>
              <span className="block text-xs uppercase font-bold text-muted-foreground">Tanggal Pelaksanaan</span>
              <span className="text-sm font-semibold text-foreground inline-flex items-center gap-1.5 mt-1.5">
                <Calendar className="w-4 h-4 shrink-0 text-emerald-600" aria-hidden="true" />
                {evt.date}
              </span>
            </div>
            <div>
              <span className="block text-xs uppercase font-bold text-muted-foreground">Waktu WITA</span>
              <span className="text-sm font-semibold text-foreground inline-flex items-center gap-1.5 mt-1.5">
                <Clock className="w-4 h-4 shrink-0 text-emerald-600" aria-hidden="true" />
                {evt.time || "Tidak ditentukan"}
              </span>
            </div>
            <div>
              <span className="block text-xs uppercase font-bold text-muted-foreground">Lokasi Tempat</span>
              <span className="text-sm font-semibold text-foreground inline-flex items-center gap-1.5 mt-1.5">
                <MapPin className="w-4 h-4 shrink-0 text-emerald-600" aria-hidden="true" />
                {evt.location || "Tidak ditentukan"}
              </span>
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="font-extrabold text-lg text-foreground">Ringkasan Kegiatan</h2>
            <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">{evt.description}</p>

            {evt.details && (
              <>
                <h2 className="font-extrabold text-lg text-foreground">Deskripsi Lengkap & Persyaratan</h2>
                <p className="text-muted-foreground text-sm sm:text-base leading-relaxed whitespace-pre-line">{evt.details}</p>
              </>
            )}
          </div>

          {evt.source && (
            <div className="rounded-2xl border border-border bg-muted/40 px-5 py-4 text-sm">
              <p className="text-muted-foreground">
                <span className="font-bold text-foreground">Sumber: </span>
                {evt.sourceUrl ? (
                  <a
                    href={evt.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-11 items-center gap-1 font-semibold text-emerald-700 hover:text-emerald-800 hover:underline dark:text-emerald-300 dark:hover:text-emerald-200"
                  >
                    {evt.source}
                    <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                  </a>
                ) : (
                  <span className="font-semibold text-foreground">{evt.source}</span>
                )}
              </p>
            </div>
          )}

          <div className="pt-6 border-t border-border flex flex-wrap gap-4 items-center justify-between">
            <p className="text-sm text-muted-foreground">
              {isPast ? (
                "Acara ini telah selesai dilaksanakan."
              ) : (
                <>Pendaftaran dibuka hingga H-1 pelaksanaan acara.</>
              )}
            </p>
            {isPast ? (
              <span className="inline-flex items-center gap-2 min-h-11 px-6 py-2.5 rounded-xl bg-muted text-muted-foreground text-sm font-bold">
                <CheckCircle2 className="w-4 h-4" aria-hidden="true" />
                Telah Selesai
              </span>
            ) : (
              <Link
                href="/hubungi"
                className="inline-flex items-center justify-center bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm px-6 py-3 min-h-11 rounded-xl shadow-md transition-colors"
              >
                Daftar Sekarang
              </Link>
            )}
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <section className="mt-12 space-y-6" aria-label="Kegiatan lainnya">
          <h2 className="font-extrabold text-lg text-foreground">Kegiatan Lainnya</h2>
          <div className="grid sm:grid-cols-2 gap-6">
            {related.map((item) => (
              <Link
                key={item.id}
                href={`/event/${item.slug}`}
                className="bg-card p-5 rounded-2xl border border-border shadow-sm hover:border-emerald-300 transition-colors flex flex-col justify-between focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600"
              >
                <div>
                  <span className={statusBadgeClass(item.status)}>{item.status}</span>
                  <h3 className="font-bold text-foreground text-sm mt-1.5 line-clamp-1">{item.title}</h3>
                  <p className="text-muted-foreground text-xs mt-2 line-clamp-2">{item.description}</p>
                </div>
                <span className="text-emerald-700 dark:text-emerald-300 text-sm font-semibold mt-4 block">Lihat Detail &rarr;</span>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  )
}

function statusBadgeClass(status: string) {
  const badge = statusConfig[status as keyof typeof statusConfig]
  return `text-xs font-bold px-2.5 py-1 rounded-full uppercase tracking-wider text-white ${badge.badge}`
}