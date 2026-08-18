import { cacheTag } from "next/cache"
import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { getNewsBySlug, getNews } from "@/lib/faculty"
import { Calendar, ArrowLeft } from "lucide-react"
import EmptyState from "@/components/shared/EmptyState"
import ImagePlaceholder from "@/components/shared/ImagePlaceholder"

export async function generateStaticParams() {
  const news = await getNews()
  return news.map((article) => ({ slug: article.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const article = await getNewsBySlug(slug)
  if (!article) return { title: "Berita tidak ditemukan" }
  return {
    title: `${article.title} | Berita`,
    description: article.excerpt,
  }
}

export default async function BeritaDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  "use cache"
  const { slug } = await params
  cacheTag(`news-${slug}`)

  const article = await getNewsBySlug(slug)
  if (!article) notFound()

  const news = await getNews()
  const related = news.filter((n) => n.slug !== article.slug).slice(0, 2)

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-24 sm:pt-28 pb-16 sm:pb-24">
      <div className="text-xs text-slate-400 mb-6 flex items-center space-x-2">
        <Link href="/" className="hover:text-emerald-700">Beranda</Link>
        <span>/</span>
        <Link href="/berita" className="hover:text-emerald-700">Berita</Link>
        <span>/</span>
        <span className="text-slate-600 truncate">{article.title}</span>
      </div>

      <Link href="/berita" className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-emerald-700 mb-6">
        <ArrowLeft className="w-3.5 h-3.5" />
        Kembali ke Daftar Berita
      </Link>

      <div className="bg-white rounded-3xl overflow-hidden border border-slate-200/80 shadow-sm p-6 sm:p-10">
        <div className="space-y-4 mb-6">
          <span className="text-xs text-emerald-800 font-extrabold bg-emerald-50 px-3 py-1 rounded-md">Warta Fakultas</span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 leading-tight">{article.title}</h1>
          <div className="flex items-center space-x-3 text-slate-400 text-xs">
            <span className="inline-flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              {article.date}
            </span>
            <span>•</span>
            <span>Oleh: Humas Fakultas Teknik</span>
          </div>
        </div>

        <div className="rounded-2xl overflow-hidden mb-8 aspect-video">
          {article.image ? (
            <img src={article.image} alt={article.title} className="w-full h-full object-cover" />
          ) : (
            <ImagePlaceholder label="Gambar Berita" className="w-full h-full" />
          )}
        </div>

        <div className="prose max-w-none text-slate-600 text-sm sm:text-base leading-relaxed space-y-6 whitespace-pre-line">
          {article.content}
        </div>
      </div>

      {related.length > 0 && (
        <div className="mt-12 space-y-6">
          <h3 className="font-extrabold text-lg text-slate-900">Kabar Terkait Lainnya</h3>
          <div className="grid sm:grid-cols-2 gap-6">
            {related.map((item) => (
              <Link
                key={item.id}
                href={`/berita/${item.slug}`}
                className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm hover:border-emerald-300 transition-colors flex flex-col justify-between"
              >
                <div>
                  <span className="text-[10px] text-slate-400 font-bold block mb-1">{item.date}</span>
                  <h4 className="font-bold text-slate-800 text-sm line-clamp-2">{item.title}</h4>
                </div>
                <span className="text-emerald-700 text-xs font-bold mt-4 block">Baca Berita →</span>
              </Link>
            ))}
          </div>
        </div>
      )}

      {news.length === 0 && (
        <div className="mt-12">
          <EmptyState title="Belum ada berita" description="Belum ada berita yang dipublikasikan saat ini." />
        </div>
      )}
    </div>
  )
}
