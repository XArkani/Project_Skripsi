"use client"

import { AlertTriangle } from "lucide-react"
import { Button } from "@/components/ui/button"

interface ErrorStateProps {
  title?: string
  description?: string
  onRetry?: () => void
}

export default function ErrorState({
  title = "Gagal memuat data",
  description = "Terjadi masalah saat mengambil data. Coba lagi beberapa saat.",
  onRetry,
}: ErrorStateProps) {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-border px-6 py-10 text-center sm:py-16">
      <span className="grid h-12 w-12 place-items-center rounded-full bg-destructive/10 text-destructive">
        <AlertTriangle className="h-6 w-6" aria-hidden="true" />
      </span>
      <h3 className="mt-4 text-base font-semibold text-foreground">{title}</h3>
      <p className="mt-1 max-w-sm text-sm text-muted-foreground">{description}</p>
      {onRetry && (
        <Button type="button" variant="outline" onClick={onRetry} className="mt-5 cursor-pointer">
          Coba Lagi
        </Button>
      )}
    </div>
  )
}