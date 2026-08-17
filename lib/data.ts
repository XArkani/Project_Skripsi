import type { Blueprint, Dosen, UKM, Event, News, FAQ, Struktur, Message } from "./types"

export const INITIAL_BLUEPRINTS: Blueprint[] = [
  {
    id: "bp1",
    title: "Gedung Dekanat & Pusat Riset Teknik",
    category: "Gedung",
    description: "Pusat administrasi, dekanat, dan ruang kolaborasi riset mahasiswa dengan desain modern ramah lingkungan.",
    details: "Gedung ramah lingkungan dengan sistem panel surya mandiri, ruang rapat eksekutif, ruang konferensi berkapasitas 200 orang, dan pusat layanan akademik terpadu satu pintu untuk memudahkan mahasiswa.",
    image: "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&q=80&w=1000"
  },
  {
    id: "bp2",
    title: "Laboratorium Rekayasa Perangkat Lunak & AI",
    category: "Laboratorium",
    description: "Ruang komputasi mutakhir berkecepatan tinggi untuk riset kecerdasan buatan dan pengembangan sistem cerdas.",
    details: "Dilengkapi dengan 40 workstation high-end Core i9 dengan GPU NVIDIA RTX 4080, server AI lokal, Smart TV interaktif, pendingin ruangan presisi, dan lingkungan pengembangan perangkat lunak bersertifikasi internasional.",
    image: "https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?auto=format&fit=crop&q=80&w=1000"
  },
  {
    id: "bp3",
    title: "Perpustakaan Digital Terintegrasi",
    category: "Fasilitas",
    description: "Akses instan ke puluhan ribu jurnal ilmiah internasional terindeks Scopus dan IEEE, serta area belajar kondusif.",
    details: "Menyediakan akses tak terbatas ke portal jurnal bereputasi tinggi, ruang diskusi kelompok kedap suara, area membaca lesehan dengan stop kontak terintegrasi, dan sistem peminjaman buku berbasis RFID.",
    image: "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&q=80&w=1000"
  }
]

export const INITIAL_DOSEN: Dosen[] = [
  {
    id: "dos1",
    name: "Dr. Ir. H. Muhammad Halqi, M.Pd.",
    prodi: "Sistem Informasi",
    title: "Dekan & Lektor Kepala",
    position: "Dekan Fakultas Teknik",
    expertise: "Manajemen Sistem Pendidikan & Rekayasa Nilai",
    doi: "https://doi.org/10.1000/xj.2024.007",
    email: "muhammad.halqi@hamzanwadi.ac.id",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=500"
  },
  {
    id: "dos2",
    name: "Ir. Ahmad Zulhalim, M.Kom.",
    prodi: "Informatika",
    title: "Ketua Program Studi Informatika",
    position: "Kaprodi Teknik Informatika",
    expertise: "Kecerdasan Buatan & Sistem Pakar",
    doi: "https://doi.org/10.1016/j.ml.2024.03.021",
    email: "ahmad.zulhalim@hamzanwadi.ac.id",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=500"
  },
  {
    id: "dos3",
    name: "Baiq Rika Ayu Febrilia, M.T.",
    prodi: "Informatika",
    title: "Dosen Tetap & Peneliti Senior",
    position: "Sekretaris Program Studi",
    expertise: "Keamanan Siber & Jaringan Komputer",
    doi: "https://doi.org/10.1109/iotsec.2024.77112",
    email: "rika.ayu@hamzanwadi.ac.id",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=500"
  },
  {
    id: "dos4",
    name: "Ir. Khairul Hadi, M.Eng.",
    prodi: "Teknik Komputer",
    title: "Dosen Tetap & Kepala Lab Sistem Tertanam",
    position: "Kepala Laboratorium Robotika",
    expertise: "Mikrokontroler & Internet of Things (IoT)",
    doi: "https://doi.org/10.1109/rob.2024.12890",
    email: "khairul.hadi@hamzanwadi.ac.id",
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=500"
  },
  {
    id: "dos5",
    name: "Nurul Hidayah, S.T., M.T.",
    prodi: "Teknik Lingkungan",
    title: "Dosen Tetap",
    position: "Dosen Teknik Lingkungan",
    expertise: "Pengelolaan Sumber Daya Air & Lingkungan",
    doi: "https://doi.org/10.4236/jwarp.2024.1605",
    email: "nurul.hidayah@hamzanwadi.ac.id",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=500"
  }
]

