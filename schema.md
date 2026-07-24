# Database Schema
# Sistem Informasi Desa (SID) — Desa Ujungbatu II

**Versi:** 1.0 · **Database:** Postgres (Supabase) · **Terkait:** `architecture.md`, `rules.md`
**Sumber implementasi:** `supabase/schema.sql` (skema), `supabase/seed.sql` (data awal)

> Dokumen ini mendokumentasikan struktur 14 tabel inti + enum, trigger, dan fungsi yang disebut pada PRD §17/Tahap 2. Tipe kolom dan nama constraint bersifat referensi desain — sesuaikan dengan `schema.sql` aktual bila terdapat perbedaan penamaan.

---

## 1. ERD (Ringkas, Tekstual)

```
profiles ──< letter_requests >── letter_types ──< letter_templates
   │              │                                      │
   │              └──> letters <──────────────────────────┘
   │
   ├──< complaints
   ├──< news
   ├──< gallery_items
   ├──< activity_logs
   └── residents (1:1 opsional, warga terverifikasi)

village_profile (singleton)
organization_structure ──> profiles (opsional, jika pengurus adalah user sistem)
complaint_categories ──< complaints
notifications ──> profiles
settings (singleton/key-value)
```

## 2. Enum

| Enum | Nilai |
|---|---|
| `user_role` | `warga`, `operator`, `admin`, `kepala_desa` |
| `letter_request_status` | `pending`, `verified`, `approved`, `rejected`, `completed` |
| `complaint_status` | `received`, `in_progress`, `resolved`, `rejected` |
| `content_status` | `draft`, `published`, `archived` |

## 3. Tabel Inti

### 3.1 `profiles`
Perluasan `auth.users` Supabase — 1:1 dengan akun autentikasi.
| Kolom | Tipe | Keterangan |
|---|---|---|
| `id` | uuid PK, FK → `auth.users.id` | |
| `full_name` | text | |
| `email` | text | |
| `phone` | text | |
| `role` | `user_role` | default `warga` |
| `resident_id` | uuid FK → `residents.id` nullable | tautan ke data kependudukan jika warga terverifikasi |
| `created_at` / `updated_at` | timestamptz | |

Trigger: `handle_new_user()` — auto-insert ke `profiles` saat ada baris baru di `auth.users` (auto-profile creation, sesuai PRD §17).

### 3.2 `residents` (Data Kependudukan)
| Kolom | Tipe | Keterangan |
|---|---|---|
| `id` | uuid PK | |
| `nik` | text unique, **terenkripsi/masked di layer aplikasi** | 16 digit |
| `kk_number` | text | Nomor Kartu Keluarga |
| `full_name` | text | |
| `birth_place` / `birth_date` | text / date | |
| `gender` | text | |
| `address` | text | |
| `dusun` | text | untuk statistik agregat per dusun |
| `occupation` | text | untuk statistik agregat per pekerjaan |
| `religion`, `marital_status` | text | |
| `family_role` | text | kepala keluarga / anggota |
| `created_by` / `updated_by` | uuid FK → `profiles.id` | untuk audit |
| `created_at` / `updated_at` | timestamptz | |

RLS: hanya `operator`, `admin`, `kepala_desa` (read) yang dapat SELECT; hanya `admin` (dan `operator` terbatas, lihat `rules.md` §2) dapat INSERT/UPDATE. Tidak ada akses publik.

### 3.3 `village_profile`
Singleton — profil desa (visi misi, sejarah, struktur ringkas, koordinat peta).
| Kolom | Tipe |
|---|---|
| `id` | uuid PK (baris tunggal) |
| `village_name`, `history`, `vision`, `mission` | text |
| `map_lat`, `map_lng` | numeric |
| `updated_at` | timestamptz |

### 3.4 `organization_structure`
| Kolom | Tipe | Keterangan |
|---|---|---|
| `id` | uuid PK | |
| `name` | text | Nama pejabat/pengurus |
| `position` | text | Jabatan (Kepala Desa, Sekretaris, Kaur, dst) |
| `order_index` | int | urutan tampil struktur organisasi |
| `photo_url` | text | |

