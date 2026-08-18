import { success, error } from '@/lib/api-utils';
import { complaints } from '@/data/mock-data';

export async function GET() {
  return success(complaints);
}

export async function PATCH(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');
  if (!id) return error('Missing id');
  const body = await request.json();
  const idx = complaints.findIndex((c) => c.id === id);
  if (idx === -1) return error('Pengaduan tidak ditemukan', 404);
  complaints[idx] = { ...complaints[idx], ...body, id };
  return success(complaints[idx]);
}