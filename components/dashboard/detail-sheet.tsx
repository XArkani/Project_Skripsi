"use client"

import Link from "next/link"
import { cn } from "@/lib/utils"
import {
  Sheet,
  SheetBody,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetCloseButton,
} from "@/components/ui/sheet"

export interface DetailField {
  label: string
  value: React.ReactNode
  multiline?: boolean
}

interface DetailSheetProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  title: string
  subtitle?: string
  fields: DetailField[]
  footer?: React.ReactNode
}

function renderValue(field: DetailField) {
  const v = field.value
  if (v == null || v === "") return <span className="text-muted-foreground">—</span>
  if (field.multiline) {
    return <p className="whitespace-pre-wrap rounded-lg bg-muted/40 p-3 text-sm leading-relaxed text-foreground">{v}</p>
  }
  if (typeof v === "string" && /^https?:\/\//i.test(v)) {
    return (
      <Link
        href={v}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex max-w-full items-center gap-1 truncate text-sm text-emerald-700 underline underline-offset-4 hover:text-emerald-800"
      >
        <span className="truncate">{v}</span>
      </Link>
    )
  }
  return <p className="text-sm text-foreground">{v}</p>
}

export default function DetailSheet({
  open,
  onOpenChange,
  title,
  subtitle,
  fields,
  footer,
}: DetailSheetProps) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right">
        <SheetCloseButton />
        <SheetHeader>
          <SheetTitle className="pr-8">{title}</SheetTitle>
          {subtitle && <SheetDescription className="pr-8">{subtitle}</SheetDescription>}
        </SheetHeader>
        <SheetBody>
          <dl className="space-y-4">
            {fields.map((f) => (
              <div key={f.label} className={cn(f.multiline && "border-t border-border/50 pt-4")}>
                <dt className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  {f.label}
                </dt>
                <dd className="mt-1">{renderValue(f)}</dd>
              </div>
            ))}
          </dl>
        </SheetBody>
        {footer && <div className="border-t border-border/50 px-5 py-4">{footer}</div>}
      </SheetContent>
    </Sheet>
  )
}