export const INITIAL_UKM: UKM[] = [
  {
    id: "ukm1",
    name: "Himpunan Mahasiswa Informatika (HMIF)",
    description: "Wadah pemersatu, kreativitas, dan pengembangan potensi akademik maupun soft skills mahasiswa Informatika.",
    activities: "Malam Keakraban, Informatics Competition (INFEST), Workshop Pemrograman Web, Bakti Sosial IT.",
    contact: "Instagram: @hmif_hamzanwadi",
    logo: "💻"
  },
  {
    id: "ukm2",
    name: "Engineering Robotics Club (ERC)",
    description: "Komunitas inovasi perancangan robot, sistem mikro, dan persiapan partisipasi Kontes Robot Indonesia (KRI).",
    activities: "Latihan mingguan Arduino & ROS, Pembuatan robot penyelamat, Workshop PCB Design, Eksibisi Teknologi.",
    contact: "Instagram: @erc.hamzanwadi",
    logo: "🤖"
  },
  {
    id: "ukm3",
    name: "Tech-Art & Media Community",
    description: "Mewadahi mahasiswa teknik dengan minat dalam UI/UX design, videografi, podcast teknologi, dan media digital.",
    activities: "UI/UX Design Challenge, Pelatihan After Effects, Podcast \"Obrolan Teknik\", Liputan Kegiatan Fakultas.",
    contact: "Email: techart@hamzanwadi.ac.id",
    logo: "🎨"
  }
]

export const INITIAL_EVENTS: Event[] = [
  {
    id: "evt1",
    title: "Seminar Nasional Teknologi & Transformasi Digital (SNTTD 2026)",
    slug: "seminar-nasional-teknologi-transformasi-digital-snttd-2026",
    status: "Akan Datang",
    date: "25 Agustus 2026",
    dateTime: "2026-08-25T00:00:00.000Z",
    time: "08:00 - 13:00 WITA",
    location: "Auditorium Utama Universitas Hamzanwadi",
    description: "Seminar akbar tahunan yang mengundang para ahli industri IT dan akademisi nasional untuk membahas revolusi Generative AI di Indonesia.",
    details: "Acara ini terbuka untuk umum dan seluruh civitas akademika. Pembicara utama mencakup praktisi industri dari startup unicorn Indonesia dan peneliti AI dari luar negeri. Setiap peserta akan mendapatkan sertifikat elektronik bernilai SKPI dan akses materi pembelajaran eksklusif.",
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=1000"
  },
  {
    id: "evt2",
    title: "Workshop IoT Terapan: Menuju Smart Agriculture di NTB",
    slug: "workshop-iot-terapan-menuju-smart-agriculture-di-ntb",
    status: "Sedang Berlangsung",
    date: "17 Juli 2026",
    dateTime: "2026-07-17T00:00:00.000Z",
    time: "09:00 - 16:00 WITA",
    location: "Laboratorium Sistem Tertanam",
    description: "Pelatihan pembuatan perangkat monitoring kelembaban tanah dan otomasi penyiraman berbasis mikrokontroler NodeMCU.",
    details: "Peserta diajarkan dari dasar membaca sensor hingga mengirimkan data real-time ke web dashboard menggunakan protokol MQTT. Sangat cocok bagi mahasiswa yang ingin menyelesaikan tugas akhir dengan fokus IoT pertanian.",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=1000"
  },
  {
    id: "evt3",
    title: "Hackathon Internal Fakultas Teknik: Solusi untuk Desa",
    slug: "hackathon-internal-fakultas-teknik-solusi-untuk-desa",
    status: "Selesai",
    date: "10 Mei 2026",
    dateTime: "2026-05-10T00:00:00.000Z",
    time: "08:00 - selesai",
    location: "Gedung Rektorat Lt. 3",
    description: "Kompetisi coding intensif selama 24 jam untuk merancang aplikasi pemecah masalah pelayanan administrasi desa.",
    details: "Diikuti oleh 15 tim mahasiswa lintas angkatan. Juara pertama mendapatkan pendanaan realisasi aplikasi senilai 10 juta rupiah dan bimbingan eksklusif inkubator universitas.",
    image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&q=80&w=1000"
  }
]

