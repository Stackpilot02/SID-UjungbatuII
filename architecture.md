# Architecture Document
# Sistem Informasi Desa (SID) — Desa Ujungbatu II

**Versi:** 1.0 · **Terkait:** `prd.md`, `schema.md`, `rules.md`, `design.md`

---

## 1. Gambaran Umum

SID dibangun sebagai aplikasi web full-stack serverless: Next.js untuk frontend + API, Supabase (Postgres) sebagai database/auth/storage, Vercel sebagai host. Arsitektur dipilih agar desa tidak perlu mengelola server sendiri, biaya mengikuti pemakaian, dan skalanya otomatis.

```
┌─────────────────────────────────────────────────────────────────┐
│                          PENGGUNA                                │
│   Warga (browser/HP)     Admin/Operator     Kepala Desa          │
└──────────────┬─────────────────┬─────────────────┬──────────────┘
               │                 │                 │
               ▼                 ▼                 ▼
        ┌──────────────────────────────────────────────┐
        │        Vercel Edge / CDN (Next.js App)        │
        │  ┌────────────────────┐  ┌──────────────────┐ │
        │  │  Halaman Publik     │  │  Panel Admin      │ │
        │  │  (SSR/SSG)          │  │  (CSR + RBAC)     │ │
        │  └─────────┬──────────┘  └────────┬──────────┘ │
        │            │                       │            │
        │  ┌─────────▼───────────────────────▼──────────┐│
        │  │      Next.js API Routes (serverless fn)     ││
        │  │  /api/*         /api/admin/*                ││
        │  └───────────────────┬──────────────────────────┘│
        └──────────────────────┼──────────────────────────┘
                               │
        ┌──────────────────────▼──────────────────────────┐
        │                  SUPABASE                        │
        │  ┌───────────┐ ┌───────────┐ ┌─────────────────┐ │
        │  │ Postgres  │ │   Auth    │ │     Storage      │ │
        │  │ + RLS     │ │ (JWT)     │ │ (lampiran, foto, │ │
        │  │ + Trigger │ │           │ │  arsip surat)    │ │
        │  └───────────┘ └───────────┘ └─────────────────┘ │
        └───────────────────────────────────────────────────┘
                               │
        ┌──────────────────────▼──────────────────────────┐
        │  Layanan Eksternal                                │
        │  • Resend/SendGrid — email notifikasi              │
        │  • @react-pdf/renderer + qrcode — generate surat    │
        │  • Sentry — error tracking                          │
        │  • Vercel Analytics — monitoring performa            │
        └───────────────────────────────────────────────────┘
```

## 2. Prinsip Arsitektur

1. **Serverless-first** — tidak ada server yang harus dikelola manual oleh desa; scaling & patching ditangani vendor.
2. **Keamanan berlapis di level database** — RLS (Row Level Security) Postgres sebagai lapisan pertahanan utama, bukan hanya pengecekan di aplikasi.
3. **Public-first performance** — halaman publik dirender SSR/SSG agar cepat & SEO-friendly meski diakses dari koneksi lambat.
4. **Auditability** — setiap perubahan data sensitif dan surat terbit tercatat di `activity_logs` (lihat `schema.md`).
5. **Biaya rendah, mudah diskalakan** — mulai di tier gratis (Supabase Free + Vercel Hobby), upgrade tier saat kebutuhan bertambah tanpa migrasi arsitektur.

## 3. Tech Stack Detail

| Layer | Teknologi | Versi/Catatan |
|---|---|---|
| Framework | Next.js (App Router) | React 18+, SSR/SSG/ISR |
| Styling | Tailwind CSS | Token desain custom — lihat `design.md` |
| Bahasa | TypeScript | Strict mode |
| Database | Supabase Postgres | Serverless, branching untuk staging |
| ORM/Query | Supabase JS client / `postgres-js` untuk query kompleks | |
| Auth | Supabase Auth (JWT) | Role disimpan di `profiles.role`, dicek via RLS + middleware |
| Storage | Supabase Storage | Bucket terpisah: `attachments`, `gallery`, `letters` |
| PDF Generation | `@react-pdf/renderer` | Render template surat ke PDF di server |
| QR Code | `qrcode` | QR verifikasi keaslian surat, arahkan ke endpoint verifikasi publik |
| Email | Resend / SendGrid | Notifikasi status surat & pengaduan |
| Hosting | Vercel | Auto-scaling, preview deployment per PR |
| Monitoring | Vercel Analytics + Sentry | Performa & error tracking |
| Testing | Vitest/Jest (unit), Playwright (E2E, opsional) | Prioritas: logika penomoran surat, RBAC |

