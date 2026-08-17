import { getMessages } from "@/lib/faculty"
import { MessagesManager } from "@/components/admin/MessagesManager"

export default async function MessagesAdminPage() {
  const data = await getMessages()
  return <MessagesManager initialData={data} />
}
