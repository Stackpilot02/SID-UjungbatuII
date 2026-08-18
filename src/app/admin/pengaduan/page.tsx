import { api } from '@/lib/api-client';
import Card from '@/components/Card';
import StatusBadge from '@/components/StatusBadge';
import { complaintCategories } from '@/data/mock-data';
import type { Complaint } from '@/lib/types';

export const dynamic = 'force-dynamic';

export default async function AdminPengaduanPage() {
  const complaints = await api.get<Complaint[]>('/api/admin/complaints');

  const counts: Record<string, number> = {};
  complaintCategories.forEach(c => { counts[c.id] = 0; });
  complaints?.forEach(c => { if (counts[c.categoryId] !== undefined) counts[c.categoryId]++; });

  return (
    <div>
      <h1 className="text-[28px] font-bold mb-6">Manajemen Pengaduan</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {complaintCategories.map((c) => (
          <Card key={c.id} className="text-center">
            <div className="text-2xl font-bold text-[var(--color-accent-clay)]">{counts[c.id]}</div>
            <div className="text-sm text-[var(--color-text-muted)] mt-1">{c.name}</div>
          </Card>
        ))}
      </div>
      <Card>
        {!complaints || complaints.length === 0 ? (
          <div className="text-center py-12 text-[var(--color-text-muted)]">
            <p className="text-lg font-medium mb-1">Belum ada pengaduan</p>
            <p className="text-sm">Pengaduan dari warga akan muncul di sini.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {complaints.map((c) => (
              <div key={c.id} className="border border-[var(--color-border)] rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs px-2 py-0.5 rounded bg-[var(--color-primary-tint)] text-[var(--color-primary)] font-medium">
                    {complaintCategories.find(cat => cat.id === c.categoryId)?.name || c.categoryId}
                  </span>
                  <StatusBadge status={c.status} />
                </div>
                <p className="text-sm mb-1">{c.description}</p>
                {c.location && <p className="text-xs text-[var(--color-text-muted)]">Lokasi: {c.location}</p>}
                <p className="text-xs text-[var(--color-text-muted)] mt-1">{new Date(c.createdAt).toLocaleDateString('id-ID')}</p>
              </div>
            ))}
          </div>
        )}
      </Card>
    </div>
  );
}