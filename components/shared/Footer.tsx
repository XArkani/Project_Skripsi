"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { MapPin, Phone, Mail, Clock, ChevronRight } from "lucide-react"
import { CONTACT_INFO } from "@/lib/contact"

const quickLinks = [
  { href: "/blueprint", label: "Blueprint Kampus" },
  { href: "/dosen", label: "Profil Pengajar" },
  { href: "/ukm", label: "UKM Mahasiswa" },
  { href: "/event", label: "Kalender Agenda" },
  { href: "/faq", label: "Tanya Jawab (FAQ)" },
]

const contactItems = [
  { icon: MapPin, label: "Alamat Kampus", value: CONTACT_INFO.address },
  { icon: Phone, label: "Nomor Layanan", value: CONTACT_INFO.phone },
  { icon: Mail, label: "Surat Elektronik", value: CONTACT_INFO.email },
  { icon: Clock, label: "Jam Kerja Kantor", value: CONTACT_INFO.hours },
]

export default function Footer() {
  const [year] = useState(() => String(new Date().getFullYear()))

  return (
    <footer className="bg-slate-900 text-slate-400 pt-10 sm:pt-12 pb-8 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-8 mb-8 sm:mb-10">

          {/* Faculty Logo & Description */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-3 text-white flex-wrap">
              <div className="w-10 h-10 relative shrink-0">
                <Image
                  src="/LOGO FAKULTAS TEKNIK.webp"
                  alt="Logo Fakultas Teknik"
                  fill
                  sizes="40px"
                  className="rounded-xl object-cover"
                />
              </div>
              <div>
                <span className="block font-bold tracking-wider text-sm">FAKULTAS TEKNIK</span>
                <span className="block text-sm font-medium text-emerald-400 mt-0.5">Universitas Hamzanwadi</span>
              </div>
            </div>
            <p className="text-sm leading-relaxed text-slate-400 max-w-sm lg:max-w-md">
              Pendidikan tinggi berstandar unggul untuk mencetak insinyur inovatif, siap kerja, serta berkomitmen
              tinggi memajukan akselerasi pembangunan keteknikan Indonesia.
            </p>
          </div>

          {/* Quick Links Column */}
          <div className="md:col-span-3 space-y-4">
            <h3 className="flex items-center gap-2 font-bold text-white text-sm">
              <span className="w-1 h-4 rounded-full bg-emerald-500" aria-hidden="true" />
              Navigasi
            </h3>
            <ul className="space-y-2.5 text-sm">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="group inline-flex items-center gap-2 text-slate-400 hover:text-emerald-400 transition-colors cursor-pointer py-1"
                  >
                    <ChevronRight className="w-4 h-4 shrink-0 text-emerald-400 group-hover:text-emerald-300 group-hover:translate-x-0.5 transition-all" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Campus Contact Details */}
          <div className="md:col-span-4 space-y-4">
            <h3 className="flex items-center gap-2 font-bold text-white text-sm">
              <span className="w-1 h-4 rounded-full bg-emerald-500" aria-hidden="true" />
              Kontak
            </h3>
            <ul className="space-y-4">
              {contactItems.map((item) => {
                const Icon = item.icon
                return (
                  <li key={item.label} className="flex items-start gap-3">
                    <span className="w-9 h-9 shrink-0 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center">
                      <Icon className="w-4 h-4 text-emerald-400" />
                    </span>
                    <span className="min-w-0">
                      <span className="block text-[11px] font-bold uppercase tracking-wider text-slate-500">
                        {item.label}
                      </span>
                      <span className="block text-sm text-slate-300 mt-0.5 leading-relaxed break-words">
                        {item.value}
                      </span>
                    </span>
                  </li>
                )
              })}
            </ul>
          </div>

        </div>

        {/* Legal Bar */}
        <div className="border-t border-slate-800 pt-6 flex flex-col sm:flex-row items-center justify-center sm:justify-between gap-2 text-center text-xs text-slate-500">
          <span>&copy; {year} Fakultas Teknik Universitas Hamzanwadi. Seluruh Hak Cipta Dilindungi.</span>
          <span className="font-medium text-slate-600">Teknik Hamzanwadi</span>
        </div>
      </div>
    </footer>
  )
}