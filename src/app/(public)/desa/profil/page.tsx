import Card from '@/components/Card';
import { api } from '@/lib/api-client';

export default async function ProfilPage() {
  const { profile, structure } = await api.get<{ profile: any; structure: any[] }>('/api/profile');
  const v = profile || {};

  return (
    <div className="max-w-[1200px] mx-auto px-4 py-12">
      <h1 className="text-[32px] font-bold mb-8">Profil Desa</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
        <div className="lg:col-span-2 space-y-6">
          <Card><h2 className="text-[22px] font-semibold mb-3">Sejarah Desa</h2><p className="text-[var(--color-text-muted)] leading-relaxed">{v.history}</p></Card>
          <Card><h2 className="text-[22px] font-semibold mb-3">Visi</h2><p className="text-[var(--color-text-muted)] italic">{v.vision}</p></Card>
          <Card>
            <h2 className="text-[22px] font-semibold mb-3">Misi</h2>
            <ol className="list-decimal list-inside space-y-2 text-[var(--color-text-muted)]">
              {(v.mission || []).map((m: string, i: number) => <li key={i}>{m}</li>)}
            </ol>
          </Card>
        </div>
        <div className="space-y-6">
          <Card>
            <h3 className="font-semibold text-lg mb-3">Informasi Desa</h3>
            <dl className="space-y-3 text-sm">
              <div><dt className="text-[var(--color-text-muted)]">Nama Desa</dt><dd className="font-medium">{v.villageName}</dd></div>
              <div><dt className="text-[var(--color-text-muted)]">Alamat</dt><dd className="font-medium">{v.address}</dd></div>
              <div><dt className="text-[var(--color-text-muted)]">Email</dt><dd className="font-medium">{v.email}</dd></div>
              <div><dt className="text-[var(--color-text-muted)]">Jam Layanan</dt><dd className="font-medium">{v.workingHours}</dd></div>
            </dl>
          </Card>
        </div>
      </div>

      <h2 className="text-[28px] font-bold mb-6">Struktur Organisasi</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {(structure || []).map((person: any) => (
          <Card key={person.id} className="text-center">
            <div className="w-20 h-20 rounded-full bg-[var(--color-primary-tint)] mx-auto mb-4 flex items-center justify-center text-[var(--color-primary)] text-2xl font-bold">{person.name.charAt(0)}</div>
            <h3 className="font-semibold">{person.name}</h3>
            <p className="text-sm text-[var(--color-text-muted)]">{person.position}</p>
          </Card>
        ))}
      </div>
    </div>
  );
}
