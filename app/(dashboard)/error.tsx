"use client"

import ErrorState from "@/components/dashboard/error-state"
import PageContainer from "@/components/dashboard/page-container"

export default function DashboardError({ reset }: { reset: () => void }) {
  return (
    <PageContainer className="py-10">
      <ErrorState
        title="Gagal memuat data"
        description="Terjadi masalah saat mengambil data halaman ini. Coba lagi beberapa saat."
        onRetry={reset}
      />
    </PageContainer>
  )
}