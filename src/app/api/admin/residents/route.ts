import { success, error } from '@/lib/api-utils';
import { residents } from '@/data/mock-data';

export async function GET() {
  return success(residents);
}

export async function POST(request: Request) {
  const body = await request.json();
  if (!body.nik || !body.full_name) return error('nik and full_name required');
  return success({ id: 'mock-' + Date.now(), ...body, created_by: 'mock-admin' }, 201);
}
