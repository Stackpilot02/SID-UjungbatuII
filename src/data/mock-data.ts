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

export const news: Array<{
  id: string;
  title: string;
  slug: string;
  category: string;
  excerpt: string;
  content: string;
  coverImageUrl: string;
  status: string;
  authorId: string;
  publishedAt: string;
  createdAt: string;
}> = [
  {
    id: "1", title: "Kegiatan Gotong Royong Bersihkan Jalan Desa",
    slug: "gotong-royong-bersihkan-jalan", category: "berita",
    excerpt: "Warga Desa Ujungbatu II bergotong royong membersihkan jalan utama desa menjelang musim panen.",
    content: "Pada hari Minggu, 20 Juli 2026, warga Desa Ujungbatu II melaksanakan kegiatan gotong royong membersihkan jalan utama desa. Kegiatan ini dihadiri oleh Kepala Desa, perangkat desa, serta warga dari kedua dusun. Jalur sepanjang 3 kilometer berhasil dibersihkan dari rumput liar dan sampah. Kegiatan ini merupakan agenda rutin yang dilakukan setiap bulan.",
    coverImageUrl: "/hero-desa.png", status: "published", authorId: "1",
    publishedAt: "2026-07-20T10:00:00Z", createdAt: "2026-07-20T08:00:00Z",
  },
  {
    id: "2", title: "Sosialisasi Program Bantuan Langsung Tunai (BLT)",
    slug: "sosialisasi-blt", category: "pengumuman",
    excerpt: "Pemerintah Desa mengadakan sosialisasi terkait penyaluran BLT Dana Desa tahun 2026.",
    content: "Pemerintah Desa Ujungbatu II mengadakan sosialisasi Program Bantuan Langsung Tunai (BLT) yang bersumber dari Dana Desa Tahun Anggaran 2026. Kegiatan berlangsung di Balai Desa dan dihadiri oleh 50 Keluarga Penerima Manfaat (KPM). Besaran BLT yang disalurkan sebesar Rp300.000 per bulan per KPM.",
    coverImageUrl: "/hero-desa.png", status: "published", authorId: "1",
    publishedAt: "2026-07-15T09:00:00Z", createdAt: "2026-07-14T10:00:00Z",
  },
  {
    id: "3", title: "Pembagian Bibit Karet untuk Petani Desa",
    slug: "pembagian-bibit-karet", category: "berita",
    excerpt: "Dinas Pertanian menyalurkan bantuan bibit karet unggul kepada kelompok tani di Desa Ujungbatu II.",
    content: "Sebanyak 5.000 bibit karet unggul dibagikan kepada 3 kelompok tani di Desa Ujungbatu II. Program ini merupakan kerjasama antara Dinas Pertanian Kabupaten Padang Lawas dengan Pemerintah Desa. Diharapkan bantuan ini dapat meningkatkan produktivitas perkebunan karet warga.",
    coverImageUrl: "/hero-desa.png", status: "published", authorId: "2",
    publishedAt: "2026-07-10T08:00:00Z", createdAt: "2026-07-09T08:00:00Z",
  },
  {
    id: "4", title: "Peringatan HUT RI ke-81 Tingkat Desa",
    slug: "hut-ri-81", category: "pengumuman",
    excerpt: "Rangkaian acara peringatan HUT RI ke-81 akan dilaksanakan pada 17 Agustus 2026 di lapangan desa.",
    content: "Dalam rangka memperingati Hari Kemerdekaan Republik Indonesia ke-81, Pemerintah Desa Ujungbatu II akan mengadakan berbagai kegiatan, antara lain: upacara bendera, lomba-lomba tradisional, jalan sehat, dan malam tasyakuran. Diharapkan seluruh warga dapat berpartisipasi memeriahkan acara.",
    coverImageUrl: "/hero-desa.png", status: "published", authorId: "1",
    publishedAt: "2026-08-01T08:00:00Z", createdAt: "2026-07-30T08:00:00Z",
  },
];

// TODO: konfirmasi — penyimpanan berita sementara di memori (mock).
// Integrasi final menyimpan ke tabel news di Supabase (schema.sql §2.5).
export function addNews(item: Omit<(typeof news)[number], 'id' | 'createdAt'>) {
  const record = {
    ...item,
    id: 'mock-' + Date.now(),
    createdAt: new Date().toISOString(),
  };
  news.push(record);
  return record;
}

