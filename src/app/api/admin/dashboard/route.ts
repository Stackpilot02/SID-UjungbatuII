import { success } from '@/lib/api-utils';
import { stats, letterRequests, complaints, activityLogs } from '@/data/mock-data';

// TODO: konfirmasi — dashboard sementara membaca dari mock store.
// Integrasi final membaca langsung dari tabel letter_requests, complaints,
// dan activity_logs di Supabase (schema.md §3.11, §3.13).
export async function GET() {
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
    pendingComplaints: complaints.filter((c) => ['pending', 'processed'].includes(c.status)).length,
    recentActivity,
  });
}