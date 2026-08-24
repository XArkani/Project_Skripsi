"use client"

import { useState, useMemo } from "react"
import { Search, HelpCircle, ChevronDown } from "lucide-react"
import type { FAQ } from "@/lib/types"
import EmptyState from "@/components/shared/EmptyState"
import { cn } from "@/lib/utils"

function FAQItem({ faq, isOpen, onToggle }: { faq: FAQ; isOpen: boolean; onToggle: () => void }) {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        aria-controls={`faq-answer-${faq.id}`}
        className="w-full flex items-start justify-between gap-3 p-5 text-left cursor-pointer hover:bg-slate-50 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-inset"
      >
        <span className="flex items-start gap-2 flex-1">
          <HelpCircle className="w-4 h-4 text-emerald-600 mt-0.5 flex-shrink-0" />
          <span className="font-extrabold text-slate-800 text-sm sm:text-base">{faq.question}</span>
        </span>
        <ChevronDown className={cn("w-4 h-4 text-slate-400 shrink-0 mt-1 transition-transform duration-200", isOpen && "rotate-180")} />
      </button>
      <div
        id={`faq-answer-${faq.id}`}
        role="region"
        hidden={!isOpen}
        className={cn(!isOpen && "hidden")}
      >
        <p className="text-slate-600 text-xs sm:text-sm px-5 pb-5 pl-11 leading-relaxed">{faq.answer}</p>
      </div>
    </div>
  )
}

interface FaqSearchProps {
  faqs: FAQ[]
}

export default function FaqSearch({ faqs }: FaqSearchProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [openId, setOpenId] = useState<string | null>(null)

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
          filteredFaqs.map((faq) => (
            <FAQItem key={faq.id} faq={faq} isOpen={openId === faq.id} onToggle={() => setOpenId((prev) => (prev === faq.id ? null : faq.id))} />
          ))
        )}
      </div>
    </>
  )
}
