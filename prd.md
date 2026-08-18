# Product Requirements Document (PRD)
# Sistem Informasi Desa (SID) — Desa Ujungbatu II

**Versi:** 1.2
**Tanggal:** 24 Juli 2026
**Status:** Final — Implementasi Tahap 3 (Integrasi & Penyempurnaan) sedang berjalan

> Dokumen ini disesuaikan dengan kondisi Desa Ujungbatu II, Kec. Hutaraja Tinggi, Kab. Padang Lawas, Sumatera Utara. Dokumen pendamping: `architecture.md` (arsitektur teknis), `design.md` (sistem desain & UI), `schema.md` (skema database), `rules.md` (aturan bisnis & validasi).

**Riwayat Perubahan**
| Versi | Tanggal | Perubahan |
|---|---|---|
| 1.0 | — | Draf awal |
| 1.1 | 8 Jul 2026 | Penyesuaian ke Desa Ujungbatu II, penambahan fitur generate surat otomatis |
| 1.2 | 24 Jul 2026 | Penambahan NFR (retensi data, backup/DR, strategi pengujian), penajaman aturan notifikasi & SLA, pemisahan detail teknis/desain/skema ke dokumen terpisah, pembaruan status implementasi, penyelesaian sebagian pertanyaan terbuka |

---

## 1. Ringkasan Eksekutif

Sistem Informasi Desa (SID) adalah platform web yang meningkatkan transparansi, efisiensi pelayanan publik, dan keterbukaan informasi antara pemerintah Desa Ujungbatu II dan warganya. Sistem menyediakan profil desa, layanan surat-menyurat online dengan **generate surat otomatis**, data kependudukan terpusat, serta kanal pengaduan dan aspirasi masyarakat — dibangun di atas tumpukan teknologi serverless agar biaya operasional dan kebutuhan pemeliharaan tetap rendah bagi desa.

## 2. Latar Belakang

- Data kependudukan dan administrasi masih dikelola manual, menyebabkan proses lambat dan rawan kesalahan.
- Perangkat desa menghabiskan banyak waktu mengetik ulang surat berpola sama (surat pengantar, keterangan, dsb) yang hanya berbeda data warga.
- Warga kesulitan mengakses informasi desa (pengumuman, status pengajuan surat) secara real-time.
- Kebutuhan kanal komunikasi dua arah antara desa dan warga semakin tinggi.
- Tidak ada jejak audit yang konsisten atas surat yang diterbitkan maupun perubahan data kependudukan.

## 3. Tujuan (Goals)

1. Mempermudah warga mengakses layanan administrasi desa (surat pengantar, keterangan, dll) secara online.
2. **Mempercepat dan menyederhanakan pekerjaan perangkat desa** dalam membuat surat melalui fitur generate surat otomatis berbasis template.
3. Menyediakan kanal komunikasi dua arah (pengumuman resmi & pengaduan warga) dengan status yang dapat dilacak.
4. Memusatkan data kependudukan dan administrasi dalam satu sistem dengan kontrol akses yang jelas.
5. Mengurangi kesalahan penulisan/administrasi surat melalui data terstruktur dan konsisten.
6. Menjaga jejak audit yang lengkap atas setiap surat terbit dan perubahan data sensitif.

## 4. Target Pengguna

| Persona | Deskripsi | Kebutuhan Utama |
|---|---|---|
| Warga Desa | Penduduk yang butuh layanan administrasi & informasi | Ajukan surat online, lihat pengumuman, ajukan pengaduan, lacak status |
| Perangkat Desa (Operator) | Kaur/kasi pelaksana harian | Proses surat cepat, input data warga terbatas |
| Perangkat Desa (Admin) | Sekretaris desa / operator senior | Kelola template surat, kelola data warga penuh, kelola pengguna |
| Kepala Desa/Pimpinan | Pengambil keputusan | Dashboard ringkasan, laporan pelayanan & statistik, lihat (read-only) proses surat |
| Masyarakat Umum | Non-warga yang mencari info desa | Info umum desa, pengumuman publik, kontak |
| Pemerintah Kecamatan/Kabupaten (opsional, Fase 3) | Pengawasan & pelaporan | Akses laporan agregat |

## 5. Ruang Lingkup (Scope)

