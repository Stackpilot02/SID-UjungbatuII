# Design System
# Sistem Informasi Desa (SID) — Desa Ujungbatu II

**Versi:** 2.0 (Redesign) · **Terkait:** `prd.md` §9, `architecture.md`

---

## 0. Versi 3.0 — Redesign "Soft Structuralism" (Agustus 2026)

> Perubahan besar: **texture/grain background dihapus total**, palet warna diperbarui ke *Soft Structuralism* (latar bersih silver-putih, aksen hijau-emas modern), dan komponen ditingkatkan ke arsitektur *double-bezel* (outer shell + inner core) serta CTA *button-in-button*. Detail arketipe mengikuti skill `high-end-visual-design`.

### 0.1 Arah
- Latar halaman bersih `#F5F6F4` — **tanpa** grain/texture/radial-gradient (sebelumnya dihapus dari `globals.css`).
- Tipografi Grotesk tegas (Plus Jakarta Sans) untuk heading; DM Sans untuk body; Playfair Display tetap untuk angka/surat.
- Card & container memakai *double-bezel*: outer shell `bg-black/[0.03] p-[1px] rounded-[1.5rem]` + inner core `bg-surface` dengan highlight `inset`.
- CTA memakai pola *button-in-button*: ikon panah dalam lingkaran putih/transparan di dalam pill.
- Semua transisi memakai `cubic-bezier(0.32,0.72,0,1)`; tombol ditekan dengan `active:scale-[0.97]`.

### 0.2 Token Warna Terbaru
| Token | Hex Baru | Catatan |
|---|---|---|
| `--color-primary` | `#1B4D3E` | Hijau hutan modern (lebih dalam dari v2) |
| `--color-primary-dark` | `#0F2E25` | Hover/state gelap |
| `--color-primary-tint` | `#E9F1ED` | Latar badge/section hijau lembut |
| `--color-accent-clay` | `#A64B2A` | CTA sekunder (pengaduan) |
| `--color-accent-gold` | `#C4942B` | Aksen highlight |
| `--color-bg` | `#F5F6F4` | Latar halaman — bersih, tanpa texture |
| `--color-surface` | `#FFFFFF` | Card/form/modal |
| `--color-border` | `#E4E7E3` | Border halus |
| `--color-text` | `#1A1F1C` | Teks utama |
| `--color-text-muted` | `#5F6B64` | Teks sekunder |
| `--color-success` / `--color-warning` / `--color-danger` | `#2E7D4F` / `#C4942B` / `#B23A2E` | Status |

### 0.3 Perubahan Header & Footer
- Header: floating pill glass putih (`bg-white/85 backdrop-blur-2xl border-black/[0.06]`), logo **SID.Ujungbatu II** dengan titik emas, CTA "Masuk" bergaya button-in-button.
- Footer: latar putih, border atas `black/[0.06]`, tipografi yang dirapikan.

### 0.4 Komponen
- `Card` kini menerima prop `innerClassName` (untuk kasus `p-0 overflow-hidden`, mis. galeri/table admin).
- `Button` semua varian menjadi pill `rounded-full` dengan `active:scale-[0.97]`.
- `Badge` memakai ring halus `ring-black/[0.04]`.

> Dokumen v2.0 di bawah tetap dipertahankan sebagai referensi historis. Token yang berlaku adalah §0.2.

## 1. Arah & Rasional

Desain lama menggunakan palet "biru/hijau instansi" generik — sah, tapi tidak berbeda dari ribuan situs pemerintah lain, dan tidak mencerminkan tempat spesifik: Desa Ujungbatu II, Kec. Hutaraja Tinggi, Kab. Padang Lawas, Sumatera Utara — wilayah perkebunan (karet & sawit), dengan latar budaya Batak Angkola dan tradisi tenun (ulos/gorga) Sumatera Utara.

**Prinsip redesign:**
- **Formal namun ramah** tetap dipertahankan (audiensnya warga lintas usia, termasuk lansia) — tapi "formal" dicapai lewat kerapian tipografi dan struktur, bukan lewat warna biru pemerintahan yang dingin.
- Identitas warna diambil dari **lanskap & budaya lokal**: hijau ladang/perkebunan sebagai warna utama, tanah liat dan emas panen sebagai aksen — bukan palet biru korporat.
- Motif garis geometris terinspirasi **tenun tradisional Sumatera Utara** dipakai sangat tipis dan terbatas sebagai elemen tanda tangan (signature), bukan dekorasi berlebihan.
- Aksesibilitas untuk warga lanjut usia tetap prioritas: kontras tinggi, ukuran teks besar, tap target lega.

