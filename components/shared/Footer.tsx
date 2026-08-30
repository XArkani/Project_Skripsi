"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { MapPin, Phone, Mail, Clock, ArrowRight } from "lucide-react"
import { CONTACT_INFO } from "@/lib/contact"

const navLinks = [
  { href: "/", label: "Beranda" },
  { href: "/blueprint", label: "Blueprint Fakultas" },
  { href: "/dosen", label: "Tenaga Pendidik" },
  { href: "/ukm", label: "Kemahasiswaan" },
  { href: "/hubungi", label: "Hubungi Kami" },
]

const academicLinks = [
  { href: "/event", label: "Agenda & Event" },
  { href: "/berita", label: "Berita & Publikasi" },
  { href: "/struktur", label: "Struktur Organisasi" },
  { href: "/faq", label: "Tanya Jawab (FAQ)" },
]

const contactItems = [
  { icon: MapPin, label: "Alamat", value: CONTACT_INFO.address },
  { icon: Phone, label: "Telepon", value: CONTACT_INFO.phone },
  { icon: Mail, label: "Email", value: CONTACT_INFO.email },
  { icon: Clock, label: "Jam Layanan", value: CONTACT_INFO.hours },
]

export default function Footer() {
  const [year] = useState(() => new Date().getFullYear())

  return (
    <footer className="bg-[#001a15] text-emerald-100/65">
      <div className="mx-auto w-full max-w-[1280px] px-4 py-14 sm:px-6 sm:py-16 lg:px-8">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-4">
            <div className="flex items-center gap-3">
              <span className="relative h-12 w-12 shrink-0">
                <Image
                  src="/LOGO FAKULTAS TEKNIK.webp"
                  alt="Logo Fakultas Teknik"
                  fill
                  sizes="48px"
                  className="object-contain"
                />
              </span>
              <div>
                <p className="text-base font-bold uppercase leading-none tracking-wider text-white">
                  Fakultas Teknik
                </p>
                <p className="mt-1 text-xs font-medium text-emerald-300">Universitas Hamzanwadi</p>
              </div>
            </div>
            <p className="mt-5 max-w-sm text-sm leading-relaxed">
              Pendidikan tinggi yang mencetak lulusan inovatif, siap kerja, dan berkomitmen memajukan
              dunia keteknikan Indonesia.
            </p>
          </div>

          <div className="lg:col-span-2">
            <h3 className="text-sm font-bold uppercase tracking-wider text-white">Navigasi</h3>
            <ul className="mt-5 space-y-3 text-sm">
              {navLinks.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="group inline-flex items-center gap-1.5 transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-400"
                  >
                    <ArrowRight
                      className="h-3.5 w-3.5 shrink-0 text-emerald-400 transition-transform duration-200 group-hover:translate-x-0.5"
                      aria-hidden="true"
                    />
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3">
            <h3 className="text-sm font-bold uppercase tracking-wider text-white">
              Informasi Akademik
            </h3>
            <ul className="mt-5 space-y-3 text-sm">
              {academicLinks.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="group inline-flex items-center gap-1.5 transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-400"
                  >
                    <ArrowRight
                      className="h-3.5 w-3.5 shrink-0 text-emerald-400 transition-transform duration-200 group-hover:translate-x-0.5"
                      aria-hidden="true"
                    />
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3">
            <h3 className="text-sm font-bold uppercase tracking-wider text-white">Kontak</h3>
            <ul className="mt-5 space-y-4 text-sm">
              {contactItems.map((c) => {
                const Icon = c.icon
                return (
                  <li key={c.label} className="flex items-start gap-3">
                    <Icon className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" aria-hidden="true" />
                    <span className="min-w-0">
                      <span className="mb-0.5 block text-[11px] font-semibold uppercase tracking-wider text-emerald-300">
                        {c.label}
                      </span>
                      <span className="leading-relaxed">{c.value}</span>
                    </span>
                  </li>
                )
              })}
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-white/10 pt-6 text-center text-xs sm:flex-row sm:text-left">
          <p>&copy; {year} Fakultas Teknik Universitas Hamzanwadi. Semua hak dilindungi.</p>
          <p className="font-medium text-emerald-300">Teknik Hamzanwadi</p>
        </div>
      </div>
    </footer>
  )
}