import { Suspense } from "react"
import { cacheTag } from "next/cache"
import { getStruktur } from "@/lib/faculty"
import EmptyState from "@/components/shared/EmptyState"
import StrukturChart from "@/components/sections/StrukturChart"

async function StrukturContent() {
  "use cache"
  cacheTag("struktur")
  const struktur = await getStruktur()
  if (struktur.length === 0) {
    return <EmptyState title="Belum ada data struktur" description="Belum ada data struktur organisasi yang tersedia saat ini." />
  }
  return <StrukturChart items={struktur} />
}

function StrukturFallback() {
  return <div className="animate-pulse h-96 bg-muted rounded-2xl" aria-hidden="true" />
}

export default function StrukturPage() {
  return (
    <div className="max-w-7xl mx-auto page-gutter pt-20 sm:pt-28 pb-16 sm:pb-24">
      <div className="pb-8 mb-6">
        <span className="text-xs uppercase font-extrabold text-emerald-700 dark:text-emerald-400 tracking-wider">Tata Pamong</span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-foreground mt-1.5">Struktur Organisasi</h1>
        <p className="text-muted-foreground text-sm sm:text-base mt-2 max-w-2xl leading-relaxed">
          Bagan kepemimpinan, koordinasi struktural, dan penanggung jawab mutu Fakultas Teknik.
        </p>
      </div>
      <Suspense fallback={<StrukturFallback />}>
        <StrukturContent />
      </Suspense>
    </div>
  )
}
