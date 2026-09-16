"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Dialog as DialogPrimitive } from "radix-ui"
import {
  Menu,
  X,
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
import { useUiChrome } from "./ui-chrome"

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

export default function MobileNavSheet() {
  const [open, setOpen] = useState(false)
  const triggerRef = useRef<HTMLButtonElement>(null)
  const pathname = usePathname()
  const { setNavOpen } = useUiChrome()

  useEffect(() => {
    // Tutup sheet setiap rute berubah (link diklik / navigasi programatik).
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setOpen(false)
  }, [pathname])

  useEffect(() => {
    // Bagikan status sheet ke chrome UI — ScrollToTop sembunyi selama sheet terbuka.
    setNavOpen(open)
    return () => setNavOpen(false)
  }, [open, setNavOpen])

  return (
    <DialogPrimitive.Root open={open} onOpenChange={setOpen}>
      <DialogPrimitive.Trigger asChild>
        <button
          ref={triggerRef}
          type="button"
          aria-label={open ? "Tutup menu navigasi" : "Buka menu navigasi"}
          aria-expanded={open}
          aria-haspopup="dialog"
          className="inline-flex h-11 w-11 shrink-0 cursor-pointer items-center justify-center rounded-lg border border-border bg-background text-muted-foreground transition-colors hover:text-emerald-700 dark:hover:text-emerald-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600 lg:hidden"
        >
          <span className="relative block h-5 w-5" aria-hidden="true">
            <Menu
              className={cn(
                "absolute inset-0 h-5 w-5 transition-all duration-300",
                open ? "rotate-90 scale-75 opacity-0" : "rotate-0 scale-100 opacity-100"
              )}
            />
            <X
              className={cn(
                "absolute inset-0 h-5 w-5 transition-all duration-300",
                open ? "rotate-0 scale-100 opacity-100" : "-rotate-90 scale-75 opacity-0"
              )}
            />
          </span>
        </button>
      </DialogPrimitive.Trigger>

      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="fixed inset-0 z-50 bg-slate-950/45 data-[state=open]:overlay-enter data-[state=closed]:overlay-exit lg:hidden" />

        <DialogPrimitive.Content
          aria-describedby={undefined}
          onOpenAutoFocus={(event) => {
            // Cegah browser men-scroll dokumen saat fokus awal (sheet beranimasi dari bawah).
            event.preventDefault()
            ;(event.currentTarget as HTMLElement).focus({ preventScroll: true })
          }}
          onCloseAutoFocus={(event) => {
            // Kembalikan fokus ke hamburger tanpa men-scroll halaman kembali ke atas.
            event.preventDefault()
            triggerRef.current?.focus({ preventScroll: true })
          }}
          className="fixed inset-x-0 top-0 z-50 flex max-h-[80dvh] flex-col rounded-b-3xl border-b border-border bg-background shadow-[0_8px_32px_rgba(2,6,23,0.18)] outline-none data-[state=open]:sheet-drop-enter data-[state=closed]:sheet-drop-exit lg:hidden"
        >
          <DialogPrimitive.Title className="sr-only">Menu navigasi</DialogPrimitive.Title>

          <div className="flex justify-end px-3 pt-[calc(4px+env(safe-area-inset-top))]">
            <DialogPrimitive.Close
              aria-label="Tutup menu navigasi"
              className="grid h-11 w-11 cursor-pointer place-items-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-emerald-700 dark:hover:text-emerald-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600"
            >
              <X className="h-5 w-5" aria-hidden="true" />
            </DialogPrimitive.Close>
          </div>

          <nav
            className="flex-1 space-y-1 overflow-y-auto overscroll-contain px-3 pb-3"
            aria-label="Menu mobile"
          >
            {mobileLinks.map((item) => {
              const Icon = item.icon
              const isActive =
                item.href === "/" ? pathname === "/" : pathname.startsWith(item.href)
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  aria-current={isActive ? "page" : undefined}
                  className={cn(
                    "flex min-h-12 items-center gap-3 rounded-xl px-3.5 text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600",
                    isActive
                      ? "bg-emerald-50 font-semibold text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300"
                      : "text-foreground hover:bg-muted hover:text-emerald-700 dark:hover:text-emerald-300"
                  )}
                >
                  <Icon
                    className={cn(
                      "h-[18px] w-[18px] shrink-0",
                      isActive
                        ? "text-emerald-700 dark:text-emerald-300"
                        : "text-muted-foreground"
                    )}
                    aria-hidden="true"
                  />
                  <span className="min-w-0 flex-1 truncate">{item.label}</span>
                  {isActive && (
                    <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-600" aria-hidden="true" />
                  )}
                </Link>
              )
            })}
          </nav>

          <div className="space-y-3 border-t border-border p-4">
            <div className="flex items-center justify-between gap-3 rounded-xl border border-border px-4 py-1.5">
              <span className="text-sm font-medium text-muted-foreground">Tema tampilan</span>
              <ThemeToggle className="border-transparent bg-transparent" />
            </div>
            <Link
              href="/hubungi"
              onClick={() => setOpen(false)}
              className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-emerald-700 text-sm font-semibold text-white transition-colors hover:bg-emerald-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600"
            >
              <MessageCircle className="h-4 w-4" aria-hidden="true" />
              Hubungi Kami
            </Link>
          </div>

          <div className="flex justify-center pb-3 pt-1" aria-hidden="true">
            <span className="h-1.5 w-10 rounded-full bg-border" />
          </div>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  )
}
