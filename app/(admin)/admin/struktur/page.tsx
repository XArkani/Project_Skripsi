import { getStruktur } from "@/lib/faculty"
import { CrudManager } from "@/components/admin/CrudManager"
import { strukturFields } from "@/lib/admin-field-configs"

export default async function StrukturAdminPage() {
  const data = await getStruktur()
  return <CrudManager title="Kelola Struktur Organisasi" modelName="struktur" fields={strukturFields} initialData={data} />
}
