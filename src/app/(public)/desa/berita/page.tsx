import Card from '@/components/Card';
import Link from 'next/link';
import { api } from '@/lib/api-client';
import { formatDate } from '@/lib/utils';

export default async function BeritaPage() {
  const news = await api.get<any[]>('/api/news').catch(() => []);

  return (
    <div className="max-w-[1200px] mx-auto px-4 py-12">
      <h1 className="text-[32px] font-bold mb-8">Berita & Pengumuman</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {(news || []).map((item: any) => (
          <Link key={item.id} href={`/desa/berita/${item.slug}`}>
            <Card className="h-full hover:shadow-md transition-shadow cursor-pointer">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xs px-2 py-0.5 rounded bg-[var(--color-primary-tint)] text-[var(--color-primary)] font-medium">{item.category}</span>
                <span className="text-xs text-[var(--color-text-muted)]">{formatDate(item.publishedAt)}</span>
              </div>
              <h2 className="font-semibold text-lg mb-2 leading-snug">{item.title}</h2>
              <p className="text-sm text-[var(--color-text-muted)] line-clamp-3">{item.excerpt}</p>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
