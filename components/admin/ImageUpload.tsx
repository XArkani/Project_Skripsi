"use client"

import { useState } from "react"
import { UploadButton } from "@/lib/uploadthing-client"
import { toast } from "sonner"
import { ImagePlus, RefreshCw, X } from "lucide-react"

interface ImageUploadProps {
  value: string
  onChange: (url: string) => void
}

export function ImageUpload({ value, onChange }: ImageUploadProps) {
  const [error, setError] = useState<string | null>(null)

  const uploadButton = (
    <UploadButton
      endpoint="imageUploader"
      onClientUploadComplete={(res) => {
        setError(null)
        if (res?.[0]?.ufsUrl) {
          onChange(res[0].ufsUrl)
          toast.success("Gambar berhasil diunggah.")
        }
      }}
      onUploadError={(err) => {
        setError(err.message)
        toast.error(err.message || "Gagal mengunggah gambar.")
      }}
      appearance={{
        button:
          "flex items-center gap-2 text-xs font-bold px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 cursor-pointer",
      }}
    />
  )

  return (
    <div className="space-y-2">
      {value ? (
        <div className="space-y-3">
          <div className="relative inline-block">
            <img
              src={value}
              alt="Preview"
              className="w-40 h-32 object-cover rounded-lg border border-border"
            />
            <button
              type="button"
              onClick={() => onChange("")}
              className="absolute -top-2 -right-2 bg-destructive text-destructive-foreground rounded-full p-0.5 cursor-pointer"
              aria-label="Hapus gambar"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
          <div className="flex items-center gap-2">
            {uploadButton}
            <span className="text-xs text-muted-foreground">
              <RefreshCw className="h-4 w-4 inline mr-1" />
              Ganti gambar
            </span>
          </div>
        </div>
      ) : (
        <div className="flex items-center gap-2">
          {uploadButton}
          <span className="text-xs text-muted-foreground">
            <ImagePlus className="h-4 w-4 inline mr-1" />
            Upload gambar
          </span>
        </div>
      )}
      {error && <p className="text-xs font-medium text-destructive" role="alert">{error}</p>}
    </div>
  )
}
