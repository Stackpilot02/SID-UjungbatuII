import { success, error } from '@/lib/api-utils';
import { getStats } from '@/lib/supabase-store';

export async function GET() {
  try {
    const data = await getStats();
    return success(data);
  } catch (err) {
    console.error('Ambil statistik gagal:', err);
    return error('Gagal mengambil data statistik', 500);
  }
}