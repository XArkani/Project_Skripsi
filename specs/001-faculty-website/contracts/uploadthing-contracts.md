# UploadThing Contracts

## FileRouter Definition

```typescript
import { createUploadthing, type FileRouter } from "uploadthing/next"

const f = createUploadthing()

export const uploadRouter = {
  imageUploader: f({
    image: { maxFileSize: "4MB", maxFileCount: 1 },
  })
    .middleware(async ({ req }) => {
      const session = await auth.api.getSession({ headers: req.headers })
      if (!session) throw new UploadThingError("Unauthorized")
      return { userId: session.user.id }
    })
    .onUploadComplete(async ({ metadata, file }) => {
      return { url: file.ufsUrl }
    }),
} satisfies FileRouter

export type OurFileRouter = typeof uploadRouter
```

## Usage in Components

```typescript
import { UploadDropzone } from "@/lib/uploadthing"
import type { OurFileRouter } from "@/lib/uploadthing"

<UploadDropzone<OurFileRouter>
  endpoint="imageUploader"
  onClientUploadComplete={(res) => {
    setImageUrl(res[0].ufsUrl)
  }}
  onUploadError={(error) => {
    toast.error("Upload gagal")
  }}
/>
```
