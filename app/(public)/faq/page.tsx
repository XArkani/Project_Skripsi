"use client"

import { useState, useEffect, useMemo } from "react"
import Link from "next/link"
import { getFAQs } from "@/lib/faculty"
import { Search, HelpCircle } from "lucide-react"
import type { FAQ } from "@/lib/types"

function FAQCard({ faq }: { faq: FAQ }) {
  return (
    <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
      <h3 className="font-extrabold text-slate-800 text-sm sm:text-base flex items-start gap-2">
        <HelpCircle className="w-4 h-4 text-emerald-600 mt-0.5 flex-shrink-0" />
        {faq.question}
      </h3>
      <p className="text-slate-600 text-xs sm:text-sm mt-3 pl-6 border-l-2 border-emerald-500 leading-relaxed">{faq.answer}</p>
    </div>
  )
}

export default function FAQPage() {
  const [faqSearchQuery, setFaqSearchQuery] = useState("")
  const [faqs, setFaqs] = useState<FAQ[]>([])

  useEffect(() => {
    getFAQs().then(setFaqs)
  }, [])

  const filteredFaqs = useMemo(() => {
    if (!faqSearchQuery) return faqs
    return faqs.filter(
      (item) =>
        item.question.toLowerCase().includes(faqSearchQuery.toLowerCase()) ||
        item.answer.toLowerCase().includes(faqSearchQuery.toLowerCase())
    )
  }, [faqs, faqSearchQuery])

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6">
      <div className="border-b border-slate-200 pb-6 mb-10 text-center">
        <span className="text-xs uppercase font-extrabold text-emerald-700 tracking-wider">Pusat Bantuan</span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-950 mt-1">Frequently Asked Questions (FAQ)</h1>
        <p className="text-slate-500 text-sm mt-2">Butuh bantuan kilat? Ketik pertanyaan Anda di bawah ini.</p>
      </div>

      <div className="mb-10">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
          <input
            type="text"
            value={faqSearchQuery}
            onChange={(e) => setFaqSearchQuery(e.target.value)}
            placeholder="Cari kata kunci... (contoh: beasiswa, daftar, akreditasi)"
            className="w-full pl-12 pr-4 py-4 rounded-2xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-sm bg-white shadow-sm"
          />
          {faqSearchQuery && (
            <button
              onClick={() => setFaqSearchQuery("")}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600 font-bold"
            >
              CLEAR
            </button>
          )}
        </div>
      </div>

      <div className="space-y-4">
        {filteredFaqs.length === 0 ? (
          <div className="text-center py-12 text-slate-400 text-sm">
            Tidak ditemukan jawaban untuk pencarian &ldquo;{faqSearchQuery}&rdquo;. Silakan coba kata kunci lain.
          </div>
        ) : (
          filteredFaqs.map((faq) => <FAQCard key={faq.id} faq={faq} />)
        )}
      </div>

      <div className="mt-12 p-6 rounded-2xl bg-emerald-50 border border-emerald-100 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
        <div>
          <h4 className="font-bold text-emerald-900 text-base">Punya pertanyaan spesifik lainnya?</h4>
          <p className="text-slate-500 text-xs sm:text-sm mt-1">Kami siap merespon pertanyaan Anda secara personal dalam 1x24 jam kerja.</p>
        </div>
        <Link
          href="/hubungi"
          className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm px-5 py-2.5 rounded-lg shadow-md transition-all"
        >
          Kirim Pesan Personil
        </Link>
      </div>
    </div>
  )
}
