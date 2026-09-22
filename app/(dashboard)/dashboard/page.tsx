import { Suspense } from "react"
import { DashboardStats } from "@/components/admin/DashboardStats"
import PageHeader from "@/components/dashboard/page-header"
import { Skeleton } from "@/components/ui/skeleton"

export const instant = false

function DashboardStatsSkeleton() {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3 sm:gap-4 xl:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <Skeleton key={i} className="h-28 rounded-2xl" />
        ))}
      </div>
      <Skeleton className="h-32 rounded-2xl" />
    </div>
  )
}

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Ringkasan Portal"
        title="Dashboard"
        description="Ringkasan aktivitas portal Fakultas Teknik."
      />
      <Suspense fallback={<DashboardStatsSkeleton />}>
        <DashboardStats />
      </Suspense>
    </div>
  )
}