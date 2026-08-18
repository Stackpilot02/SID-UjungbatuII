'use client';

import { useState, FormEvent, useEffect } from 'react';
import Card from '@/components/Card';
import Button from '@/components/Button';
import { Label, Input, Textarea, Select } from '@/components/form';

export default function PengaduanPage() {
  const [complaintCategories, setComplaintCategories] = useState<{ id: string; name: string; defaultSlaDays: number }[]>([]);
  const [categoryId, setCategoryId] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    fetch('/api/complaint-categories')
      .then((res) => res.json())
      .then((json) => {
        if (json.success) setComplaintCategories(json.data);
      })
      .catch(() => setComplaintCategories([]));
  }, []);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/complaints', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ categoryId, description, location }),
      });
      const json = await res.json();
      if (!res.ok || !json.success) {
        setError(json.error || 'Gagal mengirim pengaduan');
        setLoading(false);
        return;
      }
    } catch {
      setError('Terjadi kesalahan jaringan. Silakan coba lagi.');
      setLoading(false);
      return;
    }

    setSuccess(true);
    setLoading(false);
  }

  if (success) {
    return (
      <div className="max-w-[1200px] mx-auto px-4 py-12">
        <Card className="max-w-2xl mx-auto text-center">
          <h1 className="text-[32px] font-bold mb-4">Pengaduan Terkirim</h1>
          <p className="text-[var(--color-text-muted)] mb-6">Terima kasih, pengaduan Anda telah kami terima dan akan segera ditindaklanjuti.</p>
          <Button variant="accent" href="/desa/pengaduan">Kirim Lagi</Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-[1200px] mx-auto px-4 py-12">
      <h1 className="text-[32px] font-bold mb-4">Pengaduan Masyarakat</h1>
      <p className="text-[var(--color-text-muted)] mb-8 max-w-2xl">
        Sampaikan aspirasi, keluhan, atau laporan Anda kepada Pemerintah Desa. Setiap pengaduan akan ditindaklanjuti sesuai dengan kategori dan SLA yang berlaku.
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
        <div className="lg:col-span-2">
          <Card>
            <h2 className="text-[22px] font-semibold mb-6">Sampaikan Pengaduan</h2>
            {error && <p className="text-sm text-[var(--color-danger)] bg-[var(--color-danger)]/10 rounded-xl px-4 py-3 mb-5">{error}</p>}
            <form className="space-y-5" onSubmit={handleSubmit}>
              <div>
                <Label>Kategori</Label>
                <Select value={categoryId} onChange={(e) => setCategoryId(e.target.value)} required defaultValue="">
                  <option value="" disabled>Pilih kategori</option>
                  {complaintCategories.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
                </Select>
              </div>
              <div>
                <Label>Deskripsi</Label>
                <Textarea value={description} onChange={(e) => setDescription(e.target.value)} required className="min-h-[120px]" placeholder="Jelaskan pengaduan Anda secara detail" />
              </div>
              <div>
                <Label>Lokasi</Label>
                <Input value={location} onChange={(e) => setLocation(e.target.value)} placeholder="Sebutkan lokasi kejadian" />
              </div>
              <div>
                <Label>Lampiran Foto (opsional)</Label>
                <input type="file" className="w-full text-sm" accept="image/*" />
                <p className="text-xs text-[var(--color-text-muted)] mt-1">Maks. 5MB, format JPG/PNG</p>
              </div>
              <Button variant="accent" type="submit" disabled={loading}>{loading ? 'Mengirim...' : 'Kirim Pengaduan'}</Button>
            </form>
          </Card>
        </div>
        <div className="space-y-4">
          <Card>
            <h3 className="font-semibold mb-3">Kategori & SLA</h3>
            <div className="space-y-2">
              {complaintCategories.map((c) => (
                <div key={c.id} className="flex justify-between text-sm">
                  <span>{c.name}</span>
                  <span className="text-[var(--color-text-muted)]">{c.defaultSlaDays} hari</span>
                </div>
              ))}
            </div>
          </Card>
          <Card>
            <h3 className="font-semibold mb-2">Butuh Bantuan?</h3>
            <p className="text-sm text-[var(--color-text-muted)]">Hubungi kantor desa langsung atau melalui nomor telepon yang tersedia di halaman kontak.</p>
          </Card>
        </div>
      </div>
    </div>
  );
}
