-- Seed data for SID Ujungbatu II (versi selaras aplikasi)

-- Letter types
INSERT INTO letter_types (id, code, name, number_format, requires_attachment) VALUES
  ('1', 'SKD', 'Surat Keterangan Domisili', '{urutan}/SKD/UB-II/{bulan}/{tahun}', false),
  ('2', 'SKU', 'Surat Keterangan Usaha', '{urutan}/SKU/UB-II/{bulan}/{tahun}', false),
  ('3', 'SKTM', 'Surat Keterangan Tidak Mampu', '{urutan}/SKTM/UB-II/{bulan}/{tahun}', false),
  ('4', 'PKTP', 'Pengantar Pembuatan KTP', '{urutan}/PKTP/UB-II/{bulan}/{tahun}', true),
  ('5', 'PKK', 'Pengantar Pembuatan KK', '{urutan}/PKK/UB-II/{bulan}/{tahun}', true),
  ('6', 'PNK', 'Pengantar Nikah', '{urutan}/PNK/UB-II/{bulan}/{tahun}', true),
  ('7', 'SKMT', 'Surat Keterangan Kematian', '{urutan}/SKMT/UB-II/{bulan}/{tahun}', true),
  ('8', 'SKPD', 'Surat Keterangan Pindah', '{urutan}/SKPD/UB-II/{bulan}/{tahun}', false);

-- Complaint categories
INSERT INTO complaint_categories (id, name, default_sla_days) VALUES
  ('1', 'Infrastruktur', 7),
  ('2', 'Kebersihan', 5),
  ('3', 'Keamanan', 3),
  ('4', 'Lainnya', 10);

-- Village profile
INSERT INTO village_profile (village_name, district, regency, province, history, vision, mission, map_lat, map_lng, address, phone, email, working_hours)
VALUES (
  'Desa Ujungbatu II',
  'Kec. Hutaraja Tinggi',
  'Kab. Padang Lawas',
  'Sumatera Utara',
  'Desa Ujungbatu II berdiri sejak tahun 1950-an sebagai bagian dari pemekaran wilayah Kecamatan Hutaraja Tinggi. Mayoritas penduduk bekerja sebagai petani karet dan kelapa sawit. Desa ini dikenal dengan semangat gotong royong yang kuat dan kearifan lokal Batak Angkola yang masih terjaga hingga kini.',
  'Terwujudnya Desa Ujungbatu II yang maju, mandiri, dan sejahtera berdasarkan gotong royong dan nilai-nilai keagamaan.',
  '["Meningkatkan kualitas pelayanan publik kepada masyarakat","Mengembangkan potensi desa di bidang pertanian dan perkebunan","Memperkuat kelembagaan desa yang transparan dan akuntabel","Meningkatkan partisipasi masyarakat dalam pembangunan desa","Melestarikan budaya dan kearifan lokal Batak Angkola"]',
  1.234,
  99.567,
  'Jl. Poros Desa Ujungbatu II, Kec. Hutaraja Tinggi, Kab. Padang Lawas, Sumatera Utara',
  '(0623) 1234567',
  'desa.ujungbatu2@gmail.com',
  'Senin - Jumat, 08:00 - 16:00 WIB'
);

-- Organization structure
INSERT INTO organization_structure (id, name, position, order_index) VALUES
  ('1', 'Muhammad Yusuf Lubis', 'Kepala Desa', 1),
  ('2', 'Ahmad Siregar', 'Sekretaris Desa', 2),
  ('3', 'Fatimah Harahap', 'Kaur Keuangan', 3),
  ('4', 'Abdul Hakim Nasution', 'Kaur Perencanaan', 4),
  ('5', 'Siti Rahma Dalimunthe', 'Kasi Kesejahteraan', 5),
  ('6', 'Muhammad Rizky Pohan', 'Kasi Pelayanan', 6);

-- Village stats (satu baris; occupation & religion dalam JSONB)
INSERT INTO village_stats (total_population, male_count, female_count, family_card_count, occupation_stats, religion_stats)
VALUES (
  1250,
  620,
  630,
  380,
  '[{"name":"Petani","count":450},{"name":"Pedagang","count":120},{"name":"Guru","count":35},{"name":"Pegawai Negeri","count":25},{"name":"Buruh","count":200},{"name":"Lainnya","count":420}]',
  '[{"name":"Islam","count":1240},{"name":"Kristen","count":10}]'
);

-- Users (perangkat desa)
INSERT INTO users (full_name, email, role) VALUES
  ('Muhammad Yusuf Lubis', 'kades@ujungbatu2.desa.id', 'kepala_desa'),
  ('Ahmad Siregar', 'sekdes@ujungbatu2.desa.id', 'admin'),
  ('Fatimah Harahap', 'fatimah@ujungbatu2.desa.id', 'operator');

