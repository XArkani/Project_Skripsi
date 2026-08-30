import { Skeleton } from "@/components/ui/skeleton"
import LoadingTable from "@/components/dashboard/loading-table"
import PageContainer from "@/components/dashboard/page-container"

export default function DashboardLoading() {
  return (
    <PageContainer className="space-y-6">
      <div className="space-y-1.5" aria-hidden="true">
        <Skeleton className="h-3 w-24" />
        <Skeleton className="h-8 w-64" />
        <Skeleton className="h-4 w-80 max-w-full" />
      </div>
      <LoadingTable />
    </PageContainer>
  )
}