import Link from "next/link"
import { ArrowRight } from "lucide-react"
import Container from "@/components/ui/container"
import ScrollReveal from "@/components/shared/ScrollReveal"

export default function ContactCTA() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#005f45] via-[#003c32] to-[#00150f] text-white">
      <div className="bg-blueprint-grid absolute inset-0 opacity-40" aria-hidden="true" />
      <div
        className="absolute -right-20 -top-24 h-80 w-80 rounded-full bg-emerald-400/20 blur-3xl"
        aria-hidden="true"
      />
      <Container className="relative py-16 text-center sm:py-24">
        <ScrollReveal>
          <h2 className="text-[clamp(2rem,4.5vw,3rem)] font-bold leading-[1.1] tracking-[-0.02em]">
            Punya Pertanyaan?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-emerald-100/85 sm:text-lg">
            Hubungi Fakultas Teknik Universitas Hamzanwadi untuk mendapatkan informasi lebih lanjut
            tentang penerimaan mahasiswa, kerja sama, dan layanan fakultas.
          </p>
          <Link
            href="/hubungi"
            className="mt-9 inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-white px-8 text-sm font-semibold text-emerald-900 transition-colors duration-200 hover:bg-emerald-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            Hubungi Kami
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </ScrollReveal>
      </Container>
    </section>
  )
}