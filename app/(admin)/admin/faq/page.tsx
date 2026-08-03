import { getFAQs } from "@/lib/faculty"
import { CrudManager } from "@/components/admin/CrudManager"
import { faqFields } from "@/lib/admin-field-configs"

export default async function FAQAdminPage() {
  const data = await getFAQs()
  return <CrudManager title="Kelola FAQ" modelName="faq" fields={faqFields} initialData={data} />
}