### 5.1 Termasuk (In-Scope) — Fase 1 (MVP)
- Profil desa (visi misi, struktur organisasi, sejarah, peta wilayah)
- Berita & pengumuman
- Layanan surat online (pengajuan → verifikasi → generate surat otomatis → cetak/unduh)
- Generate surat otomatis berbasis template (auto-fill data, penomoran otomatis, cetak massal)
- Data kependudukan (dikelola admin, tidak publik penuh)
- Pengaduan/aspirasi masyarakat dengan tracking status & SLA
- Galeri foto/video kegiatan desa
- Panel admin (CMS) dengan manajemen peran (role-based access)
- Notifikasi in-app & email untuk perubahan status surat/pengaduan

### 5.2 Tidak Termasuk (Out-of-Scope) — Fase 1
- Pembayaran pajak/retribusi online (Fase 2+)
- Integrasi langsung dengan Dukcapil/NIK pusat (Fase 3)
- Aplikasi mobile native (Fase 1 fokus web responsif)
- E-voting/musyawarah digital
- Profil UMKM & potensi wisata desa (modul terpisah bila dibutuhkan)
- Transparansi anggaran/APBDes (modul terpisah bila dibutuhkan)
- Notifikasi WhatsApp/SMS (Fase 2)
- Mode offline penuh (dipertimbangkan sebagai caching terbatas, lihat §10)

## 6. Daftar Fitur & Functional Requirements

### 6.1 Modul Publik (Warga & Umum)
| Fitur | Deskripsi | Prioritas |
|---|---|---|
| Beranda | Ringkasan info desa, berita terbaru, statistik singkat | Must |
| Profil Desa | Sejarah, visi-misi, struktur organisasi, peta wilayah | Must |
| Berita & Pengumuman | Daftar & detail berita, kategori, pencarian | Must |
| Layanan Surat Online | Form pengajuan surat, tracking status, unduh dokumen PDF | Must |
| Pengaduan Masyarakat | Form pengaduan berkategori, lampiran foto, tracking status & tanggapan | Must |
| Galeri | Foto/video kegiatan desa | Should |
| Statistik Kependudukan (agregat) | Grafik penduduk per dusun/usia/pekerjaan (data teragregasi) | Should |
| Kontak & Jam Layanan | Kontak kantor desa, jam operasional, lokasi (peta) | Must |
| Pencarian Global | Pencarian lintas berita, layanan, dan halaman profil | Could |

### 6.2 Modul Admin (Perangkat Desa)
| Fitur | Deskripsi | Prioritas |
|---|---|---|
| Manajemen Konten (CMS) | Kelola berita, pengumuman, galeri, halaman profil | Must |
| Manajemen Data Kependudukan | CRUD data penduduk (NIK, KK, dsb) dengan kontrol akses ketat | Must |
| **Generate Surat Otomatis** | Template surat, auto-fill data warga, penomoran otomatis, cetak massal, arsip | **Must** |
| Manajemen Layanan Surat | Verifikasi pengajuan, setuju/tolak, kaitkan ke generate surat | Must |
| Manajemen Pengaduan | Terima, tindak lanjuti, balas, ubah status pengaduan | Must |
| Manajemen Pengguna & Hak Akses | Role: Super Admin, Admin, Operator, Kepala Desa | Must |
| Dashboard & Laporan | Statistik pelayanan, jumlah surat diproses, grafik pengaduan | Should |
| Log Aktivitas (Audit Trail) | Rekam jejak perubahan data penting & surat terbit | Should |
| Pengaturan Notifikasi | Kelola template pesan notifikasi email/in-app | Could |

### 6.3 Detail Fitur: Generate Surat Otomatis
- **Manajemen Template Surat**: kop surat, format paragraf, placeholder data, per jenis surat (lihat daftar jenis surat di `schema.md` §`letter_types`).
- **Auto-fill Data Warga**: data penduduk otomatis terisi dari database kependudukan.
- **Penomoran Surat Otomatis**: format resmi desa, increment otomatis per jenis surat per tahun, anti-duplikasi (lihat aturan penomoran di `rules.md` §3).
- **Tanda Tangan & Validasi**: QR code verifikasi keaslian surat sebagai solusi awal; tanda tangan digital berbadan hukum sebagai opsi lanjutan (lihat §16 Keputusan Terbuka).
- **Ekspor & Cetak**: PDF/Word, cetak langsung, kirim ke email warga.
- **Cetak Massal (Batch Generate)**: generate banyak surat sejenis dalam satu proses.
- **Arsip & Riwayat Surat**: pencarian, unduh ulang, cetak ulang seluruh surat terbit.

