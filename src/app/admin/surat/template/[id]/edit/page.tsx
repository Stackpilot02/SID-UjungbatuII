import { notFound } from 'next/navigation';
import TemplateForm from '../../baru/template-form';
import { getLetterTemplateById } from '@/lib/supabase-store';

export default async function AdminTemplateEditPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const item = await getLetterTemplateById(id);
  if (!item) notFound();

  return (
    <TemplateForm
      initialData={{
        id: item.id,
        letterTypeId: item.letterTypeId,
        name: item.name,
        numberFormat: item.numberFormat,
        bodyTemplate: item.bodyTemplate,
        isActive: item.isActive,
      }}
    />
  );
}