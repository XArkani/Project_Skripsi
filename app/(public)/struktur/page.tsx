import { cacheTag } from "next/cache"
import { getStruktur } from "@/lib/faculty"
import EmptyState from "@/components/shared/EmptyState"
import StrukturChart from "@/components/sections/StrukturChart"

export default async function StrukturPage() {
  "use cache"
  cacheTag("struktur")

  const struktur = await getStruktur()

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 sm:pt-28 pb-16 sm:pb-24">
      <div className="pb-8 mb-6">
        <span className="text-xs uppercase font-extrabold text-emerald-700 tracking-wider">
          Tata Pamong
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-foreground mt-1.5">Struktur Organisasi</h1>
        <p className="text-muted-foreground text-sm sm:text-base mt-2 max-w-2xl leading-relaxed">
          Bagan kepemimpinan, koordinasi struktural, dan penanggung jawab mutu Fakultas Teknik.
        </p>
      </div>

      {struktur.length === 0 ? (
        <EmptyState title="Belum ada data struktur" description="Belum ada data struktur organisasi yang tersedia saat ini." />
      ) : (
        <StrukturChart items={struktur} />
      )}
    </div>
  )
}
