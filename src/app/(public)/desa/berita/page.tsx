import Card from '@/components/Card';
import Link from 'next/link';
import Image from 'next/image';
import { api } from '@/lib/api-client';
import { formatDate } from '@/lib/utils';
import { NewsItem } from '@/lib/types';

export const dynamic = 'force-dynamic';

export default async function BeritaPage() {
  const news = await api.get<NewsItem[]>('/api/news').catch(() => []);

  return (
    <div className="max-w-[1200px] mx-auto px-4 py-12">
      <div className="mb-10">
        <span className="text-xs uppercase tracking-[0.2em] text-[var(--color-accent-clay)] font-semibold">Informasi Desa</span>
        <h1 className="text-[32px] font-bold mt-2">Berita & Pengumuman</h1>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {(news || []).map((item: NewsItem) => (
          <Link key={item.id} href={`/desa/berita/${item.slug}`} className="block group">
            <Card className="h-full hover:shadow-md transition-shadow cursor-pointer" innerClassName="p-0 overflow-hidden flex flex-col">
              <div className="relative aspect-[16/10] overflow-hidden bg-[var(--color-primary-dark)]">
                {item.coverImageUrl ? (
                  <Image
                    src={item.coverImageUrl}
                    alt={item.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-primary-dark)]" />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                <span className="absolute top-3 left-3 text-xs px-2 py-0.5 rounded-full bg-white/90 text-[var(--color-primary-dark)] font-semibold backdrop-blur">
                  {item.category}
                </span>
              </div>
              <div className="p-5 flex flex-col flex-1">
                <span className="text-xs text-[var(--color-text-muted)] mb-2">{formatDate(item.publishedAt)}</span>
                <h2 className="font-semibold text-lg mb-2 leading-snug group-hover:text-[var(--color-primary)] transition-colors">{item.title}</h2>
                <p className="text-sm text-[var(--color-text-muted)] line-clamp-3 mt-auto">{item.excerpt}</p>
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
