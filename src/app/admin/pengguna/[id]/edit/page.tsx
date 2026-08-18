import { notFound } from 'next/navigation';
import UserForm from '../../baru/user-form';

export default async function AdminPenggunaEditPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const { users } = await import('@/data/mock-data');
  const item = users.find((u) => u.id === id);
  if (!item) notFound();

  return (
    <UserForm
      initialData={{
        id: item.id,
        fullName: item.fullName,
        email: item.email,
        role: item.role,
      }}
    />
  );
}