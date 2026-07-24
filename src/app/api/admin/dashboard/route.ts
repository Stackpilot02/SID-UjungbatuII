import { success } from '@/lib/api-utils';
import { stats } from '@/data/mock-data';

export async function GET() {
  return success({
    totalResidents: stats.totalPopulation,
    pendingRequests: 0,
    pendingComplaints: 0,
    recentActivity: [],
  });
}
