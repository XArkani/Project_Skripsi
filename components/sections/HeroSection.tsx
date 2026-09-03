import Link from "next/link"
import { ArrowRight } from "lucide-react"

export default function HeroSection() {
  return (
    <section className="relative flex min-h-[80svh] items-center overflow-hidden bg-gradient-to-br from-[#00624a] via-[#003c32] to-[#00120c] pb-16 pt-[72px] text-center sm:pb-20 lg:pb-24">
      <div className="bg-blueprint-grid absolute inset-0 opacity-40" aria-hidden="true" />
      <div
        className="absolute -right-24 -top-24 h-96 w-96 rounded-full bg-emerald-500/25 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="absolute -bottom-28 -left-24 h-96 w-96 rounded-full bg-emerald-400/10 blur-3xl"
        aria-hidden="true"
      />

      <div className="relative mx-auto w-full max-w-4xl px-4 sm:px-6">
        <div aria-hidden="true" className="h-[96px] sm:h-[112px] lg:h-[128px]" />
        <h1 className="animate-hero-rise text-[clamp(2.5rem,6vw,4.25rem)] font-bold leading-[1.07] tracking-[-0.03em] text-white [animation-delay:0.05s]">
          Berdaya Saing Global <span className="text-emerald-300">dan Berbudaya Santri</span>
        </h1>

        <p
          className="animate-hero-rise mx-auto mt-6 max-w-2xl text-base leading-relaxed text-emerald-100/85 sm:text-lg [animation-delay:0.15s]"
        >
          Fakultas Teknik Universitas Hamzanwadi mencetak lulusan yang adaptif, inovatif, dan
          berakhlak mulia untuk era digital global.
        </p>

        <div
          className="animate-hero-rise mt-9 flex flex-wrap items-center justify-center gap-3 [animation-delay:0.25s]"
        >
          <Link
            href="/blueprint"
            className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-emerald-700 px-7 text-sm font-semibold text-white shadow-[0_1px_2px_rgba(0,20,12,0.4)] transition-colors duration-200 hover:bg-emerald-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-300"
          >
            Lihat Blueprint
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
          <Link
            href="/dosen"
            className="inline-flex h-12 items-center justify-center gap-2 rounded-xl border border-white/30 bg-white/5 px-7 text-sm font-semibold text-white transition-colors duration-200 hover:bg-white/10 hover:border-white/40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-300"
          >
            Data Dosen
          </Link>
        </div>
      </div>
    </section>
  )
}