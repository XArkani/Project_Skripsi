export type OrganizationMember = {
  id: string
  name: string
  position: string
  field?: string
  program?: string
}

export const dean: OrganizationMember = {
  id: "dean",
  name: "Dr. H. Muhammad Djamaluddin, B.E., M.Kom.",
  position: "Dekan Fakultas Teknik",
}

export const viceDeans: OrganizationMember[] = [
  {
    id: "vice-dean-1",
    name: "Hariman Bahtiar, M.Kom.",
    position: "Wakil Dekan I",
    field: "Bidang Akademik",
  },
  {
    id: "vice-dean-2",
    name: "Yahya, S.T., M.Kom.",
    position: "Wakil Dekan II",
    field: "Bidang Non-Akademik",
  },
]

export const studyPrograms: OrganizationMember[] = [
  {
    id: "informatika",
    name: "Aris Sudianto, M.Kom.",
    position: "Ketua Program Studi",
    program: "Informatika",
  },
  {
    id: "teknik-komputer",
    name: "Taufik Akbar, M.Kom.",
    position: "Ketua Program Studi",
    program: "Teknik Komputer",
  },
  {
    id: "sistem-informasi",
    name: "Muhammad Saiful, M.Kom.",
    position: "Ketua Program Studi",
    program: "Sistem Informasi",
  },
  {
    id: "teknik-lingkungan",
    name: "Agus Muliadi Putra, M.Si.",
    position: "Ketua Program Studi",
    program: "Teknik Lingkungan",
  },
]
