import { DashboardStats } from "@/components/admin/DashboardStats"
import PageHeader from "@/components/dashboard/page-header"

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Ringkasan Portal"
        title="Dashboard"
        description="Ringkasan aktivitas portal Fakultas Teknik."
      />
      <DashboardStats />
    </div>
  )
}