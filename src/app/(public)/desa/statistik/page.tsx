import Card from '@/components/Card';
import { api } from '@/lib/api-client';

export default async function StatistikPage() {
  const stats = await api.get<{
    totalPopulation: number; familyCardCount: number; maleCount: number; femaleCount: number;
    dusunStats: { name: string; population: number }[];
    occupationStats: { name: string; count: number }[];
  }>('/api/stats').catch(() => ({
    totalPopulation: 0, familyCardCount: 0, maleCount: 0, femaleCount: 0,
    dusunStats: [], occupationStats: [],
  }));

  const s = stats || { totalPopulation: 0, familyCardCount: 0, maleCount: 0, femaleCount: 0, dusunStats: [], occupationStats: [] };

  return (
    <div className="max-w-[1200px] mx-auto px-4 py-12">
      <h1 className="text-[32px] font-bold mb-4">Statistik Kependudukan</h1>
      <p className="text-[var(--color-text-muted)] mb-8">Data agregat kependudukan Desa Ujungbatu II</p>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
        <Card className="text-center"><div className="text-3xl font-bold text-[var(--color-primary)]">{s.totalPopulation}</div><div className="text-sm text-[var(--color-text-muted)] mt-1">Total Penduduk</div></Card>
        <Card className="text-center"><div className="text-3xl font-bold text-[var(--color-primary)]">{s.maleCount}</div><div className="text-sm text-[var(--color-text-muted)] mt-1">Laki-laki</div></Card>
        <Card className="text-center"><div className="text-3xl font-bold text-[var(--color-primary)]">{s.femaleCount}</div><div className="text-sm text-[var(--color-text-muted)] mt-1">Perempuan</div></Card>
        <Card className="text-center"><div className="text-3xl font-bold text-[var(--color-primary)]">{s.familyCardCount}</div><div className="text-sm text-[var(--color-text-muted)] mt-1">Kartu Keluarga</div></Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <h2 className="text-[22px] font-semibold mb-4">Penduduk per Dusun</h2>
          <div className="space-y-4">
            {(s.dusunStats || []).map((d: any) => (
              <div key={d.name}>
                <div className="flex justify-between text-sm mb-1"><span className="font-medium">{d.name}</span><span className="text-[var(--color-text-muted)]">{d.population} jiwa</span></div>
                <div className="h-2 bg-[var(--color-border)] rounded-full overflow-hidden">
                  <div className="h-full bg-[var(--color-primary)] rounded-full" style={{ width: `${(d.population / (s.totalPopulation || 1)) * 100}%` }} />
                </div>
              </div>
            ))}
          </div>
        </Card>
        <Card>
          <h2 className="text-[22px] font-semibold mb-4">Pekerjaan</h2>
          <div className="space-y-3">
            {(s.occupationStats || []).map((o: any) => (
              <div key={o.name} className="flex justify-between text-sm"><span>{o.name}</span><span className="font-medium">{o.count} orang</span></div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
