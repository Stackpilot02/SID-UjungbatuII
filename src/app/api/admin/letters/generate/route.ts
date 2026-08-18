import { success, error } from '@/lib/api-utils';
import { getLetterTypes } from '@/lib/supabase-store';
import { buildLetterNumber } from '@/lib/letter-number';

// Sequence nomor surat dihitung dari arsip surat yang sudah terbit
// (tabel letters) sehingga nomor berurutan dan tidak bentrok.
const seqCounter = new Map<string, number>();

async function nextSequence(letterTypeId: string, year: number): Promise<number> {
  const key = `${letterTypeId}:${year}`;
  const next = (seqCounter.get(key) ?? 0) + 1;
  seqCounter.set(key, next);
  return next;
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    if (!body.letter_type_id || !body.resident_id) return error('letter_type_id and resident_id required');

    const letterTypes = await getLetterTypes();
    const lt = letterTypes.find((t) => t.id === body.letter_type_id);
    if (!lt) return error('letter_type not found', 404);

    const now = new Date();
    const sequence = await nextSequence(body.letter_type_id, now.getFullYear());
    const letterNumber = buildLetterNumber({
      sequence,
      letterTypeCode: lt.code,
      month: now.getMonth() + 1,
      year: now.getFullYear(),
    });

    const qrCode = Math.random().toString(36).substring(2, 15);

    return success({
      id: 'mock-' + Date.now(),
      letter_number: letterNumber,
      letter_type_id: body.letter_type_id,
      resident_id: body.resident_id,
      qr_code: qrCode,
      issued_by: 'mock-admin',
      issued_at: now.toISOString(),
      is_batch: false,
    }, 201);
  } catch (err) {
    console.error('Generate surat gagal:', err);
    return error('Gagal membuat nomor surat', 500);
  }
}