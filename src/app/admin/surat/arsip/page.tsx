import { createAdminClient } from '@/lib/supabase-admin';
import Card from '@/components/Card';
import { letterTypes } from '@/data/mock-data';

export const dynamic = 'force-dynamic';

export default async function AdminArsipSuratPage() {
  const supabase = createAdminClient();

  const { data: letters } = await supabase
    .from('letters')
    .select('id, letter_number, letter_type_id, issued_at')
    .order('issued_at', { ascending: false });

  const counts: Record<string, number> = {};
  letterTypes.forEach(lt => { counts[lt.id] = 0; });
  letters?.forEach(l => { if (counts[l.letter_type_id] !== undefined) counts[l.letter_type_id]++; });

  return (
    <div>
      <h1 className="text-[28px] font-bold mb-6">Arsip Surat</h1>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {letterTypes.slice(0, 4).map((lt) => (
          <Card key={lt.id} className="text-center">
            <div className="text-2xl font-bold text-[var(--color-primary)] font-mono-data">{counts[lt.id]}</div>
            <div className="text-sm text-[var(--color-text-muted)] mt-1">{lt.code}</div>
          </Card>
        ))}
      </div>
      <Card>
        {!letters || letters.length === 0 ? (
          <div className="text-center py-12 text-[var(--color-text-muted)]">
            <p className="text-lg font-medium mb-1">Arsip masih kosong</p>
            <p className="text-sm">Surat yang sudah diterbitkan akan muncul di sini.</p>
          </div>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[var(--color-border)]">
                <th className="text-left px-4 py-3 font-medium">Nomor Surat</th>
                <th className="text-left px-4 py-3 font-medium">Jenis</th>
                <th className="text-left px-4 py-3 font-medium">Tanggal</th>
              </tr>
            </thead>
            <tbody>
              {letters.map((l) => (
                <tr key={l.id} className="border-b border-[var(--color-border)] last:border-0">
                  <td className="px-4 py-3 font-mono-data text-xs">{l.letter_number}</td>
                  <td className="px-4 py-3">{letterTypes.find(lt => lt.id === l.letter_type_id)?.name || l.letter_type_id}</td>
                  <td className="px-4 py-3 text-[var(--color-text-muted)]">{new Date(l.issued_at).toLocaleDateString('id-ID')}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </Card>
    </div>
  );
}
