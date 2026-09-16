"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { NavLinks } from "./nav-links";
import { LogoutButton } from "./logout-button";
import { ThemeToggle } from "@/components/shared/ThemeToggle";
import { useUiChrome } from "@/components/shared/ui-chrome";

export function MobileSidebar({ email }: { email?: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const closeRef = useRef<HTMLButtonElement>(null);
  const pathname = usePathname();
  const { setNavOpen } = useUiChrome();

  useEffect(() => {
    // Tutup drawer saat berpindah halaman (sync dengan perubahan eksternal route).
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsOpen(false);
  }, [pathname]);

  useEffect(() => {
    // Bagikan status drawer ke chrome UI — ScrollToTop sembunyi selama drawer terbuka.
    setNavOpen(isOpen);
    return () => setNavOpen(false);
  }, [isOpen, setNavOpen]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      requestAnimationFrame(() => closeRef.current?.focus());
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [isOpen]);

  return (
    <>
      {/* Top header (mobile only) */}
      <div className="sticky top-0 z-30 flex h-14 items-center gap-2 border-b border-border/50 bg-background/95 px-4 backdrop-blur-md md:hidden">
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="-ml-1.5 inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600"
          aria-label="Buka menu"
          aria-expanded={isOpen}
          aria-controls="admin-nav-drawer"
        >
          <Menu className="h-5 w-5" />
        </button>
        <span className="relative h-8 w-8 shrink-0">
          <Image
            src="/LOGO FAKULTAS TEKNIK.webp"
            alt="Logo Fakultas Teknik"
            fill
            sizes="32px"
            className="object-contain"
          />
        </span>
        <p className="min-w-0 truncate text-sm font-bold tracking-tight text-emerald-800 dark:text-emerald-300">
          Fakultas Teknik
        </p>
        <div className="ml-auto">
          <ThemeToggle className="border-transparent bg-transparent hover:bg-muted" />
        </div>
      </div>

      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-slate-950/50 md:hidden"
          onClick={() => setIsOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Sliding drawer (kiri) */}
      <aside
        id="admin-nav-drawer"
        role="dialog"
        aria-modal="true"
        aria-label="Menu navigasi"
        aria-hidden={!isOpen}
        className={`fixed inset-y-0 left-0 z-40 flex w-72 max-w-[85vw] transform flex-col border-r border-border bg-background shadow-2xl transition-transform duration-200 ease-out md:hidden ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex h-14 shrink-0 items-center justify-between border-b border-border/50 px-4">
          <div className="flex items-center gap-2.5">
            <span className="relative h-8 w-8 shrink-0">
              <Image
                src="/LOGO FAKULTAS TEKNIK.webp"
                alt=""
                fill
                sizes="32px"
                className="object-contain"
              />
            </span>
            <p className="text-sm font-bold tracking-tight text-foreground">Menu</p>
          </div>
          <button
            ref={closeRef}
            type="button"
            onClick={() => setIsOpen(false)}
            className="-mr-1.5 inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600"
            aria-label="Tutup menu"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <nav className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-3 py-4">
          <NavLinks onNavigate={() => setIsOpen(false)} />
        </nav>

        <div className="shrink-0 border-t border-border/50 p-3 pb-[calc(12px+env(safe-area-inset-bottom))]">
          {email && (
            <p className="truncate px-2 pb-2 text-xs font-medium text-muted-foreground">{email}</p>
          )}
          <LogoutButton />
        </div>
      </aside>
    </>
  );
}
