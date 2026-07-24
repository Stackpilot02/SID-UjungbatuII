import { success, error } from '@/lib/api-utils';

export async function GET() {
  return success([]);
}

export async function POST(request: Request) {
  const body = await request.json();
  if (!body.category_id || !body.description) return error('category_id and description required');
  return success({ id: 'mock-' + Date.now(), ...body, status: 'received', reporter_id: 'mock-user', created_at: new Date().toISOString() }, 201);
}
