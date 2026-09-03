import type { EventStatus } from "@/lib/status"

export interface Blueprint {
  id: string
  title: string
  category: string
  description: string
  details: string
  image: string
}

export interface Dosen {
  id: string
  name: string
  prodi: string
  title: string | null
  position: string | null
  expertise: string | null
  doi: string | null
  email: string | null
  image: string | null
  nuptk: string | null
}

export interface UKM {
  id: string
  name: string
  description: string
  activities: string
  contact: string
  logo: string
}

export interface Event {
  id: string
  title: string
  slug: string
  status: EventStatus
  date: string
  dateTime: string | null
  time: string
  location: string
  description: string
  details: string
  image: string
  source?: string | null
  sourceUrl?: string | null
}

export interface News {
  id: string
  title: string
  slug: string
  date: string
  excerpt: string
  content: string
  image: string
  category?: string | null
  source?: string | null
  sourceUrl?: string | null
}

export interface FAQ {
  id: string
  question: string
  answer: string
}

export interface Struktur {
  id: string
  parentId: string | null
  role: string
  name: string
  details: string
}

export interface Message {
  id: string
  senderName: string
  senderEmail: string
  senderPhone?: string
  subject: string
  message: string
  date: string
  isRead: boolean
}

export interface FieldConfig {
  name: string
  label: string
  type: "text" | "textarea" | "number" | "image" | "select" | "checkbox" | "date" | "slug"
  required?: boolean
  options?: string[]
  group?: string
}
