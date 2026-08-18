import { api } from '@/lib/api-client';
import { formatDate } from '@/lib/utils';
import { NewsItem } from '@/lib/types';
import Link from 'next/link';
import Image from 'next/image';

const services = [
  {
    title: 'Surat Online', desc: 'Ajukan berbagai jenis surat desa secara online tanpa harus datang ke kantor.',
    href: '/desa/layanan-surat', btnText: 'Ajukan Surat',
  },
  {
    title: 'Pengaduan', desc: 'Sampaikan aspirasi, keluhan, dan laporan warga untuk ditindaklanjuti.',
    href: '/desa/pengaduan', btnText: 'Sampaikan Pengaduan',
  },
  {
    title: 'Cek Status', desc: 'Lacak status pengajuan surat atau pengaduan yang telah Anda kirimkan.',
    href: '/auth/login', btnText: 'Cek Status',
  },
];

export const dynamic = 'force-dynamic';

export default async function HomePage() {
  const [news, stats] = await Promise.all([
    api.get<NewsItem[]>('/api/news').catch(() => []),
    api.get<{ totalPopulation: number; familyCardCount: number; maleCount: number; femaleCount: number }>('/api/stats').catch(() => ({
      totalPopulation: 0, familyCardCount: 0, maleCount: 0, femaleCount: 0,
    })),
  ]);

  const latestNews = (news || []).slice(0, 3);
  const s = stats || { totalPopulation: 0, familyCardCount: 0, maleCount: 0, femaleCount: 0 };

  return (
    <div>
      <section className="relative min-h-[85dvh] flex items-center overflow-hidden">
        <Image
          src="/hero-desa.png"
          alt="Lanskap perkebunan dan permukiman Desa Ujungbatu II"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0B1F18]/90 via-[#0B1F18]/55 to-[#0B1F18]/10" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B1F18]/70 via-transparent to-[#0B1F18]/20" />
        <div className="max-w-[1200px] mx-auto px-4 w-full relative z-10 py-24">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-4 py-1.5 mb-8 ring-1 ring-white/20">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-accent-gold)]" />
              <span className="text-xs font-medium text-white tracking-[0.15em] uppercase">Sistem Informasi Desa</span>
            </div>
            <h1 className="font-[family-name:var(--font-heading)] text-white text-5xl md:text-7xl leading-[1.04] tracking-[-0.04em] font-bold mb-6 drop-shadow-[0_2px_16px_rgba(0,0,0,0.35)]">
              Desa Ujungbatu II
              <span className="block text-white/85 mt-2 text-2xl md:text-4xl tracking-[-0.02em] font-semibold">
                Maju, Mandiri, dan Sejahtera.
              </span>
            </h1>
            <p className="text-base md:text-lg text-white/85 max-w-xl mb-12 leading-relaxed">
              Kec. Hutaraja Tinggi, Kab. Padang Lawas, Sumatera Utara — pelayanan administrasi desa yang transparan, cepat, dan ramah, kini dapat diakses secara online.
            </p>
            <div className="flex gap-4 flex-wrap">
              <a href="/desa/layanan-surat" className="group inline-flex items-center gap-3 bg-white text-[var(--color-primary-dark)] rounded-full pl-6 pr-1.5 py-1.5 text-sm font-semibold transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:bg-[var(--color-primary-tint)] active:scale-[0.97] shadow-[0_8px_24px_rgba(0,0,0,0.25)]">
                Ajukan Surat Online
                <span className="w-9 h-9 rounded-full bg-[var(--color-primary)] text-white flex items-center justify-center transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-x-0.5">
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                  </svg>
                </span>
              </a>
              <a href="/desa/pengaduan" className="group inline-flex items-center gap-3 bg-[var(--color-accent-clay)] text-white rounded-full pl-6 pr-1.5 py-1.5 text-sm font-medium transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:opacity-90 active:scale-[0.97] shadow-[0_8px_24px_rgba(0,0,0,0.25)]">
                Sampaikan Pengaduan
                <span className="w-9 h-9 rounded-full bg-white/15 flex items-center justify-center transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-x-0.5">
                  <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                  </svg>
                </span>
              </a>
              <a href="/desa/profil" className="group inline-flex items-center gap-3 pl-6 pr-1.5 py-1.5 rounded-full text-sm font-medium text-white border border-white/30 bg-white/10 backdrop-blur-md transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:bg-white/20 active:scale-[0.97]">
                Profil Desa
                <span className="w-9 h-9 rounded-full bg-white/15 flex items-center justify-center transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-x-0.5">
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                  </svg>
                </span>
              </a>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-[1200px] mx-auto px-4">
        <section className="py-20 md:py-28">
          <div className="text-center mb-12">
            <span className="text-xs font-medium text-[var(--color-text-muted)] tracking-[0.2em] uppercase">Data Kependudukan</span>
            <h2 className="text-3xl md:text-[40px] font-bold leading-tight mt-2">Desa dalam Angka</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {[
              { label: 'Total Penduduk', value: s.totalPopulation },
              { label: 'Kartu Keluarga', value: s.familyCardCount },
              { label: 'Laki-laki', value: s.maleCount },
              { label: 'Perempuan', value: s.femaleCount },
            ].map((item, i) => (
              <div key={i} className="bg-black/[0.03] p-[1px] rounded-[1.5rem] transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:shadow-[0_8px_32px_rgba(26,28,24,0.08)]">
                <div className="bg-[var(--color-surface)] rounded-[calc(1.5rem-1px)] p-6 md:p-8 text-center shadow-[inset_0_1px_1px_rgba(255,255,255,0.8)]">
                  <div className="w-10 h-10 rounded-full bg-[var(--color-primary-tint)] flex items-center justify-center mx-auto mb-4">
                    <svg className="w-5 h-5 text-[var(--color-primary)]" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
                    </svg>
                  </div>
                  <div className="text-3xl md:text-4xl font-bold text-[var(--color-primary)] font-[family-name:var(--font-heading)]">{item.value.toLocaleString('id-ID')}</div>
                  <div className="text-sm text-[var(--color-text-muted)] mt-1">{item.label}</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="py-20 md:py-28">
          <div className="text-center mb-12">
            <span className="text-xs font-medium text-[var(--color-text-muted)] tracking-[0.2em] uppercase">Layanan</span>
            <h2 className="text-3xl md:text-[40px] font-bold leading-tight mt-2">Layanan Desa Online</h2>
            <p className="text-[var(--color-text-muted)] mt-3 max-w-lg mx-auto">Ajukan surat keterangan dan layanan administrasi desa secara online dengan mudah dan cepat.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {services.map((item, i) => (
              <div key={i} className="bg-black/[0.03] p-[1px] rounded-[1.75rem] transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:shadow-[0_8px_32px_rgba(26,28,24,0.08)]">
                <div className="bg-[var(--color-surface)] rounded-[calc(1.75rem-1px)] p-8 md:p-10 text-center shadow-[inset_0_1px_1px_rgba(255,255,255,0.8)]">
                  <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
                  <p className="text-sm text-[var(--color-text-muted)] mb-8">{item.desc}</p>
                  <a href={item.href} className="group inline-flex items-center gap-3 bg-[var(--color-primary)] text-white rounded-full px-5 py-2.5 text-sm font-medium transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:bg-[var(--color-primary-dark)] active:scale-[0.97]">
                    {item.btnText}
                    <span className="w-6 h-6 rounded-full bg-white/15 flex items-center justify-center transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-x-0.5">
                      <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                      </svg>
                    </span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="py-20 md:py-28">
          <div className="flex items-end justify-between mb-10">
            <div>
              <span className="text-xs font-medium text-[var(--color-text-muted)] tracking-[0.2em] uppercase">Berita</span>
              <h2 className="text-3xl md:text-[40px] font-bold leading-tight mt-2">Informasi Terbaru</h2>
            </div>
            <Link href="/desa/berita" className="hidden md:inline-flex items-center gap-2 text-sm font-medium text-[var(--color-primary)] hover:text-[var(--color-primary-dark)] transition-colors duration-300">
              Lihat Semua
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
              </svg>
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {latestNews.length === 0 ? (
              <div className="md:col-span-3 text-center py-16 text-[var(--color-text-muted)] bg-black/[0.02] rounded-[1.75rem]">
                <p className="font-medium">Belum ada berita</p>
              </div>
            ) : latestNews.map((item: NewsItem) => (
              <Link key={item.id} href={`/desa/berita/${item.slug}`}>
                <div className="bg-black/[0.03] p-[1px] rounded-[1.75rem] transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:shadow-[0_8px_32px_rgba(26,28,24,0.08)] h-full">
                  <div className="bg-[var(--color-surface)] rounded-[calc(1.75rem-1px)] overflow-hidden shadow-[inset_0_1px_1px_rgba(255,255,255,0.8)] h-full flex flex-col">
                    <div className="relative h-44 overflow-hidden bg-[var(--color-primary-dark)]">
                      {item.coverImageUrl ? (
                        <Image
                          src={item.coverImageUrl}
                          alt={item.title}
                          fill
                          sizes="(max-width: 768px) 100vw, 33vw"
                          className="object-cover"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-primary-dark)]" />
                      )}
                    </div>
                    <div className="p-6 flex flex-col flex-1">
                      <div className="flex items-center gap-2 mb-3">
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-[var(--color-primary-tint)] text-[var(--color-primary)] font-medium uppercase tracking-wider">{item.category}</span>
                        <span className="text-xs text-[var(--color-text-muted)]">{formatDate(item.publishedAt)}</span>
                      </div>
                      <h3 className="font-semibold text-base leading-snug mb-2">{item.title}</h3>
                      <p className="text-sm text-[var(--color-text-muted)] line-clamp-2 mt-auto">{item.excerpt}</p>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
