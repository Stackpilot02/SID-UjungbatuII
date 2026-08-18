import { notFound } from 'next/navigation';
import UserForm from '../../baru/user-form';
import { getUserById } from '@/lib/supabase-store';

export default async function AdminPenggunaEditPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const item = await getUserById(id);
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