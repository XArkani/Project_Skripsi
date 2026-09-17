import Link from "next/link"
import { ArrowRight, ChevronDown } from "lucide-react"

export default function HeroSection() {
  return (
    <section className="relative flex min-h-[80svh] items-center overflow-hidden bg-gradient-to-br from-[#00624a] via-[#003c32] to-[#00120c] pb-16 text-center sm:pb-20 lg:pb-24">
      <div className="bg-blueprint-grid absolute inset-0 opacity-40" aria-hidden="true" />
      <div
        className="absolute -right-24 -top-24 h-96 w-96 rounded-full bg-[radial-gradient(circle_at_center,rgba(21,154,108,0.28)_0%,rgba(21,154,108,0)_70%)]"
        aria-hidden="true"
      />
      <div
        className="absolute -bottom-28 -left-24 h-96 w-96 rounded-full bg-[radial-gradient(circle_at_center,rgba(65,180,136,0.14)_0%,rgba(65,180,136,0)_70%)]"
        aria-hidden="true"
      />

      <div className="relative mx-auto w-full max-w-4xl px-4 sm:px-6">
        <div aria-hidden="true" className="h-[96px] sm:h-[112px] lg:h-[128px]" />
        <h1 className="animate-hero-rise mx-auto max-w-[22ch] text-[clamp(2rem,9vw,3rem)] font-bold leading-[1.07] tracking-[-0.03em] text-white [animation-delay:0.05s] md:max-w-none md:text-[clamp(2.5rem,6vw,4.25rem)]">
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
            className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-emerald-700 px-7 text-sm font-semibold text-white shadow-[0_1px_2px_rgba(0,20,12,0.4)] transition-colors duration-200 hover:bg-emerald-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-300 min-[360px]:w-auto"
          >
            Lihat Blueprint
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
          <Link
            href="/dosen"
            className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl border border-white/30 bg-white/5 px-7 text-sm font-semibold text-white transition-colors duration-200 hover:bg-white/10 hover:border-white/40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-300 min-[360px]:w-auto"
          >
            Data Dosen
          </Link>
        </div>
      </div>

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-5 flex justify-center sm:bottom-7"
      >
        <ChevronDown
          className="scroll-cue h-5 w-5 text-emerald-100/80 opacity-70"
          strokeWidth={2}
          aria-hidden="true"
        />
      </div>
    </section>
  )
}