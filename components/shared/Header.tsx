"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X, ChevronDown, Lock, GraduationCap, Calendar, Newspaper, Landmark, Lightbulb, Zap } from "lucide-react"
import { cn } from "@/lib/utils"

const navLinks = [
  { href: "/", label: "Beranda" },
  { href: "/blueprint", label: "Blueprint Fakultas" },
]

const dropdownItems = [
  { href: "/ukm", label: "Unit Kegiatan Mahasiswa (UKM)", icon: Zap },
  { href: "/dosen", label: "Data Dosen & Riset", icon: GraduationCap },
  { href: "/event", label: "Agenda & Event", icon: Calendar },
  { href: "/berita", label: "Berita & Berkas", icon: Newspaper },
  { href: "/struktur", label: "Struktur Organisasi", icon: Landmark },
  { href: "/faq", label: "Tanya Jawab (FAQ)", icon: Lightbulb },
]

const mobileLinks = [
  { href: "/", label: "Beranda" },
  { href: "/blueprint", label: "Blueprint Fakultas" },
  { href: "/ukm", label: "Unit Kegiatan Mahasiswa (UKM)" },
  { href: "/dosen", label: "Data Dosen" },
  { href: "/event", label: "Event & Agenda" },
  { href: "/berita", label: "Kumpulan Berita" },
  { href: "/struktur", label: "Struktur Organisasi" },
  { href: "/faq", label: "Tanya Jawab (FAQ)" },
  { href: "/hubungi", label: "Hubungi Kami" },
]

const infoPaths = ["/ukm", "/dosen", "/event", "/berita", "/struktur", "/faq"]

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [isNavDropdownOpen, setIsNavDropdownOpen] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40)
    handleScroll()
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const isInfoActive = infoPaths.some((p) => pathname.startsWith(p))

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-40 transition-all duration-300",
        scrolled
          ? "bg-white/95 backdrop-blur-md shadow-md py-3"
          : "bg-transparent py-5"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">

          {/* Logo Section */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="w-10 h-10 rounded-xl bg-emerald-600 flex items-center justify-center text-white font-extrabold text-xl shadow-md group-hover:scale-105 transition-transform">
              FT
            </div>
            <div>
              <span className="block font-bold text-emerald-800 tracking-wider text-sm sm:text-base leading-none">
                FAKULTAS TEKNIK
              </span>
              <span className="block text-slate-500 text-[11px] sm:text-[12px] font-medium uppercase tracking-widest mt-0.5">
                Universitas Hamzanwadi
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "px-4 py-2 rounded-lg text-sm font-semibold transition-colors",
                  pathname === link.href
                    ? "text-emerald-700 bg-emerald-50"
                    : "text-slate-600 hover:text-emerald-600 hover:bg-slate-100"
                )}
              >
                {link.label}
              </Link>
            ))}

            {/* Mega Dropdown Menu */}
            <div className="relative">
              <button
                onMouseEnter={() => setIsNavDropdownOpen(true)}
                onClick={() => setIsNavDropdownOpen(!isNavDropdownOpen)}
                className={cn(
                  "px-4 py-2 rounded-lg text-sm font-semibold flex items-center space-x-1.5 transition-colors",
                  isInfoActive
                    ? "text-emerald-700 bg-emerald-50"
                    : "text-slate-600 hover:text-emerald-600 hover:bg-slate-100"
                )}
              >
                <span>Informasi</span>
                <ChevronDown className="w-3 h-3" />
              </button>

              {isNavDropdownOpen && (
                <div
                  className="absolute left-0 mt-2 w-64 bg-white rounded-xl shadow-xl border border-slate-100 py-2 z-50"
                  onMouseLeave={() => setIsNavDropdownOpen(false)}
                >
                  {dropdownItems.map((item) => {
                    const Icon = item.icon
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setIsNavDropdownOpen(false)}
                        className={cn(
                          "w-full flex items-center space-x-3 px-5 py-2.5 text-sm font-medium transition-colors",
                          pathname.startsWith(item.href)
                            ? "text-emerald-700 bg-emerald-50"
                            : "text-slate-700 hover:text-emerald-700 hover:bg-emerald-50"
                        )}
                      >
                        <Icon className="w-4 h-4" />
                        <span>{item.label}</span>
                      </Link>
                    )
                  })}
                </div>
              )}
            </div>
          </nav>

          {/* Right Side Header Action */}
          <div className="hidden lg:flex items-center space-x-4">
            <Link
              href="/hubungi"
              className="bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2 rounded-lg text-sm font-bold shadow-md transition-all hover:scale-[1.02]"
            >
              Hubungi Kami
            </Link>
            <Link
              href="/login"
              className="bg-slate-100 hover:bg-slate-200 text-slate-700 px-4 py-2 rounded-lg text-xs font-bold transition-all inline-flex items-center space-x-1.5"
            >
              <Lock className="w-3.5 h-3.5" />
              <span>Admin Portal</span>
            </Link>
          </div>

          {/* Mobile Hamburger Trigger */}
          <div className="lg:hidden flex items-center space-x-2">
            <Link
              href="/login"
              className="p-2 text-slate-500 hover:text-emerald-600"
              title="Admin Portal"
            >
              <Lock className="w-4 h-4" />
            </Link>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2.5 rounded-lg bg-emerald-50 text-emerald-800 hover:bg-emerald-100 transition-colors"
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Dropdown Fullscreen Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-white border-t border-slate-100 shadow-2xl py-4 px-6 space-y-2 mt-2">
          {mobileLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setIsMobileMenuOpen(false)}
              className={cn(
                "block w-full py-3 px-4 rounded-xl text-base font-semibold transition-colors",
                pathname === link.href
                  ? "bg-emerald-50 text-emerald-800"
                  : "text-slate-700 hover:bg-slate-50"
              )}
            >
              {link.label}
            </Link>
          ))}
          <div className="pt-4 border-t border-slate-100">
            <Link
              href="/login"
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center justify-center space-x-2 w-full py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-sm font-bold transition-all"
            >
              <Lock className="w-4 h-4" />
              <span>Pintu Masuk Administrator</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}
