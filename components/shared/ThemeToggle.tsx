"use client"

import { useSyncExternalStore } from "react"
import { useTheme } from "@/components/shared/theme-provider"
import { Monitor, Moon, Sun } from "lucide-react"
import { cn } from "@/lib/utils"

const THEME_LABEL: Record<string, string> = {
  light: "Tema terang",
  dark: "Tema gelap",
  system: "Tema sistem",
}

export function ThemeToggle({ className }: { className?: string }) {
  const { theme, setTheme } = useTheme()
  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  )

  function cycleTheme() {
    const next = theme === "light" ? "dark" : theme === "dark" ? "system" : "light"
    setTheme(next)
  }

  const Icon = theme === "dark" ? Moon : theme === "system" ? Monitor : Sun

  if (!mounted) {
    return (
      <span
        className={cn(
          "grid h-11 w-11 shrink-0 place-items-center rounded-lg border border-border bg-background",
          className
        )}
        aria-hidden="true"
      />
    )
  }

  return (
    <button
      type="button"
      onClick={cycleTheme}
      aria-label={THEME_LABEL[theme ?? "system"] ?? "Ganti tema"}
      className={cn(
        "grid h-11 w-11 shrink-0 cursor-pointer place-items-center rounded-lg border border-border bg-background text-muted-foreground transition-colors hover:text-emerald-700",
        className
      )}
    >
      <Icon className="h-5 w-5" aria-hidden="true" />
    </button>
  )
}