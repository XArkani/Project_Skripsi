export const instant = false

import Image from "next/image";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import { LogoutButton } from "./logout-button";
import { DashboardLoadingSkeleton } from "./loading-skeleton";
import { ThemeToggle } from "@/components/shared/ThemeToggle";
import { NavLinks } from "./nav-links";
import { MobileSidebar } from "./mobile-sidebar";
import PageContainer from "@/components/dashboard/page-container";
import ScrollToTopLazy from "@/components/shared/ScrollToTopLazy";
import { Toaster } from "@/components/ui/sonner";

async function SessionCheck({ children }: { children: React.ReactNode }) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/login");
  }
  const adminEmail = process.env.ADMIN_EMAIL?.toLowerCase().trim();
  if (adminEmail && session.user.email.toLowerCase().trim() !== adminEmail) {
    redirect("/login");
  }

  return (
    <div className="flex min-h-screen w-full flex-col bg-background md:flex-row">
      {/* DESKTOP SIDEBAR */}
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-64 flex-col border-r border-border bg-background md:flex">
        <div className="flex h-16 shrink-0 items-center gap-2.5 border-b border-border/50 px-5">
          <span className="relative h-9 w-9 shrink-0">
            <Image
              src="/LOGO FAKULTAS TEKNIK.webp"
              alt="Logo Fakultas Teknik"
              fill
              sizes="36px"
              priority
              className="object-contain"
            />
          </span>
          <div className="min-w-0">
            <p className="truncate text-sm font-bold leading-none tracking-tight text-emerald-800 dark:text-emerald-300">
              Fakultas Teknik
            </p>
            <p className="mt-1 truncate text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
              Sistem Informasi
            </p>
          </div>
        </div>

        <nav className="flex-1 overflow-y-auto px-3 py-4">
          <NavLinks />
        </nav>

        <div className="shrink-0 border-t border-border/50 p-3">
          <div className="flex items-center justify-between px-2 pb-2">
            <p className="truncate text-xs font-medium text-muted-foreground">
              {session.user.email}
            </p>
            <ThemeToggle />
          </div>
          <LogoutButton />
        </div>
      </aside>

      {/* MAIN CANVAS */}
      <main className="flex-1 min-w-0 md:pl-64">
        <MobileSidebar email={session.user.email} />
        <PageContainer>{children}</PageContainer>
        <ScrollToTopLazy />
        <Toaster />
      </main>
    </div>
  );
}

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Suspense fallback={<DashboardLoadingSkeleton />}>
      <SessionCheck>{children}</SessionCheck>
    </Suspense>
  );
}
