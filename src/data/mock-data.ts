export const villageProfile = {
  villageName: "Desa Ujungbatu II",
  district: "Kec. Hutaraja Tinggi",
  regency: "Kab. Padang Lawas",
  province: "Sumatera Utara",
  history: "Desa Ujungbatu II berdiri sejak tahun 1950-an sebagai bagian dari pemekaran wilayah Kecamatan Hutaraja Tinggi. Mayoritas penduduk bekerja sebagai petani karet dan kelapa sawit. Desa ini dikenal dengan semangat gotong royong yang kuat dan kearifan lokal Batak Angkola yang masih terjaga hingga kini.",
  vision: "Terwujudnya Desa Ujungbatu II yang maju, mandiri, dan sejahtera berdasarkan gotong royong dan nilai-nilai keagamaan.",
  mission: [
    "Meningkatkan kualitas pelayanan publik kepada masyarakat",
    "Mengembangkan potensi desa di bidang pertanian dan perkebunan",
    "Memperkuat kelembagaan desa yang transparan dan akuntabel",
    "Meningkatkan partisipasi masyarakat dalam pembangunan desa",
    "Melestarikan budaya dan kearifan lokal Batak Angkola",
  ],
  mapLat: 1.234,
  mapLng: 99.567,
  address: "Jl. Poros Desa Ujungbatu II, Kec. Hutaraja Tinggi, Kab. Padang Lawas, Sumatera Utara",
  phone: "(0623) 1234567",
  email: "desa.ujungbatu2@gmail.com",
  workingHours: "Senin - Jumat, 08:00 - 16:00 WIB",
};

export const organizationStructure = [
  { id: "1", name: "Muhammad Yusuf Lubis", position: "Kepala Desa", orderIndex: 1, photoUrl: "" },
  { id: "2", name: "Ahmad Siregar", position: "Sekretaris Desa", orderIndex: 2, photoUrl: "" },
  { id: "3", name: "Fatimah Harahap", position: "Kaur Keuangan", orderIndex: 3, photoUrl: "" },
  { id: "4", name: "Abdul Hakim Nasution", position: "Kaur Perencanaan", orderIndex: 4, photoUrl: "" },
  { id: "5", name: "Siti Rahma Dalimunthe", position: "Kasi Kesejahteraan", orderIndex: 5, photoUrl: "" },
  { id: "6", name: "Muhammad Rizky Pohan", position: "Kasi Pelayanan", orderIndex: 6, photoUrl: "" },
  { id: "7", name: "Hendra Gunawan Hasibuan", position: "Kepala Dusun I", orderIndex: 7, photoUrl: "" },
  { id: "8", name: "Syamsul Bahri Siregar", position: "Kepala Dusun II", orderIndex: 8, photoUrl: "" },
];

export const news = [
  {
    id: "1", title: "Kegiatan Gotong Royong Bersihkan Jalan Desa",
    slug: "gotong-royong-bersihkan-jalan", category: "berita",
    excerpt: "Warga Desa Ujungbatu II bergotong royong membersihkan jalan utama desa menjelang musim panen.",
    content: "Pada hari Minggu, 20 Juli 2026, warga Desa Ujungbatu II melaksanakan kegiatan gotong royong membersihkan jalan utama desa. Kegiatan ini dihadiri oleh Kepala Desa, perangkat desa, serta warga dari kedua dusun. Jalur sepanjang 3 kilometer berhasil dibersihkan dari rumput liar dan sampah. Kegiatan ini merupakan agenda rutin yang dilakukan setiap bulan.",
    coverImageUrl: "", status: "published", authorId: "1",
    publishedAt: "2026-07-20T10:00:00Z", createdAt: "2026-07-20T08:00:00Z",
  },
  {
    id: "2", title: "Sosialisasi Program Bantuan Langsung Tunai (BLT)",
    slug: "sosialisasi-blt", category: "pengumuman",
    excerpt: "Pemerintah Desa mengadakan sosialisasi terkait penyaluran BLT Dana Desa tahun 2026.",
    content: "Pemerintah Desa Ujungbatu II mengadakan sosialisasi Program Bantuan Langsung Tunai (BLT) yang bersumber dari Dana Desa Tahun Anggaran 2026. Kegiatan berlangsung di Balai Desa dan dihadiri oleh 50 Keluarga Penerima Manfaat (KPM). Besaran BLT yang disalurkan sebesar Rp300.000 per bulan per KPM.",
    coverImageUrl: "", status: "published", authorId: "1",
    publishedAt: "2026-07-15T09:00:00Z", createdAt: "2026-07-14T10:00:00Z",
  },
  {
    id: "3", title: "Pembagian Bibit Karet untuk Petani Desa",
    slug: "pembagian-bibit-karet", category: "berita",
    excerpt: "Dinas Pertanian menyalurkan bantuan bibit karet unggul kepada kelompok tani di Desa Ujungbatu II.",
    content: "Sebanyak 5.000 bibit karet unggul dibagikan kepada 3 kelompok tani di Desa Ujungbatu II. Program ini merupakan kerjasama antara Dinas Pertanian Kabupaten Padang Lawas dengan Pemerintah Desa. Diharapkan bantuan ini dapat meningkatkan produktivitas perkebunan karet warga.",
    coverImageUrl: "", status: "published", authorId: "2",
    publishedAt: "2026-07-10T08:00:00Z", createdAt: "2026-07-09T08:00:00Z",
  },
  {
    id: "4", title: "Peringatan HUT RI ke-81 Tingkat Desa",
    slug: "hut-ri-81", category: "pengumuman",
    excerpt: "Rangkaian acara peringatan HUT RI ke-81 akan dilaksanakan pada 17 Agustus 2026 di lapangan desa.",
    content: "Dalam rangka memperingati Hari Kemerdekaan Republik Indonesia ke-81, Pemerintah Desa Ujungbatu II akan mengadakan berbagai kegiatan, antara lain: upacara bendera, lomba-lomba tradisional, jalan sehat, dan malam tasyakuran. Diharapkan seluruh warga dapat berpartisipasi memeriahkan acara.",
    coverImageUrl: "", status: "published", authorId: "1",
    publishedAt: "2026-08-01T08:00:00Z", createdAt: "2026-07-30T08:00:00Z",
  },
];

