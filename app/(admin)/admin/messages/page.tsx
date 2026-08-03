import { getMessages } from "@/lib/faculty"
import { CrudManager } from "@/components/admin/CrudManager"
import { messageFields } from "@/lib/admin-field-configs"

export default async function MessagesAdminPage() {
  const data = await getMessages()
  return <CrudManager title="Kotak Masuk Pesan" modelName="message" fields={messageFields} initialData={data} />
}
