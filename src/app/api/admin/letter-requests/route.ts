import { success, error } from '@/lib/api-utils';
import { getLetterRequests, updateLetterRequest } from '@/lib/supabase-store';

export async function GET() {
  try {
    const data = await getLetterRequests();
    return success(data);
  } catch (err) {
    console.error('Ambil pengajuan surat gagal:', err);
    return error('Gagal mengambil data pengajuan', 500);
  }
}

export async function PATCH(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    if (!id) return error('Missing id');

    const body = await request.json();
    const record = await updateLetterRequest(id, body ?? {});
    if (!record) return error('Pengajuan tidak ditemukan', 404);
    return success(record);
  } catch (err) {
    console.error('Perbarui pengajuan gagal:', err);
    return error('Gagal memperbarui pengajuan', 500);
  }
}