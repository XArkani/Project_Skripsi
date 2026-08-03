import { cacheTag } from "next/cache"
import { getDosen } from "@/lib/faculty"
import { Mail } from "lucide-react"
import EmptyState from "@/components/shared/EmptyState"
import ImagePlaceholder from "@/components/shared/ImagePlaceholder"

export default async function DosenPage() {
  "use cache"
  cacheTag("dosen")

  const dosenList = await getDosen()

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="border-b border-slate-200 pb-6 mb-10 text-center md:text-left">
        <span className="text-xs uppercase font-extrabold text-emerald-700 tracking-wider">Kekuatan Pengajaran</span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-950 mt-1">Profil & Kepakaran Dosen</h1>
        <p className="text-slate-500 text-sm sm:text-base mt-2">Direktori resmi akademisi dan peneliti di lingkungan Fakultas Teknik Universitas Hamzanwadi.</p>
      </div>

      {dosenList.length === 0 ? (
        <EmptyState title="Belum ada data dosen" description="Belum ada data dosen yang tersedia saat ini. Silakan kembali lagi nanti." />
      ) : (
        <div className="grid md:grid-cols-2 gap-8">
          {dosenList.map((dosen) => (
            <div key={dosen.id} className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex flex-col sm:flex-row items-center sm:items-start gap-6">
              <div className="w-28 h-28 rounded-xl overflow-hidden border border-slate-200 shadow-sm flex-shrink-0">
                {dosen.image ? (
                  <img src={dosen.image} alt={dosen.name} className="w-full h-full object-cover" />
                ) : (
                  <ImagePlaceholder label="Foto" className="w-full h-full" />
                )}
              </div>

            <div className="space-y-2 flex-grow text-center sm:text-left">
              <h3 className="font-extrabold text-lg text-slate-900 leading-snug">{dosen.name}</h3>
              <div className="space-y-1">
                <p className="text-emerald-700 text-xs font-bold">{dosen.title}</p>
                <p className="text-slate-400 text-xs font-medium">{dosen.position}</p>
              </div>

              <div className="pt-2 border-t border-slate-100 text-left">
                <span className="block text-[9px] uppercase font-bold text-slate-400 tracking-wider">Kepakaran Utama</span>
                <p className="text-xs text-slate-700 font-semibold mt-0.5">{dosen.expertise}</p>
              </div>

              <div className="text-left">
                <span className="block text-[9px] uppercase font-bold text-slate-400 tracking-wider">Topik Riset Aktif</span>
                <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">{dosen.interest}</p>
              </div>

              <div className="pt-2 text-left">
                <span className="inline-flex items-center gap-1 text-[11px] text-emerald-700 font-bold bg-emerald-50 px-2.5 py-1 rounded-md">
                  <Mail className="w-3 h-3" />
                  {dosen.email}
                </span>
              </div>
            </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
