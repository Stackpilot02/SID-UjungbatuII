'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Card from '@/components/Card';
import Button from '@/components/Button';

type FormState = {
  title: string;
  slug: string;
  category: string;
  excerpt: string;
  content: string;
  status: 'draft' | 'published';
  coverImageUrl: string;
  publishedAt: string;
};

function slugify(value: string): string {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

const inputClass =
  'w-full px-4 py-3 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] text-sm focus:outline-none focus:border-[var(--color-primary)] transition-colors';
const labelClass = 'block text-sm font-medium mb-1.5 text-[var(--color-text)]';

export default function NewsForm() {
  const router = useRouter();
  const [form, setForm] = useState<FormState>({
    title: '',
    slug: '',
    category: 'berita',
    excerpt: '',
    content: '',
    status: 'published',
    coverImageUrl: '',
    publishedAt: '',
  });
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const set = <K extends keyof FormState>(key: K, value: FormState[K]) => {
    setForm((f) => ({ ...f, [key]: value }));
  };

  const handleTitle = (value: string) => {
    setForm((f) => ({ ...f, title: value, slug: slugify(value) }));
  };

  const handleUpload = async (file: File) => {
    setUploading(true);
    setErrorMsg('');
    try {
      const fd = new FormData();
      fd.append('file', file);
      const res = await fetch('/api/admin/news/upload', { method: 'POST', body: fd });
      const json = await res.json();
      if (!json.success) throw new Error(json.error || 'Upload gagal');
      set('coverImageUrl', json.data.url);
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : 'Upload gagal');
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title.trim() || !form.content.trim()) {
      setErrorMsg('Judul dan isi berita wajib diisi');
      return;
    }
    setSaving(true);
    setErrorMsg('');
    try {
      const res = await fetch('/api/admin/news', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, publishedAt: form.publishedAt || undefined }),
      });
      const json = await res.json();
      if (!json.success) throw new Error(json.error || 'Simpan gagal');
      router.push('/admin/konten');
      router.refresh();
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : 'Simpan gagal');
      setSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-[28px] font-bold">Buat Berita</h1>
          <p className="text-sm text-[var(--color-text-muted)] mt-1">Lengkapi informasi dan unggah foto cover berita.</p>
        </div>
        <div className="flex items-center gap-3">
          <Button type="button" variant="secondary" href="/admin/konten">Batal</Button>
          <Button type="submit" disabled={saving}>{saving ? 'Menyimpan...' : 'Simpan Berita'}</Button>
        </div>
      </div>

      {errorMsg && (
        <div className="mb-6 px-4 py-3 rounded-xl bg-[var(--color-danger)]/10 text-[var(--color-danger)] text-sm">
          {errorMsg}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-5">
          <Card>
            <h2 className="text-lg font-semibold mb-4">Konten</h2>
            <div className="space-y-4">
              <div>
                <label className={labelClass}>Judul Berita *</label>
                <input
                  className={inputClass}
                  value={form.title}
                  onChange={(e) => handleTitle(e.target.value)}
                  placeholder="Contoh: Kegiatan Gotong Royong Desa"
                />
              </div>
              <div>
                <label className={labelClass}>Slug (URL)</label>
                <input
                  className={`${inputClass} text-[var(--color-text-muted)]`}
                  value={form.slug}
                  onChange={(e) => set('slug', e.target.value)}
                />
              </div>
              <div>
                <label className={labelClass}>Ringkasan (Excerpt)</label>
                <textarea
                  className={`${inputClass} min-h-[72px]`}
                  value={form.excerpt}
                  onChange={(e) => set('excerpt', e.target.value)}
                  placeholder="Ringkasan singkat berita (opsional)"
                />
              </div>
              <div>
                <label className={labelClass}>Isi Berita *</label>
                <textarea
                  className={`${inputClass} min-h-[220px]`}
                  value={form.content}
                  onChange={(e) => set('content', e.target.value)}
                  placeholder="Tulis isi berita di sini..."
                />
              </div>
            </div>
          </Card>
        </div>

        <div className="space-y-5">
          <Card>
            <h2 className="text-lg font-semibold mb-4">Pengaturan</h2>
            <div className="space-y-4">
              <div>
                <label className={labelClass}>Kategori</label>
                <select className={inputClass} value={form.category} onChange={(e) => set('category', e.target.value)}>
                  <option value="berita">Berita</option>
                  <option value="pengumuman">Pengumuman</option>
                  <option value="kegiatan">Kegiatan</option>
                </select>
              </div>
              <div>
                <label className={labelClass}>Status</label>
                <select className={inputClass} value={form.status} onChange={(e) => set('status', e.target.value as FormState['status'])}>
                  <option value="published">Terbit</option>
                  <option value="draft">Draft</option>
                </select>
              </div>
              <div>
                <label className={labelClass}>Tanggal Terbit</label>
                <input
                  type="date"
                  className={inputClass}
                  value={form.publishedAt}
                  onChange={(e) => set('publishedAt', e.target.value)}
                />
              </div>
            </div>
          </Card>

          <Card>
            <h2 className="text-lg font-semibold mb-4">Foto Cover</h2>
            <div className="relative aspect-[16/9] overflow-hidden rounded-xl bg-[var(--color-bg)] mb-3">
              {form.coverImageUrl ? (
                <Image src={form.coverImageUrl} alt="Cover berita" fill sizes="(max-width: 400px) 100vw, 300px" className="object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-sm text-[var(--color-text-muted)]">
                  Belum ada foto
                </div>
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
          </Card>
        </div>
      </div>
    </form>
  );
}