## 4. Struktur Folder (Referensi)

```
src/
├── app/
│   ├── (public)/                  # Halaman publik — SSR/SSG
│   │   ├── page.tsx                # Beranda
│   │   └── desa/
│   │       ├── profil/
│   │       ├── berita/[slug]/
│   │       ├── layanan-surat/
│   │       ├── pengaduan/
│   │       ├── galeri/
│   │       ├── statistik/
│   │       └── kontak/
│   ├── admin/                      # Panel admin — dilindungi middleware
│   │   ├── dashboard/
│   │   ├── konten/
│   │   ├── kependudukan/
│   │   ├── surat/{template,proses,arsip,cetak-massal}/
│   │   ├── layanan-surat/
│   │   ├── pengaduan/
│   │   ├── pengguna/
│   │   └── log-aktivitas/
│   ├── auth/{login,registrasi}/
│   └── api/
│       ├── news/ profile/ letter-requests/ complaints/ gallery/ stats/ contact/
│       └── admin/
│           ├── news/ residents/ letter-templates/
│           ├── letters/{generate,archive}/
│           ├── letter-requests/ complaints/ users/ dashboard/ activity-logs/
├── components/                     # Komponen reusable (lihat design.md)
├── lib/
│   ├── supabase.ts / supabase-admin.ts
│   ├── auth.ts
│   ├── pdf/                        # Template render PDF
│   └── notifications/              # Pengirim email/in-app
├── middleware.ts                   # Proteksi route berbasis role
└── data/mock-data.ts               # (dipakai Tahap 1, dihapus bertahap di Tahap 3)

supabase/
├── schema.sql                      # Lihat schema.md untuk dokumentasi
└── seed.sql
```

## 5. Alur Data Kunci

### 5.1 Generate Surat Otomatis
```
Warga submit form pengajuan
   → POST /api/letter-requests (status: pending)
   → Notifikasi ke role Operator/Admin terkait jenis surat
   → Operator buka /admin/layanan-surat → verifikasi data
   → Operator/Admin approve
   → POST /api/admin/letters/generate
       1. Ambil template aktif untuk jenis surat
       2. Auto-fill data dari tabel residents
       3. Ambil & increment nomor surat (fungsi DB atomik — lihat rules.md §3)
       4. Render PDF (@react-pdf/renderer) + QR code (qrcode) → simpan ke Storage bucket `letters`
       5. Insert record ke tabel letters (arsip)
       6. Update letter_requests.status = 'completed'
   → Notifikasi email + in-app ke warga (tautan unduh)
```

### 5.2 Pengaduan
```
Warga submit form (+ lampiran foto ke Storage bucket `attachments`)
   → POST /api/complaints (status: received)
   → Notifikasi ke admin/operator sesuai kategori
   → Admin update status (in_progress/resolved/rejected) + catatan
   → Trigger notifikasi ke warga setiap perubahan status
   → SLA per kategori dipantau di dashboard admin (lihat rules.md §5)
```

## 6. Keamanan

- **RLS Postgres** aktif di seluruh tabel berisi data pribadi (`residents`, `letters`, `letter_requests`, `complaints`) — kebijakan detail di `schema.md`.
- **Middleware Next.js** mengecek sesi & role sebelum merender rute `/admin/*`, sebagai lapisan kedua di atas RLS.
- **Enkripsi at-rest** untuk kolom sensitif (NIK) — dienkripsi di level aplikasi sebelum simpan, atau memakai `pgcrypto` di Postgres.
- **Rate limiting** pada endpoint publik (`/api/letter-requests`, `/api/complaints`) untuk mencegah spam pengajuan.
- **Validasi input** di server (Zod schema) untuk semua form, tidak hanya validasi client-side.
- **Audit trail** — trigger Postgres menulis ke `activity_logs` untuk setiap INSERT/UPDATE/DELETE di tabel sensitif.
- **Verifikasi surat** — QR code pada setiap surat mengarah ke endpoint publik read-only `/verifikasi/[kode]` yang hanya menampilkan status keabsahan, bukan data pribadi warga.

## 7. Rencana Pengerjaan (Development Plan) — Status Aktual

> **Status terkini:** Tahap 1 (Frontend) ✅ | Tahap 2 (Backend/API) ✅ | Tahap 3 (Integrasi & PDF Generate) 🏗️ sedang berjalan

