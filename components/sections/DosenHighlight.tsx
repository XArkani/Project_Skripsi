import Image from "next/image"
import type { Dosen } from "@/lib/types"
import Container from "@/components/ui/container"
import SectionHeading from "@/components/ui/section-heading"
import ScrollReveal from "@/components/shared/ScrollReveal"

function initialsOf(name: string) {
  return name
    .split(/\s+/)
    .filter((w) => /^[A-Za-z]/.test(w))
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase()
}

function isStockImage(src: string | null) {
  if (!src) return true
  try {
    return new URL(src).hostname.includes("unsplash")
  } catch {
    return true
  }
}

function DosenAvatar({ dosen }: { dosen: Dosen }) {
  const hasImage = dosen.image && !isStockImage(dosen.image)
  if (hasImage) {
    return (
      <Image src={dosen.image!} alt={`Foto ${dosen.name}`} fill sizes="96px" className="object-cover" loading="lazy" />
    )
  }
  return (
    <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-[#008f5a] to-[#00231d] text-lg font-bold tracking-wide text-white">
      {initialsOf(dosen.name) || "FT"}
    </div>
  )
}

export default function DosenHighlight({ items }: { items: Dosen[] }) {
  const visible = items.slice(0, 4)

  return (
    <section className="bg-muted py-16 sm:py-24">
      <Container>
        <ScrollReveal>
          <SectionHeading
            title="Tenaga Pendidik"
            description="Dosen yang mendampingi mahasiswa dalam perkuliahan dan riset."
            action={{ label: "Lihat Seluruh Dosen", href: "/dosen" }}
          />
        </ScrollReveal>

        <ScrollReveal delay={120}>
          <div className="mt-10 grid gap-5 md:grid-cols-2">
          {visible.map((d) => (
            <div
              key={d.id}
              className="flex items-center gap-5 rounded-2xl border border-border bg-card p-5 transition-all duration-300 hover:-translate-y-1 hover:border-emerald-200 hover:shadow-[0_8px_24px_rgba(2,6,23,0.06)]"
            >
              <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-2xl ring-1 ring-border sm:h-24 sm:w-24">
                <DosenAvatar dosen={d} />
              </div>
              <div className="min-w-0">
                <h3 className="line-clamp-1 text-base font-semibold text-foreground">{d.name}</h3>
                <p className="mt-1 inline-flex rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-semibold text-emerald-800">
                  {d.prodi}
                </p>
                {d.position && (
                  <p className="mt-1.5 line-clamp-1 text-sm text-muted-foreground">{d.position}</p>
                )}
                {d.expertise && (
                  <p className="mt-0.5 line-clamp-1 text-xs text-muted-foreground">{d.expertise}</p>
                )}
              </div>
            </div>
          ))}
        </div>
        </ScrollReveal>
      </Container>
    </section>
  )
}