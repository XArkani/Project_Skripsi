"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import {
  LayoutDashboard,
  ClipboardList,
  GraduationCap,
  Users,
  CalendarDays,
  Newspaper,
  HelpCircle,
  GitBranch,
  Inbox,
  Hexagon,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { authClient } from "@/lib/auth-client"

const navItems = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/blueprint", label: "Blueprint", icon: ClipboardList },
  { href: "/admin/dosen", label: "Dosen", icon: GraduationCap },
  { href: "/admin/ukm", label: "UKM", icon: Users },
  { href: "/admin/event", label: "Event", icon: CalendarDays },
  { href: "/admin/berita", label: "Berita", icon: Newspaper },
  { href: "/admin/faq", label: "FAQ", icon: HelpCircle },
  { href: "/admin/struktur", label: "Struktur", icon: GitBranch },
  { href: "/admin/messages", label: "Messages", icon: Inbox },
]

export function AdminSidebar({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const router = useRouter()
  const { data: session } = authClient.useSession()

  async function handleLogout() {
    await authClient.signOut()
    router.push("/login")
  }

  return (
    <div className="flex min-h-screen w-full bg-background">
      <aside className="hidden md:flex flex-col w-64 border-r border-border/40 fixed inset-y-0 left-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="flex h-16 items-center px-6 mt-2">
          <div className="flex items-center gap-2">
            <Hexagon className="h-5 w-5 text-primary fill-primary/10" />
            <p className="font-bold tracking-tight text-lg">Admin Panel</p>
          </div>
        </div>

        <nav className="flex-1 px-4 py-6 overflow-y-auto space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href
            return (
              <Link
                key={item.href}
                href={item.href}
                data-active={isActive || undefined}
                className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all data-[active]:bg-primary data-[active]:text-primary-foreground data-[active]:shadow-sm text-muted-foreground hover:bg-muted"
              >
                <Icon className="h-4 w-4" />
                {item.label}
              </Link>
            )
          })}
        </nav>

        <div className="mt-auto p-4 pb-6">
          <div className="flex flex-col gap-3">
            <p className="text-xs font-medium text-muted-foreground px-2 truncate">
              {session?.user?.email}
            </p>
            <Button variant="destructive" size="sm" onClick={handleLogout} className="w-full cursor-pointer">
              Keluar
            </Button>
          </div>
        </div>
      </aside>

      <main className="flex-1 w-full md:pl-64">
        {/* Mobile header + nav */}
        <div className="md:hidden">
          <div className="flex items-center justify-between px-4 py-3 border-b border-border">
            <div className="flex items-center gap-2">
              <Hexagon className="h-5 w-5 text-primary fill-primary/10" />
              <p className="font-bold">Admin Panel</p>
            </div>
            <Button variant="destructive" size="xs" onClick={handleLogout} className="cursor-pointer">
              Keluar
            </Button>
          </div>
          <div className="flex overflow-x-auto px-4 py-3 gap-2 border-b border-border/50">
            {navItems.map((item) => {
              const Icon = item.icon
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  data-active={isActive || undefined}
                  className="whitespace-nowrap px-3 py-1.5 rounded-lg text-xs font-bold transition-all data-[active]:bg-primary data-[active]:text-primary-foreground bg-card text-muted-foreground hover:bg-muted"
                >
                  <Icon className="h-3.5 w-3.5 inline-block mr-1" />
                  {item.label}
                </Link>
              )
            })}
          </div>
        </div>

        <div className="mx-auto max-w-6xl p-4 md:p-8 lg:p-12">
          {children}
        </div>
      </main>
    </div>
  )
}
