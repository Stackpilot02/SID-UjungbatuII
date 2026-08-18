-- Policy RLS tambahan: izinkan publik (anon) membaca konten publik.
-- Melengkapi policy yang sudah ada di migrasi awal (news_public_read,
-- letter_requests_public_insert, complaints_public_insert).

-- Referensi data: kode & format tipe surat yang ditampilkan di form publik.
CREATE POLICY letter_types_public_read ON letter_types
  FOR SELECT USING (true);

-- Referensi data: daftar kategori pengaduan untuk form publik.
CREATE POLICY complaint_categories_public_read ON complaint_categories
  FOR SELECT USING (true);

-- Profil desa ditampilkan di halaman publik (profil & kontak).
CREATE POLICY village_profile_public_read ON village_profile
  FOR SELECT USING (true);

-- Statistik kependudukan ditampilkan di halaman publik (statistik).
CREATE POLICY village_stats_public_read ON village_stats
  FOR SELECT USING (true);

-- Galeri kegiatan desa ditampilkan di halaman publik (galeri).
CREATE POLICY gallery_items_public_read ON gallery_items
  FOR SELECT USING (true);

-- Struktur organisasi perangkat desa ditampilkan di halaman publik.
CREATE POLICY organization_structure_public_read ON organization_structure
  FOR SELECT USING (true);