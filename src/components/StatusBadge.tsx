import Badge from './Badge';

const statusMap: Record<string, { label: string; variant: 'default' | 'success' | 'warning' | 'danger' }> = {
  pending: { label: 'Menunggu', variant: 'default' },
  verified: { label: 'Terverifikasi', variant: 'warning' },
  approved: { label: 'Disetujui', variant: 'warning' },
  rejected: { label: 'Ditolak', variant: 'danger' },
  completed: { label: 'Selesai', variant: 'success' },
  received: { label: 'Diterima', variant: 'default' },
  in_progress: { label: 'Diproses', variant: 'warning' },
  resolved: { label: 'Selesai', variant: 'success' },
  draft: { label: 'Draf', variant: 'default' },
  published: { label: 'Dipublikasikan', variant: 'success' },
  archived: { label: 'Diarsipkan', variant: 'default' },
};

export default function StatusBadge({ status }: { status: string }) {
  const config = statusMap[status] || { label: status, variant: 'default' as const };
  return <Badge variant={config.variant}>{config.label}</Badge>;
}
