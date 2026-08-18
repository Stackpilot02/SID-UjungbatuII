import { success, error } from '@/lib/api-utils';
import {
  getLetterTypes,
  getLetterTemplates,
  addLetterTemplate,
  updateLetterTemplate,
  deleteLetterTemplate,
} from '@/lib/supabase-store';

export async function GET() {
  try {
    const [letterTypes, templates] = await Promise.all([
      getLetterTypes(),
      getLetterTemplates(),
    ]);
    return success(templates.map((t) => ({ ...t, letterType: letterTypes.find((lt) => lt.id === t.letterTypeId)?.name ?? t.letterTypeId })));
  } catch (err) {
    console.error('Ambil template surat gagal:', err);
    return error('Gagal mengambil data template surat', 500);
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { letterTypeId, name, numberFormat, bodyTemplate, isActive } = body ?? {};
    const letterTypes = await getLetterTypes();

    if (!letterTypeId) return error('Jenis surat wajib dipilih');
    if (!letterTypes.some((lt) => lt.id === letterTypeId)) return error('Jenis surat tidak valid');
    if (!name?.trim()) return error('Nama template wajib diisi');
    if (!numberFormat?.trim()) return error('Format nomor surat wajib diisi');
    if (!bodyTemplate?.trim()) return error('Isi template wajib diisi');

    const record = await addLetterTemplate({
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
      const letterTypes = await getLetterTypes();
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

    const record = await updateLetterTemplate(id, patch);
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

    const ok = await deleteLetterTemplate(id);
    if (!ok) return error('Template tidak ditemukan', 404);
    return success({ id, deleted: true });
  } catch (err) {
    console.error('Hapus template gagal:', err);
    return error('Gagal menghapus template', 500);
  }
}