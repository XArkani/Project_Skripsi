"use client"

import { useMemo, useState, createElement } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, useReducedMotion } from "framer-motion"
import {
  Search,
  X,
  Zap,
  Users,
  RotateCcw,
  Bot,
  Monitor,
  Palette,
  Dumbbell,
  Music,
  Rocket,
  Map as MapIcon,
  Gamepad2,
  Newspaper,
  Flag,
  Instagram,
  Mail,
  Phone,
  Globe,
  MessageCircle,
  Link2,
  Tag,
} from "lucide-react"
import type { LucideIcon } from "lucide-react"
import type { UKM } from "@/lib/types"
import { cn } from "@/lib/utils"

interface UkmGridProps {
  items: UKM[]
}

const EASE = [0.22, 1, 0.36, 1] as const

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: EASE } },
}

const CATEGORY_RULES: { category: string; keywords: string[] }[] = [
  {
    category: "Robotika",
    keywords: ["robot", "robo", "mikro", "arduino", "iot", "mekatronika", "erc", "dron"],
  },
  {
    category: "Seni & Media",
    keywords: ["art", "media", "design", "seni", "musik", "foto", "film", "video", "podcast", "kreatif", "suara", "band", "teater", "fotografi"],
  },
  {
    category: "Olahraga",
    keywords: ["olahraga", "futsal", "basket", "sepak", "voli", "badminton", "bulutangkis", "renang", "panjat", "tenis", "lari"],
  },
  {
    category: "Teknologi & Informatika",
    keywords: ["informatika", "komputer", "coding", "program", "software", "hmif", "tech", "teknologi", "data", "game", "e-sport", "esport", "kecerdasan"],
  },
  {
    category: "Sosial & Minat",
    keywords: ["bakti", "sosial", "relawan", "agama", "keagamaan", "pecinta alam", "lingkungan", "menulis", "literasi", "jurnalistik", "kepustakaan", "pramuka"],
  },
]

const UKM_ICONS: { keywords: string[]; icon: LucideIcon }[] = [
  { keywords: ["robot", "erc", "robotics", "mikro"], icon: Bot },
  { keywords: ["informatika", "komputer", "program", "coding", "hmif", "software"], icon: Monitor },
  { keywords: ["art", "media", "design", "seni", "kreatif", "foto", "video", "film", "fotografi", "podcast"], icon: Palette },
  { keywords: ["olahraga", "futsal", "basket", "sepak", "voli", "badminton", "bulutangkis", "renang", "panjat"], icon: Dumbbell },
  { keywords: ["musik", "band", "suara", "gitar", "paduan"], icon: Music },
  { keywords: ["wirausaha", "bisnis", "entrepreneur", "startup", "kewirausahaan"], icon: Rocket },
  { keywords: ["geografis", "gis", "peta", "sig", "mapping"], icon: MapIcon },
  { keywords: ["game", "e-sport", "esport"], icon: Gamepad2 },
  { keywords: ["jurnalistik", "menulis", "literasi", "kepustakaan", "pustaka"], icon: Newspaper },
]

const IMAGE_URL_PATTERN = /^(https?:\/\/|\/)/i

const CONTACT_ICONS: Record<string, LucideIcon> = {
  instagram: Instagram,
  email: Mail,
  whatsapp: MessageCircle,
  phone: Phone,
  website: Globe,
  other: Link2,
}



interface ContactLink {
  type: "instagram" | "email" | "whatsapp" | "phone" | "website" | "other"
  href: string
  label: string
}