export const galleryItems = [
  { id: "1", title: "Gotong Royong Jalan Desa", description: "Warga bergotong royong membersihkan jalan desa", mediaUrl: "", mediaType: "image", eventDate: "2026-07-20" },
  { id: "2", title: "Sosialisasi BLT", description: "Kegiatan sosialisasi BLT di Balai Desa", mediaUrl: "", mediaType: "image", eventDate: "2026-07-15" },
  { id: "3", title: "Pembagian Bibit Karet", description: "Pembagian bibit karet kepada kelompok tani", mediaUrl: "", mediaType: "image", eventDate: "2026-07-10" },
  { id: "4", title: "Senam Sehat", description: "Kegiatan senam sehat bersama warga", mediaUrl: "", mediaType: "image", eventDate: "2026-07-05" },
  { id: "5", title: "Musyawarah Desa", description: "Musyawarah perencanaan pembangunan desa", mediaUrl: "", mediaType: "image", eventDate: "2026-06-28" },
  { id: "6", title: "Pengajian Rutin", description: "Pengajian rutin ibu-ibu Desa Ujungbatu II", mediaUrl: "", mediaType: "image", eventDate: "2026-06-25" },
];

export const complaintCategories = [
  { id: "1", name: "Infrastruktur", defaultSlaDays: 7 },
  { id: "2", name: "Kebersihan", defaultSlaDays: 5 },
  { id: "3", name: "Keamanan", defaultSlaDays: 3 },
  { id: "4", name: "Lainnya", defaultSlaDays: 10 },
];

export const letterTypes = [
  { id: "1", code: "SKD", name: "Surat Keterangan Domisili", requiresAttachment: false },
  { id: "2", code: "SKU", name: "Surat Keterangan Usaha", requiresAttachment: false },
  { id: "3", code: "SKTM", name: "Surat Keterangan Tidak Mampu", requiresAttachment: false },
  { id: "4", code: "PKTP", name: "Pengantar Pembuatan KTP", requiresAttachment: true },
  { id: "5", code: "PKK", name: "Pengantar Pembuatan KK", requiresAttachment: true },
  { id: "6", code: "PNK", name: "Pengantar Nikah", requiresAttachment: true },
  { id: "7", code: "SKMT", name: "Surat Keterangan Kematian", requiresAttachment: true },
  { id: "8", code: "SKPD", name: "Surat Keterangan Pindah", requiresAttachment: false },
];

export const residents = [
  { id: "1", nik: "1209123456789001", kkNumber: "1209123456789001", fullName: "Muhammad Yusuf Lubis", birthPlace: "Ujungbatu", birthDate: "1975-03-15", gender: "Laki-laki", dusun: "Dusun I", occupation: "Petani", religion: "Islam", maritalStatus: "Kawin", familyRole: "Kepala Keluarga" },
  { id: "2", nik: "1209123456789002", kkNumber: "1209123456789001", fullName: "Siti Rahma Dalimunthe", birthPlace: "Padang Lawas", birthDate: "1980-07-22", gender: "Perempuan", dusun: "Dusun I", occupation: "Ibu Rumah Tangga", religion: "Islam", maritalStatus: "Kawin", familyRole: "Anggota" },
  { id: "3", nik: "1209123456789003", kkNumber: "1209123456789002", fullName: "Ahmad Siregar", birthPlace: "Hutaraja", birthDate: "1982-11-08", gender: "Laki-laki", dusun: "Dusun II", occupation: "Petani", religion: "Islam", maritalStatus: "Kawin", familyRole: "Kepala Keluarga" },
  { id: "4", nik: "1209123456789004", kkNumber: "1209123456789002", fullName: "Fatimah Harahap", birthPlace: "Padang Lawas", birthDate: "1985-05-30", gender: "Perempuan", dusun: "Dusun II", occupation: "Pedagang", religion: "Islam", maritalStatus: "Kawin", familyRole: "Anggota" },
  { id: "5", nik: "1209123456789005", kkNumber: "1209123456789003", fullName: "Abdul Hakim Nasution", birthPlace: "Gunungtua", birthDate: "1990-01-20", gender: "Laki-laki", dusun: "Dusun I", occupation: "Guru", religion: "Islam", maritalStatus: "Kawin", familyRole: "Kepala Keluarga" },
];

export const stats = {
  totalPopulation: 1250,
  maleCount: 620,
  femaleCount: 630,
  familyCardCount: 380,
  dusunStats: [
    { name: "Dusun I", population: 650, families: 200 },
    { name: "Dusun II", population: 600, families: 180 },
  ],
  occupationStats: [
    { name: "Petani", count: 450 },
    { name: "Pedagang", count: 120 },
    { name: "Guru", count: 35 },
    { name: "Pegawai Negeri", count: 25 },
    { name: "Buruh", count: 200 },
    { name: "Lainnya", count: 420 },
  ],
  religionStats: [
    { name: "Islam", count: 1240 },
    { name: "Kristen", count: 10 },
  ],
};
