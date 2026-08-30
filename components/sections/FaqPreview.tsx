"use client"

import { useState } from "react"
import Link from "next/link"
import { Plus } from "lucide-react"
import type { FAQ } from "@/lib/types"
import { cn } from "@/lib/utils"
import Container from "@/components/ui/container"
import ScrollReveal from "@/components/shared/ScrollReveal"

export default function FaqPreview({ items }: { items: FAQ[] }) {
  const [openId, setOpenId] = useState<string | null>(null)
  const visible = items.slice(0, 5)

  return (
    <section className="bg-muted py-16 sm:py-24">
      <Container>
        <ScrollReveal className="mx-auto max-w-3xl">
          <div className="text-center">
            <h2 className="text-[clamp(1.75rem,3vw,2.5rem)] font-bold leading-[1.12] tracking-[-0.02em] text-foreground">
              Pertanyaan yang Sering Diajukan
            </h2>
            <p className="mt-3 text-base text-muted-foreground">
              Jawaban singkat untuk pertanyaan yang paling sering kami terima.
            </p>
          </div>

          <div className="mt-10 divide-y divide-border border-y border-border">
            {visible.map((faq) => {
              const isOpen = openId === faq.id
              return (
                <div key={faq.id}>
                  <button
                    type="button"
                    onClick={() => setOpenId(isOpen ? null : faq.id)}
                    aria-expanded={isOpen}
                    aria-controls={`faq-panel-${faq.id}`}
                    className="group flex w-full items-center justify-between gap-6 py-5 text-left focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600"
                  >
                    <span className="text-sm font-semibold leading-snug text-foreground transition-colors group-hover:text-emerald-800 sm:text-base">
                      {faq.question}
                    </span>
                    <span
                      className={cn(
                        "grid h-8 w-8 shrink-0 place-items-center rounded-full border transition-colors duration-200",
                        isOpen
                          ? "border-emerald-700 bg-emerald-700 text-white"
                          : "border-border text-muted-foreground group-hover:border-emerald-700 group-hover:text-emerald-700"
                      )}
                    >
                      <Plus
                        className={cn("h-4 w-4 transition-transform duration-300", isOpen && "rotate-45")}
                        aria-hidden="true"
                      />
                    </span>
                  </button>
                  <div
                    id={`faq-panel-${faq.id}`}
                    role="region"
                    className={cn(
                      "grid transition-[grid-template-rows] duration-300 ease-out",
                      isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                    )}
                  >
                    <div className="overflow-hidden">
                      <p className="pr-6 pb-6 pl-0 leading-relaxed text-muted-foreground sm:mr-12 sm:ml-0">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          <div className="mt-8 text-center">
            <Link
              href="/faq"
              className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-emerald-700 px-6 text-sm font-semibold text-white transition-colors duration-200 hover:bg-emerald-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600"
            >
              Lihat FAQ Selengkapnya
            </Link>
          </div>
        </ScrollReveal>
      </Container>
    </section>
  )
}