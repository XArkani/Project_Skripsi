import { PrismaClient } from "../generated/prisma/client"
import { PrismaNeon } from "@prisma/adapter-neon"

const adapter = new PrismaNeon({ connectionString: process.env.DATABASE_URL! })
const prisma = new PrismaClient({ adapter })

const blueprintSamples = [
  {
    title: "Ruangan A1",
    category: "Ruang Kelas",
    description: "Ruang kelas 25 kursi di lantai 1 dengan kipas angin, proyektor, dan papan tulis — nyaman untuk perkuliahan dan diskusi.",
    details: "Papan tulis putih 4m, proyektor Epson, AC 2 unit, colokan lantai tiap baris. Dipakai untuk mata kuliah teori angkatan awal.",
    image: "",
  },
  {
    title: "Ruangan A2",
    category: "Ruang Kelas",
    description: "Ruang kelas 25 kursi di lantai 1 dengan kipas angin, proyektor, dan papan tulis — nyaman untuk perkuliahan dan diskusi.",
    details: "Meja lipat individu, sound kecil untuk presentasi, papan tulis geser. Jadwal padat pagi sampai jam 15.00.",
    image: "",
  },
  {
    title: "Ruangan A3",
    category: "Ruang Kelas",
    description: "Ruang kelas 25 kursi di lantai 1 dengan kipas angin, proyektor, dan papan tulis — nyaman untuk perkuliahan dan diskusi.",
    details: "Sering dipakai ujian dan bimbingan kelompok kecil. AC 1 unit besar, tirai blackout, stopkontak dinding penuh.",
    image: "",
  },
  {
    title: "Ruangan A4",
    category: "Ruang Kelas",
    description: "Ruang kelas 25 kursi di lantai 1 dengan kipas angin, proyektor, dan papan tulis — nyaman untuk perkuliahan dan diskusi.",
    details: "Dua pintu akses, sirkulasi cepat saat pergantian jam. Papan tulis kaca, proyektor ceiling mount.",
    image: "",
  },
  {
    title: "Ruangan B1",
    category: "Ruang Kelas",
    description: "Ruang 25 kursi dengan meja panjang dan TV layar sentuh interaktif, plus proyektor dan papan tulis — ideal untuk presentasi dan kerja kelompok.",
    details: "Jendela tinggi, cahaya pagi terang. Dipakai kelas reguler dan rapat himpunan sore hari.",
    image: "",
  },
  {
    title: "Ruangan B2",
    category: "Ruang Kelas",
    description: "Ruang 25 kursi dengan meja panjang dan TV layar sentuh interaktif, plus proyektor dan papan tulis — ideal untuk presentasi dan kerja kelompok.",
    details: "Kursi plastik besi, meja setengah lingkaran untuk diskusi. Whiteboard dan proyektor portabel.",
    image: "",
  },
  {
    title: "Ruangan C1",
    category: "Ruang Kelas",
    description: "Ruang kelas 25 kursi di lantai 3 dengan kipas angin, proyektor, dan papan tulis — tenang dengan suasana terbuka, nyaman untuk perkuliahan dan diskusi.",
    details: "Plafon tinggi, kipas + AC. Dipakai kelas sore dan pelatihan singkat.",
    image: "",
  },
  {
    title: "Ruangan C2",
    category: "Ruang Kelas",
    description: "Ruang kelas 25 kursi di lantai 3 dengan kipas angin, proyektor, dan papan tulis — tenang dengan suasana terbuka, nyaman untuk perkuliahan dan diskusi.",
    details: "Dinding kedap tipis, sering jadi ruang cadangan saat Aula dipakai. Proyektor 4000 lumen.",
    image: "",
  },
  {
    title: "Ruangan C3",
    category: "Ruang Kelas",
    description: "Ruang kelas 25 kursi di lantai 3 dengan kipas angin, proyektor, dan papan tulis — tenang dengan suasana terbuka, nyaman untuk perkuliahan dan diskusi.",
    details: "Meja panjang 4 orang, cocok untuk kerja kelompok. Colokan di tengah meja.",
    image: "",
  },
  {
    title: "Ruangan C4",
    category: "Ruang Kelas",
    description: "Ruang kelas 25 kursi di lantai 3 dengan kipas angin, proyektor, dan papan tulis — tenang dengan suasana terbuka, nyaman untuk perkuliahan dan diskusi.",
    details: "Dipakai bimbingan skripsi dan kelas kecil. Karpet tipis, papan tulis kecil 2m.",
    image: "",
  },
  {
    title: "Lab 1",
    category: "Laboratorium",
    description: "Lab komputer lantai 1 dengan 30 PC, proyektor, papan tulis, dan AC — siap untuk praktikum dan pelatihan.",
    details: "PC i5, RAM 16GB, VS Code dan MySQL terpasang. Jadwal praktikum Senin–Kamis, Jumat perawatan.",
    image: "",
  },
  {
    title: "Lab 2",
    category: "Laboratorium",
    description: "Ruang praktik jaringan dan IoT lantai 2 dengan konsep lesehan agar leluasa praktik, dilengkapi proyektor, papan tulis, dan AC.",
    details: "Kabel crimping, access point, dan server mini. Dipakai konfigurasi jaringan dan keamanan.",
    image: "",
  },
  {
    title: "Lab 3",
    category: "Laboratorium",
    description: "Lab komputer lantai 3 dengan 30 PC, proyektor, papan tulis, dan AC untuk praktikum dan riset.",
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
    description: "Lab komputer lantai 3 dengan 30 PC, AC, proyektor, dan papan tulis — nyaman untuk riset dan pengerjaan tugas akhir.",
    details: "Monitor dual, lisensi MATLAB dan AutoCAD. Booking via admin lab, maksimal 4 jam per sesi.",
    image: "",
  },
  {
    title: "Kantin",
    category: "Fasilitas",
    description: "Kantin lantai 1 dekat musholla dengan 3 lapak, 3 meja bundar, dan 4 meja panjang — tempat favorit untuk istirahat dan diskusi santai.",
    details: "Menu harian nasi campur, gorengan, kopi. Meja besi panjang, wastafel dua titik, dekat musholla.",
    image: "",
  },
  {
    title: "Musholla",
    category: "Fasilitas",
    description: "Satu musholla dengan dua area terpisah: sisi kanan untuk jamaah putra dan sisi kiri untuk jamaah putri.",
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
    name: "DR. H. Muhammad Djamaluddin, B.E.,M.Kom.",
    prodi: "Informatika",
    title: "B.E., M.Kom.",
    position: "Dekan Fakultas Teknik",
    expertise: "Sistem Informasi & Tata Kelola Jurnal Ilmiah",
    doi: "https://doi.org/10.29408/jit.v6i1.7511",
    email: "muhammad.djamaluddin@hamzanwadi.ac.id",
    nuptk: "7447751652130110",
    image: "",
    sortOrder: 11,
  },
  {
    name: "Aris Sudianto, M.Kom.",
    prodi: "Informatika",
    title: "M.Kom.",
    position: "Kaprodi Informatika",
    expertise: "Rekayasa Perangkat Lunak & Evaluasi Pembelajaran",
    doi: "https://doi.org/10.29408/jit.v3i2.2289",
    email: "aris.sudianto@hamzanwadi.ac.id",
    nuptk: "7943764665110050",
    image: "",
    sortOrder: 1,
  },
  {
    name: "Indra Gunawan, S.T.,M.Pd.,M.Kom.",
    prodi: "Informatika",
    title: "S.T., M.Pd., M.Kom.",
    position: "Dosen Informatika",
    expertise: "Media Pembelajaran & Sistem Cerdas",
    doi: "https://doi.org/10.29408/jit.v4i2.3562",
    email: "indra.gunawan@hamzanwadi.ac.id",
    nuptk: "8857762663130350",
    image: "",
    sortOrder: 2,
  },
  {
    name: "Baiq Andriska Candra Permana, M.Kom",
    prodi: "Informatika",
    title: "M.Kom.",
    position: "Dosen Informatika",
    expertise: "Fisika Terapan & Pemodelan Komputasi",
    doi: "https://doi.org/10.1088/1742-6596/1869/1/012082",
    email: "baiq.andriska@hamzanwadi.ac.id",
    nuptk: "4141763664230240",
    image: "",
    sortOrder: 5,
  },
]

