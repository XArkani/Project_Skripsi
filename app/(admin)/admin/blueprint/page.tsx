import { getBlueprints } from "@/lib/faculty"
import { CrudManager } from "@/components/admin/CrudManager"
import { blueprintFields } from "@/lib/admin-field-configs"

export default async function BlueprintAdminPage() {
  const data = await getBlueprints()
  return <CrudManager title="Kelola Blueprint & Sarana Prasarana" modelName="blueprint" fields={blueprintFields} initialData={data} />
}