### 3.5 `news` (Berita & Pengumuman)
| Kolom | Tipe | Keterangan |
|---|---|---|
| `id` | uuid PK | |
| `title`, `slug`, `content`, `excerpt` | text | |
| `category` | text | berita / pengumuman |
| `cover_image_url` | text | |
| `status` | `content_status` | |
| `author_id` | uuid FK → `profiles.id` | |
| `published_at` / `created_at` / `updated_at` | timestamptz | |

### 3.6 `gallery_items`
| Kolom | Tipe |
|---|---|
| `id` | uuid PK |
| `title`, `description` | text |
| `media_url`, `media_type` (image/video) | text |
| `event_date` | date |
| `created_at` | timestamptz |

### 3.7 `complaint_categories`
| Kolom | Tipe |
|---|---|
| `id` | uuid PK |
| `name` | text (mis. Infrastruktur, Kebersihan, Keamanan, Lainnya) |
| `default_sla_days` | int — target hari penyelesaian (lihat `rules.md` §5) |

### 3.8 `complaints`
| Kolom | Tipe | Keterangan |
|---|---|---|
| `id` | uuid PK | |
| `reporter_id` | uuid FK → `profiles.id` | |
| `category_id` | uuid FK → `complaint_categories.id` | |
| `description`, `location` | text | |
| `attachment_urls` | text[] | Supabase Storage bucket `attachments` |
| `status` | `complaint_status` | |
| `response_notes` | text | catatan tindak lanjut admin |
| `handled_by` | uuid FK → `profiles.id` nullable | |
| `created_at` / `resolved_at` | timestamptz | |

RLS: warga hanya SELECT baris miliknya sendiri (`reporter_id = auth.uid()`); admin/operator SELECT semua sesuai kategori tugasnya.

### 3.9 `letter_types` (Jenis Surat)
| Kolom | Tipe | Keterangan |
|---|---|---|
| `id` | uuid PK | |
| `code` | text unique | mis. `SKD`, `SKU`, `SKTM` |
| `name` | text | Surat Keterangan Domisili, dst |
| `number_format` | text | pola nomor surat, lihat `rules.md` §3 |
| `requires_attachment` | boolean | |

Seed awal (`seed.sql`): Surat Keterangan Domisili, Surat Keterangan Usaha, Pengantar KTP, Pengantar KK, Pengantar Nikah, Surat Keterangan Tidak Mampu, Surat Keterangan Kematian, Surat Keterangan Pindah.

### 3.10 `letter_templates`
| Kolom | Tipe | Keterangan |
|---|---|---|
| `id` | uuid PK | |
| `letter_type_id` | uuid FK → `letter_types.id` | |
| `header_html` | text | kop surat |
| `body_template` | text | isi surat dengan placeholder `{{nama}}`, `{{nik}}`, dst |
| `footer_html` | text | blok tanda tangan/QR |
| `version` | int | riwayat versi template |
| `is_active` | boolean | hanya 1 versi aktif per jenis surat |
| `created_by` | uuid FK → `profiles.id` | |
| `created_at` | timestamptz | |

### 3.11 `letter_requests` (Pengajuan Surat)
| Kolom | Tipe | Keterangan |
|---|---|---|
| `id` | uuid PK | |
| `requester_id` | uuid FK → `profiles.id` | |
| `letter_type_id` | uuid FK → `letter_types.id` | |
| `purpose` | text | keperluan surat |
| `additional_data` | jsonb | data tambahan spesifik jenis surat |
| `attachment_urls` | text[] | |
| `status` | `letter_request_status` | |
| `verified_by` / `approved_by` | uuid FK → `profiles.id` nullable | |
| `rejection_reason` | text nullable | |
| `created_at` / `updated_at` | timestamptz | |

### 3.12 `letters` (Arsip Surat Terbit)
| Kolom | Tipe | Keterangan |
|---|---|---|
| `id` | uuid PK | |
| `letter_request_id` | uuid FK → `letter_requests.id` nullable | nullable untuk surat massal tanpa pengajuan individual |
| `letter_number` | text unique | nomor resmi hasil fungsi penomoran atomik |
| `letter_type_id` | uuid FK → `letter_types.id` | |
| `resident_id` | uuid FK → `residents.id` | |
| `pdf_url` | text | Supabase Storage bucket `letters` |
| `qr_code` | text | kode unik verifikasi |
| `issued_by` | uuid FK → `profiles.id` | |
| `issued_at` | timestamptz | |
| `is_batch` | boolean | true jika hasil cetak massal |

