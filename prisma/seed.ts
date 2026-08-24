import { PrismaClient } from "../generated/prisma/client"
import { PrismaNeon } from "@prisma/adapter-neon"

const adapter = new PrismaNeon({ connectionString: process.env.DATABASE_URL! })
const prisma = new PrismaClient({ adapter })

const blueprintSamples = [
  {
    title: "Ruangan A1",
    category: "Ruang Kelas",
    description: "Ruang kuliah 36 kursi di lantai 1, sisi lorong utara dekat pintu masuk.",
    details: "Papan tulis putih 4m, proyektor Epson, AC 2 unit, colokan lantai tiap baris. Dipakai untuk mata kuliah teori angkatan awal.",
    image: "",
  },
  {
    title: "Ruangan A2",
    category: "Ruang Kelas",
    description: "Ruang 40 kursi lantai 1, sebelah A1, jendela menghadap taman.",
    details: "Meja lipat individu, sound kecil untuk presentasi, papan tulis geser. Jadwal padat pagi sampai jam 15.00.",
    image: "",
  },
  {
    title: "Ruangan A3",
    category: "Ruang Kelas",
    description: "Ruang 32 kursi lantai 1, paling ujung timur, lebih senyap.",
    details: "Sering dipakai ujian dan bimbingan kelompok kecil. AC 1 unit besar, tirai blackout, stopkontak dinding penuh.",
    image: "",
  },
  {
    title: "Ruangan A4",
    category: "Ruang Kelas",
    description: "Ruang 38 kursi lantai 1, dekat tangga ke lantai 2.",
    details: "Dua pintu akses, sirkulasi cepat saat pergantian jam. Papan tulis kaca, proyektor ceiling mount.",
    image: "",
  },
  {
    title: "Ruangan B1",
    category: "Ruang Kelas",
    description: "Ruang 40 kursi lantai 2, atas A1, akses tangga utama.",
    details: "Jendela tinggi, cahaya pagi terang. Dipakai kelas reguler dan rapat himpunan sore hari.",
    image: "",
  },
  {
    title: "Ruangan B2",
    category: "Ruang Kelas",
    description: "Ruang 36 kursi lantai 2, sebelah B1, menghadap selasar.",
    details: "Kursi plastik besi, meja setengah lingkaran untuk diskusi. Whiteboard dan proyektor portabel.",
    image: "",
  },
  {
    title: "Ruangan C1",
    category: "Ruang Kelas",
    description: "Ruang 30 kursi lantai 3, sudut barat, angin paling kencang.",
    details: "Plafon tinggi, kipas + AC. Dipakai kelas sore dan pelatihan singkat.",
    image: "",
  },
  {
    title: "Ruangan C2",
    category: "Ruang Kelas",
    description: "Ruang 34 kursi lantai 3, tengah, dekat Aula.",
    details: "Dinding kedap tipis, sering jadi ruang cadangan saat Aula dipakai. Proyektor 4000 lumen.",
    image: "",
  },
  {
    title: "Ruangan C3",
    category: "Ruang Kelas",
    description: "Ruang 32 kursi lantai 3, sebelah C2, view lapangan.",
    details: "Meja panjang 4 orang, cocok untuk kerja kelompok. Colokan di tengah meja.",
    image: "",
  },
  {
    title: "Ruangan C4",
    category: "Ruang Kelas",
    description: "Ruang 28 kursi lantai 3, paling ujung, paling sepi.",
    details: "Dipakai bimbingan skripsi dan kelas kecil. Karpet tipis, papan tulis kecil 2m.",
    image: "",
  },
  {
    title: "Lab 1",
    category: "Laboratorium",
    description: "Lab komputer dasar lantai 1, 30 PC untuk praktikum semester 1-2.",
    details: "PC i5, RAM 16GB, VS Code dan MySQL terpasang. Jadwal praktikum Senin–Kamis, Jumat perawatan.",
    image: "",
  },
  {
    title: "Lab 2",
    category: "Laboratorium",
    description: "Lab jaringan lantai 2, 20 PC + rak mikrotik dan switch.",
    details: "Kabel crimping, access point, dan server mini. Dipakai konfigurasi jaringan dan keamanan.",
    image: "",
  },
  {
    title: "Lab 3",
    category: "Laboratorium",
    description: "Lab IoT & robotika lantai 3, meja kerja tinggi dan solder station.",
    details: "Arduino, ESP32, sensor suhu dan kelembapan, 3D printer kecil. Proyek mahasiswa dipajang di rak kaca.",
    image: "",
  },
  {
    title: "Lab 4 - Lab TK",
    category: "Laboratorium",
    description: "Lab khusus TK lantai 1, meja rendah dan karpet, untuk simulasi pembelajaran anak.",
    details: "APE warna-warni, papan magnetik, cermin observasi. Akses terpisah agar tidak terganggu lalu lalang kuliah.",
    image: "",
  },
  {
    title: "Lab 5",
    category: "Laboratorium",
    description: "Lab riset lantai 3, 12 workstation untuk tugas akhir.",
    details: "Monitor dual, lisensi MATLAB dan AutoCAD. Booking via admin lab, maksimal 4 jam per sesi.",
    image: "",
  },
  {
    title: "Kantin",
    category: "Fasilitas",
    description: "Kantin lantai 1, 8 lapak, kapasitas 80 duduk, buka 07.00–16.00.",
    details: "Menu harian nasi campur, gorengan, kopi. Meja besi panjang, wastafel dua titik, dekat musholla.",
    image: "",
  },
  {
    title: "Musholla",
    category: "Fasilitas",
    description: "Musholla lantai 1, muat 40 jamaah, tempat wudu terpisah putra-putri.",
    details: "Karpet hijau, kipas plafon, lemari mukena dan sarung. Dibersihkan tiap selesai Dzuhur.",
    image: "",
  },
  {
    title: "Pos Security",
    category: "Fasilitas",
    description: "Pos jaga di gerbang masuk, petugas 2 shift 24 jam.",
    details: "Buku tamu, CCTV monitor 4 channel, kunci cadangan gedung. Tamu wajib lapor sebelum naik lantai.",
    image: "",
  },
  {
    title: "Ruangan Dosen",
    category: "Fasilitas",
    description: "Ruang dosen lantai 2, 10 meja sekat, untuk konsultasi dan kerja.",
    details: "Jam konsultasi tempel di pintu, sofa tamu kecil. AC sentral, loker arsip per prodi.",
    image: "",
  },
  {
    title: "Lobby",
    category: "Fasilitas",
    description: "Lobby lantai 1, meja resepsionis dan papan pengumuman.",
    details: "Kursi tunggu 12, dispenser, brosur prodi. Tempat tanya jadwal dan pengambilan surat.",
    image: "",
  },
  {
    title: "Aula Fakultas Teknik",
    category: "Fasilitas",
    description: "Aula lantai 3, kapasitas 200 kursi lipat, panggung 6x4 meter.",
    details: "Sound system 4 speaker, mic wireless 4, proyektor 5000 lumen. Dipakai seminar, yudisium, dan pameran tugas akhir.",
    image: "",
  },
]

