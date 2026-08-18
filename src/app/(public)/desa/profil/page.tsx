import Card from '@/components/Card';
import { api } from '@/lib/api-client';
import { VillageProfile, OrganizationStructureItem } from '@/lib/types';

export const dynamic = 'force-dynamic';

const infoItems = [
  { label: 'Nama Desa', key: 'villageName' as const },
  { label: 'Wilayah', key: 'region' as const },
  { label: 'Alamat', key: 'address' as const },
  { label: 'Telepon', key: 'phone' as const },
  { label: 'Email', key: 'email' as const },
  { label: 'Jam Layanan', key: 'workingHours' as const },
];

export default async function ProfilPage() {
  const { profile, structure } = await api.get<{ profile: VillageProfile; structure: OrganizationStructureItem[] }>('/api/profile');
  const v = profile || {} as VillageProfile;
  const region = [v.district, v.regency, v.province].filter(Boolean).join(', ');

  const infoValues: Record<string, string> = {
    villageName: v.villageName ?? '',
    region: region ?? '',
    address: v.address ?? '',
    phone: v.phone ?? '',
    email: v.email ?? '',
    workingHours: v.workingHours ?? '',
  };

  return (
    <div className="max-w-[1200px] mx-auto px-4 py-14 md:py-20">
      <div className="mb-14">
        <span className="inline-flex items-center gap-2 bg-white rounded-full px-4 py-1.5 ring-1 ring-black/[0.05] shadow-[0_2px_12px_rgba(27,30,28,0.04)]">
          <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-primary)]" />
          <span className="text-xs font-medium text-[var(--color-primary)] tracking-[0.15em] uppercase">Tentang Kami</span>
        </span>
        <h1 className="text-4xl md:text-5xl font-[family-name:var(--font-heading)] font-bold tracking-[-0.03em] mt-5 mb-4">
          Profil Desa
          <span className="block text-[var(--color-primary)]">Ujungbatu II</span>
        </h1>
        <p className="text-[var(--color-text-muted)] max-w-2xl leading-relaxed">
          Sejarah, visi, misi, serta struktur organisasi pemerintahan Desa Ujungbatu II, Kec. Hutaraja Tinggi, Kab. Padang Lawas, Sumatera Utara.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-16">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <span className="text-xs font-medium text-[var(--color-primary)] tracking-[0.15em] uppercase">Sejarah</span>
            <h2 className="text-2xl font-bold font-[family-name:var(--font-heading)] mb-4">Perjalanan Desa</h2>
            <p className="text-[var(--color-text-muted)] leading-relaxed">{v.history}</p>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="h-full">
              <span className="text-xs font-medium text-[var(--color-primary)] tracking-[0.15em] uppercase">Arah Pembangunan</span>
              <h2 className="text-2xl font-bold font-[family-name:var(--font-heading)] mb-4">Visi</h2>
              <p className="text-[var(--color-text-muted)] leading-relaxed italic border-l-2 border-[var(--color-primary)]/20 pl-4">{v.vision}</p>
            </Card>
            <Card className="h-full">
              <span className="text-xs font-medium text-[var(--color-primary)] tracking-[0.15em] uppercase">Langkah Nyata</span>
              <h2 className="text-2xl font-bold font-[family-name:var(--font-heading)] mb-4">Misi</h2>
              <ol className="space-y-3 text-[var(--color-text-muted)]">
                {(v.mission || []).map((m: string, i: number) => (
                  <li key={i} className="flex gap-3">
                    <span className="flex-shrink-0 w-7 h-7 rounded-full bg-[var(--color-primary-tint)] text-[var(--color-primary)] text-sm font-bold flex items-center justify-center">{i + 1}</span>
                    <span className="leading-relaxed">{m}</span>
                  </li>
                ))}
              </ol>
            </Card>
          </div>
        </div>

        <div className="space-y-6">
          <Card>
            <h3 className="font-bold text-lg font-[family-name:var(--font-heading)] mb-5">Informasi Desa</h3>
            <dl className="space-y-4 text-sm">
              {infoItems.map((item) => (
                <div key={item.key} className="pb-4 border-b border-black/[0.05] last:border-0 last:pb-0">
                  <dt className="text-xs text-[var(--color-text-muted)] uppercase tracking-wide mb-1">{item.label}</dt>
                  <dd className="font-medium">{infoValues[item.key] || '—'}</dd>
                </div>
              ))}
            </dl>
          </Card>

          <Card className="bg-[var(--color-primary-tint)]" innerClassName="bg-[var(--color-primary-tint)]">
            <h3 className="font-bold text-lg font-[family-name:var(--font-heading)] text-[var(--color-primary-dark)] mb-2">Layanan & Informasi</h3>
            <p className="text-sm text-[var(--color-text-muted)] leading-relaxed">
              Butuh surat keterangan atau ada pengaduan? Semua layanan desa dapat diakses secara online.
            </p>
            <div className="mt-5 flex flex-col gap-3">
              <a href="/desa/layanan-surat" className="group inline-flex items-center justify-between gap-2 bg-[var(--color-primary)] text-white rounded-full pl-5 pr-1.5 py-1.5 text-sm font-medium transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:bg-[var(--color-primary-dark)] active:scale-[0.97]">
                Ajukan Surat Online
                <span className="w-8 h-8 rounded-full bg-white/15 flex items-center justify-center transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-x-0.5">
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                  </svg>
                </span>
              </a>
              <a href="/desa/pengaduan" className="group inline-flex items-center justify-between gap-2 border border-[var(--color-primary)]/30 text-[var(--color-primary)] rounded-full pl-5 pr-1.5 py-1.5 text-sm font-medium transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:bg-white active:scale-[0.97]">
                Sampaikan Pengaduan
                <span className="w-8 h-8 rounded-full bg-[var(--color-primary-tint)] flex items-center justify-center transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-x-0.5">
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                  </svg>
                </span>
              </a>
            </div>
          </Card>
        </div>
      </div>

      <div className="mb-8">
        <span className="text-xs font-medium text-[var(--color-primary)] tracking-[0.15em] uppercase">Perangkat Desa</span>
        <h2 className="text-3xl font-bold font-[family-name:var(--font-heading)] tracking-[-0.02em] mt-2">Struktur Organisasi</h2>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {(structure || []).map((person: OrganizationStructureItem) => (
          <Card key={person.id} className="text-center">
            <div className="relative w-20 h-20 rounded-full mx-auto mb-4 bg-[var(--color-primary-tint)] ring-1 ring-[var(--color-primary)]/10 flex items-center justify-center text-[var(--color-primary)] text-2xl font-bold">
              {person.name.charAt(0)}
              <span className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-[var(--color-accent-gold)] ring-2 ring-white" />
            </div>
            <h3 className="font-bold text-base font-[family-name:var(--font-heading)]">{person.name}</h3>
            <p className="text-sm text-[var(--color-text-muted)] mt-1">{person.position}</p>
          </Card>
        ))}
      </div>
    </div>
  );
}