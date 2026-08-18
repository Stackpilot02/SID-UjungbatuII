import { success, error } from '@/lib/api-utils';
import { getLetterRequestById } from '@/lib/supabase-store';

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ ref: string }> }
) {
  try {
    const { ref } = await params;
    const found = await getLetterRequestById(ref);
    if (!found) return error('Pengajuan tidak ditemukan', 404);
    return success(found);
  } catch (err) {
    console.error('Cek status pengajuan gagal:', err);
    return error('Gagal mengambil status pengajuan', 500);
  }
}