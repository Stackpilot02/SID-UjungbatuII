import { notFound } from 'next/navigation';
import ResidentForm from '../../baru/resident-form';

export default async function AdminKependudukanEditPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const { residents } = await import('@/data/mock-data');
  const item = residents.find((r) => r.id === id);
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