const dosenSamples = [
  {
    name: "Dr. Ir. H. Ahmad Fauzi, M.T.",
    prodi: "Sistem Informasi",
    title: "S.T., M.T.",
    position: "Dekan Fakultas Teknik",
    expertise: "Manajemen Sistem Informasi & Rekayasa Nilai",
    doi: "https://doi.org/10.1000/xj.2024.001",
    email: "ahmadfauzi@hamzanwadi.ac.id",
    image: "",
  },
  {
    name: "Rina Kartika, S.Kom., M.Kom.",
    prodi: "Informatika",
    title: "S.Kom., M.Kom.",
    position: "Ketua Program Studi Teknik Informatika",
    expertise: "Rekayasa Perangkat Lunak",
    doi: "https://doi.org/10.1016/j.ai.2024.02.104",
    email: "rinakartika@hamzanwadi.ac.id",
    image: "",
  },
  {
    name: "Hendra Gunawan, S.T., M.T.",
    prodi: "Teknik Komputer",
    title: "S.T., M.T.",
    position: "Dosen Teknik Komputer",
    expertise: "Jaringan Komputer & Sistem Tertanam",
    doi: "https://doi.org/10.1109/iot.2024.8710",
    email: "hendra.gunawan@hamzanwadi.ac.id",
    image: "",
  },
  {
    name: "Nurul Aini, S.T., M.Sc.",
    prodi: "Teknik Lingkungan",
    title: "S.T., M.Sc.",
    position: "Dosen Teknik Lingkungan",
    expertise: "Pengelolaan Sumber Daya Air",
    doi: "https://doi.org/10.4236/jwarp.2024.1603",
    email: "nurul.aini@hamzanwadi.ac.id",
    image: "",
  },
  {
    name: "Dewi Lestari, S.Si., M.Cs.",
    prodi: "Informatika",
    title: "S.Si., M.Cs.",
    position: "Dosen Teknik Informatika",
    expertise: "Data Science",
    doi: "https://doi.org/10.1007/s10618-024-0100",
    email: "dewilestari@hamzanwadi.ac.id",
    image: "",
  },
]

