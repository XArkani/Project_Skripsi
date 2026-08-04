import { DashboardStats } from "@/components/admin/DashboardStats"

export default function DashboardPage() {
  return (
    <div className="space-y-6 w-full">
      <div>
        <h1 className="text-2xl font-extrabold text-foreground">Dashboard</h1>
        <p className="text-sm text-muted-foreground">Ringkasan seluruh data konten portal fakultas.</p>
      </div>
      <DashboardStats />
    </div>
  )
}