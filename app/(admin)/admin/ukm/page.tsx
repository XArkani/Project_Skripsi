import { getUKM } from "@/lib/faculty"
import { CrudManager } from "@/components/admin/CrudManager"
import { ukmFields } from "@/lib/admin-field-configs"

export default async function UKMAdminPage() {
  const data = await getUKM()
  return <CrudManager title="Kelola Unit Kegiatan Mahasiswa" modelName="ukm" fields={ukmFields} initialData={data} />
}
