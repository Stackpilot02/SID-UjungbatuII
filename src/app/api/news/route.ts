import { success } from '@/lib/api-utils';
import { news } from '@/data/mock-data';

export async function GET() {
  return success(news);
}