### 3.13 `activity_logs` (Audit Trail)
| Kolom | Tipe | Keterangan |
|---|---|---|
| `id` | uuid PK | |
| `actor_id` | uuid FK → `profiles.id` | |
| `action` | text | `create`, `update`, `delete`, `generate_letter`, dst |
| `table_name` | text | |
| `record_id` | uuid | |
| `diff` | jsonb | perubahan before/after (untuk update) |
| `created_at` | timestamptz | |

Diisi otomatis via trigger `log_activity()` pada tabel sensitif (`residents`, `letters`, `letter_requests`, `complaints`, `profiles.role`).

### 3.14 `notifications`
| Kolom | Tipe | Keterangan |
|---|---|---|
| `id` | uuid PK | |
| `recipient_id` | uuid FK → `profiles.id` | |
| `title`, `body` | text | |
| `type` | text | `letter_status`, `complaint_status`, `announcement` |
| `is_read` | boolean | |
| `related_id` | uuid nullable | id record terkait (letter_request/complaint) |
| `created_at` | timestamptz | |

## 4. Trigger & Fungsi Kunci

| Nama | Jenis | Fungsi |
|---|---|---|
| `handle_new_user()` | Trigger (`AFTER INSERT auth.users`) | Auto-create baris `profiles` |
| `set_updated_at()` | Trigger (`BEFORE UPDATE`) | Auto-update kolom `updated_at` di semua tabel relevan |
| `log_activity()` | Trigger (`AFTER INSERT/UPDATE/DELETE`) | Tulis ke `activity_logs` |
| `generate_letter_number(letter_type_id)` | Fungsi (SQL, `SECURITY DEFINER`) | Increment nomor surat secara atomik per jenis surat per tahun — lihat `rules.md` §3 untuk format & aturan race-condition |
| `notify_status_change()` | Trigger (`AFTER UPDATE` pada `letter_requests`/`complaints`) | Insert ke `notifications` saat kolom `status` berubah |

## 5. Row Level Security (Ringkasan Kebijakan)

| Tabel | Warga | Operator | Admin | Kepala Desa |
|---|---|---|---|---|
| `residents` | - | SELECT, UPDATE terbatas | ALL | SELECT |
| `letter_requests` | SELECT/INSERT milik sendiri | SELECT/UPDATE semua | ALL | SELECT |
| `letters` | SELECT milik sendiri (via `resident_id`) | SELECT, INSERT (generate) | ALL | SELECT |
| `letter_templates` | - | SELECT | ALL | SELECT |
| `complaints` | SELECT/INSERT milik sendiri | SELECT/UPDATE sesuai kategori | ALL | SELECT |
| `news`, `gallery_items`, `village_profile` | SELECT (published) | - | ALL | SELECT |
| `profiles` (role) | SELECT/UPDATE profil sendiri (bukan `role`) | - | ALL | SELECT |
| `activity_logs` | - | - | SELECT | SELECT |

Kebijakan detail (SQL policy per tabel) diimplementasikan di `supabase/schema.sql`; tabel di atas adalah ringkasan untuk keperluan desain dan review non-teknis.

## 6. Indeks Penting

- `residents(nik)` — unique index, untuk pencarian cepat saat auto-fill.
- `letters(letter_number)` — unique index, mencegah duplikasi nomor.
- `letter_requests(status, created_at)` — index komposit untuk dashboard admin.
- `complaints(status, category_id)` — index komposit untuk filter & SLA monitoring.
- `news(status, published_at)` — index untuk listing publik terurut.

## 7. Catatan Migrasi Data Awal

Sesuai `architecture.md` §7 Tahap 3.4, migrasi data kependudukan dari Excel/manual ke tabel `residents` perlu skrip impor terpisah (`scripts/import-residents.ts`) dengan validasi NIK 16 digit dan deduplikasi berdasarkan `nik` sebelum insert massal.
