import { notFound } from 'next/navigation';
import NewsForm from '../../baru/news-form';

export default async function AdminKontenEditPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const { news } = await import('@/data/mock-data');
  const item = news.find((n) => n.id === id);
  if (!item) notFound();

  return (
    <NewsForm
      initialData={{
        id: item.id,
        title: item.title,
        slug: item.slug,
        category: item.category,
        excerpt: item.excerpt,
        content: item.content,
        status: item.status as 'draft' | 'published',
        coverImageUrl: item.coverImageUrl,
        publishedAt: item.publishedAt ? item.publishedAt.slice(0, 10) : '',
      }}
    />
  );
}