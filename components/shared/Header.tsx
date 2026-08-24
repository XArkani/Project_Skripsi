"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import { createPortal } from "react-dom"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import {
  Menu,
  X,
  ChevronDown,
  Home,
  Compass,
  MessageCircle,
  GraduationCap,
  Calendar,
  Newspaper,
  Landmark,
  Lightbulb,
  Zap,
} from "lucide-react"
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
  { href: "/", label: "Beranda", icon: Home },
  { href: "/blueprint", label: "Blueprint Fakultas", icon: Compass },
  { href: "/ukm", label: "Unit Kegiatan Mahasiswa (UKM)", icon: Zap },
  { href: "/dosen", label: "Data Dosen", icon: GraduationCap },
  { href: "/event", label: "Event & Agenda", icon: Calendar },
  { href: "/berita", label: "Kumpulan Berita", icon: Newspaper },
  { href: "/struktur", label: "Struktur Organisasi", icon: Landmark },
  { href: "/faq", label: "Tanya Jawab (FAQ)", icon: Lightbulb },
]

const infoPaths = ["/ukm", "/dosen", "/event", "/berita", "/struktur", "/faq"]

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [isNavDropdownOpen, setIsNavDropdownOpen] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const pathname = usePathname()
  const headerRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40)
    handleScroll()
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (headerRef.current && !headerRef.current.contains(e.target as Node)) {
        setIsNavDropdownOpen(false)
        setIsMobileMenuOpen(false)
      }
    }
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsNavDropdownOpen(false)
        setIsMobileMenuOpen(false)
      }
    }
    document.addEventListener("click", handleClickOutside)
    document.addEventListener("keydown", handleKeyDown)
    return () => {
      document.removeEventListener("click", handleClickOutside)
      document.removeEventListener("keydown", handleKeyDown)
    }
  }, [])

  const isInfoActive = infoPaths.some((p) => pathname.startsWith(p))
  const isSolid = scrolled || pathname !== "/"

  return (
    <header
      ref={headerRef}
      className={cn(
        "fixed top-0 left-0 right-0 z-40 transition-all duration-300",
        isSolid
          ? "bg-white/95 backdrop-blur-md shadow-md py-3"
          : "bg-transparent py-5"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">

          {/* Logo Section */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="w-10 h-10 relative shrink-0">
              <Image
                src="/LOGO FAKULTAS TEKNIK.webp"
                alt="Logo Fakultas Teknik"
                fill
                sizes="40px"
                className="rounded-xl object-cover group-hover:scale-105 transition-transform"
              />
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
            <div
              className="relative"
              onMouseEnter={() => setIsNavDropdownOpen(true)}
            >
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation()
                  setIsNavDropdownOpen((v) => !v)
                }}
                aria-expanded={isNavDropdownOpen}
                aria-controls="desktop-informasi-menu"
                className={cn(
                  "px-4 py-2 rounded-lg text-sm font-semibold flex items-center space-x-1.5 transition-colors",
                  isInfoActive
                    ? "text-emerald-700 bg-emerald-50"
                    : "text-slate-600 hover:text-emerald-600 hover:bg-slate-100"
                )}
              >
                <span>Informasi</span>
                <ChevronDown className={cn("w-3 h-3 transition-transform", isNavDropdownOpen && "rotate-180")} />
              </button>

              {isNavDropdownOpen && (
                <div
                  id="desktop-informasi-menu"
                  className="absolute left-0 mt-2 w-64 bg-white rounded-xl shadow-xl border border-slate-100 py-2 z-50"
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
          <div className="hidden lg:flex items-center space-x-3">
            <Link
              href="/hubungi"
              className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2.5 min-h-11 rounded-xl text-sm font-bold shadow-sm transition-colors"
            >
              Hubungi Kami
            </Link>
          </div>

          {/* Mobile Hamburger Trigger */}
          <div className="lg:hidden flex items-center">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation()
                setIsMobileMenuOpen((v) => !v)
              }}
              className="p-2.5 rounded-lg bg-emerald-50 text-emerald-800 hover:bg-emerald-100 transition-colors"
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-nav-panel"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {typeof window !== "undefined" &&
              createPortal(
                <motion.div
                  className="fixed inset-0 bg-slate-950/40 backdrop-blur-sm z-30"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  onClick={() => setIsMobileMenuOpen(false)}
                />,
                document.body
              )}
            <motion.div
              id="mobile-nav-panel"
              role="dialog"
              aria-modal="true"
              className="lg:hidden absolute top-full left-3 right-3 mt-2 bg-white rounded-2xl shadow-2xl border border-slate-100 overflow-hidden"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
            >
              <div className="px-6 pt-5 pb-2 flex items-center justify-between">
                <span className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-slate-400">
                  Menu Navigasi
                </span>
                <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-600">
                  Fakultas Teknik
                </span>
              </div>

              <nav className="px-3 pb-2 max-h-[calc(100vh-190px)] overflow-y-auto">
                {mobileLinks.map((link) => {
                  const Icon = link.icon
                  const isActive = pathname === link.href
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={cn(
                        "flex items-center gap-3 w-full py-3 px-4 rounded-xl text-sm font-semibold transition-colors cursor-pointer",
                        isActive
                          ? "bg-emerald-50 text-emerald-800"
                          : "text-slate-600 hover:bg-slate-50 hover:text-emerald-700"
                      )}
                    >
                      <span
                        className={cn(
                          "w-9 h-9 shrink-0 rounded-lg flex items-center justify-center transition-colors",
                          isActive ? "bg-emerald-600 text-white" : "bg-slate-100 text-slate-500"
                        )}
                      >
                        <Icon className="w-4 h-4" />
                      </span>
                      {link.label}
                    </Link>
                  )
                })}
              </nav>

              <div className="border-t border-slate-100 p-4">
                <Link
                  href="/hubungi"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center justify-center gap-2 w-full py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-md transition-colors cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4" />
                  Hubungi Kami
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  )
}
