import { success } from '@/lib/api-utils';
import { news } from '@/data/mock-data';

export async function GET() {
  return success(news);
}

export async function POST(request: Request) {
  const body = await request.json();
  return success({ id: 'mock-' + Date.now(), ...body, author_id: 'mock-admin' }, 201);
}
