import Card from '@/components/Card';
import Button from '@/components/Button';
import { api } from '@/lib/api-client';
import { formatDate } from '@/lib/utils';
import { NewsItem } from '@/lib/types';
import { notFound } from 'next/navigation';

export const dynamic = 'force-dynamic';

export default async function BeritaDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const news = await api.get<NewsItem[]>('/api/news').catch(() => []);
  const item = (news || []).find((n: NewsItem) => n.slug === slug);
  if (!item) notFound();

  return (
    <div className="max-w-[800px] mx-auto px-4 py-12">
      <Button href="/desa/berita" variant="secondary" className="mb-6">&larr; Kembali</Button>
      <Card>
        <div className="flex items-center gap-3 mb-4">
          <span className="text-xs px-2 py-0.5 rounded bg-[var(--color-primary-tint)] text-[var(--color-primary)] font-medium">{item.category}</span>
          <span className="text-sm text-[var(--color-text-muted)]">{formatDate(item.publishedAt)}</span>
        </div>
        <h1 className="text-[32px] font-bold mb-6">{item.title}</h1>
        <div className="prose max-w-none text-[var(--color-text-muted)] leading-relaxed whitespace-pre-line">{item.content}</div>
      </Card>
    </div>
  );
}
