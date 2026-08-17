"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Hexagon,
  ClipboardList,
  GraduationCap,
  Users,
  CalendarDays,
  Newspaper,
  HelpCircle,
  GitBranch,
  Inbox,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { contentHues, type ContentHueKey } from "@/lib/admin-hues";

const mainLinks: { name: string; href: string; icon: typeof Hexagon; hue: ContentHueKey }[] = [
  { name: "Dashboard", href: "/dashboard", icon: Hexagon, hue: "dashboard" },
];

const contentLinks: { name: string; href: string; icon: typeof Hexagon; hue: ContentHueKey }[] = [
  { name: "Blueprint", href: "/dashboard/blueprint", icon: ClipboardList, hue: "blueprint" },
  { name: "Dosen", href: "/dashboard/dosen", icon: GraduationCap, hue: "dosen" },
  { name: "UKM", href: "/dashboard/ukm", icon: Users, hue: "ukm" },
  { name: "Event", href: "/dashboard/event", icon: CalendarDays, hue: "event" },
  { name: "Berita", href: "/dashboard/berita", icon: Newspaper, hue: "berita" },
  { name: "FAQ", href: "/dashboard/faq", icon: HelpCircle, hue: "faq" },
  { name: "Struktur", href: "/dashboard/struktur", icon: GitBranch, hue: "struktur" },
  { name: "Pesan", href: "/dashboard/messages", icon: Inbox, hue: "pesan" },
];

export function NavLinks() {
  const pathname = usePathname();

  return (
    <div className="flex flex-col gap-1">
      {mainLinks.map((link) => {
        const Icon = link.icon;
        const isActive = pathname === link.href;
        const hue = contentHues[link.hue].icon;

        return (
          <Link
            key={link.name}
            href={link.href}
            className={cn(
              "flex items-center gap-3 rounded-md px-3 py-2.5 text-sm transition-colors duration-200",
              isActive
                ? "bg-emerald-50 text-emerald-700 font-semibold"
                : "text-muted-foreground hover:text-foreground hover:bg-muted/50 font-medium"
            )}
          >
            <Icon className={cn("h-4 w-4 transition-colors duration-200", isActive ? "text-emerald-600" : hue)} />
            {link.name}
          </Link>
        );
      })}

      <p className="px-3 pt-5 pb-1 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground/50">
        Kelola Konten
      </p>

      {contentLinks.map((link) => {
        const Icon = link.icon;
        const isActive = pathname === link.href || pathname.startsWith(link.href + "/");
        const hue = contentHues[link.hue].icon;

        return (
          <Link
            key={link.name}
            href={link.href}
            className={cn(
              "flex items-center gap-3 rounded-md px-3 py-2.5 text-sm transition-colors duration-200",
              isActive
                ? "bg-emerald-50 text-emerald-700 font-semibold"
                : "text-muted-foreground hover:text-foreground hover:bg-muted/50 font-medium"
            )}
          >
            <Icon className={cn("h-4 w-4 transition-colors duration-200", isActive ? "text-emerald-600" : hue)} />
            {link.name}
          </Link>
        );
      })}
    </div>
  );
}

export function MobileNavLinks() {
  const pathname = usePathname();

  return (
    <div className="flex items-center justify-around w-full">
      {[...mainLinks, ...contentLinks].map((link) => {
        const Icon = link.icon;
        const isActive = pathname === link.href || pathname.startsWith(link.href + "/");
        const hue = contentHues[link.hue].icon;

        return (
          <Link
            key={link.name}
            href={link.href}
            className={cn(
              "flex flex-col items-center justify-center gap-1 p-2 text-[11px] font-medium transition-all duration-200",
              isActive ? "text-emerald-700" : "text-muted-foreground hover:text-foreground"
            )}
          >
            <div
              className={cn(
                "flex items-center justify-center rounded-full p-1.5 transition-colors",
                isActive ? "bg-emerald-50" : "bg-transparent"
              )}
            >
              <Icon className={cn("h-5 w-5", isActive ? "text-emerald-600" : hue)} />
            </div>
            {link.name}
          </Link>
        );
      })}
    </div>
  );
}
