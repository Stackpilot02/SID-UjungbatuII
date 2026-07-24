import Card from '@/components/Card';
import Button from '@/components/Button';
import { letterTypes } from '@/data/mock-data';

export default function AdminTemplateSuratPage() {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-[28px] font-bold">Template Surat</h1>
        <Button variant="primary">+ Buat Template</Button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {letterTypes.map((lt) => (
          <Card key={lt.id}>
            <h3 className="font-semibold text-lg mb-1">{lt.name}</h3>
            <p className="text-xs text-[var(--color-text-muted)] mb-4 font-mono-data">{lt.code}</p>
            <div className="flex items-center gap-2 text-xs text-[var(--color-text-muted)] mb-4">
              <span className="px-2 py-0.5 rounded bg-[var(--color-success)]/10 text-[var(--color-success)] font-medium">Aktif</span>
              <span>v1.0</span>
            </div>
            <div className="flex gap-2">
              <button className="text-[var(--color-primary)] hover:underline text-sm">Edit</button>
              <button className="text-[var(--color-danger)] hover:underline text-sm">Nonaktifkan</button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
