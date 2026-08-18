import { notFound } from 'next/navigation';
import NewsForm from '../../baru/news-form';
import { getNewsById } from '@/lib/supabase-store';

export default async function AdminKontenEditPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const item = await getNewsById(id);
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