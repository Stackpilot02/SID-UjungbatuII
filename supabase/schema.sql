-- ============================================================
-- SID — Desa Ujungbatu II
-- Skema Database — PostgreSQL (Supabase)
-- ============================================================

-- 1. ENUM
CREATE TYPE user_role AS ENUM ('warga', 'operator', 'admin', 'kepala_desa');
CREATE TYPE letter_request_status AS ENUM ('pending', 'verified', 'approved', 'rejected', 'completed');
CREATE TYPE complaint_status AS ENUM ('received', 'in_progress', 'resolved', 'rejected');
CREATE TYPE content_status AS ENUM ('draft', 'published', 'archived');

-- 2. TABEL INTI

-- 2.1 profiles
CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT NOT NULL,
  email TEXT,
  phone TEXT,
  role user_role NOT NULL DEFAULT 'warga',
  resident_id UUID,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 2.2 residents
CREATE TABLE residents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nik TEXT UNIQUE NOT NULL,
  kk_number TEXT NOT NULL,
  full_name TEXT NOT NULL,
  birth_place TEXT,
  birth_date DATE,
  gender TEXT,
  address TEXT,
  dusun TEXT,
  occupation TEXT,
  religion TEXT,
  marital_status TEXT,
  family_role TEXT DEFAULT 'Anggota',
  created_by UUID REFERENCES profiles(id),
  updated_by UUID REFERENCES profiles(id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 2.3 village_profile
CREATE TABLE village_profile (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  village_name TEXT NOT NULL DEFAULT 'Desa Ujungbatu II',
  history TEXT,
  vision TEXT,
  mission TEXT[] DEFAULT '{}',
  map_lat NUMERIC,
  map_lng NUMERIC,
  address TEXT,
  phone TEXT,
  email TEXT,
  working_hours TEXT,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 2.4 organization_structure
CREATE TABLE organization_structure (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  position TEXT NOT NULL,
  order_index INT NOT NULL DEFAULT 0,
  photo_url TEXT
);

-- 2.5 news
CREATE TABLE news (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  content TEXT NOT NULL,
  excerpt TEXT,
  category TEXT NOT NULL DEFAULT 'berita',
  cover_image_url TEXT,
  status content_status NOT NULL DEFAULT 'draft',
  author_id UUID REFERENCES profiles(id),
  published_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 2.6 gallery_items
CREATE TABLE gallery_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  media_url TEXT NOT NULL,
  media_type TEXT NOT NULL DEFAULT 'image',
  event_date DATE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 2.7 complaint_categories
CREATE TABLE complaint_categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL UNIQUE,
  default_sla_days INT NOT NULL DEFAULT 7
);

-- 2.8 complaints
CREATE TABLE complaints (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  reporter_id UUID NOT NULL REFERENCES profiles(id),
  category_id UUID NOT NULL REFERENCES complaint_categories(id),
  description TEXT NOT NULL,
  location TEXT,
  attachment_urls TEXT[] DEFAULT '{}',
  status complaint_status NOT NULL DEFAULT 'received',
  response_notes TEXT,
  handled_by UUID REFERENCES profiles(id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  resolved_at TIMESTAMPTZ
);

-- 2.9 letter_types
CREATE TABLE letter_types (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  code TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  number_format TEXT NOT NULL DEFAULT '{urutan}/{kode}/{desa}/{bulan}/{tahun}',
  requires_attachment BOOLEAN NOT NULL DEFAULT false
);

-- 2.10 letter_templates
CREATE TABLE letter_templates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  letter_type_id UUID NOT NULL REFERENCES letter_types(id),
  header_html TEXT,
  body_template TEXT NOT NULL,
  footer_html TEXT,
  version INT NOT NULL DEFAULT 1,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_by UUID REFERENCES profiles(id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 2.11 letter_requests
CREATE TABLE letter_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  requester_id UUID NOT NULL REFERENCES profiles(id),
  letter_type_id UUID NOT NULL REFERENCES letter_types(id),
  purpose TEXT NOT NULL,
  additional_data JSONB DEFAULT '{}',
  attachment_urls TEXT[] DEFAULT '{}',
  status letter_request_status NOT NULL DEFAULT 'pending',
  verified_by UUID REFERENCES profiles(id),
  approved_by UUID REFERENCES profiles(id),
  rejection_reason TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 2.12 letters
CREATE TABLE letters (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  letter_request_id UUID REFERENCES letter_requests(id),
  letter_number TEXT UNIQUE NOT NULL,
  letter_type_id UUID NOT NULL REFERENCES letter_types(id),
  resident_id UUID NOT NULL REFERENCES residents(id),
  pdf_url TEXT,
  qr_code TEXT,
  issued_by UUID NOT NULL REFERENCES profiles(id),
  issued_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  is_batch BOOLEAN NOT NULL DEFAULT false
);

-- 2.13 activity_logs
CREATE TABLE activity_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  actor_id UUID NOT NULL REFERENCES profiles(id),
  action TEXT NOT NULL,
  table_name TEXT NOT NULL,
  record_id UUID,
  diff JSONB,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 2.14 notifications
CREATE TABLE notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  recipient_id UUID NOT NULL REFERENCES profiles(id),
  title TEXT NOT NULL,
  body TEXT NOT NULL,
  is_read BOOLEAN NOT NULL DEFAULT false,
  link TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 3. TRIGGERS & FUNCTIONS

-- Auto-create profile on user signup
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

-- Auto-update timestamp
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON profiles FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_residents_updated_at
  BEFORE UPDATE ON residents FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_news_updated_at
  BEFORE UPDATE ON news FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_letter_requests_updated_at
  BEFORE UPDATE ON letter_requests FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- Activity log trigger
CREATE OR REPLACE FUNCTION log_activity()
RETURNS TRIGGER AS $$
DECLARE
  v_diff JSONB;
BEGIN
  IF TG_OP = 'INSERT' THEN
    v_diff = jsonb_build_object('new', row_to_json(NEW)::jsonb);
  ELSIF TG_OP = 'UPDATE' THEN
    v_diff = jsonb_build_object('old', row_to_json(OLD)::jsonb, 'new', row_to_json(NEW)::jsonb);
  ELSIF TG_OP = 'DELETE' THEN
    v_diff = jsonb_build_object('old', row_to_json(OLD)::jsonb);
  END IF;
  INSERT INTO activity_logs (actor_id, action, table_name, record_id, diff)
  VALUES (
    COALESCE(NEW.updated_by, OLD.updated_by, NEW.id, OLD.id)::UUID,
    TG_OP,
    TG_TABLE_NAME,
    COALESCE(NEW.id, OLD.id),
    v_diff
  );
  RETURN COALESCE(NEW, OLD);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Letter number generation function
CREATE OR REPLACE FUNCTION generate_letter_number(p_letter_type_id UUID)
RETURNS TEXT AS $$
DECLARE
  v_code TEXT;
  v_year TEXT;
  v_month TEXT;
  v_seq INT;
  v_result TEXT;
BEGIN
  SELECT code INTO v_code FROM letter_types WHERE id = p_letter_type_id;
  v_year := EXTRACT(YEAR FROM NOW())::TEXT;
  v_month := TO_CHAR(NOW(), 'MM');

  SELECT COALESCE(MAX(CAST(SPLIT_PART(letter_number, '/', 1) AS INT)), 0) + 1
  INTO v_seq
  FROM letters
  WHERE letter_type_id = p_letter_type_id
    AND EXTRACT(YEAR FROM issued_at) = EXTRACT(YEAR FROM NOW());

  v_result := LPAD(v_seq::TEXT, 3, '0') || '/' || v_code || '/UB-II/' || v_month || '/' || v_year;
  RETURN v_result;
END;
$$ LANGUAGE plpgsql;

-- 4. ROW LEVEL SECURITY
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE residents ENABLE ROW LEVEL SECURITY;
ALTER TABLE news ENABLE ROW LEVEL SECURITY;
ALTER TABLE complaints ENABLE ROW LEVEL SECURITY;
ALTER TABLE letter_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE letters ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;

-- Profiles: own profile only for warga, all for admin/operator
CREATE POLICY profiles_own_or_admin ON profiles
  FOR ALL USING (
    auth.uid() = id
    OR EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role IN ('admin', 'operator', 'kepala_desa'))
  );

-- Residents: admin/operator only
CREATE POLICY residents_admin_only ON residents
  FOR ALL USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role IN ('admin', 'operator'))
  );

-- News: public read published
CREATE POLICY news_public_read ON news
  FOR SELECT USING (status = 'published');

CREATE POLICY news_admin_all ON news
  FOR ALL USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role IN ('admin', 'operator'))
  );

-- Complaints: own or admin
CREATE POLICY complaints_own ON complaints
  FOR SELECT USING (reporter_id = auth.uid());

CREATE POLICY complaints_admin_all ON complaints
  FOR ALL USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role IN ('admin', 'operator'))
  );

-- Letter requests: own or admin
CREATE POLICY letter_requests_own ON letter_requests
  FOR SELECT USING (requester_id = auth.uid());

CREATE POLICY letter_requests_admin_all ON letter_requests
  FOR ALL USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role IN ('admin', 'operator'))
  );

-- Letters: admin/operator only
CREATE POLICY letters_admin_all ON letters
  FOR ALL USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role IN ('admin', 'operator'))
  );

-- Notifications: own only
CREATE POLICY notifications_own ON notifications
  FOR ALL USING (recipient_id = auth.uid());
