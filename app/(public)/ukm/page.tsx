import { cacheTag } from "next/cache"
import { getUKM } from "@/lib/faculty"
import EmptyState from "@/components/shared/EmptyState"
import UkmGrid from "@/components/sections/UkmGrid"

export default async function UKMPage() {
  "use cache"
  cacheTag("ukm")

  const ukmList = await getUKM()

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="border-b border-slate-200 pb-6 mb-10 text-center md:text-left">
        <span className="text-xs uppercase font-extrabold text-emerald-700 tracking-wider">Kehidupan Kemahasiswaan</span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-950 mt-1">Unit Kegiatan Mahasiswa</h1>
        <p className="text-slate-500 text-sm sm:text-base mt-2">Salurkan bakat, perluas jaringan perkawanan, dan kembangkan karya nyata keteknikan di luar perkuliahan.</p>
      </div>

      {ukmList.length === 0 ? (
        <EmptyState title="Belum ada UKM" description="Belum ada unit kegiatan mahasiswa yang terdaftar saat ini." />
      ) : (
        <UkmGrid items={ukmList} />
      )}
    </div>
  )
}
