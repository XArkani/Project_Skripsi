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
    name: "DR. H. Muhammad Djamaluddin, B.E.,M.Kom.",
    prodi: "Informatika",
    title: "B.E., M.Kom.",
    position: "Dekan Fakultas Teknik",
    expertise: "Sistem Informasi & Tata Kelola Jurnal Ilmiah",
    doi: "https://doi.org/10.29408/jit.v6i1.7511",
    email: "muhammad.djamaluddin@hamzanwadi.ac.id",
    nuptk: "7447751652130110",
    image: "",
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
  },
  {
    name: "Muhamad Sadali, M.Kom.",
    prodi: "Informatika",
    title: "M.Kom.",
    position: "Dosen Informatika",
    doi: "https://scholar.google.com/citations?user=mlhSBPQAAAAJ&hl=id&oi=sra",
    nuptk: "7452749650130090",
    image: "",
  },
  {
    name: "Mahpuz, S.E., M.Kom.",
    prodi: "Informatika",
    title: "S.E., M.Kom.",
    position: "Dosen Informatika",
    doi: "https://scholar.google.com/citations?user=zztbpcoAAAAJ&hl=id&oi=sra",
    nuptk: "9563751652131470",
    image: "",
  },
  {
    name: "Suhartini, S.E., M.Kom.",
    prodi: "Informatika",
    title: "S.E., M.Kom.",
    position: "Dosen Informatika",
    doi: "https://scholar.google.com/citations?user=2hvDSxUAAAAJ&hl=id&oi=sra",
    nuptk: "4563757658237000",
    image: "",
  },
  {
    name: "Harianto, M.Kom.",
    prodi: "Informatika",
    title: "M.Kom.",
    position: "Dosen Informatika",
    doi: "https://scholar.google.com/citations?user=XskmsVgAAAAJ&hl=id&oi=sra",
    nuptk: "4459768669130270",
    image: "",
  },
  {
    name: "Ida Wahidah, M.Sc.",
    prodi: "Informatika",
    title: "M.Sc.",
    position: "Dosen Informatika",
    doi: "https://scholar.google.com/citations?user=NksVoDkAAAAJ&hl=id&oi=sra",
    nuptk: "7246771672230300",
    image: "",
  },
  {
    name: "Lalu Kertawijaya, M.Pd.",
    prodi: "Informatika",
    title: "M.Pd.",
    position: "Dosen Informatika",
    doi: "https://doi.org/10.29408/jt.v3i1.28863",
    nuptk: "6563759660130470",
    image: "",
  },
  {
    name: "Jumawal, M.Kom.",
    prodi: "Informatika",
    title: "M.Kom.",
    position: "Dosen Informatika",
    doi: "https://scholar.google.co.id/citations?hl=id&user=FGnR7UEAAAAJ",
    nuptk: "9546775676130140",
    image: "",
  },
  {
    name: "Zaenul Amri, S.Pd., M.Kom.",
    prodi: "Informatika",
    title: "S.Pd., M.Kom.",
    position: "Dosen Informatika",
    doi: "https://scholar.google.com/citations?user=vkQlr-4AAAAJ&hl=id&oi=sra",
    nuptk: "2062773674130230",
    image: "",
  },
  {
    name: "Zulkipli, M.Kom.",
    prodi: "Informatika",
    title: "M.Kom.",
    position: "Dosen Informatika",
    doi: "https://scholar.google.com/citations?user=Dn6PlUYAAAAJ&hl=id&oi=sra",
    nuptk: "7553767668130260",
    image: "",
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
  await prisma.dosen.createMany({ data: dosenSamples, skipDuplicates: true })
  const result = await prisma.dosen.createMany({ data: dosenBaru, skipDuplicates: true })
  const total = await prisma.dosen.count()
  console.log(`Dosen: ${result.count} baru ditambahkan, total ${total} (4 lama dipertahankan).`)
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
