import { cacheTag } from "next/cache"
import { getEvents } from "@/lib/faculty"
import EmptyState from "@/components/shared/EmptyState"
import EventList from "@/components/sections/EventList"

export default async function EventPage() {
  "use cache"
  cacheTag("event")

  const events = await getEvents()

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 sm:pt-28 pb-16 sm:pb-24">
      <div className="pb-8 mb-6">
        <span className="text-xs uppercase font-extrabold text-emerald-700 tracking-wider">
          Kalender Akademik
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-foreground mt-1.5">Agenda & Event Teknik</h1>
        <p className="text-muted-foreground text-sm sm:text-base mt-2 max-w-2xl leading-relaxed">
          Seminar, pelatihan, loka karya, dan konferensi yang kami selenggarakan. Cari berdasarkan
          kata kunci atau saring berdasarkan status acara.
        </p>
      </div>

      {events.length === 0 ? (
        <EmptyState title="Belum ada acara" description="Belum ada agenda atau acara yang dijadwalkan saat ini. Silakan kembali lagi nanti." />
      ) : (
        <EventList events={events} />
      )}
    </div>
  )
}