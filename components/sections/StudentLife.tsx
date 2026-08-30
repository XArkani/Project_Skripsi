import { Bot, Map as MapIcon, Rocket, Sparkles, Zap } from "lucide-react"
import type { LucideIcon } from "lucide-react"
import type { UKM } from "@/lib/types"
import Container from "@/components/ui/container"
import SectionHeading from "@/components/ui/section-heading"
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

export default function StudentLife({ items }: { items: UKM[] }) {
  const visible = items.slice(0, 3)

  return (
    <section className="bg-white py-16 sm:py-24">
      <Container>
        <ScrollReveal>
          <SectionHeading
            title="Kehidupan Mahasiswa"
            description="Lebih dari sekadar ruang kelas, tempat berkumpul dan berkarya."
            action={{ label: "Jelajahi Organisasi Mahasiswa", href: "/ukm" }}
          />
        </ScrollReveal>

        <ScrollReveal delay={120}>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
          {visible.length === 0 && (
            <p className="text-sm text-slate-500 md:col-span-3">
              Informasi organisasi mahasiswa akan segera hadir.
            </p>
          )}
          {visible.map((ukm) => {
            const Icon = pickIcon(ukm)
            return (
              <article
                key={ukm.id}
                className="group overflow-hidden rounded-2xl border border-slate-200 bg-white transition-all duration-300 hover:-translate-y-1 hover:border-emerald-200 hover:shadow-[0_8px_24px_rgba(2,6,23,0.06)]"
              >
                <div className="bg-blueprint-grid relative flex h-32 items-center justify-center bg-gradient-to-br from-[#00624a] via-[#003c32] to-[#00150f]">
                  <span className="grid h-14 w-14 place-items-center rounded-2xl border border-emerald-300/30 bg-emerald-50/10 text-emerald-200 transition-colors duration-300 group-hover:bg-emerald-200 group-hover:text-emerald-900">
                    <Icon className="h-6 w-6" aria-hidden="true" />
                  </span>
                </div>
                <div className="flex flex-col p-5">
                  <h3 className="line-clamp-2 text-base font-semibold text-slate-950">{ukm.name}</h3>
                  <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-slate-600">
                    {ukm.description}
                  </p>
                  {ukm.activities && (
                    <p className="mt-3 line-clamp-2 text-xs leading-relaxed text-slate-500">
                      <span className="font-semibold text-slate-700">Kegiatan: </span>
                      {ukm.activities}
                    </p>
                  )}
                </div>
              </article>
            )
          })}
        </div>
        </ScrollReveal>
      </Container>
    </section>
  )
}