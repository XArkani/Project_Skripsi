import { cacheTag } from "next/cache"
import { getFAQs } from "@/lib/faculty"
import FaqSearch from "@/components/sections/FaqSearch"

export default async function FAQPage() {
  "use cache"
  cacheTag("faq")

  const faqs = await getFAQs()

  return (
    <div className="max-w-4xl mx-auto page-gutter pt-20 sm:pt-28 pb-16 sm:pb-24">
      <div className="border-b border-border pb-8 mb-6 text-center">
        <span className="text-xs uppercase font-extrabold text-emerald-700 dark:text-emerald-400 tracking-wider">Pusat Bantuan</span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-foreground mt-1.5">Frequently Asked Questions (FAQ)</h1>
        <p className="text-muted-foreground text-sm sm:text-base mt-2 max-w-2xl mx-auto leading-relaxed">Butuh bantuan kilat? Ketik pertanyaan Anda di bawah ini.</p>
      </div>

      <FaqSearch faqs={faqs} />
    </div>
  )
}
