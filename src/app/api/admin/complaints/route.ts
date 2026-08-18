import { success, error } from '@/lib/api-utils';
import { getComplaints, updateComplaint } from '@/lib/supabase-store';

export async function GET() {
  try {
    const data = await getComplaints();
    return success(data);
  } catch (err) {
    console.error('Ambil pengaduan gagal:', err);
    return error('Gagal mengambil data pengaduan', 500);
  }
}

export async function PATCH(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    if (!id) return error('Missing id');

    const body = await request.json();
    const record = await updateComplaint(id, body ?? {});
    if (!record) return error('Pengaduan tidak ditemukan', 404);
    return success(record);
  } catch (err) {
    console.error('Perbarui pengaduan gagal:', err);
    return error('Gagal memperbarui pengaduan', 500);
  }
}