const dosenBaru = [
  {
    name: "Imam Fathurrahman, M.Kom.",
    prodi: "Informatika",
    title: "M.Kom.",
    position: "Dosen Informatika",
    doi: "https://scholar.google.com/citations?user=4EHs0TMAAAAJ&hl=id&oi=sra",
    nuptk: "7543763664130220",
    image: "",
    sortOrder: 3,
  },
  {
    name: "Muhamad Sadali, M.Kom.",
    prodi: "Informatika",
    title: "M.Kom.",
    position: "Dosen Informatika",
    doi: "https://scholar.google.com/citations?user=mlhSBPQAAAAJ&hl=id&oi=sra",
    nuptk: "7452749650130090",
    image: "",
    sortOrder: 4,
  },
  {
    name: "Mahpuz, S.E., M.Kom.",
    prodi: "Informatika",
    title: "S.E., M.Kom.",
    position: "Dosen Informatika",
    doi: "https://scholar.google.com/citations?user=zztbpcoAAAAJ&hl=id&oi=sra",
    nuptk: "9563751652131470",
    image: "",
    sortOrder: 8,
  },
  {
    name: "Suhartini, S.E., M.Kom.",
    prodi: "Informatika",
    title: "S.E., M.Kom.",
    position: "Dosen Informatika",
    doi: "https://scholar.google.com/citations?user=2hvDSxUAAAAJ&hl=id&oi=sra",
    nuptk: "4563757658237000",
    image: "",
    sortOrder: 6,
  },
  {
    name: "Harianto, M.Kom.",
    prodi: "Informatika",
    title: "M.Kom.",
    position: "Dosen Informatika",
    doi: "https://scholar.google.com/citations?user=XskmsVgAAAAJ&hl=id&oi=sra",
    nuptk: "4459768669130270",
    image: "",
    sortOrder: 15,
  },
  {
    name: "Ida Wahidah, M.Sc.",
    prodi: "Informatika",
    title: "M.Sc.",
    position: "Dosen Informatika",
    doi: "https://scholar.google.com/citations?user=NksVoDkAAAAJ&hl=id&oi=sra",
    nuptk: "7246771672230300",
    image: "",
    sortOrder: 16,
  },
  {
    name: "Lalu Kertawijaya, M.Pd.",
    prodi: "Informatika",
    title: "M.Pd.",
    position: "Dosen Informatika",
    doi: "https://doi.org/10.29408/jt.v3i1.28863",
    nuptk: "6563759660130470",
    image: "",
    sortOrder: 12,
  },
  {
    name: "Jumawal, M.Kom.",
    prodi: "Informatika",
    title: "M.Kom.",
    position: "Dosen Informatika",
    doi: "https://scholar.google.co.id/citations?hl=id&user=FGnR7UEAAAAJ",
    nuptk: "9546775676130140",
    image: "",
    sortOrder: 14,
  },
  {
    name: "Zaenul Amri, S.Pd., M.Kom.",
    prodi: "Informatika",
    title: "S.Pd., M.Kom.",
    position: "Dosen Informatika",
    doi: "https://scholar.google.com/citations?user=vkQlr-4AAAAJ&hl=id&oi=sra",
    nuptk: "2062773674130230",
    image: "",
    sortOrder: 9,
  },
  {
    name: "Zulkipli, M.Kom.",
    prodi: "Informatika",
    title: "M.Kom.",
    position: "Dosen Informatika",
    doi: "https://scholar.google.com/citations?user=Dn6PlUYAAAAJ&hl=id&oi=sra",
    nuptk: "7553767668130260",
    image: "",
    sortOrder: 17,
  },
  {
    name: "Hamzan Ahmadi, M.Kom.",
    prodi: "Informatika",
    title: "M.Kom.",
    position: "Dosen Informatika",
    doi: "https://sinta.kemdiktisaintek.go.id/authors/profile/6063212",
    nuptk: "5440760661200030",
    image: "",
    sortOrder: 7,
  },
  {
    name: "Muhammad Wasil, S.E., M.Kom.",
    prodi: "Informatika",
    title: "S.E., M.Kom.",
    position: "Dosen Informatika",
    doi: "https://sinta.kemdiktisaintek.go.id/authors/profile/6662509",
    nuptk: "253750651130123",
    image: "",
    sortOrder: 10,
  },
  {
    name: "M. Nurul Wathani, M.Kom.",
    prodi: "Informatika",
    title: "M.Kom.",
    position: "Dosen Informatika",
    doi: "https://sinta.kemdiktisaintek.go.id/authors/profile/6914862",
    nuptk: "7433769670130812",
    image: "",
    sortOrder: 13,
  },
  {
    name: "Hirmayanti, M.Kom.",
    prodi: "Informatika",
    title: "M.Kom.",
    position: "Dosen Informatika",
    doi: "https://sinta.kemdiktisaintek.go.id/authors/profile/7003640",
    nuptk: "1033777678230280",
    image: "",
    sortOrder: 18,
  },
  {
    name: "Taufik Akbar, M.Kom.",
    prodi: "Teknik Komputer",
    title: "M.Kom.",
    position: "Kaprodi Teknik Komputer",
    doi: "https://scholar.google.com/citations?user=YNj4dmUAAAAJ&hl=id&oi=sra",
    nuptk: "4961769670137010",
    image: "",
  },
  {
    name: "Hadian Mandala Putra, S.Si., M.Kom.",
    prodi: "Teknik Komputer",
    title: "S.Si., M.Kom.",
    position: "Dosen Teknik Komputer",
    doi: "https://scholar.google.com/citations?user=-LpXY9wAAAAJ&hl=id&oi=sra",
    nuptk: "3855771672130260",
    image: "",
  },
  {
    name: "Muhammad Qusyairi, M.Kom.",
    prodi: "Teknik Komputer",
    title: "M.Kom.",
    position: "Dosen Teknik Komputer",
    doi: "https://scholar.google.com/citations?user=PFngjloAAAAJ&hl=id&oi=sra",
    nuptk: "7036773674130250",
    image: "",
  },
  {
    name: "Dr. Ramli Ahmad, S.T., M.Kom.",
    prodi: "Teknik Komputer",
    title: "S.T., M.Kom.",
    position: "Dosen Teknik Komputer",
    doi: "https://scholar.google.com/citations?user=Z60xR8IAAAAJ&hl=id&oi=sra",
    nuptk: "1551759660130150",
    image: "",
  },
  {
    name: "Arnila Sandi, M.Kom.",
    prodi: "Teknik Komputer",
    title: "M.Kom.",
    position: "Dosen Teknik Komputer",
    doi: "https://doi.org/10.29408/jit.v7i2.26375",
    nuptk: "3150756657230180",
    image: "",
  },
  {
    name: "Intan Komala Dewi Patwari, S.Kom., M.Kom.",
    prodi: "Teknik Komputer",
    title: "S.Kom., M.Kom.",
    position: "Dosen Teknik Komputer",
    doi: "https://doi.org/10.29408/jprinter.v2i1.23849",
    nuptk: "2954765666237020",
    image: "",
  },
  {
    name: "M. Nuzuluddin, M.Pd.",
    prodi: "Teknik Komputer",
    title: "M.Pd.",
    position: "Dosen Teknik Komputer",
    doi: "https://scholar.google.com/citations?user=aNxP-nEAAAAJ&hl=id&oi=sra",
    nuptk: "2560772673130200",
    image: "",
  },
  {
    name: "Ahwan Ahmadi, M.Kom.",
    prodi: "Teknik Komputer",
    title: "M.Kom.",
    position: "Dosen Teknik Komputer",
    doi: "https://scholar.google.com/citations?user=rXrFJrkAAAAJ&hl=id&oi=sra",
    nuptk: "653770671130302",
    image: "",
  },
  {
    name: "Muhammad Saiful, M.Kom.",
    prodi: "Sistem Informasi",
    title: "M.Kom.",
    position: "Kaprodi Sistem Informasi",
    doi: "https://scholar.google.com/citations?user=Hz5OrOYAAAAJ&hl=id&oi=sra",
    nuptk: "4752756657131150",
    image: "",
  },
  {
    name: "Amri Muliawan Nur, S.T., M.Kom.",
    prodi: "Sistem Informasi",
    title: "S.T., M.Kom.",
    position: "Dosen Sistem Informasi",
    doi: "https://scholar.google.com/citations?user=7ujREfMAAAAJ&hl=id&oi=sra",
    nuptk: "5534758659130240",
    image: "",
  },
  {
    name: "Hariman Bahtiar, M.Kom.",
    prodi: "Sistem Informasi",
    title: "M.Kom.",
    position: "Dosen Bidang Akademik",
    doi: "https://scholar.google.com/citations?user=yXyY49UAAAAJ&hl=id&oi=sra",
    nuptk: "458758660200013",
    image: "",
  },
  {
    name: "Yahya, S.T., M.Kom.",
    prodi: "Sistem Informasi",
    title: "S.T., M.Kom.",
    position: "Dosen Non-Akademik",
    doi: "https://scholar.google.com/citations?user=XtvBGBUAAAAJ&hl=id&oi=sra",
    nuptk: "2552748649110010",
    image: "",
  },
  {
    name: "Yupi Kuspandi Putra, M.Kom.",
    prodi: "Sistem Informasi",
    title: "M.Kom.",
    position: "Dosen Sistem Informasi",
    doi: "https://scholar.google.com/citations?user=PWmDmeMAAAAJ&hl=id&oi=sra",
    nuptk: "449761662200042",
    image: "",
  },
  {
    name: "Amir Bagja, M.Kom.",
    prodi: "Sistem Informasi",
    title: "M.Kom.",
    position: "Dosen Sistem Informasi",
    doi: "https://scholar.google.com/citations?user=71F7A0sAAAAJ&hl=id&oi=sra",
    nuptk: "7335763664130240",
    image: "",
  },
  {
    name: "Nur Nurhidayati, S.Pd., M.Kom.",
    prodi: "Sistem Informasi",
    title: "S.Pd., M.Kom.",
    position: "Dosen Sistem Informasi",
    doi: "https://doi.org/10.29408/jit.v4i1.2989",
    nuptk: "5453766667230250",
    image: "",
  },
  {
    name: "Muh. Adrian Juniarta Hidayat, M.Eng.",
    prodi: "Sistem Informasi",
    title: "M.Eng.",
    position: "Dosen Sistem Informasi",
    doi: "https://scholar.google.com/citations?user=V4sreh4AAAAJ&hl=id&oi=sra",
    nuptk: "939771672130292",
    image: "",
  },
  {
    name: "L. M. Samsu, S.E., M.Kom.",
    prodi: "Sistem Informasi",
    title: "S.E., M.Kom.",
    position: "Dosen Sistem Informasi",
    doi: "https://scholar.google.com/citations?user=X9ulkvkAAAAJ&hl=id&oi=sra",
    nuptk: "5563753654131170",
    image: "",
  },
  {
    name: "Fathurrahman, M.Kom.",
    prodi: "Sistem Informasi",
    title: "M.Kom.",
    position: "Dosen Sistem Informasi",
    doi: "https://scholar.google.com/citations?user=uDJWf4cAAAAJ&hl=id&oi=sra",
    nuptk: "2057764665130230",
    image: "",
  },
  {
    name: "Agus Muliadi Putra, M.Si.",
    prodi: "Teknik Lingkungan",
    title: "M.Si.",
    position: "Kaprodi Teknik Lingkungan",
    doi: "https://scholar.google.com/citations?user=AztHAIYAAAAJ&hl=id&oi=sra",
    nuptk: "2154763664130210",
    image: "",
  },
  {
    name: "Baiq Liana Widiyanti, M.Pd.",
    prodi: "Sistem Informasi",
    title: "M.Pd.",
    position: "Lektor",
    doi: "https://scholar.google.com/citations?user=XXGjluAAAAAJ&hl=id&oi=sra",
    nuptk: "3344755656230150",
    image: "",
  },
  {
    name: "Husnayati Hartini, M.Si.",
    prodi: "Sistem Informasi",
    title: "M.Si.",
    position: "Dosen Sistem Informasi",
    doi: "https://scholar.google.com/citations?user=hanHPkMAAAAJ&hl=id&oi=sra",
    nuptk: "8144762663231160",
    image: "",
  },
]

