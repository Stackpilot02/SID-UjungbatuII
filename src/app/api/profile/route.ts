import { success } from '@/lib/api-utils';
import { villageProfile, organizationStructure } from '@/data/mock-data';

export async function GET() {
  return success({ profile: villageProfile, structure: organizationStructure });
}
