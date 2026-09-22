export const instant = false

import { getMessages } from "@/lib/faculty"
import { MessagesManager } from "@/components/admin/MessagesManager"
import PageHeader from "@/components/dashboard/page-header"

export default async function MessagesAdminPage() {
  const data = await getMessages()
  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Kelola Konten"
        title="Pesan Masuk"
        description="Pesan yang dikirim melalui halaman Hubungi Kami."
      />
      <MessagesManager initialData={data} />
    </div>
  )
}