### ✅ Tahap 1 — Frontend (UI dengan Data Dummy) — Selesai
Seluruh halaman publik & admin dibangun dengan data mock di `src/data/mock-data.ts`, komponen reusable di `src/components/`, routing lengkap di `src/app/`.

**Halaman Publik:** Beranda, Profil Desa, Berita & Pengumuman (+detail), Layanan Surat Online, Pengaduan Masyarakat, Galeri, Statistik Kependudukan, Kontak.

**Halaman Admin:** Dashboard, Manajemen Konten, Manajemen Kependudukan, Generate Surat (Template/Proses/Arsip/Cetak Massal), Manajemen Layanan Surat, Manajemen Pengaduan, Manajemen Pengguna, Log Aktivitas.

**Autentikasi:** Login warga, login admin, registrasi.

### ✅ Tahap 2 — Backend (API & Database) — Selesai
- Skema database — `supabase/schema.sql` (14 tabel + enum, trigger, fungsi) — didokumentasikan di `schema.md`
- RLS untuk proteksi data per role
- Seed data — `supabase/seed.sql`
- Trigger audit trail + auto-profile creation + auto-update timestamp
- Supabase Auth — `src/lib/auth.ts`, `src/lib/supabase.ts`
- Middleware proteksi route — `src/middleware.ts`
- Admin client — `src/lib/supabase-admin.ts`
- API Routes publik & admin lengkap (lihat §4 struktur folder)

### 🏗️ Tahap 3 — Integrasi & Penyempurnaan — Sedang Berjalan

**3.1 Integrasi Frontend ↔ Backend**
- [ ] Hubungkan Autentikasi (login/registrasi warga & admin, proteksi halaman sesuai role)
- [ ] Hubungkan halaman publik ke API (ganti mock): Beranda, Profil Desa, Berita
- [ ] Hubungkan Layanan Surat Online: submit form → API, tracking status realtime
- [ ] Hubungkan Pengaduan: submit + upload foto → API, tracking status realtime
- [ ] Hubungkan Galeri & Statistik ke API
- [ ] Hubungkan seluruh panel Admin ke API masing-masing

**3.2 Generate PDF & QR Code**
- [ ] Implementasi generate PDF surat (`@react-pdf/renderer` — sudah terinstall)
- [ ] Implementasi QR code verifikasi (`qrcode` — sudah terinstall) + endpoint publik `/verifikasi/[kode]`
- [ ] Generate nomor surat otomatis via endpoint (fungsi DB atomik, lihat `rules.md` §3)
- [ ] Cetak massal (batch generate)
- [ ] Preview surat sebelum unduh

**3.3 Penyempurnaan**
- [ ] Ganti semua loading/empty/error state dari dummy ke kondisi nyata
- [ ] Notifikasi in-app/email (integrasi Resend/SendGrid)
- [ ] Optimasi performa (target load < 3 detik), caching bila perlu
- [x] Install `@react-pdf/renderer` + `qrcode`
- [ ] Setup monitoring (Vercel Analytics, Sentry)
- [ ] Rate limiting endpoint publik
- [ ] Auto-save draf form (mitigasi koneksi tidak stabil)

**3.4 Testing & Deployment**
- [ ] Uji seluruh Role Matrix (PRD §11)
- [x] Unit test: logika penomoran surat, RBAC, validasi (Vitest — `src/lib/__tests__/`)
- [ ] User Acceptance Testing (UAT) bersama perangkat desa
- [ ] Deploy ke Vercel (staging → production)
- [ ] Migrasi data kependudukan awal dari sistem lama (Excel/manual)
- [ ] Pelatihan/onboarding perangkat desa
- [ ] Uji prosedur backup & restore (RPO/RTO — PRD §10)

**Output Tahap 3:** Sistem SID utuh, terintegrasi, dengan generate PDF surat + QR code, siap dipakai.

## 8. Environment Variables (Referensi)

```
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=        # hanya di server, jangan expose ke client
RESEND_API_KEY=                   # atau SENDGRID_API_KEY
SENTRY_DSN=
NEXT_PUBLIC_SITE_URL=
```

## 9. Catatan Skalabilitas

- Mulai di Supabase Free + Vercel Hobby (sesuai anggaran Fase 1 di PRD §13).
- Titik pemantauan untuk upgrade tier: jumlah baris `residents`/`letters`, ukuran Storage (foto galeri & arsip surat paling cepat tumbuh), dan jumlah invocation function per bulan.
- Karena Postgres penuh dipakai (bukan sekadar key-value), migrasi ke tier berbayar Supabase tidak memerlukan perubahan skema — hanya penyesuaian kuota.
