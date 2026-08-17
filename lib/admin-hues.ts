// Shared categorical hues for the admin section.
// Each content type keeps ONE identity across sidebar nav, page headers,
// dashboard stat chips, and table accents (system-scale color, not scattered swatches).

export const contentHues = {
  dashboard: { icon: "text-emerald-600", chip: "bg-emerald-100 text-emerald-600" },
  blueprint: { icon: "text-teal-600", chip: "bg-teal-100 text-teal-600" },
  dosen: { icon: "text-emerald-600", chip: "bg-emerald-100 text-emerald-600" },
  ukm: { icon: "text-amber-600", chip: "bg-amber-100 text-amber-600" },
  event: { icon: "text-violet-600", chip: "bg-violet-100 text-violet-600" },
  berita: { icon: "text-sky-600", chip: "bg-sky-100 text-sky-600" },
  faq: { icon: "text-indigo-600", chip: "bg-indigo-100 text-indigo-600" },
  struktur: { icon: "text-cyan-600", chip: "bg-cyan-100 text-cyan-600" },
  pesan: { icon: "text-rose-600", chip: "bg-rose-100 text-rose-600" },
} as const

export type ContentHueKey = keyof typeof contentHues

// Brand emerald accents for actions and wayfinding (Operate: rarity gives accent force).
export const brand = {
  solid: "bg-emerald-600 text-white hover:bg-emerald-700",
  text: "text-emerald-700 hover:text-emerald-800",
  soft: "bg-emerald-50 text-emerald-700",
  ring: "focus-visible:ring-emerald-500/40",
} as const
