import { createClient } from '@/lib/supabase';
import { success, error, notFound } from '@/lib/api-utils';

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ code: string }> }
) {
  const { code } = await params;
  const supabase = createClient();

  const { data, error: err } = await supabase
    .from('letters')
    .select('letter_number, issued_at, letter_types(name)')
    .eq('qr_code', code)
    .single();

  if (err || !data) return notFound();

  return success({
    status: 'Sah',
    letterNumber: data.letter_number,
    issuedAt: data.issued_at,
    letterType: Array.isArray(data.letter_types) ? data.letter_types[0]?.name : (data.letter_types as any)?.name,
  });
}
