import Image from "next/image"
import { Bot, Map as MapIcon, Rocket, Sparkles, Zap } from "lucide-react"
import type { LucideIcon } from "lucide-react"
import type { UKM } from "@/lib/types"
import Container from "@/components/ui/container"
import SectionHeading from "@/components/ui/section-heading"
import MobileCarousel from "@/components/shared/MobileCarousel"
import ScrollReveal from "@/components/shared/ScrollReveal"

const ICON_RULES: { keywords: string[]; icon: LucideIcon }[] = [
  { keywords: ["robot", "robo", "erc", "mikro", "iot"], icon: Bot },
  { keywords: ["geografis", "gis", "peta", "sig", "mapping"], icon: MapIcon },
  { keywords: ["wirausaha", "bisnis", "entrepreneur", "startup", "kewirausahaan"], icon: Rocket },
  { keywords: ["seni", "media", "teknologi", "komputer", "informatika", "coding"], icon: Sparkles },
]

function pickIcon(ukm: UKM): LucideIcon {
  const haystack = `${ukm.name} ${ukm.description}`.toLowerCase()
  const match = ICON_RULES.find((r) => r.keywords.some((kw) => haystack.includes(kw)))
  return match?.icon ?? Zap
}

function hasRealLogo(ukm: UKM): boolean {
  const src = ukm.logo?.trim() ?? ""
  if (!src) return false
  if (!/^(https?:\/\/|\/)/i.test(src)) return false
  try {
    if (src.startsWith("http") && new URL(src).hostname.includes("unsplash")) return false
  } catch {
    return false
  }
  return true
}

export default function StudentLife({ items }: { items: UKM[] }) {
  const visible = items.slice(0, 3)

  return (
    <section className="section-y bg-background">
      <Container>
        <ScrollReveal>
          <SectionHeading
            title="Kehidupan Mahasiswa"
            description="Lebih dari sekadar ruang kelas, tempat berkumpul dan berkarya."
            action={{ label: "Jelajahi Organisasi Mahasiswa", href: "/ukm" }}
          />
        </ScrollReveal>

        <ScrollReveal delay={120}>
          <MobileCarousel
            label="Kehidupan Mahasiswa"
            count={visible.length}
            className="mt-10"
            rowClassName="max-md:mx-[calc(-1*var(--page-gutter))] max-md:flex max-md:snap-x max-md:snap-mandatory max-md:scroll-px-(--page-gutter) max-md:gap-4 max-md:overflow-x-auto max-md:overscroll-x-contain max-md:scroll-smooth max-md:px-(--page-gutter) max-md:scrollbar-none max-md:pb-2 md:grid md:grid-cols-3 md:gap-5"
          >
            {visible.length === 0 && (
              <p className="text-sm text-muted-foreground md:col-span-3">
                Informasi organisasi mahasiswa akan segera hadir.
              </p>
            )}
            {visible.map((ukm) => {
              const Icon = pickIcon(ukm)
              const showLogo = hasRealLogo(ukm)
              return (
                <article
                  key={ukm.id}
                  className="group overflow-hidden rounded-2xl border border-border bg-card transition-all duration-300 hover:-translate-y-1 hover:border-emerald-200 hover:shadow-[0_8px_24px_rgba(2,6,23,0.06)] max-md:w-[84vw] max-md:max-w-[340px] max-md:shrink-0 max-md:snap-start"
                >
                  {showLogo ? (
                    <div className="relative flex aspect-[16/9] items-center justify-center overflow-hidden bg-white sm:aspect-auto sm:h-40">
                      <Image
                        src={ukm.logo}
                        alt={`Logo ${ukm.name}`}
                        fill
                        sizes="(max-width: 768px) 84vw, 33vw"
                        className="object-contain object-center p-4"
                        loading="lazy"
                      />
                    </div>
                  ) : (
                    <div className="bg-blueprint-grid relative flex aspect-[16/9] items-center justify-center bg-gradient-to-br from-[#00624a] via-[#003c32] to-[#00150f] sm:aspect-auto sm:h-32">
                      <span className="grid h-14 w-14 place-items-center rounded-2xl border border-emerald-300/30 bg-emerald-50/10 text-emerald-200 transition-colors duration-300 group-hover:bg-emerald-200 group-hover:text-emerald-900">
                        <Icon className="h-6 w-6" aria-hidden="true" />
                      </span>
                    </div>
                  )}
                  <div className="flex flex-col p-5">
                    <h3 className="line-clamp-2 text-base font-semibold text-foreground">{ukm.name}</h3>
                    <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-muted-foreground">
                      {ukm.description}
                    </p>
                    {ukm.activities && (
                      <p className="mt-3 line-clamp-2 text-xs leading-relaxed text-muted-foreground">
                        <span className="font-semibold text-foreground/85">Kegiatan: </span>
                        {ukm.activities}
                      </p>
                    )}
                  </div>
                </article>
              )
            })}
          </MobileCarousel>
        </ScrollReveal>
      </Container>
    </section>
  )
}
