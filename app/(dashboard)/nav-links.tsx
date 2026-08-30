"use client";

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

const mainLinks: { name: string; href: string; icon: typeof LayoutDashboard }[] = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
];

const contentLinks: { name: string; href: string; icon: typeof LayoutDashboard }[] = [
  { name: "Blueprint", href: "/dashboard/blueprint", icon: ClipboardList },
  { name: "Dosen", href: "/dashboard/dosen", icon: GraduationCap },
  { name: "UKM", href: "/dashboard/ukm", icon: Users },
  { name: "Event", href: "/dashboard/event", icon: CalendarDays },
  { name: "Berita", href: "/dashboard/berita", icon: Newspaper },
  { name: "FAQ", href: "/dashboard/faq", icon: CircleHelp },
  { name: "Struktur", href: "/dashboard/struktur", icon: GitBranch },
  { name: "Pesan", href: "/dashboard/messages", icon: Inbox },
];

export function NavLinks() {
  const pathname = usePathname();

  return (
    <div className="flex flex-col gap-0.5">
      {mainLinks.map((link) => {
        const Icon = link.icon;
        const isActive = pathname === link.href;
        return (
          <Link
            key={link.name}
            href={link.href}
            aria-current={isActive ? "page" : undefined}
            className={cn(
              "flex items-center gap-3 rounded-md px-3 py-2.5 text-sm transition-colors duration-200",
              isActive
                ? "bg-emerald-50 font-semibold text-emerald-700"
                : "font-medium text-muted-foreground hover:bg-muted/60 hover:text-foreground"
            )}
          >
            <Icon
              className={cn("h-4 w-4 shrink-0", isActive ? "text-emerald-600" : "text-muted-foreground")}
              aria-hidden="true"
            />
            {link.name}
          </Link>
        );
      })}

      <p className="px-3 pb-1 pt-5 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground/50">
        Kelola Konten
      </p>

      {contentLinks.map((link) => {
        const Icon = link.icon;
        const isActive = pathname === link.href || pathname.startsWith(link.href + "/");
        return (
          <Link
            key={link.name}
            href={link.href}
            aria-current={isActive ? "page" : undefined}
            className={cn(
              "flex items-center gap-3 rounded-md px-3 py-2.5 text-sm transition-colors duration-200",
              isActive
                ? "bg-emerald-50 font-semibold text-emerald-700"
                : "font-medium text-muted-foreground hover:bg-muted/60 hover:text-foreground"
            )}
          >
            <Icon
              className={cn("h-4 w-4 shrink-0", isActive ? "text-emerald-600" : "text-muted-foreground")}
              aria-hidden="true"
            />
            {link.name}
          </Link>
        );
      })}
    </div>
  );
}