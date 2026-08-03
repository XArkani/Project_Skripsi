"use client"

import { HelpCircle } from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"
import type { FAQ } from "@/lib/types"

interface FaqPreviewProps {
  items: FAQ[]
}

export default function FaqPreview({ items }: FaqPreviewProps) {

  return (
    <motion.section
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="py-12 sm:py-16 bg-slate-50"
    >
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 text-center mb-6">
          Pertanyaan yang Sering Diajukan
        </h2>

        <div className="space-y-3">
          {items.slice(0, 4).map((faq) => (
            <div key={faq.id} className="bg-white p-4 sm:p-5 rounded-xl border border-slate-200/80">
              <h4 className="font-bold text-slate-800 text-sm sm:text-base flex items-start gap-2">
                <HelpCircle className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                <span>{faq.question}</span>
              </h4>
              <p className="text-slate-600 text-sm mt-2 pl-6 leading-relaxed">{faq.answer}</p>
            </div>
          ))}
        </div>

        <div className="text-center mt-6">
          <Link
            href="/faq"
            className="inline-block bg-emerald-600 hover:bg-emerald-700 text-white font-medium text-sm px-5 py-2 rounded-lg transition-colors"
          >
            Lihat FAQ Selengkapnya
          </Link>
        </div>
      </div>
    </motion.section>
  )
}
