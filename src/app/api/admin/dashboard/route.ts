import { success, error } from '@/lib/api-utils';
import { getDashboardData } from '@/lib/supabase-store';

export async function GET() {
  try {
    const { stats, letterRequests, complaints, activityLogs } = await getDashboardData();

    const recentFromLogs = activityLogs
      .slice()
      .reverse()
      .slice(0, 5)
      .map((l) => ({
        id: l.id,
        action: l.action,
        tableName: l.tableName,
        description: `${l.action} pada ${l.tableName}`,
        createdAt: l.createdAt,
      }));

    const recentFromRequests = letterRequests
      .slice()
      .reverse()
      .slice(0, 5)
      .map((r) => ({
        id: r.id,
        action: 'create',
        tableName: 'letter_requests',
        description: `Pengajuan ${r.letterTypeId} oleh ${r.requesterName}`,
        createdAt: r.createdAt,
      }));

    const recentActivity = [...recentFromLogs, ...recentFromRequests]
      .sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1))
      .slice(0, 5);

    return success({
      totalResidents: stats.totalPopulation,
      pendingRequests: letterRequests.filter((r) => ['pending', 'verified'].includes(r.status)).length,
      pendingComplaints: complaints.filter((c) => ['received', 'in_progress'].includes(c.status)).length,
      recentActivity,
    });
  } catch (err) {
    console.error('Ambil dashboard gagal:', err);
    return error('Gagal mengambil data dashboard', 500);
  }
}