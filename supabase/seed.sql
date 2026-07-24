-- Seed data for SID Ujungbatu II

-- Letter types
INSERT INTO letter_types (code, name, number_format, requires_attachment) VALUES
  ('SKD', 'Surat Keterangan Domisili', '{urutan}/SKD/UB-II/{bulan}/{tahun}', false),
  ('SKU', 'Surat Keterangan Usaha', '{urutan}/SKU/UB-II/{bulan}/{tahun}', false),
  ('SKTM', 'Surat Keterangan Tidak Mampu', '{urutan}/SKTM/UB-II/{bulan}/{tahun}', false),
  ('PKTP', 'Pengantar Pembuatan KTP', '{urutan}/PKTP/UB-II/{bulan}/{tahun}', true),
  ('PKK', 'Pengantar Pembuatan KK', '{urutan}/PKK/UB-II/{bulan}/{tahun}', true),
  ('PNK', 'Pengantar Nikah', '{urutan}/PNK/UB-II/{bulan}/{tahun}', true),
  ('SKMT', 'Surat Keterangan Kematian', '{urutan}/SKMT/UB-II/{bulan}/{tahun}', true),
  ('SKPD', 'Surat Keterangan Pindah', '{urutan}/SKPD/UB-II/{bulan}/{tahun}', false);

-- Complaint categories
INSERT INTO complaint_categories (name, default_sla_days) VALUES
  ('Infrastruktur', 7),
  ('Kebersihan', 5),
  ('Keamanan', 3),
  ('Lainnya', 10);

-- Village profile
INSERT INTO village_profile (village_name, history, vision, mission, address, phone, email, working_hours)
VALUES (
  'Desa Ujungbatu II',
  'Desa Ujungbatu II berdiri sejak tahun 1950-an sebagai bagian dari pemekaran wilayah Kecamatan Hutaraja Tinggi. Mayoritas penduduk bekerja sebagai petani karet dan kelapa sawit.',
  'Terwujudnya Desa Ujungbatu II yang maju, mandiri, dan sejahtera berdasarkan gotong royong dan nilai-nilai keagamaan.',
  ARRAY[
    'Meningkatkan kualitas pelayanan publik kepada masyarakat',
    'Mengembangkan potensi desa di bidang pertanian dan perkebunan',
    'Memperkuat kelembagaan desa yang transparan dan akuntabel',
    'Meningkatkan partisipasi masyarakat dalam pembangunan desa',
    'Melestarikan budaya dan kearifan lokal Batak Angkola'
  ],
  'Jl. Poros Desa Ujungbatu II, Kec. Hutaraja Tinggi, Kab. Padang Lawas, Sumatera Utara',
  '(0623) 1234567',
  'desa.ujungbatu2@gmail.com',
  'Senin - Jumat, 08:00 - 16:00 WIB'
);

-- Organization structure
INSERT INTO organization_structure (name, position, order_index) VALUES
  ('Muhammad Yusuf Lubis', 'Kepala Desa', 1),
  ('Ahmad Siregar', 'Sekretaris Desa', 2),
  ('Fatimah Harahap', 'Kaur Keuangan', 3),
  ('Abdul Hakim Nasution', 'Kaur Perencanaan', 4),
  ('Siti Rahma Dalimunthe', 'Kasi Kesejahteraan', 5),
  ('Muhammad Rizky Pohan', 'Kasi Pelayanan', 6),
  ('Hendra Gunawan Hasibuan', 'Kepala Dusun I', 7),
  ('Syamsul Bahri Siregar', 'Kepala Dusun II', 8);
