'use client';

import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import Card from '@/components/Card';
import Button from '@/components/Button';
import { Label, Input, Select, FieldError } from '@/components/form';
import { isValidNik, isValidKkNumber, isNotFutureDate } from '@/lib/validation';

type ResidentFormState = {
  id?: string;
  nik: string;
  kkNumber: string;
  fullName: string;
  birthPlace: string;
  birthDate: string;
  gender: string;
  occupation: string;
  religion: string;
  maritalStatus: string;
  familyRole: string;
};

export default function ResidentForm({ initialData }: { initialData?: Partial<ResidentFormState> }) {
  const router = useRouter();
  const [form, setForm] = useState<ResidentFormState>({
    nik: '',
    kkNumber: '',
    fullName: '',
    birthPlace: '',
    birthDate: '',
    gender: 'Laki-laki',
    occupation: '',
    religion: 'Islam',
    maritalStatus: 'Belum Kawin',
    familyRole: 'Anggota',
    ...initialData,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  const set = (key: keyof typeof form, value: string) => {
    setForm((f) => ({ ...f, [key]: value }));
    setErrors((e) => ({ ...e, [key]: '' }));
  };

  const isEdit = Boolean(initialData?.id);

  const validate = () => {
    const e: Record<string, string> = {};
    if (!isValidNik(form.nik)) e.nik = 'NIK harus 16 digit angka';
    if (!isValidKkNumber(form.kkNumber)) e.kkNumber = 'Nomor KK harus 16 digit angka';
    if (!form.fullName.trim()) e.fullName = 'Nama lengkap wajib diisi';
    if (!form.birthPlace.trim()) e.birthPlace = 'Tempat lahir wajib diisi';
    if (!form.birthDate || !isNotFutureDate(form.birthDate)) e.birthDate = 'Tanggal lahir tidak valid';
    if (!form.occupation.trim()) e.occupation = 'Pekerjaan wajib diisi';
    return e;
  };

  async function handleSubmit(ev: FormEvent) {
    ev.preventDefault();
    const e = validate();
    setErrors(e);
    if (Object.keys(e).length > 0) return;

    setLoading(true);
    try {
      const res = await fetch(isEdit && initialData?.id ? `/api/admin/residents?id=${initialData.id}` : '/api/admin/residents', {
        method: isEdit ? 'PATCH' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const json = await res.json();
      if (!json.success) throw new Error(json.error || 'Gagal menyimpan');
      router.push('/admin/kependudukan');
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
          <h1 className="text-[28px] font-bold">{isEdit ? 'Edit Penduduk' : 'Tambah Penduduk'}</h1>
          <p className="text-sm text-[var(--color-text-muted)] mt-1">Lengkapi data kependudukan warga sesuai KTP/KK.</p>
        </div>
        <div className="flex items-center gap-3">
          <Button type="button" variant="secondary" href="/admin/kependudukan">Batal</Button>
          <Button type="submit" disabled={loading}>{loading ? 'Menyimpan...' : isEdit ? 'Simpan Perubahan' : 'Simpan'}</Button>
        </div>
      </div>

      {errors.form && (
        <div className="mb-6 px-4 py-3 rounded-xl bg-[var(--color-danger)]/10 text-[var(--color-danger)] text-sm">{errors.form}</div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <h2 className="text-lg font-semibold mb-4">Data Identitas</h2>
          <div className="space-y-4">
            <div>
              <Label>NIK *</Label>
              <Input value={form.nik} onChange={(e) => set('nik', e.target.value)} placeholder="16 digit" maxLength={16} inputMode="numeric" />
              <FieldError message={errors.nik} />
            </div>
            <div>
              <Label>Nomor KK *</Label>
              <Input value={form.kkNumber} onChange={(e) => set('kkNumber', e.target.value)} placeholder="16 digit" maxLength={16} inputMode="numeric" />
              <FieldError message={errors.kkNumber} />
            </div>
            <div>
              <Label>Nama Lengkap *</Label>
              <Input value={form.fullName} onChange={(e) => set('fullName', e.target.value)} placeholder="Sesuai KTP" />
              <FieldError message={errors.fullName} />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label>Tempat Lahir *</Label>
                <Input value={form.birthPlace} onChange={(e) => set('birthPlace', e.target.value)} placeholder="Kota/Kabupaten" />
                <FieldError message={errors.birthPlace} />
              </div>
              <div>
                <Label>Tanggal Lahir *</Label>
                <Input type="date" value={form.birthDate} onChange={(e) => set('birthDate', e.target.value)} />
                <FieldError message={errors.birthDate} />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label>Jenis Kelamin</Label>
                <Select value={form.gender} onChange={(e) => set('gender', e.target.value)}>
                  <option>Laki-laki</option>
                  <option>Perempuan</option>
                </Select>
              </div>
              <div>
                <Label>Agama</Label>
                <Select value={form.religion} onChange={(e) => set('religion', e.target.value)}>
                  <option>Islam</option>
                  <option>Kristen Protestan</option>
                  <option>Katolik</option>
                  <option>Hindu</option>
                  <option>Buddha</option>
                </Select>
              </div>
            </div>
          </div>
        </Card>

        <Card>
          <h2 className="text-lg font-semibold mb-4">Data Pekerjaan</h2>
          <div className="space-y-4">
            <div>
              <Label>Pekerjaan *</Label>
              <Input value={form.occupation} onChange={(e) => set('occupation', e.target.value)} placeholder="Contoh: Petani" />
              <FieldError message={errors.occupation} />
            </div>
            <div>
              <Label>Status Perkawinan</Label>
              <Select value={form.maritalStatus} onChange={(e) => set('maritalStatus', e.target.value)}>
                <option>Belum Kawin</option>
                <option>Kawin</option>
                <option>Cerai Hidup</option>
                <option>Cerai Mati</option>
              </Select>
            </div>
            <div>
              <Label>Peran dalam Keluarga</Label>
              <Select value={form.familyRole} onChange={(e) => set('familyRole', e.target.value)}>
                <option>Kepala Keluarga</option>
                <option>Anggota</option>
              </Select>
            </div>
          </div>
        </Card>
      </div>
    </form>
  );
}