export const INITIAL_NEWS: News[] = [
  {
    id: "nws1",
    title: "Tim Robotika Universitas Hamzanwadi Meraih Juara Harapan 1 di KRI 2026",
    slug: "tim-robotika-universitas-hamzanwadi-meraih-juara-harapan-1-di-kri-2026",
    date: "12 Juli 2026",
    excerpt: "Setelah perjuangan intensif selama 3 hari di kompetisi robot bergengsi tingkat nasional, tim robotika berhasil mengukir prestasi gemilang.",
    content: "Prestasi gemilang diraih oleh tim Robotika Fakultas Teknik Universitas Hamzanwadi di ajang tahunan Kontes Robot Indonesia (KRI) wilayah timur tahun 2026. Menampilkan robot berdesain otonom dengan kestabilan tinggi, tim sukses mengalahkan perwakilan perguruan tinggi tangguh lainnya.\n\nDekan Fakultas Teknik menyampaikan apresiasi yang setinggi-tingginya kepada tim mahasiswa dan dosen pembimbing atas dedikasi tanpa henti selama 6 bulan terakhir dalam fase riset dan trial-error. Hal ini membuktikan bahwa mahasiswa teknik daerah mampu bersaing di panggung inovasi teknologi tingkat nasional.",
    image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&q=80&w=1000"
  },
  {
    id: "nws2",
    title: "Fakultas Teknik Jalin Kerja Sama Internasional untuk Program Magang Jerman (Inbound)",
    slug: "fakultas-teknik-jalin-kerja-sama-internasional-untuk-program-magang-jerman-inbound",
    date: "28 Juni 2026",
    excerpt: "Melalui program kemitraan internasional baru, mahasiswa berkesempatan melakukan riset magang industri di pusat teknologi Eropa.",
    content: "Kabar gembira datang untuk seluruh mahasiswa Fakultas Teknik Universitas Hamzanwadi. Pimpinan fakultas secara resmi menandatangani Nota Kesepahaman (MoU) dengan konsorsium industri teknik terapan di Munich, Jerman.\n\nMelalui kerja sama ini, mahasiswa tingkat akhir yang lolos seleksi berkas, nilai akademik, dan wawancara bahasa asing akan diberangkatkan untuk menjalani magang kerja industri terapan selama satu semester penuh. Program ini didesain agar langsung diakui sebagai konversi SKS mata kuliah magang di program studi masing-masing.",
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=1000"
  },
  {
    id: "nws3",
    title: "Peresmian Cloud Computing Lab: Kolaborasi FT Hamzanwadi dan Google Cloud",
    slug: "peresmian-cloud-computing-lab-kolaborasi-ft-hamzanwadi-dan-google-cloud",
    date: "15 Mei 2026",
    excerpt: "Peresmian ruang praktikum dan laboratorium cloud computing baru dengan sertifikasi kurikulum global terlengkap.",
    content: "Fakultas Teknik Universitas Hamzanwadi terus melakukan akselerasi digital demi mencetak talenta unggul yang relevan dengan kebutuhan industri masa kini. Hari ini secara resmi diresmikan Cloud Computing Lab yang didukung penuh oleh Google Cloud Platform (GCP).\n\nLab ini akan menjadi tempat pelatihan khusus materi arsitektur cloud, serverless engineering, dan deployment big data. Kurikulum yang diajarkan juga akan diadaptasi langsung dari sertifikasi Associate Cloud Engineer Google.",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=1000"
  }
]

