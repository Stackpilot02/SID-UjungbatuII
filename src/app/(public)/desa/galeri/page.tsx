import Card from '@/components/Card';
import { api } from '@/lib/api-client';
import { formatDate } from '@/lib/utils';

export default async function GaleriPage() {
  const items = await api.get<any[]>('/api/gallery').catch(() => []);

  return (
    <div className="max-w-[1200px] mx-auto px-4 py-12">
      <h1 className="text-[32px] font-bold mb-8">Galeri Kegiatan</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {(items || []).map((item: any) => (
          <Card key={item.id} className="overflow-hidden p-0">
            <div className="aspect-video bg-[var(--color-primary-tint)] flex items-center justify-center text-[var(--color-primary)]">
              <svg className="w-12 h-12 opacity-40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeWidth={1.5} d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3.75 21h16.5A2.25 2.25 0 0022.5 18.75V5.25A2.25 2.25 0 0020.25 3H3.75A2.25 2.25 0 001.5 5.25v13.5A2.25 2.25 0 003.75 21z" />
              </svg>
            </div>
            <div className="p-4">
              <h3 className="font-semibold text-sm mb-1">{item.title}</h3>
              <p className="text-xs text-[var(--color-text-muted)]">{formatDate(item.eventDate)}</p>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
