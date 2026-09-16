"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  ClipboardList,
  GraduationCap,
  Users,
  CalendarDays,
  Newspaper,
  CircleHelp,
  GitBranch,
  Inbox,
} from "lucide-react";
import { cn } from "@/lib/utils";

type NavItem = { name: string; href: string; icon: typeof LayoutDashboard };

export const mainLinks: NavItem[] = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
];

export const managementLinks: NavItem[] = [
  { name: "Blueprint", href: "/dashboard/blueprint", icon: ClipboardList },
  { name: "Dosen", href: "/dashboard/dosen", icon: GraduationCap },
  { name: "UKM", href: "/dashboard/ukm", icon: Users },
  { name: "Event", href: "/dashboard/event", icon: CalendarDays },
  { name: "Berita", href: "/dashboard/berita", icon: Newspaper },
  { name: "FAQ", href: "/dashboard/faq", icon: CircleHelp },
  { name: "Struktur", href: "/dashboard/struktur", icon: GitBranch },
];

export const communicationLinks: NavItem[] = [
  { name: "Pesan", href: "/dashboard/messages", icon: Inbox },
];

const contentLinks: NavItem[] = [...managementLinks, ...communicationLinks];

function isLinkActive(pathname: string, href: string) {
  // Dashboard adalah root dari /dashboard — aktif HANYA saat tepat di /dashboard,
  // supaya tanda aktif tidak tertinggal di semua sub-halaman (Blueprint, Berita, dst).
  if (href === "/dashboard") return pathname === href;
  return pathname === href || pathname.startsWith(href + "/");
}

function NavItemLink({
  item,
  className,
  onNavigate,
}: {
  item: NavItem;
  className?: string;
  onNavigate?: () => void;
}) {
  const pathname = usePathname();
  const Icon = item.icon;
  const isActive = isLinkActive(pathname, item.href);
  return (
    <Link
      href={item.href}
      onClick={onNavigate}
      aria-current={isActive ? "page" : undefined}
      className={cn(
        "flex items-center gap-3 rounded-lg px-3 text-sm transition-colors duration-200",
        isActive
          ? "bg-emerald-50 font-semibold text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300"
          : "font-medium text-muted-foreground hover:bg-muted/60 hover:text-foreground",
        className
      )}
    >
      <Icon
        className={cn(
          "h-4 w-4 shrink-0",
          isActive ? "text-emerald-600 dark:text-emerald-400" : "text-muted-foreground"
        )}
        aria-hidden="true"
      />
      <span className="min-w-0 flex-1 truncate">{item.name}</span>
    </Link>
  );
}

function GroupHeading({ children }: { children: ReactNode }) {
  return (
    <p className="px-3 pb-1 pt-4 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground/70">
      {children}
    </p>
  );
}

export function NavLinks({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <div className="flex flex-col gap-0.5">
      {mainLinks.map((link) => (
        <NavItemLink key={link.href} item={link} className="py-2.5" onNavigate={onNavigate} />
      ))}

      <GroupHeading>Kelola Konten</GroupHeading>

      {contentLinks.map((link) => (
        <NavItemLink key={link.href} item={link} className="py-2.5" onNavigate={onNavigate} />
      ))}
    </div>
  );
}
