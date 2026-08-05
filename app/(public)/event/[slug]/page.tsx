import { cacheTag } from "next/cache"
import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { getEventBySlug, getEvents } from "@/lib/faculty"
import { Calendar, Clock, MapPin, ArrowLeft } from "lucide-react"
import EmptyState from "@/components/shared/EmptyState"
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

export default async function EventDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  "use cache"
  const { slug } = await params
  cacheTag(`event-${slug}`)

  const evt = await getEventBySlug(slug)
  if (!evt) notFound()

  const events = await getEvents()
  const related = events.filter((e) => e.slug !== evt.slug).slice(0, 2)

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-24 sm:pt-28">
      <div className="text-xs text-slate-400 mb-6 flex items-center space-x-2">
        <Link href="/" className="hover:text-emerald-700">Beranda</Link>
        <span>/</span>
        <Link href="/event" className="hover:text-emerald-700">Event</Link>
        <span>/</span>
        <span className="text-slate-600 truncate">{evt.title}</span>
      </div>

      <Link href="/event" className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-emerald-700 mb-6">
        <ArrowLeft className="w-3.5 h-3.5" />
        Kembali ke Daftar Acara
      </Link>

      <div className="bg-white rounded-3xl overflow-hidden border border-slate-200/80 shadow-sm">
        <div className="relative h-64 sm:h-96 overflow-hidden">
          {evt.image ? (
            <img src={evt.image} alt={evt.title} className="w-full h-full object-cover" />
          ) : (
            <ImagePlaceholder label="Poster Acara" className="w-full h-full" />
          )}
          <span className="absolute top-6 left-6 bg-emerald-600 text-white text-xs font-bold px-3 py-1.5 rounded-md uppercase tracking-wider">{evt.status}</span>
        </div>

        <div className="p-6 sm:p-10 space-y-6">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 leading-tight">{evt.title}</h1>

          <div className="grid sm:grid-cols-3 gap-4 p-4 rounded-xl bg-slate-50 border border-slate-100">
            <div>
              <span className="block text-[10px] uppercase font-bold text-slate-400">Tanggal Pelaksanaan</span>
              <span className="text-sm font-semibold text-slate-700 inline-flex items-center gap-1 mt-1">
                <Calendar className="w-3.5 h-3.5" />
                {evt.date}
              </span>
            </div>
            <div>
              <span className="block text-[10px] uppercase font-bold text-slate-400">Waktu WITA</span>
              <span className="text-sm font-semibold text-slate-700 inline-flex items-center gap-1 mt-1">
                <Clock className="w-3.5 h-3.5" />
                {evt.time || "Tidak ditentukan"}
              </span>
            </div>
            <div>
              <span className="block text-[10px] uppercase font-bold text-slate-400">Lokasi Tempat</span>
              <span className="text-sm font-semibold text-slate-700 inline-flex items-center gap-1 mt-1">
                <MapPin className="w-3.5 h-3.5" />
                {evt.location || "Tidak ditentukan"}
              </span>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-extrabold text-lg text-slate-900">Ringkasan Kegiatan</h3>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">{evt.description}</p>

            {evt.details && (
              <>
                <h3 className="font-extrabold text-lg text-slate-900">Deskripsi Lengkap & Persyaratan</h3>
                <p className="text-slate-500 text-sm sm:text-base leading-relaxed">{evt.details}</p>
              </>
            )}
          </div>

          <div className="pt-6 border-t border-slate-100 flex flex-wrap gap-4 items-center justify-between">
            <div>
              <p className="text-xs text-slate-400">Pendaftaran ditutup H-1 pelaksanaan acara</p>
            </div>
            <Link
              href="/hubungi"
              className="inline-block bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm px-6 py-3 rounded-xl shadow-lg transition-transform hover:scale-105"
            >
              Daftar Sekarang Juga
            </Link>
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <div className="mt-12 space-y-6">
          <h3 className="font-extrabold text-lg text-slate-900">Kegiatan Lainnya</h3>
          <div className="grid sm:grid-cols-2 gap-6">
            {related.map((item) => (
              <Link
                key={item.id}
                href={`/event/${item.slug}`}
                className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm hover:border-emerald-300 transition-colors flex flex-col justify-between"
              >
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400">{item.status}</span>
                  <h4 className="font-bold text-slate-800 text-sm mt-1 line-clamp-1">{item.title}</h4>
                  <p className="text-slate-500 text-xs mt-2 line-clamp-2">{item.description}</p>
                </div>
                <span className="text-emerald-700 text-xs font-semibold mt-4 block">Lihat Detail →</span>
              </Link>
            ))}
          </div>
        </div>
      )}

      {events.length === 0 && (
        <div className="mt-12">
          <EmptyState title="Belum ada acara" description="Belum ada agenda atau acara yang dijadwalkan saat ini." />
        </div>
      )}
    </div>
  )
}
