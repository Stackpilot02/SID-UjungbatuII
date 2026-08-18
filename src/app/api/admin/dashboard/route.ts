import { success } from '@/lib/api-utils';
import { stats, letterRequests } from '@/data/mock-data';

// TODO: konfirmasi — dashboard sementara membaca dari mock store.
// Integrasi final membaca langsung dari tabel letter_requests, complaints,
// dan activity_logs di Supabase (schema.md §3.11, §3.13).
export async function GET() {
  return success({
    totalResidents: stats.totalPopulation,
    pendingRequests: letterRequests.filter((r) => ['pending', 'verified'].includes(r.status)).length,
    pendingComplaints: 0,
    recentActivity: letterRequests
      .slice()
      .reverse()
      .slice(0, 5)
      .map((r) => ({
        id: r.id,
        action: 'create',
        tableName: 'letter_requests',
        description: `Pengajuan ${r.letterTypeId} oleh ${r.requesterName}`,
        createdAt: r.createdAt,
      })),
  });
}