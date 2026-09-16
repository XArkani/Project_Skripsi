import { GraduationCap, FlaskConical, HeartHandshake, ArrowRight } from "lucide-react"
import Link from "next/link"
import ScrollReveal from "@/components/shared/ScrollReveal"

const pillars = [
  {
    icon: GraduationCap,
    title: "Pendidikan",
    caption: "Perkuliahan dan praktikum yang dibimbing dosen berpengalaman.",
  },
  {
    icon: FlaskConical,
    title: "Riset & Inovasi",
    caption: "Penelitian mahasiswa dan dosen yang menghadirkan solusi nyata.",
  },
  {
    icon: HeartHandshake,
    title: "Pengabdian",
    caption: "Kegiatan yang menghubungkan ilmu dengan kebutuhan masyarakat.",
  },
]

export default function FacultyIntro() {
  return (
    <section className="section-y bg-muted">
      <ScrollReveal className="page-gutter mx-auto grid w-full max-w-[1280px] items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <div>
          <h2 className="text-[clamp(1.75rem,3vw,2.5rem)] font-bold leading-[1.12] tracking-[-0.02em] text-foreground">
            Membangun Talenta Teknologi untuk Masa Depan
          </h2>
          <p className="mt-5 max-w-xl leading-relaxed text-muted-foreground">
            Fakultas Teknik Universitas Hamzanwadi menjadi tempat bertumbuh bagi mahasiswa yang ingin
            belajar, menguji gagasan, dan mengembangkan keahlian di dunia keteknikan. Kami mendampingi
            mahasiswa dari ruang kuliah hingga karya nyata yang berguna bagi masyarakat.
          </p>
          <p className="mt-4 max-w-xl leading-relaxed text-muted-foreground">
            Dengan empat program studi, tenaga pendidik yang berpengalaman, serta laboratorium dan
            fasilitas yang mendukung, fakultas ini berkomitmen mencetak lulusan yang siap bekerja,
            adaptif, dan berintegritas.
          </p>
          <Link
            href="/struktur"
            className="group mt-8 inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-emerald-700 px-7 text-sm font-semibold text-white transition-colors duration-200 hover:bg-emerald-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600"
          >
            Kenali Fakultas Teknik
            <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" aria-hidden="true" />
          </Link>
        </div>

        <div className="relative overflow-hidden rounded-[20px] bg-gradient-to-br from-[#00624a] via-[#003c32] to-[#00150f] p-8 sm:p-10">
          <div className="bg-blueprint-grid absolute inset-0 opacity-40" aria-hidden="true" />
          <div
            className="absolute -left-16 -top-16 h-56 w-56 rounded-full bg-emerald-500/20 blur-3xl"
            aria-hidden="true"
          />
          <p className="relative text-xs font-bold uppercase tracking-[0.18em] text-emerald-300">
            Tiga Pilar Tridharma
          </p>
          <div className="relative mt-8 space-y-8">
            {pillars.map((p) => {
              const Icon = p.icon
              return (
                <div key={p.title} className="flex items-start gap-4">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-emerald-300/25 bg-emerald-50/10 text-emerald-200">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <div>
                    <h3 className="text-base font-semibold text-white">{p.title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-emerald-100/75">{p.caption}</p>
                  </div>
                </div>
              )
            })}
          </div>
          <div className="relative mt-10 flex flex-wrap items-center justify-between gap-x-4 gap-y-1 rounded-xl border border-white/10 bg-black/25 px-5 py-3.5 backdrop-blur-sm">
            <p className="text-sm font-semibold text-white">Universitas Hamzanwadi</p>
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-emerald-300">Selong, NTB</p>
          </div>
        </div>
      </ScrollReveal>
    </section>
  )
}