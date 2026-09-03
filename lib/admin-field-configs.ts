import type { FieldConfig } from "@/lib/types"
import { PRODI_LIST } from "@/lib/prodi"

export const blueprintFields: FieldConfig[] = [
  { name: "title", label: "Judul", type: "text", required: true, group: "Informasi Utama" },
  { name: "category", label: "Kategori", type: "text", required: true, group: "Informasi Utama" },
  { name: "description", label: "Deskripsi", type: "textarea", required: true, group: "Informasi Utama" },
  { name: "details", label: "Detail", type: "textarea", group: "Detail" },
  { name: "image", label: "Gambar", type: "image", group: "Gambar" },
]

export const dosenFields: FieldConfig[] = [
  { name: "name", label: "Nama Lengkap", type: "text", required: true, group: "Informasi Utama" },
  { name: "prodi", label: "Program Studi", type: "select", options: [...PRODI_LIST], required: true, group: "Informasi Utama" },
  { name: "position", label: "Posisi", type: "text", group: "Informasi Utama" },
  { name: "nuptk", label: "NUPTK", type: "text", group: "Informasi Utama" },
  { name: "doi", label: "URL DOI Riset", type: "text", group: "Informasi Utama" },
  { name: "image", label: "Foto", type: "image", group: "Gambar" },
]

export const ukmFields: FieldConfig[] = [
  { name: "name", label: "Nama UKM", type: "text", required: true, group: "Informasi Utama" },
  { name: "description", label: "Deskripsi", type: "textarea", required: true, group: "Informasi Utama" },
  { name: "activities", label: "Kegiatan", type: "textarea", group: "Informasi Utama" },
  { name: "contact", label: "Kontak", type: "text", group: "Informasi Utama" },
  { name: "logo", label: "Logo", type: "image", group: "Logo" },
]

export const eventFields: FieldConfig[] = [
  { name: "title", label: "Judul Acara", type: "text", required: true, group: "Informasi Utama" },
  { name: "slug", label: "Slug URL", type: "slug", group: "Informasi Utama" },
  { name: "status", label: "Status", type: "select", options: ["Akan Datang", "Sedang Berlangsung", "Selesai"], group: "Informasi Utama" },
  { name: "date", label: "Tanggal", type: "text", group: "Informasi Utama" },
  { name: "dateTime", label: "Tanggal (untuk urutan)", type: "date", group: "Informasi Utama" },
  { name: "time", label: "Waktu", type: "text", group: "Informasi Utama" },
  { name: "location", label: "Lokasi", type: "text", group: "Informasi Utama" },
  { name: "description", label: "Deskripsi", type: "textarea", required: true, group: "Detail" },
  { name: "details", label: "Detail", type: "textarea", group: "Detail" },
  { name: "image", label: "Poster", type: "image", group: "Poster" },
]

export const newsFields: FieldConfig[] = [
  { name: "title", label: "Judul Berita", type: "text", required: true, group: "Informasi Utama" },
  { name: "slug", label: "Slug URL", type: "slug", group: "Informasi Utama" },
  { name: "date", label: "Tanggal", type: "text", group: "Informasi Utama" },
  { name: "category", label: "Kategori", type: "select", options: ["Akademik", "Kegiatan", "Prestasi"], group: "Informasi Utama" },
  { name: "excerpt", label: "Ringkasan", type: "textarea", required: true, group: "Informasi Utama" },
  { name: "content", label: "Konten", type: "textarea", required: true, group: "Detail" },
  { name: "source", label: "Sumber", type: "text", group: "Sumber" },
  { name: "sourceUrl", label: "URL Sumber", type: "text", group: "Sumber" },
  { name: "image", label: "Gambar", type: "image", group: "Gambar" },
]

export const faqFields: FieldConfig[] = [
  { name: "question", label: "Pertanyaan", type: "text", required: true, group: "Informasi Utama" },
  { name: "answer", label: "Jawaban", type: "textarea", required: true, group: "Detail" },
]

export const strukturFields: FieldConfig[] = [
  { name: "parentId", label: "Parent ID (kosongkan jika root)", type: "text", group: "Informasi Utama" },
  { name: "role", label: "Jabatan", type: "text", required: true, group: "Informasi Utama" },
  { name: "name", label: "Nama", type: "text", required: true, group: "Informasi Utama" },
  { name: "details", label: "Detail Tugas", type: "textarea", group: "Detail" },
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

const MODEL_ALIASES: Record<string, string> = {
  berita: "news",
}

export function resolveModel(model: string): string | undefined {
  const canonical = MODEL_ALIASES[model] ?? model
  return fieldConfigMap[canonical] ? canonical : undefined
}
