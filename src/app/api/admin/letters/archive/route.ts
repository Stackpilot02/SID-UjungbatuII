import { success, error } from '@/lib/api-utils';
import { getArchivedLetters } from '@/lib/supabase-store';

export async function GET() {
  try {
    const data = await getArchivedLetters();
    return success(data);
  } catch (err) {
    console.error('Ambil arsip surat gagal:', err);
    return error('Gagal mengambil data arsip surat', 500);
  }
}