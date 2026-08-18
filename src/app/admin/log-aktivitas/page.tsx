import { api } from '@/lib/api-client';
import Card from '@/components/Card';
import type { ActivityLog } from '@/lib/types';

export const dynamic = 'force-dynamic';

export default async function AdminLogAktivitasPage() {
  const logs = await api.get<ActivityLog[]>('/api/admin/activity-logs');

  return (
    <div>
      <h1 className="text-[28px] font-bold mb-6">Log Aktivitas</h1>
      <Card>
        {!logs || logs.length === 0 ? (
          <div className="text-center py-12 text-[var(--color-text-muted)]">
            <svg className="w-16 h-16 mx-auto mb-4 opacity-30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeWidth={1.5} d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="text-lg font-medium mb-1">Belum ada aktivitas tercatat</p>
            <p className="text-sm">Riwayat perubahan data akan muncul di sini.</p>
          </div>
        ) : (
          <div className="space-y-2">
            {logs.map((log) => (
              <div key={log.id} className="flex items-center gap-3 text-sm border-b border-[var(--color-border)] last:border-0 py-2">
                <span className="text-xs px-2 py-0.5 rounded bg-[var(--color-primary-tint)] text-[var(--color-primary)] font-medium uppercase">{log.action}</span>
                <span className="text-[var(--color-text-muted)]">{log.tableName}</span>
                <span className="ml-auto text-xs text-[var(--color-text-muted)]">{new Date(log.createdAt).toLocaleString('id-ID')}</span>
              </div>
            ))}
          </div>
        )}
      </Card>
    </div>
  );
}