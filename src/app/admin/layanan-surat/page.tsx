import { createClient } from '@/lib/supabase';
import Card from '@/components/Card';
import StatusBadge from '@/components/StatusBadge';
import { letterTypes } from '@/data/mock-data';

export const dynamic = 'force-dynamic';

export default async function AdminLayananSuratPage() {
  const supabase = createClient();
  const { data: requests } = await supabase
    .from('letter_requests')
    .select('id, letter_type_id, purpose, status, created_at')
    .order('created_at', { ascending: false });

  return (
    <div>
      <h1 className="text-[28px] font-bold mb-6">Layanan Surat</h1>
      <Card>
        {!requests || requests.length === 0 ? (
          <div className="text-center py-12 text-[var(--color-text-muted)]">
            <p className="text-lg font-medium mb-1">Belum ada pengajuan surat</p>
            <p className="text-sm">Pengajuan dari warga akan muncul dan dapat diverifikasi di sini.</p>
          </div>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[var(--color-border)]">
                <th className="text-left px-4 py-3 font-medium">Jenis</th>
                <th className="text-left px-4 py-3 font-medium">Keperluan</th>
                <th className="text-left px-4 py-3 font-medium">Status</th>
                <th className="text-left px-4 py-3 font-medium">Tanggal</th>
              </tr>
            </thead>
            <tbody>
              {requests.map((r) => (
                <tr key={r.id} className="border-b border-[var(--color-border)] last:border-0">
                  <td className="px-4 py-3">{letterTypes.find(lt => lt.id === r.letter_type_id)?.name || r.letter_type_id}</td>
                  <td className="px-4 py-3 text-[var(--color-text-muted)]">{r.purpose}</td>
                  <td className="px-4 py-3"><StatusBadge status={r.status} /></td>
                  <td className="px-4 py-3 text-[var(--color-text-muted)]">{new Date(r.created_at).toLocaleDateString('id-ID')}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </Card>
    </div>
  );
}
