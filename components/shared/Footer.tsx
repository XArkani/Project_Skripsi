"use client"

import Link from "next/link"
import { useState, useEffect, startTransition } from "react"
import { Phone } from "lucide-react"

const quickLinks = [
  { href: "/blueprint", label: "Blueprint Kampus" },
  { href: "/dosen", label: "Profil Pengajar" },
  { href: "/ukm", label: "UKM Mahasiswa" },
  { href: "/event", label: "Kalender Agenda" },
  { href: "/faq", label: "Tanya Jawab (FAQ)" },
]

const socialLinks = [
  { href: "#", label: "Facebook" },
  { href: "#", label: "Instagram" },
  { href: "#", label: "YouTube" },
  { href: "#", label: "Twitter/X" },
]

export default function Footer() {
  const [year, setYear] = useState(2026)

  useEffect(() => {
    startTransition(() => {
      setYear(new Date().getFullYear())
    })
  }, [])

  return (
    <footer className="bg-slate-900 text-slate-400 pt-16 pb-8 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-12">

          {/* Faculty Logo & Description */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center space-x-3 text-white">
              <div className="w-10 h-10 rounded-xl bg-emerald-600 flex items-center justify-center font-extrabold text-xl shadow-lg">
                FT
              </div>
              <div>
                <span className="block font-bold tracking-wider text-base">FAKULTAS TEKNIK</span>
                <span className="block text-[11px] font-medium uppercase tracking-widest text-emerald-400 mt-0.5">Universitas Hamzanwadi</span>
              </div>
            </div>
            <p className="text-sm leading-relaxed text-slate-400">
              Pendidikan tinggi berstandar unggul untuk mencetak insinyur inovatif, siap kerja, serta berkomitmen tinggi memajukan akselerasi pembangunan keteknikan Indonesia.
            </p>
          </div>

          {/* Quick Links Column */}
          <div className="md:col-span-3 space-y-4">
            <h3 className="font-bold text-white text-sm uppercase tracking-wider">Akses Navigasi</h3>
            <ul className="space-y-2.5 text-sm">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="hover:text-emerald-400 transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Campus Contact Details */}
          <div className="md:col-span-4 space-y-4">
            <h3 className="font-bold text-white text-sm uppercase tracking-wider">Kontak Fakultas</h3>
            <p className="text-sm">
              Jl. TGKH. M. Zainuddin Abdul Madjid No. 132, Pancor, Selong, Lombok Timur, Nusa Tenggara Barat.
            </p>
            <div className="space-y-1.5 text-sm text-slate-400">
              <p className="flex items-center space-x-2">
                <Phone className="w-3.5 h-3.5" />
                <span>+62 (376) 21377</span>
              </p>
              <p>&#x1F4E7; teknik@hamzanwadi.ac.id</p>
              <p>&#x23F0; Senin - Sabtu: 08:00 - 15:30 WITA</p>
            </div>
          </div>

        </div>

        {/* Social Media and Legal Bar */}
        <div className="border-t border-slate-800 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <p className="text-slate-500">
            &copy; {year} Fakultas Teknik Universitas Hamzanwadi. Seluruh Hak Cipta Dilindungi.
          </p>
          <div className="flex space-x-4">
            {socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="hover:text-emerald-400 transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
