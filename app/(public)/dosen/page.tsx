import { cacheTag } from "next/cache"
import { getDosen } from "@/lib/faculty"
import EmptyState from "@/components/shared/EmptyState"
import DosenGrid from "@/components/sections/DosenGrid"

export default async function DosenPage() {
  "use cache"
  cacheTag("dosen")

  const dosenList = await getDosen()

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 sm:pt-28">
      <div className="border-b border-slate-200 pb-6 mb-10 text-center md:text-left">
        <span className="text-xs uppercase font-extrabold text-emerald-700 tracking-wider">Kekuatan Pengajaran</span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-950 mt-1">Profil & Kepakaran Dosen</h1>
        <p className="text-slate-500 text-sm sm:text-base mt-2">Direktori resmi akademisi dan peneliti di lingkungan Fakultas Teknik Universitas Hamzanwadi.</p>
      </div>

      {dosenList.length === 0 ? (
        <EmptyState title="Belum ada data dosen" description="Belum ada data dosen yang tersedia saat ini. Silakan kembali lagi nanti." />
      ) : (
        <DosenGrid items={dosenList} />
      )}
    </div>
  )
}
