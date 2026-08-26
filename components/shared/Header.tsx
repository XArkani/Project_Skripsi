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
  const [mounted, setMounted] = useState(false)
  const pathname = usePathname()
  const headerRef = useRef<HTMLElement>(null)

  useEffect(() => setMounted(true), [])

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40)
    handleScroll()
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    if (isMobileMenuOpen) {
      const prev = document.body.style.overflow
      document.body.style.overflow = "hidden"
      return () => {
        document.body.style.overflow = prev
      }
    }
  }, [isMobileMenuOpen])

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
    <>
      <header
        ref={headerRef}
        className={cn(
          "fixed top-0 inset-x-0 z-40 border-b transition-[background-color,backdrop-filter,box-shadow,padding,border-color] duration-300 ease-out",
          isSolid
            ? "bg-white/95 backdrop-blur-xl shadow-[0_4px_24px_rgba(0,0,0,0.06)] border-slate-100 py-3"
            : "bg-transparent backdrop-blur-none shadow-none border-transparent py-4 sm:py-5"
        )}
      >
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-3">
            <Link href="/" className="flex items-center gap-2.5 sm:gap-3 group min-w-0 shrink">
              <div className="w-9 h-9 sm:w-10 sm:h-10 relative shrink-0">
                <Image
                  src="/LOGO FAKULTAS TEKNIK.webp"
                  alt="Logo Fakultas Teknik"
                  fill
                  sizes="40px"
                  priority
                  className="rounded-xl object-contain bg-transparent group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="min-w-0">
                <span className="block font-bold tracking-wider text-[13px] sm:text-base leading-none text-emerald-800">
                  FAKULTAS TEKNIK
                </span>
                <span className="block text-[10px] sm:text-[12px] font-medium uppercase tracking-widest mt-0.5 text-slate-500">
                  Universitas Hamzanwadi
                </span>
              </div>
            </Link>

            <nav className="hidden lg:flex items-center gap-1 shrink-0">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "px-4 py-2 rounded-xl text-sm font-semibold transition-colors",
                    pathname === link.href
                      ? "text-emerald-700 bg-emerald-50"
                      : "text-slate-600 hover:text-emerald-600 hover:bg-slate-100"
                  )}
                >
                  {link.label}
                </Link>
              ))}
              <div className="relative" onMouseEnter={() => setIsNavDropdownOpen(true)} onMouseLeave={() => setIsNavDropdownOpen(false)}>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation()
                    setIsNavDropdownOpen((v) => !v)
                  }}
                  aria-expanded={isNavDropdownOpen}
                  aria-controls="desktop-informasi-menu"
                  className={cn(
                    "px-4 py-2 rounded-xl text-sm font-semibold flex items-center gap-1.5 transition-colors",
                    isInfoActive
                      ? "text-emerald-700 bg-emerald-50"
                      : "text-slate-600 hover:text-emerald-600 hover:bg-slate-100"
                  )}
                >
                  <span>Informasi</span>
                  <ChevronDown className={cn("w-3.5 h-3.5 transition-transform duration-200", isNavDropdownOpen && "rotate-180")} />
                </button>
                <AnimatePresence>
                  {isNavDropdownOpen && (
                    <motion.div
                      id="desktop-informasi-menu"
                      className="absolute left-0 top-full mt-2 w-64 bg-white rounded-2xl shadow-xl border border-slate-100 py-2 z-50 overflow-hidden"
                      initial={{ opacity: 0, y: 8, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.98 }}
                      transition={{ type: "spring", stiffness: 340, damping: 28, mass: 0.8 }}
                    >
                      {dropdownItems.map((item) => {
                        const Icon = item.icon
                        return (
                          <Link
                            key={item.href}
                            href={item.href}
                            onClick={() => setIsNavDropdownOpen(false)}
                            className={cn(
                              "w-full flex items-center gap-3 px-5 py-2.5 text-sm font-medium transition-colors",
                              pathname.startsWith(item.href)
                                ? "text-emerald-700 bg-emerald-50"
                                : "text-slate-700 hover:text-emerald-700 hover:bg-emerald-50/70"
                            )}
                          >
                            <Icon className="w-4 h-4 shrink-0" />
                            <span>{item.label}</span>
                          </Link>
                        )
                      })}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </nav>

            <div className="hidden lg:flex items-center gap-3 shrink-0">
              <Link
                href="/hubungi"
                className="bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white px-6 py-2.5 min-h-11 rounded-xl text-sm font-bold shadow-sm hover:shadow-md transition-all inline-flex items-center justify-center"
              >
                Hubungi Kami
              </Link>
            </div>

            <div className="lg:hidden flex items-center shrink-0">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation()
                  setIsMobileMenuOpen((v) => !v)
                }}
                className={cn(
                  "inline-flex items-center justify-center w-11 h-11 rounded-xl border transition-colors duration-200 active:scale-95",
                  isMobileMenuOpen
                    ? "bg-emerald-600 text-white border-emerald-600 shadow-md"
                    : isSolid
                      ? "bg-emerald-50 text-emerald-800 border-emerald-100 hover:bg-emerald-100"
                      : "bg-white/90 backdrop-blur-md text-emerald-800 border-white/60 shadow-sm hover:bg-white"
                )}
                aria-label={isMobileMenuOpen ? "Tutup menu" : "Buka menu"}
                aria-expanded={isMobileMenuOpen}
                aria-controls="mobile-nav-panel"
              >
                <AnimatePresence mode="wait" initial={false}>
                  <motion.span
                    key={isMobileMenuOpen ? "close" : "open"}
                    initial={{ opacity: 0, rotate: -90, scale: 0.8 }}
                    animate={{ opacity: 1, rotate: 0, scale: 1 }}
                    exit={{ opacity: 0, rotate: 90, scale: 0.8 }}
                    transition={{ type: "spring", stiffness: 400, damping: 22, mass: 0.7 }}
                    className="inline-flex"
                  >
                    {isMobileMenuOpen ? <X className="w-5 h-5" strokeWidth={2.5} /> : <Menu className="w-5 h-5" strokeWidth={2.5} />}
                  </motion.span>
                </AnimatePresence>
              </button>
            </div>
          </div>
        </div>

        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              id="mobile-nav-panel"
              role="dialog"
              aria-modal="true"
              className="lg:hidden absolute top-full inset-x-3 mt-2 bg-white rounded-2xl shadow-2xl border border-slate-100 overflow-hidden origin-top"
              initial={{ opacity: 0, y: -12, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -12, scale: 0.98 }}
              transition={{ type: "spring", stiffness: 320, damping: 30, mass: 0.9 }}
            >
              <div className="px-5 sm:px-6 pt-5 pb-2 flex items-center justify-between">
                <span className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-slate-400">Menu Navigasi</span>
                <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-600">Fakultas Teknik</span>
              </div>
              <nav className="px-3 pb-2 max-h-[calc(100dvh-180px)] sm:max-h-[calc(100vh-190px)] overflow-y-auto overscroll-contain [-webkit-overflow-scrolling:touch]">
                {mobileLinks.map((link, i) => {
                  const Icon = link.icon
                  const isActive = pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href))
                  return (
                    <motion.div
                      key={link.href}
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.04 * i, type: "spring", stiffness: 300, damping: 24 }}
                    >
                      <Link
                        href={link.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className={cn(
                          "flex items-center gap-3 w-full py-3 px-3 sm:px-4 rounded-xl text-[13px] sm:text-sm font-semibold transition-colors",
                          isActive ? "bg-emerald-50 text-emerald-800" : "text-slate-600 active:bg-slate-50 hover:bg-slate-50 hover:text-emerald-700"
                        )}
                      >
                        <span
                          className={cn(
                            "w-9 h-9 shrink-0 rounded-xl flex items-center justify-center transition-colors",
                            isActive ? "bg-emerald-600 text-white shadow-sm" : "bg-slate-100 text-slate-500"
                          )}
                        >
                          <Icon className="w-4 h-4" />
                        </span>
                        <span className="truncate">{link.label}</span>
                      </Link>
                    </motion.div>
                  )
                })}
              </nav>
              <div className="border-t border-slate-100 p-3 sm:p-4 bg-slate-50/50">
                <Link
                  href="/hubungi"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center justify-center gap-2 w-full py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white font-bold text-sm shadow-md active:scale-[0.98] transition-all"
                >
                  <MessageCircle className="w-4 h-4" />
                  Hubungi Kami
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {mounted &&
        createPortal(
          <AnimatePresence>
            {isMobileMenuOpen && (
              <motion.div
                className="fixed inset-0 bg-slate-950/40 backdrop-blur-[2px] z-30 lg:hidden"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.22, ease: "easeOut" }}
                onClick={() => setIsMobileMenuOpen(false)}
                aria-hidden="true"
              />
            )}
          </AnimatePresence>,
          document.body
        )}
    </>
  )
}
