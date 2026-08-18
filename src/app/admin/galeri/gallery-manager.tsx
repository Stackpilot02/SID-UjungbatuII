'use client';

import { useState, FormEvent, useEffect } from 'react';
import Image from 'next/image';
import Card from '@/components/Card';
import Button from '@/components/Button';
import { Label, Input } from '@/components/form';

interface GalleryItemRow {
  id: string;
  title: string;
  description: string;
  mediaUrl: string;
  eventDate: string;
}

export default function GalleryManager() {
  const [items, setItems] = useState<GalleryItemRow[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [mediaUrl, setMediaUrl] = useState('');
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    fetch('/api/gallery')
      .then((res) => res.json())
      .then((json) => {
        if (json.success) setItems(json.data as GalleryItemRow[]);
      })
      .finally(() => setLoaded(true));
  }, []);

  const refresh = async () => {
    const res = await fetch('/api/gallery');
    const json = await res.json();
    if (json.success) setItems(json.data as GalleryItemRow[]);
  };

  const handleUpload = async (file: File) => {
    setUploading(true);
    setErrorMsg('');
    try {
      const fd = new FormData();
      fd.append('file', file);
      const res = await fetch('/api/admin/gallery/upload', { method: 'POST', body: fd });
      const json = await res.json();
      if (!json.success) throw new Error(json.error || 'Upload gagal');
      setMediaUrl(json.data.url);
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : 'Upload gagal');
    } finally {
      setUploading(false);
    }
  };

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!title.trim()) { setErrorMsg('Judul foto wajib diisi'); return; }
    if (!mediaUrl.trim()) { setErrorMsg('Unggah foto terlebih dahulu'); return; }

    setSaving(true);
    setErrorMsg('');
    try {
      const res = await fetch('/api/gallery', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, description, mediaUrl, mediaType: 'image', eventDate: eventDate || undefined }),
      });
      const json = await res.json();
      if (!json.success) throw new Error(json.error || 'Simpan gagal');
      setTitle('');
      setDescription('');
      setEventDate('');
      setMediaUrl('');
      await refresh();
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : 'Simpan gagal');
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id: string) {
    if (!window.confirm('Hapus foto dari galeri?')) return;
    const res = await fetch(`/api/gallery?id=${id}`, { method: 'DELETE' });
    const json = await res.json();
    if (json.success) await refresh();
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-[28px] font-bold">Galeri Foto</h1>
          <p className="text-sm text-[var(--color-text-muted)] mt-1">Kelola foto kegiatan desa yang tampil di halaman publik.</p>
        </div>
      </div>

      {errorMsg && (
        <div className="mb-6 px-4 py-3 rounded-xl bg-[var(--color-danger)]/10 text-[var(--color-danger)] text-sm">{errorMsg}</div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="lg:col-span-1">
          <Card>
            <h2 className="text-lg font-semibold mb-4">Tambah Foto</h2>
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <Label>Judul *</Label>
                <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Contoh: Gotong Royong" />
              </div>
              <div>
                <Label>Deskripsi</Label>
                <Input value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Deskripsi singkat (opsional)" />
              </div>
              <div>
                <Label>Tanggal Kegiatan</Label>
                <Input type="date" value={eventDate} onChange={(e) => setEventDate(e.target.value)} />
              </div>
              <div>
                <Label>Foto *</Label>
                <div className="relative aspect-[16/10] overflow-hidden rounded-xl bg-[var(--color-bg)] mb-3">
                  {mediaUrl ? (
                    <Image src={mediaUrl} alt="Pratinjau foto" fill sizes="(max-width: 400px) 100vw, 300px" className="object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-sm text-[var(--color-text-muted)]">Belum ada foto</div>
                  )}
                </div>
                <label className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-full border border-[var(--color-primary)]/30 text-[var(--color-primary)] text-sm hover:bg-[var(--color-primary-tint)] transition-colors cursor-pointer">
                  {uploading ? 'Mengunggah...' : 'Unggah Foto'}
                  <input
                    type="file"
                    accept="image/jpeg,image/png,image/webp"
                    className="hidden"
                    disabled={uploading}
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) handleUpload(file);
                      e.target.value = '';
                    }}
                  />
                </label>
                <p className="text-xs text-[var(--color-text-muted)] mt-2">Format JPG, PNG, atau WebP. Maksimal 5 MB.</p>
              </div>
              <Button type="submit" variant="primary" disabled={saving || uploading}>
                {saving ? 'Menyimpan...' : 'Tambah ke Galeri'}
              </Button>
            </form>
          </Card>
        </div>

        <div className="lg:col-span-2">
          <Card className="overflow-hidden" innerClassName="p-0 overflow-hidden">
            {!loaded ? (
              <p className="text-sm text-[var(--color-text-muted)] p-6">Memuat galeri...</p>
            ) : items.length === 0 ? (
              <div className="text-center py-12 text-[var(--color-text-muted)]">
                <p className="text-lg font-medium mb-1">Galeri masih kosong</p>
                <p className="text-sm">Tambahkan foto kegiatan desa melalui form di samping.</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-px bg-[var(--color-border)]">
                {items.map((item) => (
                  <div key={item.id} className="bg-[var(--color-surface)] group relative">
                    <div className="relative aspect-[16/11] overflow-hidden">
                      <Image src={item.mediaUrl} alt={item.title} fill sizes="(max-width: 768px) 50vw, 33vw" className="object-cover" />
                    </div>
                    <div className="p-3">
                      <div className="font-medium text-sm truncate">{item.title}</div>
                      <div className="text-xs text-[var(--color-text-muted)]">{item.eventDate || '-'}</div>
                    </div>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="absolute top-2 right-2 bg-[var(--color-danger)] text-white text-xs px-2 py-1 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      Hapus
                    </button>
                  </div>
                ))}
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
}