import { success, error } from '@/lib/api-utils';
import { getComplaints, addComplaint } from '@/lib/supabase-store';

export async function GET() {
  try {
    const data = await getComplaints();
    return success(data);
  } catch (err) {
    console.error('Ambil pengaduan gagal:', err);
    return error('Gagal mengambil data pengaduan', 500);
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    if (!body.categoryId || !body.description) return error('categoryId dan description wajib diisi');

    const record = await addComplaint({
      categoryId: body.categoryId,
      description: body.description,
      location: body.location || '',
      reporterName: body.reporterName || 'Anonim',
    });
    return success(record, 201);
  } catch (err) {
    console.error('Simpan pengaduan gagal:', err);
    return error('Gagal menyimpan pengaduan', 500);
  }
}