"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"
import { ThemeToggle } from "./ThemeToggle"
import MobileNavSheet from "./MobileNavSheet"

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

function isItemActive(pathname: string, item: NavItem) {
  if (item.type === "link") {
    return item.href === "/" ? pathname === "/" : pathname.startsWith(item.href)
  }
  return item.children.some((c) => pathname.startsWith(c.href))
}

export default function Header() {
  const [openDropdown, setOpenDropdown] = useState<null | "berita" | "informasi">(null)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()
  const navRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    // Sinkronkan state dengan posisi scroll saat mount (restore scroll browser).
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpenDropdown(null)
    }
    document.addEventListener("keydown", onKey)
    return () => document.removeEventListener("keydown", onKey)
  }, [])

  useEffect(() => {
    const onClickOutside = (e: MouseEvent) => {
      if (!openDropdown) return
      const target = e.target as Node
      if (navRef.current && !navRef.current.contains(target)) {
        setOpenDropdown(null)
      }
    }
    document.addEventListener("mousedown", onClickOutside)
    return () => document.removeEventListener("mousedown", onClickOutside)
  }, [openDropdown])

  useEffect(() => {
    // Menutup dropdown saat navigasi berpindah halaman (sync dengan perubahan eksternal route).
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setOpenDropdown(null)
  }, [pathname])

  const linkNeutral =
    "text-foreground hover:bg-muted hover:text-emerald-700 dark:hover:text-emerald-300"
  const linkActive = "font-semibold text-emerald-700 dark:text-emerald-300"

  return (
    <header
      className={cn(
        "sticky top-0 z-40 border-b bg-background/95 backdrop-blur-md transition-[border-color,box-shadow] duration-200",
        scrolled ? "border-border shadow-[0_1px_2px_rgba(2,6,23,0.04)]" : "border-transparent"
      )}
    >
      <div className="page-gutter mx-auto flex h-(--header-h) w-full max-w-[1280px] min-w-0 items-center justify-between gap-4">
        <Link href="/" className="group flex min-h-11 min-w-0 items-center gap-3 max-[374px]:gap-2">
          <span className="relative h-10 w-10 shrink-0 sm:h-11 sm:w-11">
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
              className="block truncate text-sm font-bold uppercase leading-none tracking-wider text-emerald-800 dark:text-emerald-300"
            >
              Fakultas Teknik
            </span>
            <span
              className="mt-1 block truncate text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground max-[374px]:tracking-[0.1em]"
            >
              Universitas Hamzanwadi
            </span>
          </span>
        </Link>

        <nav ref={navRef} className="hidden items-center gap-1 lg:flex" aria-label="Navigasi utama">
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
              <div key={item.id} className="relative">
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
                {openDropdown === item.id && (
                  <div
                    id={`dropdown-${item.id}`}
                    className="dropdown-enter absolute left-0 top-full mt-2 w-56 rounded-xl border border-border bg-background p-1.5 shadow-[0_8px_24px_rgba(2,6,23,0.08)]"
                  >
                    {item.children.map((c) => (
                      <Link
                        key={c.href}
                        href={c.href}
                        onClick={() => setOpenDropdown(null)}
                        className={cn(
                          "block rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                          pathname.startsWith(c.href)
                            ? "text-emerald-700 dark:text-emerald-300"
                            : "text-foreground hover:bg-muted hover:text-emerald-700 dark:hover:text-emerald-300"
                        )}
                      >
                        {c.label}
                      </Link>
                    ))}
                  </div>
                )}
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

        <MobileNavSheet />
      </div>
    </header>
  )
}
