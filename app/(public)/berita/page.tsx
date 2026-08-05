import { cacheTag } from "next/cache"
import Link from "next/link"
import { getNews } from "@/lib/faculty"
import { Calendar } from "lucide-react"
import EmptyState from "@/components/shared/EmptyState"
import ImagePlaceholder from "@/components/shared/ImagePlaceholder"

export default async function BeritaPage() {
  "use cache"
  cacheTag("news")

  const news = await getNews()

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 sm:pt-28">
      <div className="border-b border-slate-200 pb-6 mb-10 text-center md:text-left">
        <span className="text-xs uppercase font-extrabold text-emerald-700 tracking-wider">Warta Kampus</span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-950 mt-1">Berita, Publikasi & Berkas</h1>
        <p className="text-slate-500 text-sm sm:text-base mt-2">Dapatkan kabar pembaruan regulasi dekanat, prestasi mahasiswa, dan artikel sains terpopuler.</p>
      </div>

      {news.length === 0 ? (
        <EmptyState title="Belum ada berita" description="Belum ada berita yang dipublikasikan saat ini. Silakan kembali lagi nanti." />
      ) : (
        <div className="grid md:grid-cols-3 gap-8">
          {news.map((article) => (
            <article key={article.id} className="group bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-sm flex flex-col justify-between">
              <div>
                <div className="relative h-48 overflow-hidden bg-slate-100">
                  {article.image ? (
                    <img src={article.image} alt={article.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  ) : (
                    <ImagePlaceholder label="Gambar Berita" className="w-full h-full" />
                  )}
                </div>
              <div className="p-6">
                <span className="text-slate-400 text-xs font-semibold block mb-2 inline-flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  {article.date}
                </span>
                <Link href={`/berita/${article.slug}`}>
                  <h3 className="font-bold text-lg text-slate-900 hover:text-emerald-700 transition-colors line-clamp-2 cursor-pointer">
                    {article.title}
                  </h3>
                </Link>
                <p className="text-slate-500 text-sm mt-3 line-clamp-3 leading-relaxed">{article.excerpt}</p>
              </div>
            </div>
            <div className="px-6 pb-6 pt-2">
              <Link
                href={`/berita/${article.slug}`}
                className="block w-full text-center py-2.5 rounded-lg border border-slate-200 hover:bg-emerald-50 hover:text-emerald-800 hover:border-emerald-200 text-slate-700 text-xs font-bold transition-all"
              >
                Baca Berita Lengkap
              </Link>
            </div>
          </article>
        ))}
        </div>
      )}

      {news.length > 0 && (
      <div className="mt-12 flex items-center justify-center space-x-2">
        <span className="px-4 py-2 rounded-lg border border-slate-200 text-xs font-bold text-slate-400 cursor-not-allowed">Sebelumnya</span>
        <span className="px-4 py-2 rounded-lg bg-emerald-600 text-white text-xs font-bold shadow-md">1</span>
        <span className="px-4 py-2 rounded-lg border border-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-100 cursor-pointer">2</span>
        <span className="px-4 py-2 rounded-lg border border-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-100 cursor-pointer">Selanjutnya</span>
      </div>
      )}
    </div>
  )
}
