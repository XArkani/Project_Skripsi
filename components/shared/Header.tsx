"use client"

import { useState, useEffect, useSyncExternalStore } from "react"
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
  GraduationCap,
  UsersRound,
  Newspaper,
  CalendarDays,
  Landmark,
  Lightbulb,
  MessageCircle,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { ThemeToggle } from "./ThemeToggle"

type NavItem =
  | { type: "link"; href: string; label: string }
  | {
      type: "dropdown"
      id: "berita" | "informasi"
      label: string
      children: { href: string; label: string }[]
    }

const navItems: NavItem[] = [
  { type: "link", href: "/", label: "Beranda" },
  { type: "link", href: "/blueprint", label: "Blueprint Fakultas" },
  { type: "link", href: "/dosen", label: "Dosen" },
  { type: "link", href: "/ukm", label: "Kemahasiswaan" },
  {
    type: "dropdown",
    id: "berita",
    label: "Berita & Event",
    children: [
      { href: "/berita", label: "Berita & Publikasi" },
      { href: "/event", label: "Agenda & Event" },
    ],
  },
  {
    type: "dropdown",
    id: "informasi",
    label: "Informasi",
    children: [
      { href: "/struktur", label: "Struktur Organisasi" },
      { href: "/faq", label: "Tanya Jawab (FAQ)" },
    ],
  },
]

const mobileLinks: { label: string; href: string; icon: typeof Home }[] = [
  { label: "Beranda", href: "/", icon: Home },
  { label: "Blueprint Fakultas", href: "/blueprint", icon: Compass },
  { label: "Dosen", href: "/dosen", icon: GraduationCap },
  { label: "Kemahasiswaan", href: "/ukm", icon: UsersRound },
  { label: "Berita & Publikasi", href: "/berita", icon: Newspaper },
  { label: "Agenda & Event", href: "/event", icon: CalendarDays },
  { label: "Struktur Organisasi", href: "/struktur", icon: Landmark },
  { label: "Tanya Jawab (FAQ)", href: "/faq", icon: Lightbulb },
]

function isItemActive(pathname: string, item: NavItem) {
  if (item.type === "link") {
    return item.href === "/" ? pathname === "/" : pathname.startsWith(item.href)
  }
  return item.children.some((c) => pathname.startsWith(c.href))
}