const ukmSamples = [
  {
    name: "Robotik Hamzanwadi",
    description: "UKM yang fokus pada pengembangan robotika, kompetisi nasional, dan pelatihan IoT.",
    activities: "Riset robot line follower, humanoid, drone; pelatihan mingguan; lomba nasional.",
    contact: "robotik@hamzanwadi.ac.id",
    logo: "",
  },
  {
    name: "Sistem Informasi Geografis Club",
    description: "Komunitas mahasiswa yang mendalami pemetaan digital dan aplikasi GIS.",
    activities: "Praktikum SIG, pembuatan peta digital Lombok, kolaborasi riset daerah.",
    contact: "sigclub@hamzanwadi.ac.id",
    logo: "",
  },
  {
    name: "Kewirausahaan Teknik",
    description: "UKM pengembangan jiwa wirausaha mahasiswa teknik berbasis produk inovasi.",
    activities: "Pelatihan bisnis, inkubasi startup, pameran produk mahasiswa.",
    contact: "wirausaha@hamzanwadi.ac.id",
    logo: "",
  },
]

const eventSamples = [
  {
    title: "Seminar Nasional Teknologi 2026",
    slug: "seminar-nasional-teknologi-2026",
    status: "Akan Datang",
    date: "2026-09-15",
    dateTime: "2026-09-15T00:00:00.000Z",
    time: "09:00 - 15:00 WITA",
    location: "Aula Fakultas Teknik",
    description:
      "Seminar tahunan dengan tema 'Teknologi Digital untuk Masa Depan Lombok yang Berkelanjutan'.",
    details:
      "Pembicara utama praktisi industri dan akademisi nasional. Terbuka untuk umum, mahasiswa, dan alumni. Pendaftaran melalui bagian layanan fakultas.",
    image: "",
  },
  {
    title: "Workshop Internet of Things",
    slug: "workshop-internet-of-things",
    status: "Sedang Berlangsung",
    date: "2026-08-12",
    dateTime: "2026-08-12T00:00:00.000Z",
    time: "08:30 - 16:00 WITA",
    location: "Laboratorium Robotika & IoT",
    description: "Pelatihan praktis merancang perangkat IoT untuk pemantauan lingkungan pertanian.",
    details:
      "Peserta dibatasi 30 mahasiswa. Modul lengkap disediakan, termasuk kit sensor gratis bagi peserta terpilih.",
    image: "",
  },
  {
    title: "Konferensi Mahasiswa Teknik",
    slug: "konferensi-mahasiswa-teknik",
    status: "Selesai",
    date: "2026-05-20",
    dateTime: "2026-05-20T00:00:00.000Z",
    time: "08:00 - 17:00 WITA",
    location: "Gedung Kuliah Bersama",
    description: "Forum presentasi hasil penelitian dan karya mahasiswa antar program studi.",
    details:
      "Sebanyak 45 makalah dipresentasikan. Best paper mendapatkan pendanaan riset dari fakultas.",
    image: "",
  },
]

