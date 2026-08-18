import { api } from '@/lib/api-client';
import Card from '@/components/Card';
import Button from '@/components/Button';
import StatusBadge from '@/components/StatusBadge';
import { letterTypes } from '@/data/mock-data';
import type { LetterRequest } from '@/lib/types';

export const dynamic = 'force-dynamic';

export default async function AdminProsesSuratPage() {
  const requests = await api.get<LetterRequest[]>('/api/admin/letter-requests');

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-[28px] font-bold">Proses Surat</h1>
        <Button variant="primary" href="/admin/surat/cetak-massal">Generate Surat Baru</Button>
      </div>
      <Card>
        {!requests || requests.length === 0 ? (
          <div className="text-center py-12 text-[var(--color-text-muted)]">
            <svg className="w-16 h-16 mx-auto mb-4 opacity-30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeWidth={1.5} d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
            </svg>
            <p className="text-lg font-medium mb-1">Belum ada pengajuan surat</p>
            <p className="text-sm">Pengajuan surat dari warga akan muncul di sini.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {requests.map((r) => (
              <div key={r.id} className="border border-[var(--color-border)] rounded-lg p-4 flex items-center justify-between">
                <div>
                  <div className="font-medium text-sm">{letterTypes.find(lt => lt.id === r.letterTypeId)?.name || r.letterTypeId}</div>
                  <div className="text-xs text-[var(--color-text-muted)]">{r.requesterName} — {r.purpose}</div>
                  <div className="text-xs text-[var(--color-text-muted)]">{new Date(r.createdAt).toLocaleDateString('id-ID')}</div>
                </div>
                <div className="flex items-center gap-2">
                  <StatusBadge status={r.status} />
                  <Button variant="primary" href={`/admin/surat/cetak-massal`}>Proses</Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </Card>
    </div>
  );
}