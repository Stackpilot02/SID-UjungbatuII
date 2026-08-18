import Card from '@/components/Card';
import Button from '@/components/Button';
import { getUsers } from '@/lib/supabase-store';

const roleLabels: Record<string, string> = {
  warga: 'Warga',
  operator: 'Operator',
  admin: 'Admin',
  kepala_desa: 'Kepala Desa',
};

export const dynamic = 'force-dynamic';

export default async function AdminPenggunaPage() {
  const users = await getUsers();

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-[28px] font-bold">Manajemen Pengguna</h1>
        <Button href="/admin/pengguna/baru" variant="primary">+ Tambah Pengguna</Button>
      </div>
      <Card className="overflow-hidden" innerClassName="p-0 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-[var(--color-bg)] border-b border-[var(--color-border)]">
            <tr>
              <th className="text-left px-4 py-3 font-medium">Nama</th>
              <th className="text-left px-4 py-3 font-medium">Email</th>
              <th className="text-left px-4 py-3 font-medium">Role</th>
              <th className="text-left px-4 py-3 font-medium">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u.id} className="border-b border-[var(--color-border)] last:border-0">
                <td className="px-4 py-3 font-medium">{u.fullName}</td>
                <td className="px-4 py-3 text-[var(--color-text-muted)]">{u.email}</td>
                <td className="px-4 py-3"><span className="text-xs px-2 py-0.5 rounded bg-[var(--color-primary-tint)] text-[var(--color-primary)]">{roleLabels[u.role] || u.role}</span></td>
                <td className="px-4 py-3"><a href={`/admin/pengguna/${u.id}/edit`} className="text-[var(--color-primary)] hover:underline text-xs">Edit</a></td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
}
