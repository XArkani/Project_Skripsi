import { DashboardStats } from "@/components/admin/DashboardStats"

export default function DashboardPage() {
  return (
    <div className="w-full">
      <header className="mb-10">
        <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-emerald-700">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" aria-hidden="true" />
          Fakultas Teknik
        </p>
        <h1 className="mt-2 text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">Dashboard</h1>
        <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
          Ringkasan seluruh data konten portal fakultas.
        </p>
      </header>
      <DashboardStats />
    </div>
  )
}