const newsSamples = [
  {
    title: "Mahasiswa Teknik Raih Juara Nasional Robotika",
    slug: "mahasiswa-teknik-raih-juara-nasional-robotika",
    date: "2026-07-30",
    excerpt:
      "Tim robotika Fakultas Teknik berhasil meraih juara pertama pada kontes robot nasional yang digelar di Jakarta.",
    content:
      "Tim Robotik Hamzanwadi berhasil membawa pulang gelar juara pertama kategori line follower pada Kontes Robot Nasional 2026. Setelah melalui babak penyisihan yang ketat, tim yang terdiri dari lima mahasiswa Teknik Informatika ini unggul dengan waktu tempuh tercepat.\n\nDekan Fakultas Teknik menyampaikan apresiasi atas pencapaian tersebut dan berharap prestasi ini menjadi motivasi bagi mahasiswa lain untuk terus berkarya.\n\nTim berencana mewakili provinsi pada kompetisi internasional yang akan diselenggarakan akhir tahun ini.",
    image: "",
  },
  {
    title: "Kerja Sama Industri dengan Perusahaan Teknologi",
    slug: "kerja-sama-industri-dengan-perusahaan-teknologi",
    date: "2026-07-10",
    excerpt:
      "Fakultas Teknik menandatangani nota kesepahaman dengan perusahaan teknologi nasional untuk magang dan riset bersama.",
    content:
      "Fakultas Teknik Universitas Hamzanwadi resmi menjalin kerja sama dengan perusahaan teknologi nasional dalam bidang pengembangan perangkat lunak dan kecerdasan buatan.\n\nKerja sama ini mencakup program magang bersertifikat, riset bersama dosen dan mahasiswa, serta pemberian beasiswa praktik industri.\n\nPendaftaran program magang dibuka setiap awal semester melalui bagian kemahasiswaan.",
    image: "",
  },
  {
    title: "Penerimaan Mahasiswa Baru 2026 Telah Dibuka",
    slug: "penerimaan-mahasiswa-baru-2026-telah-dibuka",
    date: "2026-06-25",
    excerpt:
      "Pendaftaran mahasiswa baru tahun akademik 2026/2027 telah resmi dibuka untuk seluruh program studi.",
    content:
      "Penerimaan mahasiswa baru tahun akademik 2026/2027 telah resmi dibuka untuk Program Studi Teknik Informatika dan Teknik Industri.\n\nJalur pendaftaran yang tersedia meliputi jalur prestasi, jalur tes, dan beasiswa afirmasi daerah terdepan.\n\nInformasi lengkap mengenai persyaratan, jadwal, dan tata cara pendaftaran dapat diakses melalui layanan pertanyaan terpadu fakultas atau menghubungi nomor layanan resmi.",
    image: "",
  },
]

const faqSamples = [
  {
    question: "Bagaimana cara mendaftar menjadi mahasiswa baru Fakultas Teknik?",
    answer:
      "Pendaftaran dilakukan melalui jalur prestasi, jalur tes, atau jalur beasiswa afirmasi. Informasi jadwal dan persyaratan dapat diakses pada halaman Penerimaan Mahasiswa Baru atau menghubungi layanan pertanyaan terpadu.",
  },
  {
    question: "Apakah fakultas menyediakan beasiswa?",
    answer:
      "Ya. Fakultas menyediakan beasiswa prestasi akademik, bantuan UKT, serta beasiswa afirmasi bagi mahasiswa dari daerah terdepan, terluar, dan tertinggal.",
  },
  {
    question: "Apa saja kegiatan kemahasiswaan yang tersedia?",
    answer:
      "Tersedia berbagai UKM seperti Robotik Hamzanwadi, SIG Club, dan UKM Kewirausahaan Teknik, serta kegiatan rutin seperti seminar, workshop, dan lomba tingkat nasional.",
  },
  {
    question: "Bagaimana cara mengajukan kunjungan atau kerja sama industri?",
    answer:
      "Ajukan surat resmi melalui bagian layanan fakultas atau kirimkan melalui halaman Hubungi Kami. Staf kami akan memproses permohonan dalam maksimal 3 hari kerja.",
  },
]

async function seedAdmin() {
  const adminEmail = process.env.ADMIN_EMAIL
  const adminPassword = process.env.ADMIN_PASSWORD

  if (adminEmail && adminPassword) {
    const existingAdmin = await prisma.user.findUnique({ where: { email: adminEmail } })
    if (!existingAdmin) {
      const { auth } = await import("@/lib/auth")
      await auth.api.signUpEmail({
        body: {
          email: adminEmail,
          password: adminPassword,
          name: "Admin",
        },
      })
      console.log(`Admin user created: ${adminEmail}`)
    } else {
      console.log(`Admin user already exists: ${adminEmail}`)
    }
  }
}