const ukmSamples = [
  {
    name: "BEM Fakultas Teknik Universitas Hamzanwadi",
    description:
      "Badan Eksekutif Mahasiswa Fakultas Teknik Universitas Hamzanwadi merupakan organisasi kemahasiswaan tingkat fakultas yang menjadi wadah penyaluran aspirasi, pengembangan kepemimpinan, kreativitas, keilmuan, serta kebersamaan mahasiswa Fakultas Teknik.",
    activities:
      "Islamic Fest, Talkshow dan Seminar Karier, Bridge Connect, kegiatan kepemimpinan dan kaderisasi, pengembangan minat dan bakat, penelitian dan pengembangan keilmuan, pengabdian kepada masyarakat, serta Musyawarah Besar (MUBES).",
    contact: "https://www.instagram.com/bemft.uhamzanwadi",
    logo: "",
  },
  {
    name: "Himpunan Mahasiswa Program Studi Informatika",
    description:
      "Himpunan Mahasiswa Program Studi Informatika (HMPS Informatika) merupakan organisasi kemahasiswaan di lingkungan Program Studi Informatika Fakultas Teknik Universitas Hamzanwadi. HMPS Informatika menjadi wadah bagi mahasiswa untuk mengembangkan kemampuan akademik maupun nonakademik, kreativitas, kepemimpinan, solidaritas, serta berpartisipasi dalam berbagai kegiatan yang mendukung pengembangan mahasiswa Informatika.",
    activities:
      "Pengembangan desain, studi banding, pengenalan program studi ke sekolah, olahraga, kegiatan ilmiah, sosial, pengabdian masyarakat, kompetisi kreatif, dan pengakraban mahasiswa.",
    contact: "https://www.instagram.com/hmpsi.ftuhamzanwadi",
    logo: "",
  },
  {
    name: "Himpunan Mahasiswa Teknik Komputer",
    description:
      "HMPS Teknik Komputer merupakan organisasi kemahasiswaan Program Studi Teknik Komputer Fakultas Teknik Universitas Hamzanwadi yang menjadi wadah bagi mahasiswa untuk mengembangkan kemampuan akademik, teknologi, kepemimpinan, kreativitas, serta mempererat solidaritas dan kebersamaan antar mahasiswa. Organisasi ini juga melaksanakan berbagai program yang mendukung pengembangan kompetensi mahasiswa dan pengabdian kepada masyarakat.",
    activities:
      "Organisasi mahasiswa Program Studi Teknik Komputer Fakultas Teknik Universitas Hamzanwadi yang menjadi wadah pengembangan akademik, teknologi, kepemimpinan, kreativitas, dan solidaritas mahasiswa melalui kegiatan pembelajaran, organisasi, serta pengabdian kepada masyarakat.",
    contact: "https://www.instagram.com/hmpstk_ftuh",
    logo: "",
  },
  {
    name: "Himpunan Mahasiswa Sistem Informasi",
    description:
      "HMPS Sistem Informasi merupakan organisasi mahasiswa Program Studi Sistem Informasi Fakultas Teknik Universitas Hamzanwadi yang menjadi wadah bagi mahasiswa untuk mengembangkan kompetensi akademik, teknologi, kreativitas, kepemimpinan, serta solidaritas. Organisasi ini juga menjalankan berbagai program kerja yang mendukung pengembangan keterampilan mahasiswa dan kegiatan sosial.",
    activities:
      "Organisasi mahasiswa Program Studi Sistem Informasi Fakultas Teknik Universitas Hamzanwadi yang menjadi wadah pengembangan akademik, teknologi, kreativitas, kepemimpinan, dan solidaritas mahasiswa melalui berbagai kegiatan pendidikan, sosial, serta pengembangan kompetensi.",
    contact: "https://www.instagram.com/hmps_sisteminformasi",
    logo: "",
  },
  {
    name: "Himpunan Mahasiswa Teknik Lingkungan",
    description:
      "Himpunan Mahasiswa Program Studi Teknik Lingkungan Fakultas Teknik Universitas Hamzanwadi merupakan wadah bagi mahasiswa untuk mengembangkan kemampuan akademik, kepemimpinan, solidaritas, serta kepedulian terhadap lingkungan melalui berbagai kegiatan pendidikan, konservasi, sosial, dan pengabdian kepada masyarakat.",
    activities:
      "Edukasi dan sosialisasi lingkungan, penanaman pohon, konservasi sumber mata air, penghijauan, pengabdian kepada masyarakat, edukasi konservasi hutan, serta kegiatan sosial dan pelestarian lingkungan.",
    contact: "https://www.instagram.com/hmpstekling_ftuh",
    logo: "",
  },
  {
    name: "HIMMAH NWDI Komisariat Fakultas Teknik",
    description:
      "Himpunan Mahasiswa Nahdlatul Wathan Diniyah Islamiyah (HIMMAH NWDI) Komisariat Fakultas Teknik merupakan organisasi yang menjadi wadah pengembangan kepemimpinan, intelektualitas, kreativitas, inovasi, serta kepedulian sosial dan keagamaan bagi kader Fakultas Teknik Universitas Hamzanwadi.",
    activities:
      "Wahana Pengkaderan (WaPa), Kelas Khusus Robotika/IoT, kegiatan sosial dan pengabdian masyarakat, berbagi takjil Ramadhan, buka puasa bersama, kegiatan keagamaan, pelatihan dan pengembangan intelektual, serta kegiatan pengembangan kreativitas dan inovasi kader.",
    contact: "https://www.instagram.com/himmahnwdi_ftek",
    logo: "",
  },
]

