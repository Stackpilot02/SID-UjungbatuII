import Card from '@/components/Card';
import StatusBadge from '@/components/StatusBadge';
import Button from '@/components/Button';
import { news } from '@/data/mock-data';
import { formatDateShort } from '@/lib/utils';

export default function AdminKontenPage() {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-[28px] font-bold">Manajemen Konten</h1>
        <Button href="/admin/konten/baru" variant="primary">+ Buat Berita</Button>
      </div>
      <Card className="overflow-hidden" innerClassName="p-0 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-[var(--color-bg)] border-b border-[var(--color-border)]">
            <tr>
              <th className="text-left px-4 py-3 font-medium">Judul</th>
              <th className="text-left px-4 py-3 font-medium">Kategori</th>
              <th className="text-left px-4 py-3 font-medium">Status</th>
              <th className="text-left px-4 py-3 font-medium">Tanggal</th>
              <th className="text-left px-4 py-3 font-medium">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {news.map((item) => (
              <tr key={item.id} className="border-b border-[var(--color-border)] last:border-0">
                <td className="px-4 py-3 font-medium">{item.title}</td>
                <td className="px-4 py-3"><span className="text-xs px-2 py-0.5 rounded bg-[var(--color-primary-tint)] text-[var(--color-primary)]">{item.category}</span></td>
                <td className="px-4 py-3"><StatusBadge status={item.status} /></td>
                <td className="px-4 py-3 text-[var(--color-text-muted)]">{formatDateShort(item.publishedAt)}</td>
                <td className="px-4 py-3"><button className="text-[var(--color-primary)] hover:underline text-xs">Edit</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
}
