import Card from '@/components/Card';
import Button from '@/components/Button';
import { residents } from '@/data/mock-data';

export default function AdminKependudukanPage() {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-[28px] font-bold">Data Kependudukan</h1>
        <Button href="/admin/kependudukan/baru" variant="primary">+ Tambah Penduduk</Button>
      </div>
      <Card className="overflow-hidden" innerClassName="p-0 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-[var(--color-bg)] border-b border-[var(--color-border)]">
            <tr>
              <th className="text-left px-4 py-3 font-medium">NIK</th>
              <th className="text-left px-4 py-3 font-medium">Nama</th>
              <th className="text-left px-4 py-3 font-medium">Dusun</th>
              <th className="text-left px-4 py-3 font-medium">Pekerjaan</th>
              <th className="text-left px-4 py-3 font-medium">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {residents.map((r) => (
              <tr key={r.id} className="border-b border-[var(--color-border)] last:border-0">
                <td className="px-4 py-3 font-mono-data text-xs">{r.nik}</td>
                <td className="px-4 py-3 font-medium">{r.fullName}</td>
                <td className="px-4 py-3 text-[var(--color-text-muted)]">{r.dusun}</td>
                <td className="px-4 py-3 text-[var(--color-text-muted)]">{r.occupation}</td>
                <td className="px-4 py-3"><button className="text-[var(--color-primary)] hover:underline text-xs">Edit</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
}
