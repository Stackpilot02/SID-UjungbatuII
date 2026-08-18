'use client';

import { useState, FormEvent, use } from 'react';
import Card from '@/components/Card';
import Button from '@/components/Button';
import { Label, Input, Textarea, Select, FieldError } from '@/components/form';
import { letterTypes } from '@/data/mock-data';
import { isValidNik, isValidPhone, isValidEmail } from '@/lib/validation';

export default function AjukanSuratPage({
  searchParams,
}: {
  searchParams: Promise<{ letterTypeId?: string }>;
}) {
  const params = use(searchParams);
  const initialType = params.letterTypeId && letterTypes.some((lt) => lt.id === params.letterTypeId)
    ? params.letterTypeId
    : '';

  const [form, setForm] = useState({
    letterTypeId: initialType,
    requesterName: '',
    requesterNik: '',
    phone: '',
    email: '',
    purpose: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{ id: string } | null>(null);

  const set = (key: keyof typeof form, value: string) => {
    setForm((f) => ({ ...f, [key]: value }));
    setErrors((e) => ({ ...e, [key]: '' }));
  };

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.letterTypeId) e.letterTypeId = 'Pilih jenis surat';
    if (!form.requesterName.trim()) e.requesterName = 'Nama lengkap wajib diisi';
    if (!isValidNik(form.requesterNik)) e.requesterNik = 'NIK harus 16 digit angka';
    if (form.phone && !isValidPhone(form.phone)) e.phone = 'Format telepon tidak valid';
    if (form.email && !isValidEmail(form.email)) e.email = 'Format email tidak valid';
    if (!form.purpose.trim()) e.purpose = 'Keperluan surat wajib diisi';
    return e;
  };

  async function handleSubmit(ev: FormEvent) {
    ev.preventDefault();
    const e = validate();
    setErrors(e);
    if (Object.keys(e).length > 0) return;

    setLoading(true);
    try {
      const res = await fetch('/api/letter-requests', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const json = await res.json();
      if (!json.success) throw new Error(json.error || 'Gagal mengirim');
      setResult(json.data);
    } catch (err) {
      setErrors({ form: err instanceof Error ? err.message : 'Gagal mengirim pengajuan' });
    } finally {
      setLoading(false);
    }
  }

  if (result) {
    return (
      <div className="max-w-[1200px] mx-auto px-4 py-12">
        <Card className="max-w-2xl mx-auto text-center">
          <div className="w-14 h-14 rounded-full bg-[var(--color-success)]/10 text-[var(--color-success)] flex items-center justify-center mx-auto mb-5">
            <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
            </svg>
          </div>
          <h1 className="text-[28px] font-bold mb-2">Pengajuan Terkirim</h1>
          <p className="text-[var(--color-text-muted)] mb-4">
            Pengajuan surat Anda telah kami terima. Simpan nomor referensi berikut untuk melacak status.
          </p>
          <div className="inline-flex items-center gap-2 bg-[var(--color-primary-tint)] text-[var(--color-primary)] rounded-full px-6 py-2 font-mono-data text-sm font-bold mb-8">
            {result.id}
          </div>
          <div className="flex gap-3 justify-center flex-wrap">
            <Button href={`/desa/layanan-surat/status?ref=${result.id}`} variant="primary">Cek Status</Button>
            <Button href="/desa/layanan-surat" variant="secondary">Ajukan Lagi</Button>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-[800px] mx-auto px-4 py-12">
      <Button href="/desa/layanan-surat" variant="secondary" className="mb-6">&larr; Kembali</Button>
      <h1 className="text-[32px] font-bold mb-2">Form Pengajuan Surat</h1>
      <p className="text-[var(--color-text-muted)] mb-8">
        Isi data berikut untuk mengajukan surat keterangan/pengantar secara online.
      </p>

      <Card>
        {errors.form && (
          <div className="mb-5 px-4 py-3 rounded-xl bg-[var(--color-danger)]/10 text-[var(--color-danger)] text-sm">
            {errors.form}
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <Label>Jenis Surat *</Label>
            <Select value={form.letterTypeId} onChange={(e) => set('letterTypeId', e.target.value)}>
              <option value="">Pilih jenis surat</option>
              {letterTypes.map((lt) => (
                <option key={lt.id} value={lt.id}>{lt.name} ({lt.code}){lt.requiresAttachment ? ' — perlu lampiran' : ''}</option>
              ))}
            </Select>
            <FieldError message={errors.letterTypeId} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <Label>Nama Lengkap *</Label>
              <Input value={form.requesterName} onChange={(e) => set('requesterName', e.target.value)} placeholder="Sesuai KTP" />
              <FieldError message={errors.requesterName} />
            </div>
            <div>
              <Label>NIK *</Label>
              <Input value={form.requesterNik} onChange={(e) => set('requesterNik', e.target.value)} placeholder="16 digit" maxLength={16} inputMode="numeric" />
              <FieldError message={errors.requesterNik} />
            </div>
            <div>
              <Label>Nomor Telepon</Label>
              <Input value={form.phone} onChange={(e) => set('phone', e.target.value)} placeholder="08xxxxxxxxxx" />
              <FieldError message={errors.phone} />
            </div>
            <div>
              <Label>Email</Label>
              <Input type="email" value={form.email} onChange={(e) => set('email', e.target.value)} placeholder="contoh@email.com" />
              <FieldError message={errors.email} />
            </div>
          </div>

          <div>
            <Label>Keperluan Surat *</Label>
            <Textarea value={form.purpose} onChange={(e) => set('purpose', e.target.value)} placeholder="Jelaskan keperluan pengajuan surat" className="min-h-[100px]" />
            <FieldError message={errors.purpose} />
          </div>

          <div className="flex items-center justify-between pt-2 flex-wrap gap-3">
            <p className="text-xs text-[var(--color-text-muted)]">
              Data Anda aman dan hanya digunakan untuk keperluan administrasi desa.
            </p>
            <Button type="submit" disabled={loading}>{loading ? 'Mengirim...' : 'Kirim Pengajuan'}</Button>
          </div>
        </form>
      </Card>
    </div>
  );
}