// TODO: konfirmasi — foto galeri masih placeholder (aset lokal /public/gallery).
// Ganti dengan foto asli kegiatan desa saat tersedia; integrasi final
// menyimpan ke tabel gallery_items di Supabase (schema.md §3.6).
export const galleryItems = [
  { id: "1", title: "Gotong Royong Jalan Desa", description: "Warga bergotong royong membersihkan jalan desa", mediaUrl: "/gallery/gotong-royong.jpg", mediaType: "image", eventDate: "2026-07-20" },
  { id: "2", title: "Sosialisasi BLT", description: "Kegiatan sosialisasi BLT di Balai Desa", mediaUrl: "/gallery/sosialisasi-blt.jpg", mediaType: "image", eventDate: "2026-07-15" },
  { id: "3", title: "Pembagian Bibit Karet", description: "Pembagian bibit karet kepada kelompok tani", mediaUrl: "/gallery/pembagian-bibit.jpg", mediaType: "image", eventDate: "2026-07-10" },
  { id: "4", title: "Senam Sehat", description: "Kegiatan senam sehat bersama warga", mediaUrl: "/gallery/senam-sehat.jpg", mediaType: "image", eventDate: "2026-07-05" },
  { id: "5", title: "Musyawarah Desa", description: "Musyawarah perencanaan pembangunan desa", mediaUrl: "/gallery/musyawarah-desa.jpg", mediaType: "image", eventDate: "2026-06-28" },
  { id: "6", title: "Pengajian Rutin", description: "Pengajian rutin ibu-ibu Desa Ujungbatu II", mediaUrl: "/gallery/pengajian-rutin.jpg", mediaType: "image", eventDate: "2026-06-25" },
];

export const complaintCategories = [
  { id: "1", name: "Infrastruktur", defaultSlaDays: 7 },
  { id: "2", name: "Kebersihan", defaultSlaDays: 5 },
  { id: "3", name: "Keamanan", defaultSlaDays: 3 },
  { id: "4", name: "Lainnya", defaultSlaDays: 10 },
];

export const complaints: Array<{
  id: string;
  categoryId: string;
  description: string;
  location: string;
  status: string;
  reporterName: string;
  createdAt: string;
}> = [
  { id: "c1", categoryId: "1", description: "Jalan menuju kebun warga rusak parah setelah hujan.", location: "Dusun I", status: "pending", reporterName: "Warga", createdAt: "2026-07-28T09:00:00Z" },
  { id: "c2", categoryId: "2", description: "Saluran air tersumbat sampah di depan balai desa.", location: "Dusun II", status: "processed", reporterName: "Warga", createdAt: "2026-07-25T14:30:00Z" },
];

// TODO: konfirmasi — penyimpanan pengaduan sementara di memori (mock).
// Integrasi final menyimpan ke tabel complaints di Supabase (schema.md §3.8).
export function addComplaint(item: Omit<(typeof complaints)[number], 'id' | 'status' | 'createdAt'>) {
  const record = { ...item, id: 'mock-' + Date.now(), status: 'pending', createdAt: new Date().toISOString() };
  complaints.push(record);
  return record;
}

export const activityLogs: Array<{
  id: string;
  action: string;
  tableName: string;
  performedBy: string;
  createdAt: string;
}> = [
  { id: "l1", action: "CREATE", tableName: "letter_requests", performedBy: "Sistem", createdAt: "2026-07-28T10:00:00Z" },
  { id: "l2", action: "CREATE", tableName: "residents", performedBy: "admin", createdAt: "2026-07-27T08:30:00Z" },
];

// TODO: konfirmasi — penyimpanan log aktivitas sementara di memori (mock).
// Integrasi final menyimpan ke tabel activity_logs di Supabase (schema.md §3.14).
export function addActivityLog(item: Omit<(typeof activityLogs)[number], 'id' | 'createdAt'>) {
  const record = { ...item, id: 'mock-' + Date.now(), createdAt: new Date().toISOString() };
  activityLogs.push(record);
  return record;
}

export const archivedLetters: Array<{
  id: string;
  letterNumber: string;
  letterTypeId: string;
  issuedAt: string;
}> = [
  { id: "a1", letterNumber: "001/SKT/UB-II/07/2026", letterTypeId: "1", issuedAt: "2026-07-20T10:00:00Z" },
  { id: "a2", letterNumber: "002/SKK/UB-II/07/2026", letterTypeId: "2", issuedAt: "2026-07-22T11:00:00Z" },
];

// TODO: konfirmasi — penyimpanan arsip surat sementara di memori (mock).
// Integrasi final menyimpan ke tabel letters di Supabase (schema.md §3.12).
export function addArchivedLetter(item: Omit<(typeof archivedLetters)[number], 'id'>) {
  const record = { ...item, id: 'mock-' + Date.now() };
  archivedLetters.push(record);
  return record;
}

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

export const users: Array<{
  id: string;
  fullName: string;
  email: string;
  role: string;
}> = [
  { id: '1', fullName: 'Muhammad Yusuf Lubis', email: 'kades@ujungbatu2.desa.id', role: 'kepala_desa' },
  { id: '2', fullName: 'Ahmad Siregar', email: 'sekdes@ujungbatu2.desa.id', role: 'admin' },
  { id: '3', fullName: 'Fatimah Harahap', email: 'fatimah@ujungbatu2.desa.id', role: 'operator' },
];

