import { success, error } from '@/lib/api-utils';
import { letterTypes } from '@/data/mock-data';

export async function GET() {
  const templates = letterTypes.map((lt) => ({
    id: lt.id,
    letter_type_id: lt.id,
    letter_types: lt,
    body_template: 'Template {{nama}} {{nik}} {{alamat}}',
    version: 1,
    is_active: true,
    created_at: new Date().toISOString(),
  }));
  return success(templates);
}

export async function POST(request: Request) {
  const body = await request.json();
  if (!body.letter_type_id || !body.body_template) return error('letter_type_id and body_template required');
  return success({ id: 'mock-' + Date.now(), ...body, version: 1, is_active: true }, 201);
}