## 7. User Flow Utama (Ringkas)

**Alur Pengajuan & Generate Surat:**
1. Warga login/registrasi → pilih jenis surat → isi form & unggah dokumen pendukung
2. Sistem kirim notifikasi ke admin/operator terkait
3. Admin/operator memverifikasi data → data warga auto-fill ke template surat
4. Admin menyetujui → sistem generate surat (nomor otomatis, QR code, PDF)
5. Warga menerima notifikasi untuk unduh surat atau ambil versi fisik di kantor desa
6. Surat tersimpan otomatis di arsip untuk pencarian/cetak ulang

**Alur Pengaduan:**
1. Warga mengisi form pengaduan (kategori, deskripsi, lokasi, foto)
2. Admin/petugas terkait menerima notifikasi
3. Status: Diterima → Diproses → Selesai/Ditolak, dengan catatan tanggapan
4. Warga menerima notifikasi setiap perubahan status; SLA tindak lanjut lihat `rules.md` §5

## 8. Tech Stack (Ringkasan)

Detail lengkap arsitektur, diagram alur data, dan struktur folder ada di **`architecture.md`**. Ringkasan:

| Layer | Teknologi | Alasan Singkat |
|---|---|---|
| Frontend | Next.js (React) + Tailwind CSS | SSR/SSG, SEO publik, komponen reusable |
| Backend/API | Next.js API Routes (serverless) | Deploy sederhana, selaras dengan Vercel |
| Database | Supabase (Postgres serverless) | Auto-scaling, Auth & Storage bawaan, RLS |
| Autentikasi | Supabase Auth | RBAC untuk warga & admin |
| Penyimpanan File | Supabase Storage | Lampiran pengaduan, foto galeri, dokumen surat |
| Generate PDF | `@react-pdf/renderer` + `qrcode` | Render template ke PDF + QR verifikasi |
| Hosting | Vercel | Serverless, auto-scaling |
| Notifikasi | Resend/SendGrid (email); WhatsApp (Fase 2) | Update status surat & pengaduan |
| Monitoring | Vercel Analytics, Sentry | Deteksi bug & performa proaktif |

## 9. UI Style / Panduan Desain

Panduan desain lengkap (palet warna, tipografi, komponen, motif khas daerah) dipindahkan ke **`design.md`** agar dapat dikelola dan diperbarui terpisah dari PRD. Ringkasan arah desain: **formal namun ramah**, identitas visual khas Desa Ujungbatu II (hijau ladang + aksen tanah liat & emas, terinspirasi lanskap perkebunan Padang Lawas dan motif tenun tradisional Sumatera Utara), bukan template "biru instansi" generik — lihat `design.md` untuk detail dan rasional.

## 10. Non-Functional Requirements

| Kategori | Kebutuhan |
|---|---|
| Keamanan | Enkripsi data sensitif (NIK, KK) at-rest, RBAC berlapis, proteksi SQL injection/XSS, rate limiting API publik |
| Privasi Data | Data pribadi tidak tampil publik; hanya data agregat dipublikasikan; kepatuhan UU PDP No. 27/2022 |
| Performa | Halaman publik dimuat < 3 detik pada koneksi standar; API < 800ms p95 |
| Skalabilitas | Database serverless, auto-scaling tanpa provisioning manual |
| Aksesibilitas | Kontras warna minimal WCAG AA, ukuran tap target ≥ 44px, ukuran teks body ≥ 16px |
| Ketersediaan | Uptime target ≥ 99% |
| Kompatibilitas | Chrome, Firefox, Safari terbaru; mobile-first |
| Bahasa | Bahasa Indonesia sebagai bahasa utama |
| **Retensi & Backup Data** | Backup otomatis harian (Supabase PITR), retensi minimal 30 hari; arsip surat & data kependudukan disimpan selama masa jabatan admin berlaku + 5 tahun sesuai kearsipan desa |
| **Disaster Recovery** | RPO ≤ 24 jam, RTO ≤ 4 jam; prosedur restore didokumentasikan dan diuji setiap 6 bulan |
| **Strategi Pengujian** | Unit test untuk logika penomoran surat & RBAC; integration test untuk endpoint API kritis; UAT bersama perangkat desa sebelum go-live (lihat §17 Tahap 3.4) |
| **Konektivitas Terbatas** | Form pengajuan surat/pengaduan menyimpan draf lokal sementara (auto-save) agar input tidak hilang saat koneksi tidak stabil |
| SEO | Halaman publik (profil, berita) menggunakan meta tag & structured data dasar agar mudah ditemukan warga di pencarian |

