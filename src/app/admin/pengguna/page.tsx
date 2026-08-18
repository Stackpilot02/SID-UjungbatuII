import Card from '@/components/Card';
import Button from '@/components/Button';

const users = [
  { id: '1', name: 'Muhammad Yusuf Lubis', email: 'kades@ujungbatu2.desa.id', role: 'Kepala Desa' },
  { id: '2', name: 'Ahmad Siregar', email: 'sekdes@ujungbatu2.desa.id', role: 'Admin' },
  { id: '3', name: 'Fatimah Harahap', email: 'fatimah@ujungbatu2.desa.id', role: 'Operator' },
];

export default function AdminPenggunaPage() {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-[28px] font-bold">Manajemen Pengguna</h1>
        <Button variant="primary">+ Tambah Pengguna</Button>
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
                <td className="px-4 py-3 font-medium">{u.name}</td>
                <td className="px-4 py-3 text-[var(--color-text-muted)]">{u.email}</td>
                <td className="px-4 py-3"><span className="text-xs px-2 py-0.5 rounded bg-[var(--color-primary-tint)] text-[var(--color-primary)]">{u.role}</span></td>
                <td className="px-4 py-3"><button className="text-[var(--color-primary)] hover:underline text-xs">Edit</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
}
