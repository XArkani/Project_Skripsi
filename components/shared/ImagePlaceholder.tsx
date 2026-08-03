import { ImageIcon } from "lucide-react"
import { cn } from "@/lib/utils"

interface ImagePlaceholderProps {
  label?: string
  className?: string
}

export default function ImagePlaceholder({ label = "Gambar", className }: ImagePlaceholderProps) {
  return (
    <div className={cn("flex flex-col items-center justify-center gap-2 bg-gradient-to-br from-slate-100 to-slate-200 text-slate-400", className)}>
      <ImageIcon className="h-8 w-8" />
      <span className="text-xs font-semibold tracking-wide">{label}</span>
    </div>
  )
}
