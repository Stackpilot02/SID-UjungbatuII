'use client';

import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import Card from '@/components/Card';
import Button from '@/components/Button';
import { Label, Input, Select, FieldError } from '@/components/form';
import { isValidEmail } from '@/lib/validation';

const roleOptions = [
  { value: 'operator', label: 'Operator' },
  { value: 'admin', label: 'Admin' },
  { value: 'kepala_desa', label: 'Kepala Desa' },
];

type UserFormState = {
  id?: string;
  fullName: string;
  email: string;
  role: string;
};

export default function UserForm({ initialData }: { initialData?: Partial<UserFormState> }) {
  const router = useRouter();
  const [form, setForm] = useState<UserFormState>({ fullName: '', email: '', role: 'operator', ...initialData });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  const isEdit = Boolean(initialData?.id);

  const set = (key: keyof typeof form, value: string) => {
    setForm((f) => ({ ...f, [key]: value }));
    setErrors((e) => ({ ...e, [key]: '' }));
  };

  async function handleSubmit(ev: FormEvent) {
    ev.preventDefault();
    const e: Record<string, string> = {};
    if (!form.fullName.trim()) e.fullName = 'Nama lengkap wajib diisi';
    if (!isValidEmail(form.email)) e.email = 'Format email tidak valid';
    setErrors(e);
    if (Object.keys(e).length > 0) return;

    setLoading(true);
    try {
      const res = await fetch(isEdit && initialData?.id ? `/api/admin/users?id=${initialData.id}` : '/api/admin/users', {
        method: isEdit ? 'PATCH' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const json = await res.json();
      if (!json.success) throw new Error(json.error || 'Gagal menyimpan');
      router.push('/admin/pengguna');
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
          <h1 className="text-[28px] font-bold">{isEdit ? 'Edit Pengguna' : 'Tambah Pengguna'}</h1>
          <p className="text-sm text-[var(--color-text-muted)] mt-1">Buat akun perangkat desa dengan hak akses sesuai peran.</p>
        </div>
        <div className="flex items-center gap-3">
          <Button type="button" variant="secondary" href="/admin/pengguna">Batal</Button>
          <Button type="submit" disabled={loading}>{loading ? 'Menyimpan...' : isEdit ? 'Simpan Perubahan' : 'Simpan'}</Button>
        </div>
      </div>

      {errors.form && (
        <div className="mb-6 px-4 py-3 rounded-xl bg-[var(--color-danger)]/10 text-[var(--color-danger)] text-sm">{errors.form}</div>
      )}

      <Card className="max-w-xl">
        <div className="space-y-4">
          <div>
            <Label>Nama Lengkap *</Label>
            <Input value={form.fullName} onChange={(e) => set('fullName', e.target.value)} placeholder="Nama pengguna" />
            <FieldError message={errors.fullName} />
          </div>
          <div>
            <Label>Email *</Label>
            <Input type="email" value={form.email} onChange={(e) => set('email', e.target.value)} placeholder="nama@desa.id" />
            <FieldError message={errors.email} />
          </div>
          <div>
            <Label>Peran (Role) *</Label>
            <Select value={form.role} onChange={(e) => set('role', e.target.value)}>
              {roleOptions.map((r) => (
                <option key={r.value} value={r.value}>{r.label}</option>
              ))}
            </Select>
          </div>
          <p className="text-xs text-[var(--color-text-muted)]">
            Peran menentukan hak akses di panel admin: Operator (proses surat & data terbatas), Admin (kelola penuh), Kepala Desa (lihat laporan).
          </p>
        </div>
      </Card>
    </form>
  );
}