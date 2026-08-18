import { success, error } from '@/lib/api-utils';
import { galleryItems, addGalleryItem, deleteGalleryItem } from '@/data/mock-data';

export async function GET() {
  return success(galleryItems);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { title, description, mediaUrl, mediaType, eventDate } = body ?? {};

    if (!title?.trim()) return error('Judul foto wajib diisi');
    if (!mediaUrl?.trim()) return error('URL foto wajib diisi');
    if (!['image', 'video'].includes(mediaType ?? 'image')) return error('Tipe media tidak valid');

    const record = addGalleryItem({
      title: title.trim(),
      description: (description ?? '').trim(),
      mediaUrl: mediaUrl.trim(),
      mediaType,
      eventDate: (eventDate ?? new Date().toISOString().slice(0, 10)).trim(),
    });

    return success(record, 201);
  } catch (err) {
    console.error('Tambah foto galeri gagal:', err);
    return error('Gagal menambah foto galeri', 500);
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    if (!id) return error('Missing id');

    const ok = deleteGalleryItem(id);
    if (!ok) return error('Foto tidak ditemukan', 404);
    return success({ id, deleted: true });
  } catch (err) {
    console.error('Hapus foto galeri gagal:', err);
    return error('Gagal menghapus foto galeri', 500);
  }
}