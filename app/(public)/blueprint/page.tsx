import { cacheTag } from "next/cache"
import { getBlueprints } from "@/lib/faculty"
import EmptyState from "@/components/shared/EmptyState"
import Breadcrumbs from "@/components/shared/Breadcrumbs"
import BlueprintList from "@/components/sections/BlueprintList"

export default async function BlueprintPage() {
  "use cache"
  cacheTag("blueprint")

  const blueprints = await getBlueprints()

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 sm:pt-28 pb-24">
      <Breadcrumbs items={[{ label: "Beranda", href: "/" }, { label: "Blueprint Fakultas" }]} />

      <div className="flex flex-wrap items-end justify-between gap-4 border-b border-slate-200 pb-6 mb-10">
        <div>
          <span className="text-xs uppercase font-extrabold text-emerald-700 tracking-wider">Infrastruktur Kampus</span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-950 mt-1">Blueprint & Sarana Prasarana</h1>
          <p className="text-slate-500 text-sm sm:text-base mt-2 max-w-2xl">Pengembangan tata ruang masa depan untuk menunjang kegiatan pembelajaran yang futuristik.</p>
        </div>
      </div>

      {blueprints.length === 0 ? (
        <EmptyState title="Belum ada fasilitas" description="Belum ada data fasilitas kampus yang tersedia saat ini." />
      ) : (
        <BlueprintList items={blueprints} />
      )}
    </div>
  )
}