async function seedBlueprints() {
  await prisma.blueprint.deleteMany({})
  await prisma.blueprint.createMany({ data: blueprintSamples })
  console.log(`Blueprint: reset & ${blueprintSamples.length} data baru dibuat.`)
}

async function seedDosen() {
  const count = await prisma.dosen.count()
  if (count > 0) {
    console.log("Dosen: data sudah ada, dilewati.")
    return
  }
  await prisma.dosen.createMany({ data: dosenSamples })
  console.log(`Dosen: ${dosenSamples.length} data dibuat.`)
}

async function seedUkm() {
  const count = await prisma.ukm.count()
  if (count > 0) {
    console.log("UKM: data sudah ada, dilewati.")
    return
  }
  await prisma.ukm.createMany({ data: ukmSamples })
  console.log(`UKM: ${ukmSamples.length} data dibuat.`)
}

async function seedEvents() {
  const count = await prisma.event.count()
  if (count > 0) {
    console.log("Event: data sudah ada, dilewati.")
    return
  }
  await prisma.event.createMany({ data: eventSamples, skipDuplicates: true })
  console.log(`Event: ${eventSamples.length} data dibuat.`)
}

async function seedNews() {
  const count = await prisma.news.count()
  if (count > 0) {
    console.log("Berita: data sudah ada, dilewati.")
    return
  }
  await prisma.news.createMany({ data: newsSamples, skipDuplicates: true })
  console.log(`Berita: ${newsSamples.length} data dibuat.`)
}

async function seedFaq() {
  const count = await prisma.faq.count()
  if (count > 0) {
    console.log("FAQ: data sudah ada, dilewati.")
    return
  }
  await prisma.faq.createMany({ data: faqSamples })
  console.log(`FAQ: ${faqSamples.length} data dibuat.`)
}

async function seedStruktur() {
  const count = await prisma.struktur.count()
  if (count > 0) {
    console.log("Struktur organisasi: data sudah ada, dilewati.")
    return
  }

  const dekan = await prisma.struktur.create({
    data: {
      parentId: null,
      role: "Dekan",
      name: "Dr. Ir. H. Ahmad Fauzi, M.T.",
      details: "Penanggung jawab penuh penyelenggaraan pendidikan, penelitian, dan pengabdian masyarakat.",
    },
  })

  await prisma.struktur.createMany({
    data: [
      {
        parentId: dekan.id,
        role: "Wakil Dekan Bidang Akademik",
        name: "Rina Kartika, S.Kom., M.Kom.",
        details: "Mengkoordinasikan kurikulum, perkuliahan, dan mutu akademik.",
      },
      {
        parentId: dekan.id,
        role: "Wakil Dekan Bidang Perencanaan & Keuangan",
        name: "Budi Santoso, S.T., M.T.",
        details: "Mengelola perencanaan program, anggaran, dan sarana prasarana.",
      },
      {
        parentId: dekan.id,
        role: "Wakil Dekan Bidang Riset & Pengabdian Masyarakat",
        name: "Dr. Siti Rahayu, S.T., M.T.",
        details: "Mengelola program riset, publikasi ilmiah, dan pengabdian kepada masyarakat.",
      },
      {
        parentId: dekan.id,
        role: "Wakil Dekan Bidang Perencanaan, SDM & Sarana",
        name: "Lalu Muhamad Syamsir, S.T., M.Eng.",
        details: "Menyusun perencanaan program, pengelolaan SDM, dan sarana prasarana.",
      },
      {
        parentId: dekan.id,
        role: "Ketua Program Studi Teknik Informatika",
        name: "Dewi Lestari, S.Si., M.Cs.",
        details: "Memimpin pengelolaan program studi Teknik Informatika.",
      },
      {
        parentId: dekan.id,
        role: "Ketua Program Studi Teknik Industri",
        name: "Ir. H. Muhammad Ridwan, M.T.",
        details: "Memimpin pengelolaan program studi Teknik Industri.",
      },
    ],
  })

  console.log(`Struktur organisasi: 7 data dibuat.`)
}

async function main() {
  await seedAdmin()
  await seedBlueprints()
  await seedDosen()
  await seedUkm()
  await seedEvents()
  await seedNews()
  await seedFaq()
  await seedStruktur()
  console.log("Seeding selesai.")
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
