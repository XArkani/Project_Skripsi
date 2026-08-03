import { cacheTag } from "next/cache"
import Link from "next/link"
import { getUKM } from "@/lib/faculty"
import EmptyState from "@/components/shared/EmptyState"

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
        <div className="grid md:grid-cols-3 gap-8">
          {ukmList.map((ukm) => (
          <div key={ukm.id} className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex flex-col justify-between">
            <div>
              <div className="w-14 h-14 rounded-2xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-3xl mb-5 shadow-sm">
                <span>{ukm.logo}</span>
              </div>
              <h2 className="font-extrabold text-xl text-slate-900 mb-3">{ukm.name}</h2>
              <p className="text-slate-600 text-sm mb-4 leading-relaxed">{ukm.description}</p>

              <div className="space-y-3 pt-3 border-t border-slate-100">
                <div>
                  <span className="block text-[10px] uppercase font-bold text-slate-400">Ragam Kegiatan</span>
                  <p className="text-xs text-slate-700 mt-1">{ukm.activities}</p>
                </div>
                <div>
                  <span className="block text-[10px] uppercase font-bold text-slate-400">Kontak Resmi</span>
                  <p className="text-xs text-emerald-800 font-semibold mt-1">{ukm.contact}</p>
                </div>
              </div>
            </div>

            <div className="pt-6 mt-4">
              <Link
                href="/hubungi"
                className="block w-full text-center py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-all"
              >
                Daftar Ormawa Ini
              </Link>
            </div>
          </div>
          ))}
        </div>
      )}
    </div>
  )
}
