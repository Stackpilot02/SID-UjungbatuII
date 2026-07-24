'use client';

import { useState, FormEvent } from 'react';
import Card from '@/components/Card';
import Button from '@/components/Button';
import { createClient } from '@/lib/supabase';
import { complaintCategories } from '@/data/mock-data';

export default function PengaduanPage() {
  const [categoryId, setCategoryId] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const supabase = createClient();

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      setError('Silakan masuk terlebih dahulu untuk mengirim pengaduan');
      setLoading(false);
      return;
    }

    const { error: insertError } = await supabase.from('complaints').insert({
      reporter_id: user.id,
      category_id: categoryId,
      description,
      location,
    });

    if (insertError) {
      setError(insertError.message);
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
            {error && <p className="text-sm text-red-600 bg-red-50 rounded-lg px-3 py-2 mb-4">{error}</p>}
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <label className="block text-sm font-medium mb-1">Kategori</label>
                <select value={categoryId} onChange={(e) => setCategoryId(e.target.value)} required className="w-full border border-[var(--color-border)] rounded-lg px-3 py-2.5 text-sm bg-white" defaultValue="">
                  <option value="" disabled>Pilih kategori</option>
                  {complaintCategories.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Deskripsi</label>
                <textarea value={description} onChange={(e) => setDescription(e.target.value)} required className="w-full border border-[var(--color-border)] rounded-lg px-3 py-2.5 text-sm min-h-[120px] bg-white" placeholder="Jelaskan pengaduan Anda secara detail" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Lokasi</label>
                <input value={location} onChange={(e) => setLocation(e.target.value)} className="w-full border border-[var(--color-border)] rounded-lg px-3 py-2.5 text-sm bg-white" placeholder="Sebutkan lokasi kejadian" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Lampiran Foto (opsional)</label>
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
