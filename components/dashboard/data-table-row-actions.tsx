"use client"

import { useState } from "react"
import { MoreHorizontal, Eye, Pencil, Trash2 } from "lucide-react"
import type { LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetTitle } from "@/components/ui/sheet"

interface DataTableRowActionsProps {
  onView?: () => void
  onEdit?: () => void
  onDelete?: () => void
  disabled?: boolean
}

const triggerClass =
  "inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600 disabled:pointer-events-none disabled:opacity-40"

function SheetAction({
  icon: Icon,
  label,
  onSelect,
  destructive = false,
}: {
  icon: LucideIcon
  label: string
  onSelect: () => void
  destructive?: boolean
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={cn(
        "flex min-h-12 w-full items-center gap-3 rounded-xl px-3 text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600",
        destructive
          ? "text-destructive hover:bg-destructive/10"
          : "text-foreground hover:bg-muted"
      )}
    >
      <Icon className="h-[18px] w-[18px]" aria-hidden="true" />
      {label}
    </button>
  )
}

export default function DataTableRowActions({
  onView,
  onEdit,
  onDelete,
  disabled,
}: DataTableRowActionsProps) {
  const [sheetOpen, setSheetOpen] = useState(false)

  const run = (action?: () => void) => {
    setSheetOpen(false)
    action?.()
  }

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger
          disabled={disabled}
          className={cn(triggerClass, "hidden md:inline-flex")}
          aria-label="Aksi baris"
        >
          <MoreHorizontal className="h-[18px] w-[18px]" />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-44">
          {onView && (
            <DropdownMenuItem onSelect={onView} className="cursor-pointer">
              <Eye />
              Lihat Detail
            </DropdownMenuItem>
          )}
          {onEdit && (
            <DropdownMenuItem onSelect={onEdit} className="cursor-pointer">
              <Pencil />
              Edit
            </DropdownMenuItem>
          )}
          {onDelete && (
            <>
              <DropdownMenuSeparator />
              <DropdownMenuItem onSelect={onDelete} variant="destructive" className="cursor-pointer">
                <Trash2 />
                Hapus
              </DropdownMenuItem>
            </>
          )}
        </DropdownMenuContent>
      </DropdownMenu>

      <button
        type="button"
        disabled={disabled}
        onClick={() => setSheetOpen(true)}
        className={cn(triggerClass, "md:hidden")}
        aria-label="Aksi baris"
        aria-haspopup="dialog"
      >
        <MoreHorizontal className="h-[18px] w-[18px]" />
      </button>

      <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
        <SheetContent
          side="bottom"
          aria-describedby={undefined}
          className="max-h-[85dvh] rounded-t-3xl border-t border-border bg-background pb-[calc(10px+env(safe-area-inset-bottom))] md:hidden"
        >
          <SheetTitle className="sr-only">Aksi data</SheetTitle>
          <div className="mx-auto mt-3 h-1.5 w-10 rounded-full bg-border" aria-hidden="true" />
          <div className="flex flex-col gap-1 px-3 pb-1 pt-3">
            {onView && <SheetAction icon={Eye} label="Lihat Detail" onSelect={() => run(onView)} />}
            {onEdit && <SheetAction icon={Pencil} label="Edit" onSelect={() => run(onEdit)} />}
            {onDelete && (
              <>
                <div className="my-2 border-t border-border/60" aria-hidden="true" />
                <SheetAction icon={Trash2} label="Hapus" destructive onSelect={() => run(onDelete)} />
              </>
            )}
          </div>
        </SheetContent>
      </Sheet>
    </>
  )
}
