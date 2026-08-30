import { cacheTag } from "next/cache"
import { getUKM } from "@/lib/faculty"
import EmptyState from "@/components/shared/EmptyState"
import UkmGrid from "@/components/sections/UkmGrid"

export default async function UKMPage() {
  "use cache"
  cacheTag("ukm")

  const ukmList = await getUKM()

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 sm:pt-28 pb-16 sm:pb-24">
      <div className="pb-8 mb-6">
        <span className="text-xs uppercase font-extrabold text-emerald-700 tracking-wider">
          Kehidupan Kemahasiswaan
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-foreground mt-1.5">Unit Kegiatan Mahasiswa</h1>
        <p className="text-muted-foreground text-sm sm:text-base mt-2 max-w-2xl leading-relaxed">
          Salurkan bakat, perluas jaringan perkawanan, dan kembangkan karya nyata keteknikan di luar
          perkuliahan. Temukan komunitasmu dan terhubung langsung dengan komunikasinya.
        </p>
      </div>

      {ukmList.length === 0 ? (
        <EmptyState title="Belum ada UKM" description="Belum ada unit kegiatan mahasiswa yang terdaftar saat ini." />
      ) : (
        <UkmGrid items={ukmList} />
      )}
    </div>
  )
}
