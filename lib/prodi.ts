export const PRODI_LIST = ["Informatika", "Teknik Komputer", "Sistem Informasi", "Teknik Lingkungan"] as const

export type Prodi = (typeof PRODI_LIST)[number]