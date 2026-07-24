import { success } from '@/lib/api-utils';
import { galleryItems } from '@/data/mock-data';

export async function GET() {
  return success(galleryItems);
}
