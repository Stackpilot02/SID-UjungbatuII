import { success } from '@/lib/api-utils';
import { activityLogs } from '@/data/mock-data';

export async function GET() {
  return success(activityLogs.slice(0, 50));
}