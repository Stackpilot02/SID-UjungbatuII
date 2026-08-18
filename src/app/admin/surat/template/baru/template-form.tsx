'use client';

import { useState, FormEvent, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Card from '@/components/Card';
import Button from '@/components/Button';
import { Label, Input, Select, Textarea, FieldError } from '@/components/form';

type TemplateFormState = {
  id?: string;
  letterTypeId: string;
  name: string;
  numberFormat: string;
  bodyTemplate: string;
  isActive: boolean;
};

export default function TemplateForm({ initialData }: { initialData?: Partial<TemplateFormState> }) {
  const router = useRouter();
  const [letterTypes, setLetterTypes] = useState<{ id: string; name: string; code: string }[]>([]);
  const [form, setForm] = useState<TemplateFormState>({
    letterTypeId: '',
    name: '',
    numberFormat: '',
    bodyTemplate: '',
    isActive: true,
    ...initialData,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch('/api/letter-types')
      .then((res) => res.json())
      .then((json) => {
        if (json.success) setLetterTypes(json.data);
      })
      .catch(() => setLetterTypes([]));
  }, []);

  const isEdit = Boolean(initialData?.id);

  const set = (key: keyof typeof form, value: string | boolean) => {
    setForm((f) => ({ ...f, [key]: value }));
    setErrors((e) => ({ ...e, [key]: '' }));
  };

  function handleTypeChange(id: string) {
    const lt = letterTypes.find((t) => t.id === id);
    setForm((f) => ({
      ...f,
      letterTypeId: id,
      name: lt ? lt.name : f.name,
      numberFormat: lt ? `{urutan}/${lt.code}/UB-II/{bulan}/{tahun}` : f.numberFormat,
    }));
  }

  async function handleSubmit(ev: FormEvent) {
    ev.preventDefault();
    const e: Record<string, string> = {};
    if (!form.letterTypeId) e.letterTypeId = 'Pilih jenis surat';
    if (!form.name.trim()) e.name = 'Nama template wajib diisi';
    if (!form.numberFormat.trim()) e.numberFormat = 'Format nomor wajib diisi';
    if (!form.bodyTemplate.trim()) e.bodyTemplate = 'Isi template wajib diisi';
    setErrors(e);
    if (Object.keys(e).length > 0) return;

    setLoading(true);
    try {
      const res = await fetch(isEdit && initialData?.id ? `/api/admin/letter-templates?id=${initialData.id}` : '/api/admin/letter-templates', {
        method: isEdit ? 'PATCH' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const json = await res.json();
      if (!json.success) throw new Error(json.error || 'Gagal menyimpan');
      router.push('/admin/surat/template');
      router.refresh();
    } catch (err) {
      setErrors({ form: err instanceof Error ? err.message : 'Gagal menyimpan' });
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-[28px] font-bold">{isEdit ? 'Edit Template Surat' : 'Buat Template Surat'}</h1>
          <p className="text-sm text-[var(--color-text-muted)] mt-1">
            Gunakan placeholder seperti {'{{nama}}'}, {'{{nik}}'}, {'{{alamat}}'}, {'{{tanggal}}'} di isi template.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button type="button" variant="secondary" href="/admin/surat/template">Batal</Button>
          <Button type="submit" disabled={loading}>{loading ? 'Menyimpan...' : isEdit ? 'Simpan Perubahan' : 'Simpan Template'}</Button>
        </div>
      </div>

      {errors.form && (
        <div className="mb-6 px-4 py-3 rounded-xl bg-[var(--color-danger)]/10 text-[var(--color-danger)] text-sm">{errors.form}</div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <h2 className="text-lg font-semibold mb-4">Isi Template</h2>
            <div className="space-y-4">
              <div>
                <Label>Isi Surat (Body Template) *</Label>
                <Textarea
                  value={form.bodyTemplate}
                  onChange={(e) => set('bodyTemplate', e.target.value)}
                  className="min-h-[280px] font-mono-data text-xs"
                  placeholder={'Yang bertanda tangan di bawah ini menerangkan bahwa {{nama}} dengan NIK {{nik}} berdomisili di {{alamat}} ...'}
                />
                <FieldError message={errors.bodyTemplate} />
              </div>
              <div className="bg-[var(--color-primary-tint)] rounded-xl px-4 py-3 text-xs text-[var(--color-primary-dark)]">
                <span className="font-semibold">Placeholder yang tersedia:</span> {'{{nama}} • {{nik}} • {{alamat}} • {{kelurahan}} • {{kecamatan}} • {{tanggal}} • {{jenis_surat}}'}
              </div>
            </div>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <h2 className="text-lg font-semibold mb-4">Pengaturan</h2>
            <div className="space-y-4">
              <div>
                <Label>Jenis Surat *</Label>
                <Select value={form.letterTypeId} onChange={(e) => handleTypeChange(e.target.value)}>
                  <option value="">Pilih jenis surat</option>
                  {letterTypes.map((lt) => (
                    <option key={lt.id} value={lt.id}>{lt.name} ({lt.code})</option>
                  ))}
                </Select>
                <FieldError message={errors.letterTypeId} />
              </div>
              <div>
                <Label>Nama Template *</Label>
                <Input value={form.name} onChange={(e) => set('name', e.target.value)} placeholder="Template SKD v1" />
                <FieldError message={errors.name} />
              </div>
              <div>
                <Label>Format Nomor Surat *</Label>
                <Input value={form.numberFormat} onChange={(e) => set('numberFormat', e.target.value)} className="font-mono-data text-xs" placeholder="{urutan}/SKD/UB-II/{bulan}/{tahun}" />
                <FieldError message={errors.numberFormat} />
              </div>
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id="is-active"
                  checked={form.isActive}
                  onChange={(e) => set('isActive', e.target.checked)}
                  className="w-4 h-4 rounded border-[var(--color-border)] text-[var(--color-primary)] focus:ring-[var(--color-primary)]/30"
                />
                <label htmlFor="is-active" className="text-sm font-medium">Aktifkan langsung</label>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </form>
  );
}