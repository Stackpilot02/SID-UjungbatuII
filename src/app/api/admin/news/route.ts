import { success, error } from '@/lib/api-utils';
import { getNews, addNews, updateNews, deleteNews, isNewsSlugTaken } from '@/lib/supabase-store';

export async function GET() {
  try {
    const data = await getNews();
    return success(data);
  } catch (err) {
    console.error('Ambil berita gagal:', err);
    return error('Gagal mengambil data berita', 500);
  }
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
    if (await isNewsSlugTaken(slug)) return error('Slug sudah digunakan');

    const record = await addNews({
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

export async function PATCH(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    if (!id) return error('Missing id');

    const body = await request.json();
    const { title, slug, category, excerpt, content, coverImageUrl, status, publishedAt } = body ?? {};

    if (title !== undefined && !title.trim()) return error('Judul berita wajib diisi');
    if (slug !== undefined && !slug.trim()) return error('Slug wajib diisi');
    if (category !== undefined && !category.trim()) return error('Kategori wajib diisi');
    if (content !== undefined && !content.trim()) return error('Isi berita wajib diisi');
    if (status !== undefined && !['draft', 'published'].includes(status)) return error('Status tidak valid');
    if (coverImageUrl !== undefined && typeof coverImageUrl !== 'string') return error('URL foto tidak valid');
    if (slug !== undefined && (await isNewsSlugTaken(slug, id))) return error('Slug sudah digunakan');

    const patch: Record<string, unknown> = {};
    if (title !== undefined) patch.title = title.trim();
    if (slug !== undefined) patch.slug = slug.trim();
    if (category !== undefined) patch.category = category.trim();
    if (excerpt !== undefined) patch.excerpt = excerpt.trim();
    if (content !== undefined) patch.content = content.trim();
    if (coverImageUrl !== undefined) patch.coverImageUrl = coverImageUrl.trim();
    if (status !== undefined) patch.status = status;
    if (publishedAt !== undefined) patch.publishedAt = publishedAt;

    const record = await updateNews(id, patch);
    if (!record) return error('Berita tidak ditemukan', 404);
    return success(record);
  } catch (err) {
    console.error('Perbarui berita gagal:', err);
    return error('Gagal memperbarui berita', 500);
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    if (!id) return error('Missing id');

    const ok = await deleteNews(id);
    if (!ok) return error('Berita tidak ditemukan', 404);
    return success({ id, deleted: true });
  } catch (err) {
    console.error('Hapus berita gagal:', err);
    return error('Gagal menghapus berita', 500);
  }
}