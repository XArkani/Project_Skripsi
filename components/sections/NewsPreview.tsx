import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import type { News } from "@/lib/types"
import Container from "@/components/ui/container"
import SectionHeading from "@/components/ui/section-heading"
import ImagePlaceholder from "@/components/shared/ImagePlaceholder"
import ScrollReveal from "@/components/shared/ScrollReveal"

function isStockImage(src: string) {
  try {
    return new URL(src).hostname.includes("unsplash")
  } catch {
    return false
  }
}

export default function NewsPreview({ items }: { items: News[] }) {
  const [featured, ...rest] = items
  const secondary = rest.slice(0, 2)

  if (!featured) return null

  return (
    <section className="section-y section-lazy bg-muted">
      <Container>
        <ScrollReveal>
          <SectionHeading
            title="Berita Terbaru"
            description="Kabar prestasi, kegiatan, dan informasi penting dari dekanat."
            action={{ label: "Lihat Semua Berita", href: "/berita" }}
          />
        </ScrollReveal>

        <ScrollReveal delay={120}>
          <div className="mt-10 grid gap-10 lg:grid-cols-3">
          <Link
            href={`/berita/${featured.slug}`}
            className="group lg:col-span-2 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600"
          >
            <div className="relative aspect-[16/10] overflow-hidden rounded-[20px] bg-muted">
              {featured.image && !isStockImage(featured.image) ? (
                <Image
                  src={featured.image}
                  alt={featured.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 66vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
              ) : (
                <ImagePlaceholder label={featured.title} className="h-full w-full" />
              )}
            </div>
            <div className="mt-5 max-w-2xl">
              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                {featured.date}
              </p>
              <h3 className="mt-2 line-clamp-2 text-2xl font-bold leading-snug tracking-[-0.01em] text-foreground group-hover:text-emerald-800 dark:group-hover:text-emerald-300 sm:text-3xl">
                {featured.title}
              </h3>
              <p className="mt-3 line-clamp-3 leading-relaxed text-muted-foreground">{featured.excerpt}</p>
              <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-emerald-700 group-hover:text-emerald-800 dark:text-emerald-300 dark:group-hover:text-emerald-200">
                Baca Berita
                <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" aria-hidden="true" />
              </span>
            </div>
          </Link>

          <div className="flex flex-col divide-y divide-border border-y border-border">
            {secondary.length === 0 && (
              <p className="py-8 text-sm text-muted-foreground">Belum ada berita lainnya.</p>
            )}
            {secondary.map((n) => (
              <Link
                key={n.id}
                href={`/berita/${n.slug}`}
                className="group flex flex-col gap-3 py-6 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600"
              >
                <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{n.date}</p>
                <h3 className="line-clamp-2 text-base font-bold leading-snug text-foreground group-hover:text-emerald-800 dark:group-hover:text-emerald-300">
                  {n.title}
                </h3>
                <p className="line-clamp-2 text-sm leading-relaxed text-muted-foreground">{n.excerpt}</p>
              </Link>
            ))}
          </div>
        </div>
        </ScrollReveal>
      </Container>
    </section>
  )
}