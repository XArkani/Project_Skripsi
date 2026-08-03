import { cacheTag } from "next/cache"
import Link from "next/link"
import { getEvents } from "@/lib/faculty"
import { Calendar, MapPin } from "lucide-react"
import EmptyState from "@/components/shared/EmptyState"
import ImagePlaceholder from "@/components/shared/ImagePlaceholder"

const statusColors: Record<string, string> = {
  "Akan Datang": "bg-blue-600",
  "Sedang Berlangsung": "bg-amber-500",
  Selesai: "bg-slate-500",
}

export default async function EventPage() {
  "use cache"
  cacheTag("event")

  const events = await getEvents()
  const categories = ["Akan Datang", "Sedang Berlangsung", "Selesai"]

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="border-b border-slate-200 pb-6 mb-10 text-center md:text-left">
        <span className="text-xs uppercase font-extrabold text-emerald-700 tracking-wider">Kalender Akademik</span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-950 mt-1">Agenda & Event Teknik</h1>
        <p className="text-slate-500 text-sm sm:text-base mt-2">Daftar lengkap program pelatihan, seminar, loka karya, dan konferensi yang kami selenggarakan.</p>
      </div>

      {events.length === 0 ? (
        <EmptyState title="Belum ada acara" description="Belum ada agenda atau acara yang dijadwalkan saat ini. Silakan kembali lagi nanti." />
      ) : (
        categories.map((categoryName) => {
        const matchedEvents = events.filter((e) => e.status === categoryName)
        return (
          <div key={categoryName} className="mb-12">
            <div className="flex items-center space-x-3 mb-6">
              <span className="h-6 w-1.5 bg-emerald-600 rounded-full" />
              <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">{categoryName}</h2>
              <span className="text-xs bg-slate-200 text-slate-700 px-2 py-0.5 rounded-full font-bold">{matchedEvents.length}</span>
            </div>

            {matchedEvents.length === 0 ? (
              <div className="p-8 text-center bg-white border border-slate-200/60 rounded-2xl text-slate-400 text-sm">
                Tidak ada kegiatan dalam kategori ini sementara waktu.
              </div>
            ) : (
              <div className="grid md:grid-cols-3 gap-6">
                {matchedEvents.map((evt) => (
                  <div key={evt.id} className="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
                    <div>
                      <div className="relative h-44 overflow-hidden">
                        {evt.image ? (
                          <img src={evt.image} alt={evt.title} className="w-full h-full object-cover" />
                        ) : (
                          <ImagePlaceholder label="Poster Acara" className="w-full h-full" />
                        )}
                        <span className={`absolute top-4 left-4 text-white text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-widest ${statusColors[evt.status] || "bg-slate-500"}`}>{evt.status}</span>
                      </div>
                      <div className="p-5">
                        <div className="space-y-1 text-slate-400 text-xs mb-3">
                          <p className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {evt.date}
                          </p>
                          <p className="flex items-center gap-1">
                            <MapPin className="w-3 h-3" />
                            {evt.location}
                          </p>
                        </div>
                        <Link href={`/event/${evt.slug}`}>
                          <h3 className="font-bold text-base text-slate-900 line-clamp-2 hover:text-emerald-700 transition-colors cursor-pointer">
                            {evt.title}
                          </h3>
                        </Link>
                        <p className="text-slate-500 text-xs sm:text-sm mt-2 line-clamp-2">{evt.description}</p>
                      </div>
                    </div>
                    <div className="px-5 pb-5">
                      <Link
                        href={`/event/${evt.slug}`}
                        className="block w-full text-center py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-all"
                      >
                        Lihat Detail Acara
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            )}
            </div>
          )
        })
      )}
    </div>
  )
}
