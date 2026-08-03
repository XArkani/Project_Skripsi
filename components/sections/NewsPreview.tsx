"use client"

import { ArrowRight } from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"
import type { News } from "@/lib/types"
import ImagePlaceholder from "@/components/shared/ImagePlaceholder"

interface NewsPreviewProps {
  items: News[]
}

export default function NewsPreview({ items }: NewsPreviewProps) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="py-16 bg-white"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10">
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              Kabar & Berita Terbaru
            </h2>
            <p className="text-slate-500 text-sm sm:text-base mt-2">
              Mengabarkan kiprah prestasi, riset kolaboratif, serta informasi penting dari dekanat.
            </p>
          </div>
          <Link
            href="/berita"
            className="mt-4 md:mt-0 text-emerald-700 hover:text-emerald-800 font-bold text-sm inline-flex items-center space-x-1"
          >
            <span>Lihat Semua Berita</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {items.slice(0, 3).map((article) => (
            <article key={article.id} className="group flex flex-col justify-between">
              <div className="space-y-3">
                <div className="h-48 rounded-xl overflow-hidden relative">
                  {article.image ? (
                    <img
                      src={article.image}
                      alt={article.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-all duration-500"
                    />
                  ) : (
                    <ImagePlaceholder label="Gambar Berita" className="w-full h-full" />
                  )}
                </div>
                <span className="text-slate-400 text-xs font-semibold block">{article.date}</span>
                <h3 className="font-bold text-lg text-slate-900 group-hover:text-emerald-700 transition-colors line-clamp-2">
                  <Link href={`/berita/${article.slug}`}>{article.title}</Link>
                </h3>
                <p className="text-slate-500 text-sm line-clamp-3">{article.excerpt}</p>
              </div>
              <Link
                href={`/berita/${article.slug}`}
                className="mt-4 text-emerald-700 hover:text-emerald-800 font-bold text-xs inline-flex items-center space-x-1 self-start"
              >
                <span>Baca Berita Selengkapnya</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </article>
          ))}
        </div>
      </div>
    </motion.section>
  )
}
