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
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="py-16 bg-slate-50"
    >
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-10">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            Pertanyaan yang Sering Diajukan
          </h2>
          <p className="text-slate-500 text-sm mt-2">
            Dapatkan jawaban instan terkait perkuliahan dan sistem operasional administrasi kampus.
          </p>
        </div>

        <div className="space-y-4">
          {items.slice(0, 3).map((faq) => (
            <div
              key={faq.id}
              className="bg-white p-5 rounded-xl border border-slate-200/80"
            >
              <h4 className="font-bold text-slate-800 text-sm sm:text-base flex items-start space-x-2">
                <HelpCircle className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                <span>{faq.question}</span>
              </h4>
              <p className="text-slate-600 text-xs sm:text-sm mt-2 pl-6 border-l-2 border-emerald-500 leading-relaxed">
                {faq.answer}
              </p>
            </div>
          ))}
        </div>

        <div className="text-center mt-8">
          <Link
            href="/faq"
            className="inline-block bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm px-6 py-2.5 rounded-lg shadow transition-all"
          >
            Lihat FAQ Selengkapnya
          </Link>
        </div>
      </div>
    </motion.section>
  )
}
