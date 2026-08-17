import type { FieldConfig } from "@/lib/types"
import { PRODI_LIST } from "@/lib/prodi"

export const blueprintFields: FieldConfig[] = [
  { name: "title", label: "Judul", type: "text", required: true },
  { name: "category", label: "Kategori", type: "text", required: true },
  { name: "description", label: "Deskripsi", type: "textarea", required: true },
  { name: "details", label: "Detail", type: "textarea" },
  { name: "image", label: "Gambar", type: "image" },
]

export const dosenFields: FieldConfig[] = [
  { name: "name", label: "Nama Lengkap", type: "text", required: true },
  { name: "prodi", label: "Program Studi", type: "select", options: [...PRODI_LIST], required: true },
  { name: "position", label: "Posisi", type: "text" },
  { name: "doi", label: "URL DOI Riset", type: "text" },
  { name: "image", label: "Foto", type: "image" },
]

export const ukmFields: FieldConfig[] = [
  { name: "name", label: "Nama UKM", type: "text", required: true },
  { name: "description", label: "Deskripsi", type: "textarea", required: true },
  { name: "activities", label: "Kegiatan", type: "textarea" },
  { name: "contact", label: "Kontak", type: "text" },
  { name: "logo", label: "Logo", type: "image" },
]

export const eventFields: FieldConfig[] = [
  { name: "title", label: "Judul Acara", type: "text", required: true },
  { name: "slug", label: "Slug URL", type: "slug" },
  { name: "status", label: "Status", type: "select", options: ["Akan Datang", "Sedang Berlangsung", "Selesai"] },
  { name: "date", label: "Tanggal", type: "text" },
  { name: "dateTime", label: "Tanggal (ISO, untuk urutan)", type: "date" },
  { name: "time", label: "Waktu", type: "text" },
  { name: "location", label: "Lokasi", type: "text" },
  { name: "description", label: "Deskripsi", type: "textarea", required: true },
  { name: "details", label: "Detail", type: "textarea" },
  { name: "image", label: "Poster", type: "image" },
]

export const newsFields: FieldConfig[] = [
  { name: "title", label: "Judul Berita", type: "text", required: true },
  { name: "slug", label: "Slug URL", type: "slug" },
  { name: "date", label: "Tanggal", type: "text" },
  { name: "excerpt", label: "Ringkasan", type: "textarea", required: true },
  { name: "content", label: "Konten", type: "textarea", required: true },
  { name: "image", label: "Gambar", type: "image" },
]

export const faqFields: FieldConfig[] = [
  { name: "question", label: "Pertanyaan", type: "text", required: true },
  { name: "answer", label: "Jawaban", type: "textarea", required: true },
]

export const strukturFields: FieldConfig[] = [
  { name: "parentId", label: "Parent ID (kosongkan jika root)", type: "text" },
  { name: "role", label: "Jabatan", type: "text", required: true },
  { name: "name", label: "Nama", type: "text", required: true },
  { name: "details", label: "Detail Tugas", type: "textarea" },
]

export const messageFields: FieldConfig[] = [
  { name: "senderName", label: "Nama Pengirim", type: "text" },
  { name: "senderEmail", label: "Email", type: "text" },
  { name: "senderPhone", label: "Telepon", type: "text" },
  { name: "subject", label: "Perihal", type: "text" },
  { name: "message", label: "Pesan", type: "textarea" },
  { name: "date", label: "Tanggal", type: "text" },
  { name: "isRead", label: "Sudah Dibaca", type: "checkbox" },
]

export const fieldConfigMap: Record<string, FieldConfig[]> = {
  blueprint: blueprintFields,
  dosen: dosenFields,
  ukm: ukmFields,
  event: eventFields,
  news: newsFields,
  faq: faqFields,
  struktur: strukturFields,
  message: messageFields,
}

export const modelLabels: Record<string, { singular: string; plural: string }> = {
  blueprint: { singular: "Blueprint & Sarana", plural: "Kelola Blueprint & Sarana" },
  dosen: { singular: "Dosen", plural: "Kelola Profil Dosen" },
  ukm: { singular: "UKM", plural: "Kelola Unit Kegiatan Mahasiswa" },
  event: { singular: "Event", plural: "Kelola Agenda & Acara" },
  news: { singular: "Berita", plural: "Kelola Berita" },
  faq: { singular: "FAQ", plural: "Kelola FAQ" },
  struktur: { singular: "Struktur", plural: "Kelola Struktur Organisasi" },
  message: { singular: "Pesan", plural: "Pesan Masuk" },
}

// URL segments that differ from the internal model name (e.g. /dashboard/berita -> "news")
const MODEL_ALIASES: Record<string, string> = {
  berita: "news",
}

export function resolveModel(model: string): string | undefined {
  const canonical = MODEL_ALIASES[model] ?? model
  return fieldConfigMap[canonical] ? canonical : undefined
}