-- Berita contoh
INSERT INTO news (title, slug, category, excerpt, content, cover_image_url, status, author_id, published_at) VALUES
  ('Kegiatan Gotong Royong Bersihkan Jalan Desa', 'gotong-royong-bersihkan-jalan', 'berita', 'Warga Desa Ujungbatu II bergotong royong membersihkan jalan utama desa menjelang musim panen.', 'Pada hari Minggu, 20 Juli 2026, warga Desa Ujungbatu II melaksanakan kegiatan gotong royong membersihkan jalan utama desa. Kegiatan ini dihadiri oleh Kepala Desa, perangkat desa, serta warga dari kedua dusun. Jalur sepanjang 3 kilometer berhasil dibersihkan dari rumput liar dan sampah. Kegiatan ini merupakan agenda rutin yang dilakukan setiap bulan.', '/hero-desa.png', 'published', '1', '2026-07-20T10:00:00Z'),
  ('Sosialisasi Program Bantuan Langsung Tunai (BLT)', 'sosialisasi-blt', 'pengumuman', 'Pemerintah Desa mengadakan sosialisasi terkait penyaluran BLT Dana Desa tahun 2026.', 'Pemerintah Desa Ujungbatu II mengadakan sosialisasi Program Bantuan Langsung Tunai (BLT) yang bersumber dari Dana Desa Tahun Anggaran 2026. Kegiatan berlangsung di Balai Desa dan dihadiri oleh 50 Keluarga Penerima Manfaat (KPM). Besaran BLT yang disalurkan sebesar Rp300.000 per bulan per KPM.', '/hero-desa.png', 'published', '1', '2026-07-15T09:00:00Z'),
  ('Pembagian Bibit Karet untuk Petani Desa', 'pembagian-bibit-karet', 'berita', 'Dinas Pertanian menyalurkan bantuan bibit karet unggul kepada kelompok tani di Desa Ujungbatu II.', 'Sebanyak 5.000 bibit karet unggul dibagikan kepada 3 kelompok tani di Desa Ujungbatu II. Program ini merupakan kerjasama antara Dinas Pertanian Kabupaten Padang Lawas dengan Pemerintah Desa. Diharapkan bantuan ini dapat meningkatkan produktivitas perkebunan karet warga.', '/hero-desa.png', 'published', '2', '2026-07-10T08:00:00Z'),
  ('Peringatan HUT RI ke-81 Tingkat Desa', 'hut-ri-81', 'pengumuman', 'Rangkaian acara peringatan HUT RI ke-81 akan dilaksanakan pada 17 Agustus 2026 di lapangan desa.', 'Dalam rangka memperingati Hari Kemerdekaan Republik Indonesia ke-81, Pemerintah Desa Ujungbatu II akan mengadakan berbagai kegiatan, antara lain: upacara bendera, lomba-lomba tradisional, jalan sehat, dan malam tasyakuran. Diharapkan seluruh warga dapat berpartisipasi memeriahkan acara.', '/hero-desa.png', 'published', '1', '2026-08-01T08:00:00Z');

-- Galeri (foto sementara menunggu dokumentasi kegiatan asli)
INSERT INTO gallery_items (title, description, media_url, media_type, event_date) VALUES
  ('Gotong Royong Jalan Desa', 'Warga bergotong royong membersihkan jalan desa', '/gallery/gotong-royong.jpg', 'image', '2026-07-20'),
  ('Sosialisasi BLT', 'Kegiatan sosialisasi BLT di Balai Desa', '/gallery/sosialisasi-blt.jpg', 'image', '2026-07-15'),
  ('Pembagian Bibit Karet', 'Pembagian bibit karet kepada kelompok tani', '/gallery/pembagian-bibit.jpg', 'image', '2026-07-10'),
  ('Senam Sehat', 'Kegiatan senam sehat bersama warga', '/gallery/senam-sehat.jpg', 'image', '2026-07-05'),
  ('Musyawarah Desa', 'Musyawarah perencanaan pembangunan desa', '/gallery/musyawarah-desa.jpg', 'image', '2026-06-28'),
  ('Pengajian Rutin', 'Pengajian rutin ibu-ibu Desa Ujungbatu II', '/gallery/pengajian-rutin.jpg', 'image', '2026-06-25');

-- Penduduk contoh (tanpa kolom dusun)
INSERT INTO residents (nik, kk_number, full_name, birth_place, birth_date, gender, occupation, religion, marital_status, family_role) VALUES
  ('1209123456789001', '1209123456789001', 'Muhammad Yusuf Lubis', 'Ujungbatu', '1975-03-15', 'Laki-laki', 'Petani', 'Islam', 'Kawin', 'Kepala Keluarga'),
  ('1209123456789002', '1209123456789001', 'Siti Rahma Dalimunthe', 'Padang Lawas', '1980-07-22', 'Perempuan', 'Ibu Rumah Tangga', 'Islam', 'Kawin', 'Anggota'),
  ('1209123456789003', '1209123456789002', 'Ahmad Siregar', 'Hutaraja', '1982-11-08', 'Laki-laki', 'Petani', 'Islam', 'Kawin', 'Kepala Keluarga'),
  ('1209123456789004', '1209123456789002', 'Fatimah Harahap', 'Padang Lawas', '1985-05-30', 'Perempuan', 'Pedagang', 'Islam', 'Kawin', 'Anggota'),
  ('1209123456789005', '1209123456789003', 'Abdul Hakim Nasution', 'Gunungtua', '1990-01-20', 'Laki-laki', 'Guru', 'Islam', 'Kawin', 'Kepala Keluarga');

-- Pengaduan contoh
INSERT INTO complaints (category_id, description, location, status, reporter_name) VALUES
  ('1', 'Jalan menuju kebun warga rusak parah setelah hujan.', 'Dusun I', 'received', 'Warga'),
  ('2', 'Saluran air tersumbat sampah di depan balai desa.', 'Dusun II', 'in_progress', 'Warga');

-- Log aktivitas contoh
INSERT INTO activity_logs (action, table_name, performed_by) VALUES
  ('CREATE', 'letter_requests', 'Sistem'),
  ('CREATE', 'residents', 'admin');

-- Arsip surat contoh
INSERT INTO letters (letter_number, letter_type_id, issued_at) VALUES
  ('001/SKD/UB-II/07/2026', '1', '2026-07-20T10:00:00Z'),
  ('002/SKU/UB-II/07/2026', '2', '2026-07-22T11:00:00Z');