function parseContact(contact: string): ContactLink[] {
  const links: ContactLink[] = []
  const segments = contact
    .split(/[,;\n]/)
    .map((s) => s.trim())
    .filter(Boolean)

  for (const seg of segments) {
    const urlMatch = seg.match(/https?:\/\/[^\s]+/)
    if (urlMatch) {
      const url = urlMatch[0]
      const lowerUrl = url.toLowerCase()
      if (lowerUrl.includes("instagram.com")) {
        const handleMatch = url.match(/instagram\.com\/([a-z0-9_.]+)/i)
        const handle = handleMatch?.[1]?.split(/[?\/]/)[0]
        if (handle) {
          links.push({ type: "instagram", href: `https://www.instagram.com/${handle}`, label: `@${handle}` })
          continue
        }
      }
      links.push({ type: "website", href: url, label: url.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "") })
      continue
    }

    const lower = seg.toLowerCase()
    const instaMatch = lower.match(/instagram\s*[:@]?\s*@?([a-z0-9_.]{1,30})/)
    if (instaMatch && instaMatch[1] !== "com") {
      links.push({ type: "instagram", href: `https://www.instagram.com/${instaMatch[1]}`, label: `@${instaMatch[1]}` })
      continue
    }

    const emailMatch = seg.match(/[\w.+-]+@[\w-]+\.[\w.]+/)
    if (emailMatch) {
      links.push({ type: "email", href: `mailto:${emailMatch[0]}`, label: emailMatch[0] })
      continue
    }

    const rawInstaMatch = seg.match(/@([a-z0-9_.]{1,30})/i)
    if (rawInstaMatch) {
      links.push({ type: "instagram", href: `https://www.instagram.com/${rawInstaMatch[1]}`, label: `@${rawInstaMatch[1]}` })
      continue
    }

    const phoneMatch = seg.match(/\+?[\d][\d\s()-]{7,}/)
    if (phoneMatch) {
      const digits = phoneMatch[0].replace(/\D/g, "")
      const isWa = /whatsapp|wa\b/i.test(seg)
      links.push({
        type: isWa ? "whatsapp" : "phone",
        href: isWa ? `https://wa.me/${digits}` : `tel:+${digits}`,
        label: phoneMatch[0].trim(),
      })
      continue
    }
  }

  if (links.length === 0 && contact.trim()) {
    links.push({ type: "other", href: "", label: contact.trim() })
  }
  return links
}

function isStockImage(src: string) {
  try {
    return new URL(src).hostname.includes("unsplash")
  } catch {
    return false
  }
}

function getUkmIcon(ukm: UKM): LucideIcon {
  const haystack = `${ukm.name} ${ukm.description}`.toLowerCase()
  const match = UKM_ICONS.find((entry) => entry.keywords.some((kw) => haystack.includes(kw)))
  return match?.icon ?? Flag
}

function getCategory(ukm: UKM): string {
  const haystack = `${ukm.name} ${ukm.description}`.toLowerCase()
  const match = CATEGORY_RULES.find((rule) => rule.keywords.some((kw) => haystack.includes(kw)))
  return match?.category ?? "Lainnya"
}

function UkmLogo({ ukm }: { ukm: UKM }) {
  const src = ukm.logo
  if (src && IMAGE_URL_PATTERN.test(src) && !isStockImage(src)) {
    return <Image src={src} alt={`Logo ${ukm.name}`} fill sizes="56px" className="object-contain p-1" />
  }
  return createElement(getUkmIcon(ukm), { className: "w-6 h-6 text-emerald-600", "aria-hidden": true })
}

function UkmMedia({ ukm }: { ukm: UKM }) {
  const src = ukm.logo
  if (src && IMAGE_URL_PATTERN.test(src) && !isStockImage(src)) {
    return <Image src={src} alt={`Logo ${ukm.name} tampil penuh`} fill sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 33vw" className="object-contain bg-white object-center p-3" />
  }
  return (
    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-emerald-50 to-emerald-100">
      {createElement(getUkmIcon(ukm), { className: "w-12 h-12 text-emerald-600", "aria-hidden": true })}
    </div>
  )
}

interface CardProps {
  ukm: UKM
  animate: boolean
}