const eventSamples = [
  {
    title: "Uji Kompetensi Mahasiswa Fakultas Teknik Universitas Hamzanwadi 2026",
    slug: "uji-kompetensi-mahasiswa-fakultas-teknik-universitas-hamzanwadi-2026",
    status: "Selesai",
    date: "19–20 Agustus 2026",
    dateTime: new Date("2026-08-19T00:00:00.000Z"),
    time: "08.00 WITA",
    location: "Fakultas Teknik Universitas Hamzanwadi, Pancor, Lombok Timur",
    description:
      "Fakultas Teknik Universitas Hamzanwadi menyelenggarakan Uji Kompetensi Mahasiswa selama dua hari yang diikuti mahasiswa tingkat akhir dari berbagai program studi. Kegiatan ini bertujuan memastikan mahasiswa tidak hanya memahami teori akademik, tetapi juga memiliki keterampilan teknis dan praktis yang relevan dengan kebutuhan dunia kerja.",
    details:
      "Uji Kompetensi Mahasiswa merupakan salah satu kegiatan Fakultas Teknik Universitas Hamzanwadi untuk mengukur kesiapan mahasiswa sebelum memasuki dunia profesional.\n\nPelaksanaan tahun 2026 mencakup delapan bidang keahlian, yaitu Rekayasa Perangkat Lunak, Internet of Things dan Robotika, Mikrokontroler, Data Mining/Data Science, Multimedia, Jaringan Komputer, Manajemen Lingkungan, serta Rekayasa Lingkungan.\n\nMelalui kegiatan tersebut, mahasiswa diuji sesuai bidang kompetensi masing-masing. Pada bidang Rekayasa Perangkat Lunak, mahasiswa diuji dalam kemampuan perancangan, pemrograman, dan pengujian aplikasi.\n\nBidang Internet of Things dan Robotika menguji kemampuan mahasiswa dalam integrasi sensor, otomatisasi, pemrograman, dan pengembangan sistem berbasis perangkat cerdas.\n\nPada bidang Data Mining dan Data Science, kompetensi mahasiswa dinilai melalui proses analisis data, pemodelan, dan penyajian informasi.\n\nSementara pada bidang lingkungan, mahasiswa diuji mengenai pengelolaan lingkungan, limbah, air bersih, mitigasi risiko, serta penerapan solusi rekayasa lingkungan.\n\nFakultas Teknik menempatkan kegiatan Uji Kompetensi sebagai bagian dari peningkatan kualitas lulusan agar mahasiswa memiliki kompetensi akademik sekaligus kemampuan profesional yang sesuai dengan kebutuhan industri.",
    image: "",
    source: "Website Resmi Universitas Hamzanwadi",
    sourceUrl: "https://hamzanwadi.ac.id/id/news/details/pastikan-lulusan-kompeten-dan-profesional-fakultas/",
  },
  {
    title: "IT Competition IX Fakultas Teknik Universitas Hamzanwadi",
    slug: "it-competition-ix-fakultas-teknik-universitas-hamzanwadi",
    status: "Selesai",
    date: "6 Juli 2026",
    dateTime: new Date("2026-07-06T00:00:00.000Z"),
    time: "08.00 WITA",
    location: "Gedung Fakultas Teknik Universitas Hamzanwadi",
    description:
      "IT Competition IX merupakan kompetisi teknologi yang diselenggarakan Fakultas Teknik Universitas Hamzanwadi sebagai wadah pengembangan kreativitas, inovasi, kemampuan berpikir kritis, dan pemecahan masalah bagi generasi muda. Kegiatan ini diikuti lebih dari 50 peserta dari berbagai daerah di Pulau Lombok.",
    details:
      "IT Competition IX diselenggarakan di Gedung Fakultas Teknik Universitas Hamzanwadi pada 6 Juli 2026.\n\nKegiatan tahunan yang telah memasuki penyelenggaraan kesembilan tersebut dirancang sebagai ruang kompetisi sekaligus pengembangan kemampuan generasi muda pada bidang teknologi informasi.\n\nLebih dari 50 peserta dari berbagai wilayah di Pulau Lombok mengikuti kegiatan tersebut.\n\nIT Competition IX mempertandingkan lima bidang kompetisi, yaitu Lomba Cerdas Cermat IT dan Lingkungan tingkat SMA/sederajat, Kompetisi Robotik, Cyber Security, Sayembara Poster, serta E-Sport Mobile Legends.\n\nPada kategori robotika, terdapat Robot Sumo dan Robot Soccer yang menjadi salah satu kategori dengan tingkat antusiasme peserta cukup tinggi.\n\nMelalui kompetisi tersebut, Fakultas Teknik Universitas Hamzanwadi ingin memberikan ruang kepada generasi muda untuk meningkatkan kreativitas, inovasi, kemampuan berpikir kritis, kemampuan teknis, serta kemampuan menyelesaikan permasalahan.\n\nFakultas Teknik juga berencana mengembangkan penyelenggaraan IT Competition pada tahun berikutnya agar mampu menjangkau peserta dengan skala yang lebih luas hingga tingkat nasional.",
    image: "",
    source: "Website Resmi Universitas Hamzanwadi",
    sourceUrl: "https://hamzanwadi.ac.id/id/news/details/asah-kreativitas-dan-inovasi-digital-pelajar-fakul/",
  },
  {
    title: "Pelatihan Bahasa Isyarat Indonesia (BISINDO) dan Relawan Mengabdi",
    slug: "pelatihan-bahasa-isyarat-indonesia-bisindo-dan-relawan-mengabdi",
    status: "Selesai",
    date: "25 Juni 2026",
    dateTime: new Date("2026-06-25T00:00:00.000Z"),
    time: "08.00 WITA",
    location: "Aula Fakultas Teknik Universitas Hamzanwadi",
    description:
      "Universitas Hamzanwadi membuka Program Pelatihan Bahasa Isyarat Indonesia (BISINDO) dan Relawan Mengabdi untuk meningkatkan kemampuan komunikasi bahasa isyarat sekaligus membangun kepedulian dan semangat kerelawanan dalam memberikan layanan kepada penyandang disabilitas.",
    details:
      "Pembukaan Program Pelatihan Bahasa Isyarat Indonesia atau BISINDO dan Relawan Mengabdi diselenggarakan pada 25 Juni 2026 di Aula Fakultas Teknik Universitas Hamzanwadi.\n\nKegiatan tersebut melibatkan berbagai unsur Universitas Hamzanwadi dan mitra eksternal.\n\nPeserta dan undangan berasal dari Pusat Layanan Disabilitas Universitas Hamzanwadi, Perpustakaan dan Kearsipan Daerah Lombok Timur, Dinas Pendidikan dan Kebudayaan Lombok Timur, mitra sekolah, relawan PLD, serta peserta pelatihan BISINDO.\n\nProgram pelatihan difokuskan pada pengembangan kemampuan peserta dalam berkomunikasi menggunakan Bahasa Isyarat Indonesia.\n\nSelain pembelajaran bahasa isyarat, kegiatan ini juga diarahkan untuk membentuk kepedulian sosial dan semangat kerelawanan sehingga peserta memiliki kemampuan dalam memberikan layanan dan pendampingan yang lebih baik kepada penyandang disabilitas.\n\nKegiatan pembukaan menjadi bagian awal dari rangkaian pelatihan dan kegiatan pengabdian yang mendukung terciptanya lingkungan pendidikan yang semakin inklusif.",
    image: "",
    source: "Website Resmi Universitas Hamzanwadi",
    sourceUrl: "https://hamzanwadi.ac.id/news/details/pembukaan-program-pelatihan-bahasa-isyarat-indones/",
  },
  {
    title: "FGD Validasi dan Penyempurnaan Kurikulum OBE Program Studi Teknik Komputer",
    slug: "fgd-validasi-dan-penyempurnaan-kurikulum-obe-program-studi-teknik-komputer",
    status: "Selesai",
    date: "18 April 2026",
    dateTime: new Date("2026-04-18T00:00:00.000Z"),
    time: "08.00 WITA",
    location: "Ruang B2, Fakultas Teknik Universitas Hamzanwadi",
    description:
      "Program Studi Teknik Komputer Fakultas Teknik Universitas Hamzanwadi menyelenggarakan Focus Group Discussion untuk melakukan validasi dan penyempurnaan Kurikulum Outcome-Based Education 2026 dengan melibatkan akademisi, mahasiswa, alumni, dan praktisi industri.",
    details:
      "Focus Group Discussion atau FGD dilaksanakan pada 18 April 2026 di Ruang B2 Fakultas Teknik Universitas Hamzanwadi.\n\nKegiatan tersebut merupakan bagian dari proses validasi dan penyempurnaan Kurikulum Outcome-Based Education atau OBE Program Studi Teknik Komputer.\n\nPenyempurnaan kurikulum dilakukan agar kompetensi mahasiswa dan profil lulusan tetap relevan dengan perkembangan teknologi serta kebutuhan dunia industri.\n\nProgram Studi Teknik Komputer melibatkan berbagai pihak dalam kegiatan ini, mulai dari unsur akademik, mahasiswa, alumni hingga praktisi industri.\n\nBeberapa mitra industri yang dilibatkan antara lain Lombok Center IT, PT Solah Solution Indonesia, dan CV RoboKids Academy.\n\nDiskusi menghasilkan sejumlah rekomendasi terkait penguatan kompetensi mahasiswa pada bidang embedded system, Internet of Things, jaringan komputer, keamanan siber, fabrikasi digital, serta desain 3D.\n\nSelain itu, pembelajaran berbasis proyek dan praktik direkomendasikan untuk terus dikembangkan.\n\nKolaborasi dengan industri juga diarahkan melalui kegiatan magang, kuliah praktisi, program MBKM, kemitraan teknologi, serta penelitian terapan antara dosen dan mahasiswa.\n\nHasil FGD digunakan sebagai salah satu dasar untuk melakukan penyempurnaan Kurikulum OBE Program Studi Teknik Komputer.",
    image: "",
    source: "Website Resmi Universitas Hamzanwadi",
    sourceUrl: "https://hamzanwadi.ac.id/id/news/details/diskusi-kelompok-terfokus-fgd-tentang-kurikulum-ob/",
  },
  {
    title: "Informatics Robotic Innovation Cup (IRIC) 2026",
    slug: "informatics-robotic-innovation-cup-iric-2026",
    status: "Selesai",
    date: "23–24 Januari 2026",
    dateTime: new Date("2026-01-23T00:00:00.000Z"),
    time: "08.00 WITA",
    location: "Aula Fakultas Teknik Universitas Hamzanwadi",
    description:
      "Program Studi Informatika Fakultas Teknik Universitas Hamzanwadi menyelenggarakan Informatics Robotic Innovation Cup atau IRIC 2026 sebagai kompetisi robotika tingkat provinsi yang melibatkan mahasiswa serta pelajar SMP dan SMA dari berbagai wilayah di Nusa Tenggara Barat.",
    details:
      "Informatics Robotic Innovation Cup atau IRIC 2026 diselenggarakan selama dua hari pada 23–24 Januari 2026 di Aula Fakultas Teknik Universitas Hamzanwadi.\n\nKegiatan tersebut mengusung tema \"Cipta, Karya, Teknologi\" dan menjadi salah satu kegiatan Program Studi Informatika dalam mendorong kreativitas dan inovasi generasi muda pada bidang teknologi robotika.\n\nPeserta berasal dari kalangan mahasiswa serta pelajar SMP, SMA, dan sederajat dari berbagai daerah di Nusa Tenggara Barat.\n\nKompetisi dibagi menjadi kategori Robot Soccer untuk peserta mahasiswa dan Robot Avoider untuk peserta tingkat sekolah.\n\nSelama kompetisi, peserta dituntut menerapkan kemampuan perancangan robot, pemrograman, algoritma, strategi, logika, dan penyelesaian masalah.\n\nIRIC juga menjadi sarana untuk mengenalkan perkembangan teknologi robotika kepada pelajar sekaligus meningkatkan kemampuan mahasiswa dalam mengimplementasikan pengetahuan teknologi yang telah diperoleh selama proses pembelajaran.\n\nKegiatan ditutup dengan pemberian penghargaan kepada peserta terbaik.\n\nFakultas Teknik berharap IRIC dapat terus dikembangkan sebagai salah satu wadah kompetisi teknologi sehingga mahasiswa dan pelajar memiliki kemampuan inovasi serta daya saing yang semakin baik.",
    image: "",
    source: "Website Resmi Fakultas Teknik Universitas Hamzanwadi",
    sourceUrl: "https://ft.hamzanwadi.ac.id/in/galeri/detail/fakultas-teknik-universitas-hamzanwadi-sukses-gela/",
  },
]

