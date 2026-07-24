import { success, error } from '@/lib/api-utils';
import { letterTypes } from '@/data/mock-data';

export async function POST(request: Request) {
  const body = await request.json();
  if (!body.letter_type_id || !body.resident_id) return error('letter_type_id and resident_id required');

  const lt = letterTypes.find((t) => t.id === body.letter_type_id);
  const seq = Math.floor(Math.random() * 999) + 1;
  const year = new Date().getFullYear();
  const month = new Date().getMonth() + 1;
  const letterNumber = `${String(seq).padStart(3, '0')}/${lt?.code || 'XXX'}/UB-II/${month}/${year}`;
  const qrCode = Math.random().toString(36).substring(2, 15);

  return success({
    id: 'mock-' + Date.now(),
    letter_number: letterNumber,
    letter_type_id: body.letter_type_id,
    resident_id: body.resident_id,
    qr_code: qrCode,
    issued_by: 'mock-admin',
    issued_at: new Date().toISOString(),
    is_batch: false,
  }, 201);
}
