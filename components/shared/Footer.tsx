"use client"

import { useState } from "react"
import Link from "next/link"

const quickLinks = [
  { href: "/blueprint", label: "Blueprint Kampus" },
  { href: "/dosen", label: "Profil Pengajar" },
  { href: "/ukm", label: "UKM Mahasiswa" },
  { href: "/event", label: "Kalender Agenda" },
  { href: "/faq", label: "Tanya Jawab (FAQ)" },
]

export default function Footer() {
  const [year] = useState(() => String(new Date().getFullYear()))

  return (
    <footer className="bg-slate-900 text-slate-400 pt-12 pb-8 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-10">

          {/* Faculty Logo & Description */}
          <div className="md:col-span-5 space-y-3">
            <div className="flex items-center gap-3 text-white">
              <div className="w-10 h-10 rounded-xl bg-emerald-600 flex items-center justify-center font-extrabold text-lg">
                FT
              </div>
              <div>
                <span className="block font-bold tracking-wider text-sm">FAKULTAS TEKNIK</span>
                <span className="block text-sm font-medium text-emerald-400 mt-0.5">Universitas Hamzanwadi</span>
              </div>
            </div>
            <p className="text-sm leading-relaxed text-slate-400">
              Pendidikan tinggi berstandar unggul untuk mencetak insinyur inovatif, siap kerja, serta berkomitmen tinggi memajukan akselerasi pembangunan keteknikan Indonesia.
            </p>
          </div>

          {/* Quick Links Column */}
          <div className="md:col-span-3 space-y-3">
            <h3 className="font-bold text-white text-sm">Navigasi</h3>
            <ul className="space-y-2 text-sm">
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
          <div className="md:col-span-4 space-y-3">
            <h3 className="font-bold text-white text-sm">Kontak</h3>
            <p className="text-sm">
              Jl. TGKH. M. Zainuddin Abdul Madjid No. 132, Pancor, Selong, Lombok Timur, NTB.
            </p>
            <p className="text-sm">+62 (376) 21377</p>
            <p className="text-sm">teknik@hamzanwadi.ac.id</p>
            <p className="text-sm">Senin – Sabtu, 08:00 – 15:30 WITA</p>
          </div>

        </div>

        {/* Legal Bar */}
        <div className="border-t border-slate-800 pt-6 text-center text-xs text-slate-500">
          &copy; {year} Fakultas Teknik Universitas Hamzanwadi. Seluruh Hak Cipta Dilindungi.
        </div>
      </div>
    </footer>
  )
}
