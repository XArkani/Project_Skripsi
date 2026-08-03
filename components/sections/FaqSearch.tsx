"use client"

import { useState, useMemo } from "react"
import Link from "next/link"
import { Search, HelpCircle } from "lucide-react"
import type { FAQ } from "@/lib/types"
import EmptyState from "@/components/shared/EmptyState"

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

interface FaqSearchProps {
  faqs: FAQ[]
}

export default function FaqSearch({ faqs }: FaqSearchProps) {
  const [searchQuery, setSearchQuery] = useState("")

  const filteredFaqs = useMemo(() => {
    if (!searchQuery) return faqs
    return faqs.filter(
      (item) =>
        item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.answer.toLowerCase().includes(searchQuery.toLowerCase())
    )
  }, [faqs, searchQuery])

  return (
    <>
      <div className="mb-10">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari kata kunci... (contoh: beasiswa, daftar, akreditasi)"
            className="w-full pl-12 pr-4 py-4 rounded-2xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-sm bg-white shadow-sm"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600 font-bold"
            >
              CLEAR
            </button>
          )}
        </div>
      </div>

      <div className="space-y-4">
        {faqs.length === 0 ? (
          <EmptyState title="Belum ada FAQ" description="Belum ada pertanyaan yang tersedia saat ini. Silakan kembali lagi nanti." />
        ) : filteredFaqs.length === 0 ? (
          <div className="text-center py-12 text-slate-400 text-sm">
            Tidak ditemukan jawaban untuk pencarian &ldquo;{searchQuery}&rdquo;. Silakan coba kata kunci lain.
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
    </>
  )
}
