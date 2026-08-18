import { success, error } from '@/lib/api-utils';
import { addComplaint, complaints } from '@/data/mock-data';

export async function GET() {
  return success(complaints);
}

export async function POST(request: Request) {
  const body = await request.json();
  if (!body.categoryId || !body.description) return error('categoryId dan description wajib diisi');
  const record = addComplaint({
    categoryId: body.categoryId,
    description: body.description,
    location: body.location || '',
    reporterName: body.reporterName || 'Anonim',
  });
  return success(record, 201);
}