# Business Rules
# Sistem Informasi Desa (SID) — Desa Ujungbatu II

**Versi:** 1.0 · **Terkait:** `prd.md`, `schema.md`, `architecture.md`

---

## 1. Aturan Umum

- Seluruh waktu disimpan dalam UTC di database, ditampilkan dalam WIB (`Asia/Jakarta`) di UI.
- Seluruh aksi yang mengubah data sensitif (`residents`, `letters`, `letter_requests`, `complaints`, perubahan `role`) **wajib** tercatat di `activity_logs` — tidak boleh ada bypass, termasuk oleh Super Admin.
- Soft delete diterapkan pada `news`, `gallery_items` (status `archived`), **bukan** hard delete — agar riwayat tetap tersedia untuk audit. `residents` dan `letters` tidak pernah dihapus, hanya dapat diberi status non-aktif.

## 2. Hak Akses (Detail Permission)

Perluasan Role Matrix di `prd.md` §11:

| Aksi | Warga | Operator | Admin | Kepala Desa |
|---|---|---|---|---|
| Ajukan surat/pengaduan | ✅ (milik sendiri) | - | - | - |
| Lihat status pengajuan sendiri | ✅ | - | - | - |
| Verifikasi pengajuan surat | - | ✅ | ✅ | - |
| Approve/reject pengajuan surat | - | ❌ (hanya verifikasi) | ✅ | - |
| Generate & terbitkan surat | - | ✅ (setelah admin approve) | ✅ | - |
| Cetak massal | - | ❌ | ✅ | - |
| Buat/ubah template surat | - | ❌ | ✅ | 👁️ lihat saja |
| CRUD data penduduk (`residents`) | - | ✅ tambah & ubah data non-kritis (alamat, pekerjaan) | ✅ penuh termasuk NIK/KK | 👁️ |
| Hapus/nonaktifkan akun pengguna | - | ❌ | ✅ | - |
| Ubah role pengguna lain | - | ❌ | ✅ (kecuali menjadikan diri sendiri Super Admin tanpa approval berlapis) | - |
| Lihat log aktivitas | - | ❌ | ✅ | 👁️ |
| Lihat dashboard/laporan | - | ✅ (statistik unit kerja sendiri) | ✅ penuh | ✅ penuh |

**Aturan eskalasi:** Operator **tidak dapat** menyetujui (approve) pengajuan suratnya sendiri yang diajukan atas nama dirinya sebagai warga (pemisahan tugas/segregation of duties) — approval untuk kasus ini wajib oleh Admin.

## 3. Aturan Penomoran Surat Otomatis

- **Format:** `{urutan}/{kode_jenis_surat}/{kode_desa}/{bulan_romawi}/{tahun}`
  Contoh: `012/SKD/UB-II/VII/2026`
- **Urutan (`{urutan}`)** di-reset ke `001` setiap awal tahun, terpisah per jenis surat (SKD punya urutannya sendiri, SKU punya urutannya sendiri, dst).
- **Atomisitas:** nomor diambil melalui fungsi database `generate_letter_number()` yang menggunakan lock baris (`SELECT ... FOR UPDATE`) atau sequence Postgres per jenis surat, **bukan** dihitung di sisi aplikasi — mencegah duplikasi saat dua admin memproses surat bersamaan.
- Nomor yang sudah terbit **tidak boleh** dipakai ulang meskipun surat terkait kemudian dibatalkan; surat batal ditandai berstatus tidak berlaku, nomor tetap tercatat di arsip untuk menjaga urutan yang tidak terputus.
- Cetak massal menghasilkan nomor berurutan sesuai antrian pemrosesan dalam satu batch (bukan diambil serentak) untuk menghindari nomor bentrok.

## 4. Aturan Generate Surat

- Template yang dipakai untuk generate **wajib** berstatus `is_active = true`; hanya ada 1 template aktif per jenis surat pada satu waktu.
- Perubahan pada template tidak memengaruhi surat yang sudah terbit sebelumnya (surat lama tetap merujuk versi template saat diterbitkan, dicatat di `letter_templates.version`).
- Data yang di-auto-fill wajib divalidasi kelengkapannya (NIK, nama, alamat tidak boleh kosong) sebelum tombol "Generate Surat" aktif — jika data penduduk tidak lengkap, sistem mengarahkan admin untuk melengkapi data di `residents` terlebih dahulu.
- Setiap surat yang di-generate otomatis mendapat QR code unik yang tertaut ke endpoint verifikasi publik read-only (`/verifikasi/[kode]`) — endpoint ini **hanya** menampilkan nomor surat, jenis surat, tanggal terbit, dan status "Sah/Tidak Ditemukan", tidak menampilkan data pribadi (NIK, alamat) warga.
- Template surat baru atau perubahan template **wajib** direview dan disetujui oleh Admin (idealnya sekretaris desa) sebelum diaktifkan — mitigasi risiko "template tidak sesuai regulasi" (PRD §14).