export default function Header() {
  const [openDropdown, setOpenDropdown] = useState<null | "berita" | "informasi">(null)
  const [isMobileOpen, setIsMobileOpen] = useState(false)
  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  )
  const pathname = usePathname()

  useEffect(() => {
    if (isMobileOpen) {
      const prev = document.body.style.overflow
      document.body.style.overflow = "hidden"
      return () => {
        document.body.style.overflow = prev
      }
    }
  }, [isMobileOpen])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpenDropdown(null)
        setIsMobileOpen(false)
      }
    }
    document.addEventListener("keydown", onKey)
    return () => document.removeEventListener("keydown", onKey)
  }, [])

  useEffect(() => {
    // Menutup menu saat navigasi berpindah halaman (sync dengan perubahan eksternal route).
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setOpenDropdown(null)
    setIsMobileOpen(false)
  }, [pathname])

  const linkNeutral = "text-foreground hover:bg-muted hover:text-emerald-700"
  const linkActive = "font-semibold text-emerald-700"

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-40 border-b border-border bg-background">
        <div className="mx-auto flex h-[72px] w-full max-w-[1280px] items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
          <Link href="/" className="group flex min-w-0 items-center gap-3" aria-label="Beranda Fakultas Teknik">
            <span className="relative h-11 w-11 shrink-0">
              <Image
                src="/LOGO FAKULTAS TEKNIK.webp"
                alt="Logo Fakultas Teknik"
                fill
                sizes="44px"
                priority
                className="object-contain transition-transform duration-200 group-hover:scale-[1.04]"
              />
            </span>
            <span className="min-w-0">
              <span
                className="block truncate text-sm font-bold uppercase leading-none tracking-wider text-emerald-800"
              >
                Fakultas Teknik
              </span>
              <span
                className="mt-1 block truncate text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground"
              >
                Universitas Hamzanwadi
              </span>
            </span>
          </Link>

          <nav className="hidden items-center gap-1 lg:flex" aria-label="Navigasi utama">
            {navItems.map((item) =>
              item.type === "link" ? (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={pathname === item.href ? "page" : undefined}
                  className={cn(
                    "rounded-lg px-3.5 py-2 text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600",
                    isItemActive(pathname, item) ? linkActive : linkNeutral
                  )}
                >
                  {item.label}
                </Link>
              ) : (
                <div
                  key={item.id}
                  className="relative"
                  onMouseEnter={() => setOpenDropdown(item.id)}
                  onMouseLeave={() => setOpenDropdown((prev) => (prev === item.id ? null : prev))}
                >
                  <button
                    type="button"
                    onClick={() => setOpenDropdown((prev) => (prev === item.id ? null : item.id))}
                    aria-expanded={openDropdown === item.id}
                    aria-controls={`dropdown-${item.id}`}
                    className={cn(
                      "flex items-center gap-1.5 rounded-lg px-3.5 py-2 text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600",
                      isItemActive(pathname, item) ? linkActive : linkNeutral
                    )}
                  >
                    {item.label}
                    <ChevronDown
                      className={cn(
                        "h-3.5 w-3.5 transition-transform duration-200",
                        openDropdown === item.id && "rotate-180"
                      )}
                      aria-hidden="true"
                    />
                  </button>
                  <AnimatePresence>
                    {openDropdown === item.id && (
                      <motion.div
                        id={`dropdown-${item.id}`}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 8 }}
                        transition={{ duration: 0.18, ease: "easeOut" }}
                        className="absolute left-0 top-full mt-2 w-56 rounded-xl border border-border bg-background p-1.5 shadow-[0_8px_24px_rgba(2,6,23,0.08)]"
                      >
                        {item.children.map((c) => (
                          <Link
                            key={c.href}
                            href={c.href}
                            onClick={() => setOpenDropdown(null)}
                            className={cn(
                              "block rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                              pathname.startsWith(c.href)
                                ? "text-emerald-700"
                                : "text-foreground hover:bg-muted hover:text-emerald-700"
                            )}
                          >
                            {c.label}
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )
            )}
          </nav>

          <div className="hidden shrink-0 items-center gap-2 lg:flex">
            <ThemeToggle />
            <Link
              href="/hubungi"
              className="inline-flex h-11 items-center justify-center rounded-xl bg-emerald-700 px-5 text-sm font-semibold text-white transition-colors duration-200 hover:bg-emerald-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600"
            >
              Hubungi Kami
            </Link>
          </div>

          <button
            type="button"
            onClick={() => setIsMobileOpen(true)}
            aria-label="Buka menu navigasi"
            aria-expanded={isMobileOpen}
            aria-controls="mobile-nav-panel"
            className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-border bg-background text-muted-foreground transition-colors hover:text-emerald-700 lg:hidden"
          >
            <Menu className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>
      </header>

      {mounted &&
        createPortal(
          <AnimatePresence>
            {isMobileOpen && (
              <motion.div
                key="mobile-backdrop"
                className="fixed inset-0 z-40 bg-slate-950/40 lg:hidden"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                onClick={() => setIsMobileOpen(false)}
                aria-hidden="true"
              />
            )}
          </AnimatePresence>,
          document.body
        )}

      {mounted &&
        createPortal(
          <AnimatePresence>
            {isMobileOpen && (
              <motion.aside
                key="mobile-nav-panel"
                id="mobile-nav-panel"
                role="dialog"
                aria-modal="true"
                aria-label="Menu navigasi"
                className="fixed inset-y-0 right-0 z-50 flex w-[min(20rem,86vw)] flex-col bg-background shadow-2xl lg:hidden"
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{ type: "spring", stiffness: 340, damping: 34 }}
              >
                <div className="flex items-center justify-between border-b border-border px-5 py-4">
                  <div className="flex items-center gap-2.5">
                    <span className="relative h-10 w-10">
                      <Image
                        src="/LOGO FAKULTAS TEKNIK.webp"
                        alt="Logo Fakultas Teknik"
                        fill
                        sizes="40px"
                        className="object-contain"
                      />
                    </span>
                    <span>
                      <span className="block text-sm font-bold uppercase leading-none tracking-wider text-emerald-800">
                        Fakultas Teknik
                      </span>
                      <span className="mt-1 block text-[10px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
                        Universitas Hamzanwadi
                      </span>
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setIsMobileOpen(false)}
                    aria-label="Tutup menu navigasi"
                    className="grid h-11 w-11 shrink-0 place-items-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-emerald-700"
                  >
                    <X className="h-5 w-5" aria-hidden="true" />
                  </button>
                </div>

                <nav className="flex-1 overflow-y-auto overscroll-contain px-3 py-4" aria-label="Menu mobile">
                  {mobileLinks.map((item) => {
                    const Icon = item.icon
                    const isActive =
                      item.href === "/" ? pathname === "/" : pathname.startsWith(item.href)
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setIsMobileOpen(false)}
                        aria-current={isActive ? "page" : undefined}
                        className={cn(
                          "flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition-colors",
                          isActive
                            ? "bg-emerald-50 font-semibold text-emerald-800"
                            : "text-foreground hover:bg-muted hover:text-emerald-700"
                        )}
                      >
                        <Icon className="h-4 w-4 shrink-0" aria-hidden="true" />
                        {item.label}
                      </Link>
                    )
                  })}
                </nav>

                <div className="space-y-3 border-t border-border p-4">
                  <ThemeToggle />
                  <Link
                    href="/hubungi"
                    onClick={() => setIsMobileOpen(false)}
                    className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-emerald-700 text-sm font-semibold text-white transition-colors hover:bg-emerald-800"
                  >
                    <MessageCircle className="h-4 w-4" aria-hidden="true" />
                    Hubungi Kami
                  </Link>
                </div>
              </motion.aside>
            )}
          </AnimatePresence>,
          document.body
        )}
    </>
  )
}