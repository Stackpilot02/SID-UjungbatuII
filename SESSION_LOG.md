# Log Sesi Kerja

## Sesi 2026-08-19 — Integrasi Supabase & Perbaikan Login

### Tujuan
- Selesaikan integrasi Supabase di branch `feat/supabase-integration` (skema v2 + migrasi API/halaman dari mock store) dan pastikan admin bisa login & memakai panel admin.
- Perbaiki keluhan "klik masuk dan tidak mengarah ke halaman login admin".

### Yang Sudah Dikerjakan (Completed)
1. **Fix test flaky**: semua id mock diganti helper `mockId()` di `src/data/mock-data.ts` → 61/61 test lulus, lint bersih, build sukses.
2. **TypeScript strict fix**: `src/lib/supabase-store.ts` diberi tipe eksplisit (interface per entitas + mapper); fix error build `{}` di `src/app/(public)/desa/kontak/page.tsx` dengan fallback `?? 0` untuk `mapLat/mapLng` di iframe OSM.
3. **Skema v2 + seed diterapkan ke Supabase**:
   - Migrasi `20260819000000_initial_schema.sql` + `20260819000001_seed_data.sql` (skema idempoten).
   - User menyetujui reset: drop 14 tabel v1 + 4 enum via Supabase Management API, lalu `supabase db push` sukses.
   - Bucket Storage `gallery` & `news` dibuat via Management API.
   - Isi seed: 4 berita, 5 penduduk, 6 galeri, 8 tipe surat, 4 kategori, 3 users, 1 stats, 2 arsip.
4. **`.env.local` diperbaiki**: `SUPABASE_SERVICE_ROLE_KEY` sebelumnya berisi anon key (bukti: decode JWT role=anon). Diganti key service_role asli via Management API `/v1/projects/.../api-keys`. File sempat korup jadi 1 baris akibat `Set-Content -NoNewline`, lalu ditulis ulang utuh.
5. **RLS publik**: migration `20260819000002_add_public_read_policies.sql` — policy SELECT publik untuk `letter_types`, `complaint_categories`, `village_profile`, `village_stats`, `gallery_items`, `organization_structure`. Data sensitif (`residents`, `users`, `letter_templates`) terlindungi.
6. **CRUD end-to-end verified** via API lokal: POST news/resident/letter-template OK; PATCH template `?id=` menaikkan versi→2; DELETE OK; data uji dibersihkan.
7. **Dokumentasi & git**: PRD §17 ditambah bullet integrasi Supabase; `/supabase/.temp/` masuk `.gitignore`. 6 commit granular + push branch.
8. **Pull Request dibuat**: https://github.com/Stackpilot02/SID-UjungbatuII/pull/1 (dibuat via GitHub API karena `gh` CLI tidak terpasang).
9. **Akun admin Supabase Auth dibuat** via GoTrue admin API `/auth/v1/admin/users` (seed hanya mengisi `public.users`, bukan `auth.users`):
   - `kades@ujungbatu2.desa.id` / `Kades123!` → role `kepala_desa`
   - `sekdes@ujungbatu2.desa.id` / `Sekdes123!` → role `admin`
   - `fatimah@ujungbatu2.desa.id` / `Fatimah123!` → role `operator`
   - Awal gagal (500 Database error) karena trigger `handle_new_user` memakai cast `user_role` tanpa qualified schema → terkena search_path.
10. **Fix trigger `handle_new_user`**: migration `20260819000003_fix_auth_user_trigger.sql` — SECURITY DEFINER + `public.user_role` + blok EXCEPTION mencatat error ke `public.trigger_error_log`. Registrasi warga terverifikasi (profile otomatis dibuat, error log kosong).
11. **Perbaikan login (keluhan user)**:
    - Akar masalah: proxy `/admin/*` query tabel `profiles` untuk ambil role; tabel RLS aktif tanpa policy SELECT → 0 baris → redirect balik ke beranda.
    - Fix: migration `20260819000004_add_profiles_own_read_policy.sql` — `CREATE POLICY profiles_own_read ON profiles FOR SELECT USING (auth.uid() = id)`.
    - Tambah komponen `src/components/LogoutButton.tsx` + pasang di `src/components/AdminSidebar.tsx` (sebelumnya tidak ada cara logout; cookie session membuat `/auth/login` redirect balik ke `/`).
    - Verifikasi end-to-end (simulasi cookie `base64-<base64url(sessionJSON)>`):
      - `/admin/dashboard` dengan session → 200
      - `/admin/dashboard` tanpa session → redirect `/auth/login`
      - `/auth/login` dengan session → 200
12. **Commit & push terakhir**: `8913551` — policy RLS + tombol logout (3 file).

### Catatan Penting (Important Details)
- **AGENTS.md**: perubahan schema DB = fitur berisiko → branch + PR + review; commit granular; pesan commit bahasa Indonesia; update dokumen aditif.
- **Project Supabase**: ref `bdapjangqpowmtwjknvg`, URL `https://bdapjangqpowmtwjknvg.supabase.co`. Token Supabase Management API dan GitHub PAT untuk PR tersimpan di sesi percakapan (jangan di-commit ke repo).
- **Login pakai Supabase Auth** (`signInWithPassword`); `auth.users` dibuat manual via GoTrue admin API; `profiles` diisi manual setelah drop trigger.
- **Cookie Supabase SSR**: nama `sb-<ref>-auth-token`, nilai ber-prefix `base64-` + base64url dari JSON session (access_token, refresh_token, expires_in, expires_at, token_type, user).
- **letterTypeId berupa string "1".."8"** (bukan kode "skd").
- **PowerShell 5.1 quirks**: interpolasi `$t?select` salah (pakai `${t}`); `Set-Content -NoNewline` bisa menggabungkan baris; `Invoke-WebRequest` mengikuti redirect (cek `BaseResponse.ResponseUri`).
- **Route PATCH/DELETE admin memakai query param `?id=...`**, bukan path segment.
- Supabase CLI 2.109.1; Docker tidak tersedia (`db dump` gagal); Management API `POST .../database/query` untuk SQL langsung.
- Dev server: `http://localhost:3000` (Next.js 16.2.11/Turbopack), PID 2424.

### Isu Terbuka / Lanjutan (Next Move)
- **Potensi bug reproduktif**: migration `20260819000003` memakai `public.trigger_error_log` yang dibuat manual via Management API, **belum ada migration pembuatnya** → fresh DB akan gagal. Perlu migration `CREATE TABLE IF NOT EXISTS public.trigger_error_log`.
- Migration `20260819000004` sudah di-push ke `feat/supabase-integration`; pastikan PR #1 ter-update.
- User perlu hard-refresh / clear cookie lama lalu login ulang untuk menikmati perbaikan.

### File Terkait (Relevant Files)
- `src/proxy.ts`: proteksi `/admin/*`; query `profiles.role` dengan session user — butuh policy `profiles_own_read`.
- `supabase/migrations/20260819000004_add_profiles_own_read_policy.sql`: policy baru.
- `supabase/migrations/20260819000003_fix_auth_user_trigger.sql`: trigger fix; bergantung `public.trigger_error_log`.
- `supabase/schema.sql`, `supabase/seed.sql`: skema v2 + seed.
- `src/lib/supabase-store.ts`: lapisan repository Supabase.
- `src/components/LogoutButton.tsx`, `src/components/AdminSidebar.tsx`: tombol logout.
- `.env.local`: berisi service role key benar (jangan di-commit).
- `prd.md`: §17 memuat bullet integrasi Supabase.