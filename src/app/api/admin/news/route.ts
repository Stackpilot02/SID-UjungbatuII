import { success, error } from '@/lib/api-utils';
import { news, addNews } from '@/data/mock-data';

export async function GET() {
  return success(news);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { title, slug, category, excerpt, content, coverImageUrl, status, publishedAt } = body ?? {};

    if (!title?.trim()) return error('Judul berita wajib diisi');
    if (!slug?.trim()) return error('Slug wajib diisi');
    if (!category?.trim()) return error('Kategori wajib diisi');
    if (!content?.trim()) return error('Isi berita wajib diisi');
    if (!['draft', 'published'].includes(status ?? 'published')) return error('Status tidak valid');
    if (coverImageUrl && typeof coverImageUrl !== 'string') return error('URL foto tidak valid');

    const record = addNews({
      title: title.trim(),
      slug: slug.trim(),
      category: category.trim(),
      excerpt: (excerpt ?? '').trim(),
      content: content.trim(),
      coverImageUrl: (coverImageUrl ?? '').trim(),
      status,
      authorId: 'mock-admin',
      publishedAt: publishedAt ?? new Date().toISOString(),
    });

    return success(record, 201);
  } catch (err) {
    console.error('Simpan berita gagal:', err);
    return error('Gagal menyimpan berita', 500);
  }
}