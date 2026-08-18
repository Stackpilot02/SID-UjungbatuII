import Card from '@/components/Card';
import { api } from '@/lib/api-client';
import { stats } from '@/data/mock-data';
import { formatDateShort } from '@/lib/utils';

export const dynamic = 'force-dynamic';

export default async function AdminDashboardPage() {
  const data = await api.get<{
    totalResidents: number;
    pendingRequests: number;
    pendingComplaints: number;
    recentActivity: { id: string; action: string; tableName: string; description: string; createdAt: string }[];
  }>('/api/admin/dashboard').catch(() => null);

  const cards = [
    { label: 'Total Penduduk', value: data?.totalResidents ?? stats.totalPopulation, color: 'var(--color-primary)' },
    { label: 'Pengajuan Surat Diproses', value: data?.pendingRequests ?? 0, color: 'var(--color-success)' },
    { label: 'Pengaduan Masuk', value: data?.pendingComplaints ?? 0, color: 'var(--color-accent-clay)' },
    { label: 'Pengajuan Menunggu', value: data?.pendingRequests ?? 0, color: 'var(--color-warning)' },
  ];

  return (
    <div>
      <h1 className="text-[28px] font-bold mb-6">Dashboard</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {cards.map((c) => (
          <Card key={c.label} className="text-center">
            <div className="text-3xl font-bold" style={{ color: c.color }}>{c.value}</div>
            <div className="text-sm text-[var(--color-text-muted)] mt-1">{c.label}</div>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <h2 className="text-[22px] font-semibold mb-4">Statistik Penduduk</h2>
          <div className="space-y-4">
            {stats.dusunStats.map((d) => (
              <div key={d.name}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="font-medium">{d.name}</span>
                  <span className="text-[var(--color-text-muted)]">{d.population} jiwa</span>
                </div>
                <div className="h-2 bg-[var(--color-border)] rounded-full overflow-hidden">
                  <div className="h-full bg-[var(--color-primary)] rounded-full" style={{ width: `${(d.population / stats.totalPopulation) * 100}%` }} />
                </div>
              </div>
            ))}
          </div>
        </Card>
        <Card>
          <h2 className="text-[22px] font-semibold mb-4">Aktivitas Terbaru</h2>
          {!data?.recentActivity || data.recentActivity.length === 0 ? (
            <p className="text-sm text-[var(--color-text-muted)]">Belum ada aktivitas tercatat.</p>
          ) : (
            <div className="space-y-3">
              {data.recentActivity.map((a) => (
                <div key={a.id} className="flex items-start gap-3 text-sm border-b border-[var(--color-border)] last:border-0 pb-3">
                  <span className="text-xs px-2 py-0.5 rounded bg-[var(--color-primary-tint)] text-[var(--color-primary)] font-medium uppercase mt-0.5">{a.action}</span>
                  <div className="min-w-0">
                    <p className="text-[var(--color-text)] truncate">{a.description}</p>
                    <p className="text-xs text-[var(--color-text-muted)]">{formatDateShort(a.createdAt)}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}