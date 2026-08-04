import { getNews, getMessages, getDosen, getEvents, getUKM, getBlueprints, getFAQs, getStruktur } from "@/lib/faculty"
import { Card, CardContent } from "@/components/ui/card"
import { Newspaper, Inbox, GraduationCap, CalendarDays, ClipboardList, HelpCircle, GitBranch, Users } from "lucide-react"

export async function DashboardStats() {
  const [news, messages, dosen, events, ukm, blueprints, faqs, struktur] = await Promise.all([
    getNews(), getMessages(), getDosen(), getEvents(), getUKM(), getBlueprints(), getFAQs(), getStruktur(),
  ])

  const stats = [
    { label: "Berita", count: news.length, icon: Newspaper, color: "text-emerald-700 bg-emerald-50" },
    { label: "Dosen", count: dosen.length, icon: GraduationCap, color: "text-blue-700 bg-blue-50" },
    { label: "Event", count: events.length, icon: CalendarDays, color: "text-amber-700 bg-amber-50" },
    { label: "UKM", count: ukm.length, icon: Users, color: "text-purple-700 bg-purple-50" },
    { label: "Blueprint", count: blueprints.length, icon: ClipboardList, color: "text-cyan-700 bg-cyan-50" },
    { label: "FAQ", count: faqs.length, icon: HelpCircle, color: "text-rose-700 bg-rose-50" },
    { label: "Struktur", count: struktur.length, icon: GitBranch, color: "text-indigo-700 bg-indigo-50" },
    { label: "Pesan", count: messages.length, icon: Inbox, color: "text-red-700 bg-red-50" },
  ]

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {stats.map((stat) => {
        const Icon = stat.icon
        return (
          <Card key={stat.label} size="sm">
            <CardContent className="flex items-center gap-4 py-4">
              <div className={`p-2.5 rounded-xl ${stat.color}`}>
                <Icon className="h-5 w-5" />
              </div>
              <div>
                <p className="text-2xl font-extrabold">{stat.count}</p>
                <p className="text-xs text-muted-foreground font-medium">{stat.label}</p>
              </div>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}