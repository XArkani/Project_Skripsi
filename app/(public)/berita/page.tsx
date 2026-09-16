import { cacheTag } from "next/cache"
import { getNews } from "@/lib/faculty"
import EmptyState from "@/components/shared/EmptyState"
import NewsList from "@/components/sections/NewsList"

export default async function BeritaPage() {
  "use cache"
  cacheTag("news")

  const news = await getNews()

  return (
    <div className="max-w-7xl mx-auto page-gutter pt-20 sm:pt-28 pb-16 sm:pb-24">
      <div className="pb-8 mb-6">
        <span className="text-xs uppercase font-extrabold text-emerald-700 dark:text-emerald-400 tracking-wider">
          Warta Kampus
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-foreground mt-1.5">Berita, Publikasi & Berkas</h1>
        <p className="text-muted-foreground text-sm sm:text-base mt-2 max-w-2xl leading-relaxed">
          Dapatkan kabar pembaruan regulasi dekanat, prestasi mahasiswa, dan artikel sains terpopuler.
        </p>
      </div>

      {news.length === 0 ? (
        <EmptyState title="Belum ada berita" description="Belum ada berita yang dipublikasikan saat ini. Silakan kembali lagi nanti." />
      ) : (
        <NewsList items={news} />
      )}
    </div>
  )
}