## 11. Peran & Hak Akses (Role Matrix)

| Modul | Warga | Operator | Admin | Kepala Desa |
|---|---|---|---|---|
| Lihat Berita/Profil | ✅ | ✅ | ✅ | ✅ |
| Ajukan Surat/Pengaduan | ✅ | - | - | - |
| Proses & Generate Surat | - | ✅ | ✅ | 👁️ |
| Kelola Template Surat | - | - | ✅ | 👁️ |
| Kelola Data Penduduk | - | ✅ (terbatas) | ✅ | 👁️ |
| Kelola Pengguna | - | - | ✅ | - |
| Lihat Dashboard/Laporan | - | ✅ (terbatas) | ✅ | ✅ |
| Lihat Log Aktivitas | - | - | ✅ | 👁️ |

Detail permission per aksi dan aturan eskalasi ada di **`rules.md`** §2.

## 12. Metrik Keberhasilan (Success Metrics / KPI)

- Pengajuan surat online meningkat ≥ 50% dari metode manual dalam 6 bulan pertama
- Waktu rata-rata pembuatan surat oleh perangkat desa turun dari ~15 menit manual menjadi < 2 menit
- Waktu pemrosesan surat (pengajuan → selesai) turun dari ~3 hari menjadi < 1 hari
- ≥ 70% warga aktif (memiliki akses internet) mengetahui/menggunakan platform dalam 1 tahun
- Waktu tindak lanjut pengaduan rata-rata < 3 hari kerja (lihat SLA per kategori di `rules.md` §5)
- Tingkat kesalahan penulisan surat mendekati 0% karena auto-fill data
- Uptime sistem ≥ 99% terukur dari Vercel/Sentry

## 13. Asumsi & Batasan

- Desa memiliki koneksi internet minimal memadai di kantor desa.
- Perangkat desa membutuhkan pelatihan penggunaan sistem, khususnya pembuatan template surat.
- Data kependudukan awal perlu migrasi manual dari sistem lama sebelum auto-fill optimal.
- Anggaran pengembangan & hosting menggunakan tier gratis (Supabase Free + Vercel Hobby) pada Fase 1; evaluasi upgrade tier saat volume data/trafik bertambah.
- Tanda tangan digital berbadan hukum memerlukan kajian hukum lanjutan; QR code dipakai sebagai verifikasi awal.

## 14. Risiko & Mitigasi

| Risiko | Dampak | Mitigasi |
|---|---|---|
| Rendahnya literasi digital warga | Adopsi rendah | Pendampingan di kantor desa, panduan sederhana bergambar |
| Kebocoran data pribadi | Pelanggaran privasi, hukum | Enkripsi, RBAC ketat, audit berkala, RLS di level database |
| Template surat tidak sesuai regulasi terbaru | Surat tidak valid secara hukum | Sekretaris desa memvalidasi setiap template sebelum aktif |
| Ketergantungan pada 1 admin/operator | Layanan terhambat saat admin tidak hadir | Minimal 2 operator terlatih per fungsi |
| Koneksi internet desa tidak stabil | Sistem sulit diakses | Auto-save draf form, optimasi ukuran aset, evaluasi caching offline terbatas |
| Ketergantungan pada tier gratis vendor | Layanan terhenti bila kuota tercapai | Monitoring kuota via dashboard Supabase/Vercel, anggaran cadangan upgrade tier |

## 15. Roadmap (Indikatif)

