import { cacheTag } from "next/cache"
import Link from "next/link"
import { getBlueprints } from "@/lib/faculty"
import EmptyState from "@/components/shared/EmptyState"
import ImagePlaceholder from "@/components/shared/ImagePlaceholder"

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
        <div className="space-y-16">
          {blueprints.map((bp, idx) => (
            <div key={bp.id} className="grid md:grid-cols-12 gap-8 items-center">
              <div className={`md:col-span-6 ${idx % 2 === 1 ? "md:order-2" : ""}`}>
                <div className="relative rounded-2xl overflow-hidden shadow-lg aspect-video">
                  {bp.image ? (
                    <img src={bp.image} alt={bp.title} className="w-full h-full object-cover" />
                  ) : (
                    <ImagePlaceholder label="Gambar Fasilitas" className="w-full h-full" />
                  )}
                  <span className="absolute bottom-4 right-4 bg-emerald-900/90 text-white text-xs font-bold px-3 py-1.5 rounded-md uppercase tracking-wider backdrop-blur-sm">{bp.category}</span>
                </div>
              </div>

            <div className="md:col-span-6 space-y-4">
              <h2 className="text-2xl font-bold text-slate-900">{bp.title}</h2>
              <p className="text-slate-600 font-medium leading-relaxed">{bp.description}</p>
              <p className="text-slate-500 text-sm leading-relaxed">{bp.details}</p>
              <div className="pt-2">
                <Link
                  href="/hubungi"
                  className="inline-block bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-xs font-bold px-4 py-2.5 rounded-lg border border-emerald-200 transition-colors"
                >
                  Ajukan Kunjungan Kampus
                </Link>
              </div>
            </div>
          </div>
        ))}
        </div>
      )}
    </div>
  )
}
