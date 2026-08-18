import { success, error } from '@/lib/api-utils';
import { getActivityLogs } from '@/lib/supabase-store';

export async function GET() {
  try {
    const data = await getActivityLogs();
    return success(data.slice(0, 50));
  } catch (err) {
    console.error('Ambil log aktivitas gagal:', err);
    return error('Gagal mengambil data log aktivitas', 500);
  }
}