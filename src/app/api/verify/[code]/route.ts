import { createClient } from '@/lib/supabase';
import { success, notFound } from '@/lib/api-utils';

interface LetterTypeRow {
  name?: string;
}

interface VerifyRow {
  letter_number: string;
  issued_at: string;
  letter_types: LetterTypeRow | LetterTypeRow[] | null;
}

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

  const row = data as unknown as VerifyRow;
  const letterType = Array.isArray(row.letter_types)
    ? row.letter_types[0]?.name
    : row.letter_types?.name;

  return success({
    status: 'Sah',
    letterNumber: row.letter_number,
    issuedAt: row.issued_at,
    letterType,
  });
}
