import { success, error } from '@/lib/api-utils';

export async function GET() {
  return success([]);
}

export async function POST(request: Request) {
  const body = await request.json();
  if (!body.letter_type_id || !body.purpose) return error('letter_type_id and purpose required');
  return success({ id: 'mock-' + Date.now(), ...body, status: 'pending', created_at: new Date().toISOString() }, 201);
}
