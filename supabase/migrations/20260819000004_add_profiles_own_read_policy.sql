-- Policy RLS: user yang login (authenticated) dapat membaca profilnya sendiri.
-- Diperlukan proxy/middleware (src/proxy.ts) untuk memeriksa role
-- sebelum mengizinkan akses ke halaman admin.
CREATE POLICY profiles_own_read ON profiles
  FOR SELECT USING (auth.uid() = id);