import { Skeleton } from "@/components/ui/skeleton";

export function DashboardLoadingSkeleton() {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="mx-auto flex h-14 max-w-5xl items-center gap-3 px-4">
          <Skeleton className="h-11 w-11 shrink-0 rounded-lg md:hidden" />
          <Skeleton className="h-8 w-8 shrink-0 rounded md:hidden" />
          <Skeleton className="h-6 w-24" />
          <div className="ml-auto flex items-center gap-3">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-10 w-10 rounded-lg" />
          </div>
        </div>
      </header>
      <main className="mx-auto max-w-5xl px-4 pb-24 pt-7 md:py-8">
        <div className="space-y-6">
          <div className="space-y-2">
            <Skeleton className="h-8 w-48" />
            <Skeleton className="h-4 w-32" />
          </div>
          <div className="space-y-4">
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-12 w-full" />
          </div>
        </div>
      </main>
    </div>
  );
}
