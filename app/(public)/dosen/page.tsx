import { cacheTag } from "next/cache"
import { getDosen } from "@/lib/faculty"
import EmptyState from "@/components/shared/EmptyState"
import DosenGrid from "@/components/sections/DosenGrid"

export default async function DosenPage() {
  "use cache"
  cacheTag("dosen")

  const dosenList = await getDosen()

  return (
    <div className="max-w-7xl mx-auto page-gutter pt-20 sm:pt-28 pb-16 sm:pb-24">
      <div className="pb-8 mb-6">
        <span className="text-xs uppercase font-extrabold text-emerald-700 dark:text-emerald-400 tracking-wider">
          Kepegawaian & Riset
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-foreground mt-1.5">Profil Dosen & Kepakaran</h1>
        <p className="text-muted-foreground text-sm sm:text-base mt-2 max-w-2xl leading-relaxed">
          Direktori akademisi dan peneliti Fakultas Teknik Universitas Hamzanwadi. Cari dosen
          berdasarkan nama, program studi, atau bidang riset.
        </p>
      </div>

      {dosenList.length === 0 ? (
        <EmptyState title="Belum ada data dosen" description="Belum ada data dosen yang tersedia saat ini. Silakan kembali lagi nanti." />
      ) : (
        <DosenGrid items={dosenList} />
      )}
    </div>
  )
}