## 2. Token Warna

| Token | Hex | Penggunaan |
|---|---|---|
| `--color-primary` (Hijau Ladang) | `#1F4D3D` | Header, navigasi, tombol aksi utama, link |
| `--color-primary-dark` | `#14332A` | Hover/active state tombol utama, teks di atas latar terang |
| `--color-primary-tint` | `#E4EDE8` | Latar badge/section lembut bernuansa hijau |
| `--color-accent-clay` (Tanah Liat) | `#A64B2A` | Aksen sekunder, tombol "Ajukan Pengaduan", tautan penting — dipakai terbatas |
| `--color-accent-gold` (Emas Panen) | `#C9A227` | Highlight status penting, garis motif signature, ikon unggulan |
| `--color-bg` (Kertas) | `#F6F7F3` | Latar halaman utama (putih kehijauan sejuk, bukan krem hangat) |
| `--color-surface` | `#FFFFFF` | Card, form, modal |
| `--color-border` | `#DCE1DA` | Garis pemisah, border input |
| `--color-text` | `#1B2420` | Teks utama |
| `--color-text-muted` | `#5B6B62` | Teks sekunder, keterangan |
| `--color-success` | `#2E7D4F` | Status "Selesai" |
| `--color-warning` | `#C9A227` | Status "Diproses" |
| `--color-danger` | `#B23A2E` | Status "Ditolak", validasi error |
| `--color-info` | `#2C6E8E` | Info netral, tooltip |

> Catatan implementasi: seluruh warna didefinisikan sebagai CSS variable/token Tailwind (`theme.extend.colors`), bukan hex literal tersebar di komponen, agar mudah disesuaikan bila desa memiliki warna identitas/logo resmi (lihat PRD §9 catatan lama).

**Kontras:** kombinasi `--color-primary` di atas `--color-bg`/`--color-surface` memenuhi rasio ≥ 4.5:1 (WCAG AA). `--color-accent-gold` **tidak** dipakai sebagai warna teks di atas latar terang (kontras rendah) — hanya sebagai fill ikon, border, atau latar badge dengan teks gelap di atasnya.

## 3. Tipografi

| Peran | Font | Alasan |
|---|---|---|
| Display/Heading | **Plus Jakarta Sans** (600–700) | Sans-serif geometris berkarakter, tegas untuk judul; dibuat oleh studio Indonesia — cocok secara tematik untuk platform pemerintah desa Indonesia |
| Body | **Inter** (400–500) | Sangat terbaca di ukuran kecil maupun besar, ramah untuk pengguna lansia |
| Data/Angka (nomor surat, NIK, tanggal di dokumen) | **IBM Plex Mono** (400) | Angka tabular jelas, mengurangi salah baca digit pada NIK/nomor surat |

**Skala tipe (base 16px):**
| Level | Ukuran | Line-height | Weight |
|---|---|---|---|
| Display (H1 hero) | 40px / 32px mobile | 1.2 | 700 |
| H2 | 28px | 1.3 | 700 |
| H3 | 22px | 1.35 | 600 |
| Body besar | 18px | 1.6 | 400 |
| Body (default) | 16px | 1.6 | 400 |
| Kecil/caption | 14px | 1.5 | 500 |

Ukuran body **tidak boleh** di bawah 16px di seluruh halaman publik (aksesibilitas lansia — PRD §10).

## 4. Layout & Spacing

- Grid 12 kolom, max-width konten publik `1200px`, admin `1440px`.
- Skala spacing berbasis 4px: `4, 8, 12, 16, 24, 32, 48, 64, 96`.
- Card berbasis `radius: 12px`, shadow lembut (`0 1px 2px rgba(27,36,32,0.06), 0 4px 12px rgba(27,36,32,0.04)`), bukan shadow tajam ala default framework.
- Navigasi utama publik: Beranda, Profil Desa, Layanan, Berita, Pengaduan, Galeri, Kontak — sticky header dengan latar `--color-primary`, teks putih.
- Admin: sidebar tetap kiri (`--color-primary-dark`), konten di kanan dengan latar `--color-bg`.

