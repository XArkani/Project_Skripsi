"use client"

import { UploadButton } from "@/lib/uploadthing-client"
import { ImagePlus, X } from "lucide-react"

interface ImageUploadProps {
  value: string
  onChange: (url: string) => void
}

export function ImageUpload({ value, onChange }: ImageUploadProps) {
  return (
    <div className="space-y-2">
      {value ? (
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
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      ) : (
        <div className="flex items-center gap-2">
          <UploadButton
            endpoint="imageUploader"
            onClientUploadComplete={(res) => {
              if (res?.[0]?.ufsUrl) onChange(res[0].ufsUrl)
            }}
            appearance={{
              button:
                "flex items-center gap-2 text-xs font-bold px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 cursor-pointer",
            }}
          />
          <span className="text-xs text-muted-foreground">
            <ImagePlus className="h-4 w-4 inline mr-1" />
            Upload gambar
          </span>
        </div>
      )}
    </div>
  )
}
