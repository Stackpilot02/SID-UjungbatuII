import { success } from '@/lib/api-utils';
import { archivedLetters } from '@/data/mock-data';

export async function GET() {
  return success(archivedLetters);
}