import { success, error } from '@/lib/api-utils';
import { getComplaintCategories } from '@/lib/supabase-store';

export async function GET() {
  try {
    const data = await getComplaintCategories();
    return success(data);
  } catch (err) {
    console.error('Ambil kategori pengaduan gagal:', err);
    return error('Gagal mengambil data kategori pengaduan', 500);
  }
}