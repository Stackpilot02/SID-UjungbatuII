import { success } from '@/lib/api-utils';
import { stats } from '@/data/mock-data';

export async function GET() {
  return success(stats);
}