## 5. Elemen Tanda Tangan (Signature)

**Motif garis tenun** — pola garis diagonal berulang tipis (terinspirasi motif gorga/ulos, disederhanakan menjadi garis geometris, bukan reproduksi motif adat yang sesungguhnya agar tetap netral dan tidak salah kaprah secara budaya) dipakai sebagai:
- Garis tipis 4px di batas atas header (gradasi `--color-primary` → `--color-accent-gold` → `--color-accent-clay`).
- Elemen dekoratif sangat halus di footer, opacity rendah (~8%), tidak mengganggu keterbacaan.
- **Tidak** dipakai berulang di dalam card atau form — disiplin: satu elemen berani, sekitarnya tenang.

## 6. Komponen

### Tombol
| Varian | Style |
|---|---|
| Primary | Latar `--color-primary`, teks putih, radius 8px, hover → `--color-primary-dark` |
| Secondary (outline) | Border `--color-primary`, teks `--color-primary`, latar transparan |
| Aksen (Ajukan Pengaduan, dsb) | Latar `--color-accent-clay`, teks putih — dipakai untuk 1 CTA sekunder per halaman, tidak diulang |
| Danger | Latar `--color-danger`, teks putih (tolak pengajuan, hapus data) |

Label tombol selalu deskriptif: **"Ajukan Surat"**, **"Lihat Status Pengajuan"**, **"Unduh Surat (PDF)"** — bukan ikon polos atau "Submit".

### Badge Status
| Status | Warna |
|---|---|
| Menunggu Verifikasi | Latar `--color-bg` abu, teks `--color-text-muted` |
| Diproses | Latar tint emas, teks `--color-primary-dark` |
| Selesai | Latar tint hijau (`--color-primary-tint`), teks `--color-success` |
| Ditolak | Latar tint merah muda, teks `--color-danger` |

### Form
- Input dengan border `--color-border`, focus ring `--color-primary` 2px.
- Validasi real-time inline, pesan error dalam bahasa jelas ("NIK harus 16 digit angka", bukan "Invalid input").
- Auto-save draf untuk form pengajuan surat/pengaduan (indikator kecil "Draf tersimpan otomatis").

### Ikonografi
- Set ikon: **Lucide Icons**, stroke width 1.75, konsisten di seluruh halaman.
- Ikon selalu didampingi label teks di navigasi utama (tidak ada ikon berdiri sendiri tanpa keterangan).

## 7. Responsivitas & Aksesibilitas

- Mobile-first; breakpoint Tailwind default (`sm 640 / md 768 / lg 1024 / xl 1280`).
- Tap target minimal 44×44px.
- Kontras warna minimal WCAG AA untuk seluruh teks & komponen interaktif.
- Fokus keyboard terlihat jelas (outline 2px `--color-accent-gold` di atas latar gelap, `--color-primary` di atas latar terang).
- Animasi/transisi dibatasi (150–200ms, easing halus), hormati preferensi `prefers-reduced-motion`.
- Semua gambar (galeri, foto pengaduan) memiliki alt text; dokumen PDF surat memakai struktur teks yang dapat dibaca pembaca layar.

## 8. Motion (Ringkas)

- Transisi halaman: fade sederhana 150ms, tidak ada animasi besar yang memperlambat persepsi kecepatan pada koneksi lambat.
- Micro-interaction: perubahan status badge memakai transisi warna halus 200ms saat data diperbarui secara realtime.
- Tidak ada animasi hero berlebihan di beranda — kredibilitas institusi pemerintah desa diutamakan di atas kesan "flashy".

## 9. Contoh Palet dalam Konteks (Referensi Cepat)

```
Header/Nav:      #1F4D3D (teks putih)
Latar halaman:   #F6F7F3
Card:            #FFFFFF, border #DCE1DA
CTA utama:       #1F4D3D → hover #14332A
CTA sekunder:    #A64B2A
Badge "Selesai": latar #E4EDE8, teks #2E7D4F
Badge "Diproses":latar #FBF3DC, teks #14332A
Badge "Ditolak": latar #F7E4E1, teks #B23A2E
Garis signature: gradasi #1F4D3D → #C9A227 → #A64B2A
```