## 5. Aturan Pengaduan & SLA

| Kategori (contoh) | Target SLA Tindak Lanjut Awal | Target SLA Penyelesaian |
|---|---|---|
| Keamanan | 1 hari kerja | 3 hari kerja |
| Infrastruktur | 2 hari kerja | 7 hari kerja |
| Kebersihan | 2 hari kerja | 5 hari kerja |
| Lainnya | 3 hari kerja | 10 hari kerja |

- SLA dihitung sejak `complaints.created_at` hingga `status` pertama kali berubah ke `in_progress` (tindak lanjut awal) dan hingga `resolved`/`rejected` (penyelesaian).
- Pengaduan yang melewati SLA tanpa perubahan status ditandai "Terlambat" di dashboard admin (indikator visual, bukan pemblokiran).
- Warga wajib menerima notifikasi pada **setiap** perubahan status, termasuk saat status berubah menjadi `rejected` — disertai `response_notes` yang menjelaskan alasan.
- Kategori & SLA default dapat diubah oleh Admin melalui `complaint_categories` tanpa perubahan kode (data-driven).

## 6. Aturan Validasi Data

| Field | Aturan |
|---|---|
| NIK | Wajib 16 digit angka, unik di tabel `residents` |
| Nomor KK | Wajib 16 digit angka |
| Nomor telepon | Format Indonesia (`08xxxxxxxxxx` atau `+62xxxxxxxxxx`) |
| Email | Format email valid, wajib untuk akun admin/operator; opsional untuk warga (fallback notifikasi in-app) |
| Lampiran pengaduan/surat | Maks. 5MB per file, format JPG/PNG/PDF |
| Tanggal lahir | Tidak boleh di masa depan; usia dihitung otomatis untuk statistik agregat |

Validasi dijalankan **di server** (bukan hanya client) menggunakan schema validation (mis. Zod) sebelum data masuk database — lihat `architecture.md` §6 Keamanan.

## 7. Aturan Notifikasi

- Kanal Fase 1: in-app (`notifications` table) + email. WhatsApp/SMS di luar cakupan Fase 1 (lihat `prd.md` §16).
- Notifikasi dikirim untuk peristiwa berikut:
  - Pengajuan surat: submitted → verified → approved/rejected → completed
  - Pengaduan: received → in_progress → resolved/rejected
  - Pengumuman baru dipublikasikan (opsional, broadcast ke warga terdaftar — Should, bukan Must)
- Notifikasi tidak boleh menyertakan data pribadi sensitif penuh di badan email (mis. NIK utuh) — cukup nomor referensi pengajuan/pengaduan dan tautan aman ke sistem (memerlukan login).

## 8. Aturan Privasi & Retensi Data

- Data agregat (statistik kependudukan publik) **wajib** dikelompokkan minimal per dusun/kategori dengan ambang jumlah minimum (mis. tidak menampilkan angka jika jumlah dalam kelompok < 5 orang) untuk mencegah re-identifikasi individu.
- Akses ke tabel `residents` penuh (termasuk NIK) dibatasi role `admin` dan `operator` sesuai §2; tidak pernah diekspos lewat API publik.
- Data pengaduan yang memuat informasi pribadi pelapor hanya dapat dilihat oleh pelapor sendiri dan admin/operator terkait kategori — tidak ditampilkan publik meskipun statusnya "Selesai".
- Retensi arsip surat & data kependudukan mengikuti PRD §10 (masa jabatan admin berlaku + 5 tahun); penghapusan permanen (jika suatu saat diperlukan sesuai regulasi) memerlukan persetujuan berlapis (Admin + Kepala Desa) dan dicatat di `activity_logs` sebelum eksekusi.

## 9. Aturan Konten Publik (CMS)

- Berita/pengumuman berstatus `draft` tidak tampil di halaman publik; hanya `published` yang tampil, terurut berdasarkan `published_at` terbaru.
- Konten yang diarsipkan (`archived`) tetap tersimpan untuk riwayat tapi tidak muncul di listing maupun pencarian publik.
- Galeri: media yang diunggah wajib memiliki `event_date` untuk pengurutan kronologis kegiatan desa.

## 10. Aturan Eskalasi Insiden Teknis

- Kegagalan generate PDF (mis. error render template) tidak boleh mengubah status `letter_requests` menjadi `completed` — status tetap `approved` hingga proses generate berhasil, agar tidak ada surat "hilang" secara status meski file belum tersedia.
- Kegagalan pengiriman notifikasi email tidak menghalangi proses utama (surat tetap terbit/pengaduan tetap tercatat) — notifikasi gagal dicatat untuk retry, bukan blocking.
