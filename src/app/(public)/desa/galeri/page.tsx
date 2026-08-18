import GalleryGrid from '@/components/GalleryGrid';
import { api } from '@/lib/api-client';
import { GalleryItem } from '@/lib/types';

export const dynamic = 'force-dynamic';

export default async function GaleriPage() {
  const items = await api.get<GalleryItem[]>('/api/gallery').catch(() => []);

  return (
    <div className="max-w-[1200px] mx-auto px-4 py-12">
      <div className="mb-10">
        <span className="text-xs uppercase tracking-[0.2em] text-[var(--color-accent-clay)] font-semibold">Dokumentasi</span>
        <h1 className="text-[32px] font-bold mt-2">Galeri Kegiatan</h1>
        <p className="text-[var(--color-text-muted)] mt-3 max-w-xl">Dokumentasi kegiatan dan momen bersama warga Desa Ujungbatu II.</p>
      </div>
      <GalleryGrid items={items || []} />
    </div>
  );
}