import { notFound } from 'next/navigation';
import ResidentForm from '../../baru/resident-form';
import { getResidentById } from '@/lib/supabase-store';

export default async function AdminKependudukanEditPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const item = await getResidentById(id);
  if (!item) notFound();

  return (
    <ResidentForm
      initialData={{
        id: item.id,
        nik: item.nik,
        kkNumber: item.kkNumber,
        fullName: item.fullName,
        birthPlace: item.birthPlace,
        birthDate: item.birthDate,
        gender: item.gender,
        occupation: item.occupation,
        religion: item.religion,
        maritalStatus: item.maritalStatus,
        familyRole: item.familyRole,
      }}
    />
  );
}