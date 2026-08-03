import { getEvents } from "@/lib/faculty"
import { CrudManager } from "@/components/admin/CrudManager"
import { eventFields } from "@/lib/admin-field-configs"

export default async function EventAdminPage() {
  const data = await getEvents()
  return <CrudManager title="Kelola Agenda & Acara" modelName="event" fields={eventFields} initialData={data} />
}