| Fase | Fokus | Estimasi Waktu |
|---|---|---|
| Fase 1 (MVP) | Profil desa, berita, layanan surat online + generate surat otomatis, pengaduan | Juli 2026 — September 2026 |
| Fase 2 | Notifikasi WhatsApp/SMS, laporan lanjutan, pembayaran retribusi (opsional) | Oktober 2026 — Desember 2026 |
| Fase 3 | Aplikasi mobile, integrasi Dukcapil, analitik lanjutan, akses kecamatan/kabupaten | 2027 |

## 16. Keputusan & Pertanyaan Terbuka

| # | Topik | Status |
|---|---|---|
| 1 | Jenis surat yang didukung generate otomatis tahap awal | **Diputuskan sementara**: mengikuti daftar seed di `schema.md` §`letter_types` (SKD, SKU, Pengantar KTP/KK/Nikah, SKTM, Surat Keterangan Kematian, Surat Keterangan Pindah) — dapat ditambah sesuai kebutuhan desa |
| 2 | Integrasi NIK/Dukcapil di fase awal | Tidak — data kependudukan dikelola mandiri di Fase 1, integrasi dipertimbangkan Fase 3 |
| 3 | Notifikasi WhatsApp/SMS | Dijadwalkan Fase 2, di luar cakupan MVP |
| 4 | Pengelola teknis jangka panjang | **Terbuka** — perlu keputusan desa: tim internal atau pihak ketiga |
| 5 | Tanda tangan digital vs QR code | QR code verifikasi internal dipakai di Fase 1; tanda tangan digital berbadan hukum dikaji terpisah |
| 6 | Anggaran & vendor pengembang | **Terbuka** — menunggu alokasi APBDes |

## 17. Status Implementasi (Ringkas)

> Status detail per tahap, checklist teknis, dan struktur file ada di **`architecture.md`** §7 (Development Plan).

- ✅ Tahap 1 — Frontend (UI dengan data dummy): **Selesai**
- ✅ Tahap 2 — Backend (API & Database): **Selesai**
- 🏗️ Tahap 3 — Integrasi, Generate PDF/QR, Penyempurnaan, Testing & Deployment: **Sedang berjalan**
  - ✅ Unit test logika penomoran surat, RBAC, validasi, dan mock store (Vitest) — 61 test lulus
  - ✅ Lint & typecheck bersih, build produksi sukses
  - ✅ Alur pengajuan surat publik (form + cek status via nomor referensi), form admin tambah penduduk/template/pengguna, galeri dengan foto, peta kontak (OSM), dashboard admin dinamis, auth & form mengikuti design system v3.0
  - ✅ Halaman admin layanan surat, proses surat, arsip, pengaduan, dan log aktivitas dialihkan dari Supabase langsung ke mock store via API (data tampil nyata meski tanpa koneksi Supabase)
  - ✅ Statistik: halaman admin pengaturan data statistik (`/admin/statistik` + API `PUT /api/admin/stats`), kartu statistik home memakai animasi count-up (8 kartu), pengelompokan "dusun" dihapus karena desa asli satu wilayah
  - ✅ CRUD konten admin (kontrol penuh konten halaman publik): tambah/edit/hapus berita, tambah/hapus galeri (upload lokal), tambah/edit/hapus penduduk, tambah/edit/hapus template surat (versi naik otomatis saat edit), tambah/edit pengguna — 61 test lulus
  - 🏗️ Sisa Tahap 3.3/3.4 (notifikasi, rate limiting, UAT, deploy) masih berjalan

## 18. Glosarium

| Istilah | Arti |
|---|---|
| SID | Sistem Informasi Desa |
| SKD | Surat Keterangan Domisili |
| SKU | Surat Keterangan Usaha |
| SKTM | Surat Keterangan Tidak Mampu |
| RLS | Row Level Security (proteksi data di level baris database) |
| RBAC | Role-Based Access Control |
| SLA | Service Level Agreement — target waktu penanganan |
| PITR | Point-In-Time Recovery |
| RPO / RTO | Recovery Point/Time Objective — target pemulihan bencana |

---

*Dokumen ini disesuaikan untuk Desa Ujungbatu II dan diperbarui berdasarkan diskusi dengan pemangku kepentingan desa. Lihat `architecture.md`, `design.md`, `schema.md`, dan `rules.md` untuk detail teknis, desain, data, dan aturan bisnis.*
