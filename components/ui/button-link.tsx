import type { ReactNode } from "react"
import Link from "next/link"
import { cn } from "@/lib/utils"

type Variant = "primary" | "secondary" | "on-dark"
type Size = "sm" | "md" | "lg"

const base =
  "inline-flex h-11 items-center justify-center gap-2 rounded-xl px-6 text-sm font-semibold transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600"

const variants: Record<Variant, string> = {
  primary: "bg-emerald-700 text-white hover:bg-emerald-800",
  secondary:
    "border border-border bg-background text-foreground hover:border-emerald-700 hover:text-emerald-700",
  "on-dark": "bg-white text-emerald-900 hover:bg-emerald-100",
}

const sizes: Record<Size, string> = {
  sm: "h-10 px-5",
  md: "h-11 px-6",
  lg: "h-[3.25rem] px-8",
}

interface ButtonLinkProps {
  href: string
  variant?: Variant
  size?: Size
  className?: string
  children: ReactNode
}

export default function ButtonLink({
  href,
  variant = "primary",
  size = "md",
  className,
  children,
}: ButtonLinkProps) {
  return (
    <Link href={href} className={cn(base, variants[variant], sizes[size], className)}>
      {children}
    </Link>
  )
}