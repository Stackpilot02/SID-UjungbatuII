import { success, error } from '@/lib/api-utils';
import { getLetterTypes } from '@/lib/supabase-store';

export async function GET() {
  try {
    const data = await getLetterTypes();
    return success(data);
  } catch (err) {
    console.error('Ambil jenis surat gagal:', err);
    return error('Gagal mengambil data jenis surat', 500);
  }
}