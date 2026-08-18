import Card from '@/components/Card';
import Button from '@/components/Button';
import { letterTemplates, letterTypes } from '@/data/mock-data';
import DeleteTemplateButton from './delete-template-button';

export const dynamic = 'force-dynamic';

export default function AdminTemplateSuratPage() {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-[28px] font-bold">Template Surat</h1>
        <Button href="/admin/surat/template/baru" variant="primary">+ Buat Template</Button>
      </div>
      {letterTemplates.length === 0 ? (
        <Card>
          <div className="text-center py-12 text-[var(--color-text-muted)]">
            <p className="text-lg font-medium mb-1">Belum ada template surat</p>
            <p className="text-sm">Buat template pertama Anda agar surat dapat dicetak sesuai format desa.</p>
          </div>
        </Card>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {letterTemplates.map((t) => (
            <Card key={t.id}>
              <div className="flex items-start justify-between mb-1">
                <h3 className="font-semibold text-lg">{t.name}</h3>
                {t.isActive ? (
                  <span className="px-2 py-0.5 rounded text-xs bg-[var(--color-success)]/10 text-[var(--color-success)] font-medium">Aktif</span>
                ) : (
                  <span className="px-2 py-0.5 rounded text-xs bg-[var(--color-border)] text-[var(--color-text-muted)] font-medium">Nonaktif</span>
                )}
              </div>
              <p className="text-xs text-[var(--color-text-muted)] mb-2">
                {letterTypes.find((lt) => lt.id === t.letterTypeId)?.name || t.letterTypeId}
              </p>
              <p className="text-xs text-[var(--color-text-muted)] mb-4 font-mono-data">{t.numberFormat}</p>
              <div className="flex gap-3">
                <a href={`/admin/surat/template/${t.id}/edit`} className="text-[var(--color-primary)] hover:underline text-sm">Edit</a>
                <DeleteTemplateButton id={t.id} name={t.name} />
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}