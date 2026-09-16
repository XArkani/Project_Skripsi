import { Suspense } from "react"
import { cacheTag } from "next/cache"
import { getBlueprints } from "@/lib/faculty"
import EmptyState from "@/components/shared/EmptyState"
import BlueprintList from "@/components/sections/BlueprintList"

export default async function BlueprintPage() {
  "use cache"
  cacheTag("blueprint")

  const blueprints = await getBlueprints()

  return (
    <div className="max-w-7xl mx-auto page-gutter pt-20 sm:pt-28 pb-16 sm:pb-24">
      <div className="pb-8 mb-6">
        <span className="text-xs uppercase font-extrabold text-emerald-700 dark:text-emerald-400 tracking-wider">
          Infrastruktur Kampus
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-foreground mt-1.5">Fasilitas & Sarana Prasarana</h1>
        <p className="text-muted-foreground text-sm sm:text-base mt-2 max-w-2xl leading-relaxed">
          Gedung, laboratorium, dan fasilitas pendukung Fakultas Teknik Universitas Hamzanwadi.
          Jelajahi sarana yang menunjang kegiatan belajar dan riset.
        </p>
      </div>

      {blueprints.length === 0 ? (
        <EmptyState title="Belum ada fasilitas" description="Belum ada data fasilitas kampus yang tersedia saat ini." />
      ) : (
        <Suspense fallback={<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5" aria-hidden="true">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="animate-pulse rounded-2xl border border-border bg-background overflow-hidden">
              <div className="aspect-video bg-muted" />
              <div className="p-5 space-y-3">
                <div className="h-5 w-3/4 bg-muted rounded" />
                <div className="h-4 w-full bg-muted rounded" />
              </div>
            </div>
          ))}
        </div>}>
          <BlueprintList items={blueprints} />
        </Suspense>
      )}
    </div>
  )
}
