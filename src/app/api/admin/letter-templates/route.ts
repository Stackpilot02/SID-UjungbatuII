import { success, error } from '@/lib/api-utils';
import { letterTypes, letterTemplates, addLetterTemplate, updateLetterTemplate, deleteLetterTemplate } from '@/data/mock-data';

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

export async function PATCH(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    if (!id) return error('Missing id');

    const body = await request.json();
    const { letterTypeId, name, numberFormat, bodyTemplate, isActive } = body ?? {};

    if (letterTypeId !== undefined) {
      if (!letterTypeId) return error('Jenis surat wajib dipilih');
      if (!letterTypes.some((lt) => lt.id === letterTypeId)) return error('Jenis surat tidak valid');
    }
    if (name !== undefined && !name.trim()) return error('Nama template wajib diisi');
    if (numberFormat !== undefined && !numberFormat.trim()) return error('Format nomor surat wajib diisi');
    if (bodyTemplate !== undefined && !bodyTemplate.trim()) return error('Isi template wajib diisi');

    const patch: Record<string, unknown> = {};
    if (letterTypeId !== undefined) patch.letterTypeId = letterTypeId;
    if (name !== undefined) patch.name = name.trim();
    if (numberFormat !== undefined) patch.numberFormat = numberFormat.trim();
    if (bodyTemplate !== undefined) patch.bodyTemplate = bodyTemplate.trim();
    if (isActive !== undefined) patch.isActive = isActive;

    const record = updateLetterTemplate(id, patch);
    if (!record) return error('Template tidak ditemukan', 404);
    return success(record);
  } catch (err) {
    console.error('Perbarui template gagal:', err);
    return error('Gagal memperbarui template', 500);
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    if (!id) return error('Missing id');

    const ok = deleteLetterTemplate(id);
    if (!ok) return error('Template tidak ditemukan', 404);
    return success({ id, deleted: true });
  } catch (err) {
    console.error('Hapus template gagal:', err);
    return error('Gagal menghapus template', 500);
  }
}