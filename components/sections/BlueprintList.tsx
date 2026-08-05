"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import type { Blueprint } from "@/lib/types"
import ImagePlaceholder from "@/components/shared/ImagePlaceholder"
import { cn } from "@/lib/utils"

interface BlueprintListProps {
  items: Blueprint[]
}

export default function BlueprintList({ items }: BlueprintListProps) {
  const categories = ["Semua", ...Array.from(new Set(items.map((item) => item.category)))]
  const [activeCategory, setActiveCategory] = useState("Semua")
  const filteredItems = activeCategory === "Semua" ? items : items.filter((item) => item.category === activeCategory)

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap gap-2">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
            className={cn(
              "px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-colors",
              activeCategory === category
                ? "bg-emerald-600 text-white shadow-md"
                : "bg-white text-slate-600 border border-slate-200 hover:border-emerald-300 hover:text-emerald-700"
            )}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="space-y-16">
        {filteredItems.map((bp, idx) => (
          <motion.div
            key={bp.id}
            className="grid md:grid-cols-12 gap-8 items-center"
            initial={{ opacity: 0, y: 60, x: idx % 2 === 1 ? 40 : -40 }}
            whileInView={{ opacity: 1, y: 0, x: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <div className={cn("md:col-span-6", idx % 2 === 1 && "md:order-2")}>
              <div className="relative rounded-2xl overflow-hidden shadow-lg aspect-video group">
                <ImagePlaceholder label="Gambar Fasilitas" className="w-full h-full" />
                <span className="absolute top-4 left-4 bg-emerald-900/90 text-white text-xs font-bold px-3 py-1.5 rounded-md uppercase tracking-wider backdrop-blur-sm">{bp.category}</span>
                <span className="absolute bottom-4 right-4 bg-white/90 text-emerald-900 text-sm font-extrabold px-3 py-1 rounded-lg">
                  {String(idx + 1).padStart(2, "0")}
                </span>
              </div>
            </div>

            <div className="md:col-span-6 space-y-4">
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900">{bp.title}</h2>
              <p className="text-slate-600 font-medium leading-relaxed">{bp.description}</p>
              <p className="text-slate-500 text-sm leading-relaxed">{bp.details}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
