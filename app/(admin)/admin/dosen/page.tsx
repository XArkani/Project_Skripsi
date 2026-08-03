import { getDosen } from "@/lib/faculty"
import { CrudManager } from "@/components/admin/CrudManager"
import { dosenFields } from "@/lib/admin-field-configs"

export default async function DosenAdminPage() {
  const data = await getDosen()
  return <CrudManager title="Kelola Profil Dosen" modelName="dosen" fields={dosenFields} initialData={data} />
}
