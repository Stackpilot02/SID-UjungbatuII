import { success, error } from '@/lib/api-utils';
import { letterRequests } from '@/data/mock-data';

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ ref: string }> }
) {
  const { ref } = await params;
  const found = letterRequests.find((r) => r.id === ref);
  if (!found) return error('Pengajuan tidak ditemukan', 404);
  return success(found);
}