const newsSamples = [
  {
    title: "Pastikan Lulusan Kompeten dan Profesional, Fakultas Teknik Universitas Hamzanwadi Gelar Uji Kompetensi",
    slug: "pastikan-lulusan-kompeten-dan-profesional-fakultas-teknik-universitas-hamzanwadi-gelar-uji-kompetensi",
    date: "19 Agustus 2026",
    excerpt:
      "Fakultas Teknik Universitas Hamzanwadi menyelenggarakan Uji Kompetensi Mahasiswa pada 19–20 Agustus 2026. Kegiatan tersebut ditujukan untuk mengukur kesiapan mahasiswa tingkat akhir dalam bidang keahlian yang sesuai dengan program studi serta meningkatkan daya saing lulusan sebelum memasuki dunia kerja.",
    content:
      "Fakultas Teknik Universitas Hamzanwadi melaksanakan Uji Kompetensi Mahasiswa selama dua hari dengan melibatkan ratusan mahasiswa tingkat akhir. Kegiatan ini tidak hanya mengukur pemahaman akademik mahasiswa, tetapi juga kemampuan teknis dan keterampilan praktis yang berkaitan langsung dengan kebutuhan dunia industri.\n\nPengujian mencakup delapan bidang kompetensi, yaitu Rekayasa Perangkat Lunak, Internet of Things dan Robotika, Mikrokontroler, Data Mining/Data Science, Multimedia, Jaringan Komputer, Manajemen Lingkungan, serta Rekayasa Lingkungan. Pada bidang Rekayasa Perangkat Lunak, mahasiswa diuji dalam perancangan, pemrograman, dan pengujian aplikasi. Bidang IoT dan Robotika menilai kemampuan integrasi sensor, otomatisasi, dan pemrograman robot. Sementara Data Science mencakup analisis data, pemodelan prediktif, dan visualisasi informasi.\n\nBidang lingkungan menguji kemampuan mahasiswa dalam pengelolaan lingkungan, mitigasi risiko, pengelolaan limbah, penyediaan air bersih, serta penerapan solusi rekayasa yang berkelanjutan. Pengujian dilakukan oleh tim yang memiliki kompetensi pada bidang masing-masing.\n\nFakultas berharap kegiatan ini dapat meningkatkan kesiapan lulusan menghadapi kebutuhan industri dan memperbesar peluang alumni memperoleh pekerjaan.",
    image: "",
    category: "Akademik",
    source: "Website Resmi Universitas Hamzanwadi",
    sourceUrl: "https://hamzanwadi.ac.id/id/news/details/pastikan-lulusan-kompeten-dan-profesional-fakultas/",
    createdAt: new Date("2026-08-19T00:00:00.000Z"),
  },
  {
    title: "Asah Kreativitas dan Inovasi Digital Pelajar, Fakultas Teknik Universitas Hamzanwadi Gelar IT Competition",
    slug: "asah-kreativitas-dan-inovasi-digital-pelajar-fakultas-teknik-universitas-hamzanwadi-gelar-it-competition",
    date: "9 Juli 2026",
    excerpt:
      "Fakultas Teknik Universitas Hamzanwadi menyelenggarakan IT Competition IX sebagai wadah bagi pelajar dan masyarakat untuk mengembangkan kemampuan, kreativitas, dan inovasi pada bidang teknologi informasi. Kompetisi diikuti lebih dari 50 peserta dari berbagai daerah di Pulau Lombok.",
    content:
      "IT Competition IX dibuka di Gedung Fakultas Teknik Universitas Hamzanwadi pada 6 Juli 2026. Kegiatan tahunan yang telah memasuki penyelenggaraan kesembilan tersebut bertujuan memberikan ruang kepada generasi muda untuk mengembangkan bakat digital sekaligus menguji kemampuan mereka melalui kompetisi.\n\nLebih dari 50 peserta dari berbagai wilayah Pulau Lombok mengikuti kegiatan ini. Fakultas Teknik menekankan bahwa kompetisi tersebut bukan hanya untuk menentukan pemenang, tetapi juga sebagai sarana menumbuhkan kreativitas, inovasi, kemampuan berpikir kritis, dan kemampuan memecahkan masalah.\n\nIT Competition IX mempertandingkan lima bidang, yaitu Lomba Cerdas Cermat IT dan Lingkungan untuk tingkat SMA/sederajat, kompetisi robotik dengan kategori Robot Sumo dan Robot Soccer, Cyber Security, sayembara poster, serta E-Sport Mobile Legends. Kompetisi robotik memperoleh antusiasme peserta paling tinggi.\n\nPanitia pada awalnya mempertimbangkan membawa kompetisi robotik ke skala nasional. Namun, karena waktu persiapan relatif terbatas, penyelenggara memilih mengoptimalkan kompetisi tingkat provinsi terlebih dahulu.\n\nPada penyelenggaraan berikutnya, Fakultas Teknik berencana melakukan persiapan lebih awal sehingga jangkauan peserta dapat diperluas sampai tingkat nasional.",
    image: "",
    category: "Kegiatan",
    source: "Website Resmi Universitas Hamzanwadi",
    sourceUrl: "https://hamzanwadi.ac.id/id/news/details/asah-kreativitas-dan-inovasi-digital-pelajar-fakul/",
    createdAt: new Date("2026-07-09T00:00:00.000Z"),
  },
  {
    title: "Mahasiswa Fakultas Teknik Universitas Hamzanwadi Berlaga di Kompetisi Robot Internasional PIRC 2026 Malaysia",
    slug: "mahasiswa-fakultas-teknik-universitas-hamzanwadi-berlaga-di-kompetisi-robot-internasional-pirc-2026-malaysia",
    date: "21 April 2026",
    excerpt:
      "Universitas Hamzanwadi melepas tim robotik Fakultas Teknik untuk mengikuti Perak International Robotic Competition (PIRC) 2026 di Malaysia. Empat mahasiswa dari Teknik Komputer dan Teknik Informatika dikirim dalam dua tim untuk berkompetisi pada bidang robotika tingkat internasional.",
    content:
      "Universitas Hamzanwadi secara resmi melepas mahasiswa Fakultas Teknik yang akan mengikuti Perak International Robotic Competition 2026 pada 24–26 April 2026 di ADTEC Taiping, Perak, Malaysia.\n\nPelepasan dilakukan oleh Wakil Rektor III Universitas Hamzanwadi sebagai bentuk dukungan institusi terhadap prestasi dan pengembangan kompetensi mahasiswa pada bidang teknologi.\n\nPeserta berasal dari ORION UNHAZ ROBOTIC Team yang dibina oleh alumni Teknik Komputer, Wahyu Rian Pratama. Universitas Hamzanwadi mengirimkan dua tim dengan jumlah keseluruhan empat mahasiswa yang berasal dari Program Studi Teknik Komputer dan Teknik Informatika.\n\nKompetisi yang diikuti menuntut kemampuan dalam desain mekanik, algoritma, navigasi robot secara otomatis, pemrograman, dan strategi kompetisi. PIRC merupakan kompetisi yang mempertemukan peserta dari beberapa negara Asia Tenggara.\n\nKeikutsertaan mahasiswa dalam kompetisi internasional tersebut juga dipandang sebagai implementasi pembelajaran berbasis kompetensi. Mahasiswa tidak hanya mendapatkan teori dalam perkuliahan, tetapi juga memperoleh kesempatan menguji kemampuan teknis dalam lingkungan kompetitif internasional.\n\nFakultas berharap pengalaman ini dapat meningkatkan inovasi, mental kompetitif, serta daya saing global mahasiswa.",
    image: "",
    category: "Prestasi",
    source: "Website Resmi Universitas Hamzanwadi",
    sourceUrl: "https://hamzanwadi.ac.id/news/details/mahasiswa-fakultas-teknik-universitas-hamzanwadi-b/",
    createdAt: new Date("2026-04-21T00:00:00.000Z"),
  },
  {
    title: "Dua Mahasiswa Teknik Informatika Universitas Hamzanwadi Lolos Digital Career Bootcamp Berskala Nasional",
    slug: "dua-mahasiswa-teknik-informatika-universitas-hamzanwadi-lolos-digital-career-bootcamp-berskala-nasional",
    date: "20 April 2026",
    excerpt:
      "Dua mahasiswa Teknik Informatika Fakultas Teknik Universitas Hamzanwadi, Sahrul dan Abimanyu Herdiansyah, berhasil lolos Digital Career Bootcamp yang diselenggarakan Maxy Academy melalui program beasiswa penuh.",
    content:
      "Dua mahasiswa Program Studi Teknik Informatika Fakultas Teknik Universitas Hamzanwadi berhasil lolos seleksi Digital Career Bootcamp berskala nasional. Keduanya adalah Sahrul dan Abimanyu Herdiansyah.\n\nProgram tersebut diselenggarakan Maxy Academy dalam bentuk bootcamp online yang kemudian dilanjutkan dengan kegiatan magang secara langsung. Program dimulai pada 20 April 2026 dan dirancang untuk meningkatkan kompetensi profesional peserta pada bidang digital.\n\nPeserta mengikuti pembelajaran intensif selama sekitar dua hingga dua setengah bulan. Setelah menyelesaikan bootcamp, peserta akan menjalani magang atau mengerjakan proyek industri selama sekitar tiga sampai enam bulan.\n\nMelalui program tersebut mahasiswa memperoleh kesempatan belajar langsung dari praktisi industri, mengerjakan proyek yang berhubungan dengan kebutuhan perusahaan, meningkatkan keterampilan profesional, serta memperoleh pengalaman kerja sebelum lulus.\n\nKeberhasilan kedua mahasiswa tersebut menunjukkan bahwa mahasiswa Fakultas Teknik mampu bersaing dalam program pengembangan talenta digital tingkat nasional.\n\nFakultas berharap pengalaman tersebut dapat mempersiapkan mahasiswa menjadi lulusan yang memiliki kompetensi teknis, pengalaman industri, dan kemampuan beradaptasi terhadap perkembangan teknologi.",
    image: "",
    category: "Prestasi",
    source: "Website Resmi Universitas Hamzanwadi",
    sourceUrl: "https://hamzanwadi.ac.id/id/news/details/dua-mahasiswa-teknik-informatika-universitas-hamza/",
    createdAt: new Date("2026-04-20T00:00:00.000Z"),
  },
  {
    title: "Diskusi Kelompok Terfokus (FGD) tentang Kurikulum OBE untuk Teknik Komputer di Hamzanwadi Melibatkan Industri, Memperkuat Kompetensi IoT, Jaringan, dan Kompetensi Komputasi Awan",
    slug: "diskusi-kelompok-terfokus-fgd-tentang-kurikulum-obe-untuk-teknik-komputer-di-hamzanwadi-melibatkan-industri-memperkuat-kompetensi-iot-jaringan-dan-kompetensi-komputasi-awan",
    date: "18 April 2026",
    excerpt:
      "Program Studi Teknik Komputer Fakultas Teknik Universitas Hamzanwadi melaksanakan FGD untuk melakukan validasi dan penyempurnaan Kurikulum Outcome-Based Education (OBE) 2026 dengan melibatkan akademisi, mahasiswa, alumni, dan praktisi industri.",
    content:
      "FGD dilaksanakan di Ruang B2 Fakultas Teknik Universitas Hamzanwadi pada 18 April 2026. Kegiatan difokuskan pada evaluasi serta penyempurnaan kurikulum OBE Program Studi Teknik Komputer agar kompetensi mahasiswa semakin sesuai dengan perkembangan teknologi dan kebutuhan dunia kerja.\n\nKurikulum OBE 2026 merupakan pengembangan berikutnya setelah kurikulum 2016, 2021, dan Kurikulum MBKM 2022. Dalam penyusunannya, program studi tidak hanya melibatkan unsur internal kampus, tetapi juga alumni dan praktisi industri seperti Lombok Center IT, PT Solah Solution Indonesia, dan CV RoboKids Academy.\n\nFGD menghasilkan sejumlah rekomendasi penting. Kompetensi mahasiswa perlu diperkuat pada bidang embedded system, Internet of Things, jaringan komputer, keamanan siber, fabrikasi digital, dan desain 3D. Selain itu, pembelajaran berbasis proyek dan praktik perlu diperluas.\n\nKolaborasi dengan industri juga direkomendasikan melalui program magang, kuliah praktisi, kemitraan teknologi, kegiatan MBKM, serta penelitian terapan yang melibatkan dosen dan mahasiswa.\n\nHasil FGD selanjutnya digunakan sebagai dasar penyempurnaan kurikulum agar lulusan Teknik Komputer memiliki kompetensi yang relevan dan mampu beradaptasi dengan perubahan industri teknologi.",
    image: "",
    category: "Akademik",
    source: "Website Resmi Universitas Hamzanwadi",
    sourceUrl: "https://hamzanwadi.ac.id/id/news/details/diskusi-kelompok-terfokus-fgd-tentang-kurikulum-ob/",
    createdAt: new Date("2026-04-18T00:00:00.000Z"),
  },
  {
    title: "Fakultas Teknik Universitas Hamzanwadi Sukses Gelar IRIC 2026: Ajang Unjuk Inovasi Robotika Tingkat Provinsi",
    slug: "fakultas-teknik-universitas-hamzanwadi-sukses-gelar-iric-2026-ajang-unjuk-inovasi-robotika-tingkat-provinsi",
    date: "28 Januari 2026",
    excerpt:
      "Program Studi Informatika Fakultas Teknik Universitas Hamzanwadi menyelenggarakan Informatics Robotic Innovation Cup (IRIC) 2026 sebagai kompetisi robotika tingkat provinsi yang melibatkan mahasiswa serta pelajar SMP dan SMA dari berbagai wilayah di Nusa Tenggara Barat.",
    content:
      "IRIC 2026 dilaksanakan selama dua hari pada 23–24 Januari 2026 di Aula Fakultas Teknik Universitas Hamzanwadi dengan tema \"Cipta, Karya, Teknologi\". Kompetisi tersebut menjadi salah satu kegiatan Program Studi Informatika untuk mendorong kreativitas dan inovasi generasi muda dalam bidang robotika.\n\nPeserta berasal dari kalangan mahasiswa serta pelajar SMP/SMA atau sederajat dari berbagai daerah di Nusa Tenggara Barat. Kompetisi dibagi dalam kategori Robot Soccer untuk mahasiswa dan Robot Avoider untuk pelajar.\n\nSelama kegiatan, peserta dituntut menggunakan kemampuan perancangan robot, pemrograman, logika, strategi, dan penyelesaian masalah. Selain sebagai kompetisi, IRIC juga menjadi sarana memperkenalkan bidang robotika serta perkembangan teknologi kepada generasi muda.\n\nPimpinan Fakultas Teknik memberikan dukungan terhadap penyelenggaraan IRIC dan menempatkannya sebagai salah satu kegiatan strategis Program Studi Informatika. Kegiatan ini juga dimanfaatkan sebagai sarana memperkenalkan Fakultas Teknik kepada sekolah dan masyarakat.\n\nRangkaian acara ditutup dengan pemberian penghargaan kepada pemenang. Fakultas berharap IRIC dapat terus dikembangkan sehingga mampu menghasilkan generasi muda yang inovatif, adaptif terhadap perkembangan teknologi, serta memiliki kemampuan bersaing pada kompetisi tingkat nasional.",
    image: "",
    category: "Kegiatan",
    source: "Website Resmi Fakultas Teknik Universitas Hamzanwadi",
    sourceUrl: "https://ft.hamzanwadi.ac.id/in/galeri/detail/fakultas-teknik-universitas-hamzanwadi-sukses-gela/",
    createdAt: new Date("2026-01-28T00:00:00.000Z"),
  },
]

