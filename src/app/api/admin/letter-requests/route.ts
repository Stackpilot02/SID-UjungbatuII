import { success, error } from '@/lib/api-utils';
import { letterRequests } from '@/data/mock-data';

export async function GET() {
  return success(letterRequests);
}

export async function PATCH(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');
  if (!id) return error('Missing id');
  const body = await request.json();
  const idx = letterRequests.findIndex((r) => r.id === id);
  if (idx === -1) return error('Pengajuan tidak ditemukan', 404);
  letterRequests[idx] = { ...letterRequests[idx], ...body, id };
  return success(letterRequests[idx]);
}