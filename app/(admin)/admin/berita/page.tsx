import { getNews } from "@/lib/faculty"
import { CrudManager } from "@/components/admin/CrudManager"
import { newsFields } from "@/lib/admin-field-configs"

export default async function BeritaAdminPage() {
  const data = await getNews()
  return <CrudManager title="Kelola Berita" modelName="news" fields={newsFields} initialData={data} />
}
