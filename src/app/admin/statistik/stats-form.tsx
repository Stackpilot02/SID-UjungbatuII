'use client';

import { useState, FormEvent, useEffect } from 'react';
import Card from '@/components/Card';
import Button from '@/components/Button';
import { Label, Input, FieldError } from '@/components/form';

interface LabelItem {
  name: string;
  count: string;
}

const emptyRow = (): LabelItem => ({ name: '', count: '' });

export default function StatsForm() {
  const [form, setForm] = useState({
    totalPopulation: '',
    maleCount: '',
    femaleCount: '',
    familyCardCount: '',
  });
  const [occupationStats, setOccupationStats] = useState<LabelItem[]>([emptyRow()]);
  const [religionStats, setReligionStats] = useState<LabelItem[]>([emptyRow()]);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    fetch('/api/admin/stats')
      .then((res) => res.json())
      .then((json) => {
        if (!json.success) return;
        const d = json.data;
        setForm({
          totalPopulation: String(d.totalPopulation ?? 0),
          maleCount: String(d.maleCount ?? 0),
          femaleCount: String(d.femaleCount ?? 0),
          familyCardCount: String(d.familyCardCount ?? 0),
        });
        setOccupationStats((d.occupationStats || []).length > 0
          ? d.occupationStats.map((o: { name: string; count: number }) => ({ name: o.name, count: String(o.count) }))
          : [emptyRow()]);
        setReligionStats((d.religionStats || []).length > 0
          ? d.religionStats.map((r: { name: string; count: number }) => ({ name: r.name, count: String(r.count) }))
          : [emptyRow()]);
        setLoaded(true);
      })
      .catch(() => setLoaded(true));
  }, []);

  const set = (key: keyof typeof form, value: string) => {
    setForm((f) => ({ ...f, [key]: value }));
    setErrors((e) => ({ ...e, [key]: '' }));
  };

  const updateRow = (list: 'occupationStats' | 'religionStats', index: number, field: keyof LabelItem, value: string) => {
    const setter = list === 'occupationStats' ? setOccupationStats : setReligionStats;
    setter((rows) => rows.map((r, i) => (i === index ? { ...r, [field]: value } : r)));
  };

  const removeRow = (list: 'occupationStats' | 'religionStats', index: number) => {
    const setter = list === 'occupationStats' ? setOccupationStats : setReligionStats;
    setter((rows) => rows.filter((_, i) => i !== index));
  };

  const addRow = (list: 'occupationStats' | 'religionStats') => {
    const setter = list === 'occupationStats' ? setOccupationStats : setReligionStats;
    setter((rows) => [...rows, emptyRow()]);
  };

  const validate = () => {
    const e: Record<string, string> = {};
    const num = (v: string) => Number(v);
    if (!/^\d+$/.test(form.totalPopulation)) e.totalPopulation = 'Total penduduk wajib angka bulat >= 0';
    if (!/^\d+$/.test(form.maleCount)) e.maleCount = 'Wajib angka bulat >= 0';
    if (!/^\d+$/.test(form.femaleCount)) e.femaleCount = 'Wajib angka bulat >= 0';
    if (!/^\d+$/.test(form.familyCardCount)) e.familyCardCount = 'Wajib angka bulat >= 0';
    if (num(form.maleCount) + num(form.femaleCount) !== num(form.totalPopulation)) {
      e.maleCount = 'Laki-laki + Perempuan harus sama dengan total penduduk';
    }
    if (num(form.familyCardCount) > num(form.totalPopulation)) {
      e.familyCardCount = 'Tidak boleh melebihi total penduduk';
    }

    for (const row of occupationStats) {
      if (!row.name.trim() || !/^\d+$/.test(row.count)) {
        e.occupationStats = 'Setiap baris pekerjaan wajib berisi nama dan jumlah yang valid';
        break;
      }
    }
    for (const row of religionStats) {
      if (!row.name.trim() || !/^\d+$/.test(row.count)) {
        e.religionStats = 'Setiap baris agama wajib berisi nama dan jumlah yang valid';
        break;
      }
    }
    return e;
  };

  async function handleSubmit(ev: FormEvent) {
    ev.preventDefault();
    const e = validate();
    setErrors(e);
    if (Object.keys(e).length > 0) return;

    setLoading(true);
    try {
      const res = await fetch('/api/admin/stats', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          totalPopulation: Number(form.totalPopulation),
          maleCount: Number(form.maleCount),
          femaleCount: Number(form.femaleCount),
          familyCardCount: Number(form.familyCardCount),
          occupationStats: occupationStats.filter((r) => r.name.trim()).map((r) => ({ name: r.name.trim(), count: Number(r.count) })),
          religionStats: religionStats.filter((r) => r.name.trim()).map((r) => ({ name: r.name.trim(), count: Number(r.count) })),
        }),
      });
      const json = await res.json();
      if (!json.success) throw new Error(json.error || 'Gagal menyimpan');
      setErrors({ form: 'Data statistik berhasil disimpan' });
    } catch (err) {
      setErrors({ form: err instanceof Error ? err.message : 'Gagal menyimpan' });
    } finally {
      setLoading(false);
    }
  }

  const renderLabelList = (title: string, rows: LabelItem[], list: 'occupationStats' | 'religionStats') => (
    <Card>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold">{title}</h2>
        <Button type="button" variant="secondary" onClick={() => addRow(list)}>+ Tambah Baris</Button>
      </div>
      <div className="space-y-3">
        {rows.map((row, i) => (
          <div key={i} className="flex items-center gap-3">
            <div className="flex-1">
              <Input value={row.name} onChange={(e) => updateRow(list, i, 'name', e.target.value)} placeholder="Nama" />
            </div>
            <div className="w-36">
              <Input value={row.count} onChange={(e) => updateRow(list, i, 'count', e.target.value)} placeholder="Jumlah" inputMode="numeric" />
            </div>
            <button
              type="button"
              onClick={() => removeRow(list, i)}
              className="text-[var(--color-danger)] hover:opacity-70 text-sm"
              aria-label={`Hapus baris ${title}`}
            >
              Hapus
            </button>
          </div>
        ))}
        <FieldError message={errors[list]} />
      </div>
    </Card>
  );

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-[28px] font-bold">Pengaturan Statistik</h1>
          <p className="text-sm text-[var(--color-text-muted)] mt-1">Kelola data agregat kependudukan yang tampil di beranda dan halaman statistik.</p>
        </div>
        <Button type="submit" disabled={loading || !loaded}>{loading ? 'Menyimpan...' : 'Simpan'}</Button>
      </div>

      {errors.form && (
        <div className={`mb-6 px-4 py-3 rounded-xl text-sm ${errors.form.includes('berhasil') ? 'bg-[var(--color-success)]/10 text-[var(--color-success)]' : 'bg-[var(--color-danger)]/10 text-[var(--color-danger)]'}`}>
          {errors.form}
        </div>
      )}

      {!loaded ? (
        <p className="text-sm text-[var(--color-text-muted)]">Memuat data statistik...</p>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <h2 className="text-lg font-semibold mb-4">Data Agregat</h2>
            <div className="space-y-4">
              <div>
                <Label>Total Penduduk *</Label>
                <Input value={form.totalPopulation} onChange={(e) => set('totalPopulation', e.target.value)} inputMode="numeric" />
                <FieldError message={errors.totalPopulation} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Laki-laki *</Label>
                  <Input value={form.maleCount} onChange={(e) => set('maleCount', e.target.value)} inputMode="numeric" />
                  <FieldError message={errors.maleCount} />
                </div>
                <div>
                  <Label>Perempuan *</Label>
                  <Input value={form.femaleCount} onChange={(e) => set('femaleCount', e.target.value)} inputMode="numeric" />
                  <FieldError message={errors.femaleCount} />
                </div>
              </div>
              <div>
                <Label>Jumlah Kartu Keluarga *</Label>
                <Input value={form.familyCardCount} onChange={(e) => set('familyCardCount', e.target.value)} inputMode="numeric" />
                <FieldError message={errors.familyCardCount} />
              </div>
            </div>
          </Card>

          {renderLabelList('Pekerjaan', occupationStats, 'occupationStats')}
          {renderLabelList('Agama', religionStats, 'religionStats')}
        </div>
      )}
    </form>
  );
}