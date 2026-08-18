import { success, error } from '@/lib/api-utils';
import { letterTypes, letterTemplates, addLetterTemplate } from '@/data/mock-data';

export async function GET() {
  return success(letterTemplates);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { letterTypeId, name, numberFormat, bodyTemplate, isActive } = body ?? {};

    if (!letterTypeId) return error('Jenis surat wajib dipilih');
    if (!letterTypes.some((lt) => lt.id === letterTypeId)) return error('Jenis surat tidak valid');
    if (!name?.trim()) return error('Nama template wajib diisi');
    if (!numberFormat?.trim()) return error('Format nomor surat wajib diisi');
    if (!bodyTemplate?.trim()) return error('Isi template wajib diisi');

    const record = addLetterTemplate({
      letterTypeId,
      name: name.trim(),
      numberFormat: numberFormat.trim(),
      bodyTemplate: bodyTemplate.trim(),
      isActive: isActive !== false,
    });

    return success(record, 201);
  } catch (err) {
    console.error('Simpan template gagal:', err);
    return error('Gagal menyimpan template', 500);
  }
}