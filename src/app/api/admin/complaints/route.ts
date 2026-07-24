import { success, error } from '@/lib/api-utils';

export async function GET() {
  return success([]);
}

export async function PATCH(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');
  if (!id) return error('Missing id');
  const body = await request.json();
  return success({ id, ...body, handled_by: 'mock-admin' });
}
