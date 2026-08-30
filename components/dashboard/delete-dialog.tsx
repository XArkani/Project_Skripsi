"use client"

import { Loader2, Trash2 } from "lucide-react"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogMedia,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

interface DeleteDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  itemLabel?: string
  scopeLabel?: string
  pending?: boolean
  error?: string | null
  onConfirm: () => void
}

export default function DeleteDialog({
  open,
  onOpenChange,
  itemLabel,
  scopeLabel = "data",
  pending = false,
  error,
  onConfirm,
}: DeleteDialogProps) {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent size="sm" className="sm:max-w-md">
        <AlertDialogHeader>
          <AlertDialogMedia className="bg-destructive/10 text-destructive">
            <Trash2 aria-hidden="true" />
          </AlertDialogMedia>
          <AlertDialogTitle>Hapus data ini?</AlertDialogTitle>
          <AlertDialogDescription>
            {itemLabel ? (
              <>
                <span className="font-semibold break-words text-foreground">&ldquo;{itemLabel}&rdquo;</span>{" "}
                akan dihapus permanen dari {scopeLabel}. Tindakan ini tidak dapat dibatalkan.
              </>
            ) : (
              <>Data yang dipilih akan dihapus permanen dari {scopeLabel}. Tindakan ini tidak dapat dibatalkan.</>
            )}
          </AlertDialogDescription>
        </AlertDialogHeader>
        {error && (
          <p className="text-sm font-medium text-destructive" role="alert">
            {error}
          </p>
        )}
        <AlertDialogFooter>
          <AlertDialogCancel disabled={pending} className="cursor-pointer">
            Batal
          </AlertDialogCancel>
          <AlertDialogAction
            disabled={pending}
            onClick={(e) => {
              e.preventDefault()
              onConfirm()
            }}
            className="cursor-pointer bg-destructive text-white hover:bg-destructive/90 disabled:opacity-50"
          >
            {pending ? <Loader2 className="size-4 animate-spin" /> : <Trash2 className="size-4" />}
            Hapus
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}