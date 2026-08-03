import { cacheTag } from "next/cache"
import { getStruktur } from "@/lib/faculty"

export default async function StrukturPage() {
  "use cache"
  cacheTag("struktur")

  const struktur = await getStruktur()

  const dekan = struktur.find((s) => s.role.includes("Dekan") && s.parentId === null)
  const wakilDekan = struktur.filter((s) => s.role.includes("Wakil Dekan"))
  const kaprodi = struktur.filter((s) => s.role.includes("Ketua Program Studi"))

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="border-b border-slate-200 pb-6 mb-10 text-center md:text-left">
        <span className="text-xs uppercase font-extrabold text-emerald-700 tracking-wider">Tata Pamong</span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-950 mt-1">Struktur Organisasi</h1>
        <p className="text-slate-500 text-sm sm:text-base mt-2">Bagan kepemimpinan, koordinasi struktural, dan penanggung jawab mutu Fakultas Teknik.</p>
      </div>

      <div className="space-y-12">
        {dekan && (
          <div className="flex justify-center">
            <div className="bg-emerald-900 text-white p-6 rounded-2xl border border-emerald-700 shadow-md max-w-md w-full text-center">
              <span className="bg-emerald-700 text-emerald-100 text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">Dekanat Utama</span>
              <h3 className="font-bold text-lg mt-3">{dekan.name}</h3>
              <p className="text-slate-300 text-xs sm:text-sm mt-1">{dekan.role}</p>
              <p className="text-slate-400 text-[11px] mt-2 italic">{dekan.details}</p>
            </div>
          </div>
        )}

        <div className="flex justify-center -my-12">
          <div className="h-12 w-0.5 bg-emerald-800" />
        </div>

        {wakilDekan.length > 0 && (
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {wakilDekan.map((wd) => (
              <div key={wd.id} className="bg-white p-6 rounded-2xl border-2 border-emerald-500 shadow-sm text-center">
                <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
                  {wd.role.replace("Wakil Dekan ", "").replace("Bidang ", "").trim()}
                </span>
                <h3 className="font-bold text-slate-900 text-base mt-3">{wd.name}</h3>
                <p className="text-slate-500 text-xs">{wd.role}</p>
                <p className="text-slate-400 text-[11px] mt-2">{wd.details}</p>
              </div>
            ))}
          </div>
        )}

        {kaprodi.length > 0 && (
          <div className="bg-slate-50 p-6 sm:p-10 rounded-2xl border border-slate-200 text-center">
            <h3 className="font-extrabold text-slate-900 mb-6">Program Studi Di Bawah Naungan</h3>
            <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
              {kaprodi.map((kp) => (
                <div key={kp.id} className="bg-white p-5 rounded-xl border border-slate-150 text-left space-y-2">
                  <span className="text-emerald-700 font-bold text-xs block">
                    {kp.role.includes("Informatika") ? "PRODI INFORMATIKA" : "PRODI TEKNIK INDUSTRI"}
                  </span>
                  <h4 className="font-bold text-slate-800 text-sm sm:text-base">{kp.name}</h4>
                  <p className="text-slate-400 text-xs">{kp.role}</p>
                  <p className="text-slate-500 text-xs">{kp.details}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
