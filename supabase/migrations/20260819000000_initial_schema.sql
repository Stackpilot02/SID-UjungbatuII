-- ============================================================
-- SID — Desa Ujungbatu II
-- Skema Database — PostgreSQL (Supabase)
-- Versi 2 (selaras dengan data model aplikasi)
-- Diperbarui: migrasi mock store -> Supabase
-- ============================================================

-- 1. ENUM
DO $$ BEGIN
  CREATE TYPE user_role AS ENUM ('warga', 'operator', 'admin', 'kepala_desa');
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
  CREATE TYPE letter_request_status AS ENUM ('pending', 'verified', 'approved', 'rejected', 'completed');
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
  CREATE TYPE complaint_status AS ENUM ('received', 'in_progress', 'resolved', 'rejected');
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
  CREATE TYPE content_status AS ENUM ('draft', 'published', 'archived');
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

-- 2. TABEL

-- 2.1 profiles (terhubung dengan auth.users untuk login)
CREATE TABLE IF NOT EXISTS profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT NOT NULL,
  email TEXT,
  phone TEXT,
  role user_role NOT NULL DEFAULT 'warga',
  resident_id UUID,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 2.2 residents (tanpa kolom dusun — desa satu wilayah)
CREATE TABLE IF NOT EXISTS residents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nik TEXT UNIQUE NOT NULL,
  kk_number TEXT NOT NULL,
  full_name TEXT NOT NULL,
  birth_place TEXT,
  birth_date DATE,
  gender TEXT,
  occupation TEXT,
  religion TEXT,
  marital_status TEXT,
  family_role TEXT DEFAULT 'Anggota',
  created_by UUID REFERENCES profiles(id),
  updated_by UUID REFERENCES profiles(id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 2.3 news
CREATE TABLE IF NOT EXISTS news (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  category TEXT NOT NULL DEFAULT 'berita',
  excerpt TEXT,
  content TEXT NOT NULL,
  cover_image_url TEXT,
  status content_status NOT NULL DEFAULT 'draft',
  author_id TEXT,
  published_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 2.4 gallery_items
CREATE TABLE IF NOT EXISTS gallery_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  media_url TEXT NOT NULL,
  media_type TEXT NOT NULL DEFAULT 'image',
  event_date DATE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 2.5 complaints (tanpa FK profiles — pelapor dapat menulis tanpa login)
CREATE TABLE IF NOT EXISTS complaints (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  category_id TEXT NOT NULL,
  description TEXT NOT NULL,
  location TEXT,
  status complaint_status NOT NULL DEFAULT 'received',
  reporter_name TEXT NOT NULL DEFAULT 'Warga',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 2.6 activity_logs (tanpa FK profiles — mencatat aksi sistem)
CREATE TABLE IF NOT EXISTS activity_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  action TEXT NOT NULL,
  table_name TEXT NOT NULL,
  performed_by TEXT NOT NULL DEFAULT 'Sistem',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 2.7 letters (arsip surat yang telah terbit)
CREATE TABLE IF NOT EXISTS letters (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  letter_number TEXT UNIQUE NOT NULL,
  letter_type_id TEXT NOT NULL,
  issued_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 2.8 letter_templates
CREATE TABLE IF NOT EXISTS letter_templates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  letter_type_id TEXT NOT NULL,
  name TEXT NOT NULL,
  number_format TEXT NOT NULL,
  body_template TEXT NOT NULL,
  version INT NOT NULL DEFAULT 1,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_by UUID REFERENCES profiles(id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 2.9 letter_requests (id berupa nomor referensi publik: LR-<timestamp>)
CREATE TABLE IF NOT EXISTS letter_requests (
  id TEXT PRIMARY KEY,
  requester_name TEXT NOT NULL,
  requester_nik TEXT NOT NULL,
  letter_type_id TEXT NOT NULL,
  phone TEXT,
  email TEXT,
  purpose TEXT NOT NULL,
  status letter_request_status NOT NULL DEFAULT 'pending',
  additional_data JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 2.10 users (perangkat desa; akan disinkronkan ke profiles saat integrasi auth)
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  role user_role NOT NULL DEFAULT 'operator',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 2.11 village_stats (satu baris data statistik kependudukan)
CREATE TABLE IF NOT EXISTS village_stats (
  id INT PRIMARY KEY DEFAULT 1 CHECK (id = 1),
  total_population INT NOT NULL DEFAULT 0,
  male_count INT NOT NULL DEFAULT 0,
  female_count INT NOT NULL DEFAULT 0,
  family_card_count INT NOT NULL DEFAULT 0,
  occupation_stats JSONB NOT NULL DEFAULT '[]',
  religion_stats JSONB NOT NULL DEFAULT '[]',
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 2.12 letter_types (referensi jenis surat)
CREATE TABLE IF NOT EXISTS letter_types (
  id TEXT PRIMARY KEY,
  code TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  number_format TEXT NOT NULL DEFAULT '{urutan}/{kode}/UB-II/{bulan}/{tahun}',
  requires_attachment BOOLEAN NOT NULL DEFAULT false
);

-- 2.13 complaint_categories (referensi kategori pengaduan)
CREATE TABLE IF NOT EXISTS complaint_categories (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  default_sla_days INT NOT NULL DEFAULT 7
);

-- 2.14 village_profile (profil & kontak desa)
CREATE TABLE IF NOT EXISTS village_profile (
  id INT PRIMARY KEY DEFAULT 1 CHECK (id = 1),
  village_name TEXT NOT NULL DEFAULT 'Desa Ujungbatu II',
  district TEXT,
  regency TEXT,
  province TEXT,
  history TEXT,
  vision TEXT,
  mission JSONB NOT NULL DEFAULT '[]',
  map_lat NUMERIC,
  map_lng NUMERIC,
  address TEXT,
  phone TEXT,
  email TEXT,
  working_hours TEXT,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 2.15 organization_structure (struktur organisasi desa)
CREATE TABLE IF NOT EXISTS organization_structure (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  position TEXT NOT NULL,
  order_index INT NOT NULL DEFAULT 0,
  photo_url TEXT NOT NULL DEFAULT ''
);

-- 3. TRIGGERS & FUNCTIONS

-- Auto-update timestamp
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS update_profiles_updated_at ON profiles;
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON profiles FOR EACH ROW EXECUTE FUNCTION update_updated_at();

DROP TRIGGER IF EXISTS update_residents_updated_at ON residents;
CREATE TRIGGER update_residents_updated_at
  BEFORE UPDATE ON residents FOR EACH ROW EXECUTE FUNCTION update_updated_at();

DROP TRIGGER IF EXISTS update_news_updated_at ON news;
CREATE TRIGGER update_news_updated_at
  BEFORE UPDATE ON news FOR EACH ROW EXECUTE FUNCTION update_updated_at();

DROP TRIGGER IF EXISTS update_letter_requests_updated_at ON letter_requests;
CREATE TRIGGER update_letter_requests_updated_at
  BEFORE UPDATE ON letter_requests FOR EACH ROW EXECUTE FUNCTION update_updated_at();

DROP TRIGGER IF EXISTS update_village_stats_updated_at ON village_stats;
CREATE TRIGGER update_village_stats_updated_at
  BEFORE UPDATE ON village_stats FOR EACH ROW EXECUTE FUNCTION update_updated_at();

DROP TRIGGER IF EXISTS update_village_profile_updated_at ON village_profile;
CREATE TRIGGER update_village_profile_updated_at
  BEFORE UPDATE ON village_profile FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- Auto-create profile on user signup (integrasi Supabase Auth)
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, email, role)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.email),
    NEW.email,
    COALESCE((NEW.raw_user_meta_data->>'role')::user_role, 'warga')
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();

-- 4. ROW LEVEL SECURITY
-- Layanan dibuka lewat route handler server (service role) sehingga RLS
-- tidak memblokir. Kebijakan RLS granular per peran ditambahkan pada
-- tahap integrasi autentikasi penuh.

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE residents ENABLE ROW LEVEL SECURITY;
ALTER TABLE news ENABLE ROW LEVEL SECURITY;
ALTER TABLE gallery_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE complaints ENABLE ROW LEVEL SECURITY;
ALTER TABLE letter_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE letters ENABLE ROW LEVEL SECURITY;
ALTER TABLE letter_templates ENABLE ROW LEVEL SECURITY;
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE village_stats ENABLE ROW LEVEL SECURITY;
ALTER TABLE village_profile ENABLE ROW LEVEL SECURITY;
ALTER TABLE organization_structure ENABLE ROW LEVEL SECURITY;
ALTER TABLE activity_logs ENABLE ROW LEVEL SECURITY;

-- Berita & galeri: publik dapat membaca, admin/operator mengelola
CREATE POLICY news_public_read ON news
  FOR SELECT USING (status = 'published');

CREATE POLICY complaints_public_insert ON complaints
  FOR INSERT WITH CHECK (true);

CREATE POLICY letter_requests_public_insert ON letter_requests
  FOR INSERT WITH CHECK (true);

-- 5. SUPABASE STORAGE (bucket unggahan)
-- Bucket publik untuk foto berita dan galeri kegiatan desa.
-- (idempotent) INSERT INTO storage.buckets (id, name, public) VALUES ('gallery', 'gallery', true)
--   ON CONFLICT (id) DO NOTHING;
-- (idempotent) INSERT INTO storage.buckets (id, name, public) VALUES ('news', 'news', true)
--   ON CONFLICT (id) DO NOTHING;