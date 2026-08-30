import Link from "next/link"
import { ArrowRight } from "lucide-react"
import type { Blueprint } from "@/lib/types"
import Container from "@/components/ui/container"
import SectionHeading from "@/components/ui/section-heading"
import ImagePlaceholder from "@/components/shared/ImagePlaceholder"
import ScrollReveal from "@/components/shared/ScrollReveal"

export default function BlueprintPreview({ items }: { items: Blueprint[] }) {
  const [featured, ...rest] = items
  const grid = rest.slice(0, 4)

  if (!featured) return null

  return (
    <section className="bg-white py-16 sm:py-24">
      <Container>
        <ScrollReveal>
          <SectionHeading
          title="Blueprint & Fasilitas"
          description="Ruang untuk belajar, bereksperimen, dan berinovasi."
          action={{ label: "Lihat Semua Fasilitas", href: "/blueprint" }}
        />

        <article className="mt-10 grid overflow-hidden rounded-[20px] border border-slate-200 bg-[#f7f9fa] lg:grid-cols-2">
          <div className="relative min-h-[260px] sm:min-h-[320px]">
            <ImagePlaceholder label={featured.title} className="absolute inset-0 h-full w-full" />
            <span className="absolute left-4 top-4 rounded-full border border-white/20 bg-black/30 px-3 py-1 text-xs font-bold uppercase tracking-wider text-emerald-100 backdrop-blur-sm">
              {featured.category}
            </span>
          </div>
          <div className="flex flex-col justify-center p-7 sm:p-10">
            <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-emerald-700">
              Fasilitas Unggulan
            </p>
            <h3 className="mt-3 text-2xl font-bold leading-snug tracking-[-0.01em] text-slate-950 sm:text-3xl">
              {featured.title}
            </h3>
            <p className="mt-4 leading-relaxed text-slate-600">{featured.description}</p>
            {featured.details && (
              <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-slate-500">{featured.details}</p>
            )}
            <Link
              href="/blueprint"
              className="group mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-emerald-700 hover:text-emerald-800"
            >
              Jelajahi Fasilitas
              <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" aria-hidden="true" />
            </Link>
          </div>
        </article>

        {grid.length > 0 && (
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {grid.map((item) => (
              <Link
                key={item.id}
                href="/blueprint"
                className="group overflow-hidden rounded-2xl border border-slate-200 bg-white transition-all duration-300 hover:-translate-y-1 hover:border-emerald-200 hover:shadow-[0_8px_24px_rgba(2,6,23,0.06)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600"
              >
                <div className="relative aspect-[4/3]">
                  <ImagePlaceholder label={item.category} className="h-full w-full" compact />
                </div>
                <div className="p-4">
                  <p className="text-[11px] font-bold uppercase tracking-wider text-emerald-700">
                    {item.category}
                  </p>
                  <h3 className="mt-1 line-clamp-1 text-sm font-semibold text-slate-900 group-hover:text-emerald-800">
                    {item.title}
                  </h3>
                  <p className="mt-1 line-clamp-2 text-sm text-slate-500">{item.description}</p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </ScrollReveal>
      </Container>
    </section>
  )
}