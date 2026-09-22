import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import type { Blueprint } from "@/lib/types"
import Container from "@/components/ui/container"
import SectionHeading from "@/components/ui/section-heading"
import ImagePlaceholder from "@/components/shared/ImagePlaceholder"
import MobileCarousel from "@/components/shared/MobileCarousel"
import ScrollReveal from "@/components/shared/ScrollReveal"

function isStockImage(src: string) {
  try {
    return new URL(src).hostname.includes("unsplash")
  } catch {
    return false
  }
}

function FacilityMedia({
  src,
  alt,
  sizes,
}: {
  src: string
  alt: string
  sizes: string
}) {
  if (src && !isStockImage(src)) {
    return (
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        className="object-cover object-center"
        loading="lazy"
      />
    )
  }
  return <ImagePlaceholder label={alt || "Foto belum tersedia"} className="h-full w-full" />
}

function FacilityMediaCompact({ src, alt }: { src: string; alt: string }) {
  if (src && !isStockImage(src)) {
    return (
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(max-width: 768px) 84vw, (max-width: 1024px) 50vw, 25vw"
        className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
        loading="lazy"
      />
    )
  }
  return <ImagePlaceholder label={alt || "Foto belum tersedia"} className="h-full w-full" compact />
}

export default function BlueprintPreview({ items }: { items: Blueprint[] }) {
  const [featured, ...rest] = items
  const grid = rest.slice(0, 4)

  if (!featured) return null

  return (
    <section className="section-y section-lazy bg-background">
      <Container>
        <ScrollReveal>
          <SectionHeading
          title="Blueprint & Fasilitas"
          description="Ruang untuk belajar, bereksperimen, dan berinovasi."
          action={{ label: "Lihat Semua Fasilitas", href: "/blueprint" }}
        />

        <article className="mt-10 grid overflow-hidden rounded-[20px] border border-border bg-muted lg:grid-cols-2">
          <div className="relative aspect-[4/3] min-h-[260px] overflow-hidden sm:aspect-auto sm:min-h-[320px]">
            <FacilityMedia
              src={featured.image}
              alt={featured.title}
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            <span className="absolute left-4 top-4 max-w-[calc(100%-2rem)] truncate rounded-full border border-white/20 bg-black/30 px-3 py-1 text-xs font-bold uppercase tracking-wider text-emerald-100 backdrop-blur-sm">
              {featured.category}
            </span>
          </div>
          <div className="flex flex-col justify-center p-6 sm:p-10">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-emerald-700 dark:text-emerald-300">
              Fasilitas Unggulan
            </p>
            <h3 className="mt-3 text-2xl font-bold leading-snug tracking-[-0.01em] text-foreground sm:text-3xl">
              {featured.title}
            </h3>
            <p className="mt-4 leading-relaxed text-muted-foreground">{featured.description}</p>
            {featured.details && (
              <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-muted-foreground">{featured.details}</p>
            )}
            <Link
              href="/blueprint"
              className="group mt-6 inline-flex min-h-11 items-center gap-1.5 text-sm font-semibold text-emerald-700 hover:text-emerald-800 dark:text-emerald-300 dark:hover:text-emerald-200"
            >
              Jelajahi Fasilitas
              <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" aria-hidden="true" />
            </Link>
          </div>
        </article>

        {grid.length > 0 && (
          <MobileCarousel
            label="Fasilitas"
            count={grid.length}
            className="mt-10"
            rowClassName="max-md:mx-[calc(-1*var(--page-gutter))] max-md:flex max-md:snap-x max-md:snap-mandatory max-md:scroll-px-(--page-gutter) max-md:gap-4 max-md:overflow-x-auto max-md:overscroll-x-contain max-md:scroll-smooth max-md:px-(--page-gutter) max-md:scrollbar-none max-md:pb-2 md:grid md:grid-cols-2 md:gap-5 lg:grid-cols-4"
          >
            {grid.map((item) => (
              <Link
                key={item.id}
                href="/blueprint"
                className="group overflow-hidden rounded-2xl border border-border bg-card transition-all duration-300 hover:-translate-y-1 hover:border-emerald-200 hover:shadow-[0_8px_24px_rgba(2,6,23,0.06)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600 max-md:w-[84vw] max-md:max-w-[340px] max-md:shrink-0 max-md:snap-start"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <FacilityMediaCompact src={item.image} alt={item.title} />
                </div>
                <div className="p-4">
                  <p className="text-xs font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-300">
                    {item.category}
                  </p>
                  <h3 className="mt-1 line-clamp-2 text-base font-semibold text-foreground group-hover:text-emerald-800 dark:group-hover:text-emerald-300">
                    {item.title}
                  </h3>
                  <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">{item.description}</p>
                </div>
              </Link>
            ))}
          </MobileCarousel>
        )}
      </ScrollReveal>
      </Container>
    </section>
  )
}