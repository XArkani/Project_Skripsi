import { cacheTag } from "next/cache"
import { getFAQs } from "@/lib/faculty"
import FaqSearch from "@/components/sections/FaqSearch"

export default async function FAQPage() {
  "use cache"
  cacheTag("faq")

  const faqs = await getFAQs()

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-24 sm:pt-28 pb-20 sm:pb-24">
      <div className="border-b border-border pb-6 mb-10 text-center">
        <span className="text-xs uppercase font-extrabold text-emerald-700 tracking-wider">Pusat Bantuan</span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-foreground mt-1">Frequently Asked Questions (FAQ)</h1>
        <p className="text-muted-foreground text-sm mt-2">Butuh bantuan kilat? Ketik pertanyaan Anda di bawah ini.</p>
      </div>

      <FaqSearch faqs={faqs} />
    </div>
  )
}