function UkmCard({ ukm, animate }: CardProps) {
  const links = useMemo(() => parseContact(ukm.contact), [ukm.contact])
  const category = getCategory(ukm)

  return (
    <motion.div
      variants={animate ? cardVariants : undefined}
      initial={animate ? "hidden" : false}
      whileInView={animate ? "visible" : undefined}
      viewport={animate ? { once: true, margin: "-40px", amount: 0.1 } : undefined}
      className="group bg-card overflow-hidden border border-border shadow-sm hover:shadow-lg hover:border-emerald-200 transition-all flex flex-col rounded-2xl"
    >
      <div className="relative h-52 sm:h-56 w-full overflow-hidden bg-white">
        <UkmMedia ukm={ukm} />
        <span className="absolute top-3 left-3 inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 bg-background/95 backdrop-blur border border-emerald-100 px-2.5 py-1 rounded-full shadow-sm">
          <Tag className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
          {category}
        </span>
      </div>

      <div className="flex flex-1 flex-col gap-3 p-5">
        <div className="flex items-center gap-3">
          <div className="relative w-12 h-12 shrink-0 rounded-2xl bg-gradient-to-br from-emerald-50 to-emerald-100 border border-emerald-100 flex items-center justify-center shadow-sm">
            <UkmLogo ukm={ukm} />
          </div>
          <h2 className="min-w-0 flex-1 font-bold text-base text-foreground leading-snug line-clamp-2">{ukm.name}</h2>
        </div>

        <p className="text-sm text-muted-foreground leading-relaxed">{ukm.description}</p>

        {ukm.activities && (
          <div className="flex items-start gap-2.5">
            <Zap className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" aria-hidden="true" />
            <p className="text-sm text-muted-foreground leading-relaxed">
              <span className="font-bold text-foreground">Kegiatan:</span> {ukm.activities}
            </p>
          </div>
        )}

        {links.length > 0 ? (
          <div className="pt-3 border-t border-border mt-auto">
            <div className="flex flex-col gap-2">
              {links.map((link, i) => {
                const Icon = CONTACT_ICONS[link.type]
                return (
                  <a
                    key={`${link.href}-${i}`}
                    href={link.href}
                    {...(link.href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    className="w-full flex items-center justify-center gap-2 min-h-11 px-4 py-2.5 rounded-xl border border-zinc-200 bg-white text-sm font-bold text-zinc-700 hover:border-emerald-300 hover:text-emerald-700 hover:bg-emerald-50/50 transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600"
                  >
                    <Icon className="w-4 h-4 shrink-0 text-emerald-600" aria-hidden="true" />
                    <span className="truncate">{link.label}</span>
                  </a>
                )
              })}
            </div>
          </div>
        ) : (
          <div className="mt-auto pt-3 border-t border-border">
            <Link
              href="/hubungi"
              className="w-full min-h-11 flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl border-2 border-emerald-600 text-emerald-700 hover:bg-emerald-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600 text-sm font-bold transition-colors cursor-pointer"
            >
              <Users className="w-4 h-4 shrink-0" aria-hidden="true" />
              Hubungi Selengkapnya
            </Link>
          </div>
        )}
      </div>
    </motion.div>
  )
}

export default function UkmGrid({ items }: UkmGridProps) {
  const reduceMotion = useReducedMotion()
  const [query, setQuery] = useState("")

  const categoryOf = useMemo(() => new Map(items.map((ukm) => [ukm.id, getCategory(ukm)])), [items])

  const categories = useMemo(() => {
    const present = new Set(items.map((ukm) => categoryOf.get(ukm.id) ?? "Lainnya"))
    return ["Semua", ...CATEGORY_RULES.map((r) => r.category).filter((c) => present.has(c)), ...(present.has("Lainnya") ? ["Lainnya"] : [])]
  }, [items, categoryOf])

  const [activeCategory, setActiveCategory] = useState("Semua")

  const counts = useMemo(() => {
    const map = new Map<string, number>()
    map.set("Semua", items.length)
    for (const ukm of items) {
      const cat = categoryOf.get(ukm.id) ?? "Lainnya"
      map.set(cat, (map.get(cat) ?? 0) + 1)
    }
    return map
  }, [items, categoryOf])

  const normalizedQuery = query.trim().toLowerCase()

  const filteredItems = useMemo(
    () =>
      items.filter((ukm) => {
        const matchesCategory = activeCategory === "Semua" || (categoryOf.get(ukm.id) ?? "Lainnya") === activeCategory
        const matchesQuery =
          normalizedQuery === "" ||
          [ukm.name, ukm.description, ukm.activities, ukm.contact, categoryOf.get(ukm.id)].join(" ").toLowerCase().includes(normalizedQuery)
        return matchesCategory && matchesQuery
      }),
    [items, normalizedQuery, activeCategory, categoryOf]
  )

  const hasFilter = query.trim() !== "" || activeCategory !== "Semua"

  const resetFilters = () => {
    setQuery("")
    setActiveCategory("Semua")
  }

  return (
    <div className="space-y-6">
      <div className="sticky top-[72px] z-20 -mx-4 px-4 sm:mx-0 sm:px-0 py-3 bg-background/95 backdrop-blur-sm space-y-3">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" aria-hidden="true" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Cari nama UKM, kegiatan, atau kategori..."
            aria-label="Cari UKM"
            className="w-full pl-11 pr-10 py-3 rounded-xl border border-border bg-background focus:bg-background focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-sm transition-all outline-none placeholder:text-muted-foreground"
          />
          {query !== "" && (
            <button
              type="button"
              onClick={() => setQuery("")}
              aria-label="Bersihkan pencarian"
              className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center justify-center w-11 h-11 rounded-full text-muted-foreground hover:text-foreground hover:bg-muted transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        <div className="flex items-center gap-2 overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {categories.map((category) => {
            const isActive = activeCategory === category
            return (
              <button
                key={category}
                type="button"
                onClick={() => setActiveCategory(category)}
                aria-pressed={isActive}
                className={cn(
                  "shrink-0 inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-bold border transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600",
                  isActive
                    ? "bg-emerald-600 text-white border-emerald-600 shadow-sm"
                    : "bg-background text-muted-foreground border-border hover:border-emerald-300 hover:text-emerald-700"
                )}
              >
                {category}
                <span
                  className={cn(
                    "text-xs font-bold rounded-full px-1.5 py-0.5",
                    isActive ? "bg-white/20 text-white" : "bg-muted text-muted-foreground"
                  )}
                >
                  {counts.get(category) ?? 0}
                </span>
              </button>
            )
          })}
        </div>
      </div>

      <div className="flex items-center justify-between flex-wrap gap-2">
        <p aria-live="polite" className="text-sm text-muted-foreground">
          Menampilkan <span className="font-bold text-foreground">{filteredItems.length}</span> dari{" "}
          <span className="font-bold text-foreground">{items.length}</span> UKM
        </p>
        {hasFilter && (
          <button
            type="button"
            onClick={resetFilters}
            className="inline-flex items-center gap-1.5 text-sm font-bold text-emerald-700 hover:text-emerald-800 hover:bg-emerald-50 px-3 py-2 rounded-lg transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600"
          >
            <RotateCcw className="w-4 h-4" aria-hidden="true" />
            Reset
          </button>
        )}
      </div>

      {filteredItems.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-border bg-card px-6 py-14 text-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-muted text-muted-foreground mx-auto">
            <Users className="h-7 w-7" />
          </div>
          <h3 className="text-base font-bold text-foreground mt-4">UKM tidak ditemukan</h3>
          <p className="max-w-sm mx-auto text-sm text-muted-foreground mt-1.5">
            Tidak ada unit kegiatan yang cocok{query.trim() !== "" && (
              <>
                {" "}
                untuk pencarian <span className="font-bold text-emerald-700">&quot;{query.trim()}&quot;</span>
              </>
            )}
            {activeCategory !== "Semua" && (
              <>
                {" "}
                pada kategori <span className="font-bold text-emerald-700">{activeCategory}</span>
              </>
            )}
            .
          </p>
          <button
            type="button"
            onClick={resetFilters}
            className="inline-flex items-center gap-2 mt-5 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-bold px-5 py-2.5 min-h-11 rounded-xl transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600"
          >
            <RotateCcw className="w-4 h-4" aria-hidden="true" />
            Tampilkan Semua UKM
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
          {filteredItems.map((ukm) => (
            <UkmCard key={ukm.id} ukm={ukm} animate={!reduceMotion} />
          ))}
        </div>
      )}
    </div>
  )
}