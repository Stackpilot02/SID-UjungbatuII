import { success, error } from '@/lib/api-utils';
import { getPublishedNews } from '@/lib/supabase-store';

export async function GET() {
  try {
    const data = await getPublishedNews();
    return success(data);
  } catch (err) {
    console.error('Ambil berita gagal:', err);
    return error('Gagal mengambil data berita', 500);
  }
}