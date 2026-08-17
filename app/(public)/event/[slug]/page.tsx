import { cacheTag } from "next/cache"
import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { getEventBySlug, getEvents } from "@/lib/faculty"
import { Calendar, Clock, MapPin, ArrowLeft, CheckCircle2 } from "lucide-react"
import { statusConfig } from "@/lib/status"
import Breadcrumbs from "@/components/shared/Breadcrumbs"
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
    <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-24 sm:pt-28 pb-16 sm:pb-24">
      <Breadcrumbs items={[{ label: "Beranda", href: "/" }, { label: "Agenda & Event", href: "/event" }, { label: evt.title }]} />

      <Link
        href="/event"
        className="inline-flex items-center gap-1.5 min-h-11 text-sm font-bold text-slate-500 hover:text-emerald-700 mb-6 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" aria-hidden="true" />
        Kembali ke Daftar Acara
      </Link>

      <div className="bg-white rounded-3xl overflow-hidden border border-slate-200/80 shadow-sm">
        <div className="relative h-64 sm:h-96 overflow-hidden bg-slate-100">
          {evt.image && !isStockImage(evt.image) ? (
            <Image src={evt.image} alt={evt.title} fill sizes="(min-width: 768px) 896px, 100vw" className="object-cover" priority />
          ) : (
            <ImagePlaceholder label="Poster belum tersedia" className="w-full h-full" />
          )}
          <span className={`absolute top-6 left-6 text-white text-xs font-bold px-3 py-1.5 rounded-md uppercase tracking-wider ${badge.badge}`}>
            {evt.status}
          </span>
        </div>

        <div className="p-6 sm:p-10 space-y-6">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 leading-tight">{evt.title}</h1>

          <div className="grid sm:grid-cols-3 gap-4 p-4 rounded-xl bg-slate-50 border border-slate-100">
            <div>
              <span className="block text-xs uppercase font-bold text-slate-500">Tanggal Pelaksanaan</span>
              <span className="text-sm font-semibold text-slate-700 inline-flex items-center gap-1.5 mt-1.5">
                <Calendar className="w-4 h-4 shrink-0 text-emerald-600" aria-hidden="true" />
                {evt.date}
              </span>
            </div>
            <div>
              <span className="block text-xs uppercase font-bold text-slate-500">Waktu WITA</span>
              <span className="text-sm font-semibold text-slate-700 inline-flex items-center gap-1.5 mt-1.5">
                <Clock className="w-4 h-4 shrink-0 text-emerald-600" aria-hidden="true" />
                {evt.time || "Tidak ditentukan"}
              </span>
            </div>
            <div>
              <span className="block text-xs uppercase font-bold text-slate-500">Lokasi Tempat</span>
              <span className="text-sm font-semibold text-slate-700 inline-flex items-center gap-1.5 mt-1.5">
                <MapPin className="w-4 h-4 shrink-0 text-emerald-600" aria-hidden="true" />
                {evt.location || "Tidak ditentukan"}
              </span>
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="font-extrabold text-lg text-slate-900">Ringkasan Kegiatan</h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">{evt.description}</p>

            {evt.details && (
              <>
                <h2 className="font-extrabold text-lg text-slate-900">Deskripsi Lengkap & Persyaratan</h2>
                <p className="text-slate-500 text-sm sm:text-base leading-relaxed whitespace-pre-line">{evt.details}</p>
              </>
            )}
          </div>

          <div className="pt-6 border-t border-slate-100 flex flex-wrap gap-4 items-center justify-between">
            <p className="text-sm text-slate-500">
              {isPast ? (
                "Acara ini telah selesai dilaksanakan."
              ) : (
                <>Pendaftaran dibuka hingga H-1 pelaksanaan acara.</>
              )}
            </p>
            {isPast ? (
              <span className="inline-flex items-center gap-2 min-h-11 px-6 py-2.5 rounded-xl bg-slate-100 text-slate-500 text-sm font-bold">
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
          <h2 className="font-extrabold text-lg text-slate-900">Kegiatan Lainnya</h2>
          <div className="grid sm:grid-cols-2 gap-6">
            {related.map((item) => (
              <Link
                key={item.id}
                href={`/event/${item.slug}`}
                className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm hover:border-emerald-300 transition-colors flex flex-col justify-between focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600"
              >
                <div>
                  <span className={statusBadgeClass(item.status)}>{item.status}</span>
                  <h3 className="font-bold text-slate-800 text-sm mt-1.5 line-clamp-1">{item.title}</h3>
                  <p className="text-slate-500 text-xs mt-2 line-clamp-2">{item.description}</p>
                </div>
                <span className="text-emerald-700 text-sm font-semibold mt-4 block">Lihat Detail &rarr;</span>
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