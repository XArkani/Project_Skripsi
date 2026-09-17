export const EVENT_STATUSES = ["Akan Datang", "Sedang Berlangsung", "Selesai"] as const

export type EventStatus = (typeof EVENT_STATUSES)[number]

export const statusConfig: Record<EventStatus, { badge: string; dot: string }> = {
  "Akan Datang": { badge: "bg-blue-700", dot: "bg-blue-600" },
  "Sedang Berlangsung": { badge: "bg-amber-700", dot: "bg-amber-600" },
  Selesai: { badge: "bg-slate-600", dot: "bg-slate-600" },
}