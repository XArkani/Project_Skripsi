"use client"

import { Building2, GraduationCap, Zap, Calendar, Newspaper, Landmark, Lightbulb, Phone } from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"

const navItems = [
  { title: "Blueprint", desc: "Detail Infrastruktur", path: "/blueprint", icon: Building2 },
  { title: "Tenaga Pengajar", desc: "Profil Dosen", path: "/dosen", icon: GraduationCap },
  { title: "UKM Teknik", desc: "Kemahasiswaan", path: "/ukm", icon: Zap },
  { title: "Agenda Event", desc: "Kegiatan Fakultas", path: "/event", icon: Calendar },
  { title: "Berita Terbaru", desc: "Kabar Hangat", path: "/berita", icon: Newspaper },
  { title: "Struktur Organisasi", desc: "Profil Birokrasi", path: "/struktur", icon: Landmark },
  { title: "FAQ", desc: "Tanya Jawab", path: "/faq", icon: Lightbulb },
  { title: "Hubungi Kami", desc: "Layanan Pengaduan", path: "/hubungi", icon: Phone },
]

export default function QuickNavPanel() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="py-12 bg-white border-y border-slate-100"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-10">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900">Akses Cepat Informasi</h2>
          <p className="text-slate-500 text-sm mt-1">
            Gunakan tautan di bawah ini untuk langsung menuju layanan penting kami.
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {navItems.map((item, idx) => {
            const Icon = item.icon
            return (
              <Link
                key={idx}
                href={item.path}
                className="group p-5 bg-slate-50 hover:bg-emerald-50 rounded-2xl border border-slate-200/60 hover:border-emerald-300 text-left transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
              >
                <Icon className="w-8 h-8 text-slate-600 mb-3 group-hover:text-emerald-600 group-hover:scale-110 transition-all" />
                <h3 className="font-bold text-slate-800 text-sm sm:text-base group-hover:text-emerald-800">
                  {item.title}
                </h3>
                <p className="text-slate-500 text-xs mt-1 leading-tight">{item.desc}</p>
              </Link>
            )
          })}
        </div>
      </div>
    </motion.section>
  )
}
