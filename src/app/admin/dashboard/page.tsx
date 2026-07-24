import Card from '@/components/Card';
import { stats } from '@/data/mock-data';

export default function AdminDashboardPage() {
  return (
    <div>
      <h1 className="text-[28px] font-bold mb-6">Dashboard</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card className="text-center">
          <div className="text-3xl font-bold text-[var(--color-primary)]">{stats.totalPopulation}</div>
          <div className="text-sm text-[var(--color-text-muted)] mt-1">Total Penduduk</div>
        </Card>
        <Card className="text-center">
          <div className="text-3xl font-bold text-[var(--color-success)]">0</div>
          <div className="text-sm text-[var(--color-text-muted)] mt-1">Pengajuan Surat</div>
        </Card>
        <Card className="text-center">
          <div className="text-3xl font-bold text-[var(--color-accent-clay)]">0</div>
          <div className="text-sm text-[var(--color-text-muted)] mt-1">Pengaduan Masuk</div>
        </Card>
        <Card className="text-center">
          <div className="text-3xl font-bold text-[var(--color-warning)]">0</div>
          <div className="text-sm text-[var(--color-text-muted)] mt-1">Menunggu Proses</div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <h2 className="text-[22px] font-semibold mb-4">Statistik Penduduk</h2>
          <div className="space-y-3">
            {stats.dusunStats.map((d) => (
              <div key={d.name} className="flex justify-between text-sm">
                <span className="font-medium">{d.name}</span>
                <span className="text-[var(--color-text-muted)]">{d.population} jiwa</span>
              </div>
            ))}
          </div>
        </Card>
        <Card>
          <h2 className="text-[22px] font-semibold mb-4">Aktivitas Terbaru</h2>
          <p className="text-sm text-[var(--color-text-muted)]">Belum ada aktivitas tercatat.</p>
        </Card>
      </div>
    </div>
  );
}