export const INITIAL_FAQS: FAQ[] = [
  {
    id: "faq1",
    question: "Bagaimana prosedur pendaftaran mahasiswa baru di Fakultas Teknik?",
    answer: "Pendaftaran dapat dilakukan secara daring melalui portal resmi PMB Universitas Hamzanwadi di pmb.hamzanwadi.ac.id dengan memilih rumpun program studi di bawah Fakultas Teknik, seperti Teknik Informatika."
  },
  {
    id: "faq2",
    question: "Apakah program studi di Fakultas Teknik sudah terakreditasi?",
    answer: "Ya, seluruh program studi di Fakultas Teknik Universitas Hamzanwadi telah terakreditasi secara resmi oleh BAN-PT & LAM-INFOKOM dengan peringkat yang sangat baik serta terus ditingkatkan menuju standar internasional."
  },
  {
    id: "faq3",
    question: "Apakah tersedia program beasiswa untuk mahasiswa berprestasi atau kurang mampu?",
    answer: "Tersedia berbagai pilihan beasiswa unggulan, seperti KIP-Kuliah, Beasiswa Prestasi Pemerintah Daerah NTB, Beasiswa Yayasan Hamzanwadi, serta bantuan UKT dari instansi mitra industri."
  },
  {
    id: "faq4",
    question: "Bagaimana mahasiswa teknik mendapatkan lisensi software akademik?",
    answer: "Fakultas bekerjasama dengan penyedia ekosistem IT global sehingga mahasiswa aktif berhak mendapatkan akun email akademik (@hamzanwadi.ac.id) yang bisa digunakan untuk klaim lisensi Windows gratis, GitHub Student Developer Pack, Google Cloud, dan Office 365."
  }
]

export const INITIAL_STRUKTUR: Struktur[] = [
  { id: "st1", parentId: null, role: "Dekan Fakultas Teknik", name: "Dr. Ir. H. Muhammad Halqi, M.Pd.", details: "Penanggung jawab utama seluruh kebijakan akademik & manajerial FT." },
  { id: "st2", parentId: "st1", role: "Wakil Dekan Bidang Akademik & Keuangan", name: "Baiq Rika Ayu Febrilia, M.T.", details: "Mengoordinasikan perancangan kurikulum & pengawasan anggaran operasional." },
  { id: "st3", parentId: "st1", role: "Wakil Dekan Bidang Kemahasiswaan & Kerjasama", name: "Ir. Khairul Hadi, M.Eng.", details: "Menangani kemitraan industri, kegiatan ormawa/UKM, serta prestasi mahasiswa." },
  { id: "st6", parentId: "st1", role: "Wakil Dekan Bidang Riset & Pengabdian Masyarakat", name: "Dr. Siti Rahayu, S.T., M.T.", details: "Mengelola program riset, publikasi ilmiah, dan pengabdian kepada masyarakat." },
  { id: "st7", parentId: "st1", role: "Wakil Dekan Bidang Perencanaan, SDM & Sarana", name: "Lalu Muhamad Syamsir, S.T., M.Eng.", details: "Menyusun perencanaan program, pengelolaan SDM, dan sarana prasarana." },
  { id: "st4", parentId: "st2", role: "Ketua Program Studi Informatika", name: "Ir. Ahmad Zulhalim, M.Kom.", details: "Mengepalai kurikulum, dosen pengampu, & penjaminan mutu program studi IT." },
  { id: "st5", parentId: "st2", role: "Ketua Program Studi Teknik Industri (Rencana)", name: "Siti Rohana, M.T.", details: "Persiapan pengembangan kurikulum rekayasa manufaktur & optimasi sistem." }
]

export const INITIAL_MESSAGES: Message[] = [
  {
    id: "msg1",
    senderName: "Andi Wijaya",
    senderEmail: "andi.wijaya@gmail.com",
    senderPhone: "081234567890",
    subject: "Pertanyaan Alur Transfer Kuliah",
    message: "Saya merupakan mahasiswa pindahan dari politeknik di Bali, ingin bertanya apakah skema konversi mata kuliah program studi Teknik Informatika di Hamzanwadi terbuka untuk semester ganjil esok? Terima kasih.",
    date: "17 Juli 2026",
    isRead: false
  }
]