const faqSamples = [
  {
    question: "Apa itu Fakultas Teknik Universitas Hamzanwadi?",
    answer:
      "Fakultas Teknik Universitas Hamzanwadi merupakan fakultas yang berfokus pada pendidikan dan pengembangan ilmu pengetahuan di bidang teknologi, komputasi, dan rekayasa lingkungan.",
  },
  {
    question: "Apa saja program studi yang tersedia di Fakultas Teknik Universitas Hamzanwadi?",
    answer:
      "Fakultas Teknik Universitas Hamzanwadi memiliki empat program studi jenjang S1, yaitu Teknik Informatika, Sistem Informasi, Teknik Komputer, dan Teknik Lingkungan.",
  },
  {
    question: "Apa yang dipelajari di Program Studi Teknik Informatika?",
    answer:
      "Program Studi Teknik Informatika mempelajari bidang pemrograman, rekayasa perangkat lunak, pengembangan aplikasi, kecerdasan buatan, data, jaringan komputer, serta berbagai teknologi komputasi.",
  },
  {
    question: "Apa yang dipelajari di Program Studi Sistem Informasi?",
    answer:
      "Program Studi Sistem Informasi mempelajari penerapan teknologi informasi dalam organisasi, seperti analisis dan perancangan sistem, basis data, pengelolaan informasi, serta pemanfaatan teknologi untuk mendukung proses bisnis.",
  },
  {
    question: "Apa yang dipelajari di Program Studi Teknik Komputer?",
    answer:
      "Program Studi Teknik Komputer mempelajari integrasi perangkat keras dan perangkat lunak, seperti mikrokontroler, embedded system, Internet of Things (IoT), jaringan komputer, dan sistem kendali.",
  },
  {
    question: "Apa yang dipelajari di Program Studi Teknik Lingkungan?",
    answer:
      "Program Studi Teknik Lingkungan mempelajari pengelolaan lingkungan, pengolahan air dan limbah, sanitasi, pengendalian pencemaran, serta penerapan teknologi yang mendukung keberlanjutan lingkungan.",
  },
  {
    question: "Apa perbedaan Teknik Informatika, Sistem Informasi, dan Teknik Komputer?",
    answer:
      "Teknik Informatika lebih berfokus pada perangkat lunak dan komputasi, Sistem Informasi berfokus pada penerapan teknologi dalam organisasi dan bisnis, sedangkan Teknik Komputer berfokus pada integrasi perangkat keras, perangkat lunak, jaringan, dan sistem tertanam.",
  },
  {
    question: "Di mana saya dapat melihat informasi dosen Fakultas Teknik?",
    answer:
      "Informasi mengenai dosen Fakultas Teknik dapat dilihat melalui halaman Data Dosen, yang menyediakan informasi dosen berdasarkan program studi di lingkungan Fakultas Teknik.",
  },
  {
    question: "Bagaimana cara mengetahui struktur organisasi Fakultas Teknik?",
    answer:
      "Informasi mengenai Dekan, Wakil Dekan, Ketua Program Studi, serta struktur pengelola Fakultas Teknik dapat dilihat melalui halaman Struktur Organisasi.",
  },
  {
    question: "Di mana saya dapat melihat informasi fasilitas dan laboratorium Fakultas Teknik?",
    answer:
      "Informasi mengenai fasilitas, ruangan, serta laboratorium yang tersedia dapat dilihat melalui halaman Blueprint Fakultas pada website.",
  },
  {
    question: "Bagaimana cara mengetahui kegiatan terbaru Fakultas Teknik?",
    answer:
      "Informasi mengenai seminar, kegiatan akademik, kegiatan mahasiswa, dan agenda Fakultas Teknik dapat dilihat melalui halaman Event.",
  },
  {
    question: "Di mana saya dapat melihat berita terbaru Fakultas Teknik?",
    answer:
      "Berita mengenai kegiatan, prestasi, informasi akademik, dan perkembangan terbaru Fakultas Teknik dapat dilihat melalui halaman Berita pada website.",
  },
  {
    question: "Apakah terdapat organisasi mahasiswa di Fakultas Teknik?",
    answer:
      "Ya. Fakultas Teknik memiliki organisasi mahasiswa yang menjadi wadah bagi mahasiswa untuk mengembangkan kemampuan organisasi, kepemimpinan, kreativitas, dan kegiatan kemahasiswaan. Informasinya dapat dilihat melalui halaman Organisasi Mahasiswa.",
  },
  {
    question: "Bagaimana cara mendaftar menjadi mahasiswa Fakultas Teknik Universitas Hamzanwadi?",
    answer:
      "Pendaftaran dilakukan melalui sistem Penerimaan Mahasiswa Baru Universitas Hamzanwadi. Calon mahasiswa dapat memilih salah satu program studi yang tersedia di Fakultas Teknik sesuai dengan jalur dan periode penerimaan yang berlaku.",
  },
  {
    question: "Bagaimana jika informasi yang saya cari tidak tersedia di website?",
    answer:
      "Jika informasi yang dibutuhkan belum tersedia, pengunjung dapat menggunakan halaman Hubungi Kami untuk mengirimkan pertanyaan atau pesan kepada pengelola Fakultas Teknik.",
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
  const allDosen = [...dosenSamples, ...dosenBaru]
  for (const item of allDosen) {
    if (!item.nuptk) {
      const exists = await prisma.dosen.findFirst({ where: { name: item.name } })
      if (exists) {
        await prisma.dosen.update({ where: { id: exists.id }, data: item })
      } else {
        await prisma.dosen.create({ data: item })
      }
      continue
    }
    await prisma.dosen.upsert({
      where: { nuptk: item.nuptk },
      update: { ...item },
      create: { ...item },
    })
  }
  const total = await prisma.dosen.count()
  console.log(`Dosen: ${allDosen.length} diproses (upsert by nuptk, termasuk sortOrder 1-18 Informatika), total ${total}.`)
}

async function seedUkm() {
  await prisma.ukm.deleteMany({})
  await prisma.ukm.createMany({ data: ukmSamples })
  console.log(`UKM: reset & ${ukmSamples.length} data baru dibuat.`)
}

async function seedEvents() {
  for (const item of eventSamples) {
    await prisma.event.upsert({ where: { slug: item.slug }, update: {}, create: item })
  }
  console.log(`Event: ${eventSamples.length} data dipastikan ada (upsert by slug, tanpa duplikat).`)
}

async function seedNews() {
  for (const item of newsSamples) {
    await prisma.news.upsert({ where: { slug: item.slug }, update: {}, create: item })
  }
  console.log(`Berita: ${newsSamples.length} data dipastikan ada (upsert by slug, tanpa duplikat).`)
}

async function seedFaq() {
  await prisma.faq.deleteMany({})
  await prisma.faq.createMany({ data: faqSamples })
  console.log(`FAQ: reset & ${faqSamples.length} data baru dibuat.`)
}

async function seedStruktur() {
  await prisma.struktur.deleteMany({})
  const dekan = await prisma.struktur.create({
    data: {
      parentId: null,
      role: "Dekan Fakultas Teknik",
      name: "Dr. H. Muhammad Djamaluddin, B.E., M.Kom.",
      details: "Pimpinan tertinggi Fakultas Teknik, penanggung jawab penyelenggaraan pendidikan, penelitian, dan pengabdian masyarakat.",
    },
  })
  await prisma.struktur.createMany({
    data: [
      {
        parentId: dekan.id,
        role: "Wakil Dekan I",
        name: "Hariman Bahtiar, M.Kom.",
        details: "Bidang Akademik",
      },
      {
        parentId: dekan.id,
        role: "Wakil Dekan II",
        name: "Yahya, S.T., M.Kom.",
        details: "Bidang Non-Akademik",
      },
      {
        parentId: dekan.id,
        role: "Ketua Program Studi Informatika",
        name: "Aris Sudianto, M.Kom.",
        details: "Program Studi Informatika",
      },
      {
        parentId: dekan.id,
        role: "Ketua Program Studi Teknik Komputer",
        name: "Taufik Akbar, M.Kom.",
        details: "Program Studi Teknik Komputer",
      },
      {
        parentId: dekan.id,
        role: "Ketua Program Studi Sistem Informasi",
        name: "Muhammad Saiful, M.Kom.",
        details: "Program Studi Sistem Informasi",
      },
      {
        parentId: dekan.id,
        role: "Ketua Program Studi Teknik Lingkungan",
        name: "Agus Muliadi Putra, M.Si.",
        details: "Program Studi Teknik Lingkungan",
      },
    ],
  })
  console.log(`Struktur organisasi: reset & 7 data baru dibuat (1 Dekan + 2 WD + 4 Kaprodi).`)
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