// TODO: konfirmasi — penyimpanan pengguna sementara di memori (mock).
// Integrasi final menyimpan ke tabel profiles di Supabase (schema.md §3.1).
export function addUser(item: Omit<(typeof users)[number], 'id'>) {
  const record = { ...item, id: 'mock-' + Date.now() };
  users.push(record);
  return record;
}

export const letterRequests: Array<{
  id: string;
  requesterName: string;
  requesterNik: string;
  letterTypeId: string;
  phone: string;
  email: string;
  purpose: string;
  status: string;
  createdAt: string;
  additionalData?: Record<string, unknown>;
}> = [];

export const letterTemplates: Array<{
  id: string;
  letterTypeId: string;
  name: string;
  numberFormat: string;
  bodyTemplate: string;
  version: number;
  isActive: boolean;
  createdAt: string;
}> = [];

// TODO: konfirmasi — penyimpanan template surat sementara di memori (mock).
// Integrasi final menyimpan ke tabel letter_templates di Supabase (schema.md §3.10).
export function addLetterTemplate(
  item: Omit<(typeof letterTemplates)[number], 'id' | 'version' | 'createdAt'>
) {
  const record = {
    ...item,
    id: 'mock-' + Date.now(),
    version: 1,
    createdAt: new Date().toISOString(),
  };
  letterTemplates.push(record);
  return record;
}

// TODO: konfirmasi — penyimpanan pengajuan surat sementara di memori (mock).
// Integrasi final menyimpan ke tabel letter_requests di Supabase (schema.md §3.11).
export function addLetterRequest(
  item: Omit<(typeof letterRequests)[number], 'id' | 'status' | 'createdAt'>
) {
  const record = {
    ...item,
    id: 'LR-' + Date.now(),
    status: 'pending',
    createdAt: new Date().toISOString(),
  };
  letterRequests.push(record);
  return record;
}

export const residents: Array<{
  id: string;
  nik: string;
  kkNumber: string;
  fullName: string;
  birthPlace: string;
  birthDate: string;
  gender: string;
  occupation: string;
  religion: string;
  maritalStatus: string;
  familyRole: string;
}> = [
  { id: "1", nik: "1209123456789001", kkNumber: "1209123456789001", fullName: "Muhammad Yusuf Lubis", birthPlace: "Ujungbatu", birthDate: "1975-03-15", gender: "Laki-laki", occupation: "Petani", religion: "Islam", maritalStatus: "Kawin", familyRole: "Kepala Keluarga" },
  { id: "2", nik: "1209123456789002", kkNumber: "1209123456789001", fullName: "Siti Rahma Dalimunthe", birthPlace: "Padang Lawas", birthDate: "1980-07-22", gender: "Perempuan", occupation: "Ibu Rumah Tangga", religion: "Islam", maritalStatus: "Kawin", familyRole: "Anggota" },
  { id: "3", nik: "1209123456789003", kkNumber: "1209123456789002", fullName: "Ahmad Siregar", birthPlace: "Hutaraja", birthDate: "1982-11-08", gender: "Laki-laki", occupation: "Petani", religion: "Islam", maritalStatus: "Kawin", familyRole: "Kepala Keluarga" },
  { id: "4", nik: "1209123456789004", kkNumber: "1209123456789002", fullName: "Fatimah Harahap", birthPlace: "Padang Lawas", birthDate: "1985-05-30", gender: "Perempuan", occupation: "Pedagang", religion: "Islam", maritalStatus: "Kawin", familyRole: "Anggota" },
  { id: "5", nik: "1209123456789005", kkNumber: "1209123456789003", fullName: "Abdul Hakim Nasution", birthPlace: "Gunungtua", birthDate: "1990-01-20", gender: "Laki-laki", occupation: "Guru", religion: "Islam", maritalStatus: "Kawin", familyRole: "Kepala Keluarga" },
];

// TODO: konfirmasi — penyimpanan penduduk sementara di memori (mock).
// Integrasi final menyimpan ke tabel residents di Supabase (schema.md §3.2).
export function addResident(item: Omit<(typeof residents)[number], 'id'>) {
  const record = { ...item, id: 'mock-' + Date.now() };
  residents.push(record);
  return record;
}

export const stats = {
  totalPopulation: 1250,
  maleCount: 620,
  femaleCount: 630,
  familyCardCount: 380,
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

// TODO: konfirmasi — statistik kependudukan sementara di memori (mock).
// Integrasi final menyimpan ke tabel stats/village_stats di Supabase.
export type StatsData = typeof stats;

// TODO: konfirmasi — pembaruan statistik mengubah objek stats secara mutatif
// agar konsisten dengan pola mock store lain (liat addResident, addNews, dst).
export function updateStats(next: StatsData) {
  stats.totalPopulation = next.totalPopulation;
  stats.maleCount = next.maleCount;
  stats.femaleCount = next.femaleCount;
  stats.familyCardCount = next.familyCardCount;
  stats.occupationStats = next.occupationStats.map((o) => ({ ...o }));
  stats.religionStats = next.religionStats.map((r) => ({ ...r }));
  return stats;
}
