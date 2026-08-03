import { cacheTag } from "next/cache"
import { getBlueprints } from "@/lib/faculty"
import EmptyState from "@/components/shared/EmptyState"
import BlueprintList from "@/components/sections/BlueprintList"

export default async function BlueprintPage() {
  "use cache"
  cacheTag("blueprint")

  const blueprints = await getBlueprints()

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="border-b border-slate-200 pb-6 mb-10 text-center md:text-left">
        <span className="text-xs uppercase font-extrabold text-emerald-700 tracking-wider">Infrastruktur Kampus</span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-950 mt-1">Blueprint & Sarana Prasarana</h1>
        <p className="text-slate-500 text-sm sm:text-base mt-2">Pengembangan tata ruang masa depan untuk menunjang kegiatan pembelajaran yang futuristik.</p>
      </div>

      {blueprints.length === 0 ? (
        <EmptyState title="Belum ada fasilitas" description="Belum ada data fasilitas kampus yang tersedia saat ini." />
      ) : (
        <BlueprintList items={blueprints} />
      )}